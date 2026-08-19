import {addContactNote, upsertContactByEmail} from './hubspot.js'
import {
  ACCESS_OPTIONS,
  buildQuote,
  JOBS,
  type AccessId,
  type FinishId,
  type JobId,
  type MaterialsId,
  type MixItemId,
  type SiteConditionId,
} from './landscapingRateCard.js'
import {getQuoteCaptureClient} from './quoteCaptureClients.js'
import {
  resendConfigured,
  sendQuoteEmail,
  sendQuoteSms,
  smsConfigured,
} from './quoteCaptureNotify.js'

function proofNotifyInbox(): string {
  return (
    process.env.QUOTE_CAPTURE_PROOF_INBOX?.trim().toLowerCase() ||
    'felipe@sysbilt.com'
  )
}
import {createQuoteCheckoutSession, stripeConfigured} from './stripeQuoteCheckout.js'
import {
  createQuoteForContact,
  getZohoConfig,
  missingZohoEnv,
  refreshAccessToken,
} from './zohoInvoice.js'

function str(v: unknown, max = 500): string {
  if (typeof v !== 'string') return ''
  return v.trim().slice(0, max)
}

export type QuoteCaptureSubmitResult = {
  ok: true
  quoteNumber: string
  total: number
  payUrl: string | null
  checkoutId: string | null
  zoho: {
    estimateId: string
    estimateNumber: string
    deepLink: string
  } | null
  warnings: string[]
}

export type QuoteCaptureSubmitError = {
  ok: false
  status: number
  error: string
}

/**
 * Core Quote Capture submit: rebuild quote, Zoho, Stripe Checkout, email/SMS, owner alert.
 */
export async function processQuoteCaptureSubmit(
  body: Record<string, unknown>,
  publicBaseUrl: string,
): Promise<QuoteCaptureSubmitResult | QuoteCaptureSubmitError> {
  const slug = str(body.slug, 80).toLowerCase()
  if (Boolean(body.softNo)) {
    return {
      ok: false,
      status: 400,
      error: 'Out-of-catalogue jobs do not submit. Soft no only.',
    }
  }

  const client = getQuoteCaptureClient(slug)
  if (!client) {
    return {ok: false, status: 404, error: 'Unknown install'}
  }

  const visitorName = str(body.visitorName, 120)
  const visitorPhone = str(body.visitorPhone, 40)
  const visitorEmail = str(body.visitorEmail, 200).toLowerCase()
  const jobId = str(body.jobId, 40) as JobId
  const sizeValue = Number(body.sizeValue)
  const sizeLabel = str(body.sizeLabel, 120)
  const access = str(body.access, 40) as AccessId
  const siteRaw = str(body.site, 40)
  const site = (siteRaw || null) as SiteConditionId | null
  const materials = str(body.materials, 40) as MaterialsId
  const finishRaw = str(body.finish, 40)
  const finish = (finishRaw || null) as FinishId | null
  const mixHave = Array.isArray(body.mixHave)
    ? (body.mixHave.map((x: unknown) => str(x, 40)).filter(Boolean) as MixItemId[])
    : []
  const extras = Array.isArray(body.extras)
    ? body.extras.map((x: unknown) => str(x, 40)).filter(Boolean)
    : []

  if (visitorName.length < 2 || visitorPhone.replace(/\s/g, '').length < 8) {
    return {ok: false, status: 400, error: 'Name and phone required'}
  }
  if (!visitorEmail.includes('@')) {
    return {ok: false, status: 400, error: 'Email required'}
  }

  const job = JOBS[jobId]
  if (!job) return {ok: false, status: 400, error: 'Invalid job'}
  if (!ACCESS_OPTIONS.some((a) => a.id === access)) {
    return {ok: false, status: 400, error: 'Invalid access'}
  }
  if (!Number.isFinite(sizeValue) || sizeValue <= 0 || !sizeLabel) {
    return {ok: false, status: 400, error: 'Invalid size'}
  }
  if (job.asksFinish && !finish) {
    return {ok: false, status: 400, error: 'Finish required'}
  }
  if (!job.impliesRemoval && !site) {
    return {ok: false, status: 400, error: 'Site condition required'}
  }

  const quote = buildQuote({
    job,
    sizeValue,
    sizeLabel,
    access,
    site: job.impliesRemoval ? null : site,
    materials,
    finish: job.asksFinish ? finish : null,
    mixHave: materials === 'mix' ? mixHave : [],
    extras,
  })

  const nameParts = visitorName.split(/\s+/).filter(Boolean)
  const firstName = nameParts[0] || visitorName
  const lastName = nameParts.slice(1).join(' ') || ''

  const warnings: string[] = []
  let zoho: {
    estimate_id: string
    estimate_number: string
    deepLink: string
  } | null = null

  const zohoMissing = missingZohoEnv()
  if (zohoMissing.length) {
    warnings.push(`Zoho skipped: missing ${zohoMissing.join(', ')}`)
  } else {
    try {
      const cfg = getZohoConfig()
      const token = await refreshAccessToken(cfg)
      zoho = await createQuoteForContact(
        {
          contact: {
            email: visitorEmail,
            firstName,
            lastName,
            phone: visitorPhone,
          },
          referenceNumber: quote.quoteNumber,
          notes: [
            `${client.businessName} Quote Capture`,
            `Job: ${quote.jobLabel}`,
            `Size: ${quote.sizeLabel}`,
            quote.scope.join('\n'),
            client.disclaimer,
          ].join('\n\n'),
          terms: `Valid ${quote.validDays} days. ${client.disclaimer}`,
          lineItems: quote.lines.map((line) => ({
            name: line.label.slice(0, 200),
            rate: line.amount,
            quantity: 1,
            unit: 'job',
          })),
        },
        token,
        cfg,
      )
    } catch (err) {
      warnings.push(err instanceof Error ? err.message : 'Zoho create failed')
    }
  }

  const base = publicBaseUrl.replace(/\/$/, '')
  const successUrl = `${base}/q/${client.slug}?paid=1&qn=${encodeURIComponent(quote.quoteNumber)}`
  const cancelUrl = `${base}/q/${client.slug}?cancelled=1`

  let checkout: {id: string; url: string} | null = null
  if (!stripeConfigured()) {
    warnings.push('Stripe skipped: Stripe_Secret_key missing')
  } else {
    try {
      checkout = await createQuoteCheckoutSession({
        amountAud: quote.total,
        currency: client.currency,
        customerEmail: visitorEmail,
        businessName: client.businessName,
        quoteNumber: quote.quoteNumber,
        slug: client.slug,
        successUrl,
        cancelUrl,
        isProof: client.isProof,
        metadata: {
          visitor_name: visitorName,
          visitor_phone: visitorPhone,
        },
      })
    } catch (err) {
      warnings.push(err instanceof Error ? err.message : 'Stripe Checkout failed')
    }
  }

  const payUrl = checkout?.url || ''
  const money = `$${quote.total.toLocaleString('en-AU')}`

  const visitorText = client.isProof
    ? [
        `Hi ${firstName},`,
        '',
        `Thanks for testing Quote Capture with ${client.businessName}.`,
        `Your sample quotation is ${quote.quoteNumber} · ${money} AUD.`,
        quote.jobLabel,
        '',
        payUrl
          ? `If you want to try the pay step (test card): ${payUrl}`
          : 'Pay link was not created for this test.',
        '',
        client.disclaimer,
      ].join('\n')
    : [
        `Hi ${firstName},`,
        '',
        `Your quotation from ${client.businessName} is ready.`,
        `Quote ${quote.quoteNumber} · ${money} AUD`,
        quote.jobLabel,
        '',
        payUrl ? `Pay now: ${payUrl}` : 'Pay link will follow from the team.',
        '',
        client.disclaimer,
      ].join('\n')

  const emailSubject = client.isProof
    ? `Thanks for testing · ${quote.quoteNumber}`
    : `${client.businessName} quotation ${quote.quoteNumber}`

  if (visitorEmail) {
    if (!resendConfigured()) {
      warnings.push('Visitor email skipped: RESEND_API_KEY missing')
    } else {
      const sent = await sendQuoteEmail({
        to: visitorEmail,
        subject: emailSubject,
        text: visitorText,
      })
      if (!sent.ok) warnings.push(sent.error || 'Visitor email failed')
    }
  }

  // Proof installs: always land a copy in the SYSBILT test inbox (Resend test mode).
  if (client.isProof && resendConfigured()) {
    const inbox = proofNotifyInbox()
    if (inbox && inbox !== visitorEmail.toLowerCase()) {
      const sent = await sendQuoteEmail({
        to: inbox,
        subject: `Proof copy · ${emailSubject}`,
        text: [
          `Proof copy of visitor quotation (visitor: ${visitorEmail}).`,
          '',
          visitorText,
        ].join('\n'),
      })
      if (!sent.ok) warnings.push(sent.error || 'Proof inbox email failed')
    }
  }

  if (visitorPhone) {
    if (!smsConfigured()) {
      warnings.push('Visitor SMS skipped: ClickSend env missing')
    } else {
      const smsBody = client.isProof
        ? payUrl
          ? `Thanks for testing Quote Capture. Sample quote ${quote.quoteNumber} ${money}. Pay test: ${payUrl}`
          : `Thanks for testing Quote Capture. Sample quote ${quote.quoteNumber} ${money}.`
        : payUrl
          ? `${client.businessName}: quote ${quote.quoteNumber} ${money}. Pay: ${payUrl}`
          : `${client.businessName}: quote ${quote.quoteNumber} ${money}. We will send the pay link shortly.`
      const sent = await sendQuoteSms({to: visitorPhone, body: smsBody})
      if (!sent.ok && !sent.skipped) warnings.push(sent.error || 'Visitor SMS failed')
      if (sent.skipped) warnings.push(sent.error || 'Visitor SMS skipped')
    }
  }

  const ownerNote = [
    `Quote Capture lead · ${client.businessName}`,
    `Visitor: ${visitorName}`,
    `Phone: ${visitorPhone}`,
    `Email: ${visitorEmail}`,
    `Quote: ${quote.quoteNumber} · ${money}`,
    `Job: ${quote.jobLabel}`,
    `Size: ${quote.sizeLabel}`,
    zoho
      ? `Zoho Quote: ${zoho.estimate_number || zoho.estimate_id} · ${zoho.deepLink}`
      : 'Zoho: not created',
    payUrl ? `Pay link: ${payUrl}` : 'Pay link: not created',
    '',
    'Scope:',
    ...quote.scope.map((l) => `· ${l}`),
    '',
    warnings.length ? `Warnings:\n${warnings.join('\n')}` : '',
  ]
    .filter(Boolean)
    .join('\n')

  try {
    if (process.env.HUBSPOT_PRIVATE_APP_TOKEN) {
      const {id} = await upsertContactByEmail({
        email: visitorEmail,
        firstname: firstName,
        lastname: lastName,
        phone: visitorPhone,
        company: client.businessName,
        leadSourceDetail: `quote-capture/${client.slug}`,
        lifecyclestage: 'lead',
      })
      await addContactNote(id, ownerNote)
    } else {
      warnings.push('HubSpot skipped: no token')
    }
  } catch (err) {
    warnings.push(err instanceof Error ? err.message : 'HubSpot failed')
  }

  const slackUrl = process.env.SLACK_ACCESS_WEBHOOK_URL?.trim()
  if (slackUrl) {
    try {
      await fetch(slackUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          text: `QC lead · ${client.slug} · ${quote.quoteNumber} · ${money} · ${visitorName}`,
        }),
      })
    } catch {
      warnings.push('Slack notify failed')
    }
  }

  const pref = client.owner.alertPref
  if ((pref === 'email' || pref === 'both') && client.owner.email && resendConfigured()) {
    const sent = await sendQuoteEmail({
      to: client.owner.email,
      subject: `Priced lead · ${quote.quoteNumber} · ${money}`,
      text: ownerNote,
    })
    if (!sent.ok) warnings.push(sent.error || 'Owner email failed')
  }
  if ((pref === 'sms' || pref === 'both') && client.owner.phone && smsConfigured()) {
    const sent = await sendQuoteSms({
      to: client.owner.phone,
      body: `QC lead ${quote.quoteNumber} ${money} · ${visitorName} · ${visitorPhone}`,
    })
    if (!sent.ok && !sent.skipped) warnings.push(sent.error || 'Owner SMS failed')
  }

  return {
    ok: true,
    quoteNumber: quote.quoteNumber,
    total: quote.total,
    payUrl: payUrl || null,
    checkoutId: checkout?.id || null,
    zoho: zoho
      ? {
          estimateId: zoho.estimate_id,
          estimateNumber: zoho.estimate_number,
          deepLink: zoho.deepLink,
        }
      : null,
    warnings,
  }
}

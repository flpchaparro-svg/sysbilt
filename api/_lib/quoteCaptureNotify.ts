/** Visitor + owner notify for Quote Capture (Resend + Twilio). */

export function resendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim())
}

export function twilioConfigured(): boolean {
  return Boolean(
    process.env.TWILIO_ACCOUNT_SID?.trim() &&
      process.env.TWILIO_AUTH_TOKEN?.trim() &&
      process.env.TWILIO_FROM_NUMBER?.trim(),
  )
}

function fromEmail(): string {
  return (
    process.env.QUOTE_CAPTURE_FROM_EMAIL?.trim() ||
    process.env.RESEND_FROM_EMAIL?.trim() ||
    'Quote Capture <onboarding@resend.dev>'
  )
}

export async function sendQuoteEmail(input: {
  to: string
  subject: string
  text: string
  html?: string
}): Promise<{ok: boolean; skipped?: boolean; error?: string}> {
  const key = process.env.RESEND_API_KEY?.trim()
  if (!key) return {ok: false, skipped: true, error: 'RESEND_API_KEY missing'}
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail(),
      to: [input.to],
      subject: input.subject,
      text: input.text,
      html: input.html || undefined,
    }),
  })
  if (!res.ok) {
    const body = await res.text()
    return {ok: false, error: humanizeProviderError('email', res.status, body)}
  }
  return {ok: true}
}

/** Short plain lines for UI / HubSpot. Never dump provider JSON. */
export function humanizeProviderError(
  channel: 'email' | 'sms',
  status: number,
  body: string,
): string {
  const lower = body.toLowerCase()
  if (channel === 'email') {
    if (status === 403 && lower.includes('only send testing emails')) {
      return 'Email skipped: Resend test mode only delivers to the account inbox until a sending domain is verified'
    }
    if (status === 403) return 'Email skipped: Resend rejected the send (check from address / domain)'
    return `Email skipped: Resend ${status}`
  }
  if (status === 422 && (lower.includes('verified') || lower.includes('trial'))) {
    return 'SMS skipped: Twilio trial needs this mobile as a verified recipient'
  }
  if (status === 400 || status === 422) return `SMS skipped: Twilio ${status}`
  return `SMS skipped: Twilio ${status}`
}

/** AU-first E.164. Accepts 04…, 4…, 61…, or +61…. */
export function toE164Phone(raw: string): string {
  const compact = raw.replace(/[^\d+]/g, '')
  if (!compact) return ''
  if (compact.startsWith('+')) return compact
  if (compact.startsWith('61') && compact.length >= 11) return `+${compact}`
  if (compact.startsWith('0') && compact.length >= 9) return `+61${compact.slice(1)}`
  if (compact.startsWith('4') && compact.length === 9) return `+61${compact}`
  return `+${compact}`
}

export async function sendQuoteSms(input: {
  to: string
  body: string
}): Promise<{ok: boolean; skipped?: boolean; error?: string}> {
  const sid = process.env.TWILIO_ACCOUNT_SID?.trim()
  const token = process.env.TWILIO_AUTH_TOKEN?.trim()
  const from = process.env.TWILIO_FROM_NUMBER?.trim()
  if (!sid || !token || !from) {
    return {ok: false, skipped: true, error: 'Twilio env missing'}
  }
  const to = toE164Phone(input.to)
  if (to.replace(/\D/g, '').length < 10) return {ok: false, error: 'Invalid phone'}

  const auth = Buffer.from(`${sid}:${token}`).toString('base64')
  const form = new URLSearchParams()
  form.set('To', to)
  form.set('From', from)
  form.set('Body', input.body.slice(0, 1500))

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form,
    },
  )
  if (!res.ok) {
    const body = await res.text()
    return {ok: false, error: humanizeProviderError('sms', res.status, body)}
  }
  return {ok: true}
}

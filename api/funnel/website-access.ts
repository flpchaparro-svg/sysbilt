import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  addContactNote,
  createFunnelAccessDeal,
  upsertContactByEmail,
} from '../_lib/hubspot.js'

const TIERS = new Set(['brochure', 'practice', 'full'])
const TIER_LABELS: Record<string, string> = {
  brochure: 'Brochure',
  practice: 'Practice',
  full: 'Full site',
}
const TIER_AMOUNTS: Record<string, string> = {
  brochure: '120',
  practice: '160',
  full: '190',
}

function str(v: unknown, max = 2000): string {
  if (typeof v !== 'string') return ''
  return v.trim().slice(0, max)
}

function asPlain(value: unknown): string {
  if (value == null) return ''
  if (typeof value === 'boolean') return value ? 'yes' : 'no'
  if (typeof value === 'string') return value.trim()
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === 'string') return item.trim()
        if (item && typeof item === 'object' && 'name' in item) {
          return String((item as { name?: string }).name || '')
        }
        return ''
      })
      .filter(Boolean)
      .join(', ')
  }
  return String(value)
}

/**
 * Hosted Website Plan intake → HubSpot contact + Product · Paid deal.
 * POST /api/funnel/website-access
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const body = (req.body ?? {}) as Record<string, unknown>
  const tier = str(body.tier, 40).toLowerCase()
  const name = str(body.name, 120)
  const email = str(body.email, 200).toLowerCase()
  const business = str(body.business, 200)
  const phone = str(body.phone, 40)
  const answers =
    body.answers && typeof body.answers === 'object' && !Array.isArray(body.answers)
      ? (body.answers as Record<string, unknown>)
      : {}

  if (!TIERS.has(tier)) {
    res.status(400).json({ error: 'Missing or invalid plan tier' })
    return
  }
  if (name.length < 2 || !email.includes('@') || business.length < 2) {
    res.status(400).json({ error: 'Name, email and business are required' })
    return
  }

  const tierLabel = TIER_LABELS[tier]
  const amount = TIER_AMOUNTS[tier]
  const answerLines = Object.entries(answers)
    .filter(([key]) => !['logo', 'photos'].includes(key))
    .map(([key, value]) => {
      const plain = asPlain(value)
      return plain ? `${key}: ${plain}` : null
    })
    .filter(Boolean) as string[]

  const logoNote =
    Array.isArray(answers.logo) && answers.logo.length
      ? `logo: ${answers.logo.length} file(s) chosen in browser (not uploaded to HubSpot yet)`
      : null
  const photosNote =
    Array.isArray(answers.photos) && answers.photos.length
      ? `photos: ${answers.photos.length} file(s) chosen in browser (not uploaded to HubSpot yet)`
      : null

  const noteBody = [
    `Hosted Website Plan intake · ${tierLabel}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Business: ${business}`,
    phone ? `Phone: ${phone}` : null,
    `Amount (enrolment / monthly): $${amount}`,
    '',
    'Answers:',
    ...answerLines,
    logoNote,
    photosNote,
  ]
    .filter(Boolean)
    .join('\n')

  let hubspotContactId: string | null = null
  let hubspotDealId: string | null = null
  let hubspotError: string | null = null

  if (process.env.HUBSPOT_PRIVATE_APP_TOKEN) {
    try {
      const { id } = await upsertContactByEmail({
        email,
        firstname: name,
        company: business,
        phone: phone || undefined,
        website: str(answers.preferredDomain || answers.currentUrl || answers.domainName, 400) || undefined,
        lifecyclestage: 'customer',
        leadSourceDetail: `go/website/${tier}`,
      })
      hubspotContactId = id
      await addContactNote(id, noteBody)

      try {
        const { id: dealId } = await createFunnelAccessDeal({
          contactId: id,
          dealname: `Hosted Website Plan · ${tierLabel} — ${business}`,
          amount,
          productCode: 'website',
          noteBody,
        })
        hubspotDealId = dealId
      } catch (dealErr) {
        console.error(
          '[funnel/website-access] HubSpot deal',
          dealErr instanceof Error ? dealErr.message : dealErr,
        )
      }
    } catch (err) {
      hubspotError = err instanceof Error ? err.message : 'HubSpot failed'
      console.error('[funnel/website-access] HubSpot', hubspotError)
    }
  } else {
    hubspotError = 'HubSpot is not configured'
  }

  if (!hubspotContactId) {
    res.status(502).json({
      error: hubspotError || 'Could not save to HubSpot',
    })
    return
  }

  res.status(200).json({
    ok: true,
    hubspotContactId,
    hubspotDealId,
  })
}

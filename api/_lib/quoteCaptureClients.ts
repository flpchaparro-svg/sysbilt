/**
 * Server-side client registry mirror for Quote Capture submit API.
 * Keep in sync with src/pages/quoteCapture/clients/.
 */

export type QcAlertPref = 'email' | 'sms' | 'both' | 'other'

export type QuoteCaptureClientConfig = {
  slug: string
  businessName: string
  rateCard: 'landscaping-sample'
  disclaimer: string
  owner: {
    email: string
    phone: string
    alertPref: QcAlertPref
  }
  softNo: {
    whatWeDo: string
    callEmail: string
  }
  embedAncestors: string[]
  payMode: 'full'
  currency: 'aud'
  isProof: boolean
}

export const PROOF_LANDSCAPES: QuoteCaptureClientConfig = {
  slug: 'proof-landscapes',
  businessName: 'Proof Landscapes',
  rateCard: 'landscaping-sample',
  disclaimer:
    'Proof install sample landscaping prices for Quote Capture testing. A real client site uses their own locked prices, and a short site look confirms access, soil, and hidden work before work starts.',
  owner: {
    // Resend test mode only delivers to the account inbox
    email: 'felipe@sysbilt.com',
    phone: '',
    alertPref: 'email',
  },
  softNo: {
    whatWeDo:
      'We quote landscaping work on our rate card: lawns, garden beds, fencing, and retaining walls.',
    callEmail:
      'Call or email us if something related might fit. We will not spam you from this form.',
  },
  embedAncestors: ['*'],
  payMode: 'full',
  currency: 'aud',
  isProof: true,
}

const REGISTRY: Record<string, QuoteCaptureClientConfig> = {
  [PROOF_LANDSCAPES.slug]: PROOF_LANDSCAPES,
}

export function getQuoteCaptureClient(slug: string): QuoteCaptureClientConfig | null {
  const key = (slug || '').trim().toLowerCase()
  return REGISTRY[key] ?? null
}

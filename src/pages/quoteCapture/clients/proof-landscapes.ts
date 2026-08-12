import type {QuoteCaptureClientConfig} from './types'

export const PROOF_LANDSCAPES: QuoteCaptureClientConfig = {
  slug: 'proof-landscapes',
  businessName: 'Proof Landscapes',
  rateCard: 'landscaping-sample',
  disclaimer:
    'Proof install rates for Quote Capture testing. On a real client site this quotation uses their locked rate card, and a short site look confirms access, soil, and hidden work before work starts.',
  owner: {
    // Resend test mode only delivers to the account inbox
    email: 'felipe@sysbilt.com',
    phone: '',
    alertPref: 'email',
  },
  softNo: {
    whatWeDo:
      'We quote landscaping work on our rate card: lawns, garden beds, fencing, and retaining walls.',
    callEmail: 'Call or email us if something related might fit. We will not spam you from this form.',
  },
  embedAncestors: ['*', 'https://sysbilt.com', 'http://localhost:*', 'https://localhost:*'],
  payMode: 'full',
  currency: 'aud',
  isProof: true,
}

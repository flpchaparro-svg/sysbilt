/** Quote Capture live install config (per client slug). */

export type QcAlertPref = 'email' | 'sms' | 'both' | 'other'

export type QuoteCaptureClientConfig = {
  slug: string
  /** Trading name shown on the quotation */
  businessName: string
  /** Proof installs use sample landscaping rates */
  rateCard: 'landscaping-sample'
  /** On-screen + PDF disclaimer */
  disclaimer: string
  /** Owner priced-lead alerts */
  owner: {
    email: string
    phone: string
    alertPref: QcAlertPref
  }
  /** Soft-no contact line when job is out of catalogue */
  softNo: {
    whatWeDo: string
    callEmail: string
  }
  /** Hosts allowed to iframe /embed/q/:slug (CSP frame-ancestors). Empty = none. */
  embedAncestors: string[]
  /** Pay mode: 100% of quote total */
  payMode: 'full'
  currency: 'aud'
  /** Labelling for proof installs */
  isProof: boolean
}

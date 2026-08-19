/** Locked Quote Capture prices (AUD, once). Approved /go funnel exception. */
export const QC_PRICE_BASE = 2800
export const QC_PRICE_CONCIERGE = 600
export const QC_PRICE_ZOHO = 100

export function quoteCaptureProductTotal(input: {
  concierge?: boolean
  zohoSetup?: boolean
}): number {
  return (
    QC_PRICE_BASE +
    (input.concierge ? QC_PRICE_CONCIERGE : 0) +
    (input.zohoSetup ? QC_PRICE_ZOHO : 0)
  )
}

export function formatAud(n: number): string {
  return `$${n.toLocaleString('en-AU')}`
}

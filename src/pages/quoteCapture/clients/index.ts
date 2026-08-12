import {PROOF_LANDSCAPES} from './proof-landscapes'
import type {QuoteCaptureClientConfig} from './types'

const REGISTRY: Record<string, QuoteCaptureClientConfig> = {
  [PROOF_LANDSCAPES.slug]: PROOF_LANDSCAPES,
}

export function getQuoteCaptureClient(slug: string): QuoteCaptureClientConfig | null {
  const key = slug.trim().toLowerCase()
  return REGISTRY[key] ?? null
}

export function listQuoteCaptureSlugs(): string[] {
  return Object.keys(REGISTRY)
}

export type {QuoteCaptureClientConfig, QcAlertPref} from './types'
export {PROOF_LANDSCAPES}

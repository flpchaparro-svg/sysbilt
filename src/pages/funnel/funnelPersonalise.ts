/**
 * Runtime personalisation for /go/ pages via ?b= and ?s= URL params.
 * Never persisted. Fail closed to the generic page variant.
 */

const MAX_BUSINESS_NAME = 40

/** Decode, strip HTML-ish content, reject URLs, cap length. */
export function sanitiseBusinessName(raw: string | null | undefined): string | null {
  if (raw == null || raw === '') return null
  let value = raw
  try {
    value = decodeURIComponent(value.replace(/\+/g, ' '))
  } catch {
    return null
  }
  // Any HTML-ish markup fails closed (do not strip-and-keep residual text).
  if (/[<>]/.test(value) || /&\w+;/.test(value)) return null
  value = value.replace(/[\u0000-\u001F\u007F]/g, '')
  value = value.trim().replace(/\s+/g, ' ')
  if (!value) return null
  if (/https?:\/\//i.test(value) || /www\./i.test(value)) return null
  if (value.length > MAX_BUSINESS_NAME) {
    value = value.slice(0, MAX_BUSINESS_NAME).trim()
  }
  if (!value) return null
  return value
}

/** Integer 0–100 only. */
export function parseSpeedScore(raw: string | null | undefined): number | null {
  if (raw == null || raw === '') return null
  const trimmed = raw.trim()
  if (!/^\d{1,3}$/.test(trimmed)) return null
  const n = Number(trimmed)
  if (!Number.isInteger(n) || n < 0 || n > 100) return null
  return n
}

export function personaliseH1(template: string | null | undefined, business: string): string {
  if (!template) return `${business}'s website is losing people before it loads.`
  return template.replace(/\{b\}/gi, business)
}

import {colors} from '../../constants/theme'

/** Score dial stroke: red fail, orange mid, brand teal pass. */
export function scoreStrokeColour(score: number): string {
  if (score < 50) return colors.redSolid // hard red — Google “poor”
  if (score < 90) return '#FFA400' // Google “needs improvement”
  return colors.teal // brand teal for success — not Google green
}

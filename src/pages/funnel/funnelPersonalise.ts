/**
 * Runtime personalisation for /go/ pages via ?b=, ?s=, ?d=, ?t=, ?c=, ?n=, ?r=, ?m= URL params.
 * Review Engine: ?b= business, ?n= your review count, ?c= competitor, ?r= their count (optional).
 * Never persisted. Fail closed to the generic page variant.
 */

const MAX_BUSINESS_NAME = 40
const MAX_DAY = 20
const MAX_TIME = 12

function decodeParam(raw: string): string | null {
  let value = raw
  try {
    value = decodeURIComponent(value.replace(/\+/g, ' '))
  } catch {
    return null
  }
  if (/[<>]/.test(value) || /&\w+;/.test(value)) return null
  value = value.replace(/[\u0000-\u001F\u007F]/g, '')
  value = value.trim().replace(/\s+/g, ' ')
  if (!value) return null
  if (/https?:\/\//i.test(value) || /www\./i.test(value)) return null
  return value
}

/** Decode, strip HTML-ish content, reject URLs, cap length. */
export function sanitiseBusinessName(raw: string | null | undefined): string | null {
  if (raw == null || raw === '') return null
  const value = decodeParam(raw)
  if (!value) return null
  if (value.length > MAX_BUSINESS_NAME) {
    const sliced = value.slice(0, MAX_BUSINESS_NAME).trim()
    return sliced || null
  }
  return value
}

/** Weekday / short day label for Missed-Call evidence (?d=). */
export function sanitiseCallDay(raw: string | null | undefined): string | null {
  if (raw == null || raw === '') return null
  const value = decodeParam(raw)
  if (!value) return null
  if (!/^[A-Za-z][A-Za-z .'-]{0,18}$/.test(value)) return null
  if (value.length > MAX_DAY) return null
  return value
}

/** Clock time for Missed-Call evidence (?t=), e.g. 4:40pm. */
export function sanitiseCallTime(raw: string | null | undefined): string | null {
  if (raw == null || raw === '') return null
  const value = decodeParam(raw)
  if (!value) return null
  if (value.length > MAX_TIME) return null
  if (!/^\d{1,2}[:.]\d{2}\s*(am|pm|AM|PM)?$/.test(value)) return null
  return value.replace(/\./g, ':').replace(/\s+/g, '')
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

/** Hosted website door: Maps listing with no site (?nosite=1). */
export function parseNoSiteFlag(raw: string | null | undefined): boolean {
  if (raw == null || raw === '') return false
  const t = raw.trim().toLowerCase()
  return t === '1' || t === 'true' || t === 'yes'
}

/** Pages Google can't see (?n=), integer 1–500. */
export function parseBlockedPages(raw: string | null | undefined): number | null {
  if (raw == null || raw === '') return null
  const trimmed = raw.trim()
  if (!/^\d{1,3}$/.test(trimmed)) return null
  const n = Number(trimmed)
  if (!Number.isInteger(n) || n < 1 || n > 500) return null
  return n
}

/** Review count for Review Engine evidence (?n= your, ?r= competitor), integer 0–9999. */
export function parseReviewCount(raw: string | null | undefined): number | null {
  if (raw == null || raw === '') return null
  const trimmed = raw.trim()
  if (!/^\d{1,4}$/.test(trimmed)) return null
  const n = Number(trimmed)
  if (!Number.isInteger(n) || n < 0 || n > 9999) return null
  return n
}

/** Competitor name for Google Profile evidence (?c=). Same rules as business. */
export function sanitiseCompetitorName(raw: string | null | undefined): string | null {
  return sanitiseBusinessName(raw)
}

const MAX_LAST_POST_MONTH = 12

/** Month word for Content System evidence (?m=), e.g. March. Letters only. */
export function sanitiseLastPostMonth(raw: string | null | undefined): string | null {
  if (raw == null || raw === '') return null
  const value = decodeParam(raw)
  if (!value) return null
  if (value.length > MAX_LAST_POST_MONTH) return null
  if (!/^[A-Za-z][A-Za-z .'-]{0,11}$/.test(value)) return null
  // Reject team-ai mode tokens that share the ?m= key on other routes
  const lower = value.toLowerCase()
  if (lower === 'remote' || lower === 'onsite') return null
  return value
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

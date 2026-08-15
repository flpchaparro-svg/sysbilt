import {addContactNote, findContactByEmail} from './hubspot.js'
import {
  buildReviewSkeleton,
  polishReviewWithDeepSeek,
  type FeedbackDraftInput,
} from './feedbackReviewDraft.js'

export type FeedbackReviewPath = 'happy' | 'unhappy'

export type FeedbackReviewPayload = {
  catalog?: string
  serviceId?: string | null
  serviceLabel?: string
  otherService?: string
  detailId?: string | null
  detailOther?: string
  resultId?: string | null
  resultNote?: string
  attentionId?: string | null
  attentionNote?: string
  comfortId?: string | null
  comfortNote?: string
  personName?: string
  personId?: string | null
  personNote?: string
  personTraitIds?: string[]
  materialsId?: string | null
  materialsNote?: string
  improveBetterId?: string | null
  improveBetterNote?: string
  improveFasterId?: string | null
  improveFasterNote?: string
  againId?: string | null
  nextHelp?: string
  /** Silent personalisation from the send link (not typed in the wizard). */
  contactName?: string
  email?: string
  company?: string
  score?: number
  path?: FeedbackReviewPath
  /** Prospect /go sample. Polish only. Never write the sheet or HubSpot. */
  sample?: boolean
}

function asString(v: unknown): string {
  return typeof v === 'string' ? v.trim() : ''
}

function asId(v: unknown): string | null {
  if (typeof v !== 'string') return null
  const t = v.trim()
  return t || null
}

function asScore(v: unknown): number | null {
  if (typeof v === 'number' && Number.isFinite(v)) return Math.round(v)
  if (typeof v === 'string' && v.trim()) {
    const n = Number(v)
    if (Number.isFinite(n)) return Math.round(n)
  }
  return null
}

function asStringList(v: unknown): string[] {
  if (!Array.isArray(v)) return []
  return v.map((x) => String(x).trim()).filter(Boolean).slice(0, 8)
}

function normalise(body: Record<string, unknown>): {
  ok: true
  data: Required<
    Pick<
      FeedbackReviewPayload,
      | 'catalog'
      | 'serviceLabel'
      | 'otherService'
      | 'detailOther'
      | 'resultNote'
      | 'attentionNote'
      | 'comfortNote'
      | 'personName'
      | 'personNote'
      | 'materialsNote'
      | 'improveBetterNote'
      | 'improveFasterNote'
      | 'nextHelp'
      | 'contactName'
      | 'email'
      | 'company'
      | 'path'
    >
  > & {
    serviceId: string | null
    detailId: string | null
    resultId: string | null
    attentionId: string | null
    comfortId: string | null
    personId: string | null
    personTraitIds: string[]
    materialsId: string | null
    improveBetterId: string | null
    improveFasterId: string | null
    againId: string | null
    score: number
  }
} | {ok: false; status: number; error: string} {
  const score = asScore(body.score)
  if (score == null || score < 1 || score > 5) {
    return {ok: false, status: 400, error: 'score must be 1 to 5'}
  }
  const pathRaw = asString(body.path)
  const path: FeedbackReviewPath =
    pathRaw === 'unhappy' || score < 4 ? 'unhappy' : 'happy'

  return {
    ok: true,
    data: {
      catalog: asString(body.catalog) || 'general',
      serviceId: asId(body.serviceId),
      serviceLabel: asString(body.serviceLabel) || 'the work we did together',
      otherService: asString(body.otherService),
      detailId: asId(body.detailId),
      detailOther: asString(body.detailOther),
      resultId: asId(body.resultId),
      resultNote: asString(body.resultNote),
      attentionId: asId(body.attentionId),
      attentionNote: asString(body.attentionNote),
      comfortId: asId(body.comfortId),
      comfortNote: asString(body.comfortNote),
      personName: asString(body.personName),
      personId: asId(body.personId),
      personNote: asString(body.personNote),
      personTraitIds: asStringList(body.personTraitIds),
      materialsId: asId(body.materialsId),
      materialsNote: asString(body.materialsNote),
      improveBetterId: asId(body.improveBetterId),
      improveBetterNote: asString(body.improveBetterNote),
      improveFasterId: asId(body.improveFasterId),
      improveFasterNote: asString(body.improveFasterNote),
      againId: asId(body.againId),
      nextHelp: asString(body.nextHelp),
      contactName: asString(body.contactName),
      email: asString(body.email).toLowerCase(),
      company: asString(body.company),
      score,
      path,
    },
  }
}

function buildHubspotNote(data: ReturnType<typeof normalise> extends {ok: true; data: infer D} ? D : never, draft: string): string {
  const lines = [
    `Feedback Review · ${data.path} · ${data.score}/5`,
    data.contactName || data.company
      ? `Link contact: ${[data.contactName, data.company].filter(Boolean).join(' · ')}`
      : '',
    `Service: ${data.serviceLabel}${data.otherService ? ` (${data.otherService})` : ''}`,
    data.detailId ? `Detail: ${data.detailId}${data.detailOther ? ` · ${data.detailOther}` : ''}` : '',
    `Result: ${data.resultId || '-'}${data.resultNote ? ` · ${data.resultNote}` : ''}`,
    `Attention: ${data.attentionId || '-'}${data.attentionNote ? ` · ${data.attentionNote}` : ''}`,
    `Comfort: ${data.comfortId || '-'}${data.comfortNote ? ` · ${data.comfortNote}` : ''}`,
    `Person: ${data.personName || '-'} · ${data.personId || '-'}${data.personTraitIds.length ? ` · ${data.personTraitIds.join(', ')}` : ''}${data.personNote ? ` · ${data.personNote}` : ''}`,
    `Materials: ${data.materialsId || '-'}${data.materialsNote ? ` · ${data.materialsNote}` : ''}`,
    `Improve better: ${data.improveBetterId || '-'}${data.improveBetterNote ? ` · ${data.improveBetterNote}` : ''}`,
    `Improve faster: ${data.improveFasterId || '-'}${data.improveFasterNote ? ` · ${data.improveFasterNote}` : ''}`,
    `Again: ${data.againId || '-'}`,
    data.nextHelp ? `Next help: ${data.nextHelp}` : '',
    data.email ? `Email: ${data.email}` : '',
    '',
    data.path === 'happy' && draft ? `Suggested draft:\n${draft}` : '',
  ].filter((l) => l !== undefined)
  return lines.filter(Boolean).join('\n')
}

async function appendSheetRow(row: Record<string, string>): Promise<string | null> {
  const webhook = process.env.FEEDBACK_REVIEW_SHEET_WEBHOOK_URL?.trim()
  if (!webhook) return 'sheet skipped: FEEDBACK_REVIEW_SHEET_WEBHOOK_URL missing'

  const res = await fetch(webhook, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(row),
  })
  if (!res.ok) {
    const text = await res.text()
    return `sheet failed: ${res.status} ${text.slice(0, 180)}`
  }
  return null
}

export async function processFeedbackReviewSubmit(
  body: Record<string, unknown>,
): Promise<
  | {
      ok: true
      path: FeedbackReviewPath
      draft: string
      usedAi: boolean
      hubspot: 'noted' | 'no_match' | 'skipped' | 'error'
      warnings: string[]
    }
  | {ok: false; status: number; error: string}
> {
  const parsed = normalise(body)
  if (!parsed.ok) return parsed
  const data = parsed.data
  const warnings: string[] = []

  const draftInput: FeedbackDraftInput = {
    serviceLabel: data.serviceLabel,
    detailId: data.detailId,
    detailOther: data.detailOther,
    score: data.score,
    personName: data.personName,
    resultId: data.resultId,
    attentionId: data.attentionId,
    comfortId: data.comfortId,
    personId: data.personId,
    personTraitIds: data.personTraitIds,
    materialsId: data.materialsId,
    againId: data.againId,
    // Happy path only: free text can carry praise/specifics for the public draft.
    // Improve notes (resultNote, attentionNote, etc.) stay private on the sheet.
    extraNote: data.path === 'happy' ? data.nextHelp : '',
  }

  const skeleton = buildReviewSkeleton(draftInput)
  let draft = skeleton
  let usedAi = false

  if (data.path === 'happy') {
    const polished = await polishReviewWithDeepSeek({...draftInput, skeleton})
    draft = polished.draft
    usedAi = polished.usedAi
    if (!polished.usedAi) warnings.push('AI polish skipped or failed; used skeleton')
  }

  const isSample =
    body.sample === true ||
    body.sample === 1 ||
    String(body.sample || '').toLowerCase() === 'true' ||
    String(body.sample || '') === '1'
  if (isSample) {
    return {
      ok: true,
      path: data.path,
      draft: data.path === 'happy' ? draft : '',
      usedAi,
      hubspot: 'skipped',
      warnings: ['sample: skipped sheet and HubSpot'],
    }
  }

  const sheetRow: Record<string, string> = {
    Timestamp: new Date().toISOString(),
    Path: data.path,
    Score: String(data.score),
    Catalog: data.catalog,
    Service: data.serviceLabel,
    'Service Other': data.otherService,
    Detail: data.detailId || '',
    'Detail Other': data.detailOther,
    Result: data.resultId || '',
    'Result Note': data.resultNote,
    Attention: data.attentionId || '',
    'Attention Note': data.attentionNote,
    Comfort: data.comfortId || '',
    'Comfort Note': data.comfortNote,
    'Person Name': data.personName,
    'Person Feel': data.personId || '',
    'Person Note': data.personNote,
    'Person Traits': data.personTraitIds.join(', '),
    Materials: data.materialsId || '',
    'Materials Note': data.materialsNote,
    'Improve Better': data.improveBetterId || '',
    'Improve Better Note': data.improveBetterNote,
    'Improve Faster': data.improveFasterId || '',
    'Improve Faster Note': data.improveFasterNote,
    Again: data.againId || '',
    'Next Help': data.nextHelp,
    'Contact Name': data.contactName,
    Email: data.email,
    Company: data.company,
    Skeleton: skeleton,
    Draft: data.path === 'happy' ? draft : '',
  }

  try {
    const sheetWarn = await appendSheetRow(sheetRow)
    if (sheetWarn) warnings.push(sheetWarn)
  } catch (err) {
    warnings.push(err instanceof Error ? err.message : 'sheet failed')
  }

  if (warnings.length) {
    console.warn('[feedback-review]', warnings.join(' | '))
  }

  let hubspot: 'noted' | 'no_match' | 'skipped' | 'error' = 'skipped'
  if (!data.email) {
    hubspot = 'skipped'
  } else if (!process.env.HUBSPOT_PRIVATE_APP_TOKEN) {
    hubspot = 'skipped'
    warnings.push('HubSpot skipped: no token')
  } else {
    try {
      const contact = await findContactByEmail(data.email)
      if (!contact) {
        hubspot = 'no_match'
      } else {
        await addContactNote(contact.id, buildHubspotNote(data, draft))
        hubspot = 'noted'
      }
    } catch (err) {
      hubspot = 'error'
      warnings.push(err instanceof Error ? err.message : 'HubSpot failed')
    }
  }

  return {
    ok: true,
    path: data.path,
    draft: data.path === 'happy' ? draft : '',
    usedAi,
    hubspot,
    warnings,
  }
}

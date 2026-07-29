/**
 * Deep Audit report types and normalisation. Keys under `audit_data` match the n8n payload exactly.
 */

export type SignalRating = 'red' | 'amber' | 'green';
export type MetricRating = 'low' | 'medium' | 'high';
export type ToolDetectionStatus = 'found' | 'missing' | 'broken';
export type ToolQualityRating = 'good' | 'amber' | 'bad';
export type PageHealthQualityRating = 'good' | 'amber' | 'bad';
export type ActionPlanLinkedSection = 'find' | 'perceive' | 'review' | 'appendix';

export interface DiagnosisCardContent {
  title: string;
  evidence: string;
  consequence: string;
}

export interface DiagnosisBlock {
  critical: DiagnosisCardContent;
  secondary: DiagnosisCardContent[];
}

export interface HeadlineBlock {
  rating: SignalRating;
  finding: string;
}

export interface MetricTileModel {
  label: string;
  rating: MetricRating;
  value: string;
}

export interface KeywordGridItem {
  keyword: string;
  position: string;
  competitor_ranking_here: string;
}

export interface CompetitorModel {
  name: string;
  domain: string;
  outranks_on: string;
  their_advantage: string;
}

export interface SwotModel {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface ComparePairModel {
  they_say: string;
  we_see: string;
}

export interface SentimentModel {
  positive: number;
  neutral: number;
  negative: number;
}

export interface ReviewSourceModel {
  platform: string;
  rating: string;
  count: string;
  recent_theme: string;
}

export interface HowTheyFindYouSection {
  headline: HeadlineBlock;
  metrics: MetricTileModel[];
  keyword_grid: KeywordGridItem[];
  competitors: CompetitorModel[];
  swot: SwotModel;
  context: string;
}

export interface HowTheyPerceiveYouSection {
  headline: HeadlineBlock;
  metrics: MetricTileModel[];
  compare: ComparePairModel[];
  context: string;
}

export interface WhatPeopleSaySection {
  headline: HeadlineBlock;
  metrics: MetricTileModel[];
  sentiment: SentimentModel;
  review_sources: ReviewSourceModel[];
  context: string;
}

export interface RegistryMiniPanel {
  abn_status: string;
  entity_type: string;
}

export interface ToolDetectedRow {
  name: string;
  plain_english: string;
  status: ToolDetectionStatus;
  rating: ToolQualityRating;
}

export interface PageHealthMetric {
  plain_english: string;
  rating: PageHealthQualityRating;
  value: string;
}

export interface AppendixPageHealth {
  meta_description: PageHealthMetric;
  schema_markup: PageHealthMetric;
  cookie_compliance: PageHealthMetric;
  alt_text_rate: PageHealthMetric;
  heading_hierarchy: PageHealthMetric;
}

export interface ActionPlanItem {
  rank: number;
  title: string;
  rationale: string;
  linked_to_section: ActionPlanLinkedSection | string;
}

export interface AppendixBlock {
  registry: RegistryMiniPanel;
  tools_detected: ToolDetectedRow[];
  page_health: AppendixPageHealth;
  action_plan: ActionPlanItem[];
  transparency_note: string;
}

export interface DeepAuditData {
  diagnosis: DiagnosisBlock;
  how_they_find_you: HowTheyFindYouSection;
  how_they_perceive_you: HowTheyPerceiveYouSection;
  what_people_say: WhatPeopleSaySection;
  appendix: AppendixBlock;
}

export interface DeepAuditReportPayload {
  contact_email: string;
  company_name: string;
  contact_first_name?: string;
  /** Master Leads "Offer Product" override when set. */
  offer_product?: string;
  /** Master Leads LH Mobile score when present. */
  lh_mobile?: string;
  audit_data: DeepAuditData;
}

const MISSING = new Set(['not found', 'missing']);

export function isMissingSignal(value: string): boolean {
  return MISSING.has(value.trim().toLowerCase());
}

function str(v: unknown, fallback = ''): string {
  return typeof v === 'string' ? v : fallback;
}

function num(v: unknown): number | null {
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  if (typeof v === 'string' && v.trim() !== '' && !Number.isNaN(Number(v))) return Number(v);
  return null;
}

function signalRating(v: unknown): SignalRating {
  const s = str(v).toLowerCase();
  if (s === 'red' || s === 'amber' || s === 'green') return s;
  return 'amber';
}

function metricRating(v: unknown): MetricRating {
  const s = str(v).toLowerCase();
  if (s === 'low' || s === 'medium' || s === 'high') return s;
  return 'medium';
}

function toolStatus(v: unknown): ToolDetectionStatus {
  const s = str(v).toLowerCase();
  if (s === 'found' || s === 'missing' || s === 'broken') return s;
  return 'missing';
}

function toolQualityRating(v: unknown): ToolQualityRating {
  const s = str(v).toLowerCase();
  if (s === 'good' || s === 'amber' || s === 'bad') return s;
  return 'amber';
}

function pageHealthQualityRating(v: unknown): PageHealthQualityRating {
  return toolQualityRating(v) as PageHealthQualityRating;
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === 'string');
}

function parseDiagnosisCard(o: unknown): DiagnosisCardContent | null {
  if (o == null || typeof o !== 'object' || Array.isArray(o)) return null;
  const r = o as Record<string, unknown>;
  return {
    title: str(r.title),
    evidence: str(r.evidence),
    consequence: str(r.consequence),
  };
}

function parseDiagnosis(o: unknown): DiagnosisBlock | null {
  if (o == null || typeof o !== 'object' || Array.isArray(o)) return null;
  const d = o as Record<string, unknown>;
  const critical = parseDiagnosisCard(d.critical);
  if (!critical) return null;
  const secRaw = d.secondary;
  const secondary: DiagnosisCardContent[] = Array.isArray(secRaw)
    ? secRaw.map(parseDiagnosisCard).filter((x): x is DiagnosisCardContent => x != null)
    : [];
  return { critical, secondary };
}

function parseHeadline(o: unknown): HeadlineBlock {
  if (o == null || typeof o !== 'object' || Array.isArray(o)) {
    return { rating: 'amber', finding: '' };
  }
  const h = o as Record<string, unknown>;
  return {
    rating: signalRating(h.rating),
    finding: str(h.finding),
  };
}

function parseMetricTile(o: unknown): MetricTileModel | null {
  if (o == null || typeof o !== 'object' || Array.isArray(o)) return null;
  const m = o as Record<string, unknown>;
  return {
    label: str(m.label),
    rating: metricRating(m.rating),
    value: str(m.value),
  };
}

function parseMetrics(arr: unknown): MetricTileModel[] {
  if (!Array.isArray(arr)) return [];
  return arr.map(parseMetricTile).filter((x): x is MetricTileModel => x != null);
}

function parseKeywordGridItem(o: unknown): KeywordGridItem | null {
  if (o == null || typeof o !== 'object' || Array.isArray(o)) return null;
  const k = o as Record<string, unknown>;
  return {
    keyword: str(k.keyword),
    position: str(k.position),
    competitor_ranking_here: str(k.competitor_ranking_here),
  };
}

function parseCompetitor(o: unknown): CompetitorModel | null {
  if (o == null || typeof o !== 'object' || Array.isArray(o)) return null;
  const c = o as Record<string, unknown>;
  return {
    name: str(c.name),
    domain: str(c.domain),
    outranks_on: str(c.outranks_on),
    their_advantage: str(c.their_advantage),
  };
}

function parseSwot(o: unknown): SwotModel {
  if (o == null || typeof o !== 'object' || Array.isArray(o)) {
    return { strengths: [], weaknesses: [], opportunities: [], threats: [] };
  }
  const s = o as Record<string, unknown>;
  return {
    strengths: isStringArray(s.strengths) ? s.strengths : [],
    weaknesses: isStringArray(s.weaknesses) ? s.weaknesses : [],
    opportunities: isStringArray(s.opportunities) ? s.opportunities : [],
    threats: isStringArray(s.threats) ? s.threats : [],
  };
}

function parseFindYou(o: unknown): HowTheyFindYouSection {
  if (o == null || typeof o !== 'object' || Array.isArray(o)) {
    return {
      headline: { rating: 'amber', finding: '' },
      metrics: [],
      keyword_grid: [],
      competitors: [],
      swot: parseSwot(null),
      context: '',
    };
  }
  const s = o as Record<string, unknown>;
  const kg = Array.isArray(s.keyword_grid)
    ? s.keyword_grid.map(parseKeywordGridItem).filter((x): x is KeywordGridItem => x != null)
    : [];
  const comp = Array.isArray(s.competitors)
    ? s.competitors.map(parseCompetitor).filter((x): x is CompetitorModel => x != null)
    : [];
  return {
    headline: parseHeadline(s.headline),
    metrics: parseMetrics(s.metrics),
    keyword_grid: kg,
    competitors: comp,
    swot: parseSwot(s.swot),
    context: str(s.context),
  };
}

function parseCompare(o: unknown): ComparePairModel | null {
  if (o == null || typeof o !== 'object' || Array.isArray(o)) return null;
  const c = o as Record<string, unknown>;
  return { they_say: str(c.they_say), we_see: str(c.we_see) };
}

function parsePerceive(o: unknown): HowTheyPerceiveYouSection {
  if (o == null || typeof o !== 'object' || Array.isArray(o)) {
    return {
      headline: { rating: 'amber', finding: '' },
      metrics: [],
      compare: [],
      context: '',
    };
  }
  const s = o as Record<string, unknown>;
  const cmp = Array.isArray(s.compare) ? s.compare.map(parseCompare).filter((x): x is ComparePairModel => x != null) : [];
  return {
    headline: parseHeadline(s.headline),
    metrics: parseMetrics(s.metrics),
    compare: cmp,
    context: str(s.context),
  };
}

function parseSentiment(o: unknown): SentimentModel {
  if (o == null || typeof o !== 'object' || Array.isArray(o)) {
    return { positive: 0, neutral: 0, negative: 0 };
  }
  const s = o as Record<string, unknown>;
  return {
    positive: num(s.positive) ?? 0,
    neutral: num(s.neutral) ?? 0,
    negative: num(s.negative) ?? 0,
  };
}

function parseReviewSource(o: unknown): ReviewSourceModel | null {
  if (o == null || typeof o !== 'object' || Array.isArray(o)) return null;
  const r = o as Record<string, unknown>;
  const countRaw = r.count;
  const countStr = typeof countRaw === 'number' && Number.isFinite(countRaw) ? String(countRaw) : str(countRaw);
  return {
    platform: str(r.platform),
    rating: str(r.rating),
    count: countStr,
    recent_theme: str(r.recent_theme),
  };
}

function parseWhatPeopleSay(o: unknown): WhatPeopleSaySection {
  if (o == null || typeof o !== 'object' || Array.isArray(o)) {
    return {
      headline: { rating: 'amber', finding: '' },
      metrics: [],
      sentiment: parseSentiment(null),
      review_sources: [],
      context: '',
    };
  }
  const s = o as Record<string, unknown>;
  const rs = Array.isArray(s.review_sources)
    ? s.review_sources.map(parseReviewSource).filter((x): x is ReviewSourceModel => x != null)
    : [];
  return {
    headline: parseHeadline(s.headline),
    metrics: parseMetrics(s.metrics),
    sentiment: parseSentiment(s.sentiment),
    review_sources: rs,
    context: str(s.context),
  };
}

function parseToolDetected(o: unknown): ToolDetectedRow | null {
  if (o == null || typeof o !== 'object' || Array.isArray(o)) return null;
  const t = o as Record<string, unknown>;
  return {
    name: str(t.name),
    plain_english: str(t.plain_english),
    status: toolStatus(t.status),
    rating: toolQualityRating(t.rating),
  };
}

function emptyPageHealthMetric(): PageHealthMetric {
  return { plain_english: '', rating: 'amber', value: '' };
}

function parsePageHealthMetric(o: unknown): PageHealthMetric {
  if (o == null || typeof o !== 'object' || Array.isArray(o)) return emptyPageHealthMetric();
  const p = o as Record<string, unknown>;
  return {
    plain_english: str(p.plain_english),
    rating: pageHealthQualityRating(p.rating),
    value: str(p.value),
  };
}

function parseAppendixPageHealth(o: unknown): AppendixPageHealth {
  if (o == null || typeof o !== 'object' || Array.isArray(o)) {
    return {
      meta_description: emptyPageHealthMetric(),
      schema_markup: emptyPageHealthMetric(),
      cookie_compliance: emptyPageHealthMetric(),
      alt_text_rate: emptyPageHealthMetric(),
      heading_hierarchy: emptyPageHealthMetric(),
    };
  }
  const p = o as Record<string, unknown>;
  return {
    meta_description: parsePageHealthMetric(p.meta_description),
    schema_markup: parsePageHealthMetric(p.schema_markup),
    cookie_compliance: parsePageHealthMetric(p.cookie_compliance),
    alt_text_rate: parsePageHealthMetric(p.alt_text_rate),
    heading_hierarchy: parsePageHealthMetric(p.heading_hierarchy),
  };
}

const LINKED_SECTIONS = new Set(['find', 'perceive', 'review', 'appendix']);

function parseLinkedSection(v: unknown): ActionPlanLinkedSection | string {
  const s = str(v).toLowerCase();
  if (LINKED_SECTIONS.has(s)) return s as ActionPlanLinkedSection;
  return str(v);
}

function parseAction(o: unknown): ActionPlanItem | null {
  if (o == null || typeof o !== 'object' || Array.isArray(o)) return null;
  const a = o as Record<string, unknown>;
  const rank = num(a.rank) ?? 0;
  return {
    rank: Math.max(0, Math.round(rank)),
    title: str(a.title),
    rationale: str(a.rationale),
    linked_to_section: parseLinkedSection(a.linked_to_section),
  };
}

function parseAppendix(o: unknown): AppendixBlock {
  if (o == null || typeof o !== 'object' || Array.isArray(o)) {
    return {
      registry: { abn_status: '', entity_type: '' },
      tools_detected: [],
      page_health: parseAppendixPageHealth(null),
      action_plan: [],
      transparency_note: '',
    };
  }
  const a = o as Record<string, unknown>;
  const reg = a.registry;
  let registry: RegistryMiniPanel = { abn_status: '', entity_type: '' };
  if (reg != null && typeof reg === 'object' && !Array.isArray(reg)) {
    const r = reg as Record<string, unknown>;
    registry = { abn_status: str(r.abn_status), entity_type: str(r.entity_type) };
  }
  const tools_detected = Array.isArray(a.tools_detected)
    ? a.tools_detected.map(parseToolDetected).filter((x): x is ToolDetectedRow => x != null)
    : [];
  const action_plan = Array.isArray(a.action_plan)
    ? a.action_plan.map(parseAction).filter((x): x is ActionPlanItem => x != null)
    : [];
  return {
    registry,
    tools_detected,
    page_health: parseAppendixPageHealth(a.page_health),
    action_plan,
    transparency_note: str(a.transparency_note),
  };
}

/**
 * Validates and normalises a report API response. Returns null if the payload is structurally invalid
 * (missing identity fields or diagnosis.critical).
 */
export function normalizeDeepAuditReportPayload(raw: unknown): DeepAuditReportPayload | null {
  if (raw == null || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const o = raw as Record<string, unknown>;
  const contact = str(o.contact_email).trim();
  const company = str(o.company_name).trim();
  const contactFirstName = str(o.contact_first_name).trim();
  if (!contact || !company) return null;
  const audit = o.audit_data;
  if (audit == null || typeof audit !== 'object' || Array.isArray(audit)) return null;
  const a = audit as Record<string, unknown>;
  const diagnosis = parseDiagnosis(a.diagnosis);
  if (!diagnosis) return null;
  return {
    contact_email: contact,
    company_name: company,
    contact_first_name: contactFirstName,
    ...(str(o.offer_product).trim() ? { offer_product: str(o.offer_product).trim() } : {}),
    ...(str(o.lh_mobile).trim() ? { lh_mobile: str(o.lh_mobile).trim() } : {}),
    audit_data: {
      diagnosis,
      how_they_find_you: parseFindYou(a.how_they_find_you),
      how_they_perceive_you: parsePerceive(a.how_they_perceive_you),
      what_people_say: parseWhatPeopleSay(a.what_people_say),
      appendix: parseAppendix(a.appendix),
    },
  };
}

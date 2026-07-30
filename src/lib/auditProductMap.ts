/**
 * Map Deep Audit findings to outbound products for First Moves whisper lines
 * and the single closing CTA. Sheet column "Offer Product" always wins when set.
 *
 * Hosted Website Plan is rare: only when the public site is thin, dead, or a
 * throwaway builder page. A real multi-page practice with speed or local gaps
 * gets a fix product, never a brochure rebuild pitch.
 */

import type { ActionPlanItem, DeepAuditData, PageHealthQualityRating } from '@/types/deepAuditReport';

export interface AuditProductOffer {
  name: string;
  blurb: string;
  href: string;
  code: string;
}

const SITE = 'https://sysbilt.com';

export const AUDIT_PRODUCTS = {
  speed: {
    name: 'Website Speed Fix',
    blurb: 'Fixed-scope mobile speed work, measured before and after',
    href: `${SITE}/go/speed-fix`,
    code: 'speed-fix',
  },
  search: {
    name: 'Search Visibility Fix',
    blurb: 'Indexing, crawl, and local search setup so the right pages get found',
    href: `${SITE}/go/search-fix`,
    code: 'search-fix',
  },
  profile: {
    name: 'Google Profile Fix',
    blurb: 'Business Profile cleaned up so the right people find you first',
    href: `${SITE}/go/google-profile`,
    code: 'google-profile',
  },
  reviews: {
    name: 'Review Engine',
    blurb: 'A simple ask after every job so reviews keep arriving',
    href: `${SITE}/go/reviews`,
    code: 'reviews',
  },
  booking: {
    name: 'Booking System',
    blurb: 'Online booking on the number and site you already use',
    href: `${SITE}/go/booking`,
    code: 'booking',
  },
  missedCall: {
    name: 'Missed-Call Text-Back',
    blurb: 'Every missed call gets a reply before they dial the next business',
    href: `${SITE}/go/missed-call`,
    code: 'missed-call',
  },
  crm: {
    name: 'CRM Rescue',
    blurb: 'Enquiry handling that alerts, replies, and follows up',
    href: `${SITE}/go/crm-rescue`,
    code: 'crm-rescue',
  },
  landing: {
    name: 'Campaign Landing Page',
    blurb: 'One page that matches the ad promise word for word',
    href: `${SITE}/go/landing-page`,
    code: 'landing-page',
  },
  content: {
    name: 'Content System',
    blurb: 'A simple cadence so social does not go quiet for months',
    href: `${SITE}/go/content-system`,
    code: 'content-system',
  },
  website: {
    name: 'Hosted Website Plan',
    blurb: 'A clean site we build and host, about fourteen days to live',
    href: `${SITE}/go/website`,
    code: 'website',
  },
} as const satisfies Record<string, AuditProductOffer>;

type ProductKey = keyof typeof AUDIT_PRODUCTS;

/** Sheet "Offer Product" values → product key. Empty = auto. */
const OFFER_ALIASES: Array<{ re: RegExp; key: ProductKey }> = [
  { re: /^(website|hosted(\s+website)?(\s+plan)?|rebuild|front\s*door)$/i, key: 'website' },
  { re: /^(speed(\s*fix)?|website\s+speed\s+fix)$/i, key: 'speed' },
  { re: /^(search(\s*fix)?|search\s+visibility(\s+fix)?|seo)$/i, key: 'search' },
  { re: /^(google\s*profile(\s*fix)?|gbp|profile)$/i, key: 'profile' },
  { re: /^(review(\s*engine)?|reviews)$/i, key: 'reviews' },
  { re: /^(booking(\s*system)?)$/i, key: 'booking' },
  { re: /^(missed[- ]?call(\s*text-?back)?)$/i, key: 'missedCall' },
  { re: /^(crm(\s*rescue)?)$/i, key: 'crm' },
  { re: /^(landing(\s*page)?|campaign\s+landing\s+page)$/i, key: 'landing' },
  { re: /^(content(\s*system)?)$/i, key: 'content' },
];

/** Patch products only. Rebuild language is handled separately and rarely. */
const RULES: Array<{ re: RegExp; product: ProductKey }> = [
  { re: /\b(speed|lighthouse|load time|page ?speed|slow (site|page|on phones?)|performance score)\b/i, product: 'speed' },
  {
    re: /\b(google (business )?profile|gbp|maps listing|categories|profile photos|knowledge panel|local pack)\b/i,
    product: 'profile',
  },
  {
    re: /\b(index|noindex|sitemap|crawl|canonical|robots\.txt|search visibility)\b/i,
    product: 'search',
  },
  {
    re: /\b(keyword|local seo|rank(?:ing)? for|not ranking|organic results?|optimis[ee] for|optimize for|dedicated (local )?page)\b/i,
    product: 'search',
  },
  { re: /\b(heading|schema|meta description|on-?page seo)\b/i, product: 'search' },
  { re: /\b(google maps embed|maps embed)\b/i, product: 'search' },
  { re: /\b(review engine|review (count|volume|ask)|more reviews)\b/i, product: 'reviews' },
  { re: /\b(booking widget|book online|online booking|appointments?)\b/i, product: 'booking' },
  { re: /\b(missed[- ]?call|after[- ]?hours|ring(?:s|ing)? out)\b/i, product: 'missedCall' },
  { re: /\b(form|enquir|crm|follow[- ]?up|lead handling|nobody repl)\b/i, product: 'crm' },
  { re: /\b(landing page|ads? land|ad library|campaign page)\b/i, product: 'landing' },
  {
    re: /\b(instagram|facebook|linkedin|social media|stale social|content cadence|content system)\b/i,
    product: 'content',
  },
];

export const REBUILD_ACTION_RE =
  /\b(rebuild|hosted website|start again|start over|front door|brochure(\s+site)?|throw\s*away|scrap (the|this) site|rather than patch)\b/i;

/** Drop AI rebuild rows when the site is not a true rebuild case (existing reports). */
export function sanitizeActionPlanForDisplay(
  actionPlan: ActionPlanItem[] | undefined | null,
  rebuildMode: boolean,
  fallback?: { title: string; rationale?: string; linked_to_section?: string },
): ActionPlanItem[] {
  const rows = Array.isArray(actionPlan) ? [...actionPlan] : [];
  if (rebuildMode) return rows.sort((a, b) => (a.rank || 0) - (b.rank || 0));

  const kept = rows
    .filter((item) => !REBUILD_ACTION_RE.test(`${item.title} ${item.rationale}`))
    .sort((a, b) => (a.rank || 0) - (b.rank || 0));

  if (kept.length > 0) return kept;

  const title = (fallback?.title || '').trim();
  if (!title) return [];
  return [
    {
      rank: 1,
      title,
      rationale:
        (fallback?.rationale || '').trim() ||
        'This is the highest-impact fix from the diagnosis above. Start here before the smaller patches.',
      linked_to_section: fallback?.linked_to_section || 'find',
    },
  ];
}

function isBad(rating: PageHealthQualityRating | string | undefined): boolean {
  return String(rating || '').toLowerCase() === 'bad';
}

function parseScore(raw: string | undefined): number | null {
  if (!raw) return null;
  const m = String(raw).match(/(\d{1,3})/);
  if (!m) return null;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : null;
}

export function resolveOfferProductKey(raw: string | undefined | null): ProductKey | null {
  const v = String(raw || '').trim();
  if (!v || /^(auto|none|n\/a|-)$/i.test(v)) return null;
  for (const row of OFFER_ALIASES) {
    if (row.re.test(v)) return row.key;
  }
  return null;
}

/**
 * Hosted Website only when the public site is basically not a real working base.
 * Missing meta, schema, chat, or booking alone is NOT a rebuild. Those are patch jobs.
 * Speed in the 50s is Speed Fix, not a new site.
 */
export function shouldRecommendHostedRebuild(
  data: DeepAuditData,
  lhMobile?: string | number | null,
): boolean {
  const health = data.appendix.page_health;
  const perceive = data.how_they_perceive_you;
  const tools = data.appendix.tools_detected || [];
  const diagBlob = JSON.stringify(data.diagnosis || {});
  const aiRead = String(data.ai_site_read || '').toLowerCase();

  const sheetScore = parseScore(lhMobile != null ? String(lhMobile) : '');
  let speedScore = sheetScore;
  for (const m of perceive.metrics || []) {
    if (!/speed|mobile|performance|lighthouse/i.test(m.label)) continue;
    const score = parseScore(m.value);
    if (score != null) speedScore = speedScore == null ? score : Math.min(speedScore, score);
  }
  const speedFromDiag = diagBlob.match(
    /(?:performance|speed|pagespeed|scored?)\D{0,12}(\d{1,3})\s*(?:\/\s*100|out of 100)?/i,
  );
  if (speedFromDiag) {
    const s = Number(speedFromDiag[1]);
    if (Number.isFinite(s)) speedScore = speedScore == null ? s : Math.min(speedScore, s);
  }

  // Signals the site is already a real practice site (blog, many pages, long-running practice).
  const looksEstablished =
    /\b(blog|article|services menu|navigation|since\s+19|since\s+20|multiple pages|service pages)\b/i.test(
      `${aiRead} ${diagBlob} ${JSON.stringify(perceive)}`,
    );

  let hardHits = 0;
  if (speedScore != null && speedScore < 35) hardHits += 1;
  if (speedScore != null && speedScore < 25) hardHits += 1;
  if (isBad(health.heading_hierarchy?.rating)) hardHits += 1;
  if (/squarespace|wix|weebly|godaddy|jimdo|duda/i.test(diagBlob)) hardHits += 1;
  if (/squarespace|wix|weebly|godaddy|jimdo|duda/i.test(JSON.stringify(tools))) hardHits += 1;
  if (/\b(no website|could not read|bot-?blocked|thin homepage|parked domain)\b/i.test(aiRead)) {
    hardHits += 2;
  }

  if (looksEstablished) return false;
  return hardHits >= 2;
}

export function productForActionItem(
  item: ActionPlanItem,
  options?: { allowRebuild?: boolean },
): AuditProductOffer | null {
  const blob = `${item.title} ${item.rationale}`;
  if (options?.allowRebuild && REBUILD_ACTION_RE.test(blob)) {
    return AUDIT_PRODUCTS.website;
  }
  for (const rule of RULES) {
    if (rule.re.test(blob)) return AUDIT_PRODUCTS[rule.product];
  }
  return null;
}

function matchProductFromBlob(blob: string): ProductKey | null {
  for (const rule of RULES) {
    if (rule.re.test(blob)) return rule.product;
  }
  return null;
}

export function primaryOfferFromAudit(
  data: DeepAuditData,
  businessName?: string,
  options?: { offerProduct?: string | null; lhMobile?: string | number | null },
): { offer: AuditProductOffer; findingLabel: string; rebuild: boolean; forced: boolean } {
  const b = encodeURIComponent((businessName || '').trim().slice(0, 40));
  const withB = (offer: AuditProductOffer): AuditProductOffer =>
    b ? { ...offer, href: `${offer.href}?b=${b}` } : offer;

  const forcedKey = resolveOfferProductKey(options?.offerProduct);
  if (forcedKey) {
    const rebuild = forcedKey === 'website';
    return {
      offer: withB(AUDIT_PRODUCTS[forcedKey]),
      findingLabel: rebuild
        ? 'The current site is not a base worth patching'
        : data.diagnosis.critical.title || AUDIT_PRODUCTS[forcedKey].name,
      rebuild,
      forced: true,
    };
  }

  // Primary diagnosis wins. Local pack / speed / booking beats a model that yelled "rebuild".
  const criticalBlob = `${data.diagnosis.critical.title} ${data.diagnosis.critical.evidence} ${data.diagnosis.critical.consequence}`;
  const fromCritical = matchProductFromBlob(criticalBlob);
  if (fromCritical) {
    return {
      offer: withB(AUDIT_PRODUCTS[fromCritical]),
      findingLabel: data.diagnosis.critical.title,
      rebuild: false,
      forced: false,
    };
  }

  const sorted = [...(data.appendix.action_plan || [])].sort((a, b) => (a.rank || 0) - (b.rank || 0));
  for (const item of sorted) {
    const product = productForActionItem(item, { allowRebuild: false });
    if (product) {
      return {
        offer: withB(product),
        findingLabel: (item.title || '').trim() || data.diagnosis.critical.title,
        rebuild: false,
        forced: false,
      };
    }
  }

  if (shouldRecommendHostedRebuild(data, options?.lhMobile)) {
    return {
      offer: withB(AUDIT_PRODUCTS.website),
      findingLabel: 'The current site is not a base worth patching',
      rebuild: true,
      forced: false,
    };
  }

  return {
    offer: withB(AUDIT_PRODUCTS.speed),
    findingLabel: data.diagnosis.critical.title || 'The highest-impact issue in this audit',
    rebuild: false,
    forced: false,
  };
}

/**
 * Map Deep Audit findings to outbound products for First Moves whisper lines
 * and the single closing CTA. Replace-vs-patch prefers Hosted Website Plan
 * when enough structural failures stack up.
 */

import type { ActionPlanItem, DeepAuditData, PageHealthQualityRating } from '@/types/deepAuditReport';

export interface AuditProductOffer {
  name: string;
  blurb: string;
  href: string;
  code: string;
}

const SITE = 'https://sysbilt.com';

const PRODUCTS = {
  speed: {
    name: 'Website Speed Fix',
    blurb: 'Fixed-scope mobile speed work, measured before and after',
    href: `${SITE}/go/speed-fix`,
    code: 'speed-fix',
  },
  search: {
    name: 'Search Visibility Fix',
    blurb: 'Indexing and crawl setup so Google can see the pages you paid for',
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
    blurb: 'A clean brochure site we build and host, about fourteen days to live',
    href: `${SITE}/go/website`,
    code: 'website',
  },
} as const satisfies Record<string, AuditProductOffer>;

const RULES: Array<{ re: RegExp; product: keyof typeof PRODUCTS }> = [
  { re: /\b(speed|mobile|lighthouse|load time|page ?speed|slow)\b/i, product: 'speed' },
  {
    re: /\b(index|noindex|sitemap|crawl|canonical|robots\.txt|search visibility)\b/i,
    product: 'search',
  },
  { re: /\b(heading|schema|meta description|on-?page seo)\b/i, product: 'search' },
  {
    re: /\b(google (business )?profile|gbp|maps listing|categories|photos)\b/i,
    product: 'profile',
  },
  { re: /\b(review|rating)\b/i, product: 'reviews' },
  { re: /\b(booking|book online|appointments?)\b/i, product: 'booking' },
  { re: /\b(missed[- ]?call|after[- ]?hours|ring(?:s|ing)? out)\b/i, product: 'missedCall' },
  { re: /\b(form|enquir|crm|follow[- ]?up|lead handling|nobody repl)\b/i, product: 'crm' },
  { re: /\b(landing page|ads? land|ad library|campaign page)\b/i, product: 'landing' },
  { re: /\b(social|content|instagram|facebook|stale)\b/i, product: 'content' },
  { re: /\b(rebuild|hosted website|start again|front door)\b/i, product: 'website' },
];

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

/** Three or more structural failures → recommend Hosted Website Plan instead of patch stack. */
export function shouldRecommendHostedRebuild(data: DeepAuditData): boolean {
  let hits = 0;
  const health = data.appendix.page_health;
  const perceive = data.how_they_perceive_you;
  const tools = data.appendix.tools_detected || [];

  for (const m of perceive.metrics || []) {
    if (!/speed|mobile|performance|lighthouse/i.test(m.label)) continue;
    const score = parseScore(m.value);
    if (score != null && score < 40) hits += 1;
  }

  if (isBad(health.heading_hierarchy?.rating)) hits += 1;
  if (isBad(health.schema_markup?.rating)) hits += 1;

  for (const m of perceive.metrics || []) {
    if (!/accessib/i.test(m.label)) continue;
    const score = parseScore(m.value);
    if (score != null && score < 50) hits += 1;
  }

  const hasEnquiryPath = tools.some((t) => {
    const blob = `${t.name} ${t.plain_english}`.toLowerCase();
    return /form|crm|enquiry|booking|hubspot|calendly/.test(blob) && t.status === 'found';
  });
  if (!hasEnquiryPath) hits += 1;

  const sslOrAbandoned = tools.some((t) => {
    const blob = `${t.name} ${t.plain_english}`.toLowerCase();
    return (
      (/ssl|https|certificate/.test(blob) && (t.status === 'missing' || t.status === 'broken')) ||
      (/wordpress|wix|squarespace|builder/.test(blob) && t.rating === 'bad')
    );
  });
  if (sslOrAbandoned) hits += 1;

  return hits >= 3;
}

export function productForActionItem(item: ActionPlanItem): AuditProductOffer | null {
  const blob = `${item.title} ${item.rationale}`;
  for (const rule of RULES) {
    if (rule.re.test(blob)) return PRODUCTS[rule.product];
  }
  return null;
}

export function primaryOfferFromAudit(
  data: DeepAuditData,
  businessName?: string,
): { offer: AuditProductOffer; findingLabel: string; rebuild: boolean } {
  const b = encodeURIComponent((businessName || '').trim().slice(0, 40));
  const withB = (offer: AuditProductOffer): AuditProductOffer =>
    b ? { ...offer, href: `${offer.href}?b=${b}` } : offer;

  if (shouldRecommendHostedRebuild(data)) {
    return {
      offer: withB(PRODUCTS.website),
      findingLabel: 'Several structural failures on the same site',
      rebuild: true,
    };
  }

  const sorted = [...(data.appendix.action_plan || [])].sort((a, b) => (a.rank || 0) - (b.rank || 0));
  for (const item of sorted) {
    const product = productForActionItem(item);
    if (product) {
      return {
        offer: withB(product),
        findingLabel: (item.title || '').trim() || data.diagnosis.critical.title,
        rebuild: false,
      };
    }
  }

  const criticalBlob = `${data.diagnosis.critical.title} ${data.diagnosis.critical.evidence}`;
  for (const rule of RULES) {
    if (rule.re.test(criticalBlob)) {
      return {
        offer: withB(PRODUCTS[rule.product]),
        findingLabel: data.diagnosis.critical.title,
        rebuild: false,
      };
    }
  }

  return {
    offer: withB(PRODUCTS.speed),
    findingLabel: data.diagnosis.critical.title || 'The highest-impact issue in this audit',
    rebuild: false,
  };
}

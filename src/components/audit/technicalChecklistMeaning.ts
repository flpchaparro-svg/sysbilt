import type {
  AppendixPageHealth,
  PageHealthMetric,
  ToolDetectedRow,
} from '@/types/deepAuditReport';
import { isMissingSignal } from '@/types/deepAuditReport';

type ToolKind = 'analytics' | 'ads' | 'tagmanager' | 'booking' | 'chat' | 'crm' | 'maps' | 'other';

function toolKind(name: string): ToolKind {
  const n = name.toLowerCase();
  if (/tag\s*manager|gtm/.test(n)) return 'tagmanager';
  if (/analytics|ga4?\b/.test(n)) return 'analytics';
  if (/pixel|meta\s*ads|facebook|instagram/.test(n)) return 'ads';
  if (/book|calendly|acuity|setmore/.test(n)) return 'booking';
  if (/chat|intercom|tidio|tawk|livechat/.test(n)) return 'chat';
  if (/crm|hubspot|salesforce|pipedrive|zoho/.test(n)) return 'crm';
  if (/maps|embed/.test(n)) return 'maps';
  return 'other';
}

function isStrongTool(t: ToolDetectedRow): boolean {
  return t.status === 'found' && t.rating === 'good';
}

function isWeakTool(t: ToolDetectedRow): boolean {
  return !isStrongTool(t);
}

function toBullets(items: string[]): string {
  return items.map((item) => `- ${item}`).join('\n');
}

/**
 * Owner meaning from the actual tools list: what is working, what is missing, what that costs.
 * Returns short paragraphs and/or markdown-style bullets for SectionContext.
 */
export function buildToolsResultMeaning(tools: ToolDetectedRow[]): string {
  if (!tools.length) {
    return 'We could not map the public stack in this pass, so treat booking, chat, and CRM as unconfirmed until we re-run.';
  }

  const strong = tools.filter(isStrongTool);
  const weak = tools.filter(isWeakTool);
  const kindsWeak = new Set(weak.map((t) => toolKind(t.name)));
  const kindsStrong = new Set(strong.map((t) => toolKind(t.name)));

  const goodBits: string[] = [];
  if (kindsStrong.has('analytics') || kindsStrong.has('tagmanager') || kindsStrong.has('ads')) {
    const names = strong
      .filter((t) => ['analytics', 'tagmanager', 'ads'].includes(toolKind(t.name)))
      .map((t) => t.name.trim())
      .filter(Boolean);
    if (names.length) {
      goodBits.push(
        `${names.join(', ')} ${names.length === 1 ? 'is' : 'are'} in place, so you can measure traffic and ad performance.`,
      );
    }
  }
  for (const t of strong) {
    const k = toolKind(t.name);
    if (k === 'booking' || k === 'chat' || k === 'crm' || k === 'maps') {
      goodBits.push(`${t.name.trim()} looks live on the public site.`);
    }
  }

  const badBits: string[] = [];
  if (kindsWeak.has('chat')) {
    badBits.push(
      'No live chat showed up. Quick questions after hours or mid-scroll walk away instead of asking.',
    );
  }
  if (kindsWeak.has('booking')) {
    badBits.push(
      'A live booking system could not be confirmed. Form-only or phone-only paths make it harder to lock an unscheduled patient while interest is hot.',
    );
  }
  if (kindsWeak.has('crm')) {
    badBits.push(
      'No CRM handoff showed on the public site. Form fills can sit unread, so warm leads go cold before anyone follows up.',
    );
  }
  if (kindsWeak.has('maps')) {
    badBits.push(
      'Maps or location cues look weak or missing, which makes it harder for locals to trust they have the right clinic.',
    );
  }

  for (const t of weak) {
    if (toolKind(t.name) !== 'other') continue;
    const label = t.name.trim() || 'A listed tool';
    if (t.status === 'broken') {
      badBits.push(`${label} looks broken or incomplete on the public pass.`);
    } else {
      badBits.push(`${label} was not clearly detected in this pass.`);
    }
  }

  const parts: string[] = [];
  if (goodBits.length) {
    parts.push(`What is working\n${toBullets(goodBits)}`);
  }
  if (badBits.length) {
    parts.push(`What is missing or weak\n${toBullets(badBits)}`);
  } else if (strong.length === tools.length) {
    parts.push(
      'The public stack looks solid for capture and tracking. Keep it maintained so warm traffic still reaches a booked job.',
    );
  } else {
    parts.push(
      'Some tools are weak or unconfirmed. Until booking, chat, and follow-up are clear, you risk paying for attention you cannot catch.',
    );
  }

  return parts.join('\n\n');
}

function healthWeak(metric: PageHealthMetric): boolean {
  const v = metric.value.trim().toLowerCase();
  if (!v || isMissingSignal(v)) return true;
  if (v.startsWith('could not verify') || v === 'not verified' || v.includes('not detected')) return true;
  if (metric.rating === 'bad' || metric.rating === 'amber') return true;
  return false;
}

function healthStrong(metric: PageHealthMetric): boolean {
  return !healthWeak(metric) && metric.rating === 'good';
}

/**
 * Owner meaning from the actual page-health cards.
 */
export function buildPageHealthResultMeaning(page_health: AppendixPageHealth): string {
  const labels: { key: keyof AppendixPageHealth; weakLine: string; strongLine: string }[] = [
    {
      key: 'meta_description',
      weakLine: 'Search snippet is weak or missing, so fewer people understand why to click before they land.',
      strongLine: 'Meta description is present, which helps the Google snippet under your link.',
    },
    {
      key: 'schema_markup',
      weakLine: 'Schema markup is missing, so Google and AI systems get less help labelling your business.',
      strongLine: 'Schema markup is present, which helps machines understand the business.',
    },
    {
      key: 'cookie_compliance',
      weakLine: 'A clear cookie notice was not confirmed, which can hurt trust and create compliance risk.',
      strongLine: 'Cookie compliance signals look in place on this pass.',
    },
    {
      key: 'alt_text_rate',
      weakLine: 'Image alt text is thin, so search and accessibility tools waste the trust your photos should earn.',
      strongLine: 'Alt text coverage looks solid.',
    },
    {
      key: 'heading_hierarchy',
      weakLine: 'Heading structure is messy, which makes the offer harder to scan for people and machines.',
      strongLine: 'Heading hierarchy looks correct.',
    },
  ];

  const good: string[] = [];
  const bad: string[] = [];
  for (const row of labels) {
    const metric = page_health[row.key];
    if (healthStrong(metric)) good.push(row.strongLine);
    else if (healthWeak(metric)) bad.push(row.weakLine);
  }

  const parts: string[] = [];
  if (good.length) {
    parts.push(`What is in good shape\n${toBullets(good)}`);
  }
  if (bad.length) {
    parts.push(`What is costing you\n${toBullets(bad)}`);
    parts.push(
      'Against clinics that already cleaned this up, those gaps make discovery and trust harder than they need to be.',
    );
  } else if (good.length) {
    parts.push(
      'Page basics look in good shape. Keep them maintained so the site stays easy for Google, AI answers, and first-time readers.',
    );
  } else {
    parts.push(
      'We could not turn page health into a clear owner takeaway on this pass. Use the cards above and re-run if you need a sharper read.',
    );
  }

  return parts.join('\n\n');
}

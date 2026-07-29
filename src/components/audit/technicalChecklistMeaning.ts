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

/**
 * Owner meaning from the actual tools list: what is working, what is missing, what that costs.
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
        `Good: ${names.join(', ')} ${names.length === 1 ? 'is' : 'are'} in place, so you can measure traffic and ad performance.`,
      );
    }
  }
  for (const t of strong) {
    const k = toolKind(t.name);
    if (k === 'booking' || k === 'chat' || k === 'crm' || k === 'maps') {
      goodBits.push(`Good: ${t.name.trim()} looks live on the public site.`);
    }
  }

  const badBits: string[] = [];
  if (kindsWeak.has('chat')) {
    badBits.push(
      'No live chat showed up. When someone has a quick question after hours or mid-scroll, they leave instead of asking.',
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

  // Catch weak tools that did not match known kinds
  for (const t of weak) {
    if (toolKind(t.name) !== 'other') continue;
    const label = t.name.trim() || 'A listed tool';
    if (t.status === 'broken') {
      badBits.push(`${label} looks broken or incomplete on the public pass.`);
    } else {
      badBits.push(`${label} was not clearly detected in this pass.`);
    }
  }

  const paras: string[] = [];
  if (goodBits.length) paras.push(goodBits.join(' '));
  if (badBits.length) {
    paras.push(badBits.join(' '));
  } else if (strong.length === tools.length) {
    paras.push(
      'The public stack looks solid for capture and tracking. Keep it maintained so warm traffic still reaches a booked job.',
    );
  } else {
    paras.push(
      'Some tools are weak or unconfirmed. Until booking, chat, and follow-up are clear, you risk paying for attention you cannot catch.',
    );
  }

  return paras.join('\n\n');
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
  const labels: { key: keyof AppendixPageHealth; name: string; weakLine: string; strongLine: string }[] = [
    {
      key: 'meta_description',
      name: 'meta description',
      weakLine: 'Your search snippet is weak or missing, so fewer people understand why to click before they land.',
      strongLine: 'Your meta description is present, which helps the Google snippet under your link.',
    },
    {
      key: 'schema_markup',
      name: 'schema markup',
      weakLine: 'Schema markup is missing, so Google and AI systems get less help labelling your business, hours, and services.',
      strongLine: 'Schema markup is present, which helps machines understand the business.',
    },
    {
      key: 'cookie_compliance',
      name: 'cookie notice',
      weakLine: 'A clear cookie notice was not confirmed, which can hurt trust and create compliance risk.',
      strongLine: 'Cookie compliance signals look in place on this pass.',
    },
    {
      key: 'alt_text_rate',
      name: 'alt text',
      weakLine: 'Image alt text is thin, so search and accessibility tools waste the trust your photos should earn.',
      strongLine: 'Alt text coverage looks solid.',
    },
    {
      key: 'heading_hierarchy',
      name: 'heading structure',
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

  const paras: string[] = [];
  if (good.length) paras.push(good.join(' '));
  if (bad.length) {
    paras.push(
      `${bad.join(' ')} Against clinics that already cleaned this up, those gaps make discovery and trust harder than they need to be.`,
    );
  } else if (good.length) {
    paras.push('Page basics look in good shape. Keep them maintained so the site stays easy for Google, AI answers, and first-time readers.');
  } else {
    paras.push('We could not turn page health into a clear owner takeaway on this pass. Use the cards above and re-run if you need a sharper read.');
  }

  return paras.join('\n\n');
}

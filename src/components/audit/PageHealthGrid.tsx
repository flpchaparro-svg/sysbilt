import type { AppendixPageHealth, PageHealthMetric, PageHealthQualityRating } from '@/types/deepAuditReport';
import { isMissingSignal } from '@/types/deepAuditReport';
import { auditCardLift, auditEyebrow, auditGlass } from './auditCardStyles';

const PAGE_HEALTH_KEYS: (keyof AppendixPageHealth)[] = [
  'meta_description',
  'schema_markup',
  'cookie_compliance',
  'alt_text_rate',
  'heading_hierarchy',
];

const KEY_LABELS: Record<keyof AppendixPageHealth, string> = {
  meta_description: 'Meta description',
  schema_markup: 'Schema markup',
  cookie_compliance: 'Cookie compliance',
  alt_text_rate: 'Alt text rate',
  heading_hierarchy: 'Heading hierarchy',
};

/** Owner meaning when the check is weak or missing. Always shown under the status. */
const KEY_MEANINGS: Record<keyof AppendixPageHealth, string> = {
  meta_description:
    'The line Google shows under your link in search. Missing or thin copy means weaker snippets and fewer informed clicks.',
  schema_markup:
    'Hidden labels that help Google and AI systems understand your business type, hours, and services. Without them, you lean harder on guesswork.',
  cookie_compliance:
    'Whether the public site shows a clear cookie notice. Gaps here can create trust and compliance risk, especially in NSW.',
  alt_text_rate:
    'Text attached to images so search and accessibility tools can read them. Low coverage wastes the trust photos should earn.',
  heading_hierarchy:
    'How the page is structured for readers and machines. Messy headings make the offer harder to scan and harder to rank.',
};

const qualityDot: Record<PageHealthQualityRating, string> = {
  good: 'bg-teal shadow-[0_0_10px_rgba(45,212,191,0.45)]',
  amber: 'bg-gold-on-dark shadow-[0_0_10px_rgba(212,168,75,0.45)]',
  bad: 'bg-red-on-dark shadow-[0_0_10px_rgba(248,113,113,0.4)]',
};

function QualityDot({ rating }: { rating: PageHealthQualityRating }) {
  return <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${qualityDot[rating]}`} aria-hidden />;
}

/** True when we have no usable reading (not when the page confirmed something is Missing). */
function isUnreadPageHealth(value: string): boolean {
  const v = value.trim().toLowerCase();
  if (!v) return true;
  if (isMissingSignal(v)) return false;
  return (
    v === 'could not verify' ||
    v.startsWith('could not verify') ||
    v === 'not verified' ||
    v.includes('no pagespeed')
  );
}

function HealthCard({ fieldKey, metric }: { fieldKey: keyof AppendixPageHealth; metric: PageHealthMetric }) {
  const unread = isUnreadPageHealth(metric.value);
  const confirmedMissing = isMissingSignal(metric.value);
  const modelPlain = metric.plain_english.trim();
  const showModelPlain =
    modelPlain &&
    modelPlain.toLowerCase() !== 'not found' &&
    !isMissingSignal(modelPlain) &&
    modelPlain.toLowerCase() !== KEY_MEANINGS[fieldKey].toLowerCase();

  return (
    <div
      className={`h-full p-5 ${auditGlass} ${auditCardLift} ${
        unread || confirmedMissing
          ? 'border-dashed border-white/20'
          : 'hover:border-gold-on-dark/35'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className={`${auditEyebrow} text-white/45`}>{KEY_LABELS[fieldKey]}</p>
          <p
            className={`mt-2.5 font-mono text-xs md:text-sm ${
              unread || confirmedMissing ? 'text-white/55' : 'text-gold-on-dark'
            }`}
          >
            {metric.value.trim() || 'Not found'}
          </p>
        </div>
        <QualityDot rating={metric.rating} />
      </div>
      <p className="mt-4 font-sans text-sm leading-relaxed text-cream/85">{KEY_MEANINGS[fieldKey]}</p>
      {showModelPlain ? (
        <p className="mt-3 font-sans text-sm leading-relaxed text-white/65">{modelPlain}</p>
      ) : null}
      {unread ? (
        <p className="mt-2 font-sans text-xs text-white/55">
          We could not read this field in this pass.
        </p>
      ) : null}
    </div>
  );
}

export interface PageHealthGridProps {
  page_health: AppendixPageHealth;
}

export default function PageHealthGrid({ page_health }: PageHealthGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {PAGE_HEALTH_KEYS.map((key) => (
        <div key={key} className="min-w-0">
          <HealthCard fieldKey={key} metric={page_health[key]} />
        </div>
      ))}
    </div>
  );
}

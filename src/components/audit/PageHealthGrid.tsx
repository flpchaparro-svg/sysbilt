import type { AppendixPageHealth, PageHealthMetric, PageHealthQualityRating } from '@/types/deepAuditReport';
import { isMissingSignal } from '@/types/deepAuditReport';
import { auditCardLift } from './auditCardStyles';

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

const qualityDot: Record<PageHealthQualityRating, string> = {
  good: 'bg-teal',
  amber: 'bg-gold-on-dark',
  bad: 'bg-red-on-dark',
};

const healthHover: Record<PageHealthQualityRating, string> = {
  good: 'hover:border-teal/85 hover:bg-black/38 motion-safe:hover:shadow-[0_28px_64px_-24px_rgba(15,118,110,0.22)]',
  amber:
    'hover:border-gold-on-dark/85 hover:bg-black/38 motion-safe:hover:shadow-[0_28px_64px_-24px_rgba(212,168,75,0.18)]',
  bad: 'hover:border-red-on-dark/85 hover:bg-black/38 motion-safe:hover:shadow-[0_28px_64px_-24px_rgba(248,113,113,0.18)]',
};

const missingHealthHover = `${auditCardLift} hover:border-white/35 hover:bg-white/[0.06] motion-safe:hover:shadow-[0_28px_64px_-24px_rgba(0,0,0,0.68)]`;

function QualityDot({ rating }: { rating: PageHealthQualityRating }) {
  return <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${qualityDot[rating]}`} aria-hidden />;
}

function HealthCard({ fieldKey, metric }: { fieldKey: keyof AppendixPageHealth; metric: PageHealthMetric }) {
  const valMissing = isMissingSignal(metric.value) || !metric.value.trim();
  const borderByRating =
    metric.rating === 'good'
      ? 'border-teal/40'
      : metric.rating === 'bad'
        ? 'border-red-on-dark/40'
        : 'border-gold-on-dark/40';
  return (
    <div
      className={`rounded-xl border p-4 md:p-5 ${
        valMissing
          ? `border-dashed border-white/15 bg-white/[0.02] ${missingHealthHover}`
          : `${borderByRating} bg-black/25 ${auditCardLift} ${healthHover[metric.rating]}`
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="type-eyebrow text-white/70">/ {KEY_LABELS[fieldKey].toUpperCase()}</p>
          <p className="mt-2 font-sans text-sm font-medium leading-snug text-white/90">{metric.plain_english.trim() || 'Not found'}</p>
        </div>
        <QualityDot rating={metric.rating} />
      </div>
      <p className={`mt-3 font-mono text-xs md:text-sm ${valMissing ? 'text-white/75' : 'text-gold-on-dark'}`}>
        {metric.value.trim() || 'Not found'}
      </p>
      {valMissing ? (
        <p className="mt-2 font-sans text-xs text-white/75">We could not read this field. Check the appendix note for consequence.</p>
      ) : null}
    </div>
  );
}

export interface PageHealthGridProps {
  page_health: AppendixPageHealth;
}

export default function PageHealthGrid({ page_health }: PageHealthGridProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {PAGE_HEALTH_KEYS.map((key) => (
        <div key={key} className="min-w-0">
          <HealthCard fieldKey={key} metric={page_health[key]} />
        </div>
      ))}
    </div>
  );
}

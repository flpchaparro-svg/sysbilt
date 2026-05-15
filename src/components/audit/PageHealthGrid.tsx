import type { AppendixPageHealth, PageHealthMetric, PageHealthQualityRating } from '@/types/deepAuditReport';
import { isMissingSignal } from '@/types/deepAuditReport';

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
  good: 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.35)]',
  amber: 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]',
  bad: 'bg-red-on-dark shadow-[0_0_10px_rgba(255,107,107,0.35)]',
};

function QualityDot({ rating }: { rating: PageHealthQualityRating }) {
  return <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${qualityDot[rating]}`} aria-hidden />;
}

function HealthCard({ fieldKey, metric }: { fieldKey: keyof AppendixPageHealth; metric: PageHealthMetric }) {
  const valMissing = isMissingSignal(metric.value) || !metric.value.trim();
  return (
    <div
      className={`rounded-xl border p-4 md:p-5 ${
        valMissing ? 'border-dashed border-white/12 bg-white/[0.02] opacity-80' : 'border-white/[0.07] bg-zinc-950/70'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-600">{KEY_LABELS[fieldKey]}</p>
          <p className="mt-1 text-sm font-medium leading-snug text-zinc-200">{metric.plain_english.trim() || 'Not found'}</p>
        </div>
        <QualityDot rating={metric.rating} />
      </div>
      <p className={`mt-3 font-mono text-xs md:text-sm ${valMissing ? 'text-zinc-500' : 'text-gold-on-dark/95'}`}>
        {metric.value.trim() || 'Not found'}
      </p>
      {valMissing ? (
        <p className="mt-2 text-xs text-zinc-500">We could not read this field. Check the appendix note for consequence.</p>
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

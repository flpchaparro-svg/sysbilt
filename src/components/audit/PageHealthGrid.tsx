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

const qualityDot: Record<PageHealthQualityRating, string> = {
  good: 'bg-teal shadow-[0_0_10px_rgba(45,212,191,0.45)]',
  amber: 'bg-gold-on-dark shadow-[0_0_10px_rgba(212,168,75,0.45)]',
  bad: 'bg-red-on-dark shadow-[0_0_10px_rgba(248,113,113,0.4)]',
};

function QualityDot({ rating }: { rating: PageHealthQualityRating }) {
  return <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${qualityDot[rating]}`} aria-hidden />;
}

function HealthCard({ fieldKey, metric }: { fieldKey: keyof AppendixPageHealth; metric: PageHealthMetric }) {
  const valMissing = isMissingSignal(metric.value) || !metric.value.trim();
  return (
    <div
      className={`h-full p-5 ${auditGlass} ${auditCardLift} ${
        valMissing ? 'border-dashed border-white/20' : 'hover:border-gold-on-dark/35'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className={`${auditEyebrow} text-white/45`}>{KEY_LABELS[fieldKey]}</p>
          <p className="mt-2.5 font-sans text-sm font-medium leading-snug text-white/85">
            {metric.plain_english.trim() || 'Not found'}
          </p>
        </div>
        <QualityDot rating={metric.rating} />
      </div>
      <p className={`mt-4 font-mono text-xs md:text-sm ${valMissing ? 'text-white/55' : 'text-gold-on-dark'}`}>
        {metric.value.trim() || 'Not found'}
      </p>
      {valMissing ? (
        <p className="mt-2 font-sans text-xs text-white/55">
          We could not read this field. Check the appendix note for consequence.
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

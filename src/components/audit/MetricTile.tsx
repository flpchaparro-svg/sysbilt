import type { MetricRating } from '@/types/deepAuditReport';
import { m, useReducedMotion } from 'framer-motion';
import { auditCardLift, auditEase, auditEmpty, auditEyebrow, auditGlass } from './auditCardStyles';
import { isMetricValueEmpty, isMetricValueUnknown, metricHelperForLabel } from './metricHelpers';

const ratingAccent: Record<MetricRating, string> = {
  low: 'from-red-on-dark via-red-on-dark/70 to-red-on-dark/20',
  medium: 'from-gold-on-dark via-gold-on-dark/70 to-gold-on-dark/15',
  high: 'from-teal via-teal/70 to-teal/20',
};

const ratingBadge: Record<MetricRating, string> = {
  low: 'border-red-on-dark/50 bg-red-on-dark/10 text-red-on-dark',
  medium: 'border-gold-on-dark/50 bg-gold-on-dark/10 text-gold-on-dark',
  high: 'border-teal/50 bg-teal/10 text-teal',
};

const ratingGlow: Record<MetricRating, string> = {
  low: 'hover:border-red-on-dark/50 hover:shadow-[0_28px_64px_-28px_rgba(248,113,113,0.28)]',
  medium: 'hover:border-gold-on-dark/45 hover:shadow-[0_28px_64px_-28px_rgba(212,168,75,0.28)]',
  high: 'hover:border-teal/45 hover:shadow-[0_28px_64px_-28px_rgba(45,212,191,0.22)]',
};

export interface MetricTileProps {
  label: string;
  value: string;
  rating: MetricRating;
}

export default function MetricTile({ label, value, rating }: MetricTileProps) {
  const unknown = isMetricValueUnknown(value);
  const absenceEmpty = isMetricValueEmpty(value);
  const weakTile = unknown || absenceEmpty;
  const helper = metricHelperForLabel(label);
  const reduce = useReducedMotion();

  return (
    <m.div
      className={`flex h-full min-h-[220px] flex-col p-5 md:min-h-[240px] md:p-6 ${auditGlass} ${auditCardLift} ${
        weakTile
          ? 'border-dashed border-white/20 hover:border-white/35'
          : `border-white/10 ${ratingGlow[rating]}`
      }`}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: auditEase }}
    >
      <div className="h-1 w-full overflow-hidden rounded-full bg-white/10" aria-hidden>
        <m.div
          className={`h-full rounded-full bg-gradient-to-r ${
            unknown ? 'from-white/30 to-white/10' : ratingAccent[rating]
          }`}
          initial={reduce ? { width: '100%' } : { width: '0%' }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: auditEase, delay: 0.15 }}
        />
      </div>

      <span className={`${auditEyebrow} mt-5 text-white/45`}>{label.trim() || 'Metric'}</span>

      <p
        className={`mt-3 font-serif text-xl leading-snug tracking-tight md:text-2xl ${
          weakTile ? 'text-white/65' : 'text-cream'
        }`}
      >
        {value.trim() || 'Not found'}
      </p>

      <div className="mt-auto pt-5">
        {unknown ? (
          <span className="inline-flex w-fit rounded-full border border-white/15 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] text-white/40">
            unknown
          </span>
        ) : (
          <span
            className={`inline-flex w-fit rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] ${ratingBadge[rating]}`}
          >
            {rating} signal
          </span>
        )}
        {helper ? (
          <p
            className={`mt-4 font-sans text-xs leading-relaxed md:text-[13px] ${
              weakTile ? 'text-white/70' : 'text-white/55'
            }`}
          >
            {helper}
          </p>
        ) : null}
      </div>
    </m.div>
  );
}

export function MetricEmptyState() {
  return <div className={`${auditEmpty} col-span-full`}>No metric tiles were returned for this section.</div>;
}

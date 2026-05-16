import type { MetricRating } from '@/types/deepAuditReport';
import { isMetricValueEmpty, metricHelperForLabel } from './metricHelpers';

const ratingShell: Record<MetricRating, string> = {
  low: 'border-red-on-dark bg-red-on-dark/10',
  medium: 'border-gold-on-dark bg-gold-on-dark/10',
  high: 'border-teal bg-teal/10',
};

const ratingBar: Record<MetricRating, string> = {
  low: 'from-red-on-dark/90 to-red-on-dark/20',
  medium: 'from-gold-on-dark/90 to-gold-on-dark/20',
  high: 'from-teal to-teal/20',
};

const ratingBadge: Record<MetricRating, string> = {
  low: 'border-red-on-dark text-red-on-dark',
  medium: 'border-gold-on-dark text-gold-on-dark',
  high: 'border-teal text-teal',
};

export interface MetricTileProps {
  label: string;
  value: string;
  rating: MetricRating;
}

export default function MetricTile({ label, value, rating }: MetricTileProps) {
  const empty = isMetricValueEmpty(value);
  const helper = metricHelperForLabel(label);
  const borderClass = empty ? 'border-dashed border-white/20' : `border ${ratingShell[rating]}`;

  return (
    <div className={`flex min-h-full flex-col rounded-xl p-5 font-sans md:p-6 ${borderClass} bg-black/20`}>
      <div className={`h-0.5 w-full rounded-full bg-gradient-to-r ${ratingBar[rating]}`} aria-hidden />
      <span className="type-eyebrow mt-4 text-white/70">/ {label.trim() || 'METRIC'}</span>
      <p className={`type-h4 mt-3 font-serif ${empty ? 'text-white/75' : 'text-white'}`}>
        {value.trim() || 'Not found'}
      </p>
      <span
        className={`mt-3 inline-flex w-fit rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] ${ratingBadge[rating]}`}
      >
        {rating} signal
      </span>
      {helper ? (
        <p
          className={`mt-4 font-sans text-xs leading-relaxed md:text-sm ${
            empty ? 'text-white/85' : 'text-white/75'
          }`}
        >
          {helper}
        </p>
      ) : null}
    </div>
  );
}

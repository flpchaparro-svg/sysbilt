import type { MetricRating } from '@/types/deepAuditReport';
import { auditCardLift } from './auditCardStyles';
import { isMetricValueEmpty, isMetricValueUnknown, metricHelperForLabel } from './metricHelpers';

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

const ratingHover: Record<MetricRating, string> = {
  low: 'hover:border-red-on-dark/90 hover:bg-red-on-dark/15 motion-safe:hover:shadow-[0_28px_64px_-24px_rgba(220,38,38,0.2)]',
  medium:
    'hover:border-gold-on-dark/90 hover:bg-gold-on-dark/16 motion-safe:hover:shadow-[0_28px_64px_-24px_rgba(212,168,75,0.18)]',
  high: 'hover:border-teal/90 hover:bg-teal/18 motion-safe:hover:shadow-[0_28px_64px_-24px_rgba(15,118,110,0.22)]',
};

const emptyTileHover =
  'hover:border-white/40 hover:bg-white/[0.06] motion-safe:hover:shadow-[0_28px_64px_-24px_rgba(0,0,0,0.65)]';

/** Top bar when we are not claiming a signal strength (unknown / unverified). */
const unknownBar = 'from-white/22 via-white/10 to-white/[0.05]';

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
  const borderClass = weakTile ? 'border-dashed border-white/20' : `border ${ratingShell[rating]}`;
  const hoverClass = weakTile ? emptyTileHover : ratingHover[rating];
  const barClass = unknown ? unknownBar : ratingBar[rating];

  return (
    <div
      className={`flex min-h-full flex-col rounded-xl p-5 font-sans md:p-6 ${borderClass} bg-black/20 ${auditCardLift} ${hoverClass}`}
    >
      <div className={`h-0.5 w-full rounded-full bg-gradient-to-r ${barClass}`} aria-hidden />
      <span className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
        {label.trim() || 'Metric'}
      </span>
      <p className={`type-h4 mt-3 font-serif ${weakTile ? 'text-white/75' : 'text-white'}`}>
        {value.trim() || 'Not found'}
      </p>
      {unknown ? (
        <span className="mt-3 inline-flex w-fit rounded-full border border-white/15 bg-transparent px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.18em] text-white/40">
          unknown
        </span>
      ) : (
        <span
          className={`mt-3 inline-flex w-fit rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] ${ratingBadge[rating]}`}
        >
          {rating} signal
        </span>
      )}
      {helper ? (
        <p
          className={`mt-4 font-sans text-xs leading-relaxed md:text-sm ${
            weakTile ? 'text-white/85' : 'text-white/75'
          }`}
        >
          {helper}
        </p>
      ) : null}
    </div>
  );
}

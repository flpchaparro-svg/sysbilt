import type { MetricRating } from '@/types/deepAuditReport';
import { isMissingSignal } from '@/types/deepAuditReport';

const ratingBar: Record<MetricRating, string> = {
  low: 'from-red-on-dark/80 to-red-on-dark/20',
  medium: 'from-amber-500/80 to-amber-500/20',
  high: 'from-emerald-500/80 to-emerald-500/20',
};

const ratingLabel: Record<MetricRating, string> = {
  low: 'text-red-on-dark',
  medium: 'text-amber-400',
  high: 'text-emerald-400',
};

export interface MetricTileProps {
  label: string;
  value: string;
  rating: MetricRating;
}

export default function MetricTile({ label, value, rating }: MetricTileProps) {
  const valueMissing = isMissingSignal(value) || value.trim() === '';
  return (
    <div
      className={`flex flex-col rounded-xl border p-4 md:p-5 ${
        valueMissing
          ? 'border-dashed border-white/12 bg-white/[0.02] opacity-75'
          : 'border-white/[0.07] bg-zinc-950/60'
      }`}
    >
      <div className={`h-0.5 w-full rounded-full bg-gradient-to-r ${ratingBar[rating]}`} aria-hidden />
      <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">{label || 'Metric'}</p>
      <p className={`mt-2 text-lg font-medium tracking-tight md:text-xl ${valueMissing ? 'text-zinc-500' : 'text-white'}`}>
        {value.trim() || 'Not found'}
      </p>
      <p className={`mt-2 text-xs font-medium uppercase tracking-wider ${ratingLabel[rating]}`}>{rating} signal</p>
      {valueMissing ? (
        <p className="mt-2 text-xs leading-snug text-zinc-500">
          We could not read this metric. Use the section context for what it means for your programme.
        </p>
      ) : null}
    </div>
  );
}

import type { SignalRating } from '@/types/deepAuditReport';

const dotClass: Record<SignalRating, string> = {
  red: 'bg-red-on-dark shadow-[0_0_12px_rgba(255,107,107,0.35)]',
  amber: 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.3)]',
  green: 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]',
};

export interface RatingDotProps {
  rating: SignalRating;
  label?: string;
  className?: string;
}

export default function RatingDot({ rating, label, className = '' }: RatingDotProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`h-2.5 w-2.5 shrink-0 rounded-full ${dotClass[rating]}`}
        aria-hidden
      />
      {label ? (
        <span className="sr-only">{label}</span>
      ) : null}
    </span>
  );
}

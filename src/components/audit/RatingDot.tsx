import type { SignalRating } from '@/types/deepAuditReport';
import { m, useReducedMotion } from 'framer-motion';

const dotClass: Record<SignalRating, string> = {
  red: 'bg-red-on-dark',
  amber: 'bg-gold-on-dark',
  green: 'bg-teal',
};

const glowClass: Record<SignalRating, string> = {
  red: 'shadow-[0_0_12px_rgba(248,113,113,0.55)]',
  amber: 'shadow-[0_0_12px_rgba(212,168,75,0.55)]',
  green: 'shadow-[0_0_12px_rgba(45,212,191,0.45)]',
};

export interface RatingDotProps {
  rating: SignalRating;
  label?: string;
  className?: string;
  pulse?: boolean;
}

export default function RatingDot({ rating, label, className = '', pulse = false }: RatingDotProps) {
  const reduce = useReducedMotion();
  const showPulse = pulse && !reduce;

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <m.span
        className={`h-2.5 w-2.5 shrink-0 rounded-full ${dotClass[rating]} ${glowClass[rating]}`}
        animate={showPulse ? { scale: [1, 1.25, 1], opacity: [1, 0.75, 1] } : undefined}
        transition={showPulse ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } : undefined}
        aria-hidden
      />
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
  );
}

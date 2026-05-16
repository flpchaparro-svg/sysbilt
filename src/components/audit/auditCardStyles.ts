/**
 * Shared “premium” card hover: soft lift, depth, and smooth border/background shifts.
 * Transform and shadow apply only when `prefers-reduced-motion: no-preference` (Tailwind `motion-safe:`).
 */
export const auditCardLift =
  'transition-[transform,box-shadow,border-color,background-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_24px_60px_-22px_rgba(0,0,0,0.72)]';

/** Inset list rows: no vertical lift (avoids layout clash with dividers). */
export const auditRowHover =
  'transition-[background-color,box-shadow] duration-300 ease-out hover:bg-white/[0.07] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]';

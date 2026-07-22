/**
 * Shared Deep Audit surfaces and motion helpers.
 * Cream moment panels mirror the funnel sales pages; glass panels stay on dark.
 */

export const auditEase = [0.16, 1, 0.3, 1] as const;

/** Soft lift on interactive dark glass. */
export const auditCardLift =
  'transition-[transform,box-shadow,border-color,background-color] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:-translate-y-1.5 motion-safe:hover:shadow-[0_32px_64px_-28px_rgba(0,0,0,0.75),0_0_0_1px_rgba(212,168,75,0.18)]';

/** Inset list rows. */
export const auditRowHover =
  'transition-[background-color,box-shadow] duration-300 ease-out hover:bg-white/[0.06] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]';

/** Dark glass panel used for most data cards. */
export const auditGlass =
  'relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent shadow-[0_20px_50px_-30px_rgba(0,0,0,0.8)] backdrop-blur-sm';

/** Cream moment panel (funnel-quality contrast on dark). */
export const auditCream =
  'relative overflow-hidden rounded-2xl border border-cream/20 bg-cream text-dark shadow-[0_28px_60px_-32px_rgba(0,0,0,0.55)]';

/** Empty / missing state. */
export const auditEmpty =
  'rounded-2xl border border-dashed border-white/20 bg-white/[0.02] p-6 font-sans text-sm leading-relaxed text-white/70 md:p-8';

/** Mono eyebrow used across the report. */
export const auditEyebrow =
  'font-mono text-[10px] font-bold uppercase tracking-[0.22em] md:text-[11px]';

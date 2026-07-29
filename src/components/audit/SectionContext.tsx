import { useMemo } from 'react';
import { isMissingSignal } from '@/types/deepAuditReport';
import { auditEmpty, auditEyebrow } from './auditCardStyles';

export interface SectionContextProps {
  text: string;
  /** Short label above the meaning box. */
  label?: string;
}

/**
 * Result meaning: what the numbers above cost the owner / give them.
 * Intentionally large. This is the gift, not a footnote.
 */
export default function SectionContext({
  text,
  label = 'What this means for your business',
}: SectionContextProps) {
  const trimmed = text.trim();
  const blocks = useMemo(() => {
    if (!trimmed) return [];
    return trimmed
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean);
  }, [trimmed]);

  const treatAsMissing = !trimmed || isMissingSignal(trimmed) || trimmed.toLowerCase() === 'missing';

  if (treatAsMissing) {
    return (
      <div className={auditEmpty}>
        We could not write a clear takeaway for this section in this pass. Use the numbers above, and ask
        us to re-run if you want the owner summary.
      </div>
    );
  }

  return (
    <div className="pt-4 md:pt-6">
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border-2 border-gold-on-dark/50 bg-gradient-to-br from-gold-on-dark/[0.16] via-black/40 to-black/20 px-7 py-9 md:px-10 md:py-12">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold-on-dark to-transparent"
          aria-hidden
        />
        <p className={`${auditEyebrow} text-gold-on-dark`}>{label}</p>
        <div className="mt-5 space-y-5 font-serif text-xl leading-snug tracking-tight text-cream md:mt-6 md:space-y-6 md:text-2xl md:leading-[1.35]">
          {blocks.map((para, i) => (
            <p key={i} className="text-pretty">
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

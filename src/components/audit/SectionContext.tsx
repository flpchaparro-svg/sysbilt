import { useMemo } from 'react';
import { isMissingSignal } from '@/types/deepAuditReport';
import { auditEmpty, auditEyebrow, auditGlass } from './auditCardStyles';

export interface SectionContextProps {
  text: string;
  /** Short label above the meaning box. */
  label?: string;
}

export default function SectionContext({
  text,
  label = 'What this means for you',
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
        We could not read a reliable context paragraph for this section. Use the tiles above, and ask us to
        re-run the pass if you need narrative cover.
      </div>
    );
  }

  return (
    <div className="pt-2 md:pt-3">
      <div
        className={`relative mx-auto max-w-2xl overflow-hidden rounded-2xl border border-gold-on-dark/35 bg-gold-on-dark/[0.07] px-6 py-7 md:px-8 md:py-8 ${auditGlass}`}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-on-dark/70 to-transparent"
          aria-hidden
        />
        <p className={`${auditEyebrow} text-gold-on-dark`}>{label}</p>
        <div className="mt-4 space-y-4 font-sans text-sm leading-relaxed text-cream/90 md:space-y-5 md:text-[15px] md:leading-[1.7]">
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

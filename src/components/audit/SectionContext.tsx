import { useMemo } from 'react';
import { isMissingSignal } from '@/types/deepAuditReport';
import { auditEmpty } from './auditCardStyles';

export interface SectionContextProps {
  text: string;
}

export default function SectionContext({ text }: SectionContextProps) {
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
    <div className="border-t border-white/[0.08] pt-10 md:pt-12">
      <div className="relative mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-7 md:px-8 md:py-8">
        <div
          className="pointer-events-none absolute left-0 top-6 bottom-6 w-0.5 rounded-full bg-gradient-to-b from-gold-on-dark via-gold-on-dark/40 to-transparent"
          aria-hidden
        />
        <div className="space-y-4 pl-4 font-sans text-sm font-light leading-relaxed text-white/70 md:space-y-5 md:pl-5 md:text-[15px] md:leading-[1.7]">
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

import { useMemo } from 'react';
import { isMissingSignal } from '@/types/deepAuditReport';

export interface SectionContextProps {
  text: string;
}

export default function SectionContext({ text }: SectionContextProps) {
  const trimmed = text.trim();
  const blocks = useMemo(() => {
    if (!trimmed) return [];
    return trimmed.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  }, [trimmed]);

  const treatAsMissing = !trimmed || isMissingSignal(trimmed) || trimmed.toLowerCase() === 'missing';

  if (treatAsMissing) {
    return (
      <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-5 font-sans text-sm leading-relaxed text-white/60">
        We could not read a reliable context paragraph for this section. Use the tiles above, and ask us to re-run the pass if you need narrative cover.
      </div>
    );
  }

  return (
    <div className="space-y-3 border-l-2 border-gold-on-dark/50 pl-6 font-sans text-sm font-light leading-relaxed text-white/75 md:text-[15px] md:leading-[1.65]">
      {blocks.map((para, i) => (
        <p key={i} className="text-pretty">
          {para}
        </p>
      ))}
    </div>
  );
}

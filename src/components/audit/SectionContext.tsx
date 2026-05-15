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
      <div className="rounded-xl border border-dashed border-white/12 bg-white/[0.02] p-5 text-sm leading-relaxed text-zinc-500">
        We could not read a reliable context paragraph for this section. Use the tiles above, and ask us to re-run the pass if you need narrative cover.
      </div>
    );
  }

  return (
    <div className="space-y-3 text-sm leading-relaxed text-zinc-400 md:text-[15px] md:leading-[1.65]">
      {blocks.map((para, i) => (
        <p key={i} className="text-pretty">
          {para}
        </p>
      ))}
    </div>
  );
}

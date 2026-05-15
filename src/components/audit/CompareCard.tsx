import type { ComparePairModel } from '@/types/deepAuditReport';
import { isMissingSignal } from '@/types/deepAuditReport';

export interface CompareCardProps {
  pair: ComparePairModel;
}

export default function CompareCard({ pair }: CompareCardProps) {
  const leftMissing = isMissingSignal(pair.they_say) || !pair.they_say.trim();
  const rightMissing = isMissingSignal(pair.we_see) || !pair.we_see.trim();
  return (
    <div
      className={`grid grid-cols-1 gap-0 overflow-hidden rounded-xl border md:grid-cols-2 ${
        leftMissing || rightMissing ? 'border-dashed border-white/15 opacity-90' : 'border-white/[0.08]'
      }`}
    >
      <div className="border-b border-white/[0.06] bg-zinc-950/80 p-5 md:border-b-0 md:border-r">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">They say</p>
        <p
          className={`mt-3 text-sm italic leading-relaxed md:text-[15px] ${
            leftMissing ? 'text-zinc-500 not-italic' : 'text-zinc-200'
          }`}
        >
          {leftMissing ? 'Not found' : `"${pair.they_say}"`}
        </p>
      </div>
      <div className="bg-black/30 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-on-dark/90">We see</p>
        <p className={`mt-3 text-sm leading-relaxed md:text-[15px] ${rightMissing ? 'text-zinc-500' : 'text-zinc-300'}`}>
          {rightMissing ? 'Not found' : pair.we_see}
        </p>
      </div>
      {leftMissing || rightMissing ? (
        <p className="col-span-full border-t border-white/[0.06] bg-zinc-950/50 px-5 py-3 text-xs text-zinc-500">
          We could not read one side of this comparison. Use the section context for how we treat the gap.
        </p>
      ) : null}
    </div>
  );
}

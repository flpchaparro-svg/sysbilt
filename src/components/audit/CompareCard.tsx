import type { ComparePairModel } from '@/types/deepAuditReport';
import { isMissingSignal } from '@/types/deepAuditReport';
import { auditCardLift } from './auditCardStyles';

export interface CompareCardProps {
  pair: ComparePairModel;
}

export default function CompareCard({ pair }: CompareCardProps) {
  const leftMissing = isMissingSignal(pair.they_say) || !pair.they_say.trim();
  const rightMissing = isMissingSignal(pair.we_see) || !pair.we_see.trim();
  return (
    <div
      className={`grid grid-cols-1 gap-0 overflow-hidden rounded-xl border font-sans md:grid-cols-2 ${auditCardLift} ${
        leftMissing || rightMissing
          ? 'border-dashed border-white/15 hover:border-white/30 hover:bg-black/25 motion-safe:hover:shadow-[0_28px_64px_-24px_rgba(0,0,0,0.7)]'
          : 'border-white/10 hover:border-gold-on-dark/45 hover:bg-black/35 motion-safe:hover:shadow-[0_28px_64px_-24px_rgba(212,168,75,0.12)]'
      }`}
    >
      <div className="border-b border-white/10 bg-black/40 p-5 md:border-b-0 md:border-r md:border-white/10">
        <span className="type-eyebrow text-white/70">/ THEY SAY</span>
        <p
          className={`mt-3 text-sm italic leading-relaxed md:text-[15px] ${
            leftMissing ? 'text-white/75 not-italic' : 'text-white/90'
          }`}
        >
          {leftMissing ? 'Not found' : `"${pair.they_say}"`}
        </p>
      </div>
      <div className="bg-black/25 p-5">
        <span className="type-eyebrow text-gold-on-dark">/ WE SEE</span>
        <p className={`mt-3 text-sm leading-relaxed md:text-[15px] ${rightMissing ? 'text-white/75' : 'text-white/85'}`}>
          {rightMissing ? 'Not found' : pair.we_see}
        </p>
      </div>
      {leftMissing || rightMissing ? (
        <p className="col-span-full border-t border-white/10 bg-black/30 px-5 py-3 text-xs text-white/75">
          We could not read one side of this comparison. Use the section context for how we treat the gap.
        </p>
      ) : null}
    </div>
  );
}

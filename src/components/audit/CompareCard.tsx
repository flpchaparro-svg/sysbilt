import type { ComparePairModel } from '@/types/deepAuditReport';
import { isMissingSignal } from '@/types/deepAuditReport';
import { Quote, ScanEye } from 'lucide-react';
import { m, useReducedMotion } from 'framer-motion';
import { auditCardLift, auditEase, auditEyebrow, auditGlass } from './auditCardStyles';

export interface CompareCardProps {
  pair: ComparePairModel;
}

export default function CompareCard({ pair }: CompareCardProps) {
  const leftMissing = isMissingSignal(pair.they_say) || !pair.they_say.trim();
  const rightMissing = isMissingSignal(pair.we_see) || !pair.we_see.trim();
  const reduce = useReducedMotion();

  return (
    <m.div
      className={`grid h-full grid-cols-1 overflow-hidden md:grid-cols-2 ${auditGlass} ${auditCardLift} ${
        leftMissing || rightMissing
          ? 'border-dashed border-white/20'
          : 'border-white/10 hover:border-gold-on-dark/35'
      }`}
      initial={reduce ? false : { opacity: 0, scale: 0.97, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: auditEase }}
    >
      <m.div
        className="border-b border-white/10 bg-black/35 p-6 md:border-b-0 md:border-r md:border-white/10 md:p-7"
        initial={reduce ? false : { opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.1, ease: auditEase }}
      >
        <div className="flex items-center gap-2">
          <Quote className="h-3.5 w-3.5 text-white/35" strokeWidth={1.75} aria-hidden />
          <span className={`${auditEyebrow} text-white/45`}>They say</span>
        </div>
        <p
          className={`mt-4 text-sm leading-relaxed md:text-[15px] ${
            leftMissing ? 'text-white/60' : 'font-serif text-lg italic text-cream/90 md:text-xl'
          }`}
        >
          {leftMissing ? 'Not found' : `"${pair.they_say}"`}
        </p>
      </m.div>
      <m.div
        className="bg-gradient-to-br from-gold-on-dark/[0.08] to-transparent p-6 md:p-7"
        initial={reduce ? false : { opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.22, ease: auditEase }}
      >
        <div className="flex items-center gap-2">
          <ScanEye className="h-3.5 w-3.5 text-gold-on-dark" strokeWidth={1.75} aria-hidden />
          <span className={`${auditEyebrow} text-gold-on-dark`}>We see</span>
        </div>
        <p
          className={`mt-4 text-sm leading-relaxed md:text-[15px] ${
            rightMissing ? 'text-white/60' : 'text-white/85'
          }`}
        >
          {rightMissing ? 'Not found' : pair.we_see}
        </p>
      </m.div>
      {leftMissing || rightMissing ? (
        <p className="col-span-full border-t border-white/10 bg-black/30 px-6 py-3 text-xs text-white/60">
          We could not read one side of this comparison. Use the section context for how we treat the gap.
        </p>
      ) : null}
    </m.div>
  );
}

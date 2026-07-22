import type { CompetitorModel } from '@/types/deepAuditReport';
import { isMissingSignal } from '@/types/deepAuditReport';
import { m, useReducedMotion } from 'framer-motion';
import { auditCardLift, auditEase, auditEmpty, auditEyebrow, auditGlass } from './auditCardStyles';

export interface CompetitorStripProps {
  competitors: CompetitorModel[];
}

export default function CompetitorStrip({ competitors }: CompetitorStripProps) {
  const row = competitors.slice(0, 3);
  const reduce = useReducedMotion();

  if (row.length === 0) {
    return (
      <div className={auditEmpty}>
        No competitor cards were supplied. We are not showing a benchmark strip for this pass.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
      {row.map((c, i) => {
        const weak =
          isMissingSignal(c.name) ||
          !c.name.trim() ||
          isMissingSignal(c.domain) ||
          !c.domain.trim();
        return (
          <m.div
            key={`${c.domain}-${i}`}
            className={`h-full p-5 md:p-6 ${auditGlass} ${auditCardLift} ${
              weak ? 'border-dashed border-white/20' : 'hover:border-gold-on-dark/40'
            }`}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: auditEase }}
          >
            <p className="font-serif text-xl text-cream">{c.name.trim() || 'Not found'}</p>
            <p className="mt-1.5 font-mono text-xs text-gold-on-dark">{c.domain.trim() || 'Not found'}</p>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className={`${auditEyebrow} text-white/40`}>Outranks on</dt>
                <dd className="mt-2 text-white/80">{c.outranks_on.trim() || 'Not found'}</dd>
              </div>
              <div>
                <dt className={`${auditEyebrow} text-white/40`}>Their advantage</dt>
                <dd className="mt-2 text-white/80">{c.their_advantage.trim() || 'Not found'}</dd>
              </div>
            </dl>
            {weak ? (
              <p className="mt-4 text-xs text-white/55">
                We could not read part of this competitor row. Treat it as indicative, not definitive.
              </p>
            ) : null}
          </m.div>
        );
      })}
    </div>
  );
}

import type { CompetitorModel } from '@/types/deepAuditReport';
import { isMissingSignal } from '@/types/deepAuditReport';
import { auditCardLift } from './auditCardStyles';

export interface CompetitorStripProps {
  competitors: CompetitorModel[];
}

export default function CompetitorStrip({ competitors }: CompetitorStripProps) {
  const row = competitors.slice(0, 3);
  if (row.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-5 font-sans text-sm text-white/75">
        No competitor cards were supplied. We are not showing a benchmark strip for this pass.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {row.map((c, i) => {
        const weak =
          isMissingSignal(c.name) ||
          !c.name.trim() ||
          isMissingSignal(c.domain) ||
          !c.domain.trim();
        return (
          <div
            key={`${c.domain}-${i}`}
            className={`rounded-xl border border-white/10 bg-black/30 p-4 font-sans md:p-5 ${auditCardLift} ${
              weak
                ? 'border-dashed border-white/15 hover:border-white/30 hover:bg-black/40 motion-safe:hover:shadow-[0_28px_64px_-24px_rgba(0,0,0,0.65)]'
                : 'hover:border-gold-on-dark/40 hover:bg-black/45 motion-safe:hover:shadow-[0_28px_64px_-24px_rgba(212,168,75,0.14)]'
            }`}
          >
            <p className="type-h4 font-serif text-white">{c.name.trim() || 'Not found'}</p>
            <p className="mt-1 font-mono text-xs text-gold-on-dark">{c.domain.trim() || 'Not found'}</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
                  Outranks on
                </dt>
                <dd className="mt-2 text-white/85">{c.outranks_on.trim() || 'Not found'}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
                  Their advantage
                </dt>
                <dd className="mt-2 text-white/85">{c.their_advantage.trim() || 'Not found'}</dd>
              </div>
            </dl>
            {weak ? (
              <p className="mt-3 text-xs text-white/75">
                We could not read part of this competitor row. Treat it as indicative, not definitive.
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

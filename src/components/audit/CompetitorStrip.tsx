import type { CompetitorModel } from '@/types/deepAuditReport';
import { isMissingSignal } from '@/types/deepAuditReport';

export interface CompetitorStripProps {
  competitors: CompetitorModel[];
}

export default function CompetitorStrip({ competitors }: CompetitorStripProps) {
  const row = competitors.slice(0, 3);
  if (row.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-5 font-sans text-sm text-white/60">
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
            className={`rounded-xl border border-white/10 bg-black/30 p-4 font-sans md:p-5 ${
              weak ? 'border-dashed border-white/15 opacity-90' : ''
            }`}
          >
            <p className="type-h4 font-serif text-white">{c.name.trim() || 'Not found'}</p>
            <p className="mt-1 font-mono text-xs text-gold-on-dark">{c.domain.trim() || 'Not found'}</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="type-eyebrow text-white/50">/ OUTRANKS ON</dt>
                <dd className="mt-2 text-white/80">{c.outranks_on.trim() || 'Not found'}</dd>
              </div>
              <div>
                <dt className="type-eyebrow text-white/50">/ THEIR ADVANTAGE</dt>
                <dd className="mt-2 text-white/80">{c.their_advantage.trim() || 'Not found'}</dd>
              </div>
            </dl>
            {weak ? (
              <p className="mt-3 text-xs text-white/55">
                We could not read part of this competitor row. Treat it as indicative, not definitive.
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

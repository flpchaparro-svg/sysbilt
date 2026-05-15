import type { CompetitorModel } from '@/types/deepAuditReport';
import { isMissingSignal } from '@/types/deepAuditReport';

export interface CompetitorStripProps {
  competitors: CompetitorModel[];
}

export default function CompetitorStrip({ competitors }: CompetitorStripProps) {
  const row = competitors.slice(0, 3);
  if (row.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-white/12 bg-white/[0.02] p-5 text-sm text-zinc-500">
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
            className={`rounded-xl border border-white/[0.07] bg-zinc-950/70 p-4 md:p-5 ${
              weak ? 'border-dashed opacity-75' : ''
            }`}
          >
            <p className="font-serif text-lg text-white">{c.name.trim() || 'Not found'}</p>
            <p className="mt-1 font-mono text-xs text-gold-on-dark/90">{c.domain.trim() || 'Not found'}</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-zinc-500">Outranks on</dt>
                <dd className="mt-1 text-zinc-300">{c.outranks_on.trim() || 'Not found'}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-zinc-500">Their advantage</dt>
                <dd className="mt-1 text-zinc-300">{c.their_advantage.trim() || 'Not found'}</dd>
              </div>
            </dl>
            {weak ? (
              <p className="mt-3 text-xs text-zinc-500">
                We could not read part of this competitor row. Treat it as indicative, not definitive.
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

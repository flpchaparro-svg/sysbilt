import type { KeywordGridItem } from '@/types/deepAuditReport';
import { isMissingSignal } from '@/types/deepAuditReport';

function positionTier(position: string): 'top' | 'mid' | 'none' {
  const s = position.trim().toLowerCase();
  if (s.includes('not ranking') || isMissingSignal(s) || s === 'missing' || s === '') return 'none';
  const n = Number(s);
  if (!Number.isNaN(n)) {
    if (n >= 1 && n <= 3) return 'top';
    if (n >= 4 && n <= 10) return 'mid';
  }
  return 'none';
}

const tierClass = {
  top: 'border-teal/50 bg-teal/15 text-white',
  mid: 'border-gold-on-dark/45 bg-gold-on-dark/12 text-white',
  none: 'border-red-on-dark/45 bg-red-on-dark/12 text-white',
} as const;

export interface KeywordGridProps {
  keyword_grid: KeywordGridItem[];
}

export default function KeywordGrid({ keyword_grid }: KeywordGridProps) {
  if (keyword_grid.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-6 font-sans text-sm text-white/75">
        No keyword rows were returned for this audit. We could not map search demand to your site from this pass.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {keyword_grid.map((k, i) => {
        const tier = positionTier(k.position);
        const posLabel = k.position.trim() || 'Not found';
        const kwMissing = !k.keyword.trim() || isMissingSignal(k.keyword);
        return (
          <div
            key={`${k.keyword}-${i}`}
            className={`rounded-xl border px-4 py-3 ${tierClass[tier]} ${kwMissing ? 'border-dashed' : ''}`}
          >
            <p className={`text-sm font-semibold tracking-tight ${kwMissing ? 'text-white/75' : ''}`}>
              {k.keyword.trim() || 'Not found'}
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider text-white/75">Position · {posLabel}</p>
            {k.competitor_ranking_here.trim() ? (
              <p className="mt-2 border-t border-white/10 pt-2 text-xs text-white/80">
                Competitor here: <span className="text-white">{k.competitor_ranking_here}</span>
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

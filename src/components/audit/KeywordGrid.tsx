import type { KeywordGridItem } from '@/types/deepAuditReport';
import { isMissingSignal } from '@/types/deepAuditReport';
import { m, useReducedMotion } from 'framer-motion';
import { auditCardLift, auditEase, auditEmpty, auditGlass } from './auditCardStyles';

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

const tierAccent = {
  top: 'border-teal/40 hover:border-teal/70',
  mid: 'border-gold-on-dark/35 hover:border-gold-on-dark/65',
  none: 'border-red-on-dark/35 hover:border-red-on-dark/65',
} as const;

const tierDot = {
  top: 'bg-teal',
  mid: 'bg-gold-on-dark',
  none: 'bg-red-on-dark',
} as const;

export interface KeywordGridProps {
  keyword_grid: KeywordGridItem[];
}

export default function KeywordGrid({ keyword_grid }: KeywordGridProps) {
  const reduce = useReducedMotion();

  if (keyword_grid.length === 0) {
    return (
      <div className={auditEmpty}>
        No keyword rows were returned for this audit. We could not map search demand to your site from this
        pass.
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
          <m.div
            key={`${k.keyword}-${i}`}
            className={`px-5 py-4 ${auditGlass} ${auditCardLift} ${tierAccent[tier]} ${
              kwMissing ? 'border-dashed' : ''
            }`}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: (i % 6) * 0.04, ease: auditEase }}
          >
            <div className="flex items-start justify-between gap-3">
              <p
                className={`font-sans text-sm font-semibold tracking-tight md:text-[15px] ${
                  kwMissing ? 'text-white/65' : 'text-cream'
                }`}
              >
                {k.keyword.trim() || 'Not found'}
              </p>
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${tierDot[tier]}`} aria-hidden />
            </div>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
              Position · {posLabel}
            </p>
            {k.competitor_ranking_here.trim() ? (
              <p className="mt-3 border-t border-white/10 pt-3 text-xs text-white/60">
                Competitor here: <span className="text-white/85">{k.competitor_ranking_here}</span>
              </p>
            ) : null}
          </m.div>
        );
      })}
    </div>
  );
}

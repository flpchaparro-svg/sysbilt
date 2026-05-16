import type { SentimentModel } from '@/types/deepAuditReport';
import { auditCardLift } from './auditCardStyles';

export interface SentimentBarProps {
  sentiment: SentimentModel;
}

function clampPct(n: number): number {
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(100, n);
}

export default function SentimentBar({ sentiment }: SentimentBarProps) {
  let p = clampPct(sentiment.positive);
  let n = clampPct(sentiment.neutral);
  let neg = clampPct(sentiment.negative);
  const sum = p + n + neg;
  if (sum > 0 && sum !== 100) {
    p = (p / sum) * 100;
    n = (n / sum) * 100;
    neg = (neg / sum) * 100;
  }
  const allZero = p === 0 && n === 0 && neg === 0;

  return (
    <div
      className={`rounded-xl border border-white/10 bg-black/30 p-5 font-sans md:p-6 ${auditCardLift} hover:border-white/25 hover:bg-black/45 motion-safe:hover:shadow-[0_28px_64px_-24px_rgba(0,0,0,0.75)]`}
    >
      <div className="flex flex-wrap items-end justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">Sentiment split</p>
        {allZero ? (
          <p className="text-xs text-white/75">We could not derive percentages for this pass.</p>
        ) : null}
      </div>
      <div
        className={`mt-4 flex h-3 overflow-hidden rounded-full ${allZero ? 'border border-dashed border-white/12' : ''}`}
        role="img"
        aria-label={`Sentiment positive ${p.toFixed(0)} percent, neutral ${n.toFixed(0)} percent, negative ${neg.toFixed(0)} percent`}
      >
        <span style={{ width: `${p}%` }} className="bg-teal/90" />
        <span style={{ width: `${n}%` }} className="bg-zinc-500/90" />
        <span style={{ width: `${neg}%` }} className="bg-red-on-dark/90" />
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-3 text-center text-xs md:text-sm">
        <div>
          <dt className="text-white/70">Positive</dt>
          <dd className="mt-1 font-medium text-teal">{allZero ? '—' : `${p.toFixed(0)}%`}</dd>
        </div>
        <div>
          <dt className="text-white/70">Neutral</dt>
          <dd className="mt-1 font-medium text-white/90">{allZero ? '—' : `${n.toFixed(0)}%`}</dd>
        </div>
        <div>
          <dt className="text-white/70">Negative</dt>
          <dd className="mt-1 font-medium text-red-on-dark">{allZero ? '—' : `${neg.toFixed(0)}%`}</dd>
        </div>
      </dl>
    </div>
  );
}

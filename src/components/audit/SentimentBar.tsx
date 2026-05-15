import type { SentimentModel } from '@/types/deepAuditReport';

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
    <div className="rounded-xl border border-white/[0.07] bg-zinc-950/60 p-5 md:p-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Sentiment split</p>
        {allZero ? (
          <p className="text-xs text-zinc-500">We could not derive percentages for this pass.</p>
        ) : null}
      </div>
      <div
        className={`mt-4 flex h-3 overflow-hidden rounded-full ${allZero ? 'border border-dashed border-white/12 opacity-60' : ''}`}
        role="img"
        aria-label={`Sentiment positive ${p.toFixed(0)} percent, neutral ${n.toFixed(0)} percent, negative ${neg.toFixed(0)} percent`}
      >
        <span style={{ width: `${p}%` }} className="bg-emerald-500/90" />
        <span style={{ width: `${n}%` }} className="bg-zinc-500/90" />
        <span style={{ width: `${neg}%` }} className="bg-red-on-dark/90" />
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-3 text-center text-xs md:text-sm">
        <div>
          <dt className="text-zinc-500">Positive</dt>
          <dd className="mt-1 font-medium text-emerald-400">{allZero ? '—' : `${p.toFixed(0)}%`}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">Neutral</dt>
          <dd className="mt-1 font-medium text-zinc-300">{allZero ? '—' : `${n.toFixed(0)}%`}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">Negative</dt>
          <dd className="mt-1 font-medium text-red-on-dark">{allZero ? '—' : `${neg.toFixed(0)}%`}</dd>
        </div>
      </dl>
    </div>
  );
}

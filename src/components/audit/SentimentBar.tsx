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
  const dominantPositive = !allZero && p >= 99.5;

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-5 font-sans md:p-7 ${auditCardLift} hover:border-white/20`}
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gold-on-dark">
            Sentiment split
          </p>
          <p className="mt-2 font-sans text-sm text-white/65">
            Share of the reviews we could classify in this pass.
          </p>
        </div>
        {allZero ? (
          <p className="text-xs text-white/65">We could not derive percentages for this pass.</p>
        ) : null}
        {dominantPositive ? (
          <p className="rounded-full border border-teal/40 bg-teal/10 px-3 py-1 text-xs font-medium text-teal">
            Almost all positive in this sample
          </p>
        ) : null}
      </div>

      <div
        className={`mt-6 flex h-5 overflow-hidden rounded-full bg-white/5 ring-1 ring-inset ring-white/10 ${allZero ? 'border border-dashed border-white/15' : ''}`}
        role="img"
        aria-label={`Sentiment positive ${p.toFixed(0)} percent, neutral ${n.toFixed(0)} percent, negative ${neg.toFixed(0)} percent`}
      >
        {p > 0 ? <span style={{ width: `${p}%` }} className="bg-teal min-w-[0.35rem]" /> : null}
        {n > 0 ? <span style={{ width: `${n}%` }} className="bg-zinc-400 min-w-[0.35rem]" /> : null}
        {neg > 0 ? (
          <span style={{ width: `${neg}%` }} className="bg-red-on-dark min-w-[0.35rem]" />
        ) : null}
      </div>

      <dl className="mt-5 grid grid-cols-3 gap-3 text-center text-xs md:text-sm">
        <div className="rounded-lg bg-black/25 px-2 py-3">
          <dt className="text-white/55">Positive</dt>
          <dd className="mt-1 font-serif text-xl text-teal md:text-2xl">
            {allZero ? 'n/a' : `${p.toFixed(0)}%`}
          </dd>
        </div>
        <div className="rounded-lg bg-black/25 px-2 py-3">
          <dt className="text-white/55">Neutral</dt>
          <dd className="mt-1 font-serif text-xl text-white/90 md:text-2xl">
            {allZero ? 'n/a' : `${n.toFixed(0)}%`}
          </dd>
        </div>
        <div className="rounded-lg bg-black/25 px-2 py-3">
          <dt className="text-white/55">Negative</dt>
          <dd className="mt-1 font-serif text-xl text-red-on-dark md:text-2xl">
            {allZero ? 'n/a' : `${neg.toFixed(0)}%`}
          </dd>
        </div>
      </dl>
    </div>
  );
}

import type { SentimentModel } from '@/types/deepAuditReport';
import { m, useReducedMotion } from 'framer-motion';
import { auditCardLift, auditEase, auditEyebrow, auditGlass } from './auditCardStyles';

export interface SentimentBarProps {
  sentiment: SentimentModel;
  /** Total Google reviews behind the star split, when known. */
  reviewCount?: string;
}

function clampPct(n: number): number {
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(100, n);
}

export default function SentimentBar({ sentiment, reviewCount }: SentimentBarProps) {
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
  const dominantPositive = !allZero && p >= 85;
  const reduce = useReducedMotion();
  const countLabel = reviewCount?.trim() && !/^n\/?a$/i.test(reviewCount.trim()) ? reviewCount.trim() : '';

  return (
    <div className={`${auditGlass} ${auditCardLift} p-6 md:p-8`}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="max-w-xl">
          <p className={`${auditEyebrow} text-gold-on-dark`}>Sentiment split</p>
          <p className="mt-2 font-sans text-sm text-white/55">
            From Google star ratings across
            {countLabel ? ` all ${countLabel} counted reviews` : ' the counted reviews on the listing'}
            . Four and five stars count as positive, three as neutral, one and two as negative.
          </p>
        </div>
        {allZero ? (
          <p className="text-xs text-white/55">We could not read a Google star split for this pass.</p>
        ) : null}
        {dominantPositive ? (
          <m.p
            className="rounded-full border border-teal/40 bg-teal/10 px-3 py-1.5 text-xs font-medium text-teal"
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: auditEase }}
          >
            Strongly positive on Google stars
          </m.p>
        ) : null}
      </div>

      <div
        className={`mt-7 flex h-6 overflow-hidden rounded-full bg-white/[0.06] ring-1 ring-inset ring-white/10 ${
          allZero ? 'border border-dashed border-white/15' : ''
        }`}
        role="img"
        aria-label={`Sentiment positive ${p.toFixed(0)} percent, neutral ${n.toFixed(0)} percent, negative ${neg.toFixed(0)} percent`}
      >
        {p > 0 ? (
          <m.span
            className="min-w-[0.35rem] bg-gradient-to-r from-teal to-teal/70"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: auditEase }}
            style={{ width: `${p}%`, transformOrigin: 'left' }}
          />
        ) : null}
        {n > 0 ? (
          <m.span
            className="min-w-[0.35rem] bg-zinc-400"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.08, ease: auditEase }}
            style={{ width: `${n}%`, transformOrigin: 'left' }}
          />
        ) : null}
        {neg > 0 ? (
          <m.span
            className="min-w-[0.35rem] bg-gradient-to-r from-red-on-dark to-red-on-dark/70"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.12, ease: auditEase }}
            style={{ width: `${neg}%`, transformOrigin: 'left' }}
          />
        ) : null}
      </div>

      <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
        {[
          { label: 'Positive', value: p, color: 'text-teal' },
          { label: 'Neutral', value: n, color: 'text-white/90' },
          { label: 'Negative', value: neg, color: 'text-red-on-dark' },
        ].map((cell) => (
          <div key={cell.label} className="rounded-xl bg-black/30 px-2 py-4">
            <dt className="text-xs text-white/45">{cell.label}</dt>
            <dd className={`mt-1.5 font-serif text-2xl md:text-3xl ${cell.color}`}>
              {allZero ? 'n/a' : `${cell.value.toFixed(0)}%`}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

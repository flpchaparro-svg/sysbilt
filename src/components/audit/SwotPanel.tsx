import type { SwotModel } from '@/types/deepAuditReport';
import { auditCardLift } from './auditCardStyles';

function BulletList({ items, emptyHint }: { items: string[]; emptyHint: string }) {
  if (!items.length) {
    return <p className="font-sans text-sm text-white/80">{emptyHint}</p>;
  }
  return (
    <ul className="list-inside list-disc space-y-1.5 font-sans text-sm leading-snug text-white/85">
      {items.map((t, i) => (
        <li key={i} className="text-pretty">
          {t}
        </li>
      ))}
    </ul>
  );
}

export interface SwotPanelProps {
  swot: SwotModel;
}

export default function SwotPanel({ swot }: SwotPanelProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div
        className={`rounded-xl border border-teal/35 bg-teal/10 p-5 md:p-6 ${auditCardLift} hover:border-teal/70 hover:bg-teal/16 motion-safe:hover:shadow-[0_28px_64px_-24px_rgba(15,118,110,0.22)]`}
      >
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-teal">
          Strengths
        </span>
        <div className="mt-3">
          <BulletList items={swot.strengths} emptyHint="No strengths were listed." />
        </div>
      </div>
      <div
        className={`rounded-xl border border-red-on-dark/40 bg-red-on-dark/10 p-5 md:p-6 ${auditCardLift} hover:border-red-on-dark/75 hover:bg-red-on-dark/16 motion-safe:hover:shadow-[0_28px_64px_-24px_rgba(248,113,113,0.2)]`}
      >
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-red-on-dark">
          Weaknesses
        </span>
        <div className="mt-3">
          <BulletList items={swot.weaknesses} emptyHint="No weaknesses were listed." />
        </div>
      </div>
      <div
        className={`rounded-xl border border-sky-500/40 bg-sky-500/[0.1] p-5 md:p-6 ${auditCardLift} hover:border-sky-400/70 hover:bg-sky-500/[0.16] motion-safe:hover:shadow-[0_28px_64px_-24px_rgba(56,189,248,0.18)]`}
      >
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-sky-100">
          Opportunities
        </span>
        <div className="mt-3">
          <BulletList items={swot.opportunities} emptyHint="No opportunities were listed." />
        </div>
      </div>
      <div
        className={`rounded-xl border border-gold-on-dark/35 bg-gold-on-dark/10 p-5 md:p-6 ${auditCardLift} hover:border-gold-on-dark/70 hover:bg-gold-on-dark/16 motion-safe:hover:shadow-[0_28px_64px_-24px_rgba(212,168,75,0.2)]`}
      >
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gold-on-dark">
          Threats
        </span>
        <div className="mt-3">
          <BulletList items={swot.threats} emptyHint="No threats were listed." />
        </div>
      </div>
    </div>
  );
}

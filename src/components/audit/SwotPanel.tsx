import type { SwotModel } from '@/types/deepAuditReport';
import { m, useReducedMotion } from 'framer-motion';
import { auditCardLift, auditEase, auditEyebrow, auditGlass } from './auditCardStyles';

function BulletList({ items, emptyHint }: { items: string[]; emptyHint: string }) {
  if (!items.length) {
    return <p className="font-sans text-sm text-white/60">{emptyHint}</p>;
  }
  return (
    <ul className="space-y-2.5 font-sans text-sm leading-snug text-white/80">
      {items.map((t, i) => (
        <li key={i} className="flex gap-2.5 text-pretty">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-current opacity-50" aria-hidden />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export interface SwotPanelProps {
  swot: SwotModel;
}

const cells: {
  key: keyof SwotModel;
  label: string;
  border: string;
  labelColor: string;
  empty: string;
}[] = [
  {
    key: 'strengths',
    label: 'Strengths',
    border: 'border-teal/35',
    labelColor: 'text-teal',
    empty: 'No strengths were listed.',
  },
  {
    key: 'weaknesses',
    label: 'Weaknesses',
    border: 'border-red-on-dark/40',
    labelColor: 'text-red-on-dark',
    empty: 'No weaknesses were listed.',
  },
  {
    key: 'opportunities',
    label: 'Opportunities',
    border: 'border-sky-400/40',
    labelColor: 'text-sky-200',
    empty: 'No opportunities were listed.',
  },
  {
    key: 'threats',
    label: 'Threats',
    border: 'border-gold-on-dark/40',
    labelColor: 'text-gold-on-dark',
    empty: 'No threats were listed.',
  },
];

export default function SwotPanel({ swot }: SwotPanelProps) {
  const reduce = useReducedMotion();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
      {cells.map((cell, i) => (
        <m.div
          key={cell.key}
          className={`border ${cell.border} p-5 md:p-6 ${auditGlass} ${auditCardLift}`}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: auditEase }}
        >
          <span className={`${auditEyebrow} ${cell.labelColor}`}>{cell.label}</span>
          <div className="mt-4">
            <BulletList items={swot[cell.key]} emptyHint={cell.empty} />
          </div>
        </m.div>
      ))}
    </div>
  );
}

import type { SwotModel } from '@/types/deepAuditReport';
import { Shield, ShieldAlert, Sparkles, Swords } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { m, useReducedMotion } from 'framer-motion';
import { auditCardLift, auditEase, auditGlass } from './auditCardStyles';

function BulletList({ items, emptyHint }: { items: string[]; emptyHint: string }) {
  if (!items.length) {
    return <p className="font-sans text-sm text-white/60">{emptyHint}</p>;
  }
  return (
    <ul className="space-y-3.5 font-sans text-sm leading-relaxed text-white/80 md:text-[15px]">
      {items.map((t, i) => (
        <li key={i} className="flex gap-3 text-pretty">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-45" aria-hidden />
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
  letter: string;
  label: string;
  gloss: string;
  border: string;
  labelColor: string;
  Icon: LucideIcon;
  empty: string;
}[] = [
  {
    key: 'strengths',
    letter: 'S',
    label: 'Strengths',
    gloss: 'What already works for you',
    border: 'border-teal/35',
    labelColor: 'text-teal',
    Icon: Shield,
    empty: 'No strengths were listed.',
  },
  {
    key: 'weaknesses',
    letter: 'W',
    label: 'Weaknesses',
    gloss: 'Where you are soft today',
    border: 'border-red-on-dark/40',
    labelColor: 'text-red-on-dark',
    Icon: ShieldAlert,
    empty: 'No weaknesses were listed.',
  },
  {
    key: 'opportunities',
    letter: 'O',
    label: 'Opportunities',
    gloss: 'Gaps you could take',
    border: 'border-sky-400/40',
    labelColor: 'text-sky-200',
    Icon: Sparkles,
    empty: 'No opportunities were listed.',
  },
  {
    key: 'threats',
    letter: 'T',
    label: 'Threats',
    gloss: 'What could take from you',
    border: 'border-gold-on-dark/40',
    labelColor: 'text-gold-on-dark',
    Icon: Swords,
    empty: 'No threats were listed.',
  },
];

export default function SwotPanel({ swot }: SwotPanelProps) {
  const reduce = useReducedMotion();

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
      {cells.map((cell, i) => (
        <m.div
          key={cell.key}
          className={`border ${cell.border} p-6 md:p-7 ${auditGlass} ${auditCardLift}`}
          initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: i * 0.08, ease: auditEase }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3.5">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${cell.border} bg-black/30 ${cell.labelColor}`}
              >
                <cell.Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </div>
              <div>
                <p className={`font-serif text-xl tracking-tight text-cream md:text-2xl`}>
                  <span className={cell.labelColor}>{cell.letter}</span>
                  <span className="text-white/25"> · </span>
                  {cell.label}
                </p>
                <p className="mt-1.5 font-sans text-xs text-white/50 md:text-sm">{cell.gloss}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 border-t border-white/10 pt-5">
            <BulletList items={swot[cell.key]} emptyHint={cell.empty} />
          </div>
        </m.div>
      ))}
    </div>
  );
}

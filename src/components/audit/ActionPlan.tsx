import type { ActionPlanItem } from '@/types/deepAuditReport';
import { isMissingSignal } from '@/types/deepAuditReport';
import { m, useReducedMotion } from 'framer-motion';
import { auditCardLift, auditEase, auditEmpty, auditEyebrow, auditGlass } from './auditCardStyles';

export interface ActionPlanProps {
  action_plan: ActionPlanItem[];
}

function formatLinkedSection(raw: string): string {
  const s = raw.trim().toLowerCase();
  if (s === 'find') return 'Local search';
  if (s === 'perceive') return 'Website';
  if (s === 'review') return 'Reviews';
  if (s === 'appendix') return 'Technical';
  return raw.trim() || '';
}

export default function ActionPlan({ action_plan }: ActionPlanProps) {
  const sorted = [...action_plan].sort((a, b) => (a.rank || 0) - (b.rank || 0));
  const display = sorted.slice(0, 5);
  const reduce = useReducedMotion();

  if (display.length === 0) {
    return (
      <div className={auditEmpty}>
        No action plan rows were returned. We could not list prioritised moves for this pass.
      </div>
    );
  }

  return (
    <ol className="relative flex flex-col gap-5 pt-2 md:gap-6 md:pt-4">
      <div
        className="pointer-events-none absolute bottom-8 left-[1.85rem] top-8 w-px bg-gradient-to-b from-gold-on-dark/50 via-gold-on-dark/20 to-transparent md:left-[2.1rem]"
        aria-hidden
      />
      {display.map((item, idx) => {
        const rank = item.rank > 0 ? item.rank : idx + 1;
        const titleMissing = isMissingSignal(item.title) || !item.title.trim();
        const tag = formatLinkedSection(item.linked_to_section);
        return (
          <m.li
            key={`${rank}-${item.title}`}
            className={`relative flex gap-5 p-5 md:gap-6 md:p-6 ${auditGlass} ${auditCardLift} ${
              titleMissing
                ? 'border-dashed border-white/20'
                : 'border-gold-on-dark/25 hover:border-gold-on-dark/50'
            }`}
            initial={reduce ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: idx * 0.08, ease: auditEase }}
          >
            <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-on-dark/60 bg-dark font-mono text-sm font-medium text-gold-on-dark shadow-[0_0_24px_rgba(212,168,75,0.2)]">
              {String(rank).padStart(2, '0')}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h4
                  className={`font-serif text-xl tracking-tight md:text-2xl ${
                    titleMissing ? 'text-white/65' : 'text-cream'
                  }`}
                >
                  {item.title.trim() || 'Not found'}
                </h4>
                {tag ? (
                  <span className={`${auditEyebrow} rounded-full border border-gold-on-dark/35 bg-gold-on-dark/10 px-2.5 py-1 text-gold-on-dark`}>
                    {tag}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 font-sans text-sm leading-relaxed text-white/65 md:text-base">
                {item.rationale.trim() || 'Not found'}
              </p>
            </div>
          </m.li>
        );
      })}
    </ol>
  );
}

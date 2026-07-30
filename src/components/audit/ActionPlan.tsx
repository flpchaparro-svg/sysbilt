import type { ActionPlanItem } from '@/types/deepAuditReport';
import { isMissingSignal } from '@/types/deepAuditReport';
import { productForActionItem } from '@/lib/auditProductMap';
import { m, useReducedMotion } from 'framer-motion';
import { auditCardLift, auditEase, auditEmpty, auditEyebrow, auditGlass } from './auditCardStyles';

export interface ActionPlanProps {
  action_plan: ActionPlanItem[];
  /** When true, First Moves collapse to a single rebuild recommendation. */
  rebuildMode?: boolean;
  businessName?: string;
}

function formatLinkedSection(raw: string): string {
  const s = raw.trim().toLowerCase();
  if (s === 'find') return 'Local search';
  if (s === 'perceive') return 'Website';
  if (s === 'review') return 'Reviews';
  if (s === 'appendix') return 'Technical';
  return raw.trim() || '';
}

export default function ActionPlan({
  action_plan,
  rebuildMode = false,
  businessName = '',
}: ActionPlanProps) {
  const sorted = [...action_plan].sort((a, b) => (a.rank || 0) - (b.rank || 0));
  const bParam = encodeURIComponent(businessName.trim().slice(0, 40));
  const withB = (href: string) => (bParam ? `${href}${href.includes('?') ? '&' : '?'}b=${bParam}` : href);
  const display = rebuildMode
    ? [
        {
          rank: 1,
          title: 'Replace the base, do not keep patching',
          rationale:
            'This public site is too thin or fragile to carry the fixes one by one. A clean hosted site is the shorter path to a front door that can convert.',
          linked_to_section: 'perceive',
        } satisfies ActionPlanItem,
      ]
    : sorted.slice(0, 5);
  const reduce = useReducedMotion();

  if (display.length === 0) {
    return (
      <div className={auditEmpty}>
        No action plan rows were returned. We could not list prioritised moves for this pass.
      </div>
    );
  }

  return (
    <ol className="relative mx-auto flex max-w-3xl flex-col gap-6 pt-2 md:gap-7 md:pt-4">
      <m.div
        className="pointer-events-none absolute bottom-10 left-[1.85rem] top-10 w-px origin-top bg-gradient-to-b from-gold-on-dark via-gold-on-dark/35 to-transparent md:left-[2.1rem]"
        initial={reduce ? false : { scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.1, ease: auditEase, delay: 0.15 }}
        aria-hidden
      />
      {display.map((item, idx) => {
        const rank = item.rank > 0 ? item.rank : idx + 1;
        const titleMissing = isMissingSignal(item.title) || !item.title.trim();
        const tag = formatLinkedSection(item.linked_to_section);
        const product = rebuildMode
          ? {
              name: 'Hosted Website Plan',
              blurb: 'A clean site we build and host',
              href: 'https://sysbilt.com/go/website',
              code: 'website',
            }
          : productForActionItem(item, { allowRebuild: false });
        const fromLeft = idx % 2 === 0;
        return (
          <m.li
            key={`${rank}-${item.title}`}
            className={`relative flex gap-5 p-5 md:gap-6 md:p-6 ${auditGlass} ${auditCardLift} ${
              titleMissing
                ? 'border-dashed border-white/20'
                : 'border-gold-on-dark/30 hover:border-gold-on-dark/55'
            }`}
            initial={
              reduce
                ? false
                : {
                    opacity: 0,
                    x: fromLeft ? -48 : 48,
                    y: 18,
                    scale: 0.96,
                  }
            }
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              delay: 0.12 + idx * 0.16,
              ease: auditEase,
            }}
          >
            <m.div
              className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-on-dark/70 bg-dark font-mono text-sm font-medium text-gold-on-dark shadow-[0_0_28px_rgba(212,168,75,0.35)]"
              initial={reduce ? false : { scale: 0.4, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 320,
                damping: 18,
                delay: 0.2 + idx * 0.16,
              }}
            >
              {String(rank).padStart(2, '0')}
            </m.div>
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
                  <span
                    className={`${auditEyebrow} rounded-full border border-gold-on-dark/35 bg-gold-on-dark/10 px-2.5 py-1 text-gold-on-dark`}
                  >
                    {tag}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 font-sans text-sm leading-relaxed text-white/65 md:text-base">
                {item.rationale.trim() || 'Not found'}
              </p>
              {product ? (
                <a
                  href={withB(product.href)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-5 inline-flex min-h-[3.25rem] w-full items-center justify-between gap-3 rounded-2xl border border-gold-on-dark bg-gold-on-dark px-5 py-3.5 font-sans text-sm font-medium text-dark transition-all duration-[250ms] hover:bg-cream active:scale-[0.99] md:min-h-[3.5rem] md:px-6 md:text-base"
                >
                  <span className="text-left leading-snug">
                    <span className="block text-[11px] font-normal uppercase tracking-[0.14em] text-dark/55">
                      Fixed-scope job
                    </span>
                    <span className="mt-0.5 block">{product.name}</span>
                  </span>
                  <span
                    className="shrink-0 font-mono text-xs uppercase tracking-[0.16em] text-dark/70 transition-transform duration-[250ms] group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    Open →
                  </span>
                </a>
              ) : null}
            </div>
          </m.li>
        );
      })}
    </ol>
  );
}

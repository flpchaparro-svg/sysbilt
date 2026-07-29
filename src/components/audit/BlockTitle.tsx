import type { LucideIcon } from 'lucide-react';
import { m, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { auditEase, auditEyebrow } from './auditCardStyles';

export interface BlockTitleProps {
  title: string;
  description?: string;
  Icon?: LucideIcon;
  children?: ReactNode;
}

/**
 * Real subsection heading (not an eyebrow). Used for Search terms, Competitors, SWOT, Tools, etc.
 */
export default function BlockTitle({ title, description, Icon, children }: BlockTitleProps) {
  const reduce = useReducedMotion();

  return (
    <m.div
      className="mb-8 md:mb-10"
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: auditEase }}
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3.5">
          {Icon ? (
            <m.div
              className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold-on-dark/35 bg-gold-on-dark/10 text-gold-on-dark"
              initial={reduce ? false : { scale: 0.7, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.08 }}
            >
              <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </m.div>
          ) : null}
          <div className="min-w-0">
            <h3 className="font-serif text-2xl tracking-tight text-cream md:text-3xl">{title}</h3>
            {description ? (
              <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-white/55 md:text-[15px] md:leading-relaxed">
                {description}
              </p>
            ) : null}
          </div>
        </div>
        {children}
      </div>
      <div className="mt-6 h-px w-full bg-gradient-to-r from-gold-on-dark/40 via-white/10 to-transparent" aria-hidden />
    </m.div>
  );
}

/** Tiny label inside a card only (They say / What we saw). Not for section titles. */
export function InCardLabel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`${auditEyebrow} ${className}`}>{children}</span>;
}

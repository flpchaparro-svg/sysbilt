import { m, type Variants, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { auditEase } from './auditCardStyles';

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: auditEase },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: auditEase },
  },
};

export interface AuditScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Scroll-triggered fade/slide for report sections. */
export default function AuditScrollReveal({ children, className, delay = 0 }: AuditScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <m.div
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -48px 0px' }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export interface AuditStaggerProps {
  children: ReactNode;
  className?: string;
}

/** Parent for staggered card grids. */
export function AuditStagger({ children, className }: AuditStaggerProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <m.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -40px 0px' }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export interface AuditStaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function AuditStaggerItem({ children, className }: AuditStaggerItemProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <m.div variants={staggerItem} className={className}>
      {children}
    </m.div>
  );
}

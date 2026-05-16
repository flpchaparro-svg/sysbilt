import { m, type Variants, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] },
  },
};

export interface AuditScrollRevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * Scroll-triggered fade/slide for report sections (not individual metric/diagnosis cards).
 */
export default function AuditScrollReveal({ children, className }: AuditScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <m.div
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -56px 0px' }}
      className={className}
    >
      {children}
    </m.div>
  );
}

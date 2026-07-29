import { m, useReducedMotion } from 'framer-motion';
import { auditEase } from './auditCardStyles';

export interface IntroParagraphProps {
  firstName: string;
  companyName: string;
  /** Optional model-written gift framing. */
  giftIntro?: string;
}

/**
 * Gift intro: why this exists, what the owner gets, no process theatre.
 */
export default function IntroParagraph({ firstName, companyName, giftIntro }: IntroParagraphProps) {
  const reduce = useReducedMotion();
  const body =
    giftIntro?.trim() ||
    `We checked how easy it is for a new patient or client to find ${companyName}, trust you, and take the next step. Search, your Google listing, your website, and your reviews. Below is what we saw, what it is costing you, and what we would fix first.`;

  return (
    <section className="space-y-8 pb-2 pt-2 md:space-y-10" aria-label="Introduction">
      <m.div
        className="mx-auto max-w-3xl text-center"
        initial={reduce ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: auditEase }}
      >
        <h2 className="font-serif text-3xl tracking-tight text-cream md:text-5xl">Hi {firstName}</h2>
        <p className="mt-6 font-sans text-base leading-relaxed text-white/75 md:text-xl md:leading-[1.65]">
          {body}
        </p>
      </m.div>
    </section>
  );
}

export function firstNameFromEmail(email: string): string {
  const local = email.split('@')[0]?.trim() ?? '';
  if (!local) return 'there';
  const segment = local.split(/[._-]/)[0] ?? local;
  if (!segment) return 'there';
  return segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();
}

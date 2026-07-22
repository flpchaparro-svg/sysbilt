import { m, useReducedMotion } from 'framer-motion';
import { auditCream, auditEase, auditEyebrow } from './auditCardStyles';

export interface IntroParagraphProps {
  firstName: string;
  companyName: string;
}

const steps = [
  {
    step: '01',
    title: 'What we found first',
    text: 'Three findings, ranked by impact on enquiries and trust.',
  },
  {
    step: '02',
    title: 'First moves',
    text: 'What we would do next, in order, if we picked up the work.',
  },
  {
    step: '03',
    title: 'The detail',
    text: 'Search, website, reviews, then a short technical checklist.',
  },
];

/**
 * Short intro + how to read the report. Presentation only; does not change audit data.
 */
export default function IntroParagraph({ firstName, companyName }: IntroParagraphProps) {
  const reduce = useReducedMotion();

  return (
    <section className="space-y-12 pb-4 pt-2 md:space-y-14" aria-label="Introduction">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-3xl tracking-tight text-cream md:text-4xl">Hi {firstName}</h2>
        <p className="mt-5 font-sans text-base leading-relaxed text-white/70 md:text-lg">
          This is the Deep Audit we put together for {companyName}. It is built from public information
          only. It is not a sales pitch. It is the order we would dig into things if we worked together.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
        {steps.map((item, i) => (
          <m.div
            key={item.step}
            className={`${auditCream} px-5 py-6 md:px-6 md:py-7`}
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: auditEase }}
            whileHover={reduce ? undefined : { y: -4, transition: { duration: 0.25 } }}
          >
            <p className={`${auditEyebrow} text-gold-on-cream`}>{item.step}</p>
            <p className="mt-3 font-serif text-xl leading-snug text-dark md:text-[1.35rem]">{item.title}</p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-dark/65">{item.text}</p>
          </m.div>
        ))}
      </div>
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

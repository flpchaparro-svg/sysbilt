export interface IntroParagraphProps {
  firstName: string;
  companyName: string;
}

/**
 * Short intro + how to read the report. Presentation only; does not change audit data.
 */
export default function IntroParagraph({ firstName, companyName }: IntroParagraphProps) {
  return (
    <section className="space-y-10 border-b border-white/10 pb-14 pt-2 md:space-y-12 md:pb-16" aria-label="Introduction">
      <div className="max-w-3xl">
        <h2 className="font-serif text-2xl tracking-tight text-cream md:text-3xl">
          Hi {firstName}
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed text-white/80 md:text-lg md:leading-relaxed">
          This is the Deep Audit we put together for {companyName}. It is built from public information
          only. It is not a sales pitch. It is the order we would dig into things if we worked together.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
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
        ].map((item) => (
          <div
            key={item.step}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 md:px-5 md:py-5"
          >
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gold-on-dark">
              {item.step}
            </p>
            <p className="mt-2 font-serif text-lg text-cream">{item.title}</p>
            <p className="mt-2 font-sans text-sm leading-relaxed text-white/65">{item.text}</p>
          </div>
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

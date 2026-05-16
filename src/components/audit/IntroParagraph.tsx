export interface IntroParagraphProps {
  firstName: string;
  companyName: string;
}

export default function IntroParagraph({ firstName, companyName }: IntroParagraphProps) {
  return (
    <section className="space-y-10 border-b border-white/10 pb-16 pt-8 md:space-y-12 md:pb-20 md:pt-10" aria-label="Introduction">
      <p className="max-w-3xl font-sans text-lg font-light leading-relaxed text-white/85 md:text-xl">
        Hi {firstName}, this is the audit we put together for {companyName}. It is a snapshot of how your front-of-house
        systems read from the outside, based on a research pass on public information about your business. It is not a
        sales pitch. It is what we would dig into first if we worked together. If anything here resonates, the easiest
        next step is at the bottom of this page.
      </p>
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

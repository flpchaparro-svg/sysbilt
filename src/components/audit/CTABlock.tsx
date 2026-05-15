const PRIMARY_HREF =
  'https://meetings-ap1.hubspot.com/felipe-chaparro?uuid=087901aa-c896-4adf-86b4-61f001d96900';
const SECONDARY_HREF = 'https://sysbilt.com/guides';

export default function CTABlock() {
  return (
    <section className="border-t border-white/10 pt-12 md:pt-16" aria-label="Next steps">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <a
          href={PRIMARY_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[3.25rem] items-center justify-center rounded-xl bg-gold-on-dark px-6 py-4 text-center font-sans text-base font-medium text-dark transition hover:opacity-95"
        >
          Want to walk through this together? Book a 15-minute call.
        </a>
        <a
          href={SECONDARY_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[3.25rem] items-center justify-center rounded-xl border border-gold-on-dark bg-transparent px-6 py-4 text-center font-sans text-base font-medium text-gold-on-dark transition hover:bg-gold-on-dark/10"
        >
          Curious how we build these systems? Read our guides.
        </a>
      </div>
    </section>
  );
}

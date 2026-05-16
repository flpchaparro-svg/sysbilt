export interface FooterBlockProps {
  transparency_note: string;
}

export default function FooterBlock({ transparency_note }: FooterBlockProps) {
  const trimmed = transparency_note.trim();

  return (
    <footer className="mt-16 border-t border-white/10 pt-12 md:mt-24 md:pt-16">
      <div className="mx-auto max-w-[700px] text-center">
        {trimmed ? (
          <p className="font-sans text-sm italic leading-relaxed text-white/75 md:text-[15px]">{trimmed}</p>
        ) : (
          <p className="font-sans text-sm italic leading-relaxed text-white/75 md:text-[15px]">
            No transparency note was supplied for this appendix. We still treated the audit as read-only research on
            public signals.
          </p>
        )}
      </div>
      <div className="mt-12 border-t border-white/10 pt-10 md:mt-14 md:pt-12" aria-hidden />
      <p className="type-eyebrow text-center text-white/70">
        / CONFIDENTIAL · SYSBILT DEEP AUDIT · DO NOT DISTRIBUTE
      </p>
    </footer>
  );
}

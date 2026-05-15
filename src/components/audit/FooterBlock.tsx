export interface FooterBlockProps {
  transparency_note: string;
}

export default function FooterBlock({ transparency_note }: FooterBlockProps) {
  const trimmed = transparency_note.trim();

  return (
    <footer className="mt-12 border-t border-white/10 pt-10 md:mt-16 md:pt-12">
      <div className="mx-auto max-w-[700px] text-center">
        {trimmed ? (
          <p className="font-sans text-sm italic leading-relaxed text-white/60 md:text-[15px]">{trimmed}</p>
        ) : (
          <p className="font-sans text-sm italic leading-relaxed text-white/60 md:text-[15px]">
            No transparency note was supplied for this appendix. We still treated the audit as read-only research on
            public signals.
          </p>
        )}
      </div>
      <div className="mt-10 border-t border-white/10 pt-8" aria-hidden />
      <p className="type-eyebrow text-center text-white/50">
        / CONFIDENTIAL · SYSBILT DEEP AUDIT · DO NOT DISTRIBUTE
      </p>
    </footer>
  );
}

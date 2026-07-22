import { auditEyebrow } from './auditCardStyles';

export interface FooterBlockProps {
  transparency_note: string;
}

export default function FooterBlock({ transparency_note }: FooterBlockProps) {
  const trimmed = transparency_note.trim();

  return (
    <footer className="mt-10 border-t border-white/10 pt-12 md:mt-14 md:pt-16">
      <div className="mx-auto max-w-[640px] text-center">
        {trimmed ? (
          <p className="font-sans text-sm leading-relaxed text-white/55 md:text-[15px]">{trimmed}</p>
        ) : (
          <p className="font-sans text-sm leading-relaxed text-white/55 md:text-[15px]">
            No transparency note was supplied for this appendix. We still treated the audit as read-only
            research on public signals.
          </p>
        )}
      </div>
      <div className="mt-12 border-t border-white/10 pt-10 md:mt-14 md:pt-12" aria-hidden />
      <p className={`${auditEyebrow} text-center text-white/35`}>
        Confidential · SYSBILT Deep Audit · Do not distribute
      </p>
    </footer>
  );
}

export interface TransparencyNoteProps {
  text: string;
}

export default function TransparencyNote({ text }: TransparencyNoteProps) {
  const trimmed = text.trim();
  if (!trimmed) {
    return (
      <p className="border-t border-dashed border-white/10 pt-6 text-sm italic leading-relaxed text-zinc-600">
        No transparency note was supplied for this appendix. We still treated the audit as read-only research on public signals.
      </p>
    );
  }
  return (
    <p className="border-t border-white/[0.06] pt-6 text-sm italic leading-relaxed text-zinc-500 md:text-[15px]">{trimmed}</p>
  );
}

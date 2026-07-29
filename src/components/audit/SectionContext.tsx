import { useMemo } from 'react';
import { isMissingSignal } from '@/types/deepAuditReport';
import { auditEmpty, auditEyebrow } from './auditCardStyles';

export interface SectionContextProps {
  text: string;
  /** Short label above the meaning box. */
  label?: string;
}

type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] };

/** Turn a single dense blob into readable beats when the model skipped line breaks. */
function loosenDenseText(raw: string): string {
  const t = raw.trim();
  if (!t) return t;
  if (/\n\n/.test(t) || /^[-•*]\s+/m.test(t)) return t;
  if (t.length < 160) return t;

  const sentences = t
    .split(/(?<=[.!?])\s+(?=[A-Z“"‘'])/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (sentences.length < 2) return t;
  return sentences.map((s) => `- ${s}`).join('\n');
}

function parseMeaningBlocks(raw: string): Block[] {
  const prepared = loosenDenseText(raw);
  const chunks = prepared
    .split(/\n\n+/)
    .map((c) => c.trim())
    .filter(Boolean);

  const blocks: Block[] = [];
  for (const chunk of chunks) {
    const lines = chunk.split('\n').map((l) => l.trim()).filter(Boolean);
    const bulletLines = lines.filter((l) => /^[-•*]\s+/.test(l));
    if (bulletLines.length >= 1 && bulletLines.length === lines.length) {
      blocks.push({
        type: 'list',
        items: bulletLines.map((l) => l.replace(/^[-•*]\s+/, '').trim()).filter(Boolean),
      });
      continue;
    }
    // Mixed chunk: pull bullets out, keep leftover as paragraph
    if (bulletLines.length >= 2) {
      const prose = lines.filter((l) => !/^[-•*]\s+/.test(l)).join(' ').trim();
      if (prose) blocks.push({ type: 'paragraph', text: prose });
      blocks.push({
        type: 'list',
        items: bulletLines.map((l) => l.replace(/^[-•*]\s+/, '').trim()).filter(Boolean),
      });
      continue;
    }
    blocks.push({ type: 'paragraph', text: chunk.replace(/\n+/g, ' ').trim() });
  }
  return blocks;
}

/**
 * Result meaning: what the numbers above cost the owner / give them.
 * Supports short paragraphs and bullet lists (same shape as the AI site read).
 */
export default function SectionContext({
  text,
  label = 'What this means for your business',
}: SectionContextProps) {
  const trimmed = text.trim();
  const blocks = useMemo(() => (trimmed ? parseMeaningBlocks(trimmed) : []), [trimmed]);

  const treatAsMissing = !trimmed || isMissingSignal(trimmed) || trimmed.toLowerCase() === 'missing';

  if (treatAsMissing) {
    return (
      <div className={`${auditEmpty} mt-10 md:mt-12`}>
        We could not write a clear takeaway for this section in this pass. Use the numbers above, and ask
        us to re-run if you want the owner summary.
      </div>
    );
  }

  return (
    <div className="mt-10 pt-2 md:mt-14">
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border-2 border-gold-on-dark/50 bg-gradient-to-br from-gold-on-dark/[0.16] via-black/40 to-black/20 px-7 py-9 md:px-10 md:py-12">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold-on-dark to-transparent"
          aria-hidden
        />
        <p className={`${auditEyebrow} text-gold-on-dark`}>{label}</p>
        <div className="mt-6 space-y-6 font-sans text-base leading-relaxed text-cream/90 md:mt-7 md:space-y-7 md:text-lg md:leading-[1.65]">
          {blocks.map((block, i) =>
            block.type === 'list' ? (
              <ul key={i} className="list-disc space-y-3.5 pl-5 marker:text-gold-on-dark">
                {block.items.map((item, j) => (
                  <li key={j} className="text-pretty pl-1">
                    {item}
                  </li>
                ))}
              </ul>
            ) : block.text.length < 48 ? (
              <p key={i} className={`${auditEyebrow} !tracking-[0.14em] text-gold-on-dark/90`}>
                {block.text}
              </p>
            ) : (
              <p
                key={i}
                className="text-pretty font-serif text-xl leading-snug tracking-tight text-cream md:text-2xl md:leading-[1.35]"
              >
                {block.text}
              </p>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

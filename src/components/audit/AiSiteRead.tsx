import { useMemo } from 'react';
import { Bot } from 'lucide-react';
import { m, useReducedMotion } from 'framer-motion';
import { auditCardLift, auditEase, auditEyebrow, auditGlass } from './auditCardStyles';

export interface AiSiteReadProps {
  text: string;
  companyName: string;
}

type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] };

function parseAiSiteRead(raw: string): Block[] {
  const chunks = raw
    .split(/\n\n+/)
    .map((c) => c.trim())
    .filter(Boolean);

  const blocks: Block[] = [];
  for (const chunk of chunks) {
    const lines = chunk.split('\n').map((l) => l.trim()).filter(Boolean);
    const bulletLines = lines.filter((l) => /^[-•*]\s+/.test(l));
    if (bulletLines.length >= 2 && bulletLines.length === lines.length) {
      blocks.push({
        type: 'list',
        items: bulletLines.map((l) => l.replace(/^[-•*]\s+/, '').trim()),
      });
      continue;
    }
    blocks.push({ type: 'paragraph', text: chunk.replace(/\n+/g, ' ').trim() });
  }
  return blocks;
}

/**
 * Machine / AI pass on the public homepage. Not a human visit.
 */
export default function AiSiteRead({ text, companyName }: AiSiteReadProps) {
  const reduce = useReducedMotion();
  const trimmed = text.trim();
  const blocks = useMemo(() => (trimmed ? parseAiSiteRead(trimmed) : []), [trimmed]);
  if (!trimmed) return null;

  return (
    <m.section
      className={`relative overflow-hidden rounded-3xl border border-gold-on-dark/40 bg-gradient-to-br from-gold-on-dark/[0.14] via-black/50 to-black/30 p-7 md:p-10 ${auditGlass} ${auditCardLift}`}
      aria-labelledby="ai-site-read-heading"
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, ease: auditEase }}
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gold-on-dark/20 blur-3xl"
        aria-hidden
      />
      <div className="relative flex flex-wrap items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold-on-dark/45 bg-gold-on-dark/15 text-gold-on-dark">
          <Bot className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </div>
        <div>
          <p className={`${auditEyebrow} text-gold-on-dark`}>AI site read</p>
          <h2 id="ai-site-read-heading" className="mt-1 font-serif text-2xl tracking-tight text-cream md:text-3xl">
            What machines see on your homepage
          </h2>
        </div>
      </div>
      <div className="relative mt-6 max-w-3xl space-y-5 font-sans text-base leading-relaxed text-cream/90 md:space-y-6 md:text-lg md:leading-[1.7]">
        {blocks.map((block, i) =>
          block.type === 'list' ? (
            <ul key={i} className="list-disc space-y-3 pl-5 marker:text-gold-on-dark">
              {block.items.map((item, j) => (
                <li key={j} className="text-pretty pl-1">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p key={i} className="text-pretty">
              {block.text}
            </p>
          ),
        )}
      </div>
      <p className="relative mt-6 font-sans text-sm leading-relaxed text-white/50">
        This is how AI systems and search machines read {companyName} today. That read will matter more over
        time for discovery and answers. If the page was blocked or thin, that is part of the finding.
      </p>
    </m.section>
  );
}

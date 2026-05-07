import React, { useMemo } from 'react';

export interface RichText {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  href?: string | null;
}

export interface Block {
  type: string;
  text?: RichText[];
  icon?: string | null;
  children?: Block[];
}

export type ProposalChapterId = 'context' | 'scope' | 'investment' | 'sign';

const SECTION_TO_CHAPTER: Record<string, ProposalChapterId> = {
  'EXECUTIVE SUMMARY': 'context',
  'WHERE YOU ARE TODAY': 'context',
  'WHAT WE PROPOSE': 'context',
  'WHAT IS INCLUDED': 'scope',
  'WHAT IS NOT INCLUDED': 'scope',
  ASSUMPTIONS: 'scope',
  'TIMELINE AND MILESTONES': 'investment',
  INVESTMENT: 'investment',
  'WHY SYSBILT': 'investment',
  'NEXT STEPS': 'sign',
  'CLIENT RESPONSIBILITIES': 'sign',
};

const CHAPTER_ORDER: ProposalChapterId[] = ['context', 'scope', 'investment', 'sign'];

const CHAPTER_LABEL: Record<ProposalChapterId, string> = {
  context: 'CONTEXT',
  scope: 'SCOPE',
  investment: 'INVESTMENT',
  sign: 'SIGN',
};

function renderRichText(textArr: RichText[] | undefined) {
  if (!textArr || textArr.length === 0) return null;
  return textArr.map((rt, i) => {
    let content: React.ReactNode = rt.text;
    if (rt.code)
      content = (
        <code className="bg-cream-light px-1 py-0.5 font-mono text-sm text-dark">{content}</code>
      );
    if (rt.bold) content = <strong className="font-bold">{content}</strong>;
    if (rt.italic) content = <em className="italic">{content}</em>;
    if (rt.href) {
      content = (
        <a
          href={rt.href}
          className="text-red-text underline decoration-2 underline-offset-4 transition-colors hover:text-dark"
        >
          {content}
        </a>
      );
    }
    return <React.Fragment key={i}>{content}</React.Fragment>;
  });
}

function isAllCapsHeading(block: Block): boolean {
  if (!block.text || block.text.length !== 1) return false;
  const raw = block.text[0]?.text ?? '';
  if (raw.length < 4) return false;
  if (!/[A-Z]/.test(raw)) return false;
  if (raw !== raw.toUpperCase()) return false;
  return true;
}

function plainHeadingFromBlock(block: Block): string {
  return (block.text ?? []).map((t) => t.text).join('').trim();
}

function isAllCapsHeadingLine(plain: string): boolean {
  if (plain.length < 4) return false;
  if (!/[A-Z]/.test(plain)) return false;
  return plain === plain.toUpperCase();
}

/** Normalised ALL CAPS section title, or null if this block is not a template section heading */
function normalizeSectionTitle(block: Block): string | null {
  if (block.type === 'paragraph' && isAllCapsHeading(block)) {
    return (block.text?.[0]?.text ?? '').trim().toUpperCase();
  }
  if (block.type === 'heading_1' || block.type === 'heading_2' || block.type === 'heading_3') {
    const plain = plainHeadingFromBlock(block);
    if (isAllCapsHeadingLine(plain)) return plain.toUpperCase();
  }
  return null;
}

function sliceProposalBlocks(blocks: Block[]): Block[] {
  const start = blocks.findIndex((b) => normalizeSectionTitle(b) === 'EXECUTIVE SUMMARY');
  if (start === -1) return [];
  const acceptIdx = blocks.findIndex((b) => normalizeSectionTitle(b) === 'ACCEPTANCE');
  const end = acceptIdx === -1 ? blocks.length : acceptIdx;
  return blocks.slice(start, end);
}

interface Run {
  chapter: ProposalChapterId;
  blocks: Block[];
}

function splitIntoRuns(blocks: Block[]): Run[] {
  const runs: Run[] = [];
  let i = 0;
  while (i < blocks.length) {
    const title = normalizeSectionTitle(blocks[i]);
    if (!title || !SECTION_TO_CHAPTER[title]) {
      i++;
      continue;
    }
    const chapter = SECTION_TO_CHAPTER[title];
    const runBlocks: Block[] = [blocks[i]];
    i++;
    while (i < blocks.length) {
      const nextTitle = normalizeSectionTitle(blocks[i]);
      if (nextTitle && SECTION_TO_CHAPTER[nextTitle]) break;
      runBlocks.push(blocks[i]);
      i++;
    }
    runs.push({ chapter, blocks: runBlocks });
  }
  return runs;
}

function mergeRuns(runs: Run[]): Map<ProposalChapterId, Block[]> {
  const merged = new Map<ProposalChapterId, Block[]>();
  for (const run of runs) {
    const prev = merged.get(run.chapter) ?? [];
    merged.set(run.chapter, [...prev, ...run.blocks]);
  }
  return merged;
}

function renderBlockList(blocks: Block[], keyPrefix: string): React.ReactNode {
  const items: React.ReactNode[] = [];
  let i = 0;
  while (i < blocks.length) {
    const block = blocks[i];
    const key = `${keyPrefix}-${i}`;

    if (block.type === 'bulleted_list_item' || block.type === 'numbered_list_item') {
      const listType = block.type;
      const listBlocks: Block[] = [];
      while (i < blocks.length && blocks[i].type === listType) {
        listBlocks.push(blocks[i]);
        i++;
      }
      const Tag = listType === 'bulleted_list_item' ? 'ul' : 'ol';
      const tagClass =
        listType === 'bulleted_list_item'
          ? 'list-disc list-outside ml-6 mb-6 space-y-2 marker:text-red-text'
          : 'list-decimal list-outside ml-6 mb-6 space-y-2 marker:font-bold marker:text-red-text';
      items.push(
        <Tag key={key} className={tagClass}>
          {listBlocks.map((b, j) => (
            <li key={j} className="type-body pl-2 text-dark/70">
              {renderRichText(b.text)}
            </li>
          ))}
        </Tag>,
      );
      continue;
    }

    items.push(<React.Fragment key={key}>{renderSingle(block, key)}</React.Fragment>);
    i++;
  }
  return <>{items}</>;
}

function renderSingle(block: Block, key: string): React.ReactNode {
  switch (block.type) {
    case 'paragraph': {
      const rendered = renderRichText(block.text);
      if (!rendered) return <div key={key} className="h-6" />;

      if (isAllCapsHeading(block)) {
        return (
          <h2 key={key} className="mb-6 mt-16 font-serif text-xl font-semibold uppercase tracking-tight text-dark md:text-2xl">
            {rendered}
          </h2>
        );
      }

      return (
        <p key={key} className="type-body mb-5 text-dark/70">
          {rendered}
        </p>
      );
    }

    case 'heading_1':
      return (
        <h1 key={key} className="type-h2 mt-16 mb-8 text-dark">
          {renderRichText(block.text)}
        </h1>
      );
    case 'heading_2': {
      const plain = plainHeadingFromBlock(block);
      if (isAllCapsHeadingLine(plain)) {
        return (
          <h2 key={key} className="mb-6 mt-16 font-serif text-xl font-semibold uppercase tracking-tight text-dark md:text-2xl">
            {renderRichText(block.text)}
          </h2>
        );
      }
      return (
        <h2 key={key} className="type-h3 mt-12 mb-6 text-dark">
          {renderRichText(block.text)}
        </h2>
      );
    }
    case 'heading_3':
      return (
        <h3 key={key} className="type-h4 mt-8 mb-4 text-dark">
          {renderRichText(block.text)}
        </h3>
      );

    case 'quote':
      return (
        <blockquote
          key={key}
          className="type-body my-8 border-l-4 border-red-text pl-6 italic text-dark/70"
        >
          {renderRichText(block.text)}
        </blockquote>
      );

    case 'divider':
      return <hr key={key} className="my-12 border-t border-dark/20" />;

    case 'callout': {
      const firstText = block.text?.[0]?.text ?? '';
      if (firstText.includes('INTERNAL NOTE')) return null;
      return (
        <div
          key={key}
          className="my-8 flex gap-4 border-l-8 border-gold-on-dark bg-dark p-6 text-cream"
        >
          {block.icon && <span className="text-2xl">{block.icon}</span>}
          <div className="type-body text-cream/95">{renderRichText(block.text)}</div>
        </div>
      );
    }

    case 'toggle':
      return (
        <div key={key} className="my-6">
          <p className="type-h4 mb-2 text-dark">{renderRichText(block.text)}</p>
          {block.children && block.children.length > 0 && (
            <div className="ml-4 border-l-2 border-dark/20 pl-4">{renderBlockList(block.children, `${key}-c`)}</div>
          )}
        </div>
      );

    default:
      return null;
  }
}

function ChapterHeader({ chapter, isFirst }: { chapter: ProposalChapterId; isFirst: boolean }) {
  const num = CHAPTER_ORDER.indexOf(chapter) + 1;
  return (
    <header
      className={`mb-12 print:break-before-page ${isFirst ? 'mt-0' : 'mt-24'}`}
    >
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-red-text">/ Chapter {num} of 4</p>
      <h2 className="font-serif font-black uppercase tracking-tight text-5xl leading-none text-dark md:text-7xl">
        {CHAPTER_LABEL[chapter]}
      </h2>
      <hr className="mt-8 border-t-2 border-dark" />
    </header>
  );
}

export function useProposalRenderer(blocks: Block[]): {
  rendered: React.ReactNode;
  chapters: ProposalChapterId[];
} {
  return useMemo(() => {
    const sliced = sliceProposalBlocks(blocks);
    if (sliced.length === 0) {
      return { rendered: null, chapters: [] };
    }
    const runs = splitIntoRuns(sliced);
    const merged = mergeRuns(runs);

    const chapters: ProposalChapterId[] = [];
    const sections: React.ReactNode[] = [];

    for (const ch of CHAPTER_ORDER) {
      const blks = merged.get(ch);
      if (!blks || blks.length === 0) continue;
      const isFirst = chapters.length === 0;
      chapters.push(ch);
      sections.push(
        <section key={ch} id={`chapter-${ch}`}>
          <ChapterHeader chapter={ch} isFirst={isFirst} />
          {renderBlockList(blks, `ch-${ch}`)}
        </section>,
      );
    }

    return {
      rendered: <div>{sections}</div>,
      chapters,
    };
  }, [blocks]);
}

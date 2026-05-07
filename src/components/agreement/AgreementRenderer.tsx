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

function plainText(block: Block): string {
  return (block.text ?? []).map((t) => t.text).join('').trim();
}

function parseNumberedClauseH2(block: Block): number | null {
  if (block.type !== 'heading_2') return null;
  const plain = plainText(block);
  const m = plain.match(/^(\d+)\.\s+/);
  if (!m) return null;
  return parseInt(m[1], 10);
}

function isScheduleAHeading(block: Block): boolean {
  if (block.type !== 'heading_2' && block.type !== 'heading_1') return false;
  const p = plainText(block).toUpperCase();
  return p.startsWith('SCHEDULE A');
}

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

function renderSingle(block: Block, key: string): React.ReactNode {
  switch (block.type) {
    case 'paragraph': {
      const rendered = renderRichText(block.text);
      if (!rendered) return <div key={key} className="h-6" />;
      return (
        <p key={key} className="mb-5 text-base leading-relaxed text-dark/85 md:text-lg">
          {rendered}
        </p>
      );
    }
    case 'heading_1':
      return (
        <h1 key={key} className="type-h2 mb-8 mt-12 text-dark">
          {renderRichText(block.text)}
        </h1>
      );
    case 'heading_2':
      return (
        <h2
          key={key}
          className="mb-6 mt-12 font-serif text-2xl font-semibold uppercase tracking-tight text-dark md:text-3xl"
        >
          {renderRichText(block.text)}
        </h2>
      );
    case 'heading_3':
      return (
        <h3 key={key} className="type-h4 mb-4 mt-8 text-dark">
          {renderRichText(block.text)}
        </h3>
      );
    case 'quote':
      return (
        <blockquote
          key={key}
          className="my-8 border-l-4 border-red-text pl-6 italic text-base text-dark/85 md:text-lg"
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
          <div className="text-base text-cream/95 md:text-lg">{renderRichText(block.text)}</div>
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
          ? 'mb-6 ml-6 list-outside list-disc space-y-2 marker:text-red-text'
          : 'mb-6 ml-6 list-outside list-decimal space-y-2 marker:font-bold marker:text-red-text';
      items.push(
        <Tag key={key} className={tagClass}>
          {listBlocks.map((b, j) => (
            <li key={j} className="pl-2 text-base text-dark/85 md:text-lg">
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

function splitAgreementBlocks(blocks: Block[]): {
  clauseSections: { n: number; blocks: Block[] }[];
  scheduleBlocks: Block[];
} {
  let firstClause = -1;
  for (let j = 0; j < blocks.length; j++) {
    if (parseNumberedClauseH2(blocks[j]) !== null) {
      firstClause = j;
      break;
    }
  }
  if (firstClause === -1) {
    return { clauseSections: [], scheduleBlocks: [] };
  }

  let scheduleStart = -1;
  for (let j = firstClause; j < blocks.length; j++) {
    if (isScheduleAHeading(blocks[j])) {
      scheduleStart = j;
      break;
    }
  }

  const clauseSlice =
    scheduleStart === -1 ? blocks.slice(firstClause) : blocks.slice(firstClause, scheduleStart);
  const scheduleBlocks = scheduleStart === -1 ? [] : blocks.slice(scheduleStart);

  const clauseSections: { n: number; blocks: Block[] }[] = [];
  let current: { n: number; blocks: Block[] } | null = null;
  for (const b of clauseSlice) {
    const n = parseNumberedClauseH2(b);
    if (n !== null) {
      if (current) clauseSections.push(current);
      current = { n, blocks: [b] };
    } else if (current) {
      current.blocks.push(b);
    }
  }
  if (current) clauseSections.push(current);

  return { clauseSections, scheduleBlocks };
}

function ScheduleASection({ blocks }: { blocks: Block[] }) {
  if (blocks.length === 0) return null;
  const [head, ...rest] = blocks;
  return (
    <section className="mb-20 mt-24 border-t-2 border-dark pt-16" id="schedule-a">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-red-text">
        / Schedule A - Scope of services and fees
      </p>
      <h2 className="mb-10 font-serif text-3xl font-black uppercase tracking-tight text-dark md:text-4xl">
        {renderRichText(head.text)}
      </h2>
      {rest.length > 0 ? <div>{renderBlockList(rest, 'sched')}</div> : null}
    </section>
  );
}

export interface AgreementRendererProps {
  blocks: Block[];
}

export default function AgreementRenderer({ blocks }: AgreementRendererProps) {
  const { clauseSections, scheduleBlocks } = useMemo(() => splitAgreementBlocks(blocks), [blocks]);

  return (
    <div className="agreement-body">
      {clauseSections.map((sec) => (
        <section key={sec.n} id={`clause-${sec.n}`} className="mb-20">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-red-text">
            / Clause {sec.n}
          </p>
          <h2 className="mb-8 font-serif text-3xl font-black uppercase tracking-tight text-dark md:text-4xl">
            {renderRichText(sec.blocks[0]?.text)}
          </h2>
          {sec.blocks.length > 1 ? renderBlockList(sec.blocks.slice(1), `c-${sec.n}`) : null}
        </section>
      ))}
      <ScheduleASection blocks={scheduleBlocks} />
    </div>
  );
}

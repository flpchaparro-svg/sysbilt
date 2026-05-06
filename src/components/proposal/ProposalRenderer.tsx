import React from 'react';

interface RichText {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  href?: string | null;
}

interface Block {
  type: string;
  text?: RichText[];
  icon?: string | null;
  children?: Block[];
}

function renderRichText(textArr: RichText[] | undefined) {
  if (!textArr || textArr.length === 0) return null;
  return textArr.map((rt, i) => {
    let content: React.ReactNode = rt.text;
    if (rt.code) content = <code className="bg-stone-200 px-1 py-0.5 font-mono text-sm">{content}</code>;
    if (rt.bold) content = <strong className="font-bold">{content}</strong>;
    if (rt.italic) content = <em className="italic">{content}</em>;
    if (rt.href) {
      content = (
        <a href={rt.href} className="text-red-600 underline decoration-2 underline-offset-4 hover:text-stone-900 transition-colors">
          {content}
        </a>
      );
    }
    return <React.Fragment key={i}>{content}</React.Fragment>;
  });
}

// Detects ALL CAPS section headings used in the Notion templates
function isAllCapsHeading(block: Block): boolean {
  if (!block.text || block.text.length !== 1) return false;
  const raw = block.text[0]?.text ?? '';
  if (raw.length < 4) return false;
  // must contain at least one letter, and all letters must be uppercase
  if (!/[A-Z]/.test(raw)) return false;
  if (raw !== raw.toUpperCase()) return false;
  return true;
}

interface RenderedItem {
  key: string;
  node: React.ReactNode;
}

export default function ProposalRenderer({ blocks }: { blocks: Block[] }) {
  const items: RenderedItem[] = [];

  // Group consecutive list items so they render in a single <ul> or <ol>
  let i = 0;
  while (i < blocks.length) {
    const block = blocks[i];

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
          ? 'list-disc list-outside ml-6 mb-6 space-y-2 text-stone-800 marker:text-red-600'
          : 'list-decimal list-outside ml-6 mb-6 space-y-2 text-stone-800 marker:font-bold marker:text-red-600';
      items.push({
        key: `list-${i}`,
        node: (
          <Tag className={tagClass}>
            {listBlocks.map((b, j) => (
              <li key={j} className="pl-2 leading-relaxed">
                {renderRichText(b.text)}
              </li>
            ))}
          </Tag>
        ),
      });
      continue;
    }

    // Non-list block
    items.push({ key: `b-${i}`, node: renderSingle(block, i) });
    i++;
  }

  return <div className="text-lg md:text-xl leading-relaxed">{items.map((it) => <React.Fragment key={it.key}>{it.node}</React.Fragment>)}</div>;
}

function renderSingle(block: Block, index: number): React.ReactNode {
  switch (block.type) {
    case 'paragraph': {
      const rendered = renderRichText(block.text);
      if (!rendered) return <div key={index} className="h-6" />;

      if (isAllCapsHeading(block)) {
        return (
          <h2 key={index} className="text-2xl md:text-3xl font-serif font-black uppercase tracking-widest mt-16 mb-6 text-stone-900">
            {rendered}
          </h2>
        );
      }

      return <p key={index} className="mb-5 text-stone-800">{rendered}</p>;
    }

    case 'heading_1':
      return <h1 key={index} className="text-4xl font-serif font-black mt-16 mb-8 uppercase tracking-tight">{renderRichText(block.text)}</h1>;
    case 'heading_2':
      return <h2 key={index} className="text-3xl font-serif font-bold mt-12 mb-6 uppercase tracking-wide">{renderRichText(block.text)}</h2>;
    case 'heading_3':
      return <h3 key={index} className="text-2xl font-serif font-bold mt-8 mb-4">{renderRichText(block.text)}</h3>;

    case 'quote':
      return (
        <blockquote key={index} className="my-8 pl-6 border-l-4 border-red-600 italic text-stone-700">
          {renderRichText(block.text)}
        </blockquote>
      );

    case 'divider':
      return <hr key={index} className="my-16 border-t-4 border-stone-900" />;

    case 'callout': {
      const firstText = block.text?.[0]?.text ?? '';
      // Hide internal-only callouts so they never appear to clients or in the PDF export
      if (firstText.includes('INTERNAL NOTE')) return null;
      return (
        <div key={index} className="my-8 p-6 bg-stone-900 text-[#FDFBF7] flex gap-4 border-l-8 border-amber-500">
          {block.icon && <span className="text-2xl">{block.icon}</span>}
          <div>{renderRichText(block.text)}</div>
        </div>
      );
    }

    case 'toggle':
      // Render toggle as a section: bold heading, then children. Defensive — templates do not currently use toggles.
      return (
        <div key={index} className="my-6">
          <p className="font-bold text-stone-900 mb-2">{renderRichText(block.text)}</p>
          {block.children && block.children.length > 0 && (
            <div className="ml-4 border-l-2 border-stone-300 pl-4">
              <ProposalRenderer blocks={block.children} />
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
}

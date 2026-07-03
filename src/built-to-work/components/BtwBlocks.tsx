import { useState } from 'react'
import type { BtwBlock } from '../types'
import { BTW_TOKENS } from '../tokens'
import { BtwDiagramById } from './diagrams/DiagramRegistry'

type Props = {
  blocks: BtwBlock[]
  flow?: boolean
}

const FULL_WIDTH_BLOCKS = new Set([
  'diagram',
  'image',
  'fireDrill',
  'checklist',
  'promptCard',
  'featureCard',
  'realPicture',
  'realPictureBox',
  'glossary',
  'glossaryIntro',
  'glossaryEntry',
  'contents',
])

/**
 * Flat flow renderer used IDENTICALLY by the on-page renderer and the off-screen
 * measurer, so measured DOM positions exactly match what is painted. Each block is
 * its own child; text blocks are constrained to the prose measure, full-width blocks
 * span the column. Spacing lives on the blocks themselves so margins are real.
 */
export function BtwFlowList({ blocks }: { blocks: BtwBlock[] }) {
  return (
    <div className="btw-flow flex w-full flex-col">
      {blocks.map((block, i) => (
        <div
          key={i}
          data-btw-i={i}
          className={
            isFullWidth(block)
              ? `btw-block w-full${block.type === 'featureCard' ? ' btw-block-feature' : ''}`
              : 'btw-block btw-prose w-full'
          }
        >
          <BtwBlock block={block} />
        </div>
      ))}
    </div>
  )
}

function isFullWidth(block: BtwBlock): boolean {
  return FULL_WIDTH_BLOCKS.has(block.type)
}

export type BtwBlockGroup = { full: boolean; items: BtwBlock[] }

export function groupBtwBlocks(blocks: BtwBlock[]): BtwBlockGroup[] {
  const groups: BtwBlockGroup[] = []
  let batch: BtwBlock[] = []
  let batchFull: boolean | null = null

  const flush = () => {
    if (batch.length) {
      groups.push({ full: batchFull === true, items: batch })
      batch = []
      batchFull = null
    }
  }

  for (const block of blocks) {
    const full = isFullWidth(block)
    if (batchFull === null) {
      batchFull = full
      batch.push(block)
    } else if (full === batchFull) {
      batch.push(block)
    } else {
      flush()
      batchFull = full
      batch.push(block)
    }
  }
  flush()

  return groups
}

export function BtwBlocks({ blocks, flow }: Props) {
  const groups = groupBtwBlocks(blocks)

  return (
    <div className={flow ? 'btw-page-flow flex min-h-0 w-full flex-1 flex-col' : 'w-full'}>
      {groups.map((group, gi) =>
        group.full ? (
          group.items.map((block, i) => <BtwBlock key={`${gi}-${i}`} block={block} />)
        ) : (
          <div key={gi} className="btw-prose">
            {group.items.map((block, i) => (
              <BtwBlock key={i} block={block} />
            ))}
          </div>
        ),
      )}
    </div>
  )
}

function parseFireDrillStep(step: string | { title: string; body: string }) {
  if (typeof step !== 'string') return step
  const dot = step.indexOf('. ')
  if (dot > 0 && dot < 90) {
    return { title: step.slice(0, dot + 1), body: step.slice(dot + 2) }
  }
  return { title: '', body: step }
}

function PromptCopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#1A1A1A] bg-transparent border border-[#1A1A1A] px-3 py-2 hover:bg-[#1A1A1A] hover:text-[#FFF2EC] transition-colors print:hidden"
    >
      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
      {copied ? 'COPIED' : 'COPY'}
    </button>
  )
}

function renderPromptBody(body: string) {
  const parts = body.split(/(\[[^\]]+\])/g)
  return parts.map((part, i) =>
    part.startsWith('[') && part.endsWith(']') ? (
      <span key={i} className="text-[#D4A84B]">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

export function isBtwFullWidthBlock(block: BtwBlock): boolean {
  return FULL_WIDTH_BLOCKS.has(block.type)
}

export function BtwSingleBlock({ block }: { block: BtwBlock }) {
  return <BtwBlock block={block} />
}

function BtwBlock({ block }: { block: BtwBlock }) {
  switch (block.type) {
    case 'sectionEyebrow':
      return (
        <div
          className="btw-section-kicker font-mono text-[11px] font-bold uppercase tracking-[0.24em] mb-1.5"
          style={{ color: BTW_TOKENS.goldOnCream }}
        >
          / {block.text}
        </div>
      )
    case 'h2': {
      const isClosing = block.closing
      const isDivider = block.divider
      return (
        <div
          className={isDivider ? 'btw-divider' : isClosing ? 'btw-closing' : 'btw-section'}
          style={{
            marginTop: isDivider
              ? 'clamp(52px, 6vw, 76px)'
              : isClosing
                ? 'clamp(48px, 5.5vw, 68px)'
                : 'clamp(44px, 5vw, 64px)',
            marginBottom: 'clamp(24px, 3.5vw, 32px)',
            paddingTop: isDivider ? 'clamp(26px, 3.5vw, 38px)' : isClosing ? 'clamp(24px, 3vw, 32px)' : 0,
            borderTop: isDivider
              ? '1px solid rgba(26,26,26,0.16)'
              : isClosing
                ? '1px solid rgba(26,26,26,0.12)'
                : 'none',
          }}
        >
          {block.label ? (
            <div
              className="btw-section-kicker font-mono text-[11px] font-bold uppercase tracking-[0.24em] mb-1.5"
              style={{ color: BTW_TOKENS.goldOnCream }}
            >
              / {block.label}
            </div>
          ) : null}
          <h2
            className="font-serif font-medium m-0"
            style={{
              fontSize: isClosing ? 'clamp(22px, 2.8vw, 30px)' : 'clamp(28px, 3.6vw, 40px)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: BTW_TOKENS.ink,
            }}
          >
            {block.text}
          </h2>
        </div>
      )
    }
    case 'h3':
      return (
        <div
          className="btw-subsection"
          style={{ marginTop: 'clamp(34px, 4vw, 46px)', marginBottom: 'clamp(18px, 2.5vw, 24px)' }}
        >
          {block.label ? (
            <div
              className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] mb-1.5"
              style={{ color: BTW_TOKENS.goldOnCream }}
            >
              / {block.label}
            </div>
          ) : null}
          <h3
            className="font-serif font-medium m-0"
            style={{
              fontSize: 'clamp(20px, 2.4vw, 26px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: BTW_TOKENS.ink,
            }}
          >
            {block.text}
          </h3>
        </div>
      )
    case 'h4':
      return (
        <h4 className="font-serif font-medium text-[17px] md:text-[19px] leading-snug text-[#1A1A1A] mt-7 mb-3 first:mt-0">
          {block.text}
        </h4>
      )
    case 'p':
      return (
        <p
          className="btw-para font-sans text-[17px] leading-[1.72] mt-0 mb-[22px]"
          style={{ color: block.lead ? BTW_TOKENS.ink : 'rgba(26,26,26,0.84)', fontWeight: block.lead ? 600 : 400 }}
        >
          {block.text}
        </p>
      )
    case 'pullQuote': {
      const emphasis = block.emphasis
      const before =
        emphasis && block.text.includes(emphasis)
          ? block.text.slice(0, block.text.indexOf(emphasis))
          : block.text
      return (
        <figure
          className="my-[clamp(34px,4.5vw,52px)] border-l-2"
          style={{ paddingLeft: 'clamp(20px, 3vw, 32px)', borderColor: BTW_TOKENS.gold }}
        >
          <blockquote
            className="font-serif font-medium m-0"
            style={{
              fontSize: 'clamp(24px, 4vw, 38px)',
              lineHeight: 1.18,
              letterSpacing: '-0.02em',
              color: BTW_TOKENS.ink,
            }}
          >
            {before}
            {emphasis ? (
              <span className="italic" style={{ color: BTW_TOKENS.goldOnCream }}>
                {emphasis}
              </span>
            ) : null}
          </blockquote>
        </figure>
      )
    }
    case 'realPicture':
      return (
        <div className="my-8 w-full">
          {block.leadIn ? (
            <p className="btw-prose font-sans text-[17px] leading-[1.72] mb-8" style={{ color: 'rgba(26,26,26,0.55)' }}>
              {block.leadIn}
            </p>
          ) : null}
          <aside
            className="border-l-[3px] px-[clamp(26px,4vw,44px)] py-[clamp(28px,4.5vw,44px)]"
            style={{ backgroundColor: BTW_TOKENS.inkDeep, borderColor: BTW_TOKENS.gold }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span
                className="font-mono text-[11px] font-bold uppercase tracking-[0.26em]"
                style={{ color: BTW_TOKENS.goldOnDark }}
              >
                / THE REAL PICTURE
              </span>
              <span className="flex-1 h-px" style={{ backgroundColor: 'rgba(255,242,236,0.12)' }} />
            </div>
            {block.title ? (
              <h3
                className="font-serif font-medium mb-5"
                style={{
                  fontSize: 'clamp(24px, 3.5vw, 34px)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: BTW_TOKENS.cream,
                }}
              >
                {block.title}
              </h3>
            ) : null}
            {block.paragraphs.map((para, i) => (
              <p
                key={i}
                className="font-sans text-[15px] md:text-[16px] leading-[1.7] mb-5 last:mb-0"
                style={{ color: 'rgba(255,242,236,0.78)' }}
              >
                {para}
              </p>
            ))}
          </aside>
        </div>
      )
    case 'realPictureLead':
      return (
        <p
          className="btw-prose font-sans text-[17px] leading-[1.72]"
          style={{ color: 'rgba(26,26,26,0.55)', marginTop: 'clamp(36px,4.5vw,52px)', marginBottom: 0 }}
        >
          {block.text}
        </p>
      )
    case 'realPictureBox': {
      const pad = 'clamp(26px,4vw,44px)'
      return (
        <div
          className="w-full border-l-[3px]"
          style={{
            backgroundColor: BTW_TOKENS.inkDeep,
            borderColor: BTW_TOKENS.gold,
            paddingLeft: pad,
            paddingRight: pad,
            paddingTop: block.first ? 'clamp(28px,4.5vw,44px)' : 'clamp(16px,2.2vw,22px)',
            paddingBottom: block.last ? 'clamp(28px,4.5vw,44px)' : 0,
            marginTop: block.first ? 'clamp(36px,4.5vw,52px)' : 0,
            marginBottom: block.last ? 'clamp(36px,4.5vw,52px)' : 0,
          }}
        >
          {block.first ? (
            <div className="flex items-center gap-3 mb-6">
              <span
                className="font-mono text-[11px] font-bold uppercase tracking-[0.26em]"
                style={{ color: BTW_TOKENS.goldOnDark }}
              >
                / THE REAL PICTURE
              </span>
              <span className="flex-1 h-px" style={{ backgroundColor: 'rgba(255,242,236,0.12)' }} />
            </div>
          ) : null}
          {block.title ? (
            <h3
              className="font-serif font-medium mb-5"
              style={{
                fontSize: 'clamp(24px, 3.5vw, 34px)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: BTW_TOKENS.cream,
              }}
            >
              {block.title}
            </h3>
          ) : null}
          <p
            className="font-sans text-[15px] md:text-[16px] leading-[1.7] m-0"
            style={{ color: 'rgba(255,242,236,0.82)' }}
          >
            {block.text}
          </p>
        </div>
      )
    }
    case 'diagram':
      return <BtwDiagramById id={block.id} caption={block.caption} />
    case 'image':
      return (
        <figure className="btw-image my-10">
          <div className="relative flex aspect-[16/10] items-center justify-center bg-[#16130F]">
            <span className="pointer-events-none absolute left-3.5 top-3.5 h-3.5 w-3.5 border-l border-t border-[#FFF2EC]/35" />
            <span className="pointer-events-none absolute right-3.5 top-3.5 h-3.5 w-3.5 border-r border-t border-[#FFF2EC]/35" />
            <span className="pointer-events-none absolute bottom-3.5 left-3.5 h-3.5 w-3.5 border-b border-l border-[#FFF2EC]/35" />
            <span className="pointer-events-none absolute bottom-3.5 right-3.5 h-3.5 w-3.5 border-b border-r border-[#FFF2EC]/35" />
            <div className="px-6 text-center text-[#FFF2EC]/32">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3 block">
                <rect x="3" y="3" width="18" height="18" rx="1" />
                <circle cx="8.5" cy="8.5" r="1.6" />
                <path d="m21 15-5-5L5 21" />
              </svg>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] mb-2">[ IMAGE ]</p>
              <p className="font-mono text-[11px] leading-[1.6] tracking-wide max-w-[34ch] mx-auto text-[#FFF2EC]/40">
                {block.caption}
              </p>
            </div>
          </div>
          <figcaption className="mt-[18px] flex gap-3.5 items-baseline">
            <span className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6914]">
              PLATE
            </span>
            <span className="font-serif text-[clamp(15px,1.7vw,18px)] italic leading-[1.4] text-[#1A1A1A]/78">
              {block.caption}
            </span>
          </figcaption>
        </figure>
      )
    case 'fireDrill':
      return (
        <div className="my-8 border-[1.5px] border-[#1A1A1A] bg-[#FFF8F5] shadow-[8px_8px_0_0_#1A1A1A]">
          <div className="bg-[#1A1A1A] px-[clamp(20px,3vw,28px)] py-[18px] flex items-center justify-between gap-3">
            <span className="font-mono text-[12px] font-bold uppercase tracking-[0.22em] text-[#FFF2EC]">
              / THE FIRE DRILL
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A84B]">
              {block.tag ?? 'WHEN SOMETHING LOOKS WRONG'}
            </span>
          </div>
          <ol className="list-none m-0 p-[clamp(20px,3vw,30px)]">
            {block.steps.map((step, i) => {
              const parsed = parseFireDrillStep(step)
              return (
                <li
                  key={i}
                  className={`flex gap-[18px] ${i > 0 ? 'border-t border-[#1A1A1A]/12 pt-[22px] mt-[22px]' : 'pb-0'}`}
                >
                  <span className="shrink-0 w-10 font-serif font-medium text-[34px] leading-none text-[#C5A059]">
                    {i + 1}
                  </span>
                  <div>
                    {parsed.title ? (
                      <div className="font-sans font-semibold text-[16px] text-[#1A1A1A] mb-1">{parsed.title}</div>
                    ) : null}
                    <div className="font-sans text-[15px] leading-[1.6] text-[#1A1A1A]/72">{parsed.body}</div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      )
    case 'checklist':
      return (
        <div className="my-8 border-[1.5px] border-[#1A1A1A] bg-[#FFF8F5]">
          <div className="px-[clamp(20px,3vw,28px)] py-[18px] border-b-[1.5px] border-[#1A1A1A] flex items-center justify-between gap-3">
            <span className="font-mono text-[12px] font-bold uppercase tracking-[0.22em] text-[#1A1A1A]">
              / {block.title ?? 'THE MONTHLY CHECKLIST'}
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6914]">
              {block.tag ?? 'GETTING FOUND'}
            </span>
          </div>
          <ul className="list-none m-0 px-[clamp(20px,3vw,28px)] py-[clamp(14px,2vw,22px)]">
            {block.items.map((item, i) => (
              <li
                key={i}
                className={`flex gap-3.5 items-start py-3 ${i < block.items.length - 1 ? 'border-b border-[#1A1A1A]/10' : ''}`}
              >
                <span className="w-[18px] h-[18px] border-[1.5px] border-[#1A1A1A] shrink-0 mt-px" aria-hidden />
                <span className="font-sans text-[15px] leading-[1.5] text-[#1A1A1A]/84">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    case 'promptCard':
      return (
        <div className="my-7 border border-[#1A1A1A]/18">
          <div className="flex items-center justify-between gap-3 px-[clamp(18px,3vw,24px)] py-4 bg-[#FFF8F5] border-b border-[#1A1A1A]/14">
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6914] mb-1">
                / PROMPT
              </div>
              <span className="font-serif text-[clamp(17px,1.9vw,21px)] text-[#1A1A1A] tracking-[-0.01em]">
                {block.title}
              </span>
            </div>
            <PromptCopyButton text={block.body} />
          </div>
          <pre className="m-0 p-[clamp(18px,3vw,26px)] bg-[#16130F] text-[#FFF2EC]/90 font-mono text-[13.5px] leading-[1.85] whitespace-pre-wrap break-words">
            {renderPromptBody(block.body)}
          </pre>
        </div>
      )
    case 'glossary':
      return (
        <div className="w-full">
          {!block.continued ? (
            <>
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#8B6914] mb-1.5">
                / REFERENCE
              </div>
              <h2 className="font-serif font-medium text-[clamp(34px,5vw,52px)] leading-none tracking-[-0.03em] text-[#1A1A1A] mt-0 mb-6">
                {block.title ?? 'A plain-English glossary'}
              </h2>
              {block.intro ? (
                <p className="font-sans font-light text-[17px] leading-[1.6] text-[#1A1A1A]/60 mb-12 max-w-[50ch]">
                  {block.intro}
                </p>
              ) : null}
            </>
          ) : null}
          <dl className="m-0 mt-2">
            {block.entries.map((entry, i) => (
              <div
                key={entry.term}
                className={`py-6 grid grid-cols-1 md:grid-cols-[minmax(120px,200px)_1fr] gap-2 md:gap-7 border-t border-[#1A1A1A]/12 ${
                  i === block.entries.length - 1 ? 'border-b border-[#1A1A1A]/12' : ''
                }`}
              >
                <dt className="font-serif font-semibold text-[18px] text-[#1A1A1A] tracking-[-0.01em]">
                  {entry.term}
                </dt>
                <dd className="m-0 font-sans text-[15px] leading-[1.62] text-[#1A1A1A]/78">{entry.definition}</dd>
              </div>
            ))}
          </dl>
        </div>
      )
    case 'glossaryIntro':
      return (
        <div className="w-full">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#8B6914] mb-1.5">
            / REFERENCE
          </div>
          <h2 className="font-serif font-medium text-[clamp(30px,4.5vw,46px)] leading-[1.02] tracking-[-0.03em] text-[#1A1A1A] m-0">
            {block.title ?? 'A plain-English glossary'}
          </h2>
          {block.intro ? (
            <p className="font-sans font-light text-[16px] leading-[1.6] text-[#1A1A1A]/60 mt-4 mb-0 max-w-[52ch]">
              {block.intro}
            </p>
          ) : null}
        </div>
      )
    case 'glossaryEntry':
      return (
        <div className="grid grid-cols-1 md:grid-cols-[minmax(120px,190px)_1fr] gap-1 md:gap-7 border-t border-[#1A1A1A]/12 py-5">
          <dt className="font-serif font-semibold text-[17px] text-[#1A1A1A] tracking-[-0.01em] m-0">
            {block.term}
          </dt>
          <dd className="m-0 font-sans text-[15px] leading-[1.62] text-[#1A1A1A]/78">{block.definition}</dd>
        </div>
      )
    case 'featureIntro':
      return (
        <p className="mb-5 border border-[#C5A059]/40 bg-[#FFF8F5] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[#8B6914]">
          What it is · What it does · How you use it · What&apos;s next
        </p>
      )
    case 'featureCard':
      return (
        <div className="btw-feature-card mb-6 border border-[#1A1A1A]/18">
          <div className="px-[clamp(18px,3vw,24px)] py-4 bg-[#FFF8F5] border-b border-[#1A1A1A]/14">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6914] mb-1">
              / FEATURE
            </div>
            <p className="font-serif text-[clamp(17px,1.9vw,21px)] text-[#1A1A1A] tracking-[-0.01em] m-0">
              {block.title}
            </p>
          </div>
          <div className="grid gap-3 p-[clamp(18px,3vw,26px)] text-[14px] leading-[1.62]">
            <p className="m-0">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#8B6914]">What · </span>
              {block.what}
            </p>
            <p className="m-0">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#8B6914]">Does · </span>
              {block.does}
            </p>
            <p className="m-0">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#8B6914]">Use · </span>
              {block.use}
            </p>
            <p className="m-0">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#8B6914]">Next · </span>
              {block.next}
            </p>
          </div>
        </div>
      )
    case 'bullets':
      return (
        <ul className="my-4 mb-5 space-y-2 pl-4 text-[17px] leading-[1.72] list-disc text-[#1A1A1A]/84">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )
    case 'contents':
      return (
        <div className="w-full">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#8B6914]">/ CONTENTS</div>
          <h2 className="font-serif font-medium text-[clamp(34px,5vw,52px)] leading-none tracking-[-0.03em] text-[#1A1A1A] mt-[18px] mb-11">
            What&apos;s inside
          </h2>
          <ol className="list-none m-0 p-0">
            {block.items.map((item, i) => (
              <li
                key={item.num}
                className={`flex items-baseline gap-[18px] py-[18px] border-t border-[#1A1A1A]/12 ${
                  i === block.items.length - 1 ? 'border-b border-[#1A1A1A]/12' : ''
                }`}
              >
                <span className="font-mono text-[12px] font-bold tracking-[0.1em] text-[#8B6914] w-7 shrink-0">
                  {String(item.num).padStart(2, '0')}
                </span>
                <span className="font-serif text-[clamp(17px,1.9vw,21px)] text-[#1A1A1A] tracking-[-0.01em]">
                  {item.title}
                </span>
                <span className="flex-1 border-b border-dotted border-[#1A1A1A]/30 translate-y-[-4px]" />
                {item.page ? (
                  <span className="font-mono text-[12px] text-[#1A1A1A]/50 shrink-0">{item.page}</span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      )
    case 'chapterOpener':
      return null
    case 'spacer':
      return <div className="h-4" aria-hidden />
    default:
      return null
  }
}

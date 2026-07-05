import { BtwBlocks, BtwFlowList } from './BtwBlocks'
import { BTW_CHAPTER_COVERS } from '../chapter-covers'
import { BTW_PRINT_PAGE_SHELL } from '../styles'
import { BTW_TOKENS } from '../tokens'
import type { BtwBlock, BtwPage, BtwPageLayout } from '../types'

export type BtwGuideBookOptions = {
  runningHeadTitle: string
  chapterCovers: Record<number, { src: string; alt: string }>
}

const DEFAULT_GUIDE_OPTIONS: BtwGuideBookOptions = {
  runningHeadTitle: 'Built to Work',
  chapterCovers: BTW_CHAPTER_COVERS,
}

const CHAPTER_WORDS = [
  'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX',
  'SEVEN', 'EIGHT', 'NINE', 'TEN', 'ELEVEN', 'TWELVE',
]

type Props = {
  pageIndex: number
  layout?: BtwPageLayout
  blocks?: BtwPage['blocks']
  runningHeadRight?: string
  guide?: BtwGuideBookOptions
}

function ImagePlaceholderIcon() {
  return (
    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 block">
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <circle cx="8.5" cy="8.5" r="1.6" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  )
}

export function BtwChapterOpenerPage({
  blocks,
  chapterCovers = BTW_CHAPTER_COVERS,
}: {
  blocks: BtwBlock[]
  chapterCovers?: Record<number, { src: string; alt: string }>
}) {
  const block = blocks.find((b) => b.type === 'chapterOpener')
  if (!block || block.type !== 'chapterOpener') return null

  const chapterLabel = `/ CHAPTER ${CHAPTER_WORDS[block.num - 1] ?? String(block.num).padStart(2, '0')}`
  const numeral = String(block.num).padStart(2, '0')
  const cover = chapterCovers[block.num]
  const imageSrc = block.imageSrc ?? cover?.src
  const imageAlt = block.imageAlt ?? cover?.alt ?? ''

  return (
    <div className={`${BTW_PRINT_PAGE_SHELL} text-[#FFF2EC]`} style={{ backgroundColor: BTW_TOKENS.inkOpener }}>
      <div
        className="absolute inset-[clamp(24px,4vw,48px)] overflow-hidden rounded-sm"
        style={{ backgroundColor: BTW_TOKENS.inkOpener }}
      >
        {imageSrc ? (
          <>
            <img
              src={imageSrc}
              alt={imageAlt}
              className="absolute inset-0 h-full w-full object-cover object-center"
              decoding="async"
            />
            {/* Darken the left third so chapter titles read clearly — not full opacity */}
            <div
              className="pointer-events-none absolute inset-0 z-[1]"
              style={{
                background:
                  'linear-gradient(to right, rgba(17,17,17,0.82) 0%, rgba(17,17,17,0.58) 22%, rgba(17,17,17,0.32) 42%, rgba(17,17,17,0.12) 58%, transparent 72%)',
              }}
              aria-hidden
            />
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-center px-6" style={{ color: 'rgba(255,242,236,0.32)' }}>
            <ImagePlaceholderIcon />
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] mb-2">[ IMAGE ]</div>
            {block.imageCaption ? (
              <div className="font-mono text-[11px] leading-[1.7] tracking-[0.06em] max-w-[30ch] mx-auto">
                {block.imageCaption}
              </div>
            ) : null}
          </div>
        )}
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(17,17,17,.94) 0%, rgba(17,17,17,.62) 32%, rgba(17,17,17,.28) 52%, rgba(17,17,17,0) 72%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 mt-auto p-[clamp(48px,7vw,80px)]">
        <div className="font-mono text-[11px] font-bold uppercase tracking-[0.26em] text-[#D4A84B] mb-3.5">
          {chapterLabel}
        </div>
        <div
          className="font-serif font-medium leading-[0.8] tracking-[-0.04em] mb-[-4px]"
          style={{
            fontSize: 'clamp(80px, 17vw, 150px)',
            color: 'rgba(255,242,236,0.16)',
          }}
        >
          {numeral}
        </div>
        <h2 className="font-serif font-medium text-[clamp(36px,6.5vw,64px)] leading-[0.98] tracking-[-0.035em] text-[#FFF2EC] mt-3.5 mb-0 max-w-[16ch]">
          {block.title}
        </h2>
        <div className="w-16 h-0.5 bg-[#C5A059] my-7" />
        {block.subtitle ? (
          <p className="font-sans font-light text-[clamp(15px,1.6vw,19px)] leading-[1.6] text-[#FFF2EC]/78 max-w-[46ch] m-0">
            {block.subtitle}
          </p>
        ) : null}
      </div>
    </div>
  )
}

export function BtwPageShell({ pageIndex, layout = 'flow', blocks, runningHeadRight, guide }: Props) {
  const { runningHeadTitle, chapterCovers } = guide ?? DEFAULT_GUIDE_OPTIONS

  if (layout === 'opener' && blocks) {
    return <BtwChapterOpenerPage blocks={blocks} chapterCovers={chapterCovers} />
  }

  const isContents = layout === 'contents'

  const pagePadding = isContents
    ? 'p-[clamp(40px,6vw,72px)]'
    : 'px-[clamp(28px,5vw,64px)] pt-[clamp(36px,5vw,60px)] pb-[clamp(32px,4vw,52px)]'

  return (
    <div className={`${BTW_PRINT_PAGE_SHELL} flex flex-col`} style={{ backgroundColor: BTW_TOKENS.cream, color: BTW_TOKENS.ink }}>
      <div className={`flex min-h-0 flex-1 flex-col ${pagePadding}`}>
        {runningHeadRight ? (
          <header
            className="btw-running-head flex justify-between items-center pb-3.5 mb-[clamp(28px,4vw,44px)] font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ borderBottom: '1px solid rgba(26,26,26,0.12)', color: 'rgba(26,26,26,0.45)' }}
          >
            <span>{runningHeadTitle}</span>
            <span>{runningHeadRight}</span>
          </header>
        ) : null}

        <main className="btw-page-main flex min-h-0 flex-1 flex-col overflow-visible md:overflow-hidden">
          {blocks
            ? layout === 'flow'
              ? <BtwFlowList blocks={blocks} />
              : <BtwBlocks blocks={blocks} flow={false} />
            : null}
        </main>

        {!isContents ? (
          <footer
            className="btw-folio mt-auto pt-[clamp(28px,4vw,44px)] text-center font-mono text-[11px] tracking-[0.1em]"
            style={{ color: 'rgba(26,26,26,0.45)' }}
          >
            {pageIndex}
          </footer>
        ) : null}
      </div>
    </div>
  )
}

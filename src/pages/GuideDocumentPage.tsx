import React, {useEffect, useMemo, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import {client} from '../sanityClient'
import {PageMeta} from '../components/PageMeta'
import {SITE_ORIGIN} from '../constants/seoMeta'

// --- Types aligned with Sanity `guide` + `guideBlockContent` ---

type MarkDef = {
  _key: string
  _type: string
  href?: string
}

type SpanChild = {
  _type?: string
  text?: string
  marks?: string[]
}

export type PortableTextBlock = {
  _type: 'block'
  style?: string
  listItem?: 'bullet' | 'number' | string
  level?: number
  children?: SpanChild[]
  markDefs?: MarkDef[]
}

export type SectionCoverBlock = {
  _type: 'sectionCover'
  sectionNumber?: string
  sectionTitle?: string
  sectionIntro?: string
}

export type CalloutBoxBlock = {
  _type: 'calloutBox'
  label?: string
  body?: string
}

export type DarkQuoteBlock = {
  _type: 'darkQuote'
  body?: string
}

export type BulletCardBlock = {
  _type: 'bulletCard'
  items?: string[]
}

export type ChecklistGroupBlock = {
  _type: 'checklistGroup'
  categoryTitle?: string
  categoryColour?: 'red' | 'gold' | string
  items?: string[]
}

export type ContrastDemoBlock = {
  _type: 'contrastDemo'
  failLabel?: string
  failText?: string
  convertLabel?: string
  convertText?: string
}

export type GuideContentBlock =
  | PortableTextBlock
  | SectionCoverBlock
  | CalloutBoxBlock
  | DarkQuoteBlock
  | BulletCardBlock
  | ChecklistGroupBlock
  | ContrastDemoBlock
  | {_type?: string; [key: string]: unknown}

export type GuidePageEntry = {
  _type?: string
  _key?: string
  content?: GuideContentBlock[]
}

export type GuideDocument = {
  title: string
  subtitle?: string
  seoTitle?: string
  seoDescription?: string
  pages: GuidePageEntry[]
}

const GUIDE_BY_SLUG_QUERY = `*[_type == "guide" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  title,
  subtitle,
  seoTitle,
  seoDescription,
  servicePillar,
  publishedAt,
  pages[]{
    _key,
    _type,
    content
  }
}`

function isPortableBlock(b: GuideContentBlock): b is PortableTextBlock {
  return b._type === 'block'
}

function renderMarks(
  text: string,
  marks: string[] | undefined,
  markDefs: MarkDef[] | undefined,
  key: string
): React.ReactNode {
  if (!marks?.length) return text
  let node: React.ReactNode = text
  for (const mark of marks) {
    if (mark === 'strong') {
      node = <strong key={`${key}-s`}>{node}</strong>
    } else if (mark === 'em') {
      node = <em key={`${key}-e`}>{node}</em>
    } else if (mark === 'code') {
      node = (
        <code key={`${key}-c`} className="rounded bg-black/5 px-1 font-mono text-[0.9em]">
          {node}
        </code>
      )
    } else {
      const def = markDefs?.find((d) => d._key === mark)
      if (def?._type === 'link' && def.href) {
        node = (
          <a key={`${key}-a`} href={def.href} className="text-[#9A1730] underline underline-offset-2">
            {node}
          </a>
        )
      }
    }
  }
  return node
}

function renderTextSpans(block: PortableTextBlock): React.ReactNode {
  const markDefs = block.markDefs ?? []
  return (block.children ?? []).map((child, i) => {
    const t = child.text ?? ''
    if (!t) return null
    return <React.Fragment key={i}>{renderMarks(t, child.marks, markDefs, `${i}`)}</React.Fragment>
  })
}

function renderSingleTextBlock(block: PortableTextBlock, key: number): React.ReactNode {
  const body = renderTextSpans(block)
  const style = block.style ?? 'normal'
  if (style === 'h2') {
    return (
      <h2 key={key} className="font-serif text-[28px] font-semibold leading-tight text-[#1a1a1a]">
        {body}
      </h2>
    )
  }
  if (style === 'h3') {
    return (
      <h3 key={key} className="font-serif text-[22px] font-semibold leading-snug text-[#1a1a1a]">
        {body}
      </h3>
    )
  }
  if (style === 'h4') {
    return (
      <h4 key={key} className="font-serif text-lg font-semibold text-[#1a1a1a]">
        {body}
      </h4>
    )
  }
  if (style === 'blockquote') {
    return (
      <blockquote
        key={key}
        className="border-l-4 border-[#C5A059] pl-4 font-serif italic text-[#1a1a1a]/80"
      >
        {body}
      </blockquote>
    )
  }
  return (
    <p key={key} className="text-[15px] leading-relaxed text-[#1a1a1a]">
      {body}
    </p>
  )
}

/** Lightweight Portable Text renderer (no @portabletext/react). */
function renderGuideBlocks(blocks: GuideContentBlock[]): React.ReactNode[] {
  const out: React.ReactNode[] = []
  let i = 0
  while (i < blocks.length) {
    const b = blocks[i]

    if (!isPortableBlock(b)) {
      out.push(renderCustomBlock(b, i))
      i += 1
      continue
    }

    if (b.listItem === 'bullet' || b.listItem === 'number') {
      const kind = b.listItem
      const items: PortableTextBlock[] = []
      while (i < blocks.length) {
        const x = blocks[i]
        if (!isPortableBlock(x) || x.listItem !== kind) break
        items.push(x)
        i += 1
      }
      const ListTag = kind === 'number' ? 'ol' : 'ul'
      out.push(
        <ListTag
          key={`list-${i}-${items.length}`}
          className={`my-3 space-y-1 pl-5 text-[15px] leading-relaxed ${kind === 'number' ? 'list-decimal' : 'list-disc'}`}
        >
          {items.map((item, j) => (
            <li key={j}>{renderTextSpans(item)}</li>
          ))}
        </ListTag>
      )
      continue
    }

    out.push(renderSingleTextBlock(b, i))
    i += 1
  }
  return out
}

function renderCustomBlock(block: GuideContentBlock, key: number): React.ReactNode {
  switch (block._type) {
    case 'sectionCover': {
      const s = block as SectionCoverBlock
      return (
        <div key={key} className="my-6 flex flex-col items-center text-center">
          <div className="shadow-neu flex h-24 w-24 items-center justify-center rounded-full bg-[#FFF2EC]">
            <div className="shadow-neu-inner flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF8F5]">
              <span className="font-serif text-2xl font-bold text-[#9A1730]">{s.sectionNumber ?? ''}</span>
            </div>
          </div>
          {s.sectionTitle ? (
            <h2 className="mt-8 font-serif text-[42px] font-semibold leading-[1.1] text-[#1a1a1a]">
              {s.sectionTitle}
            </h2>
          ) : null}
          {s.sectionIntro ? (
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#1a1a1a]/75">{s.sectionIntro}</p>
          ) : null}
        </div>
      )
    }
    case 'calloutBox': {
      const c = block as CalloutBoxBlock
      return (
        <div
          key={key}
          className="callout-neu shadow-neu-inner relative my-4 rounded-2xl bg-[#FFF2EC] px-6 py-5"
        >
          {c.label ? (
            <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B6914]">
              {c.label}
            </p>
          ) : null}
          {c.body ? (
            <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-[#1a1a1a]">{c.body}</p>
          ) : null}
        </div>
      )
    }
    case 'darkQuote': {
      const q = block as DarkQuoteBlock
      return (
        <div
          key={key}
          className="shadow-neu my-4 rounded-xl border border-[#333] border-l-[8px] border-l-[#8B6914] bg-[#1a1a1a] px-6 py-5 text-[#FFF2EC]"
        >
          {q.body ? (
            <p className="whitespace-pre-wrap font-serif text-lg leading-relaxed">{q.body}</p>
          ) : null}
        </div>
      )
    }
    case 'bulletCard': {
      const card = block as BulletCardBlock
      return (
        <div key={key} className="shadow-neu-inner my-4 rounded-2xl bg-[#FFF8F5] px-6 py-5">
          <ul className="space-y-2">
            {(card.items ?? []).map((item, j) => (
              <li key={j} className="flex gap-3 text-[15px] leading-relaxed text-[#1a1a1a]">
                <span className="shadow-neu-inner mt-1.5 h-2.5 w-2.5 shrink-0 rounded-sm bg-[#FFF2EC]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    }
    case 'checklistGroup': {
      const g = block as ChecklistGroupBlock
      const isGold = g.categoryColour === 'gold'
      const headerClass = isGold
        ? 'text-[#8B6914] border-[#C5A059]/40'
        : 'text-[#9A1730] border-[#9A1730]/30'
      return (
        <div key={key} className="my-5">
          {g.categoryTitle ? (
            <h4
              className={`mb-3 border-b pb-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] ${headerClass}`}
            >
              {g.categoryTitle}
            </h4>
          ) : null}
          <ul className="space-y-3">
            {(g.items ?? []).map((item, j) => (
              <li key={j} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#1a1a1a]">
                <span
                  className="shadow-neu-inner mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-black/5 bg-[#FFF8F5]"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    }
    case 'contrastDemo': {
      const d = block as ContrastDemoBlock
      return (
        <div key={key} className="my-5 grid grid-cols-2 gap-4">
          <div className="shadow-neu-inner rounded-xl bg-[#FFF2EC] px-4 py-4 text-[#1a1a1a]/70">
            <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/45">
              {d.failLabel ?? 'Fail'}
            </p>
            <p className="text-[14px] leading-relaxed">{d.failText ?? ''}</p>
          </div>
          <div className="shadow-neu rounded-xl bg-[#1a1a1a] px-4 py-4 text-[#FFF2EC]">
            <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">
              {d.convertLabel ?? 'Convert'}
            </p>
            <p className="text-[14px] leading-relaxed text-[#FFF2EC]">{d.convertText ?? ''}</p>
          </div>
        </div>
      )
    }
    default:
      return null
  }
}

// --- A4 shell ---

type PageContainerProps = {
  pageIndex: number
  totalPages: number
  children: React.ReactNode
}

function NoiseLayer() {
  return (
    <svg
      className="noise-layer pointer-events-none absolute inset-0 z-[1] h-full w-full mix-blend-multiply opacity-[0.04]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <filter id="guide-fractal-noise" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" />
        </filter>
      </defs>
      <rect width="100%" height="100%" filter="url(#guide-fractal-noise)" />
    </svg>
  )
}

function PageContainer({pageIndex, totalPages, children}: PageContainerProps) {
  return (
    <div className="relative flex h-[1123px] w-[794px] flex-shrink-0 flex-col overflow-hidden bg-[#FFF2EC] text-[#1a1a1a]">
      <NoiseLayer />
      <div className="relative z-[2] flex h-full min-h-0 flex-col">
        <header className="flex h-[100px] shrink-0 items-center border-b border-black/5 px-10">
          <span className="font-serif text-2xl font-semibold tracking-tight text-[#1a1a1a]">SYSBILT</span>
        </header>
        <main className="min-h-0 flex-1 overflow-hidden px-10 py-6">
          <div className="flex h-full min-h-0 flex-col gap-4">{children}</div>
        </main>
        <footer className="flex h-[100px] shrink-0 items-center justify-end border-t border-black/5 px-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#1a1a1a]/50">
            Page {pageIndex + 1} of {totalPages}
          </span>
        </footer>
      </div>
    </div>
  )
}

const GUIDE_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Lora:ital,wght@0,400;0,600;0,700;1,400&display=swap');

.guide-root {
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
}

.guide-root .font-serif {
  font-family: Lora, Georgia, 'Times New Roman', serif;
}

/* Neumorphic shadows (cream surface) */
.guide-root .shadow-neu {
  box-shadow:
    10px 10px 22px rgba(26, 26, 26, 0.12),
    -8px -8px 20px rgba(255, 255, 255, 0.85);
}

.guide-root .shadow-neu-inner {
  box-shadow:
    inset 5px 5px 12px rgba(26, 26, 26, 0.08),
    inset -4px -4px 12px rgba(255, 255, 255, 0.9);
}

.guide-root .shadow-neu-sm {
  box-shadow:
   4px 4px 10px rgba(26, 26, 26, 0.1),
    -3px -3px 8px rgba(255, 255, 255, 0.75);
}

.guide-root .callout-neu::before {
  content: '';
  position: absolute;
  top: 0;
  left: 12%;
  right: 12%;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.85), transparent);
  pointer-events: none;
}
`

export default function GuideDocumentPage() {
  const {slug} = useParams<{slug: string}>()
  const [guideData, setGuideData] = useState<GuideDocument | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug?.trim()) {
      setLoading(false)
      setNotFound(true)
      setGuideData(null)
      return
    }

    let cancelled = false
    setLoading(true)
    setNotFound(false)

    client
      .fetch<GuideDocument | null>(GUIDE_BY_SLUG_QUERY, {slug})
      .then((data) => {
        if (cancelled) return
        if (!data?.title) {
          setGuideData(null)
          setNotFound(true)
        } else {
          setGuideData({
            ...data,
            pages: Array.isArray(data.pages) ? data.pages : [],
          })
          setNotFound(false)
        }
      })
      .catch((err) => {
        console.error('Guide fetch failed:', err)
        if (!cancelled) {
          setGuideData(null)
          setNotFound(true)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  const pages = guideData?.pages ?? []
  const totalPages = Math.max(pages.length, 1)

  const pageNodes = useMemo(() => {
    return pages.map((page, idx) => {
      const blocks = page.content ?? []
      return (
        <React.Fragment key={page._key ?? idx}>
          <PageContainer pageIndex={idx} totalPages={totalPages}>
            {renderGuideBlocks(blocks)}
          </PageContainer>
        </React.Fragment>
      )
    })
  }, [pages, totalPages])

  const metaTitle = guideData?.seoTitle?.trim() || (guideData?.title ? `${guideData.title} | SYSBILT` : 'Guide | SYSBILT')
  const metaDescription =
    guideData?.seoDescription?.trim() || guideData?.subtitle?.trim() || 'SYSBILT system guides for growing Australian businesses.'
  const canonical = slug ? `${SITE_ORIGIN}/guides/${slug}` : undefined

  if (loading) {
    return (
      <div className="guide-root flex min-h-screen items-center justify-center bg-[#111111] px-4 py-20">
        <style>{GUIDE_STYLES}</style>
        <p className="font-mono text-sm uppercase tracking-widest text-[#FFF2EC]/60">Loading guide…</p>
      </div>
    )
  }

  if (notFound || !guideData) {
    return (
      <div className="guide-root flex min-h-screen flex-col items-center justify-center gap-6 bg-[#111111] px-4 py-20 text-center">
        <style>{GUIDE_STYLES}</style>
        <PageMeta title="Guide not found | SYSBILT" description="This guide does not exist or is unpublished." robots="noindex, follow" />
        <h1 className="font-serif text-2xl text-[#FFF2EC]">Guide not found</h1>
        <p className="max-w-md text-[#FFF2EC]/70">The guide you’re looking for isn’t available. It may have been moved or not published yet.</p>
        <Link to="/guides" className="font-mono text-sm uppercase tracking-widest text-[#C5A059] underline underline-offset-4 hover:text-[#FFF2EC]">
          Back to guides
        </Link>
      </div>
    )
  }

  return (
    <div className="guide-root min-h-screen bg-[#111111] py-10 text-[#1a1a1a]">
      <style>{GUIDE_STYLES}</style>
      <PageMeta title={metaTitle} description={metaDescription} canonical={canonical} />
      <div className="mx-auto flex max-w-[840px] flex-col items-center gap-12 px-4">
        {guideData.title ? (
          <h1 className="text-center font-serif text-3xl text-[#FFF2EC]">{guideData.title}</h1>
        ) : null}
        {pageNodes}
      </div>
    </div>
  )
}

import React, {useEffect, useMemo, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import {client, urlFor} from '../sanityClient'
import {PageMeta} from '../components/PageMeta'
import {SITE_ORIGIN} from '../constants/seoMeta'
import {SysbiltLogo} from '../components/SysbiltLogo'

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

export type SanityImageField = {
  _type?: 'image'
  asset?: {_ref?: string}
  alt?: string
}

export type ImagePlaceholderBlock = {
  _type: 'imagePlaceholder'
  image?: SanityImageField
  ratio?: '16:9' | '4:3' | '1:1' | '3:4' | '9:16'
  caption?: string
}

export type GuideContentBlock =
  | PortableTextBlock
  | SectionCoverBlock
  | CalloutBoxBlock
  | DarkQuoteBlock
  | BulletCardBlock
  | ChecklistGroupBlock
  | ContrastDemoBlock
  | ImagePlaceholderBlock
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
  servicePillar?: string
  coverLegend?: string
  includeCtaPage?: boolean
  ctaTitle?: string
  ctaDescription?: string
  ctaButtonText?: string
  ctaLink?: string
  ctaLegend?: string
  pages: GuidePageEntry[]
}

const DEFAULT_COVER_LEGEND =
  'For Australian businesses who know their website should be doing more'

const DEFAULT_CTA_TITLE = 'Ready to fix this?'
const DEFAULT_CTA_DESCRIPTION =
  'Book a call and we will walk you through how this applies to your business. We will give you an honest read on whether it is worth doing right now, and if so, exactly where to start.'
const DEFAULT_CTA_BUTTON = 'Book a call'
const DEFAULT_CTA_LEGEND =
  'We do not upsell. We do not surprise you with hidden costs. We tell you what you need, what it costs, and how long it takes. If it is not worth doing, we will tell you that too.'

const GUIDE_BY_SLUG_QUERY = `*[_type == "guide" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  title,
  subtitle,
  seoTitle,
  seoDescription,
  servicePillar,
  publishedAt,
  coverLegend,
  includeCtaPage,
  ctaTitle,
  ctaDescription,
  ctaButtonText,
  ctaLink,
  ctaLegend,
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

// Intercept slash numbers to bypass Sanity's auto-list formatting
function extractPrefix(block: PortableTextBlock) {
  if (!block.children || block.children.length === 0) return null;
  const firstChild = block.children[0];
  if (!firstChild.text) return null;
  
  // 1. Check double slash: "1// Text" -> Soft UX Design
  const doubleMatch = firstChild.text.match(/^(\d+)\s*\/\/\s*(.*)/);
  if (doubleMatch) {
    return { type: 'soft', num: doubleMatch[1], restOfText: doubleMatch[2], firstChild };
  }

  // 2. Check single slash: "1/ Text" -> Brutalist Design
  const singleMatch = firstChild.text.match(/^(\d+)\s*\/(?!\/)\s*(.*)/);
  if (singleMatch) {
    return { type: 'brutalist', num: singleMatch[1], restOfText: singleMatch[2], firstChild };
  }

  return null;
}

function renderSingleTextBlock(block: PortableTextBlock, key: number): React.ReactNode {
  const style = block.style ?? 'normal'
  
  const getHeadingClass = (hStyle: string) => {
    if (hStyle === 'h2') return 'font-serif text-[36px] font-semibold leading-[1.05] tracking-tighter text-[#1a1a1a]';
    if (hStyle === 'h3') return 'font-serif text-[22px] font-medium leading-snug tracking-[0.05em] uppercase text-[#1a1a1a]/90';
    if (hStyle === 'h4') return 'font-serif text-[19px] font-medium leading-snug tracking-tight text-[#1a1a1a]';
    return '';
  }

  const prefix = extractPrefix(block);

  if (prefix) {
    const newChildren = [...block.children!];
    newChildren[0] = { ...prefix.firstChild, text: prefix.restOfText };
    const bodyNode = renderTextSpans({ ...block, children: newChildren });

    const isHeading = style === 'h2' || style === 'h3' || style === 'h4';
    const marginClass = style === 'h2' ? 'mt-10 mb-5' : style === 'h3' ? 'mt-8 mb-4' : style === 'h4' ? 'mt-6 mb-3' : 'mb-4';

    if (prefix.type === 'soft') {
      // --- SOFT UX BADGE (1//) ---
      const outerSize = style === 'h2' ? 'h-12 w-12' : style === 'h3' ? 'h-10 w-10' : 'h-8 w-8';
      const innerSize = style === 'h2' ? 'h-8 w-8' : style === 'h3' ? 'h-7 w-7' : 'h-6 w-6';
      const numSize = style === 'h2' ? 'text-[15px]' : style === 'h3' ? 'text-[13px]' : 'text-[11px]';

      return (
        <div key={key} className={`flex items-start gap-4 ${marginClass}`}>
          <div className={`flex shrink-0 items-center justify-center rounded-full bg-[#FFF2EC] shadow-neu border border-white/40 mt-[-4px] ${outerSize}`}>
             <div className={`flex items-center justify-center rounded-full bg-[#FFF8F5] shadow-neu-inner ${innerSize}`}>
               <span className={`font-serif font-bold text-[#8B6914] ${numSize}`}>{prefix.num}</span>
             </div>
          </div>
          <div className={isHeading ? `${getHeadingClass(style)} pt-0.5` : "text-[15px] leading-relaxed text-[#1a1a1a] pt-1 flex-1"}>
            {bodyNode}
          </div>
        </div>
      )
    } else {
      // --- BRUTALIST BADGE (1/) ---
      const circleSize = style === 'h2' ? 'h-10 w-10 text-[16px]' : style === 'h3' ? 'h-9 w-9 text-[14px]' : style === 'h4' ? 'h-8 w-8 text-[13px]' : 'h-7 w-7 text-[12px]';

      return (
        <div key={key} className={`flex items-start gap-4 ${marginClass}`}>
          <div className={`flex shrink-0 items-center justify-center rounded-full bg-[#1a1a1a] shadow-neu-sm font-bold text-[#C5A059] font-mono mt-0.5 ${circleSize}`}>
            {prefix.num}
          </div>
          <div className={isHeading ? `${getHeadingClass(style)} pt-0.5` : "text-[15px] leading-relaxed text-[#1a1a1a] pt-1 flex-1"}>
            {bodyNode}
          </div>
        </div>
      )
    }
  }

  // Standard rendering if no prefix matches
  const body = renderTextSpans(block)
  
  if (style === 'h2') {
    return <h2 key={key} className={`${getHeadingClass(style)} mt-10 mb-4`}>{body}</h2>
  }
  if (style === 'h3') {
    return <h3 key={key} className={`${getHeadingClass(style)} mt-8 mb-4`}>{body}</h3>
  }
  if (style === 'h4') {
    return <h4 key={key} className={`${getHeadingClass(style)} mt-6 mb-3`}>{body}</h4>
  }
  if (style === 'blockquote') {
    return (
      <blockquote key={key} className="border-l-4 border-[#C5A059] pl-4 my-5 font-serif italic text-[#1a1a1a]/80">
        {body}
      </blockquote>
    )
  }
  return (
    <p key={key} className="text-[15px] leading-relaxed text-[#1a1a1a] mb-4">
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
      
      if (kind === 'number') {
        // Official Sanity Numbered List - Uses Brutalist Dark Circle
        out.push(
          <div key={`list-${i}-${items.length}`} className="my-6 space-y-4 pl-2 text-[15px] leading-relaxed">
            {items.map((item, j) => (
              <div key={j} className="flex items-start gap-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1a1a1a] shadow-neu-sm text-[12px] font-bold text-[#C5A059] font-mono mt-0.5">
                  {j + 1}
                </div>
                <div className="flex-1 text-[#1a1a1a] pt-1">{renderTextSpans(item)}</div>
              </div>
            ))}
          </div>
        )
      } else {
        // Standard Bullet List
        out.push(
          <ul
            key={`list-${i}-${items.length}`}
            className="my-3 mb-6 space-y-2 pl-5 text-[15px] leading-relaxed list-disc"
          >
            {items.map((item, j) => (
              <li key={j} className="pl-1">{renderTextSpans(item)}</li>
            ))}
          </ul>
        )
      }
      continue
    }

    out.push(renderSingleTextBlock(b, i))
    i += 1
  }
  return out
}

// Interactive Component for Checklists
function InteractiveChecklist({ items, categoryTitle, categoryColour }: any) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const isGold = categoryColour === 'gold';
  const headerClass = isGold ? 'text-[#8B6914] border-[#C5A059]/40' : 'text-[#9A1730] border-[#9A1730]/30';
  const checkColour = isGold ? 'text-[#8B6914]' : 'text-[#9A1730]';

  const toggleCheck = (idx: number) => {
    setChecked(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="my-8">
      {categoryTitle ? (
        <h4 className={`mb-4 border-b pb-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] ${headerClass}`}>
          {categoryTitle}
        </h4>
      ) : null}
      <ul className="space-y-4">
        {(items ?? []).map((item: string, j: number) => {
          const isChecked = !!checked[j];
          return (
            <li 
              key={j} 
              className="flex items-start gap-4 text-[15px] leading-relaxed cursor-pointer group"
              onClick={() => toggleCheck(j)}
            >
              <button 
                type="button"
                className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-black/5 transition-all duration-200 ${isChecked ? 'shadow-neu-inner bg-[#FFF8F5]' : 'shadow-sm bg-[#FFF2EC] group-hover:bg-[#FFF8F5]'}`}
                aria-label="Toggle checklist item"
              >
                <svg 
                  className={`w-3.5 h-3.5 transition-all duration-200 ${checkColour} ${isChecked ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </button>
              <span className={`transition-all duration-200 select-none ${isChecked ? 'text-[#1a1a1a]/50 line-through' : 'text-[#1a1a1a]'}`}>
                {item}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function renderCustomBlock(block: GuideContentBlock, key: number): React.ReactNode {
  switch (block._type) {
    case 'sectionCover': {
      const s = block as SectionCoverBlock
      return (
        <div key={key} className="flex flex-1 flex-col items-center justify-center text-center w-full py-12">
          <div className="shadow-neu flex h-24 w-24 items-center justify-center rounded-full bg-[#FFF2EC]">
            <div className="shadow-neu-inner flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF8F5]">
              <span className="font-serif text-2xl font-bold text-[#9A1730]">{s.sectionNumber ?? ''}</span>
            </div>
          </div>
          {s.sectionTitle ? (
            <h2 className="mt-8 font-serif text-[42px] font-semibold leading-[1.1] tracking-tighter text-[#1a1a1a]">
              {s.sectionTitle}
            </h2>
          ) : null}
          {s.sectionIntro ? (
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[#1a1a1a]/75">{s.sectionIntro}</p>
          ) : null}
        </div>
      )
    }
    case 'calloutBox': {
      const c = block as CalloutBoxBlock
      return (
        <div
          key={key}
          className="shadow-neu relative my-8 rounded-2xl bg-[#FFF2EC] px-8 py-8 border border-white/30"
        >
          {/* Decorative Neumorphic Screws */}
          <div className="absolute top-4 right-4 h-[6px] w-[6px] rounded-full shadow-neu-inner bg-[#1a1a1a]/5"></div>
          <div className="absolute bottom-4 right-4 h-[6px] w-[6px] rounded-full shadow-neu-inner bg-[#1a1a1a]/5"></div>
          <div className="absolute top-4 left-4 h-[6px] w-[6px] rounded-full shadow-neu-inner bg-[#1a1a1a]/5"></div>
          <div className="absolute bottom-4 left-4 h-[6px] w-[6px] rounded-full shadow-neu-inner bg-[#1a1a1a]/5"></div>

          {c.label ? (
            <div className="mb-5 inline-flex shadow-neu-inner rounded-md px-4 py-2 bg-[#FFF8F5] relative z-10">
              <p className="font-mono text-[13px] font-bold uppercase tracking-[0.2em] text-[#8B6914]">
                {c.label}
              </p>
            </div>
          ) : null}
          {c.body ? (
            <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-[#1a1a1a] relative z-10">{c.body}</p>
          ) : null}
        </div>
      )
    }
    case 'darkQuote': {
      const q = block as DarkQuoteBlock
      return (
        <div
          key={key}
          className="shadow-neu my-6 rounded-xl border border-[#333] border-l-[8px] border-l-[#8B6914] bg-[#1a1a1a] px-8 py-6 text-[#FFF2EC]"
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
        <div key={key} className="shadow-neu-inner my-6 rounded-2xl bg-[#FFF8F5] px-8 py-6 border border-black/5">
          <ul className="space-y-4">
            {(card.items ?? []).map((item, j) => (
              <li key={j} className="flex items-start gap-4 text-[15px] leading-relaxed text-[#1a1a1a]">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-[3px] bg-[#9A1730] shadow-sm" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    }
    case 'checklistGroup': {
      const g = block as ChecklistGroupBlock;
      return <InteractiveChecklist key={key} items={g.items} categoryTitle={g.categoryTitle} categoryColour={g.categoryColour} />;
    }
    case 'contrastDemo': {
      const d = block as ContrastDemoBlock
      return (
        <div key={key} className="my-8 grid grid-cols-2 gap-6">
          <div className="shadow-neu-inner rounded-xl bg-[#FFF2EC] px-6 py-5 text-[#1a1a1a]/70">
            <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/45">
              {d.failLabel ?? 'Fail'}
            </p>
            <p className="text-[14px] leading-relaxed">{d.failText ?? ''}</p>
          </div>
          <div className="shadow-neu rounded-xl bg-[#1a1a1a] px-6 py-5 text-[#FFF2EC]">
            <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">
              {d.convertLabel ?? 'Convert'}
            </p>
            <p className="text-[14px] leading-relaxed text-[#FFF2EC]">{d.convertText ?? ''}</p>
          </div>
        </div>
      )
    }
    case 'imagePlaceholder': {
      const p = block as ImagePlaceholderBlock
      const ratioClass = {
        '16:9': 'aspect-video',
        '4:3': 'aspect-[4/3]',
        '1:1': 'aspect-square',
        '3:4': 'aspect-[3/4]',
        '9:16': 'aspect-[9/16]',
      }[p.ratio ?? '16:9'] || 'aspect-video'

      const hasAsset = Boolean(p.image?.asset?._ref)
      const imageSrc = hasAsset && p.image ? urlFor(p.image).width(1800).fit('max').url() : null
      const altText = (p.image?.alt ?? p.caption ?? '').trim() || ''

      return (
        <div key={key} className="my-8 flex w-full flex-col items-center">
          <div
            className={`relative flex w-full max-h-[500px] ${ratioClass} items-center justify-center overflow-hidden rounded-2xl border border-black/5 bg-[#FFF8F5] shadow-neu-inner`}
          >
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={altText}
                className="absolute inset-0 z-10 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:8px_8px] mix-blend-multiply opacity-50" />
                <div className="z-10 flex flex-col items-center gap-3 opacity-40">
                  <svg className="h-10 w-10 text-[#1a1a1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]">
                    Image / {p.ratio ?? '16:9'}
                  </span>
                </div>
              </>
            )}
          </div>
          {p.caption && (
            <p className="mt-4 text-center font-sans text-[13px] text-[#1a1a1a]/60">{p.caption}</p>
          )}
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
  servicePillar?: string | null
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

function CoverPage({ guideData }: { guideData: GuideDocument }) {
  return (
    <div className="print-page relative flex h-[1123px] w-[794px] flex-shrink-0 flex-col overflow-hidden bg-[#FFF2EC] text-[#1a1a1a] shadow-neu border border-white/40">
      <NoiseLayer />
      
      {/* Functional Print/Download Button (Hidden when actually printing) */}
      <button 
        onClick={() => window.print()}
        className="absolute top-10 right-10 z-[20] flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-black/10 shadow-neu-sm text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[#1a1a1a]/60 hover:bg-white hover:text-[#9A1730] transition-colors print:hidden group"
      >
        <svg className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        Save / Print
      </button>

      {/* Absolute Header - SysbiltLogo component */}
      <div className="absolute top-0 left-0 w-full pt-20 px-24 flex justify-center z-[3]">
        <SysbiltLogo className="w-[120px] h-auto text-[#1a1a1a] opacity-90" />
      </div>
      
      {/* Absolute Body - True vertical and horizontal centre */}
      <div className="relative z-[2] flex h-full w-full flex-col items-center justify-center px-24 text-center">
         <h1 className="font-serif text-[64px] leading-[1.05] tracking-tighter text-[#1a1a1a] mb-8 max-w-[650px] mx-auto">
           {guideData.title}
         </h1>
         {guideData.subtitle && (
           <p className="font-sans text-xl font-light leading-relaxed text-[#1a1a1a]/70 max-w-[550px] mx-auto">
             {guideData.subtitle}
           </p>
         )}
      </div>
      
      {/* Absolute Footer - Pinned to exact bottom */}
      <div className="absolute bottom-0 left-0 w-full pb-20 px-24 z-[3]">
         <div className="border-t border-black/10 pt-8 text-center">
            <p className="font-serif text-[17px] italic text-[#1a1a1a]/60">
              {guideData.coverLegend?.trim() || DEFAULT_COVER_LEGEND}
            </p>
         </div>
      </div>
    </div>
  )
}

function PageContainer({pageIndex, totalPages, servicePillar, children}: PageContainerProps) {
  return (
    <div className="print-page relative flex h-[1123px] w-[794px] flex-shrink-0 flex-col overflow-hidden bg-[#FFF2EC] text-[#1a1a1a] shadow-neu border border-white/40">
      <NoiseLayer />
      <div className="relative z-[2] flex h-full min-h-0 flex-col">
        {/* A4 Header: SysbiltLogo component & Pillar Badge. Tagged with a4-header to prevent print-hiding */}
        <header className="a4-header flex h-[110px] shrink-0 items-center justify-between border-b border-black/5 px-24">
          <SysbiltLogo className="w-[85px] h-auto text-[#1a1a1a] opacity-70" />
          
          {servicePillar ? (
            <div className="shadow-neu-inner bg-[#FFF8F5] border border-black/5 rounded-md px-4 py-2">
               <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#8B6914]">
                 {servicePillar}
               </span>
            </div>
          ) : null}
        </header>

        {/* A4 Content Area - Widened margins & Centered vertically */}
        <main className="min-h-0 flex-1 overflow-hidden px-24 py-12 flex flex-col justify-center">
          <div className="flex flex-col w-full">{children}</div>
        </main>

        {/* A4 Footer: Domain & Page Numbers. Tagged with a4-footer to prevent print-hiding */}
        <footer className="a4-footer flex h-[100px] shrink-0 items-center justify-between border-t border-black/5 px-24">
          <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#1a1a1a]/50">
            SYSBILT.COM
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#1a1a1a]/50">
            Page {pageIndex} of {totalPages}
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

/* Print Styles for Save as PDF */
@media print {
  @page {
    margin: 0 !important;
    /* Delete the "size: A4 portrait;" line here */
  }
...

  html, body, #root {
    background-color: #FFF2EC !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* BULLETPROOF FIX: Hide EVERY header/footer on the whole website, 
    EXCEPT the ones inside the A4 pages (which we explicitly tagged).
  */
  header:not(.a4-header), 
  footer:not(.a4-footer), 
  nav, 
  [class*="fixed"], 
  .print\\:hidden {
    display: none !important;
  }

  /* Reset main guide container */
  .guide-root {
    padding: 0 !important;
    background-color: #FFF2EC !important;
  }

  .guide-page-stack {
    display: block !important;
    gap: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
    width: 100% !important;
  }

  /* THE FIX: Lock exact pixel dimensions and hide overflow.
    This stops the browser from calculating a sub-pixel overflow 
    that triggers an invisible blank page before the page-break.
  */
  .print-page {
    width: 794px !important;
    height: 1123px !important;
    max-height: 1123px !important;
    overflow: hidden !important; 
    margin: 0 auto !important;
    border: none !important;
    page-break-after: always !important;
    page-break-inside: avoid !important;
    break-after: page !important;
    break-inside: avoid !important;
  }

  /* Remove ALL shadows during print to fix weird shape glitches */
  .print-page, .print-page * {
    box-shadow: none !important;
  }

  /* Ensure the absolute final page (the CTA) doesn't force an empty trailing page */
  .guide-page-stack > .print-page:last-child {
    page-break-after: auto !important;
    break-after: auto !important;
  }

  .noise-layer {
    display: none !important;
  }
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

  // Clean up the Sanity Pillar text automatically (removes "Pillar X: ")
  const cleanPillarName = guideData?.servicePillar
    ? guideData.servicePillar.replace(/^Pillar\s*\d+:\s*/i, '').trim()
    : null

  const includeCtaPage = guideData?.includeCtaPage !== false
  // Total = cover (1) + content pages + optional CTA page
  const totalPages = 1 + pages.length + (includeCtaPage ? 1 : 0)

  const pageNodes = useMemo(() => {
    const contentPages = pages.map((page, idx) => {
      const blocks = page.content ?? []
      // idx + 2 because Cover Page is Page 1
      return (
        <React.Fragment key={page._key ?? idx}>
          <PageContainer pageIndex={idx + 2} totalPages={totalPages} servicePillar={cleanPillarName}>
            {renderGuideBlocks(blocks)}
          </PageContainer>
        </React.Fragment>
      )
    })

    const ctaHref = (guideData?.ctaLink?.trim() || '/contact')
    const ctaLinkClass =
      'shadow-neu bg-[#FFF2EC] text-[#1a1a1a] font-mono text-[12px] font-bold uppercase tracking-[0.2em] px-12 py-5 rounded-full border border-white/50 hover:shadow-neu-inner hover:text-[#9A1730] transition-all duration-300 print:hidden mb-16'
    const ctaTitleText = guideData?.ctaTitle?.trim() || DEFAULT_CTA_TITLE
    const ctaBodyText = guideData?.ctaDescription?.trim() || DEFAULT_CTA_DESCRIPTION
    const ctaButtonLabel = guideData?.ctaButtonText?.trim() || DEFAULT_CTA_BUTTON
    const useNativeAnchor = /^(https?:|mailto:|tel:)/i.test(ctaHref)

    const ctaEndPage =
      guideData && includeCtaPage ? (
        <PageContainer pageIndex={totalPages} totalPages={totalPages} servicePillar={cleanPillarName}>
          <div className="flex flex-1 flex-col items-center justify-center text-center max-w-2xl mx-auto py-12 px-8">
            <div className="w-28 h-28 rounded-full shadow-neu flex items-center justify-center bg-[#FFF2EC] mb-12 border border-white/40">
              <div className="w-20 h-20 rounded-full shadow-neu-inner flex items-center justify-center bg-[#FFF8F5]">
                <svg className="w-10 h-10 text-[#8B6914] opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <h2 className="font-serif text-[46px] leading-[1.05] tracking-tighter text-[#1a1a1a] mb-8">{ctaTitleText}</h2>
            <p className="font-sans text-[18px] font-light leading-relaxed text-[#1a1a1a]/70 mb-14 max-w-xl mx-auto">{ctaBodyText}</p>
            {useNativeAnchor ? (
              <a href={ctaHref} className={ctaLinkClass}>
                {ctaButtonLabel}
              </a>
            ) : (
              <Link to={ctaHref} className={ctaLinkClass}>
                {ctaButtonLabel}
              </Link>
            )}

            <div className="mt-auto border-t border-black/5 pt-10">
              <p className="font-sans text-[14px] leading-relaxed text-[#1a1a1a]/50 max-w-lg mx-auto italic">
                {guideData.ctaLegend?.trim() || DEFAULT_CTA_LEGEND}
              </p>
            </div>
          </div>
        </PageContainer>
      ) : null

    return (
      <>
        {guideData && <CoverPage guideData={guideData} />}
        {contentPages}
        {ctaEndPage}
      </>
    )
  }, [pages, totalPages, guideData, cleanPillarName, includeCtaPage])

  const metaTitle = guideData?.seoTitle?.trim() || (guideData?.title ? `${guideData.title} | SYSBILT` : 'Guide | SYSBILT')
  const metaDescription =
    guideData?.seoDescription?.trim() || guideData?.subtitle?.trim() || 'SYSBILT system guides for growing Australian businesses.'
  const canonical = slug ? `${SITE_ORIGIN}/guides/${slug}` : undefined

  if (loading) {
    return (
      <div className="guide-root flex min-h-screen items-center justify-center bg-[#FFF2EC] px-4 py-20">
        <style>{GUIDE_STYLES}</style>
        <p className="font-mono text-sm uppercase tracking-widest text-[#1a1a1a]/50">Loading guide…</p>
      </div>
    )
  }

  if (notFound || !guideData) {
    return (
      <div className="guide-root flex min-h-screen flex-col items-center justify-center gap-6 bg-[#FFF2EC] px-4 py-20 text-center">
        <style>{GUIDE_STYLES}</style>
        <PageMeta title="Guide not found | SYSBILT" description="This guide does not exist or is unpublished." robots="noindex, follow" />
        <h1 className="font-serif text-2xl text-[#1a1a1a]">Guide not found</h1>
        <p className="max-w-md text-[#1a1a1a]/70">The guide you’re looking for isn’t available. It may have been moved or not published yet.</p>
        <Link to="/guides" className="font-mono text-sm uppercase tracking-widest text-[#9A1730] underline underline-offset-4 hover:text-[#E21E3F]">
          Back to guides
        </Link>
      </div>
    )
  }

  return (
    <div className="guide-root min-h-screen bg-[#FFF2EC] pt-[140px] pb-24 text-[#1a1a1a]">
      <style>{GUIDE_STYLES}</style>
      <PageMeta title={metaTitle} description={metaDescription} canonical={canonical} />
      
      {/* Targeted centered stack container for on-screen/print differentiation. */}
      <div className="guide-page-stack mx-auto flex max-w-[840px] flex-col items-center gap-16 px-4">
        {pageNodes}
      </div>
    </div>
  )
}
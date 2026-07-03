import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { BtwBlock, BtwPage } from '../types'
import {
  assertGuideBlockIntegrity,
  assertPackedBlockIntegrity,
  flattenSegments,
  isLonelyHeading,
  measureBlockStrides,
  packByHeights,
  packedFlowToPages,
  pageBudgetFromMetrics,
  peelLonelyTitlesFromPages,
  segmentContentPages,
  type BtwSegment,
} from '../paginate'
import { BtwFlowList } from './BtwBlocks'
import { BtwPageShell } from './BtwPageShell'

/** Small safety gap (px) kept clear at the foot of every page. */
const PAGE_SAFETY = 6

/** True A4 reading-page width (matches max-w-[794px] on the rendered page). */
const PAGE_WIDTH = 794

type Metrics = { width: number; height: number }

/**
 * Stage 1 — render one real page shell off-screen and read the exact usable width and
 * height of its content column. This auto-adapts to whatever the responsive padding,
 * running head and folio actually resolve to in this viewport, so the budget is real.
 */
function ShellMeasurer({ onReady }: { onReady: (m: Metrics) => void }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const onReadyRef = useRef(onReady)
  onReadyRef.current = onReady

  useLayoutEffect(() => {
    const run = () => {
      const main = wrapRef.current?.querySelector('.btw-page-main') as HTMLElement | null
      if (!main) return
      onReadyRef.current({ width: main.clientWidth, height: main.clientHeight })
    }
    if (document.fonts?.ready) document.fonts.ready.then(run)
    else run()
  }, [])

  return (
    <div
      ref={wrapRef}
      className="btw-measure-a4 pointer-events-none fixed left-[-10000px] top-0 opacity-0"
      style={{ width: PAGE_WIDTH }}
      aria-hidden
    >
      <BtwPageShell pageIndex={0} layout="flow" blocks={[]} runningHeadRight="/ Ch.00 · Measuring" />
    </div>
  )
}

/**
 * Stage 2 — render every flow segment continuously at the real content width, read each
 * block's true top/bottom, then pack into pages from those positions.
 */
function ContentMeasurer({
  segments,
  metrics,
  onMeasured,
}: {
  segments: BtwSegment[]
  metrics: Metrics
  onMeasured: (pages: BtwPage[]) => void
}) {
  const flowSegments = useMemo(
    () =>
      segments
        .map((s, i) => (s.kind === 'flow' ? { index: i, blocks: s.blocks } : null))
        .filter(Boolean) as { index: number; blocks: BtwBlock[] }[],
    [segments],
  )

  const containerRefs = useRef<(HTMLDivElement | null)[]>([])
  const onMeasuredRef = useRef(onMeasured)
  onMeasuredRef.current = onMeasured

  useLayoutEffect(() => {
    const run = () => {
      const budget = pageBudgetFromMetrics(metrics, PAGE_SAFETY)
      const packedByFlowIndex = new Map<number, BtwPage[]>()

      flowSegments.forEach((seg, si) => {
        const container = containerRefs.current[si]
        if (!container) {
          packedByFlowIndex.set(si, [{ layout: 'flow', blocks: seg.blocks }])
          return
        }
        const el = container as HTMLDivElement
        const children = Array.from(
          el.querySelectorAll('[data-btw-i]'),
        ) as HTMLElement[]
        const heights = measureBlockStrides(children)
        const packed = packByHeights(seg.blocks, heights, budget)
        assertPackedBlockIntegrity(seg.blocks, packed)
        packedByFlowIndex.set(si, packedFlowToPages(packed))
      })

      const flattened = flattenSegments(segments, packedByFlowIndex)
      onMeasuredRef.current(peelLonelyTitlesFromPages(flattened))
    }

    if (document.fonts?.ready) document.fonts.ready.then(run)
    else run()
  }, [flowSegments, metrics, segments])

  return (
    <div className="btw-measure-a4 pointer-events-none fixed left-[-10000px] top-0 opacity-0" aria-hidden>
      {flowSegments.map((seg, si) => (
        <div
          key={si}
          ref={(el) => {
            containerRefs.current[si] = el
          }}
          className="btw-root"
          style={{ width: metrics.width }}
        >
          <BtwFlowList blocks={seg.blocks} />
        </div>
      ))}
    </div>
  )
}

const MAX_OVERFLOW_PASSES = 16

/**
 * Stage 3 — render each packed page inside a real shell and move trailing blocks
 * down when scrollHeight exceeds the main column (catches measure vs paint drift).
 */
function PageOverflowFixer({
  pages,
  rawPages,
  onReady,
}: {
  pages: BtwPage[]
  rawPages: BtwPage[]
  onReady: (pages: BtwPage[]) => void
}) {
  const [workPages, setWorkPages] = useState(pages)
  const shellRefs = useRef<(HTMLDivElement | null)[]>([])
  const onReadyRef = useRef(onReady)
  onReadyRef.current = onReady
  const passRef = useRef(0)

  useLayoutEffect(() => {
    passRef.current += 1
    if (passRef.current > MAX_OVERFLOW_PASSES) {
      const final = peelLonelyTitlesFromPages(workPages)
      assertGuideBlockIntegrity(rawPages, final)
      onReadyRef.current(final)
      return
    }

    let changed = false
    const next = workPages.map((p) => ({ ...p, blocks: [...p.blocks] }))

    for (let i = 0; i < next.length; i++) {
      const pg = next[i]
      if (pg.layout !== 'flow' || pg.blocks.length <= 1) continue

      const shell = shellRefs.current[i]
      const main = shell?.querySelector('.btw-page-main') as HTMLElement | null
      const flow = main?.querySelector('.btw-flow') as HTMLElement | null
      if (!main || !flow) continue

      while (pg.blocks.length > 1 && flow.scrollHeight > main.clientHeight + 2) {
        changed = true
        const moved: BtwBlock[] = []
        while (
          pg.blocks.length > 0 &&
          (pg.blocks.length === 1 || flow.scrollHeight > main.clientHeight + 2)
        ) {
          moved.unshift(pg.blocks.pop()!)
          if (pg.blocks.length <= 1) break
          // Re-measure after pop — DOM still shows old content until next frame,
          // so peel one block at a time per outer iteration.
          break
        }

        let j = i + 1
        while (j < next.length && (next[j].layout === 'opener' || next[j].layout === 'contents')) {
          j++
        }
        if (j >= next.length) {
          next.push({ layout: 'flow', blocks: moved })
        } else {
          next[j] = { ...next[j], blocks: [...moved, ...next[j].blocks] }
        }

        // Lonely headings must not stay alone at page foot.
        while (
          pg.blocks.length > 0 &&
          isLonelyHeading(pg.blocks[pg.blocks.length - 1])
        ) {
          const h = pg.blocks.pop()!
          if (j >= next.length) {
            next.push({ layout: 'flow', blocks: [h] })
            j = next.length - 1
          } else {
            next[j] = { ...next[j], blocks: [h, ...next[j].blocks] }
          }
        }
      }
    }

    if (changed) {
      setWorkPages(peelLonelyTitlesFromPages(next))
      return
    }

    const final = peelLonelyTitlesFromPages(workPages)
    assertGuideBlockIntegrity(rawPages, final)
    onReadyRef.current(final)
  }, [workPages, rawPages])

  return (
    <div className="pointer-events-none fixed left-[-10000px] top-0 opacity-0" aria-hidden>
      {workPages.map((pg, idx) => (
        <div
          key={idx}
          ref={(el) => {
            shellRefs.current[idx] = el
          }}
          className="btw-measure-a4"
          style={{ width: PAGE_WIDTH }}
        >
          <BtwPageShell
            pageIndex={idx + 2}
            layout={pg.layout ?? 'flow'}
            blocks={pg.blocks}
            runningHeadRight={deriveRunningHead(workPages, idx)}
          />
        </div>
      ))}
    </div>
  )
}

function deriveRunningHead(pages: BtwPage[], idx: number): string | undefined {
  const pg = pages[idx]
  if (pg.layout === 'contents' || pg.layout === 'opener') return undefined

  let chapter: { num: number; title: string } | null = null
  for (let i = 0; i <= idx; i++) {
    const opener = pages[i].blocks.find((b) => b.type === 'chapterOpener')
    if (opener && opener.type === 'chapterOpener') {
      chapter = { num: opener.num, title: opener.title }
    }
  }

  if (!chapter) return undefined
  const num = String(chapter.num).padStart(2, '0')
  return `/ Ch.${num} · ${chapter.title}`
}

function enrichContents(pages: BtwPage[]): BtwPage[] {
  const chapterStartPages: Record<number, number> = {}
  let pageNum = 2

  pages.forEach((pg) => {
    if (pg.layout === 'opener') {
      const opener = pg.blocks.find((b) => b.type === 'chapterOpener')
      if (opener && opener.type === 'chapterOpener') {
        chapterStartPages[opener.num] = pageNum
      }
    }
    pageNum++
  })

  return pages.map((pg) => ({
    ...pg,
    blocks: pg.blocks.map((b) =>
      b.type === 'contents'
        ? {
            ...b,
            items: b.items.map((item) => ({ ...item, page: chapterStartPages[item.num] })),
          }
        : b,
    ),
  }))
}

export function BtwMeasuredGuide({ rawPages }: { rawPages: BtwPage[] }) {
  const segments = useMemo(() => segmentContentPages(rawPages), [rawPages])
  const hasFlow = segments.some((s) => s.kind === 'flow')

  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [packedPages, setPackedPages] = useState<BtwPage[] | null>(null)
  const [pages, setPages] = useState<BtwPage[] | null>(
    hasFlow ? null : peelLonelyTitlesFromPages(flattenSegments(segments, new Map())),
  )

  const enriched = useMemo(() => (pages ? enrichContents(pages) : null), [pages])

  if (!enriched) {
    if (!metrics) return <ShellMeasurer onReady={setMetrics} />
    if (!packedPages) {
      return (
        <ContentMeasurer
          segments={segments}
          metrics={metrics}
          onMeasured={setPackedPages}
        />
      )
    }
    return <PageOverflowFixer pages={packedPages} rawPages={rawPages} onReady={setPages} />
  }

  return (
    <>
      {enriched.map((pg, idx) => (
        <BtwPageShell
          key={idx}
          pageIndex={idx + 2}
          layout={pg.layout ?? 'flow'}
          blocks={pg.blocks}
          runningHeadRight={deriveRunningHead(enriched, idx)}
        />
      ))}
    </>
  )
}

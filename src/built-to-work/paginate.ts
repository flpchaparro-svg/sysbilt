import type { BtwBlock, BtwPage } from './types'

export type BtwSegment =
  | { kind: 'fixed'; page: BtwPage }
  | { kind: 'flow'; blocks: BtwBlock[] }

const LONELY_HEADING_TYPES = new Set(['h2', 'h3', 'sectionEyebrow', 'glossaryIntro'])

export function isLonelyHeading(block: BtwBlock): boolean {
  // Every heading (including "In short" closings) must stay with the body that follows.
  return LONELY_HEADING_TYPES.has(block.type)
}

/** Measure each block's vertical stride in a flex column (includes real margins). */
export function measureBlockStrides(children: HTMLElement[]): number[] {
  if (!children.length) return []

  const rects = children.map((child) => child.getBoundingClientRect())
  const heights: number[] = []

  for (let i = 0; i < rects.length; i++) {
    if (i === 0) {
      heights.push(rects[i].height)
    } else {
      heights.push(Math.max(0, rects[i].bottom - rects[i - 1].bottom))
    }
  }

  return heights
}

export function segmentContentPages(pages: BtwPage[]): BtwSegment[] {
  const segments: BtwSegment[] = []
  let flowBuffer: BtwBlock[] = []

  const flush = () => {
    if (flowBuffer.length) {
      segments.push({ kind: 'flow', blocks: flowBuffer })
      flowBuffer = []
    }
  }

  for (const page of pages) {
    const isFlow = page.layout === 'flow' || (!page.layout && page.blocks.length > 0)
    if (isFlow) {
      flowBuffer.push(...page.blocks)
    } else {
      flush()
      segments.push({ kind: 'fixed', page })
    }
  }

  flush()
  return segments
}

/**
 * Pack a single flow segment into pages using REAL measured positions.
 *
 * `tops[i]` / `bottoms[i]` are each block's rendered top/bottom offset (px) within one
 * continuous render of the whole segment. We start each page at the top of its first
 * block and break before any block whose bottom would exceed the page budget measured
 * from that start. Blocks are atomic (never split). Headings are never left orphaned at
 * the foot of a page — they move down with the content that follows them.
 */
/** Margin stripped from the first block on each rendered page (see styles.ts). */
function firstBlockMarginCredit(block: BtwBlock): number {
  if (block.type === 'h2') {
    if (block.divider) return 56
    if (block.closing) return 50
    return 50
  }
  if (block.type === 'h3') return 40
  // pullQuote figure top margin is stripped on first block of each page (styles.ts).
  if (block.type === 'pullQuote') return 52
  return 0
}

function effectiveHeight(
  block: BtwBlock,
  measured: number,
  firstOnPage: boolean,
  prevBlock?: BtwBlock,
): number {
  let h = measured
  if (firstOnPage) h = Math.max(0, h - firstBlockMarginCredit(block))
  // Consecutive feature cards collapse top margin (see styles.ts).
  if (block.type === 'featureCard' && prevBlock?.type === 'featureCard') {
    h = Math.max(0, h - 24)
  }
  return h
}

/** Room at the foot so md:overflow-hidden never clips the last line. */
const PACK_HEADROOM = 36

function pageLimit(budget: number): number {
  return budget - PACK_HEADROOM
}

/** Tighten must never exceed the pack limit — slack was clipping blocks at page foot. */
function tightenLimit(budget: number): number {
  return pageLimit(budget)
}

function pageUsed(indices: number[], blocks: BtwBlock[], heights: number[]): number {
  return indices.reduce((sum, idx, pos) => {
    const prev = pos > 0 ? blocks[indices[pos - 1]] : undefined
    return (
      sum +
      effectiveHeight(blocks[idx], heights[idx] ?? 0, pos === 0, prev)
    )
  }, 0)
}

/** Pull blocks from the next page onto the current one while they still fit. */
function tightenIndexPages(
  blocks: BtwBlock[],
  heights: number[],
  budget: number,
  pages: number[][],
): number[][] {
  if (pages.length < 2) return pages

  const result = pages.map((p) => [...p])

  for (let pi = 0; pi < result.length - 1; ) {
    if (!result[pi + 1].length) {
      result.splice(pi + 1, 1)
      continue
    }

    const nextIdx = result[pi + 1][0]

    // Pull consecutive feature cards as a group onto a sparse previous page.
    if (blocks[nextIdx].type === 'featureCard') {
      let pullEnd = 1
      while (
        pullEnd < result[pi + 1].length &&
        blocks[result[pi + 1][pullEnd]].type === 'featureCard'
      ) {
        pullEnd++
      }
      const group = result[pi + 1].slice(0, pullEnd)
      const trial = [...result[pi], ...group]
      if (pageUsed(trial, blocks, heights) <= tightenLimit(budget)) {
        result[pi].push(...result[pi + 1].splice(0, pullEnd))
        if (!result[pi + 1].length) result.splice(pi + 1, 1)
        continue
      }
    }

    // Never pull a lone heading onto the previous page.
    if (isLonelyHeading(blocks[nextIdx])) {
      // OK to pull a title plus its body when the whole group still fits.
      if (result[pi + 1].length >= 2) {
        let pullEnd = 1
        while (
          pullEnd < result[pi + 1].length &&
          !isLonelyHeading(blocks[result[pi + 1][pullEnd]])
        ) {
          pullEnd++
        }
        const group = result[pi + 1].slice(0, pullEnd)
        const trial = [...result[pi], ...group]
        if (pageUsed(trial, blocks, heights) <= tightenLimit(budget)) {
          result[pi].push(...result[pi + 1].splice(0, pullEnd))
          if (!result[pi + 1].length) result.splice(pi + 1, 1)
          continue
        }
      }
      pi++
      continue
    }

    const trial = [...result[pi], result[pi + 1][0]]
    if (pageUsed(trial, blocks, heights) <= tightenLimit(budget)) {
      result[pi].push(result[pi + 1].shift()!)
      if (!result[pi + 1].length) result.splice(pi + 1, 1)
      continue
    }

    pi++
  }

  return result.filter((p) => p.length > 0)
}

/** Move any trailing lonely heading onto the following page (safety net after packing). */
function peelTrailingLonelyHeadings(
  blocks: BtwBlock[],
  pages: number[][],
): number[][] {
  const result = pages.map((p) => [...p])

  for (let pi = 0; pi < result.length - 1; pi++) {
    while (
      result[pi].length > 0 &&
      isLonelyHeading(blocks[result[pi][result[pi].length - 1]])
    ) {
      const idx = result[pi].pop()!
      result[pi + 1].unshift(idx)
    }
  }

  return result.filter((p) => p.length > 0)
}

/**
 * After segments are flattened into a page list, peel any page that ends on a
 * hierarchy title so the title opens the next page instead of sitting alone.
 */
/** Fallback when shell measure fails — A4 main column at 794px width. */
export const BTW_A4_MAIN_FALLBACK = 880

export function pageBudgetFromMetrics(metrics: { height: number }, safety = 6): number {
  const h = metrics.height > 100 ? metrics.height : BTW_A4_MAIN_FALLBACK
  return Math.max(120, h - safety)
}

function firstFlowPageAfter(result: BtwPage[], from: number): number {
  for (let j = from + 1; j < result.length; j++) {
    const layout = result[j].layout
    if (layout !== 'opener' && layout !== 'contents') return j
  }
  return -1
}

export function peelLonelyTitlesFromPages(pages: BtwPage[]): BtwPage[] {
  if (pages.length < 2) return pages

  let current = pages
  for (;;) {
    const result = current.map((p) => ({ ...p, blocks: [...p.blocks] }))
    let changed = false

    for (let pi = 0; pi < result.length - 1; pi++) {
      const pg = result[pi]
      if (!pg.blocks.length || pg.layout === 'opener' || pg.layout === 'contents') continue

      while (pg.blocks.length > 0 && isLonelyHeading(pg.blocks[pg.blocks.length - 1])) {
        const moved = pg.blocks.pop()!
        const next = result[pi + 1]
        if (next.layout === 'opener' || next.layout === 'contents') {
          const target = firstFlowPageAfter(result, pi)
          if (target < 0) {
            pg.blocks.push(moved)
            break
          }
          result[target] = { ...result[target], blocks: [moved, ...result[target].blocks] }
        } else {
          result[pi + 1] = { ...next, blocks: [moved, ...next.blocks] }
        }
        changed = true
      }
    }

    if (!changed) return current
    current = result
  }
}

/** Split any page whose measured height exceeds the budget (e.g. after tighten). */
function enforcePageLimits(
  blocks: BtwBlock[],
  heights: number[],
  budget: number,
  pages: number[][],
): number[][] {
  const limit = pageLimit(budget)
  const result = pages.map((p) => [...p])

  for (let pi = 0; pi < result.length; pi++) {
    while (result[pi].length > 1 && pageUsed(result[pi], blocks, heights) > limit) {
      const moved = result[pi].pop()!
      if (!result[pi + 1]) result.push([])
      result[pi + 1].unshift(moved)
    }
  }

  return result.filter((p) => p.length > 0)
}

/**
 * Pack blocks using per-block measured heights. More reliable than span-from-page-top
 * because the first block on each rendered page loses its top margin (CSS reset).
 */
export function packByHeights(
  blocks: BtwBlock[],
  heights: number[],
  budget: number,
): BtwBlock[][] {
  if (!blocks.length) return []

  const limit = pageLimit(budget)
  const pages: number[][] = []
  let current: number[] = []
  let used = 0

  const syncUsed = () => {
    used = pageUsed(current, blocks, heights)
  }

  const peelLonelyTail = (): number[] => {
    const peeled: number[] = []
    while (current.length > 1 && isLonelyHeading(blocks[current[current.length - 1]])) {
      peeled.unshift(current.pop()!)
    }
    if (peeled.length) syncUsed()
    return peeled
  }

  const flush = (carry: number[] = []) => {
    if (current.length) pages.push([...current])
    current = carry
    syncUsed()
  }

  for (let i = 0; i < blocks.length; i++) {
    const firstOnPage = current.length === 0
    const h = effectiveHeight(
      blocks[i],
      heights[i] ?? 0,
      firstOnPage,
      current.length > 0 ? blocks[current[current.length - 1]] : undefined,
    )
    const nextH = i + 1 < blocks.length ? (heights[i + 1] ?? 0) : 0

    // Hierarchy title must never be the last thing on a page — keep it with body below.
    if (current.length > 0 && isLonelyHeading(blocks[i]) && nextH > 0) {
      const hOnPage = effectiveHeight(blocks[i], heights[i] ?? 0, false, blocks[current[current.length - 1]])
      if (used + hOnPage + nextH > limit) {
        flush(peelLonelyTail())
      }
    }

    if (current.length > 0 && used + h > limit) {
      flush(peelLonelyTail())
    }

    const prevBlock = current.length > 0 ? blocks[current[current.length - 1]] : undefined
    const hNow = effectiveHeight(blocks[i], heights[i] ?? 0, current.length === 0, prevBlock)
    current.push(i)
    used += hNow
  }

  flush(peelLonelyTail())
  if (current.length) pages.push([...current])

  let packed = peelTrailingLonelyHeadings(blocks, pages)
  packed = enforcePageLimits(blocks, heights, budget, packed)
  packed = peelTrailingLonelyHeadings(blocks, packed)

  for (let pass = 0; pass < 12; pass++) {
    const tightened = tightenIndexPages(blocks, heights, budget, packed)
    if (tightened.length === packed.length && tightened.every((p, i) =>
      p.length === packed[i].length && p.every((idx, j) => idx === packed[i][j]),
    )) {
      break
    }
    packed = tightened
    packed = peelTrailingLonelyHeadings(blocks, packed)
  }

  packed = enforcePageLimits(blocks, heights, budget, packed)
  packed = peelTrailingLonelyHeadings(blocks, packed)

  return packed.map((indices) => indices.map((idx) => blocks[idx]))
}

/** Ensure every source block appears once, in order, across packed pages. */
export function assertPackedBlockIntegrity(
  source: BtwBlock[],
  packed: BtwBlock[][],
): void {
  const flat = packed.flat()
  if (flat.length !== source.length) {
    console.error(
      `[btw] pagination lost blocks: expected ${source.length}, got ${flat.length}`,
    )
    return
  }
  for (let i = 0; i < source.length; i++) {
    if (flat[i] !== source[i]) {
      console.error(`[btw] pagination block order mismatch at index ${i}`)
      return
    }
  }
}

/** After flattening fixed + flow pages, verify no block was dropped or reordered. */
export function assertGuideBlockIntegrity(source: BtwPage[], packed: BtwPage[]): void {
  const src = source.flatMap((p) => p.blocks)
  const out = packed.flatMap((p) => p.blocks)
  if (out.length !== src.length) {
    console.error(
      `[btw] guide lost blocks: expected ${src.length}, got ${out.length}`,
    )
    return
  }
  for (let i = 0; i < src.length; i++) {
    if (out[i] !== src[i]) {
      console.error(`[btw] guide block order mismatch at index ${i}`)
      return
    }
  }
}

/**
 * @deprecated Use packByHeights — kept for reference.
 */
export function packByPositions(
  blocks: BtwBlock[],
  tops: number[],
  bottoms: number[],
  budget: number,
): BtwBlock[][] {
  if (!blocks.length) return []

  const pages: number[][] = []
  let current: number[] = []
  let pageTop = 0

  const flushHeadingSafe = (nextIndex: number) => {
    // Move any trailing heading(s) on the current page down to the next page,
    // unless they are the only thing there (can't avoid it).
    const moved: number[] = []
    while (current.length > 1 && isLonelyHeading(blocks[current[current.length - 1]])) {
      moved.unshift(current.pop() as number)
    }
    if (current.length) pages.push(current)
    current = moved
    pageTop = moved.length ? tops[moved[0]] : tops[nextIndex]
  }

  for (let i = 0; i < blocks.length; i++) {
    if (current.length === 0) {
      pageTop = tops[i]
      current.push(i)
      continue
    }

    const wouldOverflow = bottoms[i] - pageTop > budget
    if (wouldOverflow) {
      flushHeadingSafe(i)
      // If the moved headings already overflow with this block, start fresh.
      if (current.length && bottoms[i] - pageTop > budget) {
        pages.push(current)
        current = []
        pageTop = tops[i]
      }
    }

    current.push(i)
  }

  if (current.length) pages.push(current)

  return pages
    .filter((p) => p.length > 0)
    .map((indices) => indices.map((idx) => blocks[idx]))
}

export function packedFlowToPages(blockPages: BtwBlock[][]): BtwPage[] {
  return blockPages.map((blocks) => ({ layout: 'flow' as const, blocks }))
}

/** Flatten segments + packed flow pages into a single page list. */
export function flattenSegments(
  segments: BtwSegment[],
  packedByFlowIndex: Map<number, BtwPage[]>,
): BtwPage[] {
  const result: BtwPage[] = []
  let flowIdx = 0

  for (const seg of segments) {
    if (seg.kind === 'fixed') {
      result.push(seg.page)
    } else {
      const packed = packedByFlowIndex.get(flowIdx) ?? [{ layout: 'flow', blocks: seg.blocks }]
      result.push(...packed)
      flowIdx++
    }
  }

  return result
}

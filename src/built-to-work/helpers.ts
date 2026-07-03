import type { BtwBlock, BtwPage } from './types'

export function p(...texts: string[]): BtwBlock[] {
  return texts.map((text) => ({ type: 'p', text }))
}

export function flow(...blocks: BtwBlock[]): BtwPage {
  return { layout: 'flow', blocks }
}

export function contents(...blocks: BtwBlock[]): BtwPage {
  return { layout: 'contents', blocks }
}

export function opener(...blocks: BtwBlock[]): BtwPage {
  return { layout: 'opener', blocks }
}

/** Gold kicker + Lora heading. Kicker must differ from title (see eyebrow reference). */
export function section(label: string, title: string, ...blocks: BtwBlock[]): BtwBlock[] {
  return [{ type: 'h2', label, text: title }, ...blocks]
}

/** Part one / Part two divider with kicker + heading. */
export function divider(label: string, title: string, ...blocks: BtwBlock[]): BtwBlock[] {
  return [{ type: 'h2', label, text: title, divider: true }, ...blocks]
}

/** Sub-section within a chapter (e.g. ch2 topics). */
export function subsection(label: string, title: string, ...blocks: BtwBlock[]): BtwBlock[] {
  return [{ type: 'h3', label, text: title }, ...blocks]
}

/** Closing note — no kicker. */
export function closing(title: string, ...blocks: BtwBlock[]): BtwBlock[] {
  return [{ type: 'h2', text: title, closing: true }, ...blocks]
}

/**
 * "The real picture" box — expands into a lead paragraph (optional) plus one dark box
 * block per paragraph, so a long box flows cleanly across pages instead of overflowing.
 */
export function realPicture(opts: {
  leadIn?: string
  title?: string
  paragraphs: string[]
}): BtwBlock[] {
  const { leadIn, title, paragraphs } = opts
  const blocks: BtwBlock[] = []
  if (leadIn) blocks.push({ type: 'realPictureLead', text: leadIn })
  paragraphs.forEach((text, i) => {
    blocks.push({
      type: 'realPictureBox',
      text,
      title: i === 0 ? title : undefined,
      first: i === 0,
      last: i === paragraphs.length - 1,
    })
  })
  return blocks
}

/** Expand a glossary into an intro block + one block per entry so it flows across pages. */
export function glossary(
  intro: { title?: string; intro?: string },
  entries: { term: string; definition: string }[],
): BtwBlock[] {
  return [
    { type: 'glossaryIntro', title: intro.title, intro: intro.intro },
    ...entries.map((e): BtwBlock => ({ type: 'glossaryEntry', term: e.term, definition: e.definition })),
  ]
}

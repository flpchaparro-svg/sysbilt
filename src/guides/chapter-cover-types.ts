/** Chapter opener cover — landscape for web, portrait for A4 print. */
export type GuideChapterCover = {
  webSrc: string
  printSrc: string
  alt: string
}

/** SVG or single-ratio placeholder: same file on web and print. */
export function singleCover(src: string, alt: string): GuideChapterCover {
  return { webSrc: src, printSrc: src, alt }
}

export function chapterCoverWebSrc(cover: GuideChapterCover): string {
  return cover.webSrc
}

export function chapterCoverPrintSrc(cover: GuideChapterCover): string {
  return cover.printSrc
}

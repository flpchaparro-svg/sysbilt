import { BTW_TOKEN_CSS } from './tokens'

export const BTW_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap');

${BTW_TOKEN_CSS}

.btw-root {
  font-family: var(--font-sans);
  color: var(--btw-ink);
}

.btw-prose {
  max-width: var(--btw-prose);
}

.btw-root .font-serif {
  font-family: Lora, Georgia, 'Times New Roman', serif;
}

.btw-root a,
.btw-root a:visited {
  color: inherit;
}

/* Lifts every A4 sheet off the ink background — same halo on cream and dark pages. */
.btw-sheet {
  box-shadow:
    0 0 0 1px rgba(255, 242, 236, 0.22),
    0 0 36px 8px rgba(255, 242, 236, 0.12),
    0 0 88px 22px rgba(255, 242, 236, 0.06),
    0 32px 72px -28px rgba(0, 0, 0, 0.62),
    0 10px 28px -14px rgba(0, 0, 0, 0.38);
}

.btw-flow > .btw-block {
  flex-shrink: 0;
}

.btw-flow > .btw-block-feature + .btw-block-feature > .btw-feature-card {
  margin-top: 0;
}

/* Off-screen measurer always uses desktop A4 dimensions, not mobile h-auto. */
.btw-measure-a4 .btw-print-page {
  height: 1123px !important;
  min-height: 1123px !important;
  max-height: 1123px !important;
  overflow: hidden !important;
}

/* Each paginated page begins flush at the top: the first block never carries the
   large section gap that separates it from the block above on the source stream. */
.btw-page-main > .btw-flow > .btw-block:first-child > * {
  margin-top: 0 !important;
}
.btw-page-main > .btw-flow > .btw-block:first-child .btw-section,
.btw-page-main > .btw-flow > .btw-block:first-child .btw-subsection,
.btw-page-main > .btw-flow > .btw-block:first-child .btw-divider {
  margin-top: 0 !important;
  padding-top: 0 !important;
  border-top: none !important;
}

.btw-article-body > .btw-flow > .btw-block:first-child > * {
  margin-top: 0 !important;
}
.btw-article-body > .btw-flow > .btw-block:first-child .btw-section,
.btw-article-body > .btw-flow > .btw-block:first-child .btw-subsection,
.btw-article-body > .btw-flow > .btw-block:first-child .btw-divider {
  margin-top: 0 !important;
  padding-top: 0 !important;
  border-top: none !important;
}

@media print {
  @page {
    margin: 0 !important;
    size: A4 portrait;
  }

  html, body, #root {
    background-color: #fff2ec !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    margin: 0 !important;
    padding: 0 !important;
    height: auto !important;
    overflow: visible !important;
  }

  header:not(.btw-running-head),
  footer:not(.btw-folio),
  nav,
  .help-dock,
  .print\\:hidden {
    display: none !important;
  }

  .btw-root {
    padding: 0 !important;
    padding-top: 0 !important;
    background-color: #fff2ec !important;
    min-height: 0 !important;
  }

  .btw-page-cream {
    background-color: #fff2ec !important;
    color: #1a1a1a !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .btw-page-dark {
    background-color: #16130f !important;
    color: #fff2ec !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .btw-page-stack {
    display: block !important;
    gap: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
    width: 100% !important;
    max-width: none !important;
  }

  .btw-print-page {
    display: flex !important;
    width: 210mm !important;
    height: 296.5mm !important;
    max-width: 210mm !important;
    max-height: 296.5mm !important;
    min-height: 296.5mm !important;
    overflow: hidden !important;
    margin: 0 !important;
    padding: 0 !important;
    border: none !important;
    border-radius: 0 !important;
    box-sizing: border-box !important;
    page-break-after: always !important;
    page-break-inside: avoid !important;
    break-after: page !important;
    break-inside: avoid !important;
    box-shadow: none !important;
    position: relative !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .btw-print-page * {
    box-shadow: none !important;
  }

  .btw-page-stack > .btw-print-page:last-child {
    page-break-after: auto !important;
    break-after: auto !important;
  }

  * {
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale !important;
    text-rendering: optimizeLegibility !important;
  }
}
`

/** A4 sheet — cream reading page or dark special page */
export const BTW_PRINT_PAGE_CREAM =
  'btw-print-page btw-page-cream btw-sheet relative flex w-full max-w-[794px] min-h-[100svh] h-auto md:h-[1123px] md:min-h-0 md:flex-shrink-0 flex-col overflow-visible md:overflow-hidden rounded-[3px]'

export const BTW_PRINT_PAGE_DARK =
  'btw-print-page btw-page-dark btw-sheet relative flex w-full max-w-[794px] min-h-[100svh] h-auto md:h-[1123px] md:min-h-0 md:flex-shrink-0 flex-col overflow-visible md:overflow-hidden rounded-[3px]'

/** @deprecated Use BTW_PRINT_PAGE_CREAM or BTW_PRINT_PAGE_DARK */
export const BTW_PRINT_PAGE_SHELL = BTW_PRINT_PAGE_CREAM

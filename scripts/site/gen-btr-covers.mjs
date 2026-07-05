#!/usr/bin/env node
/**
 * Generate Built to Run chapter opener covers (SVG) and hub OG card.
 * Run: node scripts/site/gen-bts-covers.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')
const OUT = path.join(ROOT, 'public/images/built-to-run/chapters')
const HUB_OUT = path.join(ROOT, 'public/images/built-to-run')

const W = 1600
const H = 900
const INK = '#111111'
const CREAM = '#FFF2EC'
const GOLD = '#C5A059'
const GOLD_DIM = '#8B6914'

function wrap(svgBody) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <rect width="${W}" height="${H}" fill="${INK}"/>
  <defs>
    <linearGradient id="fadeL" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${INK}" stop-opacity="0.92"/>
      <stop offset="45%" stop-color="${INK}" stop-opacity="0.55"/>
      <stop offset="72%" stop-color="${INK}" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="${INK}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  ${svgBody}
  <rect width="${W * 0.55}" height="${H}" fill="url(#fadeL)"/>
</svg>`
}

/** @type {{ num: number; alt: string; body: string }[]} */
const CHAPTERS = [
  {
    num: 1,
    alt: 'A phone showing a product page beside a subtle machine-read icon on a dark desk.',
    body: `
  <rect x="880" y="200" width="520" height="500" rx="4" fill="none" stroke="${CREAM}" stroke-width="2" opacity="0.35"/>
  <rect x="920" y="260" width="440" height="200" fill="${CREAM}" opacity="0.08"/>
  <circle cx="1140" cy="620" r="56" fill="none" stroke="${GOLD}" stroke-width="2"/>
  <circle cx="1240" cy="620" r="28" fill="${GOLD}" opacity="0.25" stroke="${GOLD}" stroke-width="1.5"/>
  <text x="1240" y="626" text-anchor="middle" font-family="ui-monospace,monospace" font-size="14" fill="${CREAM}" font-weight="700">AI</text>
  <line x1="1040" y1="500" x2="1140" y2="564" stroke="${GOLD}" stroke-width="1.5" opacity="0.6"/>`,
  },
  {
    num: 2,
    alt: 'A brass key and padlock on a dark surface, warmly lit.',
    body: `
  <rect x="940" y="280" width="120" height="80" rx="3" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
  <path d="M1000,360 L1000,480 M960,480 L1040,480" stroke="${GOLD}" stroke-width="3" fill="none"/>
  <circle cx="1000" cy="260" r="36" fill="none" stroke="${CREAM}" stroke-width="2" opacity="0.7"/>
  <rect x="1120" y="340" width="240" height="160" rx="3" fill="none" stroke="${CREAM}" stroke-width="1.5" opacity="0.4" stroke-dasharray="6 4"/>`,
  },
  {
    num: 3,
    alt: 'A product page wireframe with image, copy lines, and a gold buy button.',
    body: `
  <rect x="900" y="180" width="280" height="540" fill="none" stroke="${CREAM}" stroke-width="2"/>
  <rect x="920" y="200" width="240" height="200" fill="${CREAM}" opacity="0.1"/>
  <rect x="920" y="430" width="180" height="12" fill="${CREAM}" opacity="0.35"/>
  <rect x="920" y="460" width="120" height="12" fill="${CREAM}" opacity="0.2"/>
  <rect x="920" y="520" width="200" height="44" fill="${GOLD}" opacity="0.85"/>`,
  },
  {
    num: 4,
    alt: 'Six small page mockups arranged in a grid on a dark background.',
    body: `
  ${[0, 1, 2, 0, 1, 2].map((col, i) => {
    const row = Math.floor(i / 3)
    const x = 920 + col * 150
    const y = 240 + row * 200
    return `<rect x="${x}" y="${y}" width="120" height="150" fill="none" stroke="${CREAM}" stroke-width="1.5" opacity="0.55"/>`
  }).join('\n  ')}`,
  },
  {
    num: 5,
    alt: 'Four feature cards in a row suggesting cart, search, and recovery tools.',
    body: `
  ${[0, 1, 2, 3].map((i) => {
    const x = 880 + i * 130
    return `<rect x="${x}" y="320" width="100" height="120" fill="${CREAM}" opacity="0.06" stroke="${i === 2 ? GOLD : CREAM}" stroke-width="${i === 2 ? 2 : 1.2}"/>`
  }).join('\n  ')}
  <path d="M900,500 L1240,500" stroke="${GOLD}" stroke-width="1.5" marker-end="url(#none)" opacity="0.5"/>`,
  },
  {
    num: 6,
    alt: 'A calm desk with notebook blocks suggesting a weekly operating rhythm.',
    body: `
  ${['MON', 'WED', 'FRI'].map((d, i) => {
    const x = 920 + i * 160
    return `<rect x="${x}" y="300" width="130" height="200" fill="none" stroke="${CREAM}" stroke-width="1.5" opacity="0.5"/>
  <text x="${x + 65}" y="340" text-anchor="middle" font-family="ui-monospace,monospace" font-size="16" fill="${GOLD_DIM}" font-weight="700">${d}</text>`
  }).join('\n  ')}`,
  },
  {
    num: 7,
    alt: 'A speed gauge and shield motif suggesting security and performance.',
    body: `
  <circle cx="1100" cy="420" r="120" fill="none" stroke="${CREAM}" stroke-width="2" opacity="0.4"/>
  <path d="M1100,420 L1180,360" stroke="${GOLD}" stroke-width="3"/>
  <path d="M1000,520 L1100,380 L1200,520 Z" fill="none" stroke="${GOLD}" stroke-width="2" opacity="0.7"/>`,
  },
  {
    num: 8,
    alt: 'A magnifier over structured data lines suggesting search and machine readability.',
    body: `
  <circle cx="1080" cy="400" r="100" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
  <line x1="1155" y1="475" x2="1220" y2="540" stroke="${GOLD}" stroke-width="4"/>
  ${[0, 1, 2, 3, 4].map((i) => `<rect x="1240" y="${280 + i * 44}" width="200" height="20" fill="${CREAM}" opacity="${0.35 - i * 0.05}"/>`).join('\n  ')}`,
  },
  {
    num: 9,
    alt: 'Gold lines radiating from a central store hub to connected systems.',
    body: `
  <rect x="1040" y="360" width="160" height="90" fill="none" stroke="${CREAM}" stroke-width="2.5"/>
  <text x="1120" y="415" text-anchor="middle" font-family="ui-monospace,monospace" font-size="14" fill="${CREAM}" font-weight="700">STORE</text>
  ${[0, 1, 2, 3, 4, 5].map((i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2
    const x2 = 1120 + Math.cos(a) * 200
    const y2 = 405 + Math.sin(a) * 160
    return `<line x1="1120" y1="405" x2="${x2}" y2="${y2}" stroke="${GOLD}" stroke-width="1.2" opacity="0.65"/>`
  }).join('\n  ')}`,
  },
  {
    num: 10,
    alt: 'Two doorways converging on one owned store, suggesting rented channels feeding home.',
    body: `
  <rect x="900" y="260" width="100" height="160" fill="none" stroke="${CREAM}" stroke-width="1.2" opacity="0.35" stroke-dasharray="5 4"/>
  <rect x="1040" y="260" width="100" height="160" fill="none" stroke="${CREAM}" stroke-width="1.2" opacity="0.35" stroke-dasharray="5 4"/>
  <rect x="1180" y="300" width="200" height="200" fill="${CREAM}" opacity="0.08" stroke="${GOLD}" stroke-width="2"/>
  <path d="M1000,420 L1040,400 M1140,400 L1180,420" stroke="${GOLD}" stroke-width="1.5"/>`,
  },
  {
    num: 11,
    alt: 'A keyboard with a soft glow suggesting AI-assisted store content work.',
    body: `
  <rect x="900" y="420" width="480" height="140" rx="6" fill="${CREAM}" opacity="0.08" stroke="${CREAM}" stroke-width="1.5"/>
  ${Array.from({ length: 12 }, (_, i) => {
    const row = Math.floor(i / 4)
    const col = i % 4
    return `<rect x="${940 + col * 100}" y="${450 + row * 32}" width="72" height="22" fill="${CREAM}" opacity="0.15"/>`
  }).join('\n  ')}
  <rect x="1180" y="340" width="120" height="60" fill="none" stroke="${GOLD}" stroke-width="2"/>
  <text x="1240" y="378" text-anchor="middle" font-family="ui-monospace,monospace" font-size="18" fill="${GOLD}" font-weight="700">AI</text>`,
  },
  {
    num: 12,
    alt: 'An open glossary notebook and pen on a dark desk, warmly lit.',
    body: `
  <rect x="940" y="260" width="400" height="280" fill="${CREAM}" opacity="0.06" stroke="${CREAM}" stroke-width="1.5"/>
  <line x1="980" y1="320" x2="1280" y2="320" stroke="${CREAM}" stroke-width="1" opacity="0.35"/>
  <line x1="980" y1="360" x2="1240" y2="360" stroke="${CREAM}" stroke-width="1" opacity="0.25"/>
  <line x1="980" y1="400" x2="1260" y2="400" stroke="${CREAM}" stroke-width="1" opacity="0.25"/>
  <line x1="980" y1="440" x2="1200" y2="440" stroke="${CREAM}" stroke-width="1" opacity="0.2"/>
  <rect x="1320" y="480" width="24" height="120" fill="none" stroke="${GOLD}" stroke-width="2" transform="rotate(12 1332 540)"/>`,
  },
]

function hubOgSvg() {
  const W = 1200
  const H = 630
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <rect width="${W}" height="${H}" fill="${INK}"/>
  <rect x="80" y="80" width="1040" height="470" fill="none" stroke="${GOLD}" stroke-width="1" opacity="0.35"/>
  <text x="600" y="280" text-anchor="middle" font-family="Georgia,serif" font-size="72" fill="${CREAM}" font-weight="500">Built to Run</text>
  <text x="600" y="340" text-anchor="middle" font-family="ui-monospace,monospace" font-size="18" fill="${GOLD_DIM}" font-weight="700" letter-spacing="4">A SYSBILT FIELD GUIDE</text>
  <text x="600" y="400" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="${CREAM}" opacity="0.75" font-style="italic">How automation really works now</text>
  <text x="600" y="480" text-anchor="middle" font-family="ui-monospace,monospace" font-size="13" fill="${GOLD}" font-weight="700" letter-spacing="2">AUTOMATION · WORKFLOWS · AI</text>
</svg>`
}

async function main() {
  await mkdir(OUT, { recursive: true })
  await mkdir(HUB_OUT, { recursive: true })

  for (const ch of CHAPTERS) {
    const file = path.join(OUT, `ch${String(ch.num).padStart(2, '0')}.svg`)
    await writeFile(file, wrap(ch.body), 'utf8')
    console.log(`wrote ${path.relative(ROOT, file)}`)
  }

  const hubFile = path.join(HUB_OUT, 'og.svg')
  await writeFile(hubFile, hubOgSvg(), 'utf8')
  console.log(`wrote ${path.relative(ROOT, hubFile)}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

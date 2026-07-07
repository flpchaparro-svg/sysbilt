#!/usr/bin/env node
/**
 * Generate Built to See chapter opener covers (SVG) and hub OG card.
 * Run: node scripts/site/gen-bse-covers.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')
const OUT = path.join(ROOT, 'public/images/built-to-see/chapters')
const HUB_OUT = path.join(ROOT, 'public/images/built-to-see')

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
    alt: 'Rear-view mirror versus live dashboard windscreen.',
    body: `
  <rect x="880" y="280" width="280" height="180" rx="4" fill="none" stroke="${CREAM}" stroke-width="1.5" opacity="0.4"/>
  <ellipse cx="1020" cy="360" rx="60" ry="36" fill="none" stroke="${CREAM}" stroke-width="2" opacity="0.5"/>
  <rect x="1220" y="260" width="200" height="120" fill="${CREAM}" opacity="0.08" stroke="${GOLD}" stroke-width="2"/>
  ${[0, 1, 2].map((i) => `<rect x="1240" y="${290 + i * 28}" width="${120 - i * 20}" height="12" fill="${GOLD}" opacity="${0.5 - i * 0.1}"/>`).join('\n  ')}`,
  },
  {
    num: 2,
    alt: 'Scattered system data converging into one instrument panel.',
    body: `
  ${['WEB', 'CRM', 'ACC'].map((label, i) => {
    const x = 900 + i * 120
    return `<rect x="${x}" y="320" width="90" height="70" fill="none" stroke="${CREAM}" stroke-width="1.2" opacity="0.45"/>
  <line x1="${x + 45}" y1="390" x2="1180" y2="480" stroke="${GOLD}" stroke-width="1" opacity="0.5"/>`
  }).join('\n  ')}
  <rect x="1140" y="440" width="240" height="160" fill="${CREAM}" opacity="0.08" stroke="${GOLD}" stroke-width="2.5"/>`,
  },
  {
    num: 3,
    alt: 'One question per dashboard view, five numbers not forty.',
    body: `
  <rect x="900" y="280" width="480" height="280" fill="none" stroke="${CREAM}" stroke-width="1.5" opacity="0.35"/>
  ${[0, 1, 2, 3, 4].map((i) => {
    const x = 940 + (i % 3) * 140
    const y = 340 + Math.floor(i / 3) * 100
    return `<rect x="${x}" y="${y}" width="110" height="70" fill="${CREAM}" opacity="0.1" stroke="${i < 2 ? GOLD : CREAM}" stroke-width="${i < 2 ? 2 : 1}"/>`
  }).join('\n  ')}`,
  },
  {
    num: 4,
    alt: 'Leading numbers now, lagging results later.',
    body: `
  <line x1="900" y1="500" x2="1380" y2="500" stroke="${CREAM}" stroke-width="1.5" opacity="0.4"/>
  <circle cx="980" cy="500" r="40" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
  <text x="980" y="506" text-anchor="middle" font-family="ui-monospace,monospace" font-size="12" fill="${GOLD}" font-weight="700">NOW</text>
  <circle cx="1280" cy="500" r="40" fill="none" stroke="${CREAM}" stroke-width="1.5" opacity="0.6"/>
  <path d="M1020,500 L1240,500" stroke="${GOLD}" stroke-width="2" marker-end="url(#none)"/>`,
  },
  {
    num: 5,
    alt: 'The dashboard library: daily glance, pipeline, money, marketing.',
    body: `
  ${['DAILY', 'PIPE', 'MONEY', 'MKTG'].map((label, i) => {
    const x = 900 + i * 120
    return `<rect x="${x}" y="320" width="100" height="140" fill="${CREAM}" opacity="0.06" stroke="${i === 0 ? GOLD : CREAM}" stroke-width="${i === 0 ? 2 : 1.2}"/>
  <text x="${x + 50}" y="400" text-anchor="middle" font-family="ui-monospace,monospace" font-size="11" fill="${i === 0 ? GOLD : CREAM}" opacity="0.8" font-weight="700">${label}</text>`
  }).join('\n  ')}`,
  },
  {
    num: 6,
    alt: 'Daily, weekly, and monthly dashboard rhythms.',
    body: `
  ${['D', 'W', 'M'].map((d, i) => {
    const x = 960 + i * 160
  return `<rect x="${x}" y="300" width="120" height="${160 + i * 40}" fill="none" stroke="${CREAM}" stroke-width="1.5" opacity="0.5"/>
  <text x="${x + 60}" y="340" text-anchor="middle" font-family="ui-monospace,monospace" font-size="18" fill="${GOLD_DIM}" font-weight="700">${d}</text>`
  }).join('\n  ')}`,
  },
  {
    num: 7,
    alt: 'Clean data versus a dashboard that lies convincingly.',
    body: `
  <rect x="900" y="340" width="200" height="140" fill="none" stroke="${CREAM}" stroke-width="1.2" opacity="0.35" stroke-dasharray="4 4"/>
  <rect x="1160" y="300" width="260" height="200" fill="${CREAM}" opacity="0.1" stroke="${GOLD}" stroke-width="2"/>
  <text x="1290" y="410" text-anchor="middle" font-family="ui-monospace,monospace" font-size="28" fill="${GOLD}" font-weight="700">$</text>`,
  },
  {
    num: 8,
    alt: 'Alerts and plain-language questions of business data.',
    body: `
  <circle cx="1100" cy="400" r="80" fill="none" stroke="${GOLD}" stroke-width="2"/>
  <text x="1100" y="408" text-anchor="middle" font-family="Georgia,serif" font-size="42" fill="${CREAM}" font-weight="500">?</text>
  <rect x="1240" y="360" width="180" height="36" rx="18" fill="${GOLD}" opacity="0.25" stroke="${GOLD}" stroke-width="1.5"/>`,
  },
  {
    num: 9,
    alt: 'The whole connected business visible on one screen.',
    body: `
  <rect x="1040" y="320" width="280" height="200" fill="${CREAM}" opacity="0.08" stroke="${GOLD}" stroke-width="2.5"/>
  ${[0, 1, 2, 3, 4, 5].map((i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2
    const x2 = 1180 + Math.cos(a) * 180
    const y2 = 420 + Math.sin(a) * 140
    return `<line x1="1180" y1="420" x2="${x2}" y2="${y2}" stroke="${GOLD}" stroke-width="1.2" opacity="0.6"/>`
  }).join('\n  ')}`,
  },
  {
    num: 10,
    alt: 'Three stages: see, understand, anticipate.',
    body: `
  ${[0, 1, 2].map((i) => {
    const y = 520 - i * 80
    const w = 200 + i * 60
    return `<rect x="${1180 - w}" y="${y}" width="${w}" height="50" fill="none" stroke="${i === 0 ? GOLD : CREAM}" stroke-width="${i === 0 ? 2 : 1.2}" opacity="${0.9 - i * 0.2}"/>`
  }).join('\n  ')}`,
  },
  {
    num: 11,
    alt: 'Copy-ready dashboard prompt cards.',
    body: `
  ${[0, 1, 2].map((i) => {
    const x = 920 + i * 150
    return `<rect x="${x}" y="300" width="130" height="200" fill="${CREAM}" opacity="0.06" stroke="${i === 1 ? GOLD : CREAM}" stroke-width="${i === 1 ? 2 : 1.2}"/>
  <text x="${x + 65}" y="340" text-anchor="middle" font-family="ui-monospace,monospace" font-size="10" fill="${GOLD_DIM}" font-weight="700">PROMPT</text>`
  }).join('\n  ')}`,
  },
  {
    num: 12,
    alt: 'An open glossary notebook on a dark desk, warmly lit.',
    body: `
  <rect x="940" y="260" width="400" height="280" fill="${CREAM}" opacity="0.06" stroke="${CREAM}" stroke-width="1.5"/>
  <line x1="980" y1="320" x2="1280" y2="320" stroke="${CREAM}" stroke-width="1" opacity="0.35"/>
  <line x1="980" y1="360" x2="1240" y2="360" stroke="${CREAM}" stroke-width="1" opacity="0.25"/>
  <line x1="980" y1="400" x2="1260" y2="400" stroke="${CREAM}" stroke-width="1" opacity="0.25"/>
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
  <text x="600" y="280" text-anchor="middle" font-family="Georgia,serif" font-size="72" fill="${CREAM}" font-weight="500">Built to See</text>
  <text x="600" y="340" text-anchor="middle" font-family="ui-monospace,monospace" font-size="18" fill="${GOLD_DIM}" font-weight="700" letter-spacing="4">A SYSBILT FIELD GUIDE · NO. 08</text>
  <text x="600" y="400" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="${CREAM}" opacity="0.75" font-style="italic">Know what is actually happening</text>
  <text x="600" y="480" text-anchor="middle" font-family="ui-monospace,monospace" font-size="13" fill="${GOLD}" font-weight="700" letter-spacing="2">DASHBOARDS · DATA · REPORTING</text>
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

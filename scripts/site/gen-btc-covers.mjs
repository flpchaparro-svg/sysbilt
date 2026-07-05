#!/usr/bin/env node
/**
 * Generate Built to Close chapter opener covers (SVG) and hub OG card.
 * Run: node scripts/site/gen-btc-covers.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')
const OUT = path.join(ROOT, 'public/images/built-to-close/chapters')
const HUB_OUT = path.join(ROOT, 'public/images/built-to-close')

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
    alt: 'Scattered inbox and notebook beside a single awake system catching leads.',
    body: `
  <rect x="880" y="220" width="180" height="120" fill="none" stroke="${CREAM}" stroke-width="1.5" opacity="0.4" stroke-dasharray="5 4"/>
  <text x="970" y="290" text-anchor="middle" font-family="ui-monospace,monospace" font-size="12" fill="${CREAM}" opacity="0.5">INBOX</text>
  <rect x="1080" y="240" width="140" height="100" fill="none" stroke="${CREAM}" stroke-width="1.5" opacity="0.35" stroke-dasharray="5 4"/>
  <text x="1150" y="300" text-anchor="middle" font-family="ui-monospace,monospace" font-size="11" fill="${CREAM}" opacity="0.45">NOTES</text>
  <rect x="1260" y="200" width="200" height="280" rx="4" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
  <circle cx="1360" cy="280" r="40" fill="${GOLD}" opacity="0.2" stroke="${GOLD}" stroke-width="2"/>
  <text x="1360" y="286" text-anchor="middle" font-family="ui-monospace,monospace" font-size="14" fill="${CREAM}" font-weight="700">CRM</text>
  ${[0, 1, 2].map((i) => `<line x1="${920 + i * 80}" y1="180" x2="${1280 + i * 30}" y2="220" stroke="${GOLD}" stroke-width="1" opacity="0.35"/>`).join('\n  ')}`,
  },
  {
    num: 2,
    alt: 'Four labelled CRM blocks and a key over exportable data.',
    body: `
  ${['CONTACTS', 'DEALS', 'ACTIVITIES', 'OWNERS'].map((label, i) => {
    const x = 900 + (i % 2) * 200
    const y = 260 + Math.floor(i / 2) * 140
    return `<rect x="${x}" y="${y}" width="160" height="90" fill="${CREAM}" opacity="0.08" stroke="${CREAM}" stroke-width="1.5"/>
  <text x="${x + 80}" y="${y + 52}" text-anchor="middle" font-family="ui-monospace,monospace" font-size="11" fill="${CREAM}" font-weight="700">${label}</text>`
  }).join('\n  ')}
  <circle cx="1320" cy="380" r="48" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
  <rect x="1295" y="420" width="50" height="70" fill="none" stroke="${GOLD}" stroke-width="2.5"/>
  <text x="1320" y="500" text-anchor="middle" font-family="ui-monospace,monospace" font-size="10" fill="${GOLD_DIM}" font-weight="700">EXPORT</text>`,
  },
  {
    num: 3,
    alt: 'A horizontal pipeline board with deals moving toward won or lost.',
    body: `
  ${['NEW', 'QUAL', 'PROP', 'WON'].map((stage, i) => {
    const x = 880 + i * 170
    return `<rect x="${x}" y="300" width="130" height="220" fill="none" stroke="${i === 3 ? GOLD : CREAM}" stroke-width="${i === 3 ? 2.5 : 1.5}" opacity="${i === 3 ? 1 : 0.55}"/>
  <text x="${x + 65}" y="340" text-anchor="middle" font-family="ui-monospace,monospace" font-size="12" fill="${i === 3 ? GOLD : CREAM}" font-weight="700">${stage}</text>
  <rect x="${x + 20}" y="380" width="90" height="36" fill="${CREAM}" opacity="0.12" stroke="${CREAM}" stroke-width="1"/>
  <rect x="${x + 20}" y="430" width="90" height="36" fill="${CREAM}" opacity="0.08" stroke="${CREAM}" stroke-width="1"/>`
  }).join('\n  ')}
  ${[0, 1, 2].map((i) => `<path d="M${1010 + i * 170},410 L${1050 + i * 170},410" stroke="${GOLD}" stroke-width="1.5" opacity="0.6"/>`).join('\n  ')}`,
  },
  {
    num: 4,
    alt: 'A clean contact record with a short field list and a notes area.',
    body: `
  <rect x="940" y="220" width="360" height="400" fill="none" stroke="${CREAM}" stroke-width="2"/>
  <rect x="960" y="240" width="320" height="48" fill="${CREAM}" opacity="0.1"/>
  <text x="980" y="272" font-family="ui-monospace,monospace" font-size="14" fill="${CREAM}" font-weight="700">CONTACT RECORD</text>
  ${['Name', 'Phone', 'Source'].map((f, i) => `<rect x="980" y="${310 + i * 52}" width="200" height="28" fill="${CREAM}" opacity="${0.3 - i * 0.05}"/>
  <text x="990" y="${330 + i * 52}" font-family="ui-monospace,monospace" font-size="10" fill="${INK}" opacity="0.6">${f}</text>`).join('\n  ')}
  <rect x="980" y="480" width="300" height="120" fill="none" stroke="${GOLD}" stroke-width="1.5" opacity="0.6"/>
  <text x="990" y="510" font-family="ui-monospace,monospace" font-size="10" fill="${GOLD_DIM}" font-weight="700">NOTES</text>`,
  },
  {
    num: 5,
    alt: 'CRM feature cards mapped to the three leaks from chapter one.',
    body: `
  ${['FORMS', 'INBOX', 'TASKS', 'SEQ'].map((label, i) => {
    const x = 880 + i * 130
    return `<rect x="${x}" y="320" width="100" height="120" fill="${CREAM}" opacity="0.06" stroke="${i === 2 ? GOLD : CREAM}" stroke-width="${i === 2 ? 2 : 1.2}"/>
  <text x="${x + 50}" y="390" text-anchor="middle" font-family="ui-monospace,monospace" font-size="11" fill="${CREAM}" font-weight="700">${label}</text>`
  }).join('\n  ')}
  <path d="M900,500 L1240,500" stroke="${GOLD}" stroke-width="1.5" opacity="0.5"/>
  <text x="1070" y="540" text-anchor="middle" font-family="ui-monospace,monospace" font-size="11" fill="${GOLD_DIM}" font-weight="700">THREE LEAKS</text>`,
  },
  {
    num: 6,
    alt: 'A fifteen-minute morning rhythm: new leads, tasks, and the board.',
    body: `
  <text x="1100" y="260" text-anchor="middle" font-family="ui-monospace,monospace" font-size="18" fill="${GOLD}" font-weight="700">15 MIN</text>
  ${['LEADS', 'TASKS', 'BOARD'].map((d, i) => {
    const x = 920 + i * 160
    return `<rect x="${x}" y="300" width="130" height="200" fill="none" stroke="${CREAM}" stroke-width="1.5" opacity="0.5"/>
  <text x="${x + 65}" y="340" text-anchor="middle" font-family="ui-monospace,monospace" font-size="14" fill="${GOLD_DIM}" font-weight="700">${d}</text>`
  }).join('\n  ')}`,
  },
  {
    num: 7,
    alt: 'Two follow-up message stacks: pest versus persistent professional.',
    body: `
  <rect x="900" y="280" width="160" height="240" fill="none" stroke="${CREAM}" stroke-width="1.2" opacity="0.35"/>
  <text x="980" y="320" text-anchor="middle" font-family="ui-monospace,monospace" font-size="12" fill="${CREAM}" opacity="0.45" font-weight="700">PEST</text>
  ${[0, 1, 2, 3, 4].map((i) => `<rect x="920" y="${340 + i * 32}" width="120" height="20" fill="${CREAM}" opacity="0.15"/>`).join('\n  ')}
  <rect x="1120" y="280" width="160" height="240" fill="none" stroke="${GOLD}" stroke-width="2"/>
  <text x="1200" y="320" text-anchor="middle" font-family="ui-monospace,monospace" font-size="11" fill="${GOLD}" font-weight="700">PERSISTENT</text>
  ${[0, 1, 2].map((i) => `<rect x="1140" y="${360 + i * 48}" width="120" height="28" fill="${CREAM}" opacity="0.2" stroke="${GOLD}" stroke-width="1"/>`).join('\n  ')}`,
  },
  {
    num: 8,
    alt: 'Leads versus won revenue compared across two marketing channels.',
    body: `
  ${['CHANNEL A', 'CHANNEL B'].map((ch, i) => {
    const x = 920 + i * 220
    const leadH = 120 + i * 20
    const wonH = 60 + i * 40
    return `<text x="${x + 80}" y="270" text-anchor="middle" font-family="ui-monospace,monospace" font-size="11" fill="${CREAM}" opacity="0.55" font-weight="700">${ch}</text>
  <rect x="${x}" y="300" width="60" height="${leadH}" fill="${CREAM}" opacity="0.25"/>
  <text x="${x + 30}" y="${300 + leadH + 24}" text-anchor="middle" font-family="ui-monospace,monospace" font-size="9" fill="${CREAM}" opacity="0.5">LEADS</text>
  <rect x="${x + 90}" y="${420 - wonH}" width="60" height="${wonH}" fill="${GOLD}" opacity="0.75"/>
  <text x="${x + 120}" y="440" text-anchor="middle" font-family="ui-monospace,monospace" font-size="9" fill="${GOLD_DIM}" font-weight="700">WON</text>`
  }).join('\n  ')}`,
  },
  {
    num: 9,
    alt: 'CRM hub with spokes to website, email, phone, quoting, and accounting.',
    body: `
  <rect x="1040" y="360" width="160" height="90" fill="none" stroke="${CREAM}" stroke-width="2.5"/>
  <text x="1120" y="415" text-anchor="middle" font-family="ui-monospace,monospace" font-size="14" fill="${CREAM}" font-weight="700">CRM</text>
  ${['WEB', 'EMAIL', 'PHONE', 'QUOTE', 'ACCOUNTS', 'FORMS'].map((label, i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2
    const x2 = 1120 + Math.cos(a) * 200
    const y2 = 405 + Math.sin(a) * 160
  return `<line x1="1120" y1="405" x2="${x2}" y2="${y2}" stroke="${GOLD}" stroke-width="1.2" opacity="0.65"/>
  <text x="${x2}" y="${y2 + 4}" text-anchor="middle" font-family="ui-monospace,monospace" font-size="10" fill="${GOLD_DIM}" font-weight="700">${label}</text>`
  }).join('\n  ')}`,
  },
  {
    num: 10,
    alt: 'A seesaw balancing CRM work added against value returned to the team.',
    body: `
  <line x1="900" y1="480" x2="1340" y2="480" stroke="${CREAM}" stroke-width="2" opacity="0.4"/>
  <polygon points="1120,480 1080,520 1160,520" fill="${CREAM}" opacity="0.35"/>
  <rect x="940" y="360" width="140" height="80" fill="${CREAM}" opacity="0.1" stroke="${CREAM}" stroke-width="1.5" transform="rotate(-8 1010 400)"/>
  <text x="1010" y="408" text-anchor="middle" font-family="ui-monospace,monospace" font-size="10" fill="${CREAM}" font-weight="700" transform="rotate(-8 1010 408)">WORK ADDED</text>
  <rect x="1160" y="320" width="140" height="80" fill="${GOLD}" opacity="0.25" stroke="${GOLD}" stroke-width="2" transform="rotate(8 1230 360)"/>
  <text x="1230" y="368" text-anchor="middle" font-family="ui-monospace,monospace" font-size="10" fill="${GOLD}" font-weight="700" transform="rotate(8 1230 368)">VALUE BACK</text>`,
  },
  {
    num: 11,
    alt: 'AI drafts, human review, then client message with your name on it.',
    body: `
  <rect x="900" y="380" width="120" height="80" fill="none" stroke="${GOLD}" stroke-width="2"/>
  <text x="960" y="428" text-anchor="middle" font-family="ui-monospace,monospace" font-size="16" fill="${GOLD}" font-weight="700">AI</text>
  <path d="M1020,420 L1080,420" stroke="${CREAM}" stroke-width="1.5" opacity="0.5"/>
  <rect x="1080" y="380" width="120" height="80" fill="${CREAM}" opacity="0.1" stroke="${CREAM}" stroke-width="1.5"/>
  <text x="1140" y="428" text-anchor="middle" font-family="ui-monospace,monospace" font-size="10" fill="${CREAM}" font-weight="700">YOU</text>
  <path d="M1200,420 L1260,420" stroke="${GOLD}" stroke-width="1.5"/>
  <rect x="1260" y="360" width="160" height="120" fill="${CREAM}" opacity="0.08" stroke="${GOLD}" stroke-width="2"/>
  <text x="1340" y="428" text-anchor="middle" font-family="ui-monospace,monospace" font-size="10" fill="${CREAM}" font-weight="700">CLIENT MSG</text>`,
  },
  {
    num: 12,
    alt: 'An open glossary notebook on a dark desk, warmly lit.',
    body: `
  <rect x="940" y="260" width="400" height="280" fill="${CREAM}" opacity="0.06" stroke="${CREAM}" stroke-width="1.5"/>
  <line x1="980" y1="320" x2="1280" y2="320" stroke="${CREAM}" stroke-width="1" opacity="0.35"/>
  <line x1="980" y1="360" x2="1240" y2="360" stroke="${CREAM}" stroke-width="1" opacity="0.25"/>
  <line x1="980" y1="400" x2="1260" y2="400" stroke="${CREAM}" stroke-width="1" opacity="0.25"/>
  <line x1="980" y1="440" x2="1200" y2="440" stroke="${CREAM}" stroke-width="1" opacity="0.2"/>
  <text x="980" y="300" font-family="ui-monospace,monospace" font-size="12" fill="${GOLD_DIM}" font-weight="700">GLOSSARY</text>
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
  <text x="600" y="280" text-anchor="middle" font-family="Georgia,serif" font-size="72" fill="${CREAM}" font-weight="500">Built to Close</text>
  <text x="600" y="340" text-anchor="middle" font-family="ui-monospace,monospace" font-size="18" fill="${GOLD_DIM}" font-weight="700" letter-spacing="4">A SYSBILT FIELD GUIDE</text>
  <text x="600" y="400" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="${CREAM}" opacity="0.75" font-style="italic">How follow-up and CRM actually work</text>
  <text x="600" y="480" text-anchor="middle" font-family="ui-monospace,monospace" font-size="13" fill="${GOLD}" font-weight="700" letter-spacing="2">CRM · PIPELINE · FOLLOW-UP</text>
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

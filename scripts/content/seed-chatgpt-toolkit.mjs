#!/usr/bin/env node
/**
 * Patch ChatGPT toolkit item with full body content (not a blog post).
 * Run from repo root: node scripts/content/seed-chatgpt-toolkit.mjs
 */
import {createClient} from '@sanity/client'
import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'

const ROOT = resolve(import.meta.dirname, '../..')
const CHATGPT_ID = '4867f2fc-2bde-4db3-ac5b-09187bcf682b'

function loadToken() {
  for (const key of ['SANITY_API_TOKEN', 'SANITY_API_WRITE_TOKEN', 'SANITY_AUTH_TOKEN']) {
    if (process.env[key]) return process.env[key]
  }
  try {
    const env = readFileSync(resolve(ROOT, '.env.local'), 'utf8')
    for (const key of ['SANITY_API_TOKEN', 'SANITY_API_WRITE_TOKEN', 'SANITY_AUTH_TOKEN']) {
      const match = env.match(new RegExp(`^${key}=(.+)$`, 'm'))
      if (match) return match[1].trim()
    }
  } catch {
    /* ignore */
  }
  throw new Error('Add SANITY_API_TOKEN to .env.local (Sanity → API → Tokens, Editor role).')
}

const body = JSON.parse(readFileSync(resolve(import.meta.dirname, 'chatgpt-blog-post-body.json'), 'utf8'))
// Hero tagline is separate; body starts at first h2
const bodyFromH2 = body.slice(body.findIndex((b) => b.style === 'h2'))

const client = createClient({
  projectId: 'wdlc9pg8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: loadToken(),
  useCdn: false,
})

const summary =
  'ChatGPT is an AI assistant from OpenAI, and for most small business owners it is the easiest place to start with AI. You ask for something in plain English and it answers in seconds: a draft, a summary, a plan, a straight answer. We have found it gets you the first 80% of almost any writing or thinking job in the time it takes to make a coffee. The last 20%, the judgement, the facts, the parts a customer actually sees, still need you.'

await client
  .patch(CHATGPT_ID)
  .set({
    tagline: 'The cheapest first draft in your business, if you check its work',
    metaTitle: 'ChatGPT for small business',
    metaDescription:
      'Used well, ChatGPT saves a small business real time and money. Used carelessly it costs you both. Here is where it helps, where it does not, and what to watch.',
    summary: summary.slice(0, 400),
    tags: ['ChatGPT', 'OpenAI', 'AI Assistants'],
    body: bodyFromH2,
  })
  .commit()

console.log('Patched toolkit ChatGPT:', CHATGPT_ID)
console.log('Body blocks:', bodyFromH2.length)

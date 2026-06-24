#!/usr/bin/env node
import {createClient} from '@sanity/client'
import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'

const ROOT = resolve(import.meta.dirname, '../..')
const AUTHOR_ID = '8449e300-9af7-4be2-ae44-e6a4c6492c6f'

function loadToken() {
  for (const key of ['SANITY_API_TOKEN', 'SANITY_API_WRITE_TOKEN', 'SANITY_AUTH_TOKEN']) {
    if (process.env[key]) return process.env[key]
  }
  try {
    const env = readFileSync(resolve(ROOT, '.env.local'), 'utf8')
    for (const key of ['SANITY_API_TOKEN', 'SANITY_API_WRITE_TOKEN', 'SANITY_AUTH_TOKEN']) {
      const match = env.match(new RegExp(`^${key}=(.+)$`, 'm'))
      if (match) return match[1].trim().replace(/^["']|["']$/g, '')
    }
  } catch {
    /* ignore */
  }
  throw new Error('Add SANITY_API_TOKEN to .env.local (Sanity → API → Tokens, Editor role).')
}

function key() {
  return Math.random().toString(36).slice(2, 14)
}

function h2(text) {
  return {
    _type: 'block',
    _key: key(),
    style: 'h2',
    markDefs: [],
    children: [{_type: 'span', _key: key(), text, marks: []}],
  }
}

function p(text) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: key(), text, marks: []}],
  }
}

function bullet(strong, rest = '') {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    markDefs: [],
    children: [
      {_type: 'span', _key: key(), text: strong, marks: ['strong']},
      {_type: 'span', _key: key(), text: rest, marks: []},
    ],
  }
}

function callout(title, text, type = 'info') {
  return {_type: 'callout', _key: key(), title, text, type}
}

const body = [
  h2('What it can actually do'),
  p('Think of it as a chat interface hooked straight into the live internet. You type a question or a task, and it responds with text, code, or data analysis.'),
  bullet('Reads the live web.', ' It searches Google in real-time to pull current information, not just historical data from years ago.'),
  bullet('Chews through documents.', ' You can upload massive text files or manuals and ask it to find the main points or a specific clause.'),
  bullet('Writes the first draft.', ' It handles the blank page problem by drafting emails, proposals, and policies, ready for you to edit and refine.'),

  h2('What it connects to'),
  p('The real power of this tool is how it talks to the rest of the Google ecosystem.'),
  callout(
    '[Image placeholder: Connections diagram]',
    'Replace with the 16:9 connections diagram (Gmail, Docs, Drive, Sheets). Delete this callout in Studio and insert the real image block. Alt: a diagram of Gemini connected to Gmail, Google Docs, Drive and Sheets.',
    'info',
  ),
  bullet('Google Workspace (Paid).', ' On the paid tiers, it sits directly inside Docs, Sheets, and Gmail, pulling context from your own business files.'),
  bullet('The live internet (Free).', ' The free version still reaches out to the web to find current answers and source links.'),
  bullet('Custom workflows (API).', ' Developers can plug its brain into automation tools like Make or n8n to sort incoming emails or categorise leads automatically.'),

  h2('How it makes you more money'),
  p('Faster turnaround times mean more capacity for paying work.'),
  bullet('Quicker proposals.', ' When you feed it your raw notes, it writes a formatted quote summary in seconds, getting the offer to the client first.'),
  bullet('Better market research.', ' It pulls competitor data and pricing models from the live web, helping you price your services accurately.'),

  h2('How it saves you money'),
  p('It handles the low-level admin tasks you usually pay someone else to do.'),
  bullet('Cuts research time.', ' Instead of spending an hour reading a dry industry report, you get a one-page summary in ten seconds.'),
  bullet('Replaces basic subscriptions.', ' It handles writing, basic data analysis, and coding checks, cutting the need for single-use apps.'),

  h2('How it lowers your stress'),
  p('You stop staring at blank screens and overflowing inboxes.'),
  bullet('Clears the backlog.', ' It drafts replies to tricky client emails, giving you a polite starting point when you feel frustrated or stuck.'),
  bullet('Finds lost details.', ' When connected to your Workspace, it can hunt down a specific project detail buried in a month-old document you forgot the name of.'),

  h2('Where it falls down, and what it can cost you'),
  p("We've found the biggest trap is trusting it blindly. Treat it like a sharp junior, not an oracle."),
  bullet('It lies with confidence.', ' It can invent facts or confidently state a policy that does not exist, looking entirely plausible while doing so.'),
  bullet('The Workspace tax.', ' To get the deep integrations into your business emails and documents, you have to upgrade your Google Workspace licences, which gets expensive fast across a whole team.'),
  bullet('Bland writing.', ' If you do not give it strict instructions, it writes in a sterile, corporate tone that sounds exactly like a robot.'),

  h2('When to try it, pay for it, or build it in'),
  p('Start simple and only pay when you need it inside your daily tools.'),
  bullet('Try it.', ' Use the free version on the web to test its writing and research skills before committing.'),
  bullet('Pay for it.', ' Upgrade when you want it sitting inside Google Docs and Gmail, drafting directly where you work.'),
  bullet('Build it in.', ' Connect its API when you want to automatically summarise every new client enquiry before it hits your inbox.'),

  h2('Chat or API, in plain terms'),
  p('You will likely use both as your business grows. The chat interface is for your daily questions and manual drafting. The API is what we use in the background to automatically read and sort data without you touching a keyboard.'),

  callout(
    '[Image placeholder: Process flow]',
    'Replace with the 16:9 process flow image (email → draft → approve → send). Delete this callout in Studio and insert the real image block. Alt: a process flow showing an email arriving, a document being drafted, approved, and sent.',
    'info',
  ),

  h2('How we do it'),
  p('We do not just leave you with a chat window. In our experience, Gemini is best when it works quietly in the background. We connect its API to your web forms so it automatically reads a new lead, categorises what they want, and drafts an internal brief for you. We also set up custom instructions so when you do use the chat, it writes in your actual business voice, not generic corporate speak. It becomes a reliable system, not just a search bar.'),
]

const doc = {
  _type: 'toolkitItem',
  name: 'Gemini',
  slug: {_type: 'slug', current: 'gemini'},
  tagline: 'The Google brain wired directly into your daily documents and emails',
  summary:
    "Gemini is Google's answer to the AI assistant race. It sits on your screen to write, research, and analyse data, with the distinct advantage of tapping directly into the live web and your Google Workspace files.",
  benefits: [
    'Drafts routine emails and replies in seconds',
    'Analyses large spreadsheets to find trends and errors',
    'Searches the live web to pull current facts and pricing',
    'Reads and summarises long PDF documents quickly',
  ],
  body,
  category: 'chat-research',
  pricingModel: 'freemium',
  linkType: 'standard',
  url: 'https://gemini.google.com',
  picks: ['our-pick'],
  tags: ['AI assistants', 'chat', 'Google', 'gemini'],
  orderRank: 10,
  featured: false,
  internalLinkDestination: '/pillar4',
  metaTitle: 'Gemini for small business',
  metaDescription:
    'How to use Google Gemini to write, research, and pull data straight from your Workspace. A practical guide for Australian businesses.',
  focusKeyword: 'Gemini for small business',
  author: {_type: 'reference', _ref: AUTHOR_ID},
}

const client = createClient({
  projectId: 'wdlc9pg8',
  dataset: 'production',
  apiVersion: '2024-02-20',
  token: loadToken(),
  useCdn: false,
})

const existing = await client.fetch('*[_type == "toolkitItem" && slug.current == "gemini"][0]._id')
let docId

if (existing) {
  docId = existing.replace(/^drafts\./, '')
  await client.patch(docId).set(doc).commit()
  console.log('Updated toolkit Gemini:', docId)
} else {
  const created = await client.create(doc)
  docId = created._id.replace(/^drafts\./, '')
  console.log('Created toolkit Gemini:', docId)
}

console.log('Body blocks:', body.length)
console.log('Publish in Studio or run publish via API for live site.')

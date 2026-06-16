#!/usr/bin/env node
/**
 * One-off: seed ChatGPT blog post in Sanity production.
 * Run from repo root: node scripts/content/seed-chatgpt-blog-post.mjs
 */
import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '../..');

function loadToken() {
  if (process.env.SANITY_API_TOKEN) return process.env.SANITY_API_TOKEN;
  try {
    const env = readFileSync(resolve(ROOT, '.env.local'), 'utf8');
    const match = env.match(/^SANITY_API_TOKEN=(.+)$/m);
    if (match) return match[1].trim();
  } catch {
    /* ignore */
  }
  throw new Error('Set SANITY_API_TOKEN or add it to .env.local');
}

let k = 0;
const key = () => `k${++k}${Math.random().toString(36).slice(2, 8)}`;

function span(text, marks = []) {
  return { _type: 'span', _key: key(), text, marks };
}

function block(style, children, opts = {}) {
  return {
    _key: key(),
    _type: 'block',
    style,
    markDefs: [],
    children: Array.isArray(children) ? children : [span(children)],
    ...opts,
  };
}

function p(text) {
  return block('normal', text);
}

function h2(text) {
  return block('h2', text);
}

function h3(text) {
  return block('h3', text);
}

function bullet(strong, rest) {
  return block('normal', [span(strong, ['strong']), span(rest)], { listItem: 'bullet', level: 1 });
}

function callout(title, text, type = 'info') {
  return { _key: key(), _type: 'callout', type, title, text };
}

function imagePlaceholder(alt, caption, aspect) {
  return {
    _key: key(),
    _type: 'callout',
    type: 'info',
    title: `[Image placeholder: ${alt}]`,
    text: `${caption} (${aspect}). Delete this callout in Studio and insert the real image block.`,
  };
}

const body = [
  p('The cheapest first draft in your business, if you check its work'),

  h2('What it is'),
  p(
    "ChatGPT is an AI assistant from OpenAI, and for most small business owners it's the easiest place to start with AI. You ask for something in plain English and it answers in seconds, a draft, a summary, a plan, a straight answer. We've found it gets you the first 80% of almost any writing or thinking job in the time it takes to make a coffee. The last 20%, the judgement, the facts, the parts a customer actually sees, still need you. Get that split right and it's the best value tool in your business. Get it wrong and it'll embarrass you. Most of this page is about getting it right.",
  ),

  h2('What it can actually do'),
  imagePlaceholder('Skills grid', 'Replace with the 4:5 skills grid illustration', '4:5'),
  p("Strip away the hype and here's what it genuinely does for a business, day to day."),
  bullet('Writes and tidies words.', ' Emails, replies, quotes, and a summary of that document you\'d been avoiding. This is the bread and butter, and where most of your time comes back.'),
  bullet('Reads your files and your numbers.', " Drop in a PDF, a contract, or an Excel or CSV file and it'll pull out what matters, clean up the mess, and build a quick chart. Useful for making sense of your finances or a fat report without a calculator and a long night."),
  bullet('Makes images on the spot.', ' Describe what you want and it draws it, enough for a quick social post or a rough concept. A few a day on the free plan, more and editable if you pay.'),
  bullet('Does real research, with receipts.', " Its research mode reads across the web and hands back an answer showing where every point came from, so you can check it instead of taking its word. A handful a month free, plenty on the paid plans."),
  bullet('Talks back.', " You can speak to it and it answers out loud, which helps when you're driving between jobs or away from the desk."),

  h2('What it connects to'),
  imagePlaceholder('Connections diagram', 'Replace with the 16:9 connections diagram', '16:9'),
  p(
    'This is the part that matters most to us, because connecting your tools is what we do. On its own, ChatGPT is clever but cut off from your business. Hooked into your systems, it actually knows it.',
  ),
  bullet('Out of the box, you feed it.', ' You paste or upload, and it works with whatever you hand over. Free plan, nothing to set up.'),
  bullet('On the paid business plans, it plugs into your tools.', " It can connect to your Google Workspace, your Microsoft 365, Slack, and your CRM like HubSpot, so it answers from your real customer and company information instead of guessing. This is the jump from a clever assistant to one that knows your business by name."),
  bullet('The deeper connections are a build.', " Wiring it into your own systems, and the tools that don't come with a ready-made plug, is the kind of job we do every week, getting software to talk to software so the whole thing runs as one."),
  p(
    "Two honest catches. Those direct connections sit behind a paid plan, not the free one, and the list of what connects changes month to month, so check before you count on it. Some countries can't switch them on yet, and anything touching customer or money data needs setting up properly, with a clear eye on where that data ends up.",
  ),

  h2('How it makes you more money'),
  p('Three ways it puts money in the till, not vague productivity talk.'),
  bullet('Faster quotes win more work.', ' Most jobs are lost to a slow reply, not a high price. Turn an enquiry into a proper proposal in ten minutes instead of "I\'ll sort it tonight", and you reach the customer while they still care. You close more of the leads you already paid to get.'),
  bullet('Clearer pitches get more yeses.', ' It helps you say the same thing in plainer, sharper words, so the quote that used to get a "we\'ll think about it" gets signed.'),
  bullet('More out the door without more hires.', ' The follow-up, the proposal, the listing, the post, you ship them yourself in minutes instead of waiting on someone or letting them slide.'),

  h2('How it saves you money'),
  p("And here's where it quietly stops money leaking out."),
  bullet('It does the jobs you used to pay out for.', " The eighty-dollar copy tweak, the first draft you'd hand a junior, the hours a VA spends summarising, you do them yourself in minutes. Not replacing people, just the small bills that quietly stack up."),
  bullet('The free version is genuinely enough for most owners, for months.', " We've found very few small businesses need the top tier early on, so don't pay for power you aren't using yet."),

  h2('How it lowers your stress'),
  p('Money matters, but the quiet win is what it does to your week.'),
  bullet('It kills the blank page.', ' The policy, the awkward email, the job ad you\'ve dodged for a week turns into "fix this draft" instead of "write this from nothing", so the thing hanging over you finally gets done.'),
  bullet("It's a second brain at 11pm.", " You can think a tough call out loud with something that asks the obvious questions, so you're not carrying every decision on your own."),

  h2('Where it falls down, and what it can cost you'),
  p('Now the part most tool pages skip. This is where it bites, and how to stay out of trouble.'),
  bullet("It's confidently wrong.", ' It will give you a wrong number, invent a source, or make up a detail and sound dead certain. Check anything that counts, numbers, legal, customer facts, and never let its words go straight into a quote, a contract or a client email without your eyes on them first.'),
  bullet('Costs can run away.', ' The chat is cheap. The bill bites when you wire it into your systems with no limits and the usage quietly climbs. Start small, set a cap, and only scale the parts that pay for themselves.'),
  bullet('Your team can go lazy.', " Lean on it for everything and judgement slips, the writing turns bland, and everyone's work starts to sound the same. Use it to draft, not to think for you. The businesses that win with it treat it like a sharp junior, not an oracle."),
  bullet("It doesn't know your business until you tell it.", " Out of the box it writes like everyone else's. The genuinely useful answers only show up once you feed it your context, your tone and your numbers, and that's either a habit you build or a connection we set up."),

  h2('When to try it, pay for it, or build it in'),
  p("So what should you actually do. Here's the honest path, in order."),
  bullet('Try it today, for free.', " Give it one real job you do every week and see how close it gets. That's the only test that counts."),
  bullet('Pay for it when the free version starts getting in your way day to day, and not a moment before.'),
  bullet("Build it into your business when the same job repeats so often a person shouldn't be doing it.", " That's the API, it's a proper build, and it's where the cost and the payoff both climb. That's the point you'd call us."),

  h2('Chat or API, in plain terms'),
  p(
    "The chat is what almost everyone needs, you type, it answers. The API is the same assistant wired into your tools so it works on its own, sorting enquiries, drafting from a form, replying first, all without you in the middle. You never touch the API yourself, that's a build, and we'd only set it up once the chat has proven its worth.",
  ),

  h2('How we do it'),
  p(
    'We start clients on the free chat to prove it earns its place on real work, then build the jobs that repeat into the background with sensible limits, so it does the boring work without the runaway bill or the bad habits.',
  ),
];

const docId = 'post-chatgpt-small-business';

const doc = {
  _id: docId,
  _type: 'post',
  title: 'ChatGPT for small business: where it helps, where it does not',
  slug: { _type: 'slug', current: 'chatgpt-small-business' },
  servicePillar: 'AI Assistants',
  tags: ['ChatGPT', 'OpenAI', 'AI Assistants', 'Small Business'],
  focusKeyword: 'ChatGPT for small business',
  seoTitle: 'ChatGPT for small business',
  seoDescription:
    "Used well, ChatGPT saves a small business real time and money. Used carelessly it costs you both. Here's where it helps, where it doesn't, and what to watch.",
  businessPhase: 'Phase 01: Get Clients',
  targetPersona: 'The Builder',
  internalLinkDestination: '/pillar4',
  contentType: 'Technical Guide',
  author: { _type: 'reference', _ref: '8449e300-9af7-4be2-ae44-e6a4c6492c6f' },
  publishedAt: new Date().toISOString(),
  isFeatured: false,
  body,
};

const client = createClient({
  projectId: 'wdlc9pg8',
  dataset: 'production',
  apiVersion: '2024-02-20',
  token: loadToken(),
  useCdn: false,
});

const existing = await client.fetch('*[_id == $id || slug.current == $slug][0]._id', {
  id: docId,
  slug: 'chatgpt-small-business',
});

if (existing) {
  const updated = await client.createOrReplace({ ...doc, _id: existing.replace('drafts.', '') });
  console.log('Updated published post:', updated._id);
} else {
  const created = await client.createOrReplace(doc);
  console.log('Created published post:', created._id);
}

console.log('Live URL: https://sysbilt.com/blog/chatgpt-small-business');
console.log('Studio: https://sysbilt.sanity.studio/structure/post;' + docId);

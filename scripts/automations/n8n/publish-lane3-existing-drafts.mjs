#!/usr/bin/env node
/**
 * One-shot: fix paragraph spacing on existing Lane 3 drafts and publish now
 * to personal LinkedIn + Facebook. Leaves old draft rows; creates fresh live posts.
 *
 *   node scripts/automations/n8n/publish-lane3-existing-drafts.mjs
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../..');
const MINI = process.env.SYSBILT_MINI_SSH || 'sysbilt@felipes-mac-mini-1.tail1e2dea.ts.net';
const BASE = 'https://postiz.sysbilt.com/api/public/v1';
const PUBLIC = 'https://postiz.sysbilt.com/api/public';
const LI = 'cmrvgawuy0005ob6ufwade18l';
const FB = 'cmqdhhxms0001pe760w6chubg';

const DRAFT_IDS = [
  // Altman decelerate
  'cms71x7di0003ob73u7wfap09',
  // Claude vending (paragraphs regenerating)
  'cms74y26u0006ob736dr1wz8c',
];

const SOURCES = {
  cms71x7di0003ob73u7wfap09:
    'https://techcrunch.com/2026/07/28/sam-altman-is-ready-to-decelerate/',
  cms74y26u0006ob736dr1wz8c:
    'https://techcrunch.com/2026/07/29/claude-opus-5-became-downright-ruthless-when-tasked-with-running-a-vending-machine/',
};

function loadKey() {
  if (process.env.POSTIZ_API_KEY) return process.env.POSTIZ_API_KEY.trim();
  const local = resolve(process.env.HOME || '', '.config/sysbilt/postiz-secrets.env');
  if (existsSync(local)) {
    const m = readFileSync(local, 'utf8').match(/^POSTIZ_API_KEY=(.+)$/m);
    if (m) return m[1].trim();
  }
  return execSync(
    `ssh -o ConnectTimeout=15 -o BatchMode=yes ${MINI} 'grep ^POSTIZ_API_KEY= ~/.config/sysbilt/postiz-secrets.env | cut -d= -f2-'`,
    { encoding: 'utf8' },
  ).trim();
}

async function api(key, url, opts = {}) {
  const full = url.startsWith('http') ? url : `${BASE}${url}`;
  const res = await fetch(full, {
    ...opts,
    headers: {
      Authorization: key,
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
    },
  });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }
  if (!res.ok) throw new Error(`${opts.method || 'GET'} ${full} → ${res.status}: ${JSON.stringify(data).slice(0, 400)}`);
  return data;
}

function ensureParagraphs(htmlOrText) {
  let t = String(htmlOrText || '')
    .replace(/<\/p>\s*<p>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\r/g, '')
    .trim();
  t = t.replace(/\n{3,}/g, '\n\n');
  if (!t.includes('\n\n')) {
    const sentences = t.split(/(?<=[.?!])\s+/).map((s) => s.trim()).filter(Boolean);
    if (sentences.length > 2) {
      const paras = [];
      for (let i = 0; i < sentences.length; i += 2) {
        paras.push(sentences.slice(i, i + 2).join(' '));
      }
      t = paras.join('\n\n');
    }
  }
  if (!/source in the first comment\.?$/i.test(t.trim())) {
    t = `${t.replace(/\s+$/, '')}\n\nSource in the first comment.`;
  }
  return t
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`)
    .join('');
}

function extractImages(post) {
  const imgs = [];
  const push = (arr) => {
    for (const im of arr || []) {
      if (im?.id) imgs.push({ id: im.id, path: im.path || im.url || '' });
    }
  };
  push(post.image);
  push(post.images);
  if (Array.isArray(post.children)) {
    for (const ch of post.children) push(ch.image || ch.images);
  }
  // dedupe by id
  const seen = new Set();
  return imgs.filter((im) => {
    if (seen.has(im.id)) return false;
    seen.add(im.id);
    return true;
  });
}

async function loadPost(key, id) {
  const data = await api(key, `${PUBLIC}/posts/${id}`);
  const items = Array.isArray(data) ? data : [data];
  // Prefer the parent caption post (has image + long content), not the source-URL child comment.
  const withImage = items.find((p) => Array.isArray(p?.image) && p.image.length);
  const withLong = items.find((p) => String(p?.content || '').length > 80 && !/^https?:\/\//i.test(String(p?.content || '').trim()));
  return withImage || withLong || items[0] || null;
}

async function main() {
  const key = loadKey();
  if (!key) throw new Error('Missing POSTIZ_API_KEY');

  for (const id of DRAFT_IDS) {
    console.log('\n===', id, '===');
    const post = await loadPost(key, id);
    if (!post) {
      console.log('not found, skip');
      continue;
    }
    console.log('state', post.state, 'content chars', String(post.content || '').length);
    const content = ensureParagraphs(post.content);
    const images = extractImages(post);
    console.log('images', images.length, images.map((i) => i.id).join(','));
    if (!images.length) {
      console.log('WARN: no image on draft; publishing text-only');
    }
    const sourceUrl = SOURCES[id] || '';
    const body = {
      type: 'now',
      date: new Date().toISOString(),
      shortLink: false,
      tags: [],
      posts: [
        {
          integration: { id: LI },
          value: [
            { content, image: images },
            ...(sourceUrl ? [{ content: sourceUrl, image: [] }] : []),
          ],
          settings: { __type: 'linkedin' },
        },
        {
          integration: { id: FB },
          value: [
            { content, image: images },
            ...(sourceUrl ? [{ content: sourceUrl, image: [] }] : []),
          ],
          settings: { __type: 'facebook' },
        },
      ],
    };
    const created = await api(key, '/posts', { method: 'POST', body: JSON.stringify(body) });
    console.log('published', JSON.stringify(created).slice(0, 300));

    // Park old draft so it does not confuse launches
    try {
      await api(key, `/posts/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: 'draft' }),
      });
    } catch {
      /* already draft */
    }
  }
  console.log('\nDone. Check LinkedIn personal + Facebook, and Postiz launches.');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});

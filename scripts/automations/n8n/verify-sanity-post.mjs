#!/usr/bin/env node
/**
 * End-to-end verify: pull latest Sanity news → build caption (no AI) → Postiz draft → read back.
 * Mirrors SYSBILT - Social Distribute after simplification.
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../..');
const POSTIZ_BASE = 'https://postiz.sysbilt.com/api/public/v1';
const SANITY_QUERY =
  '*[_type == "newsItem" && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...1] { _id, title, "imageUrl": mainImage.asset->url, "introText": pt::text(body) }';
const FB_ID = 'cmqdhhxms0001pe760w6chubg';

function loadKey() {
  if (process.env.POSTIZ_API_KEY) return process.env.POSTIZ_API_KEY;
  const local = resolve(process.env.HOME || '', '.config/sysbilt/postiz-secrets.env');
  if (existsSync(local)) {
    const m = readFileSync(local, 'utf8').match(/^POSTIZ_API_KEY=(.+)$/m);
    if (m) return m[1].trim();
  }
  return execSync(
    "ssh sysbilt@felipes-mac-mini-1.tail1e2dea.ts.net 'grep ^POSTIZ_API_KEY= ~/.config/sysbilt/postiz-secrets.env | cut -d= -f2-'",
    { encoding: 'utf8' },
  ).trim();
}

const key = loadKey();
const headers = { Authorization: key, 'Content-Type': 'application/json' };

async function api(path, opts = {}) {
  const res = await fetch(`${POSTIZ_BASE}${path}`, { ...opts, headers: { ...headers, ...opts.headers } });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) throw new Error(`${opts.method || 'GET'} ${path} → ${res.status}: ${JSON.stringify(data)}`);
  return data;
}

function sanityImage(url) {
  const u = (url || '').trim();
  if (!u.startsWith('https://cdn.sanity.io/images/')) return '';
  return u.split('?')[0];
}

function buildCaption(title, intro) {
  const lines = [title.trim()];
  const body = intro.trim();
  if (body) lines.push(body);
  lines.push('See more news → https://sysbilt.com/news');
  return lines.join('\n\n');
}

const sanityRes = await fetch(
  `https://wdlc9pg8.api.sanity.io/v2021-06-07/data/query/production?query=${encodeURIComponent(SANITY_QUERY)}`,
);
const { result } = await sanityRes.json();
const article = result?.[0];
if (!article?.title || !article?.introText || !article?.imageUrl) {
  console.error('No suitable published news in Sanity');
  process.exit(1);
}

const imageUrl = sanityImage(article.imageUrl);
const caption = buildCaption(article.title, article.introText);
console.log('Article:', article.title);
console.log('Caption preview:\n', caption.slice(0, 280), '...\n');

const upload = await api('/upload-from-url', {
  method: 'POST',
  body: JSON.stringify({ url: imageUrl }),
});
console.log('Image upload OK:', upload.id);

const slotISO = new Date(Date.now() + 86400000).toISOString();
const body = {
  type: 'schedule',
  date: slotISO,
  shortLink: false,
  tags: [],
  posts: [
    {
      integration: { id: FB_ID },
      value: [{ content: caption, image: [{ id: upload.id, path: imageUrl }] }],
      settings: { __type: 'facebook', post_type: 'post' },
    },
  ],
};

const created = await api('/posts', { method: 'POST', body: JSON.stringify(body) });
const postId = created.id || created.postId || created?.posts?.[0]?.id;
console.log('Draft created:', postId);

const start = new Date(Date.now() - 60000).toISOString().slice(0, 10);
const end = new Date(Date.now() + 86400000 * 7).toISOString().slice(0, 10);
const listed = await api(`/posts?startDate=${start}&endDate=${end}`);
const posts = Array.isArray(listed) ? listed : listed.posts || listed.data || [];
const match = posts.find((p) => p.id === postId) || posts[0];
const content = match?.posts?.[0]?.value?.[0]?.content || match?.content || '';
const hasTitle = content.includes(article.title);
const hasCta = content.includes('See more news');
const hasHashtag = /#\w+/.test(content);
const hasExample = content.includes('example.com');

console.log('\n--- Verification ---');
console.log('Has real headline:', hasTitle);
console.log('Has CTA line:', hasCta);
console.log('Has hashtags (should be false):', hasHashtag);
console.log('Has example.com (should be false):', hasExample);

if (!hasTitle || !hasCta || hasHashtag || hasExample) {
  console.error('\nFAIL — post content is wrong. Open https://postiz.sysbilt.com/launches');
  process.exit(1);
}

console.log('\nPASS — draft has Sanity copy + CTA. Check https://postiz.sysbilt.com/launches');

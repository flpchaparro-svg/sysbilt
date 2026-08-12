#!/usr/bin/env node
/**
 * One-shot calendar cleanup for Fri 31 Jul 2026 (Sydney):
 * - Delete unnecessary LinkedIn + Instagram drafts for Lane 2/3 + news clutter
 * - Force-schedule keepers (CRM 15:00 LI)
 * - Publish missed Lane 3 LinkedIn (hedge-fund) now
 *
 * Facebook left alone except we do not touch PUBLISHED rows.
 *
 *   node scripts/automations/n8n/cleanup-today-lane-calendar.mjs
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
const IG = 'cmqjgjodq0001ms8lhqic376v';

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
  if (!res.ok) {
    throw new Error(`${opts.method || 'GET'} ${full} → ${res.status}: ${JSON.stringify(data).slice(0, 400)}`);
  }
  return data;
}

function plain(html) {
  return String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function provider(p) {
  return p?.integration?.providerIdentifier || '';
}

function integId(p) {
  return p?.integration?.id || '';
}

function isLaneOrNews(text) {
  const t = text.toLowerCase();
  return (
    t.includes('imagine running a business') ||
    t.includes('salesforce is not just ahead') ||
    t.includes('58% is the number') ||
    t.includes('five platforms on the chart') ||
    t.includes('who still owns the crm') ||
    t.includes('betting the whole company') ||
    t.includes('source in the first comment') ||
    t.includes('australian smbs') ||
    t.includes('google gemini automates') ||
    t.includes('duct taping five different software')
  );
}

async function loadPost(key, id) {
  const data = await api(key, `${PUBLIC}/posts/${id}`);
  const items = Array.isArray(data) ? data : [data];
  const withImage = items.find((p) => Array.isArray(p?.image) && p.image.length);
  const withLong = items.find(
    (p) => String(p?.content || '').length > 80 && !/^https?:\/\//i.test(String(p?.content || '').trim()),
  );
  return withImage || withLong || items[0] || null;
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
  const seen = new Set();
  return imgs.filter((im) => {
    if (seen.has(im.id)) return false;
    seen.add(im.id);
    return true;
  });
}

async function main() {
  const key = loadKey();
  if (!key) throw new Error('Missing POSTIZ_API_KEY');

  const listed = await api(key, '/posts?startDate=2026-07-29T00:00:00.000Z&endDate=2026-08-01T14:00:00.000Z');
  const posts = listed.posts || [];
  console.log('Listed', posts.length, 'posts');

  const keepScheduleLi = new Set([
    // Lane 2 CRM for 15:00 Sydney
    'cms824eca001qob732qcwdlcv',
  ]);
  const publishNowLi = new Set([
    // Lane 3 hedge-fund missed LinkedIn at 13:00
    'cms80084h001lob736zmpstaf',
  ]);

  const deleteIds = [];
  for (const p of posts) {
    const id = p.id;
    const state = p.state;
    const prov = provider(p);
    const iid = integId(p);
    const text = plain(p.content);
    const when = p.publishDate || '';
    const isLi = iid === LI || prov === 'linkedin';
    const isIg = iid === IG || prov === 'instagram-standalone';
    if (!isLi && !isIg) continue;
    if (!isLaneOrNews(text)) continue;
    if (state === 'PUBLISHED') continue;
    if (keepScheduleLi.has(id) || publishNowLi.has(id)) continue;

    // Delete all remaining Lane/news DRAFT/QUEUE on LI + IG in this window
    if (['DRAFT', 'QUEUE', 'ERROR'].includes(state)) {
      deleteIds.push({ id, state, prov, when, preview: text.slice(0, 70) });
    }
  }

  console.log('\n=== Delete LI/IG clutter ===');
  for (const row of deleteIds) {
    console.log('DELETE', row.state, row.prov, row.when, row.id, row.preview);
    try {
      await api(key, `/posts/${row.id}`, { method: 'DELETE' });
      console.log('  ok');
    } catch (e) {
      console.log('  fail', e.message);
    }
  }

  console.log('\n=== Force-schedule CRM LinkedIn (15:00) ===');
  for (const id of keepScheduleLi) {
    try {
      const out = await api(key, `/posts/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: 'schedule' }),
      });
      console.log(id, '→', out);
    } catch (e) {
      console.log(id, 'fail', e.message);
    }
  }

  console.log('\n=== Publish missed Lane 3 LinkedIn now ===');
  for (const id of publishNowLi) {
    try {
      const post = await loadPost(key, id);
      if (!post) {
        console.log(id, 'not found');
        continue;
      }
      const content = post.content || '';
      const images = extractImages(post);
      const children = Array.isArray(post.children) ? post.children : [];
      const sourceComment =
        children.map((c) => c.content).find((c) => /^https?:\/\//i.test(String(c || '').trim())) ||
        '';
      const body = {
        type: 'now',
        date: new Date().toISOString(),
        shortLink: false,
        tags: [
          { value: 'no-ig-mirror', label: 'no-ig-mirror' },
          { value: 'lane-3', label: 'lane-3' },
        ],
        posts: [
          {
            integration: { id: LI },
            value: [
              { content, image: images },
              ...(sourceComment ? [{ content: sourceComment, image: [] }] : []),
            ],
            settings: { __type: 'linkedin' },
          },
        ],
      };
      const created = await api(key, '/posts', { method: 'POST', body: JSON.stringify(body) });
      console.log('published', JSON.stringify(created).slice(0, 250));
      // Park old draft
      try {
        await api(key, `/posts/${id}/status`, {
          method: 'PUT',
          body: JSON.stringify({ status: 'draft' }),
        });
      } catch {
        /* ignore */
      }
      try {
        await api(key, `/posts/${id}`, { method: 'DELETE' });
        console.log('deleted old draft', id);
      } catch (e) {
        console.log('old draft cleanup', e.message);
      }
    } catch (e) {
      console.log(id, 'fail', e.message);
    }
  }

  console.log('\n=== Recheck today LI/IG lane-ish ===');
  const again = await api(key, '/posts?startDate=2026-07-31T00:00:00.000Z&endDate=2026-08-01T14:00:00.000Z');
  for (const p of again.posts || []) {
    const iid = integId(p);
    const prov = provider(p);
    if (iid !== LI && iid !== IG && prov !== 'linkedin' && prov !== 'instagram-standalone') continue;
    const text = plain(p.content);
    if (!isLaneOrNews(text)) continue;
    console.log(
      p.state.padEnd(10),
      (prov || '?').padEnd(22),
      p.publishDate,
      p.id,
      text.slice(0, 60),
    );
  }
  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});

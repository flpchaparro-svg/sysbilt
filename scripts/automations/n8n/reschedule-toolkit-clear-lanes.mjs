#!/usr/bin/env node
/**
 * Reschedule queued toolkit / blog-carousel posts in Postiz so they do not
 * land on Lane 2 (Mon/Wed 15:00 Sydney) or Lane 3 (Tue/Thu/Sat 11:00 Sydney).
 *
 * Leaves lane-1/2/3 machine posts alone when we can recognise them.
 * Toolkit/carousel slots stay flexible (any safe hour).
 *
 *   node scripts/automations/n8n/reschedule-toolkit-clear-lanes.mjs          # dry-run
 *   node scripts/automations/n8n/reschedule-toolkit-clear-lanes.mjs --apply
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
const APPLY = process.argv.includes('--apply');

// Aug–Sep 2026 is AEST (UTC+10). Good enough for this calendar pass.
const SYDNEY_OFFSET_MS = 10 * 60 * 60 * 1000;
const PREFERRED_HOURS = [9, 12, 13, 16, 17, 19];
const START_ISO = '2026-07-31T14:00:00.000Z'; // Aug 1 Sydney
const END_ISO = '2026-09-30T13:59:59.000Z';

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
    throw new Error(`${opts.method || 'GET'} ${full} → ${res.status}: ${JSON.stringify(data).slice(0, 500)}`);
  }
  return data;
}

function parseMaybe(v, fallback) {
  if (v == null) return fallback;
  if (typeof v === 'string') {
    try {
      return JSON.parse(v);
    } catch {
      return fallback;
    }
  }
  return v;
}

function plain(html) {
  return String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function toSydneyParts(utcIso) {
  const d = new Date(new Date(utcIso).getTime() + SYDNEY_OFFSET_MS);
  return {
    y: d.getUTCFullYear(),
    m: d.getUTCMonth(),
    day: d.getUTCDate(),
    hour: d.getUTCHours(),
    minute: d.getUTCMinutes(),
    weekday: d.getUTCDay() === 0 ? 7 : d.getUTCDay(), // 1=Mon ... 7=Sun
    ms: d.getTime(),
  };
}

function fromSydney(y, m, day, hour, minute = 0) {
  const utc = Date.UTC(y, m, day, hour, minute, 0) - SYDNEY_OFFSET_MS;
  return new Date(utc);
}

function formatSydney(utcIso) {
  const p = toSydneyParts(utcIso);
  const names = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${names[p.weekday]} ${p.day} ${mon[p.m]} ${String(p.hour).padStart(2, '0')}:${String(p.minute).padStart(2, '0')}`;
}

function reservedLane(utcIso) {
  const p = toSydneyParts(utcIso);
  const mins = p.hour * 60 + p.minute;
  if ([2, 4, 6].includes(p.weekday) && Math.abs(mins - 11 * 60) <= 45) return 'L3';
  if ([1, 3].includes(p.weekday) && Math.abs(mins - 15 * 60) <= 45) return 'L2';
  return null;
}

function isLaneMachine(text, tags) {
  const tagVals = (tags || [])
    .map((t) => (typeof t === 'string' ? t : t?.value || t?.label || ''))
    .map((s) => String(s).toLowerCase());
  if (tagVals.some((t) => t === 'lane-1' || t === 'lane-2' || t === 'lane-3' || t === 'no-ig-mirror')) return true;
  const t = String(text || '').toLowerCase();
  return (
    t.includes('source in the first comment') ||
    t.includes('58% is the number everyone quotes') ||
    t.includes('five platforms on the chart') ||
    t.includes('imagine running a business and betting the whole company') ||
    t.includes('salesforce is not just ahead')
  );
}

function nextSafeSlot(fromUtcIso, takenMs) {
  const start = toSydneyParts(fromUtcIso);
  for (let day = 0; day < 45; day++) {
    const dayUtc = new Date(
      Date.UTC(start.y, start.m, start.day, 0, 0, 0) - SYDNEY_OFFSET_MS + day * 86400000,
    );
    const dp = toSydneyParts(dayUtc.toISOString());
    for (const hour of PREFERRED_HOURS) {
      const candidate = fromSydney(dp.y, dp.m, dp.day, hour, 0);
      if (candidate.getTime() <= new Date(fromUtcIso).getTime()) continue;
      const iso = candidate.toISOString();
      if (reservedLane(iso)) continue;
      let clash = false;
      for (const ms of takenMs) {
        if (Math.abs(candidate.getTime() - ms) < 30 * 60 * 1000) {
          clash = true;
          break;
        }
      }
      if (clash) continue;
      return candidate;
    }
  }
  return new Date(new Date(fromUtcIso).getTime() + 24 * 60 * 60 * 1000);
}

async function loadFull(key, id) {
  const data = await api(key, `${PUBLIC}/posts/${id}`);
  return Array.isArray(data) ? data : [data];
}

function buildUpdatePayload(items, newUtcIso) {
  const parent = items.find((p) => !p.parentPostId) || items[0];
  const children = items.filter((p) => p.parentPostId === parent.id);
  const settings = parseMaybe(parent.settings, {
    __type: parent.integration?.providerIdentifier || 'linkedin',
  });
  if (!settings.__type && parent.integration?.providerIdentifier) {
    settings.__type = parent.integration.providerIdentifier;
  }
  const images = parseMaybe(parent.image, []);
  const image = (Array.isArray(images) ? images : [])
    .map((im) => ({ id: im.id, path: im.path || im.url || '' }))
    .filter((im) => im.id && im.path);

  const value = [
    {
      content: parent.content || '',
      image,
    },
    ...children.map((ch) => ({
      content: ch.content || '',
      image: [],
    })),
  ];

  const tags = Array.isArray(parent.tags)
    ? parent.tags
        .map((t) => {
          if (typeof t === 'string') return { value: t, label: t };
          if (t?.value) return { value: t.value, label: t.label || t.value };
          return null;
        })
        .filter(Boolean)
    : [];

  // Postiz public POST /posts with an id often clones instead of updating.
  // Recreate without id, then DELETE the old post in apply mode.
  return {
    type: 'schedule',
    date: newUtcIso,
    shortLink: false,
    tags,
    posts: [
      {
        integration: { id: parent.integration?.id || parent.integrationId },
        value,
        settings,
      },
    ],
  };
}

async function main() {
  const key = loadKey();
  console.log(APPLY ? 'APPLY mode' : 'DRY-RUN (pass --apply to write)');

  const listed = await api(
    key,
    `/posts?startDate=${encodeURIComponent(START_ISO)}&endDate=${encodeURIComponent(END_ISO)}`,
  );
  const posts = listed.posts || listed || [];
  const queue = posts.filter((p) => p.state === 'QUEUE');
  console.log('QUEUE in window:', queue.length);

  const byId = new Map();
  for (const p of queue) {
    if (!byId.has(p.id)) byId.set(p.id, p);
  }

  const takenMs = new Set();
  for (const p of queue) {
    if (p.publishDate) takenMs.add(new Date(p.publishDate).getTime());
  }

  const moves = [];
  for (const p of byId.values()) {
    const text = plain(p.content);
    if (isLaneMachine(text, p.tags)) continue;

    const hit = reservedLane(p.publishDate);
    if (!hit) continue;

    const provider = p.integration?.providerIdentifier || '';
    if (!['linkedin', 'linkedin-page', 'facebook', 'instagram', 'instagram-standalone'].includes(provider)) {
      continue;
    }

    const full = await loadFull(key, p.id);
    const parent = full.find((x) => !x.parentPostId) || full[0];
    if (!parent?.integration?.id && !parent?.integrationId) {
      console.warn('skip (no integration)', p.id);
      continue;
    }

    const oldMs = new Date(parent.publishDate).getTime();
    takenMs.delete(oldMs);
    const next = nextSafeSlot(parent.publishDate, takenMs);
    const newIso = next.toISOString();
    takenMs.add(next.getTime());

    moves.push({
      id: parent.id,
      channel: parent.integration?.name || p.integration?.name,
      provider: parent.integration?.providerIdentifier || provider,
      from: formatSydney(parent.publishDate),
      to: formatSydney(newIso),
      reason: hit,
      text: text.slice(0, 90),
      payload: buildUpdatePayload(full, newIso),
    });

    await new Promise((r) => setTimeout(r, 120));
  }

  console.log('\nMoves needed:', moves.length);
  for (const m of moves) {
    console.log(`- ${m.channel} [${m.reason}] ${m.from} → ${m.to} | ${m.text}`);
  }

  if (!APPLY) {
    console.log('\nDry-run only. Re-run with --apply to update Postiz.');
    return;
  }

  let ok = 0;
  let fail = 0;
  for (const m of moves) {
    try {
      await api(key, '/posts', { method: 'POST', body: JSON.stringify(m.payload) });
      // Park original so it cannot still fire in the reserved window.
      // Postiz DELETE /posts/:id is unreliable (often 500); draft is enough.
      try {
        await api(key, `/posts/${m.id}/status`, {
          method: 'PUT',
          body: JSON.stringify({ status: 'draft' }),
        });
      } catch (e) {
        console.warn('draft-park warn', m.id, e.message || e);
      }
      ok++;
      console.log('moved', m.id, m.from, '→', m.to);
      await new Promise((r) => setTimeout(r, 400));
    } catch (e) {
      fail++;
      console.error('FAIL', m.id, e.message || e);
    }
  }
  console.log(`\nDone. ok=${ok} fail=${fail}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

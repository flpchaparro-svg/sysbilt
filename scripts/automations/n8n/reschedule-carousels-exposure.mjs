#!/usr/bin/env node
/**
 * Spread queued LinkedIn/IG carousels onto stronger exposure days/times
 * (Sydney), clear of Lane 2/3 reserved windows.
 *
 * Carousels = post_as_images_carousel (or 3+ images).
 * Recreate at new time, then park original as draft (Postiz "update" clones).
 *
 *   node scripts/automations/n8n/reschedule-carousels-exposure.mjs
 *   node scripts/automations/n8n/reschedule-carousels-exposure.mjs --apply
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MINI = process.env.SYSBILT_MINI_SSH || 'sysbilt@felipes-mac-mini-1.tail1e2dea.ts.net';
const BASE = 'https://postiz.sysbilt.com/api/public/v1';
const PUBLIC = 'https://postiz.sysbilt.com/api/public';
const APPLY = process.argv.includes('--apply');

const SYDNEY_OFFSET_MS = 10 * 60 * 60 * 1000;
const START_ISO = '2026-07-31T14:00:00.000Z';
const END_ISO = '2026-09-30T13:59:59.000Z';

// Premium first (Tue/Wed/Thu), then Mon/Fri. Avoid L2 15:00 and L3 11:00.
const SLOT_PLAN = [
  { weekdays: [2, 3, 4], hours: [8, 12, 17] }, // Tue Wed Thu
  { weekdays: [1, 5], hours: [8, 12] }, // Mon Fri fill
];

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

async function api(key, url, opts = {}, attempt = 0) {
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
  if (res.status === 429 && attempt < 8) {
    const wait = Math.min(60000, 2000 * 2 ** attempt);
    console.warn(`429 throttle, waiting ${wait}ms…`);
    await sleep(wait);
    return api(key, url, opts, attempt + 1);
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

function fingerprint(text) {
  return plain(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .slice(0, 120);
}

function toSydneyParts(utcIso) {
  const d = new Date(new Date(utcIso).getTime() + SYDNEY_OFFSET_MS);
  return {
    y: d.getUTCFullYear(),
    m: d.getUTCMonth(),
    day: d.getUTCDate(),
    hour: d.getUTCHours(),
    minute: d.getUTCMinutes(),
    weekday: d.getUTCDay() === 0 ? 7 : d.getUTCDay(),
  };
}

function fromSydney(y, m, day, hour, minute = 0) {
  return new Date(Date.UTC(y, m, day, hour, minute, 0) - SYDNEY_OFFSET_MS);
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
  if (tagVals.some((t) => t === 'lane-1' || t === 'lane-2' || t === 'lane-3' || t === 'no-ig-mirror')) {
    return true;
  }
  const t = String(text || '').toLowerCase();
  return (
    t.includes('source in the first comment') ||
    t.includes('58% is the number everyone quotes') ||
    t.includes('five platforms on the chart') ||
    t.includes('imagine running a business and betting the whole company') ||
    t.includes('salesforce is not just ahead')
  );
}

function eachSydneyDay(y, mStart, dStart, yEnd, mEnd, dEnd, fn) {
  let cur = fromSydney(y, mStart, dStart, 12, 0);
  const end = fromSydney(yEnd, mEnd, dEnd, 12, 0);
  while (cur.getTime() <= end.getTime()) {
    const p = toSydneyParts(cur.toISOString());
    fn(p);
    cur = new Date(cur.getTime() + 86400000);
  }
}

/** One carousel per weekday morning Aug→Sep (clears L2 15:00 / L3 11:00). */
function buildPremiumSlots(needed) {
  const nowPad = Date.now() + 60 * 60 * 1000;
  const slots = [];
  eachSydneyDay(2026, 7, 1, 2026, 8, 30, (p) => {
    if (![1, 2, 3, 4, 5].includes(p.weekday)) return;
    const candidate = fromSydney(p.y, p.m, p.day, 8, 0);
    if (candidate.getTime() < nowPad) return;
    if (reservedLane(candidate.toISOString())) return;
    slots.push(candidate);
  });
  if (slots.length < needed) {
    eachSydneyDay(2026, 7, 1, 2026, 8, 30, (p) => {
      if (![2, 3, 4].includes(p.weekday)) return;
      const candidate = fromSydney(p.y, p.m, p.day, 12, 0);
      if (candidate.getTime() < nowPad) return;
      if (reservedLane(candidate.toISOString())) return;
      slots.push(candidate);
    });
    slots.sort((a, b) => a - b);
  }
  return slots;
}

async function loadFull(key, id) {
  const data = await api(key, `${PUBLIC}/posts/${id}`);
  return Array.isArray(data) ? data : [data];
}

function isCarousel(parent) {
  const settings = parseMaybe(parent.settings, {});
  if (settings.post_as_images_carousel || settings.carousel_name) return true;
  const images = parseMaybe(parent.image, []);
  return Array.isArray(images) && images.length >= 3;
}

function buildCreatePayload(items, newUtcIso) {
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
    { content: parent.content || '', image },
    ...children.map((ch) => ({ content: ch.content || '', image: [] })),
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

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const key = loadKey();
  console.log(APPLY ? 'APPLY mode' : 'DRY-RUN (pass --apply to write)');

  const listed = await api(
    key,
    `/posts?startDate=${encodeURIComponent(START_ISO)}&endDate=${encodeURIComponent(END_ISO)}`,
  );
  const posts = (listed.posts || listed || []).filter((p) => p.state === 'QUEUE');
  console.log('QUEUE in window:', posts.length);

  const candidates = [];
  for (const p of posts) {
    if (isLaneMachine(plain(p.content), p.tags)) continue;
    const provider = p.integration?.providerIdentifier || '';
    if (!['linkedin', 'linkedin-page', 'instagram', 'instagram-standalone', 'facebook'].includes(provider)) {
      continue;
    }
    const full = await loadFull(key, p.id);
    const parent = full.find((x) => !x.parentPostId) || full[0];
    if (!isCarousel(parent)) continue;
    if (!parent?.integration?.id && !parent?.integrationId) continue;
    candidates.push({
      id: parent.id,
      provider,
      channel: parent.integration?.name || p.integration?.name,
      publishDate: parent.publishDate,
      text: plain(parent.content),
      fp: fingerprint(parent.content),
      full,
    });
    await sleep(80);
  }

  // Pair LI + IG by fingerprint + nearest publish time (duplicate captions exist).
  const linkedin = candidates
    .filter((c) => c.provider === 'linkedin' || c.provider === 'linkedin-page')
    .sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate));
  const others = candidates.filter((c) => c.provider !== 'linkedin' && c.provider !== 'linkedin-page');
  const usedOther = new Set();

  const units = linkedin.map((li) => {
    const twins = others
      .filter((o) => !usedOther.has(o.id) && o.fp === li.fp)
      .map((o) => ({
        o,
        dist: Math.abs(new Date(o.publishDate) - new Date(li.publishDate)),
      }))
      .sort((a, b) => a.dist - b.dist);
    const items = [li];
    if (twins[0] && twins[0].dist < 48 * 60 * 60 * 1000) {
      usedOther.add(twins[0].o.id);
      items.push(twins[0].o);
    }
    return {
      text: li.text,
      current: li.publishDate,
      items,
    };
  });

  // Orphan IG/FB carousels without a LI twin
  for (const o of others) {
    if (usedOther.has(o.id)) continue;
    units.push({ text: o.text, current: o.publishDate, items: [o] });
  }

  units.sort((a, b) => new Date(a.current) - new Date(b.current));

  // Do not reuse mornings already occupied by QUEUE (including prior successful moves).
  const takenMs = new Set();
  for (const p of posts) {
    if (!p.publishDate) continue;
    takenMs.add(new Date(p.publishDate).getTime());
  }
  const slots = buildPremiumSlots(units.length + 20).filter((s) => {
    for (const ms of takenMs) {
      if (Math.abs(s.getTime() - ms) < 30 * 60 * 1000) return false;
    }
    return true;
  });
  console.log('Carousel groups:', units.length, '| free slots:', slots.length);

  const moves = [];
  let slotIdx = 0;
  for (let i = 0; i < units.length; i++) {
    const unit = units[i];
    const p = toSydneyParts(unit.current);
    const alreadyPremium =
      [1, 2, 3, 4, 5].includes(p.weekday) &&
      p.hour === 8 &&
      p.minute <= 10 &&
      !reservedLane(unit.current);
    if (alreadyPremium) {
      console.log('keep', formatSydney(unit.current), '|', unit.text.slice(0, 70));
      continue;
    }

    const next = slots[slotIdx++];
    if (!next) {
      console.warn('ran out of slots for', unit.text.slice(0, 60));
      break;
    }
    const newIso = next.toISOString();
    takenMs.add(next.getTime());

    for (const it of unit.items) {
      moves.push({
        id: it.id,
        channel: it.channel,
        provider: it.provider,
        from: formatSydney(it.publishDate),
        to: formatSydney(newIso),
        text: unit.text.slice(0, 80),
        payload: buildCreatePayload(it.full, newIso),
      });
    }
  }

  console.log('\nMoves needed:', moves.length);
  for (const m of moves) {
    console.log(`- ${m.channel} ${m.from} → ${m.to} | ${m.text}`);
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
      try {
        await api(key, `/posts/${m.id}/status`, {
          method: 'PUT',
          body: JSON.stringify({ status: 'draft' }),
        });
      } catch (e) {
        console.warn('draft-park warn', m.id, e.message || e);
      }
      ok++;
      console.log('moved', m.channel, m.from, '→', m.to);
      await sleep(1200);
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

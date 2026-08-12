#!/usr/bin/env node
/**
 * Finish carousel day-spread by updating Post.publishDate in Postiz Postgres
 * (avoids public API 429). Runs the planner + UPDATE over SSH inside postiz.
 *
 *   node scripts/automations/n8n/reschedule-carousels-via-db.mjs
 *   node scripts/automations/n8n/reschedule-carousels-via-db.mjs --apply
 */
import { execFileSync } from 'node:child_process';

const APPLY = process.argv.includes('--apply');
const MINI = process.env.SYSBILT_MINI_SSH || 'sysbilt@felipes-mac-mini-1.tail1e2dea.ts.net';

const remoteJs = `
const { Client } = require('pg');
const APPLY = ${APPLY ? 'true' : 'false'};
const SYDNEY_OFFSET_MS = 10 * 60 * 60 * 1000;

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
  return names[p.weekday] + ' ' + p.day + ' ' + mon[p.m] + ' ' + String(p.hour).padStart(2, '0') + ':' + String(p.minute).padStart(2, '0');
}
function plain(html) {
  return String(html || '').replace(/<[^>]+>/g, ' ').replace(/\\s+/g, ' ').trim();
}
function fingerprint(text) {
  return plain(text).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().slice(0, 120);
}
function isPremium(utcIso) {
  const p = toSydneyParts(utcIso);
  return [1, 2, 3, 4, 5].includes(p.weekday) && p.hour === 8 && p.minute <= 10;
}
function buildSlotsAfter(afterMs, needed) {
  const slots = [];
  let cur = fromSydney(2026, 7, 1, 12, 0);
  const end = fromSydney(2026, 8, 30, 12, 0);
  while (cur <= end && slots.length < needed + 5) {
    const p = toSydneyParts(cur.toISOString());
    if ([1, 2, 3, 4, 5].includes(p.weekday)) {
      const s = fromSydney(p.y, p.m, p.day, 8, 0);
      if (s.getTime() > afterMs && s.getTime() > Date.now() + 60 * 60 * 1000) {
        slots.push(s);
      }
    }
    cur = new Date(cur.getTime() + 86400000);
  }
  return slots;
}

(async () => {
  const c = new Client({ connectionString: process.env.DATABASE_URL });
  await c.connect();
  const { rows: posts } = await c.query(\`
    SELECT p.id, p.state, p."publishDate", p.content, p."parentPostId",
           i."providerIdentifier" AS provider, i.name
    FROM "Post" p
    JOIN "Integration" i ON i.id = p."integrationId"
    WHERE p.state = 'QUEUE'
      AND p."publishDate" >= '2026-08-01'
      AND p."publishDate" < '2026-10-01'
      AND i."providerIdentifier" IN ('linkedin','instagram-standalone','instagram','linkedin-page','facebook')
      AND p."parentPostId" IS NULL
    ORDER BY p."publishDate" ASC
  \`);
  console.log(APPLY ? 'APPLY mode' : 'DRY-RUN');
  console.log('Parent QUEUE posts:', posts.length);

  const takenMs = new Set(posts.map((p) => new Date(p.publishDate).getTime()));
  const linkedin = posts.filter((p) => p.provider === 'linkedin' || p.provider === 'linkedin-page')
    .sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate));
  const others = posts.filter((p) => p.provider !== 'linkedin' && p.provider !== 'linkedin-page');
  const usedOther = new Set();
  const units = linkedin.map((li) => {
    const fp = fingerprint(li.content);
    const twins = others
      .filter((o) => !usedOther.has(o.id) && fingerprint(o.content) === fp)
      .map((o) => ({ o, dist: Math.abs(new Date(o.publishDate) - new Date(li.publishDate)) }))
      .sort((a, b) => a.dist - b.dist);
    const items = [li];
    if (twins[0] && twins[0].dist < 48 * 60 * 60 * 1000) {
      usedOther.add(twins[0].o.id);
      items.push(twins[0].o);
    }
    return { text: plain(li.content), current: li.publishDate, items };
  });
  for (const o of others) {
    if (usedOther.has(o.id)) continue;
    units.push({ text: plain(o.content), current: o.publishDate, items: [o] });
  }
  units.sort((a, b) => new Date(a.current) - new Date(b.current));

  const keep = units.filter((u) => isPremium(u.current));
  const needMove = units.filter((u) => !isPremium(u.current));
  let lastPremium = 0;
  for (const u of keep) {
    lastPremium = Math.max(lastPremium, new Date(u.current).getTime());
  }
  // Also treat occupied 08:00 mornings as taken even if from other posts
  for (const p of posts) {
    if (isPremium(p.publishDate)) {
      lastPremium = Math.max(lastPremium, new Date(p.publishDate).getTime());
    }
  }
  const slots = buildSlotsAfter(lastPremium, needMove.length + 5);
  console.log('Already on Mon-Fri 08:00:', keep.length);
  console.log('Still to move:', needMove.length, '| free slots after last premium:', slots.length);
  console.log('Continue from after:', lastPremium ? formatSydney(new Date(lastPremium).toISOString()) : 'n/a');

  const updates = [];
  let si = 0;
  for (const unit of needMove) {
    const next = slots[si++];
    if (!next) { console.warn('ran out of slots'); break; }
    for (const it of unit.items) {
      updates.push({
        id: it.id,
        channel: it.name,
        from: formatSydney(it.publishDate),
        to: formatSydney(next.toISOString()),
        iso: next.toISOString(),
        text: unit.text.slice(0, 70),
      });
    }
  }

  console.log('Planned updates:', updates.length);
  for (const u of updates) console.log('- ' + u.channel + ' ' + u.from + ' → ' + u.to + ' | ' + u.text);

  if (!APPLY) {
    console.log('Dry-run only. Re-run with --apply.');
    await c.end();
    return;
  }

  await c.query('BEGIN');
  let n = 0;
  for (const u of updates) {
    const r = await c.query(
      \`UPDATE "Post" SET "publishDate" = $1::timestamptz, "updatedAt" = NOW()
       WHERE id = $2 OR "parentPostId" = $2\`,
      [u.iso, u.id],
    );
    n += r.rowCount;
  }
  await c.query('COMMIT');
  console.log('Updated rows:', n);
  await c.end();
})().catch((e) => { console.error(e); process.exit(1); });
`;

const out = execFileSync(
  'ssh',
  ['-o', 'ConnectTimeout=20', '-o', 'BatchMode=yes', MINI, 'docker', 'exec', '-i', 'postiz', 'node'],
  { input: remoteJs, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 },
);
process.stdout.write(out);

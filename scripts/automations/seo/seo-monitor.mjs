#!/usr/bin/env node
/**
 * Monthly SEO monitor. Read-only. Checks the live site and the outside signals
 * that `verify-seo.mjs` cannot see, because that guard runs against `dist/`
 * before deploy and never looks at production, Google, or GA4.
 *
 * Two kinds of output:
 *   - INVARIANTS: things fixed on 21/22 Sep 2026 that must never regress. A
 *     broken invariant exits 1.
 *   - READINGS: numbers that move on their own (reviews, domain rank, local
 *     pack). Reported, never failed on.
 *
 * Usage:
 *   node scripts/automations/seo/seo-monitor.mjs            # full run
 *   node scripts/automations/seo/seo-monitor.mjs --crawl    # skip DataForSEO
 *
 * Needs `DataforSEO_felipe@sysbilt.com` in `.env.local` for the readings.
 * Set `SEO_MONITOR_WEBHOOK` to POST the summary to n8n for the Slack paste.
 *
 * No LLM call, so the DeepSeek off-peak rule does not apply: run any hour.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../../..');
const ORIGIN = 'https://sysbilt.com';
const CRAWL_ONLY = process.argv.includes('--crawl');

const TITLE_MAX = 60;
const DESCRIPTION_MAX = 160;
const CRAWL_CONCURRENCY = 8;

/** Route prefixes that are deliberately noindex: funnel, Learn, private helpers. */
const NOINDEX_BY_DESIGN = ['/go', '/go/local-pack', '/learn', '/learn/gemini', '/news'];

const failures = [];
const notes = [];
const readings = [];

const fail = (msg) => failures.push(msg);
const note = (msg) => notes.push(msg);

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

async function loadEnvLocal() {
  const env = {};
  try {
    const raw = await readFile(path.join(ROOT, '.env.local'), 'utf8');
    for (const line of raw.split('\n')) {
      const match = line.match(/^([^#=\s][^=]*)=(.*)$/);
      if (match) env[match[1].trim()] = match[2].trim();
    }
  } catch {
    // Absent in CI. The crawl half still runs.
  }
  return env;
}

// ---------------------------------------------------------------- invariants

/** Every sitemap URL must be 200, self-canonical, single-h1, and within length limits. */
async function crawlSitemap() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) {
    fail(`sitemap.xml returned ${res.status}`);
    return [];
  }
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (urls.length === 0) {
    fail('sitemap.xml lists no URLs');
    return [];
  }

  const rows = [];
  let cursor = 0;
  async function worker() {
    while (cursor < urls.length) {
      const url = urls[cursor++];
      try {
        const page = await fetch(url, { redirect: 'manual' });
        const html = page.status === 200 ? await page.text() : '';
        const title = decodeEntities((html.match(/<title>([^<]*)<\/title>/) || [, ''])[1]).trim();
        const description = decodeEntities(
          (html.match(/<meta name="description" content="([^"]*)"/) || [, ''])[1]
        ).trim();
        rows.push({
          url,
          status: page.status,
          xRobots: page.headers.get('x-robots-tag') || '',
          title,
          description,
          canonical: (html.match(/rel="canonical" href="([^"]*)"/) || [, ''])[1] || '',
          robotsMeta: (html.match(/<meta name="robots" content="([^"]*)"/) || [, ''])[1] || '',
          h1Count: (html.match(/<h1[\s>]/g) || []).length,
        });
      } catch (error) {
        rows.push({ url, status: 'ERROR', error: String(error) });
      }
    }
  }
  await Promise.all(Array.from({ length: CRAWL_CONCURRENCY }, worker));

  const bad = rows.filter((r) => r.status !== 200);
  if (bad.length) {
    fail(`${bad.length} sitemap URL(s) are not 200: ${bad.map((r) => `${r.status} ${r.url}`).join(', ')}`);
  }

  const ok = rows.filter((r) => r.status === 200);
  const longTitles = ok.filter((r) => r.title.length > TITLE_MAX);
  if (longTitles.length) {
    fail(
      `${longTitles.length} title(s) over ${TITLE_MAX} characters: ${longTitles
        .map((r) => `${r.title.length} ${r.url}`)
        .join(', ')}`
    );
  }

  const missingTitle = ok.filter((r) => !r.title);
  if (missingTitle.length) fail(`${missingTitle.length} page(s) with no title`);

  const noCanonical = ok.filter((r) => !r.canonical);
  if (noCanonical.length) fail(`${noCanonical.length} page(s) with no canonical`);

  const wrongCanonical = ok.filter(
    (r) => r.canonical && r.canonical.replace(/\/$/, '') !== r.url.replace(/\/$/, '')
  );
  if (wrongCanonical.length) {
    fail(
      `${wrongCanonical.length} page(s) canonical to another URL: ${wrongCanonical
        .map((r) => `${r.url} -> ${r.canonical}`)
        .join(', ')}`
    );
  }

  const noindexed = ok.filter(
    (r) => /noindex/i.test(r.xRobots) || /noindex/i.test(r.robotsMeta)
  );
  if (noindexed.length) {
    fail(`${noindexed.length} noindex page(s) inside the sitemap: ${noindexed.map((r) => r.url).join(', ')}`);
  }

  const badH1 = ok.filter((r) => r.h1Count !== 1);
  if (badH1.length) {
    fail(`${badH1.length} page(s) without exactly one h1: ${badH1.map((r) => `${r.h1Count} ${r.url}`).join(', ')}`);
  }

  // Length only, not a hard rule: Google truncates but does not penalise.
  const longDescriptions = ok.filter((r) => r.description.length > DESCRIPTION_MAX);
  if (longDescriptions.length) {
    note(
      `${longDescriptions.length} meta description(s) over ${DESCRIPTION_MAX} characters: ${longDescriptions
        .map((r) => `${r.description.length} ${r.url}`)
        .join(', ')}`
    );
  }
  const missingDescription = ok.filter((r) => !r.description);
  if (missingDescription.length) {
    note(`${missingDescription.length} page(s) with no meta description`);
  }

  readings.push(`Sitemap: ${rows.length} URLs, all 200, ${longTitles.length} long titles`);
  return rows;
}

/** Unknown URLs must 404, not answer 200 with the homepage body and canonical. */
async function checkNotFound() {
  const probes = [
    `/does-not-exist-${Date.now()}`,
    `/blog/does-not-exist-${Date.now()}`,
    `/toolkit/does-not-exist-${Date.now()}`,
    `/guides/does-not-exist-${Date.now()}`,
  ];
  for (const probe of probes) {
    const res = await fetch(`${ORIGIN}${probe}`, { redirect: 'manual' });
    if (res.status !== 404) {
      fail(`soft 404 regression: ${probe} returned ${res.status}, expected 404`);
      continue;
    }
    const html = await res.text();
    if (/rel="canonical"/.test(html)) {
      fail(`404 regression: ${probe} carries a canonical tag`);
    }
    if (!/noindex/i.test(res.headers.get('x-robots-tag') || '') && !/name="robots"[^>]*noindex/i.test(html)) {
      fail(`404 regression: ${probe} is not noindexed`);
    }
  }
}

/** The funnel and Learn must stay noindex, or they land in the duplicate-canonical buckets. */
async function checkNoindexByDesign() {
  for (const route of NOINDEX_BY_DESIGN) {
    const res = await fetch(`${ORIGIN}${route}`, { redirect: 'manual' });
    const header = res.headers.get('x-robots-tag') || '';
    if (!/noindex/i.test(header)) {
      fail(`${route} should be noindex by design but X-Robots-Tag is "${header || 'absent'}"`);
    }
  }
}

/** A sitemap that advertises a redirect wastes crawl budget. */
async function checkSitemapHasNoRedirects(rows) {
  const redirecting = rows.filter((r) => typeof r.status === 'number' && r.status >= 300 && r.status < 400);
  if (redirecting.length) {
    fail(`sitemap advertises ${redirecting.length} redirect(s): ${redirecting.map((r) => r.url).join(', ')}`);
  }
}

// ------------------------------------------------------------------ readings

async function dataForSeo(endpoint, body, auth) {
  const res = await fetch(`https://api.dataforseo.com/v3/${endpoint}`, {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify([body]),
  });
  if (!res.ok) throw new Error(`DataForSEO ${endpoint} returned ${res.status}`);
  const json = await res.json();
  const task = json.tasks?.[0];
  if (task?.status_code !== 20000) throw new Error(`DataForSEO ${endpoint}: ${task?.status_message}`);
  return task.result;
}

async function pullReadings(env) {
  const password = env['DataforSEO_felipe@sysbilt.com'];
  if (!password) {
    note('DataForSEO credential missing from .env.local, readings skipped');
    return;
  }
  const auth = Buffer.from(`felipe@sysbilt.com:${password}`).toString('base64');

  try {
    const [summary] = await dataForSeo('backlinks/summary/live', { target: 'sysbilt.com' }, auth);
    readings.push(
      `Domain rank ${summary.rank ?? 0}, ${summary.referring_domains ?? 0} referring domains, ` +
        `${summary.backlinks ?? 0} backlinks, spam score ${summary.backlinks_spam_score ?? 0}`
    );
    if ((summary.referring_domains ?? 0) > 11) {
      note(
        `Referring domains moved to ${summary.referring_domains}. Check whether any are legitimate, ` +
          `then tick the off-page list in SEO_MASTER.md.`
      );
    }
  } catch (error) {
    note(`Backlink summary failed: ${error.message}`);
  }

  try {
    const [brand] = await dataForSeo(
      'serp/google/organic/live/advanced',
      {
        keyword: 'sysbilt',
        location_name: 'Sydney,New South Wales,Australia',
        language_code: 'en',
        depth: 20,
      },
      auth
    );
    const reviews = brand.items?.find((i) => i.type === 'google_reviews');
    if (reviews) {
      readings.push(`Google reviews: ${reviews.reviews_count} at ${reviews.rating?.value}`);
    } else {
      note('Could not read the Google review count from the brand SERP');
    }
  } catch (error) {
    note(`Brand SERP failed: ${error.message}`);
  }

  for (const keyword of ['ai agency sydney', 'ai consultant sydney']) {
    try {
      const [serp] = await dataForSeo(
        'serp/google/organic/live/advanced',
        {
          keyword,
          location_name: 'Sydney,New South Wales,Australia',
          language_code: 'en',
          depth: 20,
        },
        auth
      );
      const pack = (serp.items || []).filter((i) => i.type === 'local_pack');
      const holders = pack
        .map((i) => `${i.title} (${i.rating?.votes_count ?? 0})`)
        .join(', ');
      const us = pack.find((i) => /sysbilt/i.test(i.title || '') || i.domain === 'sysbilt.com');
      const organic = (serp.items || []).find(
        (i) => i.type === 'organic' && i.domain === 'sysbilt.com'
      );
      readings.push(
        `"${keyword}" pack: ${holders || 'none'}. SYSBILT ${us ? `in pack at ${us.rank_group}` : 'not in pack'}` +
          `, organic ${organic ? `#${organic.rank_group}` : 'not ranking'}`
      );
    } catch (error) {
      note(`SERP for "${keyword}" failed: ${error.message}`);
    }
  }
}

// -------------------------------------------------------------------- report

function buildReport(date) {
  const lines = [`# SEO monitor, ${date}`, ''];

  lines.push(failures.length ? `## Regressions (${failures.length})` : '## Regressions');
  lines.push('');
  lines.push(...(failures.length ? failures.map((f) => `- ${f}`) : ['- None. Every invariant still holds.']));
  lines.push('');

  lines.push('## Readings');
  lines.push('');
  lines.push(...(readings.length ? readings.map((r) => `- ${r}`) : ['- None collected.']));
  lines.push('');

  if (notes.length) {
    lines.push('## Worth a look');
    lines.push('');
    lines.push(...notes.map((n) => `- ${n}`));
    lines.push('');
  }

  lines.push('Invariants come from the 21 and 22 September 2026 fixes. Strategy lives in');
  lines.push('`docs/internal/SEARCH_LANE_BRIEF.md`, technical state in `docs/internal/SEO_MASTER.md`.');
  return lines.join('\n');
}

async function main() {
  const env = await loadEnvLocal();
  const date = new Date().toISOString().slice(0, 10);

  const rows = await crawlSitemap();
  await checkSitemapHasNoRedirects(rows);
  await checkNotFound();
  await checkNoindexByDesign();
  if (!CRAWL_ONLY) await pullReadings(env);

  const report = buildReport(date);
  console.log(report);

  const outDir = path.join(ROOT, '.build');
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, `seo-monitor-${date}.md`), `${report}\n`);

  const webhook = process.env.SEO_MONITOR_WEBHOOK || env.SEO_MONITOR_WEBHOOK;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, ok: failures.length === 0, failures, readings, notes, report }),
      });
      console.log('\nPosted to SEO_MONITOR_WEBHOOK.');
    } catch (error) {
      console.log(`\nWebhook post failed: ${error.message}`);
    }
  }

  process.exit(failures.length === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

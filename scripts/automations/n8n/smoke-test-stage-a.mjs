#!/usr/bin/env node
/**
 * Stage A smoke test — mirrors SYSBILT - Social Distribute (stub + draft, Facebook only).
 * Does not call Groq or n8n; validates Postiz API path end-to-end.
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../..');
const BASE = 'https://postiz.sysbilt.com/api/public/v1';
const FB_ID = 'cmqdhhxms0001pe760w6chubg';
const IMAGE =
  process.env.SMOKE_IMAGE_URL ||
  'https://cdn.sanity.io/images/wdlc9pg8/production/d2ffe029f21bd6aed51c6b1085543ad4cfa77f95-1200x896.jpg';

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
  const res = await fetch(`${BASE}${path}`, { ...opts, headers: { ...headers, ...opts.headers } });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) throw new Error(`${opts.method || 'GET'} ${path} → ${res.status}: ${JSON.stringify(data)}`);
  return data;
}

const provider = (i) => i.providerIdentifier || i.platform || i.provider || i.identifier || '';
const slotISO = new Date(Date.now() + 86400000).toISOString();

const ints = await api('/integrations');
const fb = ints.filter((i) => provider(i) === 'facebook');
console.log(`Integrations: ${ints.length} total, ${fb.length} facebook`);
if (!fb.length) {
  console.error('No Facebook integration — connect in Postiz UI first');
  process.exit(1);
}

const upload = await api('/upload-from-url', {
  method: 'POST',
  body: JSON.stringify({ url: IMAGE }),
});
console.log('Upload OK:', upload.id);

const caption = `[[STUB Facebook]] Stage A smoke test\nhttps://sysbilt.com/news`;
const body = {
  type: 'draft',
  date: slotISO,
  shortLink: false,
  tags: [],
  posts: [
    {
      integration: { id: FB_ID },
      value: [{ content: caption, image: [{ id: upload.id, path: IMAGE }] }],
      settings: { __type: 'facebook' },
    },
  ],
};

const post = await api('/posts', { method: 'POST', body: JSON.stringify(body) });
console.log('Draft post created:', post.id || post);
console.log('Check https://postiz.sysbilt.com/launches for the draft');

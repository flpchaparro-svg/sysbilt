#!/usr/bin/env node
import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '../..');

function loadToken() {
  for (const key of ['SANITY_API_TOKEN', 'SANITY_API_WRITE_TOKEN', 'SANITY_AUTH_TOKEN']) {
    if (process.env[key]) return process.env[key];
  }
  try {
    const env = readFileSync(resolve(ROOT, '.env.local'), 'utf8');
    for (const key of ['SANITY_API_TOKEN', 'SANITY_API_WRITE_TOKEN', 'SANITY_AUTH_TOKEN']) {
      const match = env.match(new RegExp(`^${key}=(.+)$`, 'm'));
      if (match?.[1]) return match[1].trim();
    }
  } catch {
    /* ignore */
  }
  throw new Error('Add SANITY_API_TOKEN to .env.local (Sanity → API → Tokens, Editor role).');
}

const body = JSON.parse(
  readFileSync(resolve(import.meta.dirname, 'chatgpt-blog-post-body.json'), 'utf8'),
);

const client = createClient({
  projectId: 'wdlc9pg8',
  dataset: 'production',
  apiVersion: '2024-02-20',
  token: loadToken(),
  useCdn: false,
});

const docId = 'post-chatgpt-small-business';

await client.patch(`drafts.${docId}`).set({ body }).commit();
console.log('Patched draft body:', docId, `(${body.length} blocks)`);

await client
  .transaction()
  .createOrReplace({
    ...(await client.fetch('*[_id == $id][0]', { id: `drafts.${docId}` })),
    _id: docId,
  })
  .delete(`drafts.${docId}`)
  .commit();

console.log('Published:', docId);

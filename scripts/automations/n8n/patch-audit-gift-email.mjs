#!/usr/bin/env node
/**
 * Patch Audit Runner "Gmail Draft to prospect" with Cold Emails V2 Template A (gift audit).
 * Usage: node scripts/automations/n8n/patch-audit-gift-email.mjs
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../..');
const OUTBOUND_ID = 'zOZh6wE70PikOCqI';

function loadEnvLocal() {
  const path = resolve(ROOT, '.env.local');
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#') || !t.includes('=')) continue;
    const i = t.indexOf('=');
    const key = t.slice(0, i).trim();
    const val = t.slice(i + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvLocal();
const N8N_BASE = (process.env.N8N_BASE_URL || 'https://n8n.sysbilt.com').replace(/\/$/, '');
const N8N_KEY = process.env.N8N_API_KEY || process.env['cursor-mcp'];
if (!N8N_KEY) {
  console.error('Missing N8N_API_KEY or cursor-mcp');
  process.exit(1);
}

async function n8n(method, path, body) {
  const res = await fetch(`${N8N_BASE}/api/v1${path}`, {
    method,
    headers: {
      'X-N8N-API-KEY': N8N_KEY,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text };
  }
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status}: ${text.slice(0, 400)}`);
  return json;
}

function applyGiftEmail(node) {
  node.parameters = node.parameters || {};
  node.parameters.subject =
    "={{ (() => { const f = $('Filter').item.json; const company = f.properties?.company?.value || f._sheetRow?.['Business Name'] || 'your business'; return 'I had a look at ' + company; })() }}";
  node.parameters.emailType = 'html';
  node.parameters.message = `={{ (() => {
  const f = $('Filter').item.json;
  const sheet = f._sheetRow || {};
  const company = String(f.properties?.company?.value || sheet['Business Name'] || 'your business').trim();
  const ownerRaw = String(f.properties?.firstname?.value || sheet['Owner Name'] || '').trim();
  const parts = ownerRaw.split(/\\s+/).filter(Boolean);
  let firstName = '';
  if (parts.length >= 2) {
    const part = parts[0].replace(/[^a-zA-Z'-]/g, '');
    if (part.length >= 2) firstName = part;
  }
  const greeting = firstName ? ('Hi ' + firstName + ',') : 'Hi,';
  const auditUrl = String($('Vercel Push').item.json.url || '').trim();
  const diagnosis = (() => {
    try {
      const parsed = $('Parse Audit JSON').item.json || {};
      const critical = parsed?.audit_data?.diagnosis?.critical || {};
      const consequence = String(critical.consequence || '').trim();
      const title = String(critical.title || '').trim();
      const pick = consequence || title;
      if (!pick) return '';
      if (/scored\\s+\\d+/i.test(pick) || /\\d+\\s*out of\\s*100/i.test(pick)) return '';
      return pick.replace(/[.!]+$/g, '');
    } catch (_) {
      return '';
    }
  })();
  const standout = diagnosis
    || 'the site is costing you enquiries before people ever speak to you';
  const esc = (s) => String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return [
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#222">',
    '<p style="margin:0 0 14px">' + esc(greeting) + '</p>',
    '<p style="margin:0 0 14px">I ran a proper look over ' + esc(company) + ' this week: the site, how you come up in search, your Google listing, your reviews. Wrote it up as a report. It\\'s yours, no charge and nothing expected back.</p>',
    '<p style="margin:0 0 14px"><a href="' + esc(auditUrl) + '" style="color:#1a73e8;text-decoration:underline">Open the report here</a>.</p>',
    '<p style="margin:0 0 14px">The short version: ' + esc(standout) + '.</p>',
    '<p style="margin:0 0 14px">Have a read. If anything in there doesn\\'t make sense, reply and I\\'ll explain it properly.</p>',
    '<p style="margin:0 0 14px">Felipe<br>SYSBILT</p>',
    '<p style="margin:0;color:#666;font-size:12px;line-height:1.4">If you\\'d rather not hear from us again, reply &quot;no thanks&quot; and that\\'s the end of it.</p>',
    '</div>',
  ].join('');
})() }}`;
}

async function main() {
  const wf = await n8n('GET', `/workflows/${OUTBOUND_ID}`);
  const node = (wf.nodes || []).find((n) => n.name === 'Gmail Draft to prospect');
  if (!node) throw new Error('Gmail Draft to prospect not found');
  applyGiftEmail(node);
  await n8n('PUT', `/workflows/${OUTBOUND_ID}`, {
    name: wf.name,
    nodes: wf.nodes,
    connections: wf.connections,
    settings: { executionOrder: wf.settings?.executionOrder || 'v1' },
  });
  console.log('Patched Gmail Draft to prospect on', OUTBOUND_ID);
  console.log('Template A subject:', node.parameters.subject.includes('I had a look at'));
  console.log('Open the report here:', node.parameters.message.includes('Open the report here'));
  console.log('No product P.S.:', !node.parameters.message.includes('Hosted Website Plan'));
  console.log('Two-line sign-off:', node.parameters.message.includes('Felipe<br>SYSBILT</p>'));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

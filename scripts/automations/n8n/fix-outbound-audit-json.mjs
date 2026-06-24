#!/usr/bin/env node
/**
 * Add Parse Audit JSON code node (reliable JS) + simplify Vercel Push.
 * Fixes n8n expression regex failures that still sent error payloads.
 */
import { readFileSync, existsSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../..');
const WORKFLOW_ID = 'zOZh6wE70PikOCqI';

const FORMAT_AI_OUTPUT_JS = `const raw = $input.first().json || {};
const value =
  raw.message?.content ??
  raw.text ??
  raw.output ??
  raw.content?.parts?.[0]?.text ??
  raw.choices?.[0]?.message?.content ??
  '';
const text = typeof value === 'string' ? value : JSON.stringify(value);
return [{ json: { content: { parts: [{ text }] } } }];`;

const PARSE_AUDIT_JSON_JS = `function repairAuditJson(raw) {
  let t = String(raw || '').replace(/^\\\`\\\`\\\`(json)?/mi, '').replace(/\\\`\\\`\\\$/mi, '').trim();
  t = t.replace(/[\\u0000-\\u001F]+/g, ' ');
  t = t.replace(/,\\s*([}\\]])/g, '$1');
  t = t.replace(/"([a-zA-Z_][a-zA-Z0-9_]*)"\\s+\\\\"/g, '"$1": "');
  t = t.replace(/"([a-zA-Z_][a-zA-Z0-9_]*) "(?=[^:])/g, '"$1": "');
  const m = t.match(/\\{[\\s\\S]*\\}/);
  return m ? m[0] : t;
}

function parseAuditText(raw) {
  if (raw && typeof raw === 'object' && !Array.isArray(raw)) return raw;
  const cleaned = repairAuditJson(raw);
  try {
    return JSON.parse(cleaned);
  } catch (first) {
    const m = cleaned.match(/\\{[\\s\\S]*\\}/);
    if (m) return JSON.parse(repairAuditJson(m[0]));
    throw first;
  }
}

const filter = $('Filter').item.json;
const company = filter.properties.company?.value || 'Unknown';
const firstName = filter.properties.firstname?.value || '';
const email = filter._realEmail || filter.properties.email?.value || 'Unknown';

try {
  const rawStr = $('Master Analyst').item.json.content.parts[0].text;
  const auditObj = parseAuditText(rawStr);
  return [{
    json: {
      contact_first_name: firstName,
      contact_email: email,
      company_name: company,
      audit_data: auditObj,
    },
  }];
} catch (e) {
  return [{
    json: {
      contact_first_name: firstName,
      contact_email: email,
      company_name: company,
      audit_data: {
        diagnosis: {
          critical: {
            title: 'Failed to parse AI JSON',
            evidence: String(e.message || e),
            consequence: 'The audit model returned malformed JSON. Re-run the workflow or inspect Master Analyst output in n8n.',
          },
          secondary: [],
        },
      },
    },
  }];
}`;

function loadEnv() {
  const path = resolve(ROOT, '.env.local');
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m && !process.env[m[1].trim()]) process.env[m[1].trim()] = m[2].trim();
  }
}

loadEnv();
const N8N_BASE = (process.env.N8N_BASE_URL || 'https://n8n.sysbilt.com').replace(/\/$/, '');
const N8N_KEY = process.env.N8N_API_KEY || process.env['cursor-mcp'];

const n8n = async (method, path, body) => {
  const res = await fetch(`${N8N_BASE}/api/v1${path}`, {
    method,
    headers: { 'X-N8N-API-KEY': N8N_KEY, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${JSON.stringify(data)}`);
  return data;
};

async function main() {
  const wf = await n8n('GET', `/workflows/${WORKFLOW_ID}`);

  for (const name of ['Client deep research', 'Client brief', 'Master Analyst']) {
    const node = wf.nodes.find((n) => n.name === name && n.type === 'n8n-nodes-base.code');
    if (node) node.parameters = { mode: 'runOnceForAllItems', jsCode: FORMAT_AI_OUTPUT_JS };
  }

  const masterFmt = wf.nodes.find((n) => n.name === 'Master Analyst');
  const vercel = wf.nodes.find((n) => n.name === 'Vercel Push');
  if (!masterFmt || !vercel) throw new Error('Missing Master Analyst or Vercel Push');

  let parseNode = wf.nodes.find((n) => n.name === 'Parse Audit JSON');
  if (!parseNode) {
    parseNode = {
      id: randomUUID(),
      name: 'Parse Audit JSON',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [masterFmt.position[0] + 160, masterFmt.position[1]],
      parameters: { mode: 'runOnceForAllItems', jsCode: PARSE_AUDIT_JSON_JS },
    };
    wf.nodes.push(parseNode);
  } else {
    parseNode.parameters.jsCode = PARSE_AUDIT_JSON_JS;
    parseNode.parameters.mode = 'runOnceForAllItems';
  }

  vercel.parameters.jsonBody = '={{ JSON.stringify($json) }}';

  wf.connections['Master Analyst'] = {
    main: [[{ node: 'Parse Audit JSON', type: 'main', index: 0 }]],
  };
  wf.connections['Parse Audit JSON'] = {
    main: [[{ node: 'Vercel Push', type: 'main', index: 0 }]],
  };

  await n8n('PUT', `/workflows/${WORKFLOW_ID}`, {
    name: wf.name,
    nodes: wf.nodes,
    connections: wf.connections,
    settings: { executionOrder: 'v1' },
  });

  console.log('Added Parse Audit JSON code node; Vercel Push now posts $json directly');
  console.log(`${N8N_BASE}/workflow/${WORKFLOW_ID}`);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});

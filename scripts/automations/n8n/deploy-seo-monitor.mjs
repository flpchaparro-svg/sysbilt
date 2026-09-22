#!/usr/bin/env node
/**
 * Deploy SYSBILT - SEO Monitor
 *
 * Receives the report from `scripts/automations/seo/seo-monitor.mjs` and posts
 * it to Slack. The crawl itself runs on Felipe's machine (launchd, monthly),
 * because it needs the repo and the DataForSEO credential in `.env.local`.
 *
 *   node scripts/automations/n8n/deploy-seo-monitor.mjs
 *   node scripts/automations/n8n/deploy-seo-monitor.mjs --activate
 *
 * Env: N8N_API_KEY / cursor-mcp. Slack: SYSBILT Slack credential.
 * Channel: SEO_MONITOR_SLACK_CHANNEL, SLACK_CHANNEL, or #content.
 *
 * Read-only monitor with no model call, so the DeepSeek off-peak rule does not
 * apply. Nothing here changes the site.
 */
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../..');

function loadEnvLocal() {
  const path = resolve(ROOT, '.env.local');
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (!m) continue;
    const key = m[1].trim();
    if (!process.env[key]) process.env[key] = m[2].trim();
  }
}

loadEnvLocal();

const N8N_BASE = (process.env.N8N_BASE_URL || 'https://n8n.sysbilt.com').replace(/\/$/, '');
const N8N_KEY = process.env.N8N_API_KEY || process.env['cursor-mcp'];
const SLACK_CRED_NAME = 'SYSBILT Slack';
const WEBHOOK_PATH = 'sysbilt-seo-monitor';
const WORKFLOW_NAME = 'SYSBILT - SEO Monitor';

if (!N8N_KEY) {
  console.error('Missing N8N_API_KEY or cursor-mcp in .env.local');
  process.exit(1);
}

const n8n = async (method, path, body) => {
  const res = await fetch(`${N8N_BASE}/api/v1${path}`, {
    method,
    headers: { 'X-N8N-API-KEY': N8N_KEY, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${JSON.stringify(data)}`);
  return data;
};

/**
 * Slack message. A clean month is one line, so it stays glanceable and a
 * regression is impossible to miss in the channel.
 */
const FORMAT_JS = `
const body = $input.first().json.body || $input.first().json;
const date = body.date || new Date().toISOString().slice(0, 10);
const failures = body.failures || [];
const readings = body.readings || [];
const notes = body.notes || [];

const lines = [];
if (failures.length) {
  lines.push('*SEO monitor ' + date + ': ' + failures.length + ' regression' + (failures.length === 1 ? '' : 's') + '*');
  lines.push('');
  for (const f of failures) lines.push('• ' + f);
} else {
  lines.push('*SEO monitor ' + date + ': all clear*');
}

if (readings.length) {
  lines.push('');
  lines.push('*Readings*');
  for (const r of readings) lines.push('• ' + r);
}

if (notes.length) {
  lines.push('');
  lines.push('*Worth a look*');
  for (const n of notes) lines.push('• ' + n);
}

return [{ json: { slack_text: lines.join('\\n'), ok: failures.length === 0 } }];
`.trim();

function buildWorkflow(slackCredId, slackChannel) {
  const ids = {
    hook: randomUUID(),
    format: randomUUID(),
    slack: randomUUID(),
  };

  const nodes = [
    {
      id: ids.hook,
      name: 'SEO Report In',
      type: 'n8n-nodes-base.webhook',
      typeVersion: 2,
      position: [0, 0],
      webhookId: WEBHOOK_PATH,
      parameters: {
        path: WEBHOOK_PATH,
        httpMethod: 'POST',
        responseMode: 'onReceived',
        options: {},
      },
    },
    {
      id: ids.format,
      name: 'Format Report',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [240, 0],
      parameters: { jsCode: FORMAT_JS },
    },
  ];

  if (slackCredId) {
    nodes.push({
      id: ids.slack,
      name: 'Slack Post',
      type: 'n8n-nodes-base.slack',
      typeVersion: 2.2,
      position: [480, 0],
      credentials: { slackApi: { id: slackCredId, name: SLACK_CRED_NAME } },
      continueOnFail: true,
      parameters: {
        select: 'channel',
        channelId: { __rl: true, value: slackChannel, mode: 'name' },
        text: '={{ $json.slack_text }}',
        otherOptions: { includeLinkToWorkflow: false },
      },
    });
  } else {
    nodes.push({
      id: ids.slack,
      name: 'Slack Post',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [480, 0],
      parameters: { jsCode: 'return $input.all();' },
    });
  }

  return {
    name: WORKFLOW_NAME,
    nodes,
    connections: {
      'SEO Report In': { main: [[{ node: 'Format Report', type: 'main', index: 0 }]] },
      'Format Report': { main: [[{ node: 'Slack Post', type: 'main', index: 0 }]] },
    },
    settings: { executionOrder: 'v1', timezone: 'Australia/Sydney' },
  };
}

async function upsertWorkflow(workflow) {
  const { data } = await n8n('GET', '/workflows?limit=250');
  const list = data?.data || data || [];
  const existing = list.find((w) => w.name === workflow.name);
  const body = {
    name: workflow.name,
    nodes: workflow.nodes,
    connections: workflow.connections,
    settings: workflow.settings,
  };
  if (existing) {
    const updated = await n8n('PUT', `/workflows/${existing.id}`, body);
    console.log(`Updated workflow "${workflow.name}" (${updated.id})`);
    return updated;
  }
  const created = await n8n('POST', '/workflows', body);
  console.log(`Created workflow "${workflow.name}" (${created.id})`);
  return created;
}

async function ensureSlackCredential() {
  const statePath = resolve(__dirname, '.deploy-state.env');
  if (!process.env.SLACK_CREDENTIAL_ID && existsSync(statePath)) {
    const m = readFileSync(statePath, 'utf8').match(/^SLACK_CREDENTIAL_ID=(.+)$/m);
    if (m) process.env.SLACK_CREDENTIAL_ID = m[1].trim();
  }
  if (process.env.SLACK_CREDENTIAL_ID) return process.env.SLACK_CREDENTIAL_ID;

  try {
    const { data } = await n8n('GET', '/workflows?limit=250');
    const list = data?.data || data || [];
    for (const candidate of list) {
      const full = await n8n('GET', `/workflows/${candidate.id}`);
      for (const node of full.nodes || []) {
        const id = node.credentials?.slackApi?.id;
        if (id) {
          console.log('Reusing Slack credential from', candidate.name, id);
          return id;
        }
      }
    }
  } catch (error) {
    console.warn('Could not scan workflows for a Slack credential:', error.message || error);
  }

  console.warn('No Slack credential found. Deploying without Slack; rerun once SYSBILT Slack exists.');
  return null;
}

async function main() {
  const activate = process.argv.includes('--activate');
  const slackCredId = await ensureSlackCredential();
  const slackChannel =
    process.env.SEO_MONITOR_SLACK_CHANNEL || process.env.SLACK_CHANNEL || '#content';

  const deployed = await upsertWorkflow(buildWorkflow(slackCredId, slackChannel));

  if (activate) {
    await n8n('POST', `/workflows/${deployed.id}/activate`, {});
    console.log('Activated');
  } else {
    try {
      await n8n('POST', `/workflows/${deployed.id}/deactivate`, {});
    } catch {
      /* already inactive */
    }
    console.log('Deployed inactive (pass --activate to enable)');
  }

  const statePath = resolve(__dirname, '.deploy-state.env');
  const existing = existsSync(statePath) ? readFileSync(statePath, 'utf8') : '';
  const lines = existing.split('\n').filter((l) => l && !l.startsWith('SEO_MONITOR_WORKFLOW_ID='));
  lines.push(`SEO_MONITOR_WORKFLOW_ID=${deployed.id}`);
  if (slackCredId && !lines.some((l) => l.startsWith('SLACK_CREDENTIAL_ID='))) {
    lines.push(`SLACK_CREDENTIAL_ID=${slackCredId}`);
  }
  writeFileSync(statePath, `${lines.filter(Boolean).join('\n')}\n`);

  const webhookUrl = `${N8N_BASE}/webhook/${WEBHOOK_PATH}`;
  console.log(`\nWorkflow: ${N8N_BASE}/workflow/${deployed.id}`);
  console.log(`Webhook:  POST ${webhookUrl}`);
  console.log(`Slack:    ${slackChannel}`);
  console.log(`\nAdd to .env.local:\n  SEO_MONITOR_WEBHOOK=${webhookUrl}`);
  console.log('Then: bash scripts/automations/seo/install-launchd.sh');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});

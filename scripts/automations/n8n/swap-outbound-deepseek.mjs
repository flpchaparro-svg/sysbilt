#!/usr/bin/env node
/**
 * Swap Gemini → DeepSeek on SYSBILT - Outbound Audit Runner.
 */
import { readFileSync, existsSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../..');
const WORKFLOW_ID = 'zOZh6wE70PikOCqI';
const DEEPSEEK_CRED = { id: 'XgmuWh1nV8XX7x83', name: 'SYSBILT DeepSeek' };

const FORMAT_AI_OUTPUT_JS = `const raw = $input.first().json || {};
const text =
  raw.message?.content ||
  raw.text ||
  raw.output ||
  raw.content?.parts?.[0]?.text ||
  raw.choices?.[0]?.message?.content ||
  '';
return [{ json: { content: { parts: [{ text: String(text) }] } } }];`;

const SWAPS = [
  { name: 'Client deep research', model: 'deepseek-chat', jsonOutput: true },
  { name: 'Client brief', model: 'deepseek-chat', jsonOutput: false },
  { name: 'Master Analyst', model: 'deepseek-reasoner', jsonOutput: true },
];

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
if (!N8N_KEY) process.exit(1);

const n8n = async (method, path, body) => {
  const res = await fetch(`${N8N_BASE}/api/v1${path}`, {
    method,
    headers: { 'X-N8N-API-KEY': N8N_KEY, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${JSON.stringify(data)}`);
  return data;
};

const uid = () => randomUUID();

function geminiToDeepSeek(node, { model, jsonOutput }) {
  const prompt = node.parameters?.messages?.values?.[0]?.content || '';
  return {
    ...node,
    type: '@n8n/n8n-nodes-langchain.openAi',
    typeVersion: 1.1,
    retryOnFail: true,
    maxTries: 3,
    waitBetweenTries: 8000,
    credentials: { openAiApi: DEEPSEEK_CRED },
    parameters: {
      model,
      messages: { values: [{ content: prompt }] },
      ...(jsonOutput ? { jsonOutput: true } : {}),
      options: {},
    },
  };
}

function findDownstream(connections, nodeName) {
  const targets = [];
  for (const [from, conn] of Object.entries(connections)) {
    if (from !== nodeName) continue;
    for (const branch of conn.main || []) {
      for (const edge of branch || []) targets.push(edge.node);
    }
  }
  return targets;
}

function retargetIncoming(connections, fromName, toName) {
  for (const conn of Object.values(connections)) {
    for (const branch of conn.main || []) {
      for (const edge of branch || []) {
        if (edge.node === fromName) edge.node = toName;
      }
    }
  }
}

async function main() {
  const wf = await n8n('GET', `/workflows/${WORKFLOW_ID}`);

  for (const swap of SWAPS) {
    const idx = wf.nodes.findIndex((n) => n.name === swap.name);
    if (idx === -1) throw new Error(`Missing node: ${swap.name}`);

    const geminiNode = wf.nodes[idx];
    const downstream = findDownstream(wf.connections, swap.name);
    if (downstream.length !== 1) {
      throw new Error(`Expected 1 downstream for ${swap.name}, got ${downstream.join(', ')}`);
    }
    const nextNode = downstream[0];
    const llmName = `DS ${swap.name}`;

    const llmNode = geminiToDeepSeek({ ...geminiNode, name: llmName, id: uid() }, swap);
    const formatNode = {
      id: uid(),
      name: swap.name,
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [geminiNode.position[0] + 140, geminiNode.position[1]],
      parameters: { mode: 'runOnceForAllItems', jsCode: FORMAT_AI_OUTPUT_JS },
    };

    llmNode.position = [geminiNode.position[0] - 140, geminiNode.position[1]];

    wf.nodes[idx] = llmNode;
    wf.nodes.push(formatNode);

    retargetIncoming(wf.connections, swap.name, llmName);
    delete wf.connections[swap.name];
    wf.connections[llmName] = { main: [[{ node: swap.name, type: 'main', index: 0 }]] };
    wf.connections[swap.name] = { main: [[{ node: nextNode, type: 'main', index: 0 }]] };
  }

  const vercel = wf.nodes.find((n) => n.name === 'Vercel Push');
  if (vercel?.parameters?.jsonBody) {
    vercel.parameters.jsonBody = vercel.parameters.jsonBody.replace(
      'Gemini produced an invalid JSON format',
      'DeepSeek produced an invalid JSON format',
    );
  }

  await n8n('PUT', `/workflows/${WORKFLOW_ID}`, {
    name: wf.name,
    nodes: wf.nodes,
    connections: wf.connections,
    settings: { executionOrder: 'v1' },
  });

  console.log(`Updated ${wf.name}`);
  console.log('DeepSeek: deepseek-chat (research/brief), deepseek-reasoner (Master Analyst)');
  console.log(`${N8N_BASE}/workflow/${WORKFLOW_ID}`);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});

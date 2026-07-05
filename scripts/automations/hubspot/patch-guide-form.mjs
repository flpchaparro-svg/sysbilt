#!/usr/bin/env node
/**
 * Fix HubSpot "Guide Download" form:
 * - Adds all guide_downloaded checkbox options (fixes "no options" publish error)
 * - Adds hidden lead_source_detail field
 *
 * Note: lifecyclestage is set by the website API + n8n upsert directly on the
 * contact record — it does not need to be on the form.
 *
 * Usage: node scripts/automations/hubspot/patch-guide-form.mjs
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../..');
const FORM_ID = '6702ab07-e01e-42c7-97b5-3cc68822b566';

const GUIDE_OPTIONS = [
  { label: 'Ai Assistants', value: 'ai_assistants', description: '', displayOrder: 0 },
  { label: 'Content Systems', value: 'content_systems', description: '', displayOrder: 1 },
  { label: 'Team Training', value: 'team_training', description: '', displayOrder: 2 },
  { label: 'websites', value: 'websites', description: '', displayOrder: 3 },
  { label: 'Revenue Engine', value: 'revenue_engine', description: '', displayOrder: 4 },
  { label: 'Lead Tracking', value: 'lead_tracking', description: '', displayOrder: 5 },
  { label: 'automation', value: 'automation', description: '', displayOrder: 6 },
  { label: 'dashboards', value: 'dashboards', description: '', displayOrder: 7 },
  {
    label: 'Construction Ecosystem',
    value: 'how_to_build_connected_construction_ecosystem',
    description: '',
    displayOrder: 8,
  },
  {
    label: 'Branded Carousel System',
    value: 'how_to_build_a_branded_carousel_system',
    description: '',
    displayOrder: 9,
  },
];

function loadToken() {
  const path = resolve(ROOT, '.env.local');
  if (!existsSync(path)) throw new Error('Missing .env.local');
  const line = readFileSync(path, 'utf8')
    .split('\n')
    .find((l) => l.startsWith('HUBSPOT_PRIVATE_APP_TOKEN='));
  if (!line) throw new Error('HUBSPOT_PRIVATE_APP_TOKEN not in .env.local');
  return line.slice('HUBSPOT_PRIVATE_APP_TOKEN='.length).trim();
}

async function main() {
  const token = loadToken();
  const getRes = await fetch(`https://api.hubapi.com/marketing/v3/forms/${FORM_ID}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const form = await getRes.json();
  if (!getRes.ok) throw new Error(`GET form failed: ${JSON.stringify(form)}`);

  const fields = form.fieldGroups[0].fields;
  const visible = fields.filter((f) => f.name !== 'guide_downloaded');
  const guideField = fields.find((f) => f.name === 'guide_downloaded');
  if (guideField) {
    guideField.options = GUIDE_OPTIONS;
    guideField.hidden = true;
    guideField.required = false;
  }

  form.fieldGroups[0].fields = visible;

  const hasHiddenGroup = form.fieldGroups.some((g) =>
    g.fields?.some((f) => f.name === 'guide_downloaded'),
  );
  if (!hasHiddenGroup && guideField) {
    form.fieldGroups.push({
      groupType: 'default_group',
      richTextType: 'text',
      fields: [guideField],
    });
  }

  const hasLeadSource = form.fieldGroups.some((g) =>
    g.fields?.some((f) => f.name === 'lead_source_detail'),
  );
  if (!hasLeadSource) {
    form.fieldGroups.push({
      groupType: 'default_group',
      richTextType: 'text',
      fields: [
        {
          objectTypeId: '0-1',
          name: 'lead_source_detail',
          label: 'Lead Source Detail',
          required: false,
          hidden: true,
          fieldType: 'single_line_text',
        },
      ],
    });
  }

  const patchRes = await fetch(`https://api.hubapi.com/marketing/v3/forms/${FORM_ID}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
  const out = await patchRes.json();
  if (!patchRes.ok) throw new Error(`PATCH failed: ${JSON.stringify(out)}`);

  console.log('Guide Download form patched successfully.\nFields:');
  for (const group of out.fieldGroups) {
    for (const fld of group.fields) {
      const optCount = fld.options?.length ?? 0;
      console.log(`  ${fld.name.padEnd(22)} hidden=${fld.hidden} options=${optCount || 'n/a'}`);
    }
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});

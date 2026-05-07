import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export interface NotionRichText {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  color?: string;
  href?: string | null;
}

export type NotionBlock =
  | { type: 'heading_1'; text: NotionRichText[] }
  | { type: 'heading_2'; text: NotionRichText[] }
  | { type: 'heading_3'; text: NotionRichText[] }
  | { type: 'paragraph'; text: NotionRichText[] }
  | { type: 'bulleted_list_item'; text: NotionRichText[] }
  | { type: 'numbered_list_item'; text: NotionRichText[] }
  | { type: 'quote'; text: NotionRichText[] }
  | { type: 'callout'; icon: string | null; text: NotionRichText[] }
  | { type: 'divider' }
  | { type: 'toggle'; text: NotionRichText[]; children: NotionBlock[] }
  | { type: 'unsupported'; original: string };

export interface ProposalPageProperties {
  pageId: string;
  pageUrl: string;
  title: string;
  clientBusinessName: string;
  pillars: string[];
  totalFeeAUD: number | null;
  status: string;
  sentDate: string | null;
  validUntil: string | null;
  acceptedDate: string | null;
  acceptedByName: string;
  hubspotDealId: string;
  hubspotDealUrl: string;
  notionProposalUrl: string;
}

export interface ProposalPage {
  properties: ProposalPageProperties;
  blocks: NotionBlock[];
}

function rt(items: any[]): NotionRichText[] {
  if (!Array.isArray(items)) return [];
  return items.map((item) => ({
    text: item.plain_text ?? '',
    bold: item.annotations?.bold || undefined,
    italic: item.annotations?.italic || undefined,
    underline: item.annotations?.underline || undefined,
    code: item.annotations?.code || undefined,
    color: item.annotations?.color === 'default' ? undefined : item.annotations?.color,
    href: item.href ?? null,
  }));
}

async function fetchChildren(blockId: string): Promise<NotionBlock[]> {
  const result: NotionBlock[] = [];
  let cursor: string | undefined;
  do {
    const resp: any = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    });
    for (const b of resp.results) {
      result.push(await blockToTyped(b));
    }
    cursor = resp.next_cursor ?? undefined;
  } while (cursor);
  return result;
}

async function blockToTyped(block: any): Promise<NotionBlock> {
  const type = block.type;
  switch (type) {
    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
    case 'paragraph':
    case 'bulleted_list_item':
    case 'numbered_list_item':
    case 'quote':
      return { type, text: rt(block[type]?.rich_text ?? []) } as NotionBlock;
    case 'callout':
      return {
        type: 'callout',
        icon: block.callout?.icon?.emoji ?? null,
        text: rt(block.callout?.rich_text ?? []),
      };
    case 'divider':
      return { type: 'divider' };
    case 'toggle': {
      const children = block.has_children ? await fetchChildren(block.id) : [];
      return {
        type: 'toggle',
        text: rt(block.toggle?.rich_text ?? []),
        children,
      };
    }
    default:
      return { type: 'unsupported', original: String(type) };
  }
}

function readTitle(prop: any): string {
  return prop?.title?.map((t: any) => t.plain_text).join('') ?? '';
}
function readText(prop: any): string {
  return prop?.rich_text?.map((t: any) => t.plain_text).join('') ?? '';
}
function readMultiSelect(prop: any): string[] {
  return prop?.multi_select?.map((s: any) => s.name) ?? [];
}
function readNumber(prop: any): number | null {
  return prop?.number ?? null;
}
function readStatus(prop: any): string {
  return prop?.status?.name ?? '';
}
function readDate(prop: any): string | null {
  return prop?.date?.start ?? null;
}
function readUrl(prop: any): string {
  return prop?.url ?? '';
}

function pageToProperties(page: any): ProposalPageProperties {
  const p = page.properties ?? {};
  return {
    pageId: page.id,
    pageUrl: page.url,
    title: readTitle(p['Title']),
    clientBusinessName: readText(p['Client business name']),
    pillars: readMultiSelect(p['Pillar']),
    totalFeeAUD: readNumber(p['Total fee (AUD)']),
    status: readStatus(p['Status']),
    sentDate: readDate(p['Sent date']),
    validUntil: readDate(p['Valid until']),
    acceptedDate: readDate(p['Accepted date']),
    acceptedByName: readText(p['Accepted by name']),
    hubspotDealId: readText(p['HubSpot Deal ID']),
    hubspotDealUrl: readUrl(p['HubSpot Deal URL']),
    notionProposalUrl: readUrl(p['Notion proposal URL']),
  };
}

export function extractNotionPageId(url: string): string | null {
  const dashed = url.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  if (dashed) return dashed[0];
  const flat = url.match(/[0-9a-f]{32}/i);
  if (flat) {
    const id = flat[0];
    return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;
  }
  return null;
}

export async function fetchProposalPage(notionProposalUrl: string): Promise<ProposalPage | null> {
  const pageId = extractNotionPageId(notionProposalUrl);
  if (!pageId) return null;
  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    const blocks = await fetchChildren(pageId);
    return {
      properties: pageToProperties(page),
      blocks,
    };
  } catch (err) {
    return null;
  }
}

export async function markProposalAccepted(
  pageId: string,
  acceptedByName: string,
  acceptedDateISO: string,
): Promise<void> {
  await notion.pages.update({
    page_id: pageId,
    properties: {
      'Status': { status: { name: 'Accepted' } },
      'Accepted date': { date: { start: acceptedDateISO } },
      'Accepted by name': { rich_text: [{ type: 'text', text: { content: acceptedByName } }] },
    },
  });
}

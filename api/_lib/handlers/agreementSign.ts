import type { VercelRequest, VercelResponse } from '@vercel/node';
import { signAgreementToken, requireAdmin } from '../auth.js';
import { extractNotionPageId } from '../notion.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    requireAdmin(req.headers as Record<string, string | string[] | undefined>);
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { notionUrl } = (req.body ?? {}) as { notionUrl?: string };
  if (!notionUrl || typeof notionUrl !== 'string') {
    res.status(400).json({ error: 'notionUrl is required (Notion agreement page URL or ID)' });
    return;
  }

  const pageId = extractNotionPageId(notionUrl);
  if (!pageId) {
    res.status(400).json({ error: 'Could not extract Notion page ID from URL' });
    return;
  }

  const token = signAgreementToken(pageId);
  const baseUrl = process.env.PUBLIC_BASE_URL ?? 'https://sysbilt.com';
  const url = `${baseUrl}/agreement/${token}`;

  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ token, url, agreementPageId: pageId });
}

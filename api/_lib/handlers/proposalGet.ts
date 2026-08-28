import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyProposalToken } from '../auth.js';
import { getDealBundle } from '../hubspot.js';
import { fetchProposalPage } from '../notion.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const tokenParam = req.query.token;
  const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;
  if (!token || typeof token !== 'string') {
    res.status(400).json({ error: 'Missing token' });
    return;
  }

  let dealId: string;
  try {
    const payload = verifyProposalToken(token);
    dealId = payload.dealId;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid token';
    res.status(401).json({ error: message });
    return;
  }

  try {
    const bundle = await getDealBundle(dealId);

    if (!bundle.deal.notion_proposal_url) {
      res.status(404).json({
        error: 'No proposal URL set on this HubSpot deal. Paste the Notion page URL into the "Notion proposal URL" field on the deal.',
      });
      return;
    }

    const proposal = await fetchProposalPage(bundle.deal.notion_proposal_url);
    if (!proposal) {
      res.status(404).json({
        error: 'Could not fetch the Notion proposal page. Check that the page exists and the SYSBILT Proposal Renderer integration is connected to it (or its parent database).',
      });
      return;
    }

    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({
      deal: bundle.deal,
      contact: bundle.contact,
      company: bundle.company,
      proposal,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server error';
    res.status(500).json({ error: message });
  }
}

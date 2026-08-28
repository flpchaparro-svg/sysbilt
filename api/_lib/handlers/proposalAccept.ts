import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyProposalToken } from '../auth.js';
import { getDealBundle, progressDealStage, addDealNote } from '../hubspot.js';
import { fetchProposalPage, markProposalAccepted } from '../notion.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { token, name, position, accepted } = (req.body ?? {}) as {
    token?: string;
    name?: string;
    position?: string;
    accepted?: boolean;
  };

  if (!token || !name || !position || accepted !== true) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  if (name.trim().length < 2 || position.trim().length < 2) {
    res.status(400).json({ error: 'Name and position must be at least 2 characters' });
    return;
  }

  let dealId: string;
  try {
    const payload = verifyProposalToken(token);
    dealId = payload.dealId;
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
    return;
  }

  try {
    const bundle = await getDealBundle(dealId);
    if (!bundle.deal.notion_proposal_url) {
      res.status(404).json({ error: 'No proposal URL on deal' });
      return;
    }

    const proposal = await fetchProposalPage(bundle.deal.notion_proposal_url);
    if (!proposal) {
      res.status(404).json({ error: 'Proposal page not found' });
      return;
    }

    const today = new Date();
    const todayISO = today.toISOString().slice(0, 10);
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 'unknown';
    const ua = (req.headers['user-agent'] as string) || 'unknown';

    // Update Notion proposal page
    await markProposalAccepted(proposal.properties.pageId, name.trim(), todayISO);

    // Update HubSpot: stage moves forward to Negotiating only if currently below Negotiating
    const negotiatingStage = process.env.HUBSPOT_NEGOTIATING_DEAL_STAGE || 'contractsent';
    let stageMoved = false;
    try {
      stageMoved = await progressDealStage(dealId, negotiatingStage);
    } catch (err) {
      console.error('HubSpot stage update failed', err);
    }

    const noteBody = `Proposal accepted via sysbilt.com on ${today.toLocaleString('en-AU', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'Australia/Sydney',
    })}. Accepted by ${name.trim()}, ${position.trim()}. IP: ${ip}. User agent: ${ua}.`;
    await addDealNote(dealId, noteBody);

    res.status(200).json({
      ok: true,
      acceptedDate: todayISO,
      acceptedByName: name.trim(),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server error';
    console.error('Accept failed', err);
    res.status(500).json({ error: message });
  }
}

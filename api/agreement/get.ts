import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAgreementToken } from '../_lib/auth.js';
import { getDealBundle } from '../_lib/hubspot.js';
import { fetchAgreementPage } from '../_lib/notion.js';

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

  let agreementPageId: string;
  try {
    const payload = verifyAgreementToken(token);
    agreementPageId = payload.agreementPageId;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid token';
    res.status(401).json({ error: message });
    return;
  }

  try {
    const agreement = await fetchAgreementPage(agreementPageId);
    if (!agreement) {
      res.status(404).json({
        error:
          'Could not fetch the Notion agreement page. Check that the page exists and the SYSBILT Proposal Renderer integration is connected to the Live Agreements database.',
      });
      return;
    }

    const dealId = agreement.properties.hubspotDealId;
    if (!dealId) {
      res.status(400).json({
        error:
          'Agreement is missing the HubSpot Deal ID property. Set it on the Notion agreement page before sharing the link.',
      });
      return;
    }

    let bundle = null;
    try {
      bundle = await getDealBundle(dealId);
    } catch (err) {
      console.error('HubSpot deal lookup failed', err);
    }

    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({
      agreement,
      deal: bundle?.deal ?? null,
      contact: bundle?.contact ?? null,
      company: bundle?.company ?? null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server error';
    console.error('Agreement get failed', err);
    res.status(500).json({ error: message });
  }
}

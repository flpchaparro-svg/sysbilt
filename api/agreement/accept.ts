import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAgreementToken } from '../_lib/auth.js';
import { progressDealStage, addDealNote } from '../_lib/hubspot.js';
import { fetchAgreementPage, markAgreementSigned } from '../_lib/notion.js';

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

  let agreementPageId: string;
  try {
    const payload = verifyAgreementToken(token);
    agreementPageId = payload.agreementPageId;
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
    return;
  }

  try {
    const agreement = await fetchAgreementPage(agreementPageId);
    if (!agreement) {
      res.status(404).json({ error: 'Agreement not found' });
      return;
    }

    const dealId = agreement.properties.hubspotDealId;
    if (!dealId) {
      res.status(400).json({ error: 'Agreement is missing HubSpot Deal ID property' });
      return;
    }

    const today = new Date();
    const todayISO = today.toISOString().slice(0, 10);
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 'unknown';
    const ua = (req.headers['user-agent'] as string) || 'unknown';

    await markAgreementSigned(agreement.properties.pageId, name.trim(), position.trim(), todayISO);

    const wonStage = process.env.HUBSPOT_ACCEPTED_DEAL_STAGE || 'closedwon';
    let stageMoved = false;
    try {
      stageMoved = await progressDealStage(dealId, wonStage);
    } catch (err) {
      console.error('HubSpot stage update failed', err);
    }

    const noteBody = `Agreement (MSA) signed via sysbilt.com on ${today.toLocaleString('en-AU', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'Australia/Sydney',
    })}. Signed by ${name.trim()}, ${position.trim()}. IP: ${ip}. User agent: ${ua}.${stageMoved ? ' Deal stage moved to Won.' : ' Deal stage was already at or beyond Won, no change.'}`;
    await addDealNote(dealId, noteBody);

    res.status(200).json({
      ok: true,
      signedDate: todayISO,
      signedByName: name.trim(),
      signedByPosition: position.trim(),
      stageMoved,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server error';
    console.error('Agreement accept failed', err);
    res.status(500).json({ error: message });
  }
}

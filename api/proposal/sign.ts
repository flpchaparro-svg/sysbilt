import type { VercelRequest, VercelResponse } from '@vercel/node';
import { signProposalToken, requireAdmin } from '../_lib/auth.js';

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

  const { dealId } = (req.body ?? {}) as { dealId?: string };
  if (!dealId || typeof dealId !== 'string' || !/^\d+$/.test(dealId)) {
    res.status(400).json({ error: 'Invalid dealId. Must be a numeric HubSpot deal ID.' });
    return;
  }

  const token = signProposalToken(dealId);
  const baseUrl = process.env.PUBLIC_BASE_URL ?? 'https://sysbilt.com';
  const url = `${baseUrl}/proposal/${token}`;

  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ token, url, dealId });
}

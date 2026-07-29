import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAuditReportToken } from '../_lib/auth.js';
import { getDeepAuditReport } from '../_lib/reportsStore.js';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
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

  let reportId: string;
  try {
    const payload = verifyAuditReportToken(token);
    reportId = payload.reportId;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid token';
    res.status(401).json({ error: message });
    return;
  }

  try {
    const record = await getDeepAuditReport(reportId);
    if (!record) {
      res.status(404).json({ error: 'Report not found or expired' });
      return;
    }

    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({
      contact_email: record.contact_email,
      company_name: record.company_name,
      contact_first_name: record.contact_first_name,
      offer_product: record.offer_product,
      lh_mobile: record.lh_mobile,
      audit_data: record.audit_data,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server error';
    res.status(500).json({ error: message });
  }
}

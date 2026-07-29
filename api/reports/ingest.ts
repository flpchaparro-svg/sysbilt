import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'node:crypto';
import { requireN8nWebhook, signAuditReportToken } from '../_lib/auth.js';
import { saveDeepAuditReport, type DeepAuditReportRecord } from '../_lib/reportsStore.js';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    requireN8nWebhook(req.headers as Record<string, string | string[] | undefined>);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unauthorized';
    res.status(401).json({ error: message });
    return;
  }

  const body = (req.body ?? {}) as {
    contact_email?: unknown;
    company_name?: unknown;
    contact_first_name?: unknown;
    offer_product?: unknown;
    lh_mobile?: unknown;
    audit_data?: unknown;
  };

  const contactEmail =
    typeof body.contact_email === 'string' ? body.contact_email.trim() : '';
  const companyName = typeof body.company_name === 'string' ? body.company_name.trim() : '';
  const contactFirstName =
    typeof body.contact_first_name === 'string' ? body.contact_first_name.trim() : '';
  const offerProduct =
    typeof body.offer_product === 'string' ? body.offer_product.trim() : '';
  const lhMobile = typeof body.lh_mobile === 'string' ? body.lh_mobile.trim() : '';
  const auditData = body.audit_data;

  if (!contactEmail) {
    res.status(400).json({ error: 'Missing or invalid contact_email' });
    return;
  }
  if (!companyName) {
    res.status(400).json({ error: 'Missing or invalid company_name' });
    return;
  }
  if (
    auditData == null ||
    typeof auditData !== 'object' ||
    Array.isArray(auditData)
  ) {
    res.status(400).json({ error: 'Missing or invalid audit_data (expected a JSON object)' });
    return;
  }

  const diagnosis = (auditData as { diagnosis?: { critical?: { title?: unknown; evidence?: unknown } } })
    .diagnosis;
  const critical = diagnosis?.critical;
  if (
    !critical ||
    typeof critical !== 'object' ||
    !String(critical.title ?? '').trim() ||
    !String(critical.evidence ?? '').trim()
  ) {
    res.status(400).json({
      error: 'Invalid audit_data: diagnosis.critical.title and .evidence are required',
    });
    return;
  }
  if (
    (auditData as { helpful?: unknown }).helpful === true &&
    typeof (auditData as { response?: unknown }).response === 'string'
  ) {
    res.status(400).json({ error: 'Invalid audit_data: stub model response rejected' });
    return;
  }

  const reportId = crypto.randomUUID();
  const record: DeepAuditReportRecord = {
    contact_email: contactEmail,
    company_name: companyName,
    ...(contactFirstName ? { contact_first_name: contactFirstName } : {}),
    ...(offerProduct ? { offer_product: offerProduct } : {}),
    ...(lhMobile ? { lh_mobile: lhMobile } : {}),
    audit_data: auditData,
  };

  let token: string;
  try {
    token = signAuditReportToken(reportId);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not sign token';
    res.status(500).json({ error: message });
    return;
  }

  try {
    await saveDeepAuditReport(reportId, record);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not persist report';
    res.status(503).json({ error: message });
    return;
  }

  const baseUrl = (process.env.PUBLIC_BASE_URL ?? 'https://sysbilt.com').replace(/\/$/, '');
  const url = `${baseUrl}/reports/${token}`;

  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ url });
}

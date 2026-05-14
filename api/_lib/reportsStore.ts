import { kv } from '@vercel/kv';

/** Aligns with audit report token TTL in `auth.ts` (90 days). */
const TTL_SECONDS = 90 * 24 * 60 * 60;
const KEY_PREFIX = 'deepAudit:';

export interface DeepAuditReportRecord {
  contact_email: string;
  company_name: string;
  audit_data: unknown;
}

function assertKvEnv(): void {
  if (!process.env.KV_REST_API_URL?.trim() || !process.env.KV_REST_API_TOKEN?.trim()) {
    throw new Error(
      'Vercel KV is not configured. Set KV_REST_API_URL and KV_REST_API_TOKEN (link a KV / Upstash Redis store in the Vercel project).'
    );
  }
}

export async function saveDeepAuditReport(reportId: string, record: DeepAuditReportRecord): Promise<void> {
  assertKvEnv();
  await kv.set(`${KEY_PREFIX}${reportId}`, record, { ex: TTL_SECONDS });
}

export async function getDeepAuditReport(reportId: string): Promise<DeepAuditReportRecord | null> {
  assertKvEnv();
  const data = await kv.get<DeepAuditReportRecord>(`${KEY_PREFIX}${reportId}`);
  if (data == null) return null;
  if (typeof data !== 'object' || Array.isArray(data)) return null;
  return data;
}

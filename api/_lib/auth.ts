import crypto from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const TOKEN_TTL_DAYS = 90;

/**
 * `vercel dev` does not always inject `.env.local` into Node serverless handlers.
 * Merge missing keys from `.env.local` when present (local dev only; file is not deployed).
 */
function loadEnvLocalIfMissing(): void {
  try {
    const path = join(process.cwd(), '.env.local');
    if (!existsSync(path)) return;
    const text = readFileSync(path, 'utf8');
    for (const line of text.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!key) continue;
      if (process.env[key] === undefined || process.env[key] === '') {
        process.env[key] = value;
      }
    }
  } catch {
    // ignore missing/unreadable .env.local
  }
}

loadEnvLocalIfMissing();

export interface ProposalTokenPayload {
  dealId: string;
  exp: number;
}

function base64url(input: Buffer | string): string {
  const buf = typeof input === 'string' ? Buffer.from(input) : input;
  return buf.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function fromBase64url(input: string): Buffer {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4));
  return Buffer.from(padded + pad, 'base64');
}

function hmac(payload: string): string {
  const secret = process.env.PROPOSAL_SIGNING_SECRET;
  if (!secret) throw new Error('PROPOSAL_SIGNING_SECRET is not set');
  return base64url(crypto.createHmac('sha256', secret).update(payload).digest());
}

export function signProposalToken(dealId: string): string {
  const payload: ProposalTokenPayload = {
    dealId,
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_DAYS * 24 * 60 * 60,
  };
  const payloadB64 = base64url(JSON.stringify(payload));
  const sig = hmac(payloadB64);
  return `${payloadB64}.${sig}`;
}

export function verifyProposalToken(token: string): ProposalTokenPayload {
  const [payloadB64, sig] = token.split('.');
  if (!payloadB64 || !sig) throw new Error('Malformed token');
  const expected = hmac(payloadB64);
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    throw new Error('Invalid token signature');
  }
  const payload: ProposalTokenPayload = JSON.parse(fromBase64url(payloadB64).toString('utf-8'));
  if (payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('Token expired');
  }
  return payload;
}

export interface AgreementTokenPayload {
  agreementPageId: string;
  exp: number;
}

export function signAgreementToken(agreementPageId: string): string {
  const payload: AgreementTokenPayload = {
    agreementPageId,
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_DAYS * 24 * 60 * 60,
  };
  const payloadB64 = base64url(JSON.stringify(payload));
  const sig = hmac(payloadB64);
  return `${payloadB64}.${sig}`;
}

export function verifyAgreementToken(token: string): AgreementTokenPayload {
  const [payloadB64, sig] = token.split('.');
  if (!payloadB64 || !sig) throw new Error('Malformed token');
  const expected = hmac(payloadB64);
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    throw new Error('Invalid token signature');
  }
  const payload: AgreementTokenPayload = JSON.parse(fromBase64url(payloadB64).toString('utf-8'));
  if (payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('Token expired');
  }
  return payload;
}

export function requireAdmin(headers: Record<string, string | string[] | undefined>): void {
  const provided =
    headers['x-admin-passcode'] ??
    headers['X-Admin-Passcode'] ??
    headers['X-ADMIN-PASSCODE'];
  const passcode = Array.isArray(provided) ? provided[0]?.trim() : provided?.trim();
  const expected = process.env.ADMIN_PASSCODE?.trim();

  if (!expected || !passcode || passcode !== expected) {
    throw new Error('Unauthorized');
  }
}

function auditReportHmac(payloadB64: string): string {
  const secret = process.env.AUDIT_REPORT_SIGNING_SECRET;
  if (!secret) throw new Error('AUDIT_REPORT_SIGNING_SECRET is not set');
  return base64url(crypto.createHmac('sha256', secret).update(payloadB64).digest());
}

export interface AuditReportTokenPayload {
  reportId: string;
  exp: number;
}

export function signAuditReportToken(reportId: string): string {
  const payload: AuditReportTokenPayload = {
    reportId,
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_DAYS * 24 * 60 * 60,
  };
  const payloadB64 = base64url(JSON.stringify(payload));
  const sig = auditReportHmac(payloadB64);
  return `${payloadB64}.${sig}`;
}

export function verifyAuditReportToken(token: string): AuditReportTokenPayload {
  const [payloadB64, sig] = token.split('.');
  if (!payloadB64 || !sig) throw new Error('Malformed token');
  const expected = auditReportHmac(payloadB64);
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    throw new Error('Invalid token signature');
  }
  const payload: AuditReportTokenPayload = JSON.parse(fromBase64url(payloadB64).toString('utf-8'));
  if (payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('Token expired');
  }
  if (!payload.reportId || typeof payload.reportId !== 'string') {
    throw new Error('Invalid token payload');
  }
  return payload;
}

/**
 * Validates n8n (or other automation) calls to report ingest.
 * Accepts `x-n8n-webhook-secret` header or `Authorization: Bearer <secret>`.
 */
export function requireN8nWebhook(headers: Record<string, string | string[] | undefined>): void {
  const expected = process.env.N8N_WEBHOOK_SECRET?.trim();
  if (!expected) {
    throw new Error('N8N_WEBHOOK_SECRET is not configured');
  }

  const headerSecret =
    headers['x-n8n-webhook-secret'] ?? headers['X-N8N-WEBHOOK-SECRET'];
  const fromHeader = Array.isArray(headerSecret) ? headerSecret[0]?.trim() : headerSecret?.trim();

  const auth = headers.authorization ?? headers.Authorization;
  const authStr = Array.isArray(auth) ? auth[0] : auth;
  let fromBearer: string | undefined;
  if (authStr && /^Bearer\s+/i.test(authStr)) {
    fromBearer = authStr.replace(/^Bearer\s+/i, '').trim();
  }

  const provided = fromHeader || fromBearer;
  if (!provided || provided !== expected) {
    throw new Error('Unauthorized');
  }
}

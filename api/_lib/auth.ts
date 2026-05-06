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

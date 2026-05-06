import crypto from 'node:crypto';

const SIGNING_SECRET = process.env.PROPOSAL_SIGNING_SECRET;
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE;
const TOKEN_TTL_DAYS = 90;

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
  if (!SIGNING_SECRET) throw new Error('PROPOSAL_SIGNING_SECRET is not set');
  return base64url(crypto.createHmac('sha256', SIGNING_SECRET).update(payload).digest());
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
  const provided = headers['x-admin-passcode'];
  const passcode = Array.isArray(provided) ? provided[0] : provided;
  if (!ADMIN_PASSCODE || !passcode || passcode !== ADMIN_PASSCODE) {
    throw new Error('Unauthorized');
  }
}

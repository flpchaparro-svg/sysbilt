import React from 'react';
import CTAButton from '../CTAButton';
import AgreementCover from './AgreementCover';
import AgreementRenderer from './AgreementRenderer';
import type { Block } from './AgreementRenderer';
import '../../styles/proposal-print.css';

export interface AgreementPropertiesShape {
  clientBusinessName: string;
  clientABN: string;
  clientAddress: string;
  clientPrimaryContact: string;
  clientContactEmail: string;
  totalFeeAUD: number | null;
  signedBySYSBILTDate: string | null;
  linkedProposal: string;
}

export interface AgreementConfirmationProps {
  signedByName: string;
  signedDate: string;
  signedByPosition: string;
  agreement: {
    properties: AgreementPropertiesShape;
    blocks: Block[];
  };
}

function formatSignedDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
}

function PrintSignatures({
  signedByName,
  signedDate,
  signedByPosition,
}: {
  signedByName: string;
  signedDate: string;
  signedByPosition: string;
}) {
  return (
    <section className="mt-12 border-t-2 border-dark pt-8">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-red-text">/ Signatures</p>
      <h2 className="mb-8 font-serif text-3xl font-black uppercase tracking-tight text-dark">Signatures</h2>
      <div className="border-2 border-dark bg-cream-warm p-8">
        <p className="font-serif text-xl italic text-dark">{signedByName}</p>
        <p className="mt-2 font-sans text-sm text-dark/80">{signedByPosition}</p>
        <p className="mt-2 font-sans text-sm text-dark/80">Date: {formatSignedDate(signedDate)}</p>
        <p className="mt-4 font-mono text-xs text-dark/70">Signed electronically via sysbilt.com</p>
      </div>
    </section>
  );
}

export default function AgreementConfirmation({
  signedByName,
  signedDate,
  signedByPosition,
  agreement,
}: AgreementConfirmationProps) {
  const props = agreement.properties;

  return (
    <div className="min-h-screen bg-cream font-sans text-dark">
      <div className="hidden print:block">
        <main className="mx-auto max-w-3xl px-6 py-12">
          <AgreementCover
            clientBusinessName={props.clientBusinessName}
            clientABN={props.clientABN}
            clientAddress={props.clientAddress}
            clientPrimaryContact={props.clientPrimaryContact}
            clientContactEmail={props.clientContactEmail}
            totalFeeAUD={props.totalFeeAUD}
            signedBySYSBILTDate={props.signedBySYSBILTDate}
            linkedProposal={props.linkedProposal}
          />
          <AgreementRenderer blocks={agreement.blocks} />
          <PrintSignatures
            signedByName={signedByName}
            signedDate={signedDate}
            signedByPosition={signedByPosition}
          />
        </main>
      </div>

      <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16 print:hidden">
        <div className="w-full border border-dark/10 bg-cream-light p-10 md:p-12">
          <p className="font-serif text-6xl leading-none text-red-text" aria-hidden>
            ✓
          </p>
          <h1 className="mt-8 font-serif text-4xl font-black uppercase tracking-tight text-dark md:text-5xl">
            Agreement signed
          </h1>
          <p className="type-body-lg mt-6 font-light text-dark/70">
            Thank you, {signedByName}. The Master Service Agreement is now in effect as of{' '}
            {formatSignedDate(signedDate)}.
          </p>

          <div className="mt-10">
            <span className="mb-4 block font-mono text-xs font-bold uppercase tracking-[0.2em] text-red-text">
              / What happens next
            </span>
            <ol className="type-body mt-4 list-decimal space-y-4 pl-6 text-dark/70 marker:font-semibold marker:text-red-text">
              <li>
                We will send the first invoice for 50% of the project fee within one business day, via Zoho
                Invoice.
              </li>
              <li>Once the deposit is received, we begin work within 5 business days.</li>
              <li>
                If you have questions, reply to the email this link came from or write to hello@sysbilt.com.
              </li>
            </ol>
          </div>

          <div className="proposal-actions mt-12 flex w-full min-w-0 flex-col flex-wrap items-center justify-center gap-6 md:flex-row md:gap-x-10 md:gap-y-6">
            <div className="flex min-w-0 max-w-full flex-col items-center gap-2 text-center">
              <CTAButton
                theme="light"
                type="button"
                className="w-fit max-w-full shrink-0"
                onClick={() => window.print()}
              >
                Save as PDF
              </CTAButton>
              <p className="max-w-[min(100%,20rem)] font-mono text-[11px] uppercase leading-snug tracking-widest text-dark/40">
                Opens your browser print dialog. Choose &apos;Save as PDF&apos; as the destination.
              </p>
            </div>
            <a
              href="https://sysbilt.com"
              className="inline-flex w-fit shrink-0 items-center justify-center border-2 border-dark px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-dark transition-colors hover:border-red-text hover:text-red-text"
            >
              Return to SYSBILT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { SysbiltLogo } from '../SysbiltLogo';

export interface AgreementCoverProps {
  clientBusinessName: string;
  clientABN: string;
  clientAddress: string;
  clientPrimaryContact: string;
  clientContactEmail: string;
  totalFeeAUD: number | null;
  signedBySYSBILTDate: string | null;
  linkedProposal: string;
}

function formatAUD(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function AgreementCover({
  clientBusinessName,
  clientABN,
  clientAddress,
  clientPrimaryContact,
  clientContactEmail,
  totalFeeAUD,
  signedBySYSBILTDate,
  linkedProposal,
}: AgreementCoverProps) {
  const effectiveLabel = signedBySYSBILTDate ? formatDate(signedBySYSBILTDate) : '-';

  return (
    <header className="proposal-cover mb-32 print:break-after-page">
      <SysbiltLogo className="w-[160px] md:w-[200px] max-w-[85vw]" />

      <p className="mt-2 font-sans text-sm text-dark/60 md:text-base">
        Business systems for growing companies
      </p>

      <div className="mt-32 md:mt-48">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-red-text">
          / Master Service Agreement
        </p>

        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-red-text">Between</p>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-6">
          <div>
            <h2 className="font-serif text-3xl font-bold text-dark">SYSBILT</h2>
            <p className="mt-3 font-sans text-base text-dark/80">ABN 56 115 228 020</p>
            <p className="font-sans text-base text-dark/80">Sole Trader: Felipe Chaparro</p>
            <p className="font-sans text-base text-dark/80">felipe@sysbilt.com</p>
          </div>

          <div className="hidden items-center justify-center self-stretch pt-8 md:flex">
            <span className="font-serif text-2xl font-black text-red-text">&</span>
          </div>

          <div>
            <h2 className="font-serif text-3xl font-bold text-dark">
              {clientBusinessName || 'Client'}
            </h2>
            {clientABN ? <p className="mt-3 font-sans text-base text-dark/80">{clientABN}</p> : null}
            {clientAddress ? (
              <p className="font-sans text-base text-dark/80 whitespace-pre-line">{clientAddress}</p>
            ) : null}
            {clientPrimaryContact ? (
              <p className="mt-1 font-sans text-base text-dark/80">{clientPrimaryContact}</p>
            ) : null}
            {clientContactEmail ? (
              <p className="font-sans text-base text-dark/80">{clientContactEmail}</p>
            ) : null}
          </div>
        </div>
      </div>

      <hr className="mb-12 mt-12 border-t-2 border-dark" />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-red-text">/ Effective date</p>
          <p className="font-serif text-xl text-dark">{effectiveLabel}</p>
        </div>
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-red-text">/ Total fee</p>
          <p className="font-serif text-xl text-dark">
            {totalFeeAUD != null ? formatAUD(totalFeeAUD) : '-'}
          </p>
        </div>
        {linkedProposal ? (
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-red-text">
              / Linked proposal
            </p>
            <a
              href={linkedProposal}
              className="inline-block font-sans text-sm text-red-text underline decoration-2 underline-offset-4 transition-colors hover:text-dark"
            >
              View proposal
            </a>
          </div>
        ) : null}
      </div>
    </header>
  );
}

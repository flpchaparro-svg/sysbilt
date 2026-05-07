import React from 'react';
import { SysbiltLogo } from '../SysbiltLogo';

export interface CoverPageProps {
  clientName: string;
  pillars: string[];
  totalFeeAUD: number | null;
  validUntil: string | null;
  sentDate: string | null;
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

export default function CoverPage({
  clientName,
  pillars,
  totalFeeAUD,
  validUntil,
  sentDate,
}: CoverPageProps) {
  const scopeValue = pillars.length > 0 ? pillars.join(', ') : null;
  const showMetadata =
    (scopeValue != null && scopeValue !== '') ||
    totalFeeAUD != null ||
    (validUntil != null && validUntil !== '');

  return (
    <header className="proposal-cover mb-32 print:break-after-page">
      <SysbiltLogo className="w-[160px] md:w-[200px] max-w-[85vw]" />

      <p className="mt-2 font-sans text-sm text-dark/60 md:text-base">
        Business systems for growing companies
      </p>

      <div className="mt-32 md:mt-48">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-red-text">/ Proposal for</p>

        <h1 className="font-serif font-bold uppercase tracking-tight text-6xl leading-none text-dark md:text-8xl">
          {clientName}
        </h1>

        <hr className="mb-12 mt-12 border-t-2 border-dark" />

        {showMetadata && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-16">
            {scopeValue != null && scopeValue !== '' && (
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-red-text">/ SCOPE</p>
                <p className="font-serif text-2xl text-dark">{scopeValue}</p>
              </div>
            )}
            {totalFeeAUD != null && (
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-red-text">/ INVESTMENT</p>
                <p className="font-serif text-2xl text-dark">{formatAUD(totalFeeAUD)}</p>
              </div>
            )}
            {validUntil != null && validUntil !== '' && (
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-red-text">/ VALID UNTIL</p>
                <p className="font-serif text-2xl text-dark">{formatDate(validUntil)}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {sentDate != null && sentDate !== '' && (
        <p className="mt-12 font-mono text-xs text-dark/40">
          Proposal date: {formatDate(sentDate)}
        </p>
      )}
    </header>
  );
}

import React from 'react';

const CLAUSES: { id: string; num: string; label: string }[] = [
  { id: 'clause-1', num: '1', label: 'SERVICES' },
  { id: 'clause-2', num: '2', label: 'FEES & PAYMENT' },
  { id: 'clause-3', num: '3', label: 'CLIENT OBLIGATIONS' },
  { id: 'clause-4', num: '4', label: 'IP' },
  { id: 'clause-5', num: '5', label: 'CONFIDENTIALITY' },
  { id: 'clause-6', num: '6', label: 'THIRD-PARTY TOOLS' },
  { id: 'clause-7', num: '7', label: 'WARRANTIES' },
  { id: 'clause-8', num: '8', label: 'TERM & TERMINATION' },
  { id: 'clause-9', num: '9', label: 'VARIATIONS' },
  { id: 'clause-10', num: '10', label: 'DISPUTES' },
  { id: 'clause-11', num: '11', label: 'GOVERNING LAW' },
  { id: 'clause-12', num: '12', label: 'GENERAL' },
  { id: 'clause-sign', num: '•', label: 'SIGN' },
];

export interface ClauseRailProps {
  activeClause: string;
  onJump: (clauseId: string) => void;
}

export default function ClauseRail({ activeClause, onJump }: ClauseRailProps) {
  return (
    <nav
      className="proposal-rail fixed left-8 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex print:hidden"
      aria-label="Agreement clauses"
    >
      {CLAUSES.map((ch) => {
        const isActive = activeClause === ch.id;
        return (
          <button
            key={ch.id}
            type="button"
            onClick={() => onJump(ch.id)}
            className={`flex items-baseline gap-0 text-left font-mono text-xs uppercase tracking-[0.15em] transition-colors ${
              isActive ? 'font-bold text-red-text' : 'text-dark/40 hover:text-dark/70'
            }`}
          >
            <span className="mr-2 inline-block min-w-[1rem] font-mono text-[10px] text-red-text">
              {ch.num}
            </span>
            <span>{ch.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

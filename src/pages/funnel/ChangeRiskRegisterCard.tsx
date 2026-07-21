import React from 'react'
import {FUNNEL_COLOURS} from './funnelTheme'

/**
 * Evidence moment for Change Pack: the adoption row every rollout has and nobody staffs.
 * Static on purpose. No motion tricks.
 */
export function ChangeRiskRegisterCard({business}: {business: string | null}) {
  return (
    <div
      className="mt-2 rounded-sm border overflow-hidden max-w-2xl"
      style={{
        borderColor: `${FUNNEL_COLOURS.ink}14`,
        backgroundColor: FUNNEL_COLOURS.surface,
      }}
    >
      <div
        className="px-4 py-2.5 flex items-center justify-between font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
        style={{backgroundColor: FUNNEL_COLOURS.ink, color: FUNNEL_COLOURS.onInk}}
      >
        <span>Every rollout&apos;s risk register</span>
        <span style={{color: FUNNEL_COLOURS.goldLight}}>
          {business ? `Prepared for ${business}` : 'Template'}
        </span>
      </div>
      <div className="p-4 md:p-5">
        <div
          className="grid grid-cols-[1fr_auto_auto] gap-3 md:gap-6 items-center border-b pb-3 mb-3 font-mono text-[9px] uppercase tracking-wider"
          style={{borderColor: `${FUNNEL_COLOURS.ink}12`, color: FUNNEL_COLOURS.muted}}
        >
          <span>Risk</span>
          <span>Likelihood</span>
          <span>Owner</span>
        </div>
        <div className="grid grid-cols-[1fr_auto_auto] gap-3 md:gap-6 items-center">
          <p className="font-sans text-sm md:text-base font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
            Adoption
          </p>
          <span
            className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded-sm"
            style={{
              backgroundColor: `${FUNNEL_COLOURS.accent}18`,
              color: FUNNEL_COLOURS.accent,
            }}
          >
            High
          </span>
          <span
            className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
            style={{color: FUNNEL_COLOURS.muted}}
          >
            TBC
          </span>
        </div>
        <p className="mt-4 font-sans text-sm leading-relaxed" style={{color: FUNNEL_COLOURS.muted}}>
          Every rollout has this row. Almost nobody staffs it.
        </p>
      </div>
    </div>
  )
}

import { useId, type FC, type ReactNode } from 'react'
import { BtwFigure, CREAM, GOLD_READABLE, INK } from '../BtwFigure'
import { AnatomyDiagram } from './AnatomyDiagram'
import { HubSpokeDiagram } from './HubSpokeDiagram'

function MonoBox({
  x,
  y,
  w,
  h,
  label,
  gold = false,
  rx = 2,
  fontSize = 11,
}: {
  x: number
  y: number
  w: number
  h: number
  label: string
  gold?: boolean
  rx?: number
  fontSize?: number
}) {
  const stroke = gold ? GOLD_READABLE : INK
  return (
    <g fontFamily="ui-monospace, Menlo, monospace" fontSize={fontSize} fontWeight="700" letterSpacing="1">
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={CREAM} stroke={stroke} strokeWidth="1.4" />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fill={INK}>
        {label}
      </text>
    </g>
  )
}

function ArrowDefs({ uid }: { uid: string }) {
  const ink = `ink-${uid}`
  const gold = `gold-${uid}`
  return (
    <defs>
      <marker id={ink} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0,0 L9,5 L0,10 z" fill={INK} />
      </marker>
      <marker id={gold} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0,0 L9,5 L0,10 z" fill={GOLD_READABLE} />
      </marker>
    </defs>
  )
}

function PlateSvg({ children, viewBox, ariaLabel }: { children: React.ReactNode; viewBox: string; ariaLabel: string }) {
  return (
    <svg viewBox={viewBox} className="block h-auto w-full" role="img" aria-label={ariaLabel}>
      {children}
    </svg>
  )
}

function OldVsNewDiagram({ caption }: { caption: string }) {
  const uid = useId().replace(/:/g, '')
  const ink = `ink-${uid}`
  const gold = `gold-${uid}`

  const hubCx = 540
  const hubCy = 92
  const hubR = 34
  const busY = 148
  const boxY = 178
  const boxW = 76
  const boxH = 30
  const spokes = [
    { label: 'ENQUIRIES', cx: 424 },
    { label: 'FOLLOW-UP', cx: 504 },
    { label: 'RECORDS', cx: 584 },
    { label: 'REPORTING', cx: 664 },
  ]

  return (
    <BtwFigure fig="FIG. 01.1" caption={caption}>
      <PlateSvg viewBox="0 0 720 300" ariaLabel="The old model and the new one">
        <ArrowDefs uid={uid} />

        {/* Column titles */}
        <text x="180" y="28" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fontWeight="700" letterSpacing="2" fill={GOLD_READABLE}>
          THE OLD WAY
        </text>
        <text x="540" y="28" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fontWeight="700" letterSpacing="2" fill={GOLD_READABLE}>
          THE NEW WAY
        </text>
        <line x1="360" y1="40" x2="360" y2="268" stroke={INK} strokeWidth="1" opacity="0.12" />

        {/* —— Left: linear chain —— */}
        {MonoBox({ x: 40, y: 68, w: 90, h: 36, label: 'DESIGNER' })}
        {MonoBox({ x: 150, y: 68, w: 90, h: 36, label: 'DEVELOPER' })}
        {MonoBox({ x: 260, y: 68, w: 90, h: 36, label: 'COPYWRITER' })}
        <path d="M130,86 L150,86" stroke={INK} strokeWidth="1.5" markerEnd={`url(#${ink})`} fill="none" />
        <path d="M240,86 L260,86" stroke={INK} strokeWidth="1.5" markerEnd={`url(#${ink})`} fill="none" />
        <path d="M195,104 L195,148" stroke={INK} strokeWidth="1.5" markerEnd={`url(#${ink})`} fill="none" />
        <rect x="145" y="148" width="100" height="44" rx="2" fill="#E8E8E8" stroke={INK} strokeWidth="1.4" />
        <text x="195" y="175" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="12" fontWeight="700" fill={INK}>
          BROCHURE
        </text>

        {/* —— Right: hub + clean tree spokes —— */}
        <circle cx={hubCx} cy={hubCy} r={hubR} fill={INK} stroke="#C5A059" strokeWidth="2" />
        <text x={hubCx} y={hubCy - 2} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fontWeight="700" fill="#D4A84B">
          WEBSITE
        </text>
        <text x={hubCx} y={hubCy + 14} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7.5" fontWeight="700" letterSpacing="1.8" fill="rgba(255,242,236,.65)">
          THE HUB
        </text>

        {/* Trunk: hub → bus */}
        <path
          d={`M${hubCx},${hubCy + hubR} L${hubCx},${busY}`}
          stroke={INK}
          strokeWidth="1.4"
          fill="none"
          markerEnd={`url(#${ink})`}
        />

        {/* Horizontal bus */}
        <path
          d={`M${spokes[0].cx},${busY} L${spokes[spokes.length - 1].cx},${busY}`}
          stroke={INK}
          strokeWidth="1.4"
          fill="none"
        />

        {/* Spokes + boxes */}
        {spokes.map(({ label, cx }) => {
          const bx = cx - boxW / 2
          return (
            <g key={label}>
              {/* Out: bus → box (ink) */}
              <path
                d={`M${cx},${busY} L${cx},${boxY - 2}`}
                stroke={INK}
                strokeWidth="1.4"
                fill="none"
                markerEnd={`url(#${ink})`}
              />
              {/* Back: box → bus (gold, dashed, offset so lines do not collide) */}
              <path
                d={`M${cx - 2},${boxY + 1} L${cx - 2},${busY}`}
                stroke={GOLD_READABLE}
                strokeWidth="1.2"
                strokeDasharray="4 3"
                fill="none"
                markerEnd={`url(#${gold})`}
                opacity="0.85"
              />
              {MonoBox({ x: bx, y: boxY, w: boxW, h: boxH, label, fontSize: 9.5 })}
            </g>
          )
        })}

        <text
          x={hubCx}
          y={248}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fontWeight="700"
          letterSpacing="1.4"
          fill="rgba(26,26,26,0.45)"
        >
          A SYSTEM THAT RUNS THE BUSINESS
        </text>
      </PlateSvg>
    </BtwFigure>
  )
}

function TwoKindsDiagram({ caption }: { caption: string }) {
  const uid = useId().replace(/:/g, '')
  const ink = `ink-${uid}`
  return (
    <BtwFigure fig="FIG. 01.2" caption={caption}>
      <PlateSvg viewBox="0 0 720 240" ariaLabel="Two kinds of website">
        <ArrowDefs uid={uid} />
        <rect x="60" y="40" width="260" height="160" rx="2" fill={CREAM} stroke={INK} strokeWidth="1.4" />
        <text x="190" y="85" textAnchor="middle" fontFamily="Lora, serif" fontSize="22" fontWeight="600" fill={INK}>
          Brochure
        </text>
        <text x="190" y="115" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fontWeight="700" letterSpacing="2" fill="rgba(26,26,26,.5)">
          INFORMS
        </text>
        <rect x="110" y="135" width="160" height="40" rx="1" fill="none" stroke={INK} strokeWidth="1" opacity="0.2" />
        <rect x="400" y="40" width="260" height="160" rx="2" fill={CREAM} stroke={INK} strokeWidth="1.4" />
        <text x="530" y="85" textAnchor="middle" fontFamily="Lora, serif" fontSize="22" fontWeight="600" fill={INK}>
          Lead generator
        </text>
        <text x="530" y="115" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fontWeight="700" letterSpacing="2" fill={GOLD_READABLE}>
          ACTS
        </text>
        {MonoBox({ x: 430, y: 140, w: 70, h: 28, label: 'VISITOR' })}
        <path d="M500,154 L530,154" stroke={INK} strokeWidth="1.5" markerEnd={`url(#${ink})`} fill="none" />
        {MonoBox({ x: 530, y: 140, w: 90, h: 28, label: 'ENQUIRY' })}
      </PlateSvg>
    </BtwFigure>
  )
}

function KeysArmourDiagram({ caption }: { caption: string }) {
  return (
    <BtwFigure fig="FIG. 02.1" caption={caption}>
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        <div className="border border-[#1a1a1a]/14 bg-[#FFF2EC] p-5 md:p-6">
          <p className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B6914]">What you own</p>
          <ul className="space-y-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#1a1a1a]">
            <li>Domain</li>
            <li>Code</li>
            <li>Hosting</li>
            <li>Accounts</li>
          </ul>
        </div>
        <div className="border border-[#1a1a1a]/14 bg-[#FFF2EC] p-5 md:p-6">
          <p className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B6914]">What keeps it safe</p>
          <ul className="space-y-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#1a1a1a]">
            <li>SSL</li>
            <li>Cloudflare</li>
            <li>Passwords</li>
            <li>Email security</li>
          </ul>
        </div>
      </div>
    </BtwFigure>
  )
}

function WeakWordsDiagram({ caption }: { caption: string }) {
  const rows = [
    ['Submit', 'Book my consultation'],
    ['Learn more', 'See how it works'],
    ['Click here', 'Get my quote'],
  ]
  return (
    <BtwFigure fig="FIG. 03.2" caption={caption}>
      <div className="grid grid-cols-2 gap-6 md:gap-10">
        <div>
          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/45">Weak</p>
          {rows.map(([weak]) => (
            <div key={weak} className="mb-3 border border-[#1a1a1a]/15 bg-[#E8E8E8]/60 px-4 py-3 font-sans text-[13px] text-[#1a1a1a]/45 line-through decoration-[#1a1a1a]/25">
              {weak}
            </div>
          ))}
        </div>
        <div>
          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6914]">Works</p>
          {rows.map(([, strong]) => (
            <div key={strong} className="mb-3 border border-[#1a1a1a] bg-[#FFF2EC] px-4 py-3 font-sans text-[13px] font-semibold text-[#1a1a1a]">
              {strong}
            </div>
          ))}
        </div>
      </div>
    </BtwFigure>
  )
}

function PageJobsDiagram({ caption }: { caption: string }) {
  const pages = [
    ['Home', 'Says what you do in seconds'],
    ['About', 'Builds trust'],
    ['Services', 'Frames the problem'],
    ['Contact', 'Removes every obstacle'],
    ['Legal', 'Protects the business'],
  ]
  return (
    <BtwFigure fig="FIG. 04.1" caption={caption}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {pages.map(([title, job]) => (
          <div key={title} className="border border-[#1a1a1a]/14 bg-[#FFF2EC] p-4">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1a1a1a] mb-2">{title}</p>
            <p className="font-sans text-[12px] leading-[1.45] text-[#1a1a1a]/62">{job}</p>
          </div>
        ))}
      </div>
    </BtwFigure>
  )
}

function FeatureFourWaysDiagram({ caption }: { caption: string }) {
  const parts = ['What it is', 'What it does', 'How you use it', "What's next"]
  return (
    <BtwFigure fig="FIG. 05.1" caption={caption}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {parts.map((part) => (
          <div key={part} className="border border-[#1a1a1a] bg-[#FFF2EC] px-3 py-6 text-center">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#8B6914] leading-[1.5]">{part}</p>
          </div>
        ))}
      </div>
    </BtwFigure>
  )
}

function SpeedToLeadDiagram({ caption }: { caption: string }) {
  const boxW = 148
  const boxH = 34
  const gap = 16
  const startX = 40
  const steps = [
    ['0s', 'Enquiry submitted'],
    ['<30s', 'Instant reply'],
    ['<60s', 'You alerted'],
    ['<60s', 'You call'],
  ] as const

  return (
    <BtwFigure fig="FIG. 05.2" caption={caption}>
      <PlateSvg viewBox="0 0 720 200" ariaLabel="Speed to lead timeline">
        <line x1="40" y1="82" x2="680" y2="82" stroke={INK} strokeWidth="2" />
        {steps.map(([time, label], i) => {
          const x = startX + i * (boxW + gap)
          const cx = x + boxW / 2
          return (
            <g key={label}>
              {MonoBox({ x, y: 48, w: boxW, h: boxH, label, fontSize: 9.5 })}
              <text x={cx} y="112" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fill={GOLD_READABLE}>
                {time}
              </text>
            </g>
          )
        })}
        <line x1="40" y1="150" x2="680" y2="150" stroke={INK} strokeWidth="1" strokeDasharray="5 4" opacity="0.35" />
        <text x="360" y="175" textAnchor="middle" fontFamily="Lora, serif" fontSize="12" fontStyle="italic" fill="rgba(26,26,26,.45)">
          Competitor replies tomorrow, lead gone
        </text>
      </PlateSvg>
    </BtwFigure>
  )
}

function WhatRunsUnderneathDiagram({ caption }: { caption: string }) {
  return (
    <BtwFigure fig="FIG. 07.1" caption={caption}>
      <div className="overflow-hidden border border-[#1a1a1a]/14">
        <div className="bg-[#FFF2EC] px-5 py-6 md:px-7 md:py-8 text-center">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a] mb-2">You handle this</p>
          <p className="font-sans text-[13px] text-[#1a1a1a]/62">Your words · your photos · your updates</p>
        </div>
        <div className="border-y border-[#C5A059] bg-[#FFF8F5] py-2 text-center font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-[#8B6914]">
          Waterline
        </div>
        <div className="bg-[#E8E8E8]/50 px-5 py-6 md:px-7 md:py-8 text-center">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a] mb-2">We handle this</p>
          <p className="font-sans text-[13px] text-[#1a1a1a]/62">Security · updates · monitoring · backups</p>
        </div>
      </div>
    </BtwFigure>
  )
}

function ThreeStagesDiagram({ caption }: { caption: string }) {
  const stages = [
    ['01', 'Foundation', 'Readable'],
    ['02', 'Content', 'Relevant'],
    ['03', 'Authority', 'Trusted'],
  ]
  return (
    <BtwFigure fig="FIG. 08.1" caption={caption}>
      <div className="flex items-end justify-center gap-3 md:gap-5 pt-4">
        {stages.map(([num, title, sub], i) => (
          <div
            key={num}
            className="flex flex-col items-center border border-[#1a1a1a] bg-[#FFF2EC] px-4 md:px-6"
            style={{ paddingTop: 16 + i * 12, paddingBottom: 20 }}
          >
            <span className="font-mono text-[10px] font-bold text-[#8B6914] mb-2">{num}</span>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#1a1a1a] mb-1">{title}</span>
            <span className="font-sans text-[12px] text-[#1a1a1a]/55">{sub}</span>
          </div>
        ))}
      </div>
    </BtwFigure>
  )
}

function RankedToCitedDiagram({ caption }: { caption: string }) {
  return (
    <BtwFigure fig="FIG. 08.2" caption={caption}>
      <div className="grid grid-cols-2 gap-6 md:gap-10">
        <div>
          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/45">Before — ranked</p>
          {['Result 1', 'Result 2', 'Result 3'].map((r) => (
            <div key={r} className="mb-2 border border-[#1a1a1a]/12 bg-[#E8E8E8]/70 px-4 py-2.5 font-sans text-[13px] text-[#1a1a1a]/70">
              {r}
            </div>
          ))}
        </div>
        <div>
          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6914]">After — cited</p>
          <div className="border border-[#1a1a1a] bg-[#FFF2EC] p-5">
            <p className="font-sans text-[14px] leading-[1.6] text-[#1a1a1a]/80">
              For a plumber in Sydney, consider <span className="font-semibold text-[#8B6914]">Your Business</span> — they specialise in…
            </p>
          </div>
        </div>
      </div>
    </BtwFigure>
  )
}

function OneEnquiryFlowDiagram({ caption }: { caption: string }) {
  const uid = useId().replace(/:/g, '')
  const ink = `ink-${uid}`
  const rowY = 88
  const rowH = 32
  const rowCy = rowY + rowH / 2
  const branchW = 108
  const branchH = 30
  const branchX = 310
  const autoY = 42
  const alertY = autoY + branchH + 38
  const autoCy = autoY + branchH / 2
  const alertCy = alertY + branchH / 2
  const mergeX = 462

  return (
    <BtwFigure fig="FIG. 09.2" caption={caption}>
      <PlateSvg viewBox="0 0 720 200" ariaLabel="One enquiry start to finish">
        <ArrowDefs uid={uid} />
        <text x="360" y="24" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" letterSpacing="2" fill={GOLD_READABLE}>
          ABOUT ONE SECOND
        </text>

        {MonoBox({ x: 32, y: rowY, w: 100, h: rowH, label: 'FORM SENT' })}
        {MonoBox({ x: 162, y: rowY, w: 110, h: rowH, label: 'CRM TAGGED' })}
        {MonoBox({ x: branchX, y: autoY, w: branchW, h: branchH, label: 'AUTO REPLY', fontSize: 9.5 })}
        {MonoBox({ x: branchX, y: alertY, w: branchW, h: branchH, label: 'ALERT YOU', fontSize: 9.5 })}
        {MonoBox({ x: 502, y: rowY, w: 112, h: rowH, label: 'DASHBOARD' })}

        {/* Form → CRM */}
        <path d={`M132,${rowCy} L162,${rowCy}`} stroke={INK} strokeWidth="1.5" markerEnd={`url(#${ink})`} fill="none" />

        {/* CRM → branch (split up / down) */}
        <path
          d={`M272,${rowCy} L292,${rowCy} L292,${autoCy} L${branchX},${autoCy}`}
          stroke={INK}
          strokeWidth="1.5"
          markerEnd={`url(#${ink})`}
          fill="none"
        />
        <path
          d={`M272,${rowCy} L292,${rowCy} L292,${alertCy} L${branchX},${alertCy}`}
          stroke={INK}
          strokeWidth="1.5"
          markerEnd={`url(#${ink})`}
          fill="none"
        />

        {/* Branch → merge → dashboard */}
        <path
          d={`M${branchX + branchW},${autoCy} L${mergeX},${autoCy} L${mergeX},${rowCy}`}
          stroke={INK}
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d={`M${branchX + branchW},${alertCy} L${mergeX},${alertCy} L${mergeX},${rowCy}`}
          stroke={INK}
          strokeWidth="1.5"
          fill="none"
        />
        <path d={`M${mergeX},${rowCy} L502,${rowCy}`} stroke={INK} strokeWidth="1.5" markerEnd={`url(#${ink})`} fill="none" />
      </PlateSvg>
    </BtwFigure>
  )
}

function OwnedVsRentedDiagram({ caption }: { caption: string }) {
  const uid = useId().replace(/:/g, '')
  const gold = `gold-${uid}`
  return (
    <BtwFigure fig="FIG. 09.3" caption={caption}>
      <PlateSvg viewBox="0 0 720 220" ariaLabel="Ground you own and rented land">
        <ArrowDefs uid={uid} />
        <rect x="220" y="70" width="280" height="100" fill={CREAM} stroke={INK} strokeWidth="2" />
        <text x="360" y="115" textAnchor="middle" fontFamily="Lora, serif" fontSize="18" fontWeight="600" fill={INK}>
          Your website
        </text>
        <text x="360" y="140" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" letterSpacing="2" fill={GOLD_READABLE}>
          GROUND YOU OWN
        </text>
        <rect x="60" y="90" width="120" height="60" fill="none" stroke={INK} strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
        <text x="120" y="125" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" fill="rgba(26,26,26,.45)">
          SOCIAL
        </text>
        <rect x="540" y="90" width="120" height="60" fill="none" stroke={INK} strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
        <text x="600" y="125" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" fill="rgba(26,26,26,.45)">
          PLATFORMS
        </text>
        <path d="M180,110 L218,110" stroke={GOLD_READABLE} strokeWidth="1.5" markerEnd={`url(#${gold})`} fill="none" />
        <path d="M540,110 L502,110" stroke={GOLD_READABLE} strokeWidth="1.5" markerEnd={`url(#${gold})`} fill="none" />
      </PlateSvg>
    </BtwFigure>
  )
}

function FiveStagesDiagram({ caption }: { caption: string }) {
  const stages = ['Foundation', 'Capture', 'Get found', 'Connect', 'Sharpen']
  return (
    <BtwFigure fig="FIG. 10.1" caption={caption}>
      <div className="flex items-end justify-center gap-2 md:gap-3 pt-2">
        {stages.map((stage, i) => (
          <div
            key={stage}
            className="border border-[#1a1a1a] bg-[#FFF2EC] px-2 md:px-4 text-center"
            style={{ paddingTop: 12 + i * 10, paddingBottom: 14 }}
          >
            <p className="font-mono text-[8px] md:text-[9px] font-bold uppercase tracking-[0.1em] text-[#1a1a1a] leading-[1.4]">{stage}</p>
          </div>
        ))}
      </div>
    </BtwFigure>
  )
}

function FourChecksDiagram({ caption }: { caption: string }) {
  const checks = [
    ['Tone', 'Sounds like you'],
    ['Accuracy', 'Everything true'],
    ['Originality', 'Genuinely yours'],
    ['Rules', 'Honest and legal'],
  ]
  return (
    <BtwFigure fig="FIG. 11.1" caption={caption}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {checks.map(([title, sub]) => (
          <div key={title} className="border border-[#1a1a1a] bg-[#FFF2EC] p-4">
            <div className="mb-3 h-3 w-3 border border-[#C5A059]" />
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#1a1a1a] mb-1">{title}</p>
            <p className="font-sans text-[11px] leading-[1.4] text-[#1a1a1a]/55">{sub}</p>
          </div>
        ))}
      </div>
    </BtwFigure>
  )
}

const DIAGRAMS: Record<string, React.FC<{ caption: string }>> = {
  'hub-spoke': HubSpokeDiagram,
  'ch03-anatomy': AnatomyDiagram,
  'ch01-old-vs-new': OldVsNewDiagram,
  'ch01-two-kinds': TwoKindsDiagram,
  'ch02-keys-armour': KeysArmourDiagram,
  'ch03-weak-words': WeakWordsDiagram,
  'ch04-page-jobs': PageJobsDiagram,
  'every-feature-four-ways': FeatureFourWaysDiagram,
  'speed-to-lead-timeline': SpeedToLeadDiagram,
  'what-runs-underneath': WhatRunsUnderneathDiagram,
  'three-stages-getting-found': ThreeStagesDiagram,
  'ranked-to-cited': RankedToCitedDiagram,
  'one-enquiry-flow': OneEnquiryFlowDiagram,
  'owned-vs-rented': OwnedVsRentedDiagram,
  'five-stages': FiveStagesDiagram,
  'four-checks': FourChecksDiagram,
}

export function BtwDiagramById({ id, caption }: { id: string; caption: string }) {
  const Component = DIAGRAMS[id]
  if (!Component) {
    return (
      <BtwFigure fig="FIG." caption={caption}>
        <p className="font-mono text-[11px] text-[#1a1a1a]/50">Diagram: {id}</p>
      </BtwFigure>
    )
  }
  return <Component caption={caption} />
}

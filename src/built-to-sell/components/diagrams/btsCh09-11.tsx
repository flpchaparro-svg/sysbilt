import { Fig, MonoBox, ArrowDefs, PlateSvg, useArrowIds, CREAM, GOLD_READABLE, INK } from './diagramPrimitives'

type D = { caption: string }

/* —— Ch09 —— */

export function BtsCh09Hub({ caption }: D) {
  const leftSpokes = ['Inventory', 'Customer records', 'Email & messages']
  const rightSpokes = ['Payments', 'Fulfilment & shipping', 'Accounting']

  return (
    <Fig fig="FIG. 09.1" caption={caption}>
      <div className="mx-auto flex w-full max-w-[580px] flex-col items-center gap-3">
        {/* Top spoke */}
        <div className="flex flex-col items-center">
          <div className="border border-[#1a1a1a] bg-[#FFF2EC] px-4 py-2.5 text-center">
            <p className="font-mono text-[8.5px] font-bold uppercase tracking-[0.1em] text-[#1a1a1a]">Reporting</p>
          </div>
          <span className="mt-1 font-mono text-[10px] font-bold leading-none text-[#8B6914]" aria-hidden>
            ↕
          </span>
        </div>

        {/* Hub + left / right spokes */}
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-x-2 gap-y-3 md:gap-x-4">
          {leftSpokes.map((label) => (
            <div key={label} className="col-start-1 flex items-center justify-end gap-2">
              <div className="border border-[#1a1a1a] bg-[#FFF2EC] px-3 py-2.5 text-right md:px-4">
                <p className="font-mono text-[8px] font-bold uppercase leading-[1.35] tracking-[0.08em] text-[#1a1a1a] md:text-[8.5px]">
                  {label}
                </p>
              </div>
              <span className="shrink-0 font-mono text-[10px] font-bold text-[#8B6914]" aria-hidden>
                ↔
              </span>
            </div>
          ))}

          <div className="col-start-2 row-span-3 row-start-1 flex items-center justify-center px-1">
            <div className="border-2 border-[#1a1a1a] bg-[#FFF2EC] px-5 py-6 text-center md:px-7 md:py-8">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#1a1a1a]">Your store</p>
              <p className="mt-2 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-[#8B6914]">Operational hub</p>
            </div>
          </div>

          {rightSpokes.map((label) => (
            <div key={label} className="col-start-3 flex items-center justify-start gap-2">
              <span className="shrink-0 font-mono text-[10px] font-bold text-[#8B6914]" aria-hidden>
                ↔
              </span>
              <div className="border border-[#1a1a1a] bg-[#FFF2EC] px-3 py-2.5 md:px-4">
                <p className="font-mono text-[8px] font-bold uppercase leading-[1.35] tracking-[0.08em] text-[#1a1a1a] md:text-[8.5px]">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-2 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-[#1a1a1a]/45">
          Most arrows flow both ways
        </p>
      </div>
    </Fig>
  )
}

export function BtsCh09OneOrder({ caption }: D) {
  const { uid, ink } = useArrowIds()
  return (
    <Fig fig="FIG. 09.2" caption={caption}>
      <PlateSvg viewBox="0 0 720 200" ariaLabel="One order record">
        <ArrowDefs uid={uid} />
        <MonoBox x={40} y={70} w={100} h={44} label="CHANNEL A" fontSize={8} />
        <MonoBox x={40} y={130} w={100} h={44} label="CHANNEL B" fontSize={8} />
        <path d="M140,92 L220,110" stroke={INK} strokeWidth="1.3" markerEnd={`url(#${ink})`} fill="none" />
        <path d="M140,152 L220,130" stroke={INK} strokeWidth="1.3" markerEnd={`url(#${ink})`} fill="none" />
        <rect x={220} y={85} width={280} height={70} rx="2" fill={CREAM} stroke={INK} strokeWidth="2" />
        <text x={360} y={115} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" fill={INK}>
          ONE ORDER RECORD
        </text>
        <text x={360} y={135} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7.5" fill="rgba(26,26,26,.5)">
          customer · items · payment · fulfilment status
        </text>
        <path d="M500,120 L580,120" stroke={INK} strokeWidth="1.4" markerEnd={`url(#${ink})`} fill="none" />
        <MonoBox x={580} y={98} w={100} h={44} label="FULFIL" fontSize={9} gold />
      </PlateSvg>
    </Fig>
  )
}

export function BtsCh09TwoBuyers({ caption }: D) {
  return (
    <Fig fig="FIG. 09.3" caption={caption}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="border border-[#1a1a1a] bg-[#FFF2EC] p-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6914] mb-3">B2C buyer</p>
          <ul className="font-sans text-[12px] space-y-2 text-[#1a1a1a]/70 list-none p-0">
            <li>Emotional proof</li>
            <li>Fast mobile checkout</li>
            <li>Clear returns</li>
          </ul>
        </div>
        <div className="border border-[#1a1a1a] bg-[#FFF2EC] p-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6914] mb-3">B2B buyer</p>
          <ul className="font-sans text-[12px] space-y-2 text-[#1a1a1a]/70 list-none p-0">
            <li>Account pricing</li>
            <li>PO and terms</li>
            <li>Repeat reorder</li>
          </ul>
        </div>
      </div>
      <p className="mt-5 text-center font-serif italic text-[13px] text-[#1a1a1a]/55">Same catalogue, different checkout paths</p>
    </Fig>
  )
}

export function BtsCh09ThreeStrangers({ caption }: D) {
  const strangers = [
    { n: '01', title: 'The marketplace', note: 'Rents you traffic' },
    { n: '02', title: 'The payment provider', note: 'Holds card trust' },
    { n: '03', title: 'The carrier', note: 'Delivers the promise' },
  ]
  return (
    <Fig fig="FIG. 09.4" caption={caption}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {strangers.map((s) => (
          <div key={s.n} className="border border-dashed border-[#1a1a1a]/35 bg-[#E8E8E8]/30 p-5">
            <span className="font-mono text-[10px] font-bold text-[#1a1a1a]/45">{s.n}</span>
            <div className="mt-1 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#1a1a1a]">{s.title}</div>
            <div className="mt-2 font-sans text-[12px] text-[#1a1a1a]/55">{s.note}</div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-center font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-[#8B6914]">
        Integrate well · contract clearly · never blame the customer
      </p>
    </Fig>
  )
}

/* —— Ch10 —— */

export function BtsCh10RentedOwned({ caption }: D) {
  return (
    <Fig fig="FIG. 10.1" caption={caption}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="border border-[#1a1a1a]/20 bg-[#E8E8E8]/45 p-6">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/45 mb-4">Rented presence</p>
          <ul className="space-y-2 font-sans text-[12px] text-[#1a1a1a]/55">
            <li>Social profiles</li>
            <li>Marketplace listings</li>
            <li>Ad accounts</li>
          </ul>
          <p className="mt-4 font-serif italic text-[12px] text-[#1a1a1a]/45">Algorithm, rules, and reach can change overnight</p>
        </div>
        <div className="border-2 border-[#1a1a1a] bg-[#FFF2EC] p-6">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B6914] mb-4">Owned presence</p>
          <ul className="space-y-2 font-sans text-[12px] text-[#1a1a1a]/75 font-medium">
            <li>Domain and store</li>
            <li>Customer list</li>
            <li>Product catalogue</li>
          </ul>
          <p className="mt-4 font-serif italic text-[12px] text-[#1a1a1a]/55">Traffic you earn should land somewhere you control</p>
        </div>
      </div>
    </Fig>
  )
}

export function BtsCh10OneHubDoorways({ caption }: D) {
  const doorways = [
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'social', label: 'Social' },
    { id: 'live', label: 'Live', connecting: true },
    { id: 'agents', label: 'Agents' },
  ]

  return (
    <Fig fig="FIG. 10.2" caption={caption}>
      <div className="mx-auto flex w-full max-w-[580px] flex-col items-center">
        <div className="grid w-full grid-cols-2 gap-x-3 gap-y-1 md:grid-cols-4">
          {doorways.map((d) => (
            <div key={d.id} className="flex flex-col items-center">
              <div
                className={`w-full border bg-[#FFF2EC] px-2 py-3 text-center ${
                  d.connecting ? 'border-dashed border-[#C5A059]' : 'border-[#1a1a1a]'
                }`}
              >
                <p className="font-mono text-[8.5px] font-bold uppercase leading-[1.35] tracking-[0.08em] text-[#1a1a1a]">
                  {d.label}
                </p>
              </div>
              {d.connecting ? (
                <div className="flex flex-col items-center py-1" aria-hidden>
                  <div className="h-3 w-px border-l border-dashed border-[#8B6914]" />
                  <div
                    className="relative mt-0.5 h-4 w-5 border border-[#8B6914] bg-[#FFF2EC]"
                    title="Plugging in"
                  >
                    <div className="absolute -bottom-1 left-[3px] h-1.5 w-0.5 bg-[#8B6914]" />
                    <div className="absolute -bottom-1 right-[3px] h-1.5 w-0.5 bg-[#8B6914]" />
                  </div>
                  <div className="mt-0.5 h-2 w-px border-l border-dashed border-[#8B6914]/35" />
                </div>
              ) : (
                <div className="h-8 w-px bg-[#1a1a1a]/35" aria-hidden />
              )}
            </div>
          ))}
        </div>

        <div className="flex w-full flex-col items-center" aria-hidden>
          <div className="h-px w-full bg-[#1a1a1a]/35" />
          <div className="h-4 w-px bg-[#1a1a1a]/35" />
        </div>

        <div className="w-full max-w-[240px] border-2 border-[#1a1a1a] bg-[#FFF2EC] px-6 py-5 text-center">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#1a1a1a]">Your store</p>
          <p className="mt-1 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-[#8B6914]">Hub</p>
        </div>

        <p className="mt-5 max-w-[420px] text-center font-mono text-[8px] font-bold uppercase leading-[1.55] tracking-[0.06em] text-[#8B6914] md:text-[8.5px]">
          Adding a channel = plugging a cable, not opening a second shop
        </p>
        <p className="mt-3 font-serif text-[13px] italic text-[#1a1a1a]/55">Many doorways, one home</p>
      </div>
    </Fig>
  )
}

/* —— Ch11 —— */

export function BtsCh11MethodLoop({ caption }: D) {
  const { uid, ink } = useArrowIds()
  const steps = ['Observe', 'Diagnose', 'Fix', 'Measure']
  const cx = 360
  const cy = 120
  const r = 75
  return (
    <Fig fig="FIG. 11.1" caption={caption}>
      <PlateSvg viewBox="0 0 720 260" ariaLabel="Store systems method loop">
        <ArrowDefs uid={uid} />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={INK} strokeWidth="1.4" opacity="0.25" />
        {steps.map((s, i) => {
          const angle = (i / steps.length) * Math.PI * 2 - Math.PI / 2
          const x = cx + Math.cos(angle) * r
          const y = cy + Math.sin(angle) * r
          const nx = cx + Math.cos(angle) * (r + 42)
          const ny = cy + Math.sin(angle) * (r + 42)
          const nextAngle = ((i + 1) / steps.length) * Math.PI * 2 - Math.PI / 2
          const nx2 = cx + Math.cos(nextAngle) * r
          const ny2 = cy + Math.sin(nextAngle) * r
          return (
            <g key={s}>
              <path d={`M${x},${y} A${r},${r} 0 0,1 ${nx2},${ny2}`} fill="none" stroke={INK} strokeWidth="1.2" markerEnd={`url(#${ink})`} opacity="0.6" />
              <text x={nx} y={ny + 4} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" fill={INK}>
                {s}
              </text>
            </g>
          )
        })}
        <text x={cx} y={cy + 5} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fontWeight="700" fill={GOLD_READABLE}>
          LOOP
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtsCh11FourChecks({ caption }: D) {
  const checks = [
    { n: '01', title: 'Catalogue', q: 'Can every channel sell what you have?' },
    { n: '02', title: 'Checkout', q: 'Does the price at pay match the page?' },
    { n: '03', title: 'Fulfilment', q: 'Does delivery match what you promised?' },
    { n: '04', title: 'Recovery', q: 'Do you win back honest abandoners?' },
  ]
  return (
    <Fig fig="FIG. 11.2" caption={caption}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {checks.map((c) => (
          <div key={c.n} className="flex gap-4 border border-[#1a1a1a] bg-[#FFF2EC] p-5">
            <span className="font-mono text-[12px] font-bold text-[#8B6914]">{c.n}</span>
            <div>
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#1a1a1a]">{c.title}</div>
              <div className="mt-2 font-sans text-[12px] leading-[1.5] text-[#1a1a1a]/65">{c.q}</div>
            </div>
          </div>
        ))}
      </div>
    </Fig>
  )
}

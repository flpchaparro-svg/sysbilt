import { Fig, MonoBox, ArrowDefs, PlateSvg, useArrowIds, CREAM, GOLD_READABLE, INK } from './diagramPrimitives'

type D = { caption: string }

/* —— Ch01 —— */

export function BtsCh01TwoReaders({ caption }: D) {
  const { uid, ink } = useArrowIds()
  return (
    <Fig fig="FIG. 01.1" caption={caption}>
      <PlateSvg viewBox="0 0 720 280" ariaLabel="One reader, then two">
        <ArrowDefs uid={uid} />
        <text x="180" y="28" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fontWeight="700" letterSpacing="2" fill={GOLD_READABLE}>
          BEFORE
        </text>
        <text x="540" y="28" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fontWeight="700" letterSpacing="2" fill={GOLD_READABLE}>
          NOW
        </text>
        <line x1="360" y1="40" x2="360" y2="250" stroke={INK} strokeWidth="1" opacity="0.12" />
        <rect x="80" y="60" width="200" height="160" rx="2" fill={CREAM} stroke={INK} strokeWidth="1.4" />
        <rect x="80" y="60" width="200" height="36" fill="#E8E8E8" opacity="0.5" />
        <circle cx="180" cy="200" r="14" fill="none" stroke={INK} strokeWidth="1.4" />
        <text x="180" y="130" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" fill="rgba(26,26,26,.5)">
          PRODUCT PAGE
        </text>
        <text x="180" y="248" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8.5" fontWeight="700" letterSpacing="1" fill={INK}>
          ONE READER: THE BUYER
        </text>
        <rect x="440" y="60" width="200" height="160" rx="2" fill={CREAM} stroke={INK} strokeWidth="1.4" />
        <rect x="440" y="60" width="200" height="36" fill="#E8E8E8" opacity="0.5" />
        <circle cx="500" cy="200" r="14" fill="none" stroke={INK} strokeWidth="1.4" />
        <rect x="560" y="192" width="24" height="16" rx="2" fill={INK} opacity="0.15" stroke={INK} strokeWidth="1" />
        <text x="572" y="204" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fill={INK}>
          AI
        </text>
        <text x="540" y="130" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" fill="rgba(26,26,26,.5)">
          PRODUCT PAGE
        </text>
        <text x="540" y="248" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7.5" fontWeight="700" letterSpacing="0.8" fill={INK}>
          TWO READERS: BUYER + MACHINE
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtsCh01MarketplaceOwned({ caption }: D) {
  const { uid, gold } = useArrowIds()
  const boxY = 48
  const boxH = 168
  const boxW = 268
  const mktX = 52
  const gap = 80
  const storeX = mktX + boxW + gap
  const mktCx = mktX + boxW / 2
  const storeCx = storeX + boxW / 2
  const connectorY = boxY + boxH / 2
  const gapCx = mktX + boxW + gap / 2
  const arrowStart = mktX + boxW + 8
  const arrowEnd = storeX - 8
  const stallW = 72
  const stallH = 48

  return (
    <Fig fig="FIG. 01.2" caption={caption}>
      <PlateSvg viewBox="0 0 720 260" ariaLabel="Marketplace vs owned store">
        <ArrowDefs uid={uid} />

        {/* Marketplace */}
        <rect x={mktX} y={boxY} width={boxW} height={boxH} fill="#E8E8E8" opacity="0.35" stroke={INK} strokeWidth="1" />
        <text x={mktCx} y={boxY + 28} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="12" fontWeight="700" letterSpacing="2.5" fill="rgba(26,26,26,.55)">
          MARKETPLACE
        </text>
        <rect
          x={mktCx - stallW / 2}
          y={boxY + 52}
          width={stallW}
          height={stallH}
          fill={CREAM}
          stroke={INK}
          strokeWidth="1.4"
          strokeDasharray="4 3"
        />
        <text x={mktCx} y={boxY + 82} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" fill={INK}>
          STALL
        </text>
        <text x={mktCx} y={boxY + boxH - 28} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9.5" fontWeight="600" fill="rgba(26,26,26,.58)">
          their customer · their rules · their fees
        </text>

        {/* Your store — same height as marketplace */}
        <rect x={storeX} y={boxY} width={boxW} height={boxH} fill={CREAM} stroke={INK} strokeWidth="2" />
        <text x={storeCx} y={boxY + 64} textAnchor="middle" fontFamily="Lora, serif" fontSize="20" fontWeight="600" fill={INK}>
          Your store
        </text>
        {[
          { offset: 98, label: 'your customer' },
          { offset: 118, label: 'your data' },
          { offset: 138, label: 'your margin' },
        ].map(({ offset, label }) => (
          <text
            key={label}
            x={storeCx}
            y={boxY + offset}
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="10.5"
            fontWeight="700"
            letterSpacing="1.8"
            fill={GOLD_READABLE}
          >
            {label}
          </text>
        ))}

        {/* Connector in the gap only — arrow on top so the head stays visible */}
        <path
          d={`M${arrowStart},${connectorY} L${arrowEnd},${connectorY}`}
          stroke={GOLD_READABLE}
          strokeWidth="1.5"
          markerEnd={`url(#${gold})`}
          fill="none"
        />
        <text x={gapCx} y={connectorY - 10} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fontWeight="700" letterSpacing="0.8" fill={GOLD_READABLE}>
          traffic
        </text>
        <text x={gapCx} y={connectorY + 22} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fontWeight="700" letterSpacing="0.8" fill={GOLD_READABLE}>
          feeds home
        </text>
      </PlateSvg>
    </Fig>
  )
}

/* —— Ch02 —— */

export function BtsCh02KeysArmour({ caption }: D) {
  return (
    <Fig fig="FIG. 02.1" caption={caption}>
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        <div className="border border-[#1a1a1a]/14 bg-[#FFF2EC] p-5 md:p-6">
          <p className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B6914]">What you own</p>
          <ul className="space-y-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#1a1a1a]">
            <li>Domain</li>
            <li>Platform account</li>
            <li>Product catalogue</li>
            <li>Customer list</li>
          </ul>
        </div>
        <div className="border border-[#1a1a1a]/14 bg-[#FFF2EC] p-5 md:p-6">
          <p className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B6914]">What keeps it safe</p>
          <ul className="space-y-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#1a1a1a]">
            <li>SSL</li>
            <li>Payment hand-off</li>
            <li>Fraud screening</li>
            <li>Access and keys</li>
            <li>Backups</li>
          </ul>
        </div>
      </div>
    </Fig>
  )
}

export function BtsCh02PaymentHandoff({ caption }: D) {
  const { uid, ink, gold } = useArrowIds()
  const boxH = 58
  const vbW = 720
  const vbH = 188
  const boxW = 148
  const gapW = 92
  const totalW = boxW * 3 + gapW * 2
  const startX = (vbW - totalW) / 2
  const boxY = 56
  const midY = boxY + boxH / 2

  const buyerX = startX
  const payX = startX + boxW + gapW
  const storeX = startX + (boxW + gapW) * 2
  const gap1Cx = buyerX + boxW + gapW / 2
  const gap2Cx = payX + boxW + gapW / 2

  const buyerCx = buyerX + boxW / 2
  const payCx = payX + boxW / 2
  const storeCx = storeX + boxW / 2

  return (
    <Fig fig="FIG. 02.2" caption={caption}>
      <PlateSvg viewBox={`0 0 ${vbW} ${vbH}`} ariaLabel="Payment hand-off architecture">
        <ArrowDefs uid={uid} />

        {/* Buyer */}
        <MonoBox x={buyerX} y={boxY} w={boxW} h={boxH} label="BUYER" fontSize={10} />
        <text x={buyerCx} y={boxY - 10} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fontWeight="700" fill={GOLD_READABLE}>
          card
        </text>

        {/* Gap 1 */}
        <path
          d={`M${buyerX + boxW + 4},${midY} L${payX - 4},${midY}`}
          stroke={INK}
          strokeWidth="1.5"
          markerEnd={`url(#${ink})`}
          fill="none"
        />
        <text x={gap1Cx} y={midY - 12} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fontWeight="700" fill={GOLD_READABLE}>
          encrypted
        </text>

        {/* Payment provider — same box size */}
        <MonoBox x={payX} y={boxY} w={boxW} h={boxH} label="PAYMENT PROVIDER" fontSize={7.5} />
        <text x={payCx} y={boxY + boxH + 18} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(26,26,26,.55)">
          card details live here
        </text>

        {/* Gap 2 */}
        <path
          d={`M${payX + boxW + 4},${midY} L${storeX - 4},${midY}`}
          stroke={GOLD_READABLE}
          strokeWidth="1.5"
          markerEnd={`url(#${gold})`}
          fill="none"
        />
        <text x={gap2Cx} y={midY - 18} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7.5" fontWeight="700" fill={GOLD_READABLE}>
          token + verdict
        </text>
        <text x={gap2Cx} y={midY - 8} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7.5" fontWeight="700" fill={GOLD_READABLE}>
          only
        </text>

        {/* Your store — same box size */}
        <MonoBox x={storeX} y={boxY} w={boxW} h={boxH} label="YOUR STORE" fontSize={10} />
        <text
          x={storeCx}
          y={boxY - 10}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="8"
          fill="rgba(26,26,26,.4)"
          textDecoration="line-through"
        >
          no card data
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtsCh02CatalogueAsset({ caption }: D) {
  const channels = ['Your store', 'Search engines', 'Shopping surfaces', 'AI assistants']

  return (
    <Fig fig="FIG. 02.3" caption={caption}>
      <div className="mx-auto flex max-w-[560px] flex-col items-center">
        {/* Source */}
        <div className="w-full border-2 border-[#1a1a1a] bg-[#FFF2EC] px-6 py-5 text-center">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#1a1a1a]">Your catalogue</p>
          <p className="mt-2 font-mono text-[9px] font-medium tracking-[0.08em] text-[#1a1a1a]/55">
            titles · specs · images · stock
          </p>
        </div>

        {/* Connector: one stem, one bar, four drops */}
        <div className="flex w-full flex-col items-center" aria-hidden>
          <div className="h-5 w-px bg-[#1a1a1a]/35" />
          <div className="h-px w-full bg-[#1a1a1a]/35" />
        </div>

        <div className="grid w-full grid-cols-2 gap-x-3 gap-y-0 md:grid-cols-4">
          {channels.map((label) => (
            <div key={label} className="flex flex-col items-center">
              <div className="h-5 w-px bg-[#1a1a1a]/35" aria-hidden />
              <div className="w-full border border-[#1a1a1a] bg-[#FFF2EC] px-2 py-3 text-center">
                <p className="font-mono text-[8.5px] font-bold uppercase leading-[1.35] tracking-[0.08em] text-[#1a1a1a] md:text-[9px]">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 border-t border-[#1a1a1a]/10 pt-4 text-center font-serif text-[13px] italic leading-[1.5] text-[#1a1a1a]/55">
          One source of truth, read by everything that sells for you
        </p>
      </div>
    </Fig>
  )
}

/* —— Ch03 —— */

export function BtsCh03Anatomy({ caption }: D) {
  return (
    <Fig fig="FIG. 03.1" caption={caption}>
      <div className="flex items-stretch gap-5 md:gap-8">
        <div className="flex w-[34%] min-w-[120px] max-w-[210px] shrink-0 flex-col border-[1.5px] border-[#1a1a1a] bg-[#FFF2EC]">
          <div className="flex flex-[2.2] flex-col justify-center gap-2 border-b border-[#1a1a1a]/18 p-3.5">
            <div className="h-2 w-[80%] bg-[#1a1a1a]" />
            <div className="h-2 w-[55%] bg-[#1a1a1a]" />
          </div>
          <div className="flex flex-[1.4] items-center gap-1.5 border-b border-[#1a1a1a]/18 p-3.5">
            <div className="h-[22px] w-[22px] shrink-0 rounded-full bg-[#C5A059]/50" />
            <div className="flex flex-1 flex-col gap-1.5">
              <div className="h-1 w-[90%] bg-[#1a1a1a]/28" />
            </div>
          </div>
          <div className="flex flex-[1.4] flex-col justify-center gap-1.5 border-b border-[#1a1a1a]/18 p-3.5">
            <div className="h-1.5 w-[75%] bg-[#1a1a1a]/30" />
          </div>
          <div className="flex flex-[1.1] items-center justify-center p-3.5">
            <div className="h-[26px] w-[80%] rounded-sm bg-[#C5A059]" />
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between py-1">
          {[
            ['01', 'Promise', 'Product, name, who it is for.'],
            ['02', 'Proof', 'Photos, details, reviews.'],
            ['03', 'Price clarity', 'Full cost, shipping, delivery window.'],
            ['04', 'Action', 'One unmistakable buy button.', true],
          ].map(([num, title, desc, gold]) => (
            <div key={num as string}>
              <div className={`font-mono text-[10px] font-bold uppercase tracking-[0.2em] ${gold ? 'text-[#8B6914]' : 'text-[#1a1a1a]'}`}>
                {num} &nbsp;{title}
              </div>
              <div className="mt-1 font-sans text-[13px] leading-[1.5] text-[#1a1a1a]/62">{desc as string}</div>
            </div>
          ))}
        </div>
      </div>
    </Fig>
  )
}

export function BtsCh03TwoReaders({ caption }: D) {
  return (
    <Fig fig="FIG. 03.2" caption={caption}>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
        <div>
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/55">The person reads</p>
          <ul className="space-y-2 font-sans text-[12px] leading-[1.5] text-[#1a1a1a]/70 list-none p-0 m-0">
            <li>Photography</li>
            <li>Outcome copy</li>
            <li>Reviews near the button</li>
            <li>Answered doubts</li>
          </ul>
        </div>
        <div className="hidden md:block w-[100px] border border-[#1a1a1a]/20 bg-[#E8E8E8]/40 self-stretch min-h-[120px]" aria-hidden />
        <div>
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6914]">The machine reads</p>
          <ul className="space-y-2 font-sans text-[12px] leading-[1.5] text-[#1a1a1a]/70 list-none p-0 m-0">
            <li>Complete attributes</li>
            <li>True stock</li>
            <li>Real delivery times</li>
            <li>Structured data</li>
            <li>Plain answer near the top</li>
          </ul>
        </div>
      </div>
      <p className="mt-6 pt-4 border-t border-[#1a1a1a]/10 font-serif italic text-[14px] text-[#1a1a1a]/65 text-center">
        Write for a careful buyer, and you have served both.
      </p>
    </Fig>
  )
}

export function BtsCh03Words({ caption }: D) {
  const rows = [
    ['Submit', 'Add to cart'],
    ['Shipping calculated at checkout', 'Free shipping over a stated amount, delivered in a stated window'],
    ['Learn more', 'See how it fits'],
  ]
  return (
    <Fig fig="FIG. 03.3" caption={caption}>
      <div className="grid grid-cols-2 gap-6 md:gap-10">
        <div>
          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/45">Loses</p>
          {rows.map(([weak]) => (
            <div key={weak} className="mb-3 border border-[#1a1a1a]/15 bg-[#E8E8E8]/60 px-4 py-3 font-sans text-[12px] text-[#1a1a1a]/45 line-through decoration-[#1a1a1a]/25">
              {weak}
            </div>
          ))}
        </div>
        <div>
          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6914]">Wins</p>
          {rows.map(([, strong]) => (
            <div key={strong} className="mb-3 border border-[#1a1a1a] bg-[#FFF2EC] px-4 py-3 font-sans text-[12px] font-semibold text-[#1a1a1a]">
              {strong}
            </div>
          ))}
        </div>
      </div>
    </Fig>
  )
}

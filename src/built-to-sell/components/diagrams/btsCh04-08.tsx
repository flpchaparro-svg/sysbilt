import { Fig, MonoBox, ArrowDefs, PlateSvg, useArrowIds, CREAM, GOLD_READABLE, INK } from './diagramPrimitives'

type D = { caption: string }

/* —— Ch04 —— */

export function BtsCh04PageJobs({ caption }: D) {
  const pages = [
    { n: '01', title: 'Home', job: 'Promise and path' },
    { n: '02', title: 'Category', job: 'Browse and filter' },
    { n: '03', title: 'Product', job: 'Convince and convert' },
    { n: '04', title: 'Cart', job: 'Confirm and upsell' },
    { n: '05', title: 'Checkout', job: 'Pay with confidence' },
    { n: '06', title: 'Post-purchase', job: 'Reassure and retain' },
  ]
  return (
    <Fig fig="FIG. 04.1" caption={caption}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {pages.map((p) => (
          <div key={p.n} className="border border-[#1a1a1a]/18 bg-[#FFF2EC] p-4">
            <div className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#8B6914]">{p.n}</div>
            <div className="mt-1 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#1a1a1a]">{p.title}</div>
            <div className="mt-2 font-sans text-[12px] text-[#1a1a1a]/60">{p.job}</div>
          </div>
        ))}
      </div>
    </Fig>
  )
}

export function BtsCh04CheckoutBleed({ caption }: D) {
  const { uid, ink } = useArrowIds()
  return (
    <Fig fig="FIG. 04.2" caption={caption}>
      <PlateSvg viewBox="0 0 720 260" ariaLabel="Checkout trust bleed">
        <ArrowDefs uid={uid} />
        <rect x="80" y="40" width="200" height="180" rx="2" fill={CREAM} stroke={INK} strokeWidth="1.4" />
        <text x="180" y="68" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" fill={INK}>
          PRODUCT PAGE
        </text>
        <text x="180" y="120" textAnchor="middle" fontFamily="Lora, serif" fontSize="11" fill="rgba(26,26,26,.55)">
          trust built here
        </text>
        <path d="M280,130 L360,130" stroke={INK} strokeWidth="1.5" markerEnd={`url(#${ink})`} fill="none" />
        <rect x="360" y="70" width="280" height="120" rx="2" fill={CREAM} stroke={INK} strokeWidth="2" />
        <text x="500" y="100" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" fill={INK}>
          CHECKOUT
        </text>
        <text x="500" y="130" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(26,26,26,.5)">
          shipping · returns · security
        </text>
        <text x="500" y="155" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7.5" fontWeight="700" fill={GOLD_READABLE}>
          must not contradict product page
        </text>
        <path d="M180,220 L180,248 M500,190 L500,248" stroke={INK} strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />
        <text x="340" y="252" textAnchor="middle" fontFamily="Lora, serif" fontSize="11" fontStyle="italic" fill="rgba(26,26,26,.45)">
          One story from first click to paid
        </text>
      </PlateSvg>
    </Fig>
  )
}

/* —— Ch05 —— */

export function BtsCh05FourWays({ caption }: D) {
  const ways = [
    { n: '01', title: 'Search', desc: 'They look for you' },
    { n: '02', title: 'Social', desc: 'They discover you' },
    { n: '03', title: 'Email', desc: 'You remind them' },
    { n: '04', title: 'Marketplaces', desc: 'They compare you' },
  ]
  return (
    <Fig fig="FIG. 05.1" caption={caption}>
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {ways.map((w) => (
          <div key={w.n} className="border border-[#1a1a1a] bg-[#FFF2EC] p-4 md:p-5">
            <span className="font-mono text-[10px] font-bold text-[#8B6914]">{w.n}</span>
            <div className="mt-1 font-mono text-[12px] font-bold uppercase tracking-[0.12em]">{w.title}</div>
            <div className="mt-2 font-sans text-[12px] text-[#1a1a1a]/60">{w.desc}</div>
          </div>
        ))}
      </div>
    </Fig>
  )
}

export function BtsCh05JourneyMap({ caption }: D) {
  const { uid, ink } = useArrowIds()
  const steps = ['See', 'Click', 'Land', 'Browse', 'Buy', 'Return']
  return (
    <Fig fig="FIG. 05.2" caption={caption}>
      <PlateSvg viewBox="0 0 720 120" ariaLabel="Customer journey map">
        <ArrowDefs uid={uid} />
        {steps.map((s, i) => {
          const x = 40 + i * 112
          return (
            <g key={s}>
              <MonoBox x={x} y={40} w={88} h={40} label={s} fontSize={9} gold={i === 4} />
              {i < steps.length - 1 && (
                <path d={`M${x + 88},60 L${x + 112},60`} stroke={INK} strokeWidth="1.4" markerEnd={`url(#${ink})`} fill="none" />
              )}
            </g>
          )
        })}
      </PlateSvg>
    </Fig>
  )
}

export function BtsCh05CartRecovery({ caption }: D) {
  const { uid, ink, gold } = useArrowIds()
  return (
    <Fig fig="FIG. 05.3" caption={caption}>
      <PlateSvg viewBox="0 0 720 200" ariaLabel="Cart recovery loop">
        <ArrowDefs uid={uid} />
        <MonoBox x={40} y={70} w={120} h={44} label="ABANDONED CART" fontSize={8} />
        <path d="M160,92 L220,92" stroke={INK} strokeWidth="1.4" markerEnd={`url(#${ink})`} fill="none" />
        <MonoBox x={220} y={70} w={100} h={44} label="EMAIL 1" fontSize={9} />
        <path d="M320,92 L380,92" stroke={INK} strokeWidth="1.4" markerEnd={`url(#${ink})`} fill="none" />
        <MonoBox x={380} y={70} w={100} h={44} label="EMAIL 2" fontSize={9} />
        <path d="M480,92 L540,92" stroke={GOLD_READABLE} strokeWidth="1.5" markerEnd={`url(#${gold})`} fill="none" />
        <MonoBox x={540} y={70} w={120} h={44} label="RETURN + BUY" fontSize={8} gold />
        <text x={360} y={160} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(26,26,26,.5)">
          reminder · incentive · deadline — only if stock is real
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtsCh05BackInStock({ caption }: D) {
  return (
    <Fig fig="FIG. 05.4" caption={caption}>
      <div className="flex flex-col md:flex-row items-stretch gap-4">
        <div className="flex-1 border border-[#1a1a1a]/20 bg-[#E8E8E8]/50 p-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/45 mb-3">Out of stock page</p>
          <div className="h-24 border border-dashed border-[#1a1a1a]/25 flex items-center justify-center font-sans text-[12px] text-[#1a1a1a]/40">
            Sold out
          </div>
        </div>
        <div className="flex items-center justify-center font-mono text-[10px] font-bold text-[#8B6914]">→</div>
        <div className="flex-1 border border-[#1a1a1a] bg-[#FFF2EC] p-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6914] mb-3">Notify me</p>
          <div className="space-y-2">
            <div className="h-8 border border-[#1a1a1a]/30 bg-white" />
            <div className="h-8 bg-[#C5A059] flex items-center justify-center font-mono text-[9px] font-bold text-[#1a1a1a]">
              NOTIFY WHEN BACK
            </div>
          </div>
          <p className="mt-3 font-sans text-[11px] text-[#1a1a1a]/55">Capture demand. Honour the promise.</p>
        </div>
      </div>
    </Fig>
  )
}

/* —— Ch06 —— */

export function BtsCh06OperatingRhythm({ caption }: D) {
  const weeks = [
    { w: 'Mon', task: 'Orders + fulfilment' },
    { w: 'Wed', task: 'Stock + catalogue' },
    { w: 'Fri', task: 'Campaigns + recovery' },
  ]
  return (
    <Fig fig="FIG. 06.1" caption={caption}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {weeks.map((d) => (
          <div key={d.w} className="border-t-2 border-[#C5A059] bg-[#FFF2EC] p-5">
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B6914]">{d.w}</div>
            <div className="mt-2 font-sans text-[13px] text-[#1a1a1a]/75">{d.task}</div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-center font-serif italic text-[13px] text-[#1a1a1a]/55">Small recurring blocks beat heroic firefighting</p>
    </Fig>
  )
}

export function BtsCh06OneStockTruth({ caption }: D) {
  const channels = ['Online store', 'In-person sales', 'Marketplace', 'Social shop']

  return (
    <Fig fig="FIG. 06.2" caption={caption}>
      <div className="mx-auto flex max-w-[580px] flex-col items-center">
        {/* One source, four channels — same tree pattern as FIG. 02.3 */}
        <div className="w-full max-w-[220px] border-2 border-[#1a1a1a] bg-[#FFF2EC] px-5 py-4 text-center">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#1a1a1a]">Stock truth</p>
        </div>

        <div className="flex w-full flex-col items-center" aria-hidden>
          <div className="h-4 w-px bg-[#1a1a1a]/35" />
          <div className="h-px w-full bg-[#1a1a1a]/35" />
        </div>

        <div className="grid w-full grid-cols-2 gap-x-3 md:grid-cols-4">
          {channels.map((label) => (
            <div key={label} className="flex flex-col items-center">
              <div className="flex flex-col items-center" aria-hidden>
                <div className="h-4 w-px bg-[#1a1a1a]/35" />
                <span className="font-mono text-[10px] font-bold leading-none text-[#8B6914]">↔</span>
              </div>
              <div className="mt-1 w-full border border-[#1a1a1a] bg-[#FFF2EC] px-2 py-3 text-center">
                <p className="font-mono text-[8.5px] font-bold uppercase leading-[1.35] tracking-[0.08em] text-[#1a1a1a] md:text-[9px]">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-[#1a1a1a]/45">
          Two-way sync — every channel reads the same count
        </p>

        {/* Without it — crossed-out failure scenario */}
        <div className="relative mt-8 w-full border border-dashed border-[#1a1a1a]/25 bg-[#E8E8E8]/25 px-4 py-5 md:px-6">
          <div
            className="pointer-events-none absolute inset-3 border border-[#1a1a1a]/15"
            aria-hidden
            style={{
              background:
                'linear-gradient(to top right, transparent calc(50% - 0.5px), rgba(26,26,26,0.18), transparent calc(50% + 0.5px)), linear-gradient(to top left, transparent calc(50% - 0.5px), rgba(26,26,26,0.18), transparent calc(50% + 0.5px))',
            }}
          />
          <p className="relative text-center font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#1a1a1a]/45">
            What happens without it
          </p>
          <div className="relative mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {[
              { channel: 'Channel A', buyer: 'Buyer 1' },
              { channel: 'Channel B', buyer: 'Buyer 2' },
            ].map(({ channel, buyer }) => (
              <div key={channel} className="border border-[#1a1a1a]/20 bg-[#FFF2EC]/80 px-4 py-3 text-center opacity-55">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#1a1a1a]">{channel}</p>
                <p className="mt-2 font-sans text-[11px] text-[#1a1a1a]/65">sells &ldquo;last unit&rdquo;</p>
                <p className="mt-1 font-mono text-[8px] text-[#1a1a1a]/45">→ {buyer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fig>
  )
}

/* —— Ch07 —— */

export function BtsCh07WhatRunsUnderneath({ caption }: D) {
  const layers = [
    { label: 'What shoppers see', items: 'Pages, search, checkout' },
    { label: 'What staff use', items: 'Admin, orders, reports' },
    { label: 'What connects', items: 'Payments, shipping, email, accounting' },
  ]
  return (
    <Fig fig="FIG. 07.1" caption={caption}>
      <div className="space-y-3">
        {layers.map((l, i) => (
          <div key={l.label} className={`border border-[#1a1a1a] p-4 ${i === 2 ? 'bg-[#FFF2EC]' : 'bg-white/60'}`}>
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B6914]">{l.label}</div>
            <div className="mt-1 font-sans text-[12px] text-[#1a1a1a]/70">{l.items}</div>
          </div>
        ))}
      </div>
    </Fig>
  )
}

export function BtsCh07ProductProblem({ caption }: D) {
  return (
    <Fig fig="FIG. 07.2" caption={caption}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="border border-[#1a1a1a]/15 bg-[#E8E8E8]/50 p-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/45 mb-3">Symptom</p>
          <ul className="font-sans text-[12px] space-y-2 text-[#1a1a1a]/55 list-disc pl-4">
            <li>High traffic, low conversion</li>
            <li>Support tickets about the same product</li>
            <li>Returns clustered on one SKU</li>
          </ul>
        </div>
        <div className="border border-[#1a1a1a] bg-[#FFF2EC] p-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6914] mb-3">Often the product page</p>
          <ul className="font-sans text-[12px] space-y-2 text-[#1a1a1a]/75 list-disc pl-4">
            <li>Missing size or compatibility</li>
            <li>Photos that hide the truth</li>
            <li>Promises checkout cannot keep</li>
          </ul>
        </div>
      </div>
    </Fig>
  )
}

export function BtsCh07HonestPrice({ caption }: D) {
  return (
    <Fig fig="FIG. 07.3" caption={caption}>
      <div className="max-w-md mx-auto border border-[#1a1a1a] bg-[#FFF2EC] p-6">
        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/45">Product page</div>
        <div className="mt-4 font-serif text-[28px] font-semibold text-[#1a1a1a]">$89.00</div>
        <div className="mt-3 space-y-1 font-sans text-[12px] text-[#1a1a1a]/70">
          <div>Includes GST</div>
          <div>Free shipping over $100 · 2–4 business days</div>
          <div className="text-[#8B6914] font-semibold">Same total at checkout</div>
        </div>
      </div>
    </Fig>
  )
}

export function BtsCh07OneSecondPaying({ caption }: D) {
  const { uid, ink } = useArrowIds()
  return (
    <Fig fig="FIG. 07.4" caption={caption}>
      <PlateSvg viewBox="0 0 720 180" ariaLabel="One second to paying">
        <ArrowDefs uid={uid} />
        <MonoBox x={60} y={60} w={140} h={48} label="CART REVIEW" fontSize={8} />
        <path d="M200,84 L260,84" stroke={INK} strokeWidth="1.4" markerEnd={`url(#${ink})`} fill="none" />
        <MonoBox x={260} y={60} w={120} h={48} label="DETAILS" fontSize={9} />
        <path d="M380,84 L440,84" stroke={INK} strokeWidth="1.4" markerEnd={`url(#${ink})`} fill="none" />
        <MonoBox x={440} y={60} w={120} h={48} label="PAYMENT" fontSize={9} gold />
        <path d="M560,84 L620,84" stroke={INK} strokeWidth="1.4" markerEnd={`url(#${ink})`} fill="none" />
        <MonoBox x={620} y={60} w={80} h={48} label="DONE" fontSize={9} />
        <text x={360} y={150} textAnchor="middle" fontFamily="Lora, serif" fontSize="12" fontStyle="italic" fill="rgba(26,26,26,.5)">
          Every extra field is a reason to leave
        </text>
      </PlateSvg>
    </Fig>
  )
}

/* —— Ch08 —— */

export function BtsCh08ThreeStages({ caption }: D) {
  const stages = [
    { n: '01', title: 'Found', sub: 'Search, social, AI' },
    { n: '02', title: 'Understood', sub: 'Clear offer, proof' },
    { n: '03', title: 'Bought', sub: 'Checkout matches promise' },
  ]
  return (
    <Fig fig="FIG. 08.1" caption={caption}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stages.map((s) => (
          <div key={s.n} className="relative border border-[#1a1a1a] bg-[#FFF2EC] p-5">
            <span className="font-mono text-[10px] font-bold text-[#8B6914]">{s.n}</span>
            <div className="mt-1 font-mono text-[13px] font-bold uppercase tracking-[0.1em]">{s.title}</div>
            <div className="mt-2 font-sans text-[12px] text-[#1a1a1a]/60">{s.sub}</div>
          </div>
        ))}
      </div>
    </Fig>
  )
}

export function BtsCh08RankedCitedTransacted({ caption }: D) {
  const cols = [
    { title: 'Ranked', items: ['Titles', 'Categories', 'Reviews', 'Speed'] },
    { title: 'Cited', items: ['FAQs', 'Specs', 'Policies', 'Structured data'] },
    { title: 'Transacted', items: ['Stock truth', 'Price clarity', 'Checkout', 'Fulfilment'] },
  ]
  return (
    <Fig fig="FIG. 08.2" caption={caption}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {cols.map((c, i) => (
          <div key={c.title} className={`border p-5 ${i === 2 ? 'border-[#C5A059] border-2 bg-[#FFF2EC]' : 'border-[#1a1a1a]/18 bg-white/50'}`}>
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B6914]">{c.title}</div>
            <ul className="mt-4 space-y-2 font-sans text-[12px] text-[#1a1a1a]/70 list-none p-0">
              {c.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-[#C5A059]">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Fig>
  )
}

export function BtsCh08FeedIsStore({ caption }: D) {
  const feedRows = ['name', 'price', 'stock', 'size', 'delivery']

  return (
    <Fig fig="FIG. 08.3" caption={caption}>
      <div className="mx-auto flex w-full max-w-[600px] flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {/* What the person sees */}
          <div className="flex min-h-[220px] flex-col border border-[#1a1a1a] bg-[#FFF2EC] p-4 md:p-5">
            <p className="mb-4 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#1a1a1a]/50">
              What the person sees
            </p>
            <div className="flex flex-1 flex-col border border-[#1a1a1a]/15 bg-white/50">
              <div className="h-5 border-b border-[#1a1a1a]/12 bg-[#E8E8E8]/60" />
              <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="aspect-[4/3] w-full border border-[#1a1a1a]/12 bg-[#E8E8E8]/40" />
                <div className="space-y-2">
                  <div className="h-2 w-[70%] bg-[#1a1a1a]/25" />
                  <div className="h-2 w-[45%] bg-[#1a1a1a]/15" />
                </div>
                <div className="mt-auto h-8 w-[55%] bg-[#C5A059]/75" />
              </div>
            </div>
          </div>

          {/* What the machine sees */}
          <div className="relative flex min-h-[220px] flex-col border-2 border-[#1a1a1a] bg-[#FFF2EC] p-4 md:p-5">
            <p className="mb-4 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#8B6914]">
              What the machine sees
            </p>
            <div className="flex flex-1 flex-col font-mono text-[10px]">
              <div className="grid grid-cols-[1fr_auto] gap-x-4 border-b border-[#1a1a1a]/20 pb-2 font-bold uppercase tracking-[0.1em] text-[#1a1a1a]/45">
                <span>Field</span>
                <span>Value</span>
              </div>
              {feedRows.map((row) => (
                <div key={row} className="grid grid-cols-[1fr_auto] gap-x-4 border-b border-[#1a1a1a]/10 py-2 text-[#1a1a1a]/70">
                  <span className="uppercase tracking-[0.08em]">{row}</span>
                  <span className="text-[#1a1a1a]/35">···</span>
                </div>
              ))}
            </div>
            <div className="absolute -bottom-3 right-4 flex items-center gap-2 border border-[#1a1a1a] bg-[#FFF2EC] px-3 py-1.5 shadow-sm">
              <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-[#1a1a1a]/10 font-mono text-[7px] font-bold text-[#1a1a1a]">
                AI
              </div>
              <span className="font-mono text-[7.5px] font-bold uppercase tracking-[0.1em] text-[#8B6914]">reads this</span>
            </div>
          </div>
        </div>

        <p className="border-t border-[#1a1a1a]/10 pt-4 text-center font-serif text-[13px] italic leading-[1.55] text-[#1a1a1a]/55">
          Both must be true. Only one of them is read by the systems doing the choosing.
        </p>
      </div>
    </Fig>
  )
}

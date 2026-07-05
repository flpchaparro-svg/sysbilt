import { Fig, MonoBox, ArrowDefs, PlateSvg, useArrowIds, CREAM, GOLD_READABLE, INK } from './diagramPrimitives'

type D = { caption: string }

/* —— Ch01 —— */

export function BtcCh01OldWay({ caption }: D) {
  const { uid, ink, gold } = useArrowIds()
  const leftItems = ['INBOX', 'NOTEBOOK', 'STICKY NOTES', 'MEMORY']
  return (
    <Fig fig="FIG. 01.1" caption={caption}>
      <PlateSvg viewBox="0 0 720 300" ariaLabel="Where leads used to live">
        <ArrowDefs uid={uid} />
        <text x="180" y="28" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fontWeight="700" letterSpacing="2" fill="rgba(26,26,26,.45)">
          THE OLD WAY
        </text>
        <text x="540" y="28" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fontWeight="700" letterSpacing="2" fill={GOLD_READABLE}>
          ONE SYSTEM
        </text>
        <line x1="360" y1="40" x2="360" y2="270" stroke={INK} strokeWidth="1" opacity="0.12" />
        {leftItems.map((label, i) => (
          <g key={label}>
            <MonoBox x={60 + (i % 2) * 110} y={55 + Math.floor(i / 2) * 58} w={100} h={40} label={label} fontSize={7} />
          </g>
        ))}
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={120 + i * 40} cy={200 + i * 12} r="6" fill="none" stroke={INK} strokeWidth="1.2" strokeDasharray="2 2" opacity="0.5" />
        ))}
        <text x="180" y="248" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7.5" fontWeight="700" fill="rgba(26,26,26,.45)">
          leads fall between
        </text>
        <rect x="420" y="70" width="240" height="160" rx="2" fill={CREAM} stroke={INK} strokeWidth="2" />
        <text x="540" y="110" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" fill={INK}>
          ONE MEMORY
        </text>
        <text x="540" y="140" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fontWeight="700" fill={GOLD_READABLE}>
          always awake
        </text>
        <path d="M480,180 Q540,200 600,180" stroke={GOLD_READABLE} strokeWidth="1.4" fill="none" markerEnd={`url(#${gold})`} />
        <text x="540" y="210" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7.5" fill="rgba(26,26,26,.55)">
          catches every lead
        </text>
        <path d="M300,130 L400,130" stroke={INK} strokeWidth="1.2" strokeDasharray="4 3" opacity="0.3" markerEnd={`url(#${ink})`} fill="none" />
      </PlateSvg>
    </Fig>
  )
}

export function BtcCh01ThreeLeaks({ caption }: D) {
  const leaks = ['LEAD YOU FORGOT', 'QUOTE WENT QUIET', 'CLIENT YOU WON']
  return (
    <Fig fig="FIG. 01.2" caption={caption}>
      <PlateSvg viewBox="0 0 720 280" ariaLabel="The three leaks">
        <defs>
          <clipPath id="bucket-clip">
            <path d="M260,80 L460,80 L420,220 L300,220 Z" />
          </clipPath>
        </defs>
        <path d="M260,80 L460,80 L420,220 L300,220 Z" fill={CREAM} stroke={INK} strokeWidth="2" />
        <text x="360" y="150" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" fill={INK}>
          LEADS YOU
        </text>
        <text x="360" y="168" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" fill={INK}>
          ALREADY PAID FOR
        </text>
        {leaks.map((label, i) => {
          const x = 120 + i * 200
          return (
            <g key={label}>
              <path d={`M${300 + i * 40},80 L${x + 60},40 L${x + 60},30`} stroke={INK} strokeWidth="1.2" strokeDasharray="3 2" fill="none" opacity="0.6" />
              <text x={x + 60} y="22" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fontWeight="700" fill="rgba(26,26,26,.55)">
                {label}
              </text>
            </g>
          )
        })}
        <text x="360" y="258" textAnchor="middle" fontFamily="Lora, serif" fontSize="12" fontStyle="italic" fill="rgba(26,26,26,.5)">
          One cause: no memory that survives a busy week
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtcCh01InboxOrSystem({ caption }: D) {
  return (
    <Fig fig="FIG. 01.3" caption={caption}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="border border-[#1a1a1a]/20 bg-[#E8E8E8]/45 p-5">
          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/45">Inbox + spreadsheet</p>
          <div className="space-y-2">
            <div className="border border-[#1a1a1a]/20 bg-white/60 px-3 py-2 font-mono text-[9px] font-bold text-[#1a1a1a]/50">INBOX</div>
            <div className="border border-[#1a1a1a]/20 bg-white/60 px-3 py-2 font-mono text-[9px] font-bold text-[#1a1a1a]/50">SPREADSHEET</div>
          </div>
          <p className="mt-4 font-sans text-[12px] text-[#1a1a1a]/55">Depends on remembering. Breaks when busy.</p>
        </div>
        <div className="border-2 border-[#1a1a1a] bg-[#FFF2EC] p-5">
          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6914]">Pipeline board</p>
          <div className="grid grid-cols-3 gap-2">
            {['NEW', 'QUOTED', 'WON'].map((s) => (
              <div key={s} className="border border-[#1a1a1a] bg-white/50 px-2 py-3 text-center font-mono text-[8px] font-bold tracking-[0.08em]">
                {s}
              </div>
            ))}
          </div>
          <p className="mt-3 font-mono text-[9px] font-bold text-[#8B6914]">catches · remembers · nudges</p>
          <p className="mt-2 font-sans text-[12px] text-[#1a1a1a]/70">On its worst week too.</p>
        </div>
      </div>
    </Fig>
  )
}

/* —— Ch02 —— */

export function BtcCh02FourWords({ caption }: D) {
  const words = [
    { title: 'CONTACT', desc: 'A person you can reach' },
    { title: 'COMPANY', desc: 'The organisation they belong to' },
    { title: 'DEAL', desc: 'A sale in progress' },
    { title: 'ACTIVITY', desc: 'Every touch, logged' },
  ]
  return (
    <Fig fig="FIG. 02.1" caption={caption}>
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {words.map((w) => (
          <div key={w.title} className="border border-[#1a1a1a] bg-[#FFF2EC] p-4 md:p-5">
            <div className="font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-[#1a1a1a]">{w.title}</div>
            <div className="mt-2 font-sans text-[12px] text-[#1a1a1a]/60">{w.desc}</div>
          </div>
        ))}
      </div>
    </Fig>
  )
}

export function BtcCh02RightSized({ caption }: D) {
  const tiers = [
    { title: 'Spreadsheet', size: 'sm', note: 'Fine until it isn\'t' },
    { title: 'Modern middle tier', size: 'md', note: 'This book lives here', gold: true },
    { title: 'Enterprise platform', size: 'lg', note: 'Power you may not need yet' },
  ]
  return (
    <Fig fig="FIG. 02.2" caption={caption}>
      <div className="flex items-end justify-center gap-4 md:gap-8">
        {tiers.map((t) => (
          <div key={t.title} className="flex flex-col items-center">
            <div
              className={`flex w-[100px] items-center justify-center border text-center md:w-[140px] ${
                t.gold ? 'border-2 border-[#1a1a1a] bg-[#FFF2EC]' : 'border border-[#1a1a1a]/25 bg-[#E8E8E8]/40'
              } ${t.size === 'sm' ? 'h-16' : t.size === 'md' ? 'h-28' : 'h-40'} px-2`}
            >
              <p className={`font-mono text-[8px] font-bold uppercase leading-[1.35] tracking-[0.08em] ${t.gold ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/55'}`}>
                {t.title}
              </p>
            </div>
            <p className={`mt-2 max-w-[120px] text-center font-sans text-[11px] ${t.gold ? 'font-medium text-[#1a1a1a]/75' : 'text-[#1a1a1a]/50'}`}>
              {t.note}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center font-serif text-[13px] italic text-[#1a1a1a]/55">
        Buy the smallest system your next two years can live in
      </p>
    </Fig>
  )
}

export function BtcCh02WhatYouOwn({ caption }: D) {
  const items = [
    { title: 'The account', sub: 'In your name' },
    { title: 'The data', sub: 'Exportable' },
    { title: 'The configuration', sub: 'Documented' },
  ]
  return (
    <Fig fig="FIG. 02.3" caption={caption}>
      <div className="mx-auto max-w-[480px]">
        <div className="border-2 border-[#1a1a1a] bg-[#FFF2EC] p-6 text-center">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#8B6914]">What you own</p>
          <div className="mt-5 space-y-3">
            {items.map((item) => (
              <div key={item.title} className="border border-[#1a1a1a]/18 bg-white/50 px-4 py-3">
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#1a1a1a]">{item.title}</div>
                <div className="mt-1 font-sans text-[12px] text-[#1a1a1a]/60">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-5 text-center font-serif text-[13px] italic text-[#1a1a1a]/55">
          The software is the shelf. The memory is the asset.
        </p>
      </div>
    </Fig>
  )
}

/* —— Ch03 —— */

export function BtcCh03TooManyFew({ caption }: D) {
  return (
    <Fig fig="FIG. 03.1" caption={caption}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="border border-[#1a1a1a]/20 bg-[#E8E8E8]/40 p-4">
          <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#1a1a1a]/45">Too many</p>
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-6 border border-[#1a1a1a]/15 bg-white/40" />
            ))}
          </div>
          <p className="mt-3 font-sans text-[11px] text-[#1a1a1a]/50">Nobody updates it</p>
        </div>
        <div className="border-2 border-[#1a1a1a] bg-[#FFF2EC] p-4">
          <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#8B6914]">Just right</p>
          <div className="flex gap-1">
            {['NEW', 'QUAL', 'QUOTE', 'NEG', 'WON'].map((s) => (
              <div key={s} className="flex-1 border border-[#1a1a1a] py-2 text-center font-mono text-[7px] font-bold">
                {s}
              </div>
            ))}
          </div>
          <p className="mt-3 font-sans text-[11px] text-[#1a1a1a]/70">A real change per stage</p>
        </div>
        <div className="border border-[#1a1a1a]/20 bg-[#E8E8E8]/40 p-4">
          <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#1a1a1a]/45">Too few</p>
          <div className="flex gap-2">
            {['MAYBE', 'LATER', 'DONE'].map((s) => (
              <div key={s} className="flex-1 border border-[#1a1a1a]/15 bg-white/40 py-4 text-center font-mono text-[8px] font-bold text-[#1a1a1a]/45">
                {s}
              </div>
            ))}
          </div>
          <p className="mt-3 font-sans text-[11px] text-[#1a1a1a]/50">Tells you nothing</p>
        </div>
      </div>
    </Fig>
  )
}

export function BtcCh03Pipeline({ caption }: D) {
  const { uid, ink } = useArrowIds()
  const stages = [
    { label: 'NEW', rule: 'Enquiry received' },
    { label: 'QUAL', rule: 'Fit confirmed' },
    { label: 'QUOTE', rule: 'Price sent' },
    { label: 'NEGOTIATE', rule: 'Terms discussed' },
    { label: 'WON', rule: 'Signed' },
    { label: 'LOST', rule: 'Closed with reason' },
  ]
  return (
    <Fig fig="FIG. 03.2" caption={caption}>
      <PlateSvg viewBox="0 0 720 200" ariaLabel="Pipeline stages">
        <ArrowDefs uid={uid} />
        {stages.map((s, i) => {
          const x = 20 + i * 115
          return (
            <g key={s.label}>
              <MonoBox x={x} y={40} w={95} h={36} label={s.label} fontSize={7} gold={i === 2} />
              <text x={x + 47} y={95} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="6.5" fill="rgba(26,26,26,.5)">
                {s.rule}
              </text>
              {i < stages.length - 1 && (
                <path d={`M${x + 95},58 L${x + 115},58`} stroke={INK} strokeWidth="1.3" markerEnd={`url(#${ink})`} fill="none" />
              )}
            </g>
          )
        })}
      </PlateSvg>
    </Fig>
  )
}

export function BtcCh03OneOwner({ caption }: D) {
  return (
    <Fig fig="FIG. 03.3" caption={caption}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="border border-dashed border-[#1a1a1a]/30 bg-[#E8E8E8]/30 p-5">
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/45">No owner</p>
          <div className="space-y-2 font-mono text-[10px] text-[#1a1a1a]/45">
            <div>Owner: —</div>
            <div>Next step: —</div>
            <div>Due: —</div>
          </div>
          <p className="mt-4 font-serif text-[12px] italic text-[#1a1a1a]/45">Being remembered fondly</p>
        </div>
        <div className="border border-[#1a1a1a] bg-[#FFF2EC] p-5">
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6914]">Owner named</p>
          <div className="space-y-2 font-mono text-[10px] font-bold text-[#1a1a1a]">
            <div>Owner: <span className="text-[#8B6914]">Alex</span></div>
            <div>Next step: Call back</div>
            <div>Due: <span className="text-[#8B6914]">Thu 14 Mar</span></div>
          </div>
          <p className="mt-4 font-serif text-[12px] italic text-[#1a1a1a]/60">Being worked</p>
        </div>
      </div>
    </Fig>
  )
}

export function BtcCh03ReadingBoard({ caption }: D) {
  const columns = [
    { name: 'NEW', count: 3 },
    { name: 'QUOTED', count: 8, tag: 'follow-up problem', gold: true },
    { name: 'NEGOTIATE', count: 2, tag: "today's call" },
    { name: 'WON', count: 4 },
  ]
  return (
    <Fig fig="FIG. 03.4" caption={caption}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {columns.map((col) => (
          <div key={col.name} className={`border p-4 ${col.gold ? 'border-[#C5A059] border-2 bg-[#FFF2EC]' : 'border-[#1a1a1a]/18 bg-[#FFF2EC]'}`}>
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#1a1a1a]">{col.name}</div>
            <div className="mt-2 font-serif text-[24px] font-semibold text-[#1a1a1a]">{col.count}</div>
            {col.tag && (
              <div className="mt-2 font-mono text-[8px] font-bold uppercase tracking-[0.08em] text-[#8B6914]">{col.tag}</div>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 text-center font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[#8B6914]">
        Weighted total → the quarter&apos;s honest weather
      </p>
    </Fig>
  )
}

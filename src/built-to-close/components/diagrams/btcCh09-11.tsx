import { Fig, MonoBox, ArrowDefs, PlateSvg, useArrowIds, CREAM, GOLD_READABLE, INK } from './diagramPrimitives'

type D = { caption: string }

/* —— Ch09 —— */

export function BtcCh09Hub({ caption }: D) {
  const spokes = [
    'Website',
    'Email & calendar',
    'Phone',
    'Quoting',
    'Accounting',
    'Marketing',
    'Reporting',
  ]

  return (
    <Fig fig="FIG. 09.1" caption={caption}>
      <div className="mx-auto flex w-full max-w-[580px] flex-col items-center gap-3">
        <div className="border-2 border-[#1a1a1a] bg-[#FFF2EC] px-7 py-6 text-center">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#1a1a1a]">CRM</p>
          <p className="mt-1 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-[#8B6914]">At the centre</p>
        </div>
        <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-4">
          {spokes.slice(0, 4).map((label) => (
            <div key={label} className="flex flex-col items-center">
              <div className="h-4 w-px bg-[#1a1a1a]/35" aria-hidden />
              <div className="w-full border border-[#1a1a1a] bg-[#FFF2EC] px-2 py-2.5 text-center">
                <p className="font-mono text-[7.5px] font-bold uppercase leading-[1.35] tracking-[0.08em] text-[#1a1a1a]">{label}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid w-full grid-cols-3 gap-2">
          {spokes.slice(4).map((label) => (
            <div key={label} className="flex flex-col items-center">
              <div className="h-4 w-px bg-[#1a1a1a]/35" aria-hidden />
              <div className="w-full border border-[#1a1a1a] bg-[#FFF2EC] px-2 py-2.5 text-center">
                <p className="font-mono text-[7.5px] font-bold uppercase leading-[1.35] tracking-[0.08em] text-[#1a1a1a]">{label}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-[#1a1a1a]/45">
          Seven spokes · most arrows flow both ways
        </p>
      </div>
    </Fig>
  )
}

export function BtcCh09OneLead({ caption }: D) {
  const { uid, ink, gold } = useArrowIds()
  const steps = ['ENQUIRY', 'CONTACT', 'ACK', 'OWNER', 'DEAL', 'QUOTE', 'WON']
  return (
    <Fig fig="FIG. 09.2" caption={caption}>
      <PlateSvg viewBox="0 0 720 140" ariaLabel="One lead start to finish">
        <ArrowDefs uid={uid} />
        {steps.map((s, i) => {
          const x = 20 + i * 98
          return (
            <g key={s}>
              <MonoBox x={x} y={50} w={82} h={36} label={s} fontSize={6.5} gold={i === steps.length - 1} />
              {i < steps.length - 1 && (
                <path d={`M${x + 82},68 L${x + 98},68`} stroke={i >= 4 ? GOLD_READABLE : INK} strokeWidth="1.3" markerEnd={`url(#${i >= 4 ? gold : ink})`} fill="none" />
              )}
            </g>
          )
        })}
        <text x="360" y="115" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fill="rgba(26,26,26,.5)">
          call · sequence · invoice · onboarding
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtcCh09SentReceived({ caption }: D) {
  return (
    <Fig fig="FIG. 09.3" caption={caption}>
      <div className="space-y-5">
        <div className="border border-dashed border-[#1a1a1a]/30 bg-[#E8E8E8]/35 p-5">
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/45">Send and hope</p>
          <div className="flex items-center gap-3">
            <div className="border border-[#1a1a1a]/20 bg-white/50 px-4 py-2 font-mono text-[9px] font-bold">SEND</div>
            <span className="font-mono text-[10px] text-[#1a1a1a]/35">········ ?</span>
            <div className="border border-dashed border-[#1a1a1a]/25 px-4 py-2 font-mono text-[9px] text-[#1a1a1a]/35">INBOX</div>
          </div>
        </div>
        <div className="border-2 border-[#1a1a1a] bg-[#FFF2EC] p-5">
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6914]">Confirm · queue · retry</p>
          <div className="flex flex-wrap items-center gap-2">
            {['SEND', 'CONFIRM', 'QUEUE', 'RETRY', 'DELIVERED'].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`border px-3 py-2 font-mono text-[8px] font-bold ${i === 4 ? 'border-[#C5A059] bg-[#C5A059]/15' : 'border-[#1a1a1a] bg-white/60'}`}>
                  {s}
                </div>
                {i < 4 && <span className="font-mono text-[10px] text-[#8B6914]">→</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-5 text-center font-serif text-[13px] italic text-[#1a1a1a]/55">
        The gap between sent and received is where leads vanish
      </p>
    </Fig>
  )
}

export function BtcCh09SpokeOrder({ caption }: D) {
  const order = [
    { n: '1', label: 'Website in' },
    { n: '2', label: 'Email & calendar' },
    { n: '3', label: 'Phone' },
    { n: '4', label: 'Quoting' },
    { n: '5', label: 'Accounting' },
    { n: '6', label: 'Marketing' },
    { n: '7', label: 'Reporting' },
  ]
  return (
    <Fig fig="FIG. 09.4" caption={caption}>
      <div className="space-y-2">
        {order.map((item, i) => (
          <div key={item.n} className={`flex items-center gap-4 border p-3 ${i === 0 ? 'border-[#C5A059] border-2 bg-[#FFF2EC]' : 'border-[#1a1a1a]/18 bg-[#FFF2EC]'}`}>
            <span className="font-mono text-[11px] font-bold text-[#8B6914]">{item.n}</span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[#1a1a1a]">{item.label}</span>
          </div>
        ))}
      </div>
    </Fig>
  )
}

/* —— Ch10 —— */

export function BtcCh10WhyDie({ caption }: D) {
  return (
    <Fig fig="FIG. 10.1" caption={caption}>
      <PlateSvg viewBox="0 0 720 220" ariaLabel="Why CRMs die">
        <text x="180" y="40" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" fill="rgba(26,26,26,.55)">
          WORK IT ADDS
        </text>
        <text x="540" y="40" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" fill={GOLD_READABLE}>
          VALUE IT RETURNS
        </text>
        <rect x="80" y="60" width="200" height="120" rx="2" fill="#E8E8E8" opacity="0.4" stroke={INK} strokeWidth="1" />
        <path d="M100,160 L120,100 L140,130 L160,80 L180,110 L200,70 L220,90 L260,60" fill="none" stroke={INK} strokeWidth="1.5" />
        <rect x="440" y="60" width="200" height="120" rx="2" fill={CREAM} stroke={INK} strokeWidth="1.4" />
        <path d="M460,140 L500,120 L540,100 L580,90 L620,85" fill="none" stroke={GOLD_READABLE} strokeWidth="1.5" />
        <line x1="360" y1="50" x2="360" y2="200" stroke={INK} strokeWidth="1" opacity="0.12" />
        <text x="360" y="205" textAnchor="middle" fontFamily="Lora, serif" fontSize="12" fontStyle="italic" fill="rgba(26,26,26,.5)">
          People resist unpaid taxes, not systems
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtcCh10DesignLaziness({ caption }: D) {
  const principles = [
    { title: 'Auto-capture', desc: 'Data enters without typing' },
    { title: 'Minimum fields', desc: 'Only what earns its place' },
    { title: 'Mobile-first', desc: 'Works from the van' },
    { title: 'Gives back', desc: 'Tasks, nudges, clarity' },
  ]
  return (
    <Fig fig="FIG. 10.2" caption={caption}>
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {principles.map((p) => (
          <div key={p.title} className="border border-[#1a1a1a] bg-[#FFF2EC] p-4 md:p-5">
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#8B6914]">{p.title}</div>
            <div className="mt-2 font-sans text-[12px] text-[#1a1a1a]/65">{p.desc}</div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-center font-serif text-[13px] italic text-[#1a1a1a]/55">
        The easiest path must be the right one
      </p>
    </Fig>
  )
}

export function BtcCh10RolloutArc({ caption }: D) {
  const { uid, ink } = useArrowIds()
  const steps = ['OWNER FIRST', 'CHAMPION', 'TRAINING', 'SUPPORT', 'ONE TRUTH']
  return (
    <Fig fig="FIG. 10.3" caption={caption}>
      <PlateSvg viewBox="0 0 720 160" ariaLabel="Rollout arc">
        <ArrowDefs uid={uid} />
        {steps.map((s, i) => {
          const x = 30 + i * 135
          return (
            <g key={s}>
              <MonoBox x={x} y={55} w={115} h={40} label={s} fontSize={7} gold={i === 0} />
              {i < steps.length - 1 && (
                <path d={`M${x + 115},75 L${x + 135},75`} stroke={INK} strokeWidth="1.3" markerEnd={`url(#${ink})`} fill="none" />
              )}
            </g>
          )
        })}
        <text x="360" y="130" textAnchor="middle" fontFamily="Lora, serif" fontSize="12" fontStyle="italic" fill="rgba(26,26,26,.5)">
          Culture is what the leader repeatedly does
        </text>
      </PlateSvg>
    </Fig>
  )
}

/* —— Ch11 —— */

export function BtcCh11DivisionLabour({ caption }: D) {
  const { uid, ink } = useArrowIds()
  return (
    <Fig fig="FIG. 11.1" caption={caption}>
      <PlateSvg viewBox="0 0 720 180" ariaLabel="Division of labour">
        <ArrowDefs uid={uid} />
        <MonoBox x={40} y={65} w={140} h={50} label="AI DRAFTS" fontSize={9} />
        <text x="110" y="55" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fill="rgba(26,26,26,.5)">
          from real context
        </text>
        <path d="M180,90 L250,90" stroke={INK} strokeWidth="1.4" markerEnd={`url(#${ink})`} fill="none" />
        <MonoBox x={250} y={65} w={160} h={50} label="YOU REVIEW" fontSize={8} gold />
        <text x="330" y="130" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fill={GOLD_READABLE}>
          edit · approve
        </text>
        <path d="M410,90 L480,90" stroke={INK} strokeWidth="1.4" markerEnd={`url(#${ink})`} fill="none" />
        <MonoBox x={480} y={65} w={180} h={50} label="CLIENT RECEIVES" fontSize={8} />
        <text x="570" y="55" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fill="rgba(26,26,26,.5)">
          your name on it
        </text>
        <text x="360" y="165" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(26,26,26,.45)">
          nothing sends itself · details stay in protected tools
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtcCh11SelfWritingRecord({ caption }: D) {
  const { uid, ink } = useArrowIds()
  const steps = ['CALL', 'AI SUMMARY', '10s SKIM', 'CRM RECORD']
  return (
    <Fig fig="FIG. 11.2" caption={caption}>
      <PlateSvg viewBox="0 0 720 180" ariaLabel="Self-writing record">
        <ArrowDefs uid={uid} />
        {steps.map((s, i) => {
          const x = 40 + i * 165
          return (
            <g key={s}>
              <MonoBox x={x} y={60} w={130} h={44} label={s} fontSize={7.5} gold={i === 2} />
              {i < steps.length - 1 && (
                <path d={`M${x + 130},82 L${x + 165},82`} stroke={INK} strokeWidth="1.3" markerEnd={`url(#${ink})`} fill="none" />
              )}
            </g>
          )
        })}
        <text x="360" y="140" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(26,26,26,.5)">
          note-taker announces itself · skim first — a misheard number lives forever
        </text>
      </PlateSvg>
    </Fig>
  )
}

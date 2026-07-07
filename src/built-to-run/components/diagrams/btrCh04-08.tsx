import { Fig, MonoBox, ArrowDefs, PlateSvg, useArrowIds, CREAM, GOLD_READABLE, INK } from './diagramPrimitives'

type D = { caption: string }

/* —— Ch04 —— */

export function BtrCh04WeekAudit({ caption }: D) {
  const entries = [
    { task: 'Copied enquiry to spreadsheet', marks: '|||' },
    { task: 'Chased invoice again', marks: '||' },
    { task: 'Sent the same welcome email', marks: '||||' },
    { task: 'Forwarded lead to colleague', marks: '||' },
  ]
  return (
    <Fig fig="FIG. 04.1" caption={caption}>
      <div className="mx-auto max-w-[480px] border border-[#1a1a1a]/25 bg-[#FFF2EC] p-5">
        <p className="mb-4 font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/45">Your week — tally marks</p>
        <div className="space-y-3">
          {entries.map((e, i) => (
            <div key={e.task} className={`flex items-center justify-between border-b border-[#1a1a1a]/10 pb-2 ${i === 2 ? 'border-l-2 border-l-[#C5A059] pl-3' : ''}`}>
              <span className="font-sans text-[12px] text-[#1a1a1a]/70">{e.task}</span>
              <span className={`font-mono text-[12px] font-bold tracking-[0.2em] ${i === 2 ? 'text-[#8B6914]' : 'text-[#1a1a1a]/45'}`}>{e.marks}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 font-serif text-[12px] italic text-[#1a1a1a]/55">Highest tally rises to the top of the list</p>
      </div>
    </Fig>
  )
}

export function BtrCh04RuleOfThree({ caption }: D) {
  const { uid, ink, gold } = useArrowIds()
  return (
    <Fig fig="FIG. 04.2" caption={caption}>
      <PlateSvg viewBox="0 0 720 220" ariaLabel="The rule of three, both directions">
        <ArrowDefs uid={uid} />
        <line x1="360" y1="20" x2="360" y2="200" stroke={INK} strokeWidth="1" opacity="0.1" />
        <text x="180" y="40" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" fill={GOLD_READABLE}>
          DONE 3× THE SAME WAY
        </text>
        <path d="M80,80 L280,80" stroke={GOLD_READABLE} strokeWidth="1.4" markerEnd={`url(#${gold})`} fill="none" />
        <text x="180" y="110" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="14" fontWeight="700" fill={GOLD_READABLE}>
          ✓
        </text>
        <MonoBox x={80} y={130} w={200} h={44} label="AUTOMATE" fontSize={10} gold />
        <text x="180" y="195" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fill="rgba(26,26,26,.5)">
          the specification already exists
        </text>
        <text x="540" y="40" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" fill="rgba(26,26,26,.45)">
          ONCE, OR DIFFERENT EACH TIME
        </text>
        <path d="M440,80 L640,80" stroke={INK} strokeWidth="1.2" strokeDasharray="4 3" markerEnd={`url(#${ink})`} fill="none" />
        <text x="540" y="110" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="14" fontWeight="700" fill="rgba(26,26,26,.4)">
          ⏸
        </text>
        <MonoBox x={440} y={130} w={200} h={44} label="STABILISE" fontSize={10} />
        <text x="540" y="195" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fill="rgba(26,26,26,.5)">
          or the machine produces chaos
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtrCh04NeverAutomate({ caption }: D) {
  const items = [
    { title: 'JUDGMENT CALLS', sub: 'Pricing the unusual, reading the delicate' },
    { title: 'HUMAN MOMENTS', sub: 'The apology, congratulations, hard conversation' },
    { title: 'GENUINE EXCEPTIONS', sub: 'Different every time — by design' },
  ]
  return (
    <Fig fig="FIG. 04.3" caption={caption}>
      <div className="relative border-t-2 border-[#1a1a1a] pt-6">
        <p className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFF2EC] px-3 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#1a1a1a]/45">
          behind this line
        </p>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.title} className="border border-[#1a1a1a]/18 bg-[#FFF2EC] p-4">
              <div className="font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-[#1a1a1a]">{item.title}</div>
              <div className="mt-1 font-sans text-[12px] text-[#1a1a1a]/60">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </Fig>
  )
}

export function BtrCh04QuickWins({ caption }: D) {
  const steps = [
    { label: 'INSTANT ACK', tag: 'an afternoon' },
    { label: 'INVOICE REMINDER', tag: 'felt immediately' },
    { label: 'MISSED-CALL TEXT', tag: 'an afternoon' },
  ]
  const big = ['DEEP BUILD', 'SIGNATURE FLOW', 'NERVOUS SYSTEM']
  return (
    <Fig fig="FIG. 04.4" caption={caption}>
      <div className="mx-auto max-w-[420px]">
        <p className="mb-3 text-center font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#8B6914]">
          Quick wins first
        </p>
        <div className="space-y-2">
          {steps.map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between gap-4 border-2 border-[#C5A059] bg-[#FFF2EC] px-4 py-3"
            >
              <span className="font-mono text-[12px] font-bold uppercase tracking-[0.08em] text-[#8B6914]">{s.label}</span>
              <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.06em] text-[#8B6914]/70">{s.tag}</span>
            </div>
          ))}
        </div>

        <p className="mb-3 mt-6 text-center font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#1a1a1a]/45">
          Then the deep builds
        </p>
        <div className="space-y-2">
          {big.map((b, i) => (
            <div
              key={b}
              className="border border-[#1a1a1a]/20 bg-[#E8E8E8]/40 px-4 py-3 text-center"
              style={{ width: `${78 + i * 11}%`, marginLeft: 'auto', marginRight: 'auto' }}
            >
              <span className="font-mono text-[12px] font-bold uppercase tracking-[0.08em] text-[#1a1a1a]/50">{b}</span>
            </div>
          ))}
        </div>

        <p className="mt-5 text-center font-serif text-[13px] italic text-[#1a1a1a]/55">
          Momentum first — then the deep builds
        </p>
      </div>
    </Fig>
  )
}

/* —— Ch05 —— */

export function BtrCh05ReadEntry({ caption }: D) {
  const parts = [
    { title: 'TRIGGER', desc: 'What starts it' },
    { title: 'WHAT HAPPENS', desc: 'The steps, in order' },
    { title: 'WHAT IT SAVES', desc: 'Hours, leaks, mistakes, things in heads' },
  ]
  return (
    <Fig fig="FIG. 05.1" caption={caption}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {parts.map((p, i) => (
          <div key={p.title} className={`border p-4 ${i === 2 ? 'border-[#C5A059] border-2 bg-[#FFF2EC]' : 'border-[#1a1a1a]/18 bg-[#FFF2EC]'}`}>
            <div className="font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-[#8B6914]">{p.title}</div>
            <div className="mt-2 font-sans text-[12px] text-[#1a1a1a]/65">{p.desc}</div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#1a1a1a]/45">
        Every library entry follows this shape
      </p>
    </Fig>
  )
}

export function BtrCh05LibraryMap({ caption }: D) {
  const shelves = [
    { name: 'LEADS AND SALES', count: 7 },
    { name: 'MARKETING AND CONTENT', count: 5 },
    { name: 'OPERATIONS AND ADMIN', count: 6 },
    { name: 'CUSTOMER SERVICE', count: 3 },
    { name: 'MONEY AND REPORTING', count: 4 },
  ]
  return (
    <Fig fig="FIG. 05.2" caption={caption}>
      <div className="space-y-2">
        {shelves.map((s) => (
          <div key={s.name} className="flex items-center gap-3 border border-[#1a1a1a]/18 bg-[#FFF2EC] px-4 py-3">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#1a1a1a]">{s.name}</span>
            <span className="ml-auto font-mono text-[11px] text-[#1a1a1a]/40">{s.count} entries</span>
          </div>
        ))}
      </div>
    </Fig>
  )
}

export function BtrCh05SignaturePreview({ caption }: D) {
  const { uid, ink, gold } = useArrowIds()
  const steps = ['ENQUIRY', 'RESEARCH', 'BRIEFING', 'DRAFT']
  return (
    <Fig fig="FIG. 05.3" caption={caption}>
      <PlateSvg viewBox="0 0 720 160" ariaLabel="The lead that researches itself">
        <ArrowDefs uid={uid} />
        {steps.map((s, i) => {
          const x = 40 + i * 165
          return (
            <g key={s}>
              <MonoBox x={x} y={50} w={130} h={40} label={s} fontSize={10} gold={i === steps.length - 1} />
              {i < steps.length - 1 && (
                <path d={`M${x + 130},70 L${x + 165},70`} stroke={i >= 2 ? GOLD_READABLE : INK} strokeWidth="1.3" markerEnd={`url(#${i >= 2 ? gold : ink})`} fill="none" />
              )}
            </g>
          )
        })}
        <text x="360" y="120" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" fill={GOLD_READABLE}>
          waiting in your drafts · one tap
        </text>
        <text x="360" y="140" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fill="rgba(26,26,26,.45)">
          the signature — chapter nine takes it apart
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtrCh05ReturnsCluster({ caption }: D) {
  const areas = [
    ['LEADS', 'MARKETING'],
    ['OPS', 'SERVICE'],
    ['MONEY', 'CONTENT'],
  ]
  const clusters = [
    'Speed of the first response',
    'Persistence of the follow-up',
    'Watching of the numbers',
  ]
  return (
    <Fig fig="FIG. 05.4" caption={caption}>
      <div className="mx-auto max-w-[420px]">
        <div className="border border-[#1a1a1a]/20 bg-[#E8E8E8]/30 p-4">
          {areas.map((row) => (
            <div key={row[0]} className="mb-2 grid grid-cols-2 gap-2 last:mb-0">
              {row.map((label) => (
                <div
                  key={label}
                  className="border border-[#1a1a1a]/15 bg-white/50 px-2 py-3 text-center font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#1a1a1a]/40"
                >
                  {label}
                </div>
              ))}
            </div>
          ))}
        </div>

        <p className="my-4 text-center font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8B6914]">
          Returns cluster here
        </p>

        <div className="space-y-2">
          {clusters.map((c) => (
            <div key={c} className="border-2 border-[#C5A059] bg-[#FFF2EC] px-4 py-3 text-center">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] leading-snug text-[#8B6914]">{c}</p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-center font-serif text-[13px] italic text-[#1a1a1a]/55">
          The highest-return ideas cluster here
        </p>
      </div>
    </Fig>
  )
}

/* —— Ch06 —— */

export function BtrCh06HumanLoop({ caption }: D) {
  const { uid, ink, gold } = useArrowIds()
  return (
    <Fig fig="FIG. 06.1" caption={caption}>
      <PlateSvg viewBox="0 0 720 200" ariaLabel="The human in the loop">
        <ArrowDefs uid={uid} />
        <MonoBox x={40} y={70} w={140} h={50} label="MACHINE" fontSize={10} />
        <text x="110" y="60" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fill="rgba(26,26,26,.5)">
          prepares · drafts · assembles
        </text>
        <path d="M180,95 L250,95" stroke={INK} strokeWidth="1.3" markerEnd={`url(#${ink})`} fill="none" />
        <MonoBox x={250} y={70} w={140} h={50} label="GATE" fontSize={11} gold />
        <text x="320" y="135" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" fill={GOLD_READABLE}>
          30 seconds of judgment
        </text>
        <path d="M390,95 L460,95" stroke={GOLD_READABLE} strokeWidth="1.4" markerEnd={`url(#${gold})`} fill="none" />
        <MonoBox x={460} y={70} w={140} h={50} label="WORLD" fontSize={10} />
        <text x="530" y="60" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fill="rgba(26,26,26,.5)">
          send · spend · decide
        </text>
        <rect x={40} y={155} width={560} height={32} rx="2" fill="#E8E8E8" opacity="0.35" stroke={INK} strokeWidth="0.8" strokeDasharray="3 2" />
        <text x="320" y="175" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fill="rgba(26,26,26,.45)">
          second lane: machine-only tasks run without the gate
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtrCh06TwoMinuteCheck({ caption }: D) {
  const checks = [
    { n: '1', label: 'FAILURE FLAGS', desc: 'Anything that broke, telling you' },
    { n: '2', label: 'APPROVAL QUEUE', desc: 'The drafts awaiting judgment' },
    { n: '3', label: 'THE DIGEST', desc: 'The machine reporting on the machines' },
  ]
  return (
    <Fig fig="FIG. 06.2" caption={caption}>
      <div className="flex items-start gap-4">
        <div className="shrink-0 border border-[#1a1a1a]/20 bg-[#E8E8E8]/40 px-3 py-4 text-center">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#1a1a1a]/45">⏱</p>
          <p className="mt-1 font-mono text-[11px] font-bold text-[#1a1a1a]">2 min</p>
        </div>
        <div className="flex-1 space-y-2">
          {checks.map((c, i) => (
            <div key={c.n} className={`flex gap-3 border p-3 ${i === 0 ? 'border-[#C5A059] border-2 bg-[#FFF2EC]' : 'border-[#1a1a1a]/18 bg-[#FFF2EC]'}`}>
              <span className="font-mono text-[11px] font-bold text-[#8B6914]">{c.n}</span>
              <div>
                <div className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#1a1a1a]">{c.label}</div>
                <div className="mt-0.5 font-sans text-[11px] text-[#1a1a1a]/60">{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-center font-serif text-[12px] italic text-[#1a1a1a]/55">
        Every morning — before the inbox owns you
      </p>
    </Fig>
  )
}

/* —— Ch07 —— */

export function BtrCh07Decay({ caption }: D) {
  const { uid, ink } = useArrowIds()
  const box = { x: 270, y: 108, w: 180, h: 72 }
  const boxCx = box.x + box.w / 2
  const boxCy = box.y + box.h / 2
  const pressures = [
    { label: 'Platform update', lx: 168, ly: 46, ex: box.x, ey: box.y, lineFrom: { x: 168, y: 62 } },
    { label: 'Field renamed', lx: 552, ly: 46, ex: box.x + box.w, ey: box.y, lineFrom: { x: 552, y: 62 } },
    { label: 'New product line', lx: 168, ly: 214, ex: box.x, ey: box.y + box.h, lineFrom: { x: 168, y: 198 } },
    { label: 'Staff turnover', lx: 552, ly: 214, ex: box.x + box.w, ey: box.y + box.h, lineFrom: { x: 552, y: 198 } },
  ]

  return (
    <Fig fig="FIG. 07.1" caption={caption}>
      <PlateSvg viewBox="0 0 720 232" ariaLabel="Why automations decay">
        <ArrowDefs uid={uid} />
        <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={2} fill={CREAM} stroke={INK} strokeWidth="1.5" strokeDasharray="4 3" />
        <text x={boxCx} y={boxCy - 6} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" fill="rgba(26,26,26,.55)">
          WORKFLOW
        </text>
        <text x={boxCx} y={boxCy + 12} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fill="rgba(26,26,26,.45)">
          assumptions at build time
        </text>
        {pressures.map((p) => (
          <g key={p.label}>
            <path
              d={`M${p.lineFrom.x},${p.lineFrom.y} L${p.ex},${p.ey}`}
              stroke={INK}
              strokeWidth="1.1"
              strokeDasharray="4 3"
              fill="none"
              opacity="0.45"
              markerEnd={`url(#${ink})`}
            />
            <text
              x={p.lx}
              y={p.ly}
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
              fontSize="11"
              fontWeight="700"
              fill="rgba(26,26,26,.45)"
            >
              {p.label}
            </text>
          </g>
        ))}
        <text x={360} y={218} textAnchor="middle" fontFamily="Lora, serif" fontSize="12" fontStyle="italic" fill="rgba(26,26,26,.5)">
          Change presses in from every side
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtrCh07Ceiling({ caption }: D) {
  return (
    <Fig fig="FIG. 07.2" caption={caption}>
      <PlateSvg viewBox="0 0 720 220" ariaLabel="The ceiling on a big day">
        <line x1="60" y1="180" x2="660" y2="180" stroke={INK} strokeWidth="1" opacity="0.3" />
        <line x1="60" y1="40" x2="60" y2="180" stroke={INK} strokeWidth="1" opacity="0.3" />
        <text x="40" y="110" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fill="rgba(26,26,26,.4)" transform="rotate(-90 40 110)">
          VOLUME
        </text>
        <line x1="80" y1="80" x2="640" y2="80" stroke={INK} strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
        <text x="650" y="84" fontFamily="ui-monospace, monospace" fontSize="11" fill="rgba(26,26,26,.45)">limit</text>
        <path d="M80,170 L200,120 L320,90 L400,80 L440,80 L480,100 L520,160 L560,200" fill="none" stroke={INK} strokeWidth="1.5" />
        <text x="480" y="115" fontFamily="ui-monospace, monospace" fontSize="11" fill="rgba(26,26,26,.45)">refused · lost</text>
        <path d="M80,170 L200,140 L320,120 L400,110 L480,115 L560,130 L640,145" fill="none" stroke={GOLD_READABLE} strokeWidth="1.5" />
        <text x="560" y="125" fontFamily="ui-monospace, monospace" fontSize="11" fill={GOLD_READABLE}>queue · works through</text>
        <text x="180" y="30" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" fill="rgba(26,26,26,.45)">unprepared</text>
        <text x="500" y="30" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" fill={GOLD_READABLE}>prepared</text>
      </PlateSvg>
    </Fig>
  )
}

export function BtrCh07LawTravels({ caption }: D) {
  const { uid, ink } = useArrowIds()
  const tags = ['CONSENT', 'IDENTIFICATION', 'UNSUBSCRIBE']
  const steps = ['TRIGGER', 'PROCESS', 'SEND', 'LOG']
  const mail = { x: 72, y: 52, w: 44, h: 30 }
  const tagY = 74
  const tagXs = [228, 360, 492]
  const arrowY = 106
  const boxW = 96
  const boxH = 34
  const boxGap = 26
  const rowW = steps.length * boxW + (steps.length - 1) * boxGap
  const boxStartX = (720 - rowW) / 2
  const boxY = 120

  return (
    <Fig fig="FIG. 07.3" caption={caption}>
      <PlateSvg viewBox="0 0 720 198" ariaLabel="The law travels with the data">
        <ArrowDefs uid={uid} />
        <rect x={mail.x} y={mail.y} width={mail.w} height={mail.h} rx={1} fill={CREAM} stroke={INK} strokeWidth="1.2" />
        <text x={mail.x + mail.w / 2} y={mail.y + mail.h / 2 + 4} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fill={INK}>
          ✉
        </text>
        {tags.map((t, i) => (
          <text
            key={t}
            x={tagXs[i]}
            y={tagY}
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="10"
            fontWeight="700"
            fill={GOLD_READABLE}
          >
            [{t}]
          </text>
        ))}
        <path d={`M${mail.x},${arrowY} L${720 - mail.x},${arrowY}`} stroke={INK} strokeWidth="1.2" markerEnd={`url(#${ink})`} fill="none" opacity="0.4" />
        {steps.map((s, i) => (
          <MonoBox key={s} x={boxStartX + i * (boxW + boxGap)} y={boxY} w={boxW} h={boxH} label={s} fontSize={10} />
        ))}
        <text x={360} y={boxY + boxH + 30} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fill="rgba(26,26,26,.5)">
          register doubles as where personal data lives
        </text>
      </PlateSvg>
    </Fig>
  )
}

/* —— Ch08 —— */

export function BtrCh08AiBelongs({ caption }: D) {
  const tools = [
    { label: 'CLASSIFY', desc: 'what is this message' },
    { label: 'EXTRACT', desc: 'details from the mess' },
    { label: 'SUMMARISE', desc: 'call into two lines' },
    { label: 'DRAFT', desc: 'reply for the gate' },
    { label: 'RESEARCH', desc: 'who they are' },
  ]
  return (
    <Fig fig="FIG. 08.1" caption={caption}>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
        {tools.map((t) => (
          <div key={t.label} className="border border-[#C5A059] bg-[#FFF2EC] p-3 text-center">
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#8B6914]">{t.label}</div>
            <div className="mt-1 font-sans text-[12px] text-[#1a1a1a]/60">{t.desc}</div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#1a1a1a]/45">
        The five workhorses — not the whole flow
      </p>
    </Fig>
  )
}

export function BtrCh08HypeTax({ caption }: D) {
  return (
    <Fig fig="FIG. 08.2" caption={caption}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="relative border border-dashed border-[#1a1a1a]/30 bg-[#E8E8E8]/35 p-5 opacity-60">
          <line x1="0" y1="0" x2="100%" y2="100%" className="absolute inset-0 border-t border-[#1a1a1a]/30" style={{ transform: 'rotate(0)' }} />
          <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#1a1a1a]/45">Dropdown on a form</p>
          <div className="border border-[#1a1a1a]/20 bg-white/50 px-3 py-2 font-mono text-[11px]">SELECT ONE ▾</div>
        </div>
        <div className="relative border border-dashed border-[#1a1a1a]/30 bg-[#E8E8E8]/35 p-5 opacity-60">
          <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#1a1a1a]/45">Oversized thinking model</p>
          <div className="text-center font-mono text-[24px] text-[#1a1a1a]/35">🧠</div>
          <p className="mt-2 text-center font-mono text-[12px] text-[#1a1a1a]/40">paid per token</p>
        </div>
      </div>
      <p className="mt-4 text-center font-serif text-[13px] italic text-[#1a1a1a]/55">
        Paying per token for a decision a checkbox already made
      </p>
    </Fig>
  )
}

export function BtrCh08PatienceGates({ caption }: D) {
  const { uid, ink, gold } = useArrowIds()
  const boxW = 86
  const boxH = 38
  const gateW = 100
  const gateH = 58
  const gap = 24
  const boxY = 58
  const linkY = boxY + boxH / 2
  const gateY = boxY - 4
  const widths = [boxW, boxW, boxW, gateW, boxW]
  const totalW = widths.reduce((a, w) => a + w, 0) + gap * (widths.length - 1)
  let x = (720 - totalW) / 2

  const nodes = [
    { kind: 'step' as const, label: 'READ' },
    { kind: 'step' as const, label: 'DRAFT' },
    { kind: 'step' as const, label: 'PREPARE' },
    { kind: 'gate' as const, label: 'GATE', sub: 'send · spend' },
    { kind: 'step' as const, label: 'DECIDE' },
  ]

  const positions = nodes.map((node, i) => {
    const w = widths[i]
    const pos = { x, w, node }
    x += w + gap
    return pos
  })

  return (
    <Fig fig="FIG. 08.3" caption={caption}>
      <PlateSvg viewBox="0 0 720 168" ariaLabel="Ambition in the architecture, patience at the gates">
        <ArrowDefs uid={uid} />
        {positions.map(({ x, w, node }, i) => (
          <g key={node.label}>
            {node.kind === 'gate' ? (
              <>
                <rect x={x} y={gateY} width={w} height={gateH} rx={2} fill={CREAM} stroke={GOLD_READABLE} strokeWidth="2" />
                <text x={x + w / 2} y={gateY + 24} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" fill={GOLD_READABLE}>
                  {node.label}
                </text>
                <text x={x + w / 2} y={gateY + 42} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fill="rgba(26,26,26,.55)">
                  {node.sub}
                </text>
                <text x={x + w / 2} y={gateY + gateH + 16} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fill="rgba(26,26,26,.45)">
                  widens as trust grows
                </text>
              </>
            ) : (
              <MonoBox x={x} y={boxY} w={w} h={boxH} label={node.label} fontSize={10} />
            )}
            {i < positions.length - 1 && (
              <path
                d={`M${x + w + 4},${i === 2 ? gateY + gateH / 2 : linkY} L${positions[i + 1].x - 4},${positions[i + 1].node.kind === 'gate' ? gateY + gateH / 2 : linkY}`}
                stroke={i === 2 ? GOLD_READABLE : INK}
                strokeWidth={i === 2 ? 1.5 : 1.2}
                markerEnd={`url(#${i === 2 ? gold : ink})`}
                fill="none"
              />
            )}
          </g>
        ))}
        <text x={360} y={152} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fill="rgba(26,26,26,.5)">
          AI lane runs confidently — then stops
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtrCh08MatchModel({ caption }: D) {
  const pairs = [
    { task: 'Classify · extract · route', model: 'Small model', cost: 'cents' },
    { task: 'Long drafting · judgment reading', model: 'Larger model', cost: 'still cents' },
  ]
  return (
    <Fig fig="FIG. 08.4" caption={caption}>
      <div className="space-y-4">
        {pairs.map((p, i) => (
          <div key={p.task} className={`grid grid-cols-1 gap-3 border p-4 md:grid-cols-[1fr_auto_auto] ${i === 0 ? 'border-[#1a1a1a]/18 bg-[#FFF2EC]' : 'border-[#C5A059] border-2 bg-[#FFF2EC]'}`}>
            <span className="font-sans text-[12px] text-[#1a1a1a]/70">{p.task}</span>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#1a1a1a]">{p.model}</span>
            <span className="font-mono text-[11px] font-bold text-[#8B6914]">{p.cost}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center font-serif text-[12px] italic text-[#1a1a1a]/55">
        Match the model to the job — not the headline
      </p>
    </Fig>
  )
}

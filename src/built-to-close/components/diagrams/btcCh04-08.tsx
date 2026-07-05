import { Fig, MonoBox, ArrowDefs, PlateSvg, useArrowIds, CREAM, GOLD_READABLE, INK } from './diagramPrimitives'

type D = { caption: string }

/* —— Ch04 —— */

export function BtcCh04FieldEarns({ caption }: D) {
  const keep = ['Name', 'Contact', 'Source', 'Owner', 'Sale facts']
  return (
    <Fig fig="FIG. 04.1" caption={caption}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="border-2 border-[#1a1a1a] bg-[#FFF2EC] p-5">
          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6914]">Keep</p>
          <ul className="space-y-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#1a1a1a]">
            {keep.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
        <div className="border border-[#1a1a1a]/20 bg-[#E8E8E8]/40 p-5">
          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/45">Everything else</p>
          <div className="border border-dashed border-[#1a1a1a]/25 bg-white/50 px-4 py-6 text-center font-sans text-[12px] italic text-[#1a1a1a]/50">
            A note
          </div>
        </div>
      </div>
      <p className="mt-5 text-center font-serif text-[13px] italic text-[#1a1a1a]/55">
        Under a minute from a phone, or the setup has failed
      </p>
    </Fig>
  )
}

export function BtcCh04OneHuman({ caption }: D) {
  const { uid, ink, gold } = useArrowIds()
  return (
    <Fig fig="FIG. 04.2" caption={caption}>
      <PlateSvg viewBox="0 0 720 220" ariaLabel="One human one record">
        <ArrowDefs uid={uid} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={40 + i * 50} y={60} width={80} height={100} rx="2" fill={CREAM} stroke={INK} strokeWidth="1" opacity="0.6" />
        ))}
        <text x="130" y="50" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fontWeight="700" fill="rgba(26,26,26,.45)">
          THREE THIN RECORDS
        </text>
        <path d="M280,110 L340,110" stroke={GOLD_READABLE} strokeWidth="1.5" markerEnd={`url(#${gold})`} fill="none" />
        <rect x={340} y={50} width={320} height={120} rx="2" fill={CREAM} stroke={INK} strokeWidth="2" />
        <text x={500} y="90" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" fill={INK}>
          ONE FULL RECORD
        </text>
        <text x={500} y="115" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(26,26,26,.55)">
          history · value · every touch
        </text>
        <path d="M130,170 L500,170" stroke={INK} strokeWidth="1" strokeDasharray="3 3" opacity="0.35" markerEnd={`url(#${ink})`} fill="none" />
        <text x={360} y="195" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fontWeight="700" fill={GOLD_READABLE}>
          merge duplicates as a reflex
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtcCh04HygieneRhythm({ caption }: D) {
  const rhythms = [
    { when: 'In the moment', task: 'Correct details as you learn them' },
    { when: 'On sight', task: 'Merge duplicates as a reflex' },
    { when: 'Monthly', task: 'Half an hour on the worst of it' },
  ]
  return (
    <Fig fig="FIG. 04.3" caption={caption}>
      <div className="space-y-3">
        {rhythms.map((r, i) => (
          <div key={r.when} className={`flex gap-4 border p-4 ${i === 0 ? 'border-[#C5A059] border-2 bg-[#FFF2EC]' : 'border-[#1a1a1a]/18 bg-[#FFF2EC]'}`}>
            <span className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8B6914]">{r.when}</span>
            <span className="font-sans text-[12px] text-[#1a1a1a]/70">{r.task}</span>
          </div>
        ))}
      </div>
    </Fig>
  )
}

/* —— Ch05 —— */

export function BtcCh05FourWays({ caption }: D) {
  const ways = [
    { n: '01', title: 'What it is', desc: 'The object in the system' },
    { n: '02', title: 'What it does', desc: 'The job it performs' },
    { n: '03', title: 'How you use it', desc: 'The daily habit' },
    { n: '04', title: 'Where it grows', desc: 'What you add later' },
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

export function BtcCh05LeaksMap({ caption }: D) {
  const leaks = [
    { leak: 'Forgotten lead', features: ['Forms', 'Tasks', 'Mobile app'] },
    { leak: 'Quiet quote', features: ['Sequences', 'Email sync'] },
    { leak: 'Drifted client', features: ['Pipeline', 'Reporting'] },
  ]
  return (
    <Fig fig="FIG. 05.2" caption={caption}>
      <div className="space-y-4">
        {leaks.map((l) => (
          <div key={l.leak} className="grid grid-cols-1 gap-3 border border-[#1a1a1a]/18 bg-[#FFF2EC] p-4 md:grid-cols-[140px_1fr]">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#8B6914]">{l.leak}</div>
            <div className="flex flex-wrap gap-2">
              {l.features.map((f) => (
                <span key={f} className="border border-[#1a1a1a] bg-white/60 px-3 py-1.5 font-mono text-[8.5px] font-bold uppercase tracking-[0.08em]">
                  {f}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Fig>
  )
}

export function BtcCh05SequenceRails({ caption }: D) {
  const { uid, ink } = useArrowIds()
  const touches = [
    { day: '0', label: 'QUOTE SENT' },
    { day: '3', label: 'TOUCH 1' },
    { day: '8', label: 'TOUCH 2' },
    { day: '16', label: 'TOUCH 3' },
    { day: '25', label: 'CLOSE', gold: true },
  ]
  return (
    <Fig fig="FIG. 05.3" caption={caption}>
      <PlateSvg viewBox="0 0 720 180" ariaLabel="Sequence on rails">
        <ArrowDefs uid={uid} />
        <line x1="40" y1="100" x2="680" y2="100" stroke={INK} strokeWidth="1" opacity="0.2" />
        {touches.map((t, i) => {
          const x = 60 + i * 130
          return (
            <g key={t.day}>
              <text x={x} y="70" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fontWeight="700" fill={GOLD_READABLE}>
                DAY {t.day}
              </text>
              <MonoBox x={x - 50} y={80} w={100} h={40} label={t.label} fontSize={7} gold={t.gold} />
              {i < touches.length - 1 && (
                <path d={`M${x + 50},100 L${x + 80},100`} stroke={INK} strokeWidth="1.3" markerEnd={`url(#${ink})`} fill="none" />
              )}
            </g>
          )
        })}
        <text x="360" y="155" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(26,26,26,.5)">
          client replies → sequence stops itself
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtcCh05Spine({ caption }: D) {
  const dayOne = ['Wired forms', 'Email sync', 'Tasks', 'Quote sequence', 'Mobile app']
  const later = ['Scoring', 'Deeper automation', 'More pipelines']
  return (
    <Fig fig="FIG. 05.4" caption={caption}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="border-2 border-[#1a1a1a] bg-[#FFF2EC] p-5">
          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6914]">Day one</p>
          <ul className="space-y-2">
            {dayOne.map((item) => (
              <li key={item} className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[#1a1a1a]">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-dashed border-[#1a1a1a]/30 bg-[#E8E8E8]/25 p-5">
          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/45">Earned later</p>
          <ul className="space-y-2">
            {later.map((item) => (
              <li key={item} className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[#1a1a1a]/45">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fig>
  )
}

/* —— Ch06 —— */

export function BtcCh06FifteenMinutes({ caption }: D) {
  const blocks = [
    { n: '1', title: 'New leads', task: 'Answered or owned first' },
    { n: '2', title: "Today's tasks", task: 'The list the system wrote' },
    { n: '3', title: 'The board', task: 'Anything past rhythm gets a decision' },
  ]
  return (
    <Fig fig="FIG. 06.1" caption={caption}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {blocks.map((b) => (
          <div key={b.n} className="border-t-2 border-[#C5A059] bg-[#FFF2EC] p-5">
            <span className="font-mono text-[12px] font-bold text-[#8B6914]">{b.n}</span>
            <div className="mt-1 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#1a1a1a]">{b.title}</div>
            <div className="mt-2 font-sans text-[12px] text-[#1a1a1a]/65">{b.task}</div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-center font-serif italic text-[13px] text-[#1a1a1a]/55">The fifteen minutes</p>
    </Fig>
  )
}

export function BtcCh06WeeklyReview({ caption }: D) {
  const questions = [
    'What moved and what stalled?',
    'Which deals have no next step?',
    'What is the total saying about the quarter?',
    'What did the lost deals teach?',
  ]
  return (
    <Fig fig="FIG. 06.2" caption={caption}>
      <div className="space-y-3">
        {questions.map((q, i) => (
          <div key={q} className="flex gap-4 border border-[#1a1a1a] bg-[#FFF2EC] p-4">
            <span className="font-mono text-[11px] font-bold text-[#8B6914]">0{i + 1}</span>
            <span className="font-sans text-[13px] text-[#1a1a1a]/75">{q}</span>
          </div>
        ))}
      </div>
    </Fig>
  )
}

/* —— Ch07 —— */

export function BtcCh07PersistentPest({ caption }: D) {
  return (
    <Fig fig="FIG. 07.1" caption={caption}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="border border-dashed border-[#1a1a1a]/30 bg-[#E8E8E8]/35 p-5">
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/45">Pest</p>
          <div className="border border-[#1a1a1a]/15 bg-white/50 px-4 py-3 font-sans text-[12px] text-[#1a1a1a]/45 line-through">
            Just checking in…
          </div>
          <p className="mt-3 font-sans text-[11px] text-[#1a1a1a]/50">Asks. Offers nothing.</p>
        </div>
        <div className="border border-[#1a1a1a] bg-[#FFF2EC] p-5">
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6914]">Persistent</p>
          <div className="border border-[#1a1a1a] bg-white/60 px-4 py-3 font-sans text-[12px] font-medium text-[#1a1a1a]">
            The doubt answered. Gives before it asks.
          </div>
          <p className="mt-3 font-sans text-[11px] text-[#1a1a1a]/65">Same cadence. Opposite experience.</p>
        </div>
      </div>
    </Fig>
  )
}

export function BtcCh07FollowupShape({ caption }: D) {
  const { uid, ink } = useArrowIds()
  const touches = ['Day 1', 'Day 3', 'Day 8', 'Day 16', 'Close']
  return (
    <Fig fig="FIG. 07.2" caption={caption}>
      <PlateSvg viewBox="0 0 720 200" ariaLabel="Follow-up shape">
        <ArrowDefs uid={uid} />
        <path d="M60,140 Q180,40 300,80 T540,100 T660,120" fill="none" stroke={INK} strokeWidth="1.5" markerEnd={`url(#${ink})`} />
        {touches.map((t, i) => {
          const x = 60 + i * 150
          const y = i === 0 ? 140 : i === 1 ? 70 : i === 2 ? 85 : i === 3 ? 100 : 115
          return (
            <g key={t}>
              <circle cx={x} cy={y} r="5" fill={CREAM} stroke={i === 0 ? GOLD_READABLE : INK} strokeWidth="1.4" />
              <text x={x} y={y + 22} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7.5" fontWeight="700" fill={INK}>
                {t}
              </text>
            </g>
          )
        })}
        <text x="360" y="175" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(26,26,26,.5)">
          front-loaded · decaying rhythm · mixed channels · graceful close
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtcCh07Reputation({ caption }: D) {
  return (
    <Fig fig="FIG. 07.3" caption={caption}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="border-2 border-[#1a1a1a] bg-[#FFF2EC] p-5">
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6914]">High sender reputation</p>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full border-2 border-[#C5A059] bg-[#C5A059]/20" />
            <p className="font-sans text-[12px] text-[#1a1a1a]/75">Your messages arrive</p>
          </div>
        </div>
        <div className="border border-[#1a1a1a]/20 bg-[#E8E8E8]/40 p-5">
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/45">Damaged</p>
          <div className="flex items-center gap-3 opacity-50">
            <div className="h-10 w-10 rounded-full border border-dashed border-[#1a1a1a]/40" />
            <p className="font-sans text-[12px] text-[#1a1a1a]/55">Sent — but nobody sees. No error shown.</p>
          </div>
        </div>
      </div>
    </Fig>
  )
}

/* —— Ch08 —— */

export function BtcCh08LeadsOrWork({ caption }: D) {
  return (
    <Fig fig="FIG. 08.1" caption={caption}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="border border-[#1a1a1a]/20 bg-[#E8E8E8]/40 p-5">
          <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/45">Channel A</p>
          <div className="font-serif text-[28px] font-semibold text-[#1a1a1a]/45">12 leads</div>
          <div className="mt-1 font-mono text-[10px] text-[#1a1a1a]/45">2 won</div>
        </div>
        <div className="border-2 border-[#1a1a1a] bg-[#FFF2EC] p-5">
          <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6914]">Channel B</p>
          <div className="font-serif text-[28px] font-semibold text-[#1a1a1a]">3 leads</div>
          <div className="mt-1 font-mono text-[10px] font-bold text-[#8B6914]">3 won · larger value</div>
        </div>
      </div>
      <p className="mt-5 text-center font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[#1a1a1a]/45">
        Only the CRM sees the whole journey
      </p>
    </Fig>
  )
}

export function BtcCh08SourceBirth({ caption }: D) {
  const sources = [
    { label: 'Website form', tag: 'auto-tagged' },
    { label: 'Phone', tag: 'call tracking' },
    { label: 'Referral', tag: 'logged' },
    { label: 'Social', tag: 'UTM on every link' },
  ]
  return (
    <Fig fig="FIG. 08.2" caption={caption}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {sources.map((s) => (
          <div key={s.label} className="border border-[#1a1a1a] bg-[#FFF2EC] p-4 text-center">
            <div className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#1a1a1a]">{s.label}</div>
            <div className="mt-2 font-mono text-[7.5px] font-bold uppercase tracking-[0.08em] text-[#8B6914]">{s.tag}</div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-center font-serif text-[13px] italic text-[#1a1a1a]/55">
        Memory-based source data is fiction by Friday
      </p>
    </Fig>
  )
}

export function BtcCh08DarkFunnel({ caption }: D) {
  const { uid, ink } = useArrowIds()
  const steps = [
    { label: 'Search', dashed: true },
    { label: 'Compare', dashed: true },
    { label: 'Ask a friend', dashed: true },
    { label: 'Form submit', dashed: false, gold: true },
  ]
  return (
    <Fig fig="FIG. 08.3" caption={caption}>
      <PlateSvg viewBox="0 0 720 160" ariaLabel="Dark funnel journey">
        <ArrowDefs uid={uid} />
        {steps.map((s, i) => {
          const x = 40 + i * 165
          return (
            <g key={s.label}>
              <rect
                x={x}
                y={50}
                width={130}
                height={44}
                rx="2"
                fill={CREAM}
                stroke={s.gold ? GOLD_READABLE : INK}
                strokeWidth={s.gold ? 2 : 1.4}
                strokeDasharray={s.dashed ? '4 3' : undefined}
              />
              <text x={x + 65} y={77} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fontWeight="700" fill={INK}>
                {s.label}
              </text>
              {i < steps.length - 1 && (
                <path
                  d={`M${x + 130},72 L${x + 165},72`}
                  stroke={INK}
                  strokeWidth="1.3"
                  strokeDasharray={s.dashed ? '3 2' : undefined}
                  markerEnd={`url(#${ink})`}
                  fill="none"
                />
              )}
            </g>
          )
        })}
        <text x="360" y="130" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fontWeight="700" fill={GOLD_READABLE}>
          final step wears all the credit
        </text>
        <text x="360" y="148" textAnchor="middle" fontFamily="Lora, serif" fontSize="11" fontStyle="italic" fill="rgba(26,26,26,.45)">
          Evidence, not gospel
        </text>
      </PlateSvg>
    </Fig>
  )
}

import { Fig, MonoBox, ArrowDefs, PlateSvg, useArrowIds, CREAM, GOLD_READABLE, INK } from './diagramPrimitives'

type D = { caption: string }

/* —— Ch09 —— */

export function BtrCh09NervousSystem({ caption }: D) {
  const organs = [
    { label: 'WEBSITE', sub: 'senses', x: 300, y: 30 },
    { label: 'CRM', sub: 'remembers', x: 120, y: 120 },
    { label: 'ACCOUNTS', sub: 'keeps score', x: 480, y: 120 },
    { label: 'INBOX', sub: 'signals', x: 200, y: 210 },
    { label: 'CONTENT', sub: 'speaks', x: 400, y: 210 },
  ]
  return (
    <Fig fig="FIG. 09.1" caption={caption}>
      <PlateSvg viewBox="0 0 720 300" ariaLabel="The nervous system">
        {organs.map((o) => (
          <g key={o.label}>
            <MonoBox x={o.x} y={o.y} w={100} h={44} label={o.label} fontSize={7} gold={o.label === 'CRM'} />
            <text x={o.x + 50} y={o.y + 58} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="6" fill="rgba(26,26,26,.45)">
              {o.sub}
            </text>
          </g>
        ))}
        <path d="M350,74 L170,120" stroke={GOLD_READABLE} strokeWidth="1.2" fill="none" opacity="0.6" />
        <path d="M350,74 L530,120" stroke={GOLD_READABLE} strokeWidth="1.2" fill="none" opacity="0.6" />
        <path d="M170,164 L250,210" stroke={INK} strokeWidth="1" fill="none" opacity="0.4" />
        <path d="M530,164 L450,210" stroke={INK} strokeWidth="1" fill="none" opacity="0.4" />
        <text x="290" y="90" fontFamily="ui-monospace, monospace" fontSize="6" fill={GOLD_READABLE}>⚙</text>
        <text x="420" y="155" fontFamily="ui-monospace, monospace" fontSize="6" fill={GOLD_READABLE}>⚙</text>
        <text x="360" y="285" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7.5" fontWeight="700" fill={GOLD_READABLE}>
          reflex-wiring · not plain lines
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtrCh09SignatureFlow({ caption }: D) {
  const { uid, ink, gold } = useArrowIds()
  const rules = ['FORM IN', 'CONTACT', 'ACK SENT', 'OWNER ALERT']
  const human = ['BRIEFING', 'DRAFT READY', 'ONE TAP']
  return (
    <Fig fig="FIG. 09.2" caption={caption}>
      <PlateSvg viewBox="0 0 720 260" ariaLabel="The enquiry that arrives with its homework done">
        <ArrowDefs uid={uid} />
        <text x="360" y="28" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" fill={GOLD_READABLE}>
          8:47, TUESDAY
        </text>
        <text x="80" y="55" fontFamily="ui-monospace, monospace" fontSize="7" fontWeight="700" fill="rgba(26,26,26,.45)">
          ROW 1 — the rules
        </text>
        {rules.map((s, i) => {
          const x = 40 + i * 165
          return (
            <g key={s}>
              <MonoBox x={x} y={65} w={130} h={32} label={s} fontSize={6.5} />
              <text x={x + 65} y={58} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="6" fill={GOLD_READABLE}>⚙</text>
              {i < rules.length - 1 && (
                <path d={`M${x + 130},81 L${x + 165},81`} stroke={INK} strokeWidth="1.2" markerEnd={`url(#${ink})`} fill="none" />
              )}
            </g>
          )
        })}
        <text x="80" y="130" fontFamily="ui-monospace, monospace" fontSize="7" fontWeight="700" fill="rgba(26,26,26,.45)">
          ROW 2 — the human lane
        </text>
        {human.map((s, i) => {
          const x = 120 + i * 180
          return (
            <g key={s}>
              <MonoBox x={x} y={140} w={140} h={36} label={s} fontSize={6.5} gold={i === human.length - 1} />
              {i < human.length - 1 && (
                <path d={`M${x + 140},158 L${x + 180},158`} stroke={GOLD_READABLE} strokeWidth="1.3" markerEnd={`url(#${gold})`} fill="none" />
              )}
            </g>
          )
        })}
        <text x="360" y="220" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fill="rgba(26,26,26,.5)">
          homework done before you open the inbox
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtrCh09SentReceived({ caption }: D) {
  return (
    <Fig fig="FIG. 09.3" caption={caption}>
      <div className="space-y-5">
        <div className="border border-dashed border-[#1a1a1a]/30 bg-[#E8E8E8]/35 p-5 opacity-50">
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/45">Fire and hope</p>
          <div className="flex items-center gap-3">
            <div className="border border-[#1a1a1a]/20 bg-white/50 px-4 py-2 font-mono text-[9px] font-bold">FIRE</div>
            <span className="font-mono text-[10px] text-[#1a1a1a]/35">········ ?</span>
            <div className="border border-dashed border-[#1a1a1a]/25 px-4 py-2 font-mono text-[9px] text-[#1a1a1a]/35">GONE</div>
          </div>
        </div>
        <div className="border-2 border-[#1a1a1a] bg-[#FFF2EC] p-5">
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6914]">Fire · confirm · queue · retry</p>
          <div className="flex flex-wrap items-center gap-2">
            {['FIRE', 'CONFIRM', 'QUEUE', 'RETRY', 'DELIVERED'].map((s, i) => (
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

export function BtrCh09Watcher({ caption }: D) {
  const counters = [
    { label: 'ENQUIRIES IN', value: '12' },
    { label: 'ACKS OUT', value: '12' },
    { label: 'DRAFTS PREPARED', value: '12' },
  ]
  return (
    <Fig fig="FIG. 09.4" caption={caption}>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {counters.map((c, i) => (
          <div key={c.label} className="text-center">
            <div className="border border-[#1a1a1a] bg-[#FFF2EC] px-5 py-4">
              <p className="font-mono text-[8px] font-bold uppercase tracking-[0.1em] text-[#1a1a1a]/55">{c.label}</p>
              <p className="mt-1 font-serif text-[28px] font-semibold text-[#1a1a1a]">{c.value}</p>
            </div>
            {i < counters.length - 1 && (
              <span className="mt-2 hidden font-mono text-[14px] font-bold text-[#8B6914] md:inline">=</span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 text-center font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[#8B6914]">
        health is these numbers agreeing
      </p>
      <p className="mt-2 text-center font-mono text-[8px] text-[#1a1a1a]/45">
        watcher&apos;s watcher — alerts when they diverge
      </p>
    </Fig>
  )
}

export function BtrCh09Layers({ caption }: D) {
  const layers = [
    { label: 'SENSING', sub: 'website wired to CRM' },
    { label: 'REFLEXES', sub: 'the quick wins' },
    { label: 'MEMORY', sub: 'logging, reconciliation' },
    { label: 'THINKING', sub: 'classify, briefings, drafting' },
    { label: 'AWARENESS', sub: 'watchers, digests, health', gold: true },
  ]
  return (
    <Fig fig="FIG. 09.5" caption={caption}>
      <div className="mx-auto flex max-w-[360px] flex-col-reverse gap-1">
        {layers.map((l, i) => (
          <div
            key={l.label}
            className={`border px-4 py-3 ${l.gold ? 'border-2 border-[#C5A059] bg-[#FFF2EC]' : 'border-[#1a1a1a]/18 bg-[#FFF2EC]'}`}
            style={{ marginLeft: i * 8, marginRight: i * 8 }}
          >
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#1a1a1a]">{l.label}</div>
            <div className="mt-0.5 font-sans text-[11px] text-[#1a1a1a]/60">{l.sub}</div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-[#1a1a1a]/45">
        built bottom-up · each layer earns the next
      </p>
    </Fig>
  )
}

/* —— Ch10 —— */

export function BtrCh10SplitWorkflow({ caption }: D) {
  const smells = ['second trigger appeared', 'branches need a map', 'afraid to touch it']
  const { uid, ink, gold } = useArrowIds()
  return (
    <Fig fig="FIG. 10.1" caption={caption}>
      <PlateSvg viewBox="0 0 720 240" ariaLabel="When one workflow becomes two">
        <ArrowDefs uid={uid} />
        <MonoBox x={260} y={40} w={200} h={50} label="ONE WORKFLOW" fontSize={8} />
        {smells.map((s, i) => (
          <g key={s}>
            <text x={500} y={55 + i * 22} fontFamily="ui-monospace, monospace" fontSize="6.5" fill="rgba(26,26,26,.5)">
              ⚠ {s}
            </text>
            <path d={`M460,${55 + i * 15} L490,${55 + i * 22}`} stroke={INK} strokeWidth="0.8" strokeDasharray="2 2" fill="none" opacity="0.4" />
          </g>
        ))}
        <path d="M360,90 L280,130" stroke={GOLD_READABLE} strokeWidth="1.4" markerEnd={`url(#${gold})`} fill="none" />
        <path d="M360,90 L440,130" stroke={GOLD_READABLE} strokeWidth="1.4" markerEnd={`url(#${gold})`} fill="none" />
        <MonoBox x={160} y={140} w={180} h={40} label="HANDLE ENQUIRY" fontSize={7} gold />
        <MonoBox x={380} y={140} w={180} h={40} label="CHASE INVOICE" fontSize={7} gold />
        <text x="360" y="215" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fill="rgba(26,26,26,.5)">
          split before fear sets in
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtrCh10Crossover({ caption }: D) {
  return (
    <Fig fig="FIG. 10.2" caption={caption}>
      <PlateSvg viewBox="0 0 720 220" ariaLabel="When the economics flip">
        <line x1="60" y1="180" x2="660" y2="180" stroke={INK} strokeWidth="1" opacity="0.3" />
        <line x1="60" y1="40" x2="60" y2="180" stroke={INK} strokeWidth="1" opacity="0.3" />
        <text x="360" y="205" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fill="rgba(26,26,26,.4)">
          TIME →
        </text>
        <path d="M80,160 L200,130 L320,100 L400,85 L480,75 L560,70" fill="none" stroke={INK} strokeWidth="1.5" />
        <text x="120" y="175" fontFamily="ui-monospace, monospace" fontSize="7" fill="rgba(26,26,26,.45)">per-task cost</text>
        <path d="M80,170 L200,165 L320,160 L400,158 L480,157 L640,156" fill="none" stroke={GOLD_READABLE} strokeWidth="1.5" />
        <text x="560" y="148" fontFamily="ui-monospace, monospace" fontSize="7" fill={GOLD_READABLE}>self-hosted</text>
        <circle cx="420" cy="118" r="50" fill={GOLD_READABLE} opacity="0.12" />
        <text x="420" y="115" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fontWeight="700" fill={GOLD_READABLE}>
          crossover
        </text>
        <text x="420" y="130" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="6" fill="rgba(26,26,26,.5)">
          watch the trend
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtrCh10SocialFailures({ caption }: D) {
  const modes = [
    { title: 'UNDER-TRUST', sub: 'Shadow spreadsheet, paying twice', tilt: 'left' },
    { title: 'LEVEL', sub: 'Named gates, visible queues', tilt: 'center', gold: true },
    { title: 'OVER-TRUST', sub: 'Rubber-stamped gate', tilt: 'right' },
  ]
  return (
    <Fig fig="FIG. 10.3" caption={caption}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {modes.map((m) => (
          <div
            key={m.title}
            className={`border p-4 text-center ${m.gold ? 'border-2 border-[#C5A059] bg-[#FFF2EC]' : 'border-[#1a1a1a]/18 bg-[#E8E8E8]/35'}`}
            style={{ transform: m.tilt === 'left' ? 'rotate(-2deg)' : m.tilt === 'right' ? 'rotate(2deg)' : 'none' }}
          >
            <div className={`font-mono text-[10px] font-bold uppercase tracking-[0.12em] ${m.gold ? 'text-[#8B6914]' : 'text-[#1a1a1a]/55'}`}>
              {m.title}
            </div>
            <div className="mt-2 font-sans text-[11px] text-[#1a1a1a]/60">{m.sub}</div>
          </div>
        ))}
      </div>
    </Fig>
  )
}

/* —— Ch11 —— */

export function BtrCh11DescribingBuilds({ caption }: D) {
  const { uid, ink } = useArrowIds()
  const builders = ['PLATFORM AI', 'PARTNER', 'YOU ON SUNDAY']
  return (
    <Fig fig="FIG. 11.1" caption={caption}>
      <PlateSvg viewBox="0 0 720 220" ariaLabel="Describing is the new building">
        <ArrowDefs uid={uid} />
        <rect x={240} y={30} width={240} height={100} rx="2" fill={CREAM} stroke={INK} strokeWidth="2" />
        <text x="360" y="55" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fontWeight="700" fill={INK}>
          SPECIFICATION
        </text>
        <text x="360" y="72" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="6" fill="rgba(26,26,26,.55)">
          trigger · steps · edges
        </text>
        <text x="360" y="86" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="6" fill="rgba(26,26,26,.55)">
          failure path · gates
        </text>
        {builders.map((b, i) => {
          const x = 80 + i * 220
          const cx = x + 70
          return (
            <g key={b}>
              <path d={`M360,130 L${cx},160`} stroke={INK} strokeWidth="1.2" markerEnd={`url(#${ink})`} fill="none" />
              <MonoBox x={x} y={160} w={140} h={36} label={b} fontSize={6.5} gold={i === 2} />
            </g>
          )
        })}
        <text x="360" y="215" textAnchor="middle" fontFamily="Lora, serif" fontSize="12" fontStyle="italic" fill="rgba(26,26,26,.5)">
          All three build from the same words
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtrCh11FourChecks({ caption }: D) {
  const checks = [
    { label: 'SPECIFICATION', sub: 'Matches what you meant, edges included' },
    { label: 'FAILURE PATH', sub: 'Every silence has an alarm' },
    { label: 'GATES', sub: 'Customer-facing drafts, never sends' },
    { label: 'TRUTH', sub: 'Only facts the system can verify' },
  ]
  return (
    <Fig fig="FIG. 11.2" caption={caption}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {checks.map((c, i) => (
          <div key={c.label} className={`border p-4 ${i === 2 ? 'border-[#C5A059] border-2 bg-[#FFF2EC]' : 'border-[#1a1a1a]/18 bg-[#FFF2EC]'}`}>
            <div className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#8B6914]">✓ {c.label}</div>
            <div className="mt-2 font-sans text-[11px] text-[#1a1a1a]/60">{c.sub}</div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-[#1a1a1a]/45">
        Four stamped checkpoints before go-live
      </p>
    </Fig>
  )
}

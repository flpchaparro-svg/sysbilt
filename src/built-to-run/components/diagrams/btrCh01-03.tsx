import { Fig, MonoBox, ArrowDefs, PlateSvg, useArrowIds, CREAM, GOLD_READABLE, INK } from './diagramPrimitives'

type D = { caption: string }

/* —— Ch01 —— */

export function BtrCh01HumanGlue({ caption }: D) {
  const { uid, ink } = useArrowIds()
  const islands = [
    { label: 'WEBSITE', x: 80, y: 50 },
    { label: 'INBOX', x: 280, y: 30 },
    { label: 'SHEET', x: 480, y: 50 },
    { label: 'CALENDAR', x: 180, y: 200 },
    { label: 'ACCOUNTS', x: 420, y: 200 },
  ]
  const cx = 360
  const cy = 130
  return (
    <Fig fig="FIG. 01.1" caption={caption}>
      <PlateSvg viewBox="0 0 720 280" ariaLabel="The owner as human glue">
        <ArrowDefs uid={uid} />
        {islands.map((island) => (
          <g key={island.label}>
            <MonoBox x={island.x} y={island.y} w={90} h={36} label={island.label} fontSize={7} />
            <path
              d={`M${cx},${cy} L${island.x + 45},${island.y + 18}`}
              stroke={INK}
              strokeWidth="1.1"
              strokeDasharray="3 2"
              opacity="0.55"
              markerEnd={`url(#${ink})`}
              fill="none"
            />
          </g>
        ))}
        <circle cx={cx} cy={cy} r="28" fill={CREAM} stroke={INK} strokeWidth="2" />
        <text x={cx} y={cy + 4} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" fill={INK}>
          YOU
        </text>
        <text x={cx} y={260} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7.5" fontWeight="700" fill="rgba(26,26,26,.5)">
          retype · forward · chase · remember
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtrCh01WhenDoThat({ caption }: D) {
  const { uid, ink, gold } = useArrowIds()
  return (
    <Fig fig="FIG. 01.2" caption={caption}>
      <PlateSvg viewBox="0 0 720 200" ariaLabel="When this happens, do that">
        <ArrowDefs uid={uid} />
        <MonoBox x={60} y={60} w={200} h={56} label="WHEN:" fontSize={9} />
        <text x={160} y={100} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7.5" fill="rgba(26,26,26,.6)">
          form submitted
        </text>
        <path d="M260,88 L320,88" stroke={GOLD_READABLE} strokeWidth="1.6" markerEnd={`url(#${gold})`} fill="none" />
        <MonoBox x={320} y={44} w={340} h={88} label="DO:" fontSize={9} gold />
        <text x={490} y="78" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fill="rgba(26,26,26,.65)">
          create contact · send acknowledgement
        </text>
        <text x={490} y="96" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fill="rgba(26,26,26,.65)">
          alert owner
        </text>
        <text x={360} y={175} textAnchor="middle" fontFamily="Lora, serif" fontSize="12" fontStyle="italic" fill="rgba(26,26,26,.5)">
          No robot. No magic. A rule, faithfully followed.
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtrCh01EffortOrRun({ caption }: D) {
  const { uid, ink, gold } = useArrowIds()
  return (
    <Fig fig="FIG. 01.3" caption={caption}>
      <PlateSvg viewBox="0 0 720 300" ariaLabel="Held together by effort, or built to run">
        <ArrowDefs uid={uid} />
        <line x1="360" y1="30" x2="360" y2="270" stroke={INK} strokeWidth="1" opacity="0.12" />
        <text x="180" y="28" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" letterSpacing="2" fill="rgba(26,26,26,.45)">
          EFFORT
        </text>
        <text x="540" y="28" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" letterSpacing="2" fill={GOLD_READABLE}>
          DESIGN
        </text>
        {[0, 1, 2].map((i) => (
          <g key={`left-${i}`}>
            <MonoBox x={60 + i * 70} y={70} w={60} h={32} label={['WEB', 'CRM', 'ACC'][i]} fontSize={6.5} />
            <circle cx={90 + i * 70} cy={140} r="8" fill="none" stroke={INK} strokeWidth="1.2" />
            {i < 2 && (
              <path d={`M${120 + i * 70},86 L${130 + i * 70},120`} stroke={INK} strokeWidth="1" strokeDasharray="3 2" fill="none" opacity="0.5" />
            )}
          </g>
        ))}
        <text x="180" y="175" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fill="rgba(26,26,26,.5)">
          people carry the information
        </text>
        {[0, 1, 2].map((i) => (
          <g key={`right-${i}`}>
            <MonoBox x={400 + i * 70} y={70} w={60} h={32} label={['WEB', 'CRM', 'ACC'][i]} fontSize={6.5} />
            {i < 2 && (
              <path d={`M${460 + i * 70},86 L${470 + i * 70},86`} stroke={GOLD_READABLE} strokeWidth="1.3" markerEnd={`url(#${gold})`} fill="none" />
            )}
            <text x={430 + i * 70} y={110} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="6" fill={GOLD_READABLE}>
              ⚙
            </text>
          </g>
        ))}
        <circle cx="540" cy="55" r="10" fill={CREAM} stroke={INK} strokeWidth="1.4" />
        <text x="540" y="59" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fontWeight="700" fill={INK}>
          YOU
        </text>
        <text x="540" y="175" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fill={GOLD_READABLE}>
          information carries itself
        </text>
        <text x="540" y="192" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fill="rgba(26,26,26,.5)">
          judgment at the top
        </text>
      </PlateSvg>
    </Fig>
  )
}

/* —— Ch02 —— */

export function BtrCh02FourParts({ caption }: D) {
  const { uid, ink } = useArrowIds()
  const parts = [
    { label: 'TRIGGER', sub: 'the event that starts it' },
    { label: 'STEPS', sub: 'what happens, in order' },
    { label: 'CONDITIONS', sub: 'the forks in the road' },
    { label: 'ACTION', sub: 'the result it exists for', gold: true },
  ]
  return (
    <Fig fig="FIG. 02.1" caption={caption}>
      <PlateSvg viewBox="0 0 720 180" ariaLabel="The four parts of every automation">
        <ArrowDefs uid={uid} />
        <path d="M30,30 L690,30" stroke={INK} strokeWidth="1" opacity="0.15" fill="none" />
        <text x="360" y="22" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fontWeight="700" fill="rgba(26,26,26,.4)">
          every automation
        </text>
        {parts.map((p, i) => {
          const x = 30 + i * 170
          return (
            <g key={p.label}>
              <MonoBox x={x} y={50} w={140} h={40} label={p.label} fontSize={7.5} gold={p.gold} />
              <text x={x + 70} y={110} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="6.5" fill="rgba(26,26,26,.55)">
                {p.sub}
              </text>
              {i < parts.length - 1 && (
                <path d={`M${x + 140},70 L${x + 170},70`} stroke={INK} strokeWidth="1.2" markerEnd={`url(#${ink})`} fill="none" />
              )}
            </g>
          )
        })}
      </PlateSvg>
    </Fig>
  )
}

export function BtrCh02Webhook({ caption }: D) {
  const { uid, gold } = useArrowIds()
  return (
    <Fig fig="FIG. 02.2" caption={caption}>
      <PlateSvg viewBox="0 0 720 220" ariaLabel="The doorbell with an envelope">
        <ArrowDefs uid={uid} />
        <MonoBox x={60} y={70} w={160} h={80} label="SYSTEM A" fontSize={9} />
        <text x="140" y="115" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fill="rgba(26,26,26,.55)">
          something happens
        </text>
        <circle cx="300" cy="110" r="18" fill="none" stroke={GOLD_READABLE} strokeWidth="1.5" />
        <text x="300" y="114" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fontWeight="700" fill={GOLD_READABLE}>
          🔔
        </text>
        <path d="M220,110 L282,110" stroke={GOLD_READABLE} strokeWidth="1.4" markerEnd={`url(#${gold})`} fill="none" />
        <rect x="340" y="95" width="36" height="24" rx="1" fill={CREAM} stroke={INK} strokeWidth="1.2" />
        <text x="358" y="111" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fill={INK}>
          ✉
        </text>
        <MonoBox x={400} y={70} w={160} h={80} label="SYSTEM B" fontSize={9} />
        <text x="480" y="115" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fill="rgba(26,26,26,.55)">
          receives instantly
        </text>
        <text x="360" y="175" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fontWeight="700" fill={GOLD_READABLE}>
          the instant something happens
        </text>
        <g opacity="0.45">
          <circle cx="620" cy="90" r="16" fill="none" stroke={INK} strokeWidth="1" />
          <text x="620" y="94" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fill={INK}>
            ⏱
          </text>
          <line x1="605" y1="115" x2="635" y2="85" stroke={INK} strokeWidth="1.2" />
          <text x="620" y="130" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="6.5" fill="rgba(26,26,26,.5)">
            no waiting
          </text>
        </g>
      </PlateSvg>
    </Fig>
  )
}

export function BtrCh02ThreeBenches({ caption }: D) {
  const benches = [
    { title: 'PLUG-AND-PLAY', note: 'Gentle, quick, priced per task', h: 56 },
    { title: 'VISUAL MIDDLE', note: 'More power, friendlier pricing', h: 80, gold: true },
    { title: 'SELF-HOSTED', note: 'Full control, you run the server', h: 104 },
  ]
  return (
    <Fig fig="FIG. 02.3" caption={caption}>
      <div className="flex items-end justify-center gap-4 md:gap-8">
        {benches.map((b) => (
          <div key={b.title} className="flex flex-col items-center">
            <div
              className={`flex w-[100px] items-center justify-center border text-center md:w-[130px] ${
                b.gold ? 'border-2 border-[#1a1a1a] bg-[#FFF2EC]' : 'border border-[#1a1a1a]/25 bg-[#E8E8E8]/40'
              } px-2`}
              style={{ height: b.h }}
            >
              <p className={`font-mono text-[7.5px] font-bold uppercase leading-[1.35] tracking-[0.08em] ${b.gold ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/55'}`}>
                {b.title}
              </p>
            </div>
            <p className={`mt-2 max-w-[120px] text-center font-sans text-[10px] ${b.gold ? 'font-medium text-[#1a1a1a]/75' : 'text-[#1a1a1a]/50'}`}>
              {b.note}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-center font-serif text-[13px] italic text-[#1a1a1a]/55">
        The bill grows with success on the left; the learning curve on the right
      </p>
    </Fig>
  )
}

export function BtrCh02WhatYouOwn({ caption }: D) {
  const items = [
    { title: 'The accounts', sub: "In the business's name" },
    { title: 'The credentials', sub: 'In the vault, auditable' },
    { title: 'The workflows', sub: 'Exportable — test it' },
    { title: 'The documentation', sub: 'One plain line per workflow' },
  ]
  return (
    <Fig fig="FIG. 02.4" caption={caption}>
      <div className="mx-auto max-w-[480px]">
        <div className="border-2 border-[#1a1a1a] bg-[#FFF2EC] p-6">
          <p className="text-center font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#8B6914]">🔑 What you own</p>
          <div className="mt-5 space-y-3">
            {items.map((item) => (
              <div key={item.title} className="border border-[#1a1a1a]/18 bg-white/50 px-4 py-3">
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#1a1a1a]">{item.title}</div>
                <div className="mt-1 font-sans text-[12px] text-[#1a1a1a]/60">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fig>
  )
}

/* —— Ch03 —— */

export function BtrCh03Canyon({ caption }: D) {
  return (
    <Fig fig="FIG. 03.1" caption={caption}>
      <PlateSvg viewBox="0 0 720 240" ariaLabel="The canyon between demo and dependable">
        <path d="M40,180 L200,60 L200,180 Z" fill={CREAM} stroke={INK} strokeWidth="1.5" />
        <text x="120" y="130" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fontWeight="700" fill="rgba(26,26,26,.55)">
          THE DEMO
        </text>
        <text x="120" y="148" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="6.5" fill="rgba(26,26,26,.45)">
          happy path · works once
        </text>
        <path d="M520,180 L680,60 L680,180 Z" fill={CREAM} stroke={INK} strokeWidth="2" />
        <text x="600" y="130" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fontWeight="700" fill={GOLD_READABLE}>
          DEPENDABLE
        </text>
        <text x="600" y="148" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="6.5" fill="rgba(26,26,26,.55)">
          real world · works every night
        </text>
        <rect x="280" y="100" width="160" height="80" fill="#E8E8E8" opacity="0.35" />
        <text x="360" y="135" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fontWeight="700" fill="rgba(26,26,26,.5)">
          the canyon
        </text>
        <text x="360" y="155" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="6.5" fill="rgba(26,26,26,.45)">
          edge cases · failures · silence
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtrCh03OneJob({ caption }: D) {
  const { uid, ink, gold } = useArrowIds()
  const smallFlows = ['NEW ENQUIRY', 'CHASE INVOICE', 'SEND REVIEW', 'WEEKLY DIGEST']
  return (
    <Fig fig="FIG. 03.2" caption={caption}>
      <PlateSvg viewBox="0 0 720 260" ariaLabel="One job per workflow">
        <ArrowDefs uid={uid} />
        <line x1="360" y1="20" x2="360" y2="240" stroke={INK} strokeWidth="1" opacity="0.12" />
        <text x="180" y="30" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" fill="rgba(26,26,26,.4)">
          ONE MEGA-FLOW
        </text>
        <path d="M60,60 L300,60 L280,180 L80,180 Z" fill="none" stroke={INK} strokeWidth="1.2" strokeDasharray="4 3" opacity="0.5" />
        <text x="180" y="120" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fill="rgba(26,26,26,.45)">
          touches everything
        </text>
        <line x1="100" y1="50" x2="260" y2="190" stroke={INK} strokeWidth="1.5" opacity="0.35" />
        <line x1="260" y1="50" x2="100" y2="190" stroke={INK} strokeWidth="1.5" opacity="0.35" />
        <text x="180" y="210" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fontWeight="700" fill="rgba(26,26,26,.45)">
          nobody can safely change it
        </text>
        <text x="540" y="30" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" fill={GOLD_READABLE}>
          FOUR SMALL FLOWS
        </text>
        {smallFlows.map((f, i) => {
          const x = 400 + (i % 2) * 130
          const y = 55 + Math.floor(i / 2) * 70
          return (
            <g key={f}>
              <MonoBox x={x} y={y} w={115} h={36} label={f} fontSize={6} gold={true} />
            </g>
          )
        })}
        <path d="M540,200 L600,200" stroke={GOLD_READABLE} strokeWidth="1.3" markerEnd={`url(#${gold})`} fill="none" />
        <text x="540" y="225" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fill={GOLD_READABLE}>
          each has one owner · one purpose
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtrCh03FailurePath({ caption }: D) {
  const { uid, ink, gold } = useArrowIds()
  return (
    <Fig fig="FIG. 03.3" caption={caption}>
      <PlateSvg viewBox="0 0 720 240" ariaLabel="The failure path is the design">
        <ArrowDefs uid={uid} />
        <MonoBox x={280} y={40} w={160} h={40} label="STEP" fontSize={10} />
        <path d="M360,80 L360,110" stroke={INK} strokeWidth="1.3" markerEnd={`url(#${ink})`} fill="none" />
        <path d="M280,130 L200,180" stroke={INK} strokeWidth="1.3" markerEnd={`url(#${ink})`} fill="none" />
        <path d="M440,130 L520,180" stroke={GOLD_READABLE} strokeWidth="1.5" markerEnd={`url(#${gold})`} fill="none" />
        <MonoBox x={120} y={170} w={160} h={40} label="WORKED" fontSize={8} />
        <text x="200" y="225" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="6.5" fill="rgba(26,26,26,.5)">
          continue
        </text>
        <MonoBox x={440} y={170} w={160} h={40} label="FAILED" fontSize={8} gold />
        <text x="520" y="225" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="6.5" fill={GOLD_READABLE}>
          retry · park · alert
        </text>
        <text x="360" y="22" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fontWeight="700" fill="rgba(26,26,26,.45)">
          two exits · equal weight
        </text>
      </PlateSvg>
    </Fig>
  )
}

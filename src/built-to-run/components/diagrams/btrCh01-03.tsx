import { Fig, MonoBox, MonoCard, ArrowDefs, PlateSvg, useArrowIds, CREAM, GOLD_READABLE, INK, BTR_FONT } from './diagramPrimitives'

type D = { caption: string }

/* —— Ch01 —— */

export function BtrCh01HumanGlue({ caption }: D) {
  const { uid, ink } = useArrowIds()
  const cx = 360
  const cy = 128
  const centerR = 30
  const orbitR = 96

  /** Five islands on a regular pentagon — top first, clockwise. */
  const nodes = (['INBOX', 'SHEET', 'ACCOUNTS', 'CALENDAR', 'WEBSITE'] as const).map((label, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5
    const w = label.length > 7 ? 108 : 92
    const h = 38
    const bx = cx + orbitR * Math.cos(angle)
    const by = cy + orbitR * Math.sin(angle)
    return { label, w, h, bx, by }
  })

  function connector(n: (typeof nodes)[0]) {
    const dx = n.bx - cx
    const dy = n.by - cy
    const len = Math.hypot(dx, dy) || 1
    const ux = dx / len
    const uy = dy / len
    const halfW = n.w / 2
    const halfH = n.h / 2
    const boxEdge = Math.min(halfW / Math.abs(ux), halfH / Math.abs(uy)) + 6
    const x1 = cx + ux * (centerR + 5)
    const y1 = cy + uy * (centerR + 5)
    const x2 = n.bx - ux * boxEdge
    const y2 = n.by - uy * boxEdge
    return `M${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)}`
  }

  return (
    <Fig fig="FIG. 01.1" caption={caption}>
      <PlateSvg viewBox="0 0 720 250" ariaLabel="The owner as human glue">
        <ArrowDefs uid={uid} />
        {nodes.map((n) => (
          <path
            key={`line-${n.label}`}
            d={connector(n)}
            stroke={INK}
            strokeWidth="1.2"
            strokeDasharray="4 3"
            opacity="0.45"
            markerEnd={`url(#${ink})`}
            fill="none"
          />
        ))}
        {nodes.map((n) => (
          <MonoBox
            key={n.label}
            x={n.bx - n.w / 2}
            y={n.by - n.h / 2}
            w={n.w}
            h={n.h}
            label={n.label}
            fontSize={BTR_FONT.mono}
          />
        ))}
        <circle cx={cx} cy={cy} r={centerR} fill={CREAM} stroke={INK} strokeWidth="2" />
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize={BTR_FONT.label}
          fontWeight="700"
          fill={INK}
        >
          YOU
        </text>
        <text
          x={cx}
          y={238}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize={BTR_FONT.body}
          fontWeight="700"
          letterSpacing="0.5"
          fill="rgba(26,26,26,.5)"
        >
          retype · forward · chase · remember
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtrCh01WhenDoThat({ caption }: D) {
  const { uid, gold } = useArrowIds()
  const when = { x: 72, y: 44, w: 188, h: 86 }
  const doBox = { x: 360, y: 44, w: 288, h: 86 }
  const midY = when.y + when.h / 2

  function flowCard(
    box: { x: number; y: number; w: number; h: number },
    header: string,
    lines: string[],
    goldHeader = false,
  ) {
    const stroke = goldHeader ? GOLD_READABLE : INK
    return (
      <g>
        <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={2} fill={CREAM} stroke={stroke} strokeWidth="1.4" />
        <text
          x={box.x + box.w / 2}
          y={box.y + 26}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize={BTR_FONT.label}
          fontWeight="700"
          letterSpacing="1"
          fill={goldHeader ? GOLD_READABLE : INK}
        >
          {header}
        </text>
        <line
          x1={box.x + 16}
          y1={box.y + 34}
          x2={box.x + box.w - 16}
          y2={box.y + 34}
          stroke={stroke}
          strokeWidth="0.8"
          opacity="0.2"
        />
        {lines.map((line, i) => (
          <text
            key={line}
            x={box.x + box.w / 2}
            y={box.y + 52 + i * 18}
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize={BTR_FONT.body}
            fill="rgba(26,26,26,.68)"
          >
            {line}
          </text>
        ))}
      </g>
    )
  }

  return (
    <Fig fig="FIG. 01.2" caption={caption}>
      <PlateSvg viewBox="0 0 720 200" ariaLabel="When this happens, do that">
        <ArrowDefs uid={uid} />
        {flowCard(when, 'WHEN:', ['form submitted'])}
        <path
          d={`M${when.x + when.w + 10},${midY} L${doBox.x - 10},${midY}`}
          stroke={GOLD_READABLE}
          strokeWidth="1.6"
          markerEnd={`url(#${gold})`}
          fill="none"
        />
        {flowCard(doBox, 'DO:', ['create contact · send acknowledgement', 'alert owner'], true)}
        <text
          x={360}
          y={175}
          textAnchor="middle"
          fontFamily="Lora, serif"
          fontSize="12"
          fontStyle="italic"
          fill="rgba(26,26,26,.5)"
        >
          No robot. No magic. A rule, faithfully followed.
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtrCh01EffortOrRun({ caption }: D) {
  const { uid, gold } = useArrowIds()
  const boxW = 76
  const boxH = 40
  const kickerY = 20
  const youY = 54
  const boxY = 92
  const personY = 148
  const captionY = 172
  const plateH = 188
  const labels = ['WEB', 'CRM', 'ACC'] as const

  function boxCentres(panelCx: number) {
    const gap = 28
    const span = boxW * 3 + gap * 2
    const x0 = panelCx - span / 2 + boxW / 2
    return [0, 1, 2].map((i) => x0 + i * (boxW + gap))
  }

  const leftCx = boxCentres(180)
  const rightCx = boxCentres(540)
  const linkY = boxY + boxH / 2

  function systemBox(cx: number, label: string, goldStroke = false) {
    return (
      <MonoBox
        key={`${label}-${cx}`}
        x={cx - boxW / 2}
        y={boxY}
        w={boxW}
        h={boxH}
        label={label}
        fontSize={10}
        gold={goldStroke}
      />
    )
  }

  function personIcon(cx: number) {
    return (
      <g key={`person-${cx}`}>
        <circle cx={cx} cy={personY} r={10} fill={CREAM} stroke={INK} strokeWidth="1.3" />
        <text
          x={cx}
          y={personY + 3}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          fontWeight="700"
          fill="rgba(26,26,26,.45)"
        >
          ○
        </text>
      </g>
    )
  }

  function effortLink(x1: number, x2: number, personX: number) {
    const right1 = x1 + boxW / 2
    const left2 = x2 - boxW / 2
    return (
      <path
        d={`M${right1},${linkY} L${personX},${personY} L${left2},${linkY}`}
        stroke={INK}
        strokeWidth="1.1"
        strokeDasharray="4 3"
        fill="none"
        opacity="0.5"
      />
    )
  }

  function designLink(x1: number, x2: number, gearX: number) {
    const xStart = x1 + boxW / 2 + 6
    const xEnd = x2 - boxW / 2 - 6
    return (
      <g key={`link-${x1}-${x2}`}>
        <path
          d={`M${xStart},${linkY} L${xEnd},${linkY}`}
          stroke={GOLD_READABLE}
          strokeWidth="1.5"
          markerEnd={`url(#${gold})`}
          fill="none"
        />
        <text
          x={gearX}
          y={linkY + 18}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize={BTR_FONT.label}
          fill={GOLD_READABLE}
        >
          ⚙
        </text>
      </g>
    )
  }

  return (
    <Fig fig="FIG. 01.3" caption={caption}>
      <PlateSvg viewBox={`0 0 720 ${plateH}`} ariaLabel="Held together by effort, or built to run">
        <ArrowDefs uid={uid} />
        <line x1={360} y1={30} x2={360} y2={plateH - 10} stroke={INK} strokeWidth="1" opacity="0.12" />
        <text
          x={180}
          y={kickerY}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize={BTR_FONT.kicker}
          fontWeight="700"
          letterSpacing="0.14em"
          fill="rgba(26,26,26,.45)"
        >
          EFFORT
        </text>
        <text
          x={540}
          y={kickerY}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize={BTR_FONT.kicker}
          fontWeight="700"
          letterSpacing="0.14em"
          fill={GOLD_READABLE}
        >
          DESIGN
        </text>

        {effortLink(leftCx[0], leftCx[1], (leftCx[0] + leftCx[1]) / 2)}
        {effortLink(leftCx[1], leftCx[2], (leftCx[1] + leftCx[2]) / 2)}
        {labels.map((label, i) => systemBox(leftCx[i], label))}
        {personIcon((leftCx[0] + leftCx[1]) / 2)}
        {personIcon((leftCx[1] + leftCx[2]) / 2)}
        <text
          x={180}
          y={captionY}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize={BTR_FONT.body}
          fill="rgba(26,26,26,.5)"
        >
          people carry the information
        </text>

        {designLink(rightCx[0], rightCx[1], (rightCx[0] + rightCx[1]) / 2)}
        {designLink(rightCx[1], rightCx[2], (rightCx[1] + rightCx[2]) / 2)}
        {labels.map((label, i) => systemBox(rightCx[i], label, true))}
        <line
          x1={540}
          y1={youY + 13}
          x2={540}
          y2={boxY - 6}
          stroke={INK}
          strokeWidth="0.9"
          strokeDasharray="3 2"
          opacity="0.35"
        />
        <circle cx={540} cy={youY} r={13} fill={CREAM} stroke={INK} strokeWidth="1.4" />
        <text
          x={540}
          y={youY + 4}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize={BTR_FONT.small}
          fontWeight="700"
          fill={INK}
        >
          YOU
        </text>
        <text
          x={540}
          y={captionY - 8}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize={BTR_FONT.body}
          fill={GOLD_READABLE}
        >
          information carries itself
        </text>
        <text
          x={540}
          y={captionY + 8}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize={BTR_FONT.body}
          fill="rgba(26,26,26,.5)"
        >
          judgment at the top
        </text>
      </PlateSvg>
    </Fig>
  )
}

/* —— Ch02 —— */

export function BtrCh02FourParts({ caption }: D) {
  const { uid, ink } = useArrowIds()
  const cardW = 148
  const cardH = 68
  const cardY = 44
  const gap = 18
  const startX = (720 - (cardW * 4 + gap * 3)) / 2
  const linkY = cardY + cardH / 2
  const parts = [
    { title: 'TRIGGER', sub: 'the event that starts it' },
    { title: 'STEPS', sub: 'what happens, in order' },
    { title: 'CONDITIONS', sub: 'the forks in the road' },
    { title: 'ACTION', sub: 'the result it exists for', gold: true },
  ]

  return (
    <Fig fig="FIG. 02.1" caption={caption}>
      <PlateSvg viewBox="0 0 720 132" ariaLabel="The four parts of every automation">
        <ArrowDefs uid={uid} />
        <text
          x={360}
          y={24}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize={BTR_FONT.kicker}
          fontWeight="700"
          letterSpacing="0.12em"
          fill="rgba(26,26,26,.45)"
        >
          EVERY AUTOMATION
        </text>
        {parts.map((p, i) => {
          const x = startX + i * (cardW + gap)
          return (
            <g key={p.title}>
              <MonoCard
                x={x}
                y={cardY}
                w={cardW}
                h={cardH}
                title={p.title}
                subtitle={p.sub}
                gold={p.gold}
              />
              {i < parts.length - 1 && (
                <path
                  d={`M${x + cardW + 4},${linkY} L${x + cardW + gap - 4},${linkY}`}
                  stroke={INK}
                  strokeWidth="1.3"
                  markerEnd={`url(#${ink})`}
                  fill="none"
                />
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
      <PlateSvg viewBox="0 0 720 168" ariaLabel="The doorbell with an envelope">
        <ArrowDefs uid={uid} />
        <MonoCard x={48} y={44} w={168} h={72} title="SYSTEM A" subtitle="something happens" />
        <circle cx={300} cy={80} r={18} fill="none" stroke={GOLD_READABLE} strokeWidth="1.5" />
        <text x={300} y={84} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize={BTR_FONT.label} fontWeight="700" fill={GOLD_READABLE}>
          🔔
        </text>
        <path d="M216,80 L282,80" stroke={GOLD_READABLE} strokeWidth="1.4" markerEnd={`url(#${gold})`} fill="none" />
        <rect x={340} y={65} width={36} height={28} rx={1} fill={CREAM} stroke={INK} strokeWidth="1.2" />
        <text x={358} y={83} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize={BTR_FONT.label} fill={INK}>
          ✉
        </text>
        <MonoCard x={404} y={44} w={168} h={72} title="SYSTEM B" subtitle="receives instantly" gold />
        <text x={360} y={148} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize={BTR_FONT.body} fontWeight="700" fill={GOLD_READABLE}>
          the instant something happens
        </text>
        <g opacity="0.45">
          <circle cx={620} cy={68} r={16} fill="none" stroke={INK} strokeWidth="1" />
          <text x={620} y={72} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize={BTR_FONT.label} fill={INK}>
            ⏱
          </text>
          <line x1={605} y1={92} x2={635} y2={62} stroke={INK} strokeWidth="1.2" />
          <text x={620} y={108} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize={BTR_FONT.small} fill="rgba(26,26,26,.5)">
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
              <p className={`font-mono text-[11px] font-bold uppercase leading-[1.35] tracking-[0.08em] ${b.gold ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/55'}`}>
                {b.title}
              </p>
            </div>
            <p className={`mt-2 max-w-[120px] text-center font-sans text-[12px] ${b.gold ? 'font-medium text-[#1a1a1a]/75' : 'text-[#1a1a1a]/50'}`}>
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
                <div className="font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-[#1a1a1a]">{item.title}</div>
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
  const panels = [
    {
      title: 'THE DEMO',
      sub: 'happy path · works once',
      className: 'border border-[#1a1a1a]/20 bg-white/40',
      titleClass: 'text-[#1a1a1a]/55',
      subClass: 'text-[#1a1a1a]/50',
    },
    {
      title: 'the canyon',
      sub: 'edge cases · failures · silence',
      className: 'border border-dashed border-[#1a1a1a]/30 bg-[#E8E8E8]/55',
      titleClass: 'text-[#1a1a1a]/55',
      subClass: 'text-[#1a1a1a]/45',
    },
    {
      title: 'DEPENDABLE',
      sub: 'real world · works every night',
      className: 'border-2 border-[#1a1a1a] bg-[#FFF2EC]',
      titleClass: 'text-[#8B6914]',
      subClass: 'text-[#1a1a1a]/60',
    },
  ] as const

  return (
    <Fig fig="FIG. 03.1" caption={caption}>
      <div className="mx-auto flex max-w-[620px] flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-2">
        {panels.map((panel, i) => (
          <div key={panel.title} className="flex flex-1 items-center gap-2">
            {i > 0 ? (
              <span className="hidden shrink-0 font-mono text-[13px] text-[#1a1a1a]/25 sm:inline" aria-hidden>
                →
              </span>
            ) : null}
            <div className={`flex min-h-[88px] flex-1 flex-col justify-center px-4 py-4 ${panel.className}`}>
              <p className={`font-mono text-[12px] font-bold uppercase tracking-[0.12em] ${panel.titleClass}`}>
                {panel.title}
              </p>
              <p className={`mt-2 font-mono text-[12px] leading-relaxed ${panel.subClass}`}>{panel.sub}</p>
            </div>
          </div>
        ))}
      </div>
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
        <text x="180" y="30" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fontWeight="700" fill="rgba(26,26,26,.4)">
          ONE MEGA-FLOW
        </text>
        <path d="M60,60 L300,60 L280,180 L80,180 Z" fill="none" stroke={INK} strokeWidth="1.2" strokeDasharray="4 3" opacity="0.5" />
        <text x="180" y="120" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fill="rgba(26,26,26,.45)">
          touches everything
        </text>
        <line x1="100" y1="50" x2="260" y2="190" stroke={INK} strokeWidth="1.5" opacity="0.35" />
        <line x1="260" y1="50" x2="100" y2="190" stroke={INK} strokeWidth="1.5" opacity="0.35" />
        <text x="180" y="210" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" fill="rgba(26,26,26,.45)">
          nobody can safely change it
        </text>
        <text x="540" y="30" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fontWeight="700" fill={GOLD_READABLE}>
          FOUR SMALL FLOWS
        </text>
        {smallFlows.map((f, i) => {
          const x = 400 + (i % 2) * 130
          const y = 55 + Math.floor(i / 2) * 70
          return (
            <g key={f}>
              <MonoBox x={x} y={y} w={115} h={36} label={f} fontSize={11} gold={true} />
            </g>
          )
        })}
        <path d="M540,200 L600,200" stroke={GOLD_READABLE} strokeWidth="1.3" markerEnd={`url(#${gold})`} fill="none" />
        <text x="540" y="225" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fill={GOLD_READABLE}>
          each has one owner · one purpose
        </text>
      </PlateSvg>
    </Fig>
  )
}

export function BtrCh03FailurePath({ caption }: D) {
  const { uid, ink, gold } = useArrowIds()
  const step = { x: 280, y: 32, w: 160, h: 44 }
  const cardY = 142
  const cardH = 56
  const forkY = 104

  return (
    <Fig fig="FIG. 03.3" caption={caption}>
      <PlateSvg viewBox="0 0 720 214" ariaLabel="The failure path is the design">
        <ArrowDefs uid={uid} />
        <text x={360} y={20} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize={BTR_FONT.kicker} fontWeight="700" fill="rgba(26,26,26,.45)">
          two exits · equal weight
        </text>
        <MonoBox x={step.x} y={step.y} w={step.w} h={step.h} label="STEP" />
        <path
          d={`M360,${step.y + step.h} L360,${forkY}`}
          stroke={INK}
          strokeWidth="1.3"
          markerEnd={`url(#${ink})`}
          fill="none"
        />
        <path d={`M360,${forkY} L200,${cardY}`} stroke={INK} strokeWidth="1.3" markerEnd={`url(#${ink})`} fill="none" />
        <path d={`M360,${forkY} L520,${cardY}`} stroke={GOLD_READABLE} strokeWidth="1.5" markerEnd={`url(#${gold})`} fill="none" />
        <MonoCard x={120} y={cardY} w={160} h={cardH} title="WORKED" subtitle="continue" />
        <MonoCard x={440} y={cardY} w={160} h={cardH} title="FAILED" subtitle="retry · park · alert" gold />
      </PlateSvg>
    </Fig>
  )
}

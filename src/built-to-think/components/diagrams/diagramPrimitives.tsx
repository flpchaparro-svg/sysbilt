import { useId, type ReactNode } from 'react'
import { BtwFigure, CREAM, GOLD_READABLE, INK } from '../../../built-to-work/components/BtwFigure'

export { CREAM, GOLD_READABLE, INK }

export function Fig({ fig, caption, children }: { fig: string; caption: string; children: ReactNode }) {
  return <BtwFigure fig={fig} caption={caption}>{children}</BtwFigure>
}

export const BTT_FONT = {
  kicker: 10,
  label: 12,
  body: 10,
  small: 9,
  mono: 11,
} as const

export function MonoBox({
  x,
  y,
  w,
  h,
  label,
  gold = false,
  rx = 2,
  fontSize = BTT_FONT.label,
}: {
  x: number
  y: number
  w: number
  h: number
  label: string
  gold?: boolean
  rx?: number
  fontSize?: number
}) {
  const stroke = gold ? GOLD_READABLE : INK
  return (
    <g fontFamily="ui-monospace, Menlo, monospace" fontSize={fontSize} fontWeight="700" letterSpacing="0.06em">
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={CREAM} stroke={stroke} strokeWidth="1.4" />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fill={INK}>
        {label}
      </text>
    </g>
  )
}

/** Box with title + subtitle stacked inside — avoids tiny text floating below the plate. */
export function MonoCard({
  x,
  y,
  w,
  h,
  title,
  subtitle,
  gold = false,
}: {
  x: number
  y: number
  w: number
  h: number
  title: string
  subtitle?: string
  gold?: boolean
}) {
  const stroke = gold ? GOLD_READABLE : INK
  const titleY = subtitle ? y + 22 : y + h / 2 + 4
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={2} fill={CREAM} stroke={stroke} strokeWidth="1.4" />
      <text
        x={x + w / 2}
        y={titleY}
        textAnchor="middle"
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize={BTT_FONT.label}
        fontWeight="700"
        letterSpacing="0.06em"
        fill={gold ? GOLD_READABLE : INK}
      >
        {title}
      </text>
      {subtitle ? (
        <text
          x={x + w / 2}
          y={y + h - 12}
          textAnchor="middle"
          fontFamily="ui-monospace, Menlo, monospace"
          fontSize={BTT_FONT.body}
          fontWeight="500"
          fill="rgba(26,26,26,.65)"
        >
          {subtitle}
        </text>
      ) : null}
    </g>
  )
}

export function ArrowDefs({ uid }: { uid: string }) {
  const ink = `ink-${uid}`
  const gold = `gold-${uid}`
  return (
    <defs>
      <marker id={ink} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0,0 L9,5 L0,10 z" fill={INK} />
      </marker>
      <marker id={gold} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0,0 L9,5 L0,10 z" fill={GOLD_READABLE} />
      </marker>
    </defs>
  )
}

export function PlateSvg({
  children,
  viewBox,
  ariaLabel,
}: {
  children: ReactNode
  viewBox: string
  ariaLabel: string
}) {
  return (
    <svg viewBox={viewBox} className="block h-auto w-full" role="img" aria-label={ariaLabel}>
      {children}
    </svg>
  )
}

export function useArrowIds() {
  const uid = useId().replace(/:/g, '')
  return { uid, ink: `ink-${uid}`, gold: `gold-${uid}` }
}

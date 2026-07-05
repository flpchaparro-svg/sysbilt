import { useId, type ReactNode } from 'react'
import { BtwFigure, CREAM, GOLD_READABLE, INK } from '../../../built-to-work/components/BtwFigure'

export { CREAM, GOLD_READABLE, INK }

export function Fig({ fig, caption, children }: { fig: string; caption: string; children: ReactNode }) {
  return <BtwFigure fig={fig} caption={caption}>{children}</BtwFigure>
}

export function MonoBox({
  x,
  y,
  w,
  h,
  label,
  gold = false,
  rx = 2,
  fontSize = 11,
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
    <g fontFamily="ui-monospace, Menlo, monospace" fontSize={fontSize} fontWeight="700" letterSpacing="1">
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={CREAM} stroke={stroke} strokeWidth="1.4" />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fill={INK}>
        {label}
      </text>
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

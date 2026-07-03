import type { ReactNode } from 'react'
import { BTW_TOKENS } from '../tokens'

type Props = {
  fig: string
  caption: string
  children: ReactNode
  className?: string
}

/** Standard figure plate — template 06: tinted inner frame + mono FIG tag + Lora italic caption. */
export function BtwFigure({ fig, caption, children, className = '' }: Props) {
  return (
    <figure className={`btw-diagram my-[clamp(44px,6vw,64px)] ${className}`}>
      <div
        className="p-[clamp(20px,3vw,32px)]"
        style={{
          backgroundColor: BTW_TOKENS.creamLight,
          border: '1px solid rgba(26,26,26,0.14)',
        }}
      >
        {children}
      </div>
      <figcaption className="mt-[18px] flex items-baseline gap-3.5">
        <span
          className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ color: BTW_TOKENS.goldOnCream }}
        >
          {fig}
        </span>
        <span
          className="font-serif italic leading-[1.4]"
          style={{
            fontSize: 'clamp(15px, 1.7vw, 18px)',
            color: 'rgba(26,26,26,0.78)',
          }}
        >
          {caption}
        </span>
      </figcaption>
    </figure>
  )
}

export const INK = BTW_TOKENS.ink
export const GOLD = BTW_TOKENS.gold
export const GOLD_READABLE = BTW_TOKENS.goldOnCream
export const GOLD_ON_DARK = BTW_TOKENS.goldOnDark
export const CREAM = BTW_TOKENS.cream
export const CREAM_WARM = BTW_TOKENS.creamLight

import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

/** Soft scroll-in — uses useInView so above-the-fold content never stays stuck invisible. */
export function Reveal({
  children,
  className,
  style,
  delay = 0,
  y = 16,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  delay?: number
  y?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.12, margin: '0px 0px -8px 0px'})
  const reduce = useReducedMotion()
  const show = reduce || inView

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={reduce ? false : {opacity: 0, y}}
      animate={show ? {opacity: 1, y: 0} : {opacity: 0, y}}
      transition={{duration: 0.55, delay: show ? delay : 0, ease: EASE}}
    >
      {children}
    </motion.div>
  )
}

/** Staggered list items on scroll (pain lines, etc.). */
export function RevealList({
  children,
  className,
  stagger = 0.12,
}: {
  children: React.ReactNode
  className?: string
  stagger?: number
}) {
  const ref = useRef<HTMLUListElement>(null)
  const inView = useInView(ref, {once: true, margin: '-40px'})
  const reduce = useReducedMotion()
  const show = reduce || inView

  return (
    <motion.ul
      ref={ref}
      className={className}
      initial={reduce ? false : 'hidden'}
      animate={show ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {staggerChildren: reduce ? 0 : stagger, delayChildren: 0.06},
        },
      }}
    >
      {React.Children.map(children, (child) => {
        if (
          !React.isValidElement<{
            className?: string
            style?: React.CSSProperties
            children?: React.ReactNode
          }>(child)
        ) {
          return child
        }
        return (
          <motion.li
            className={child.props.className}
            style={child.props.style}
            variants={{
              hidden: reduce ? {opacity: 1, y: 0} : {opacity: 0, y: 14},
              visible: {
                opacity: 1,
                y: 0,
                transition: {duration: 0.45, ease: EASE},
              },
            }}
          >
            {child.props.children}
          </motion.li>
        )
      })}
    </motion.ul>
  )
}

import React from 'react'
import {
  BookingStackVisual,
  MissedStackVisual,
  PackChipsVisual,
  PackNotInVisual,
  PackPathVisual,
  PackPriceVisual,
} from './bundle-motion-kit'

export const CALL_AND_BOOK_BENEFIT_VISUALS = [
  (p: {reduce: boolean | null}) => (
    <PackPathVisual {...p} chrome="Both ways in" steps={['Book now or ring', 'Miss caught by text']} />
  ),
  (p: {reduce: boolean | null}) => (
    <PackChipsVisual {...p} chrome="One handover" chips={['Calendar', 'Phone']} />
  ),
  (p: {reduce: boolean | null}) => <PackPriceVisual {...p} apart="$2,250" pack="$1,800 · one window" />,
  (p: {reduce: boolean | null}) => (
    <PackNotInVisual {...p} inPack="Book now plus missed-call SMS" later="No-Show Rescue later" />
  ),
]

export const CALL_AND_BOOK_STACK_VISUALS = [BookingStackVisual, MissedStackVisual]

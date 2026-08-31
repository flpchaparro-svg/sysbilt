import React from 'react'
import {
  BookingStackVisual,
  MissedStackVisual,
  NoshowStackVisual,
  PackChipsVisual,
  PackNotInVisual,
  PackPathVisual,
  PackPriceVisual,
} from './bundle-motion-kit'

export const FULL_DIARY_BENEFIT_VISUALS = [
  (p: {reduce: boolean | null}) => (
    <PackPathVisual {...p} chrome="Both ways in" steps={['Book now or ring', 'Miss caught by text']} />
  ),
  (p: {reduce: boolean | null}) => (
    <PackChipsVisual {...p} chrome="Hold the slot" chips={['Remind', 'Rebook', 'Alert']} />
  ),
  (p: {reduce: boolean | null}) => <PackPriceVisual {...p} apart="$3,000" pack="$2,400 · one window" />,
  (p: {reduce: boolean | null}) => (
    <PackNotInVisual {...p} inPack="Booking, missed-call, no-show" later="Profile Fix later" />
  ),
]

export const FULL_DIARY_STACK_VISUALS = [BookingStackVisual, MissedStackVisual, NoshowStackVisual]

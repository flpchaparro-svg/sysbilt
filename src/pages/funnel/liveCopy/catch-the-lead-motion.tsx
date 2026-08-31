import React from 'react'
import {
  MissedStackVisual,
  PackChipsVisual,
  PackNotInVisual,
  PackPathVisual,
  PackPriceVisual,
  ProfileStackVisual,
  ReviewsStackVisual,
} from './bundle-motion-kit'

export const CATCH_THE_LEAD_BENEFIT_VISUALS = [
  (p: {reduce: boolean | null}) => (
    <PackChipsVisual {...p} chrome="One handover" chips={['Maps', 'Reviews', 'Phone']} />
  ),
  (p: {reduce: boolean | null}) => (
    <PackPathVisual {...p} chrome="They feed each other" steps={['Find on Maps', 'Trust, then the miss is caught']} />
  ),
  (p: {reduce: boolean | null}) => <PackPriceVisual {...p} apart="$2,450" pack="$1,950 · one window" />,
  (p: {reduce: boolean | null}) => (
    <PackNotInVisual {...p} inPack="Profile, reviews, missed-call SMS" later="Booking System later" />
  ),
]

export const CATCH_THE_LEAD_STACK_VISUALS = [
  ProfileStackVisual,
  ReviewsStackVisual,
  MissedStackVisual,
]

import React from 'react'
import {
  PackChipsVisual,
  PackNotInVisual,
  PackPathVisual,
  PackPriceVisual,
  ProfileStackVisual,
  ReviewsStackVisual,
} from './bundle-motion-kit'

export const MAPS_TRUST_BENEFIT_VISUALS = [
  (p: {reduce: boolean | null}) => (
    <PackPathVisual {...p} chrome="Maps trust" steps={['Listing finished', 'Ask keeps firing']} />
  ),
  (p: {reduce: boolean | null}) => (
    <PackChipsVisual {...p} chrome="One handover" chips={['Maps', 'Reviews']} />
  ),
  (p: {reduce: boolean | null}) => <PackPriceVisual {...p} apart="$1,700" pack="$1,350 · one window" />,
  (p: {reduce: boolean | null}) => (
    <PackNotInVisual {...p} inPack="Profile Fix plus Review Engine" later="Posting or Booking later" />
  ),
]

export const MAPS_TRUST_STACK_VISUALS = [ProfileStackVisual, ReviewsStackVisual]

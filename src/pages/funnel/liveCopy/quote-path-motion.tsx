import React from 'react'
import {
  PackChipsVisual,
  PackNotInVisual,
  PackPathVisual,
  PackPriceVisual,
  QuoteCaptureStackVisual,
  QuoteFollowupStackVisual,
} from './bundle-motion-kit'

export const QUOTE_PATH_BENEFIT_VISUALS = [
  (p: {reduce: boolean | null}) => (
    <PackPathVisual {...p} chrome="Quote path" steps={['Priced from your card', 'Followed up, then stopped']} />
  ),
  (p: {reduce: boolean | null}) => (
    <PackChipsVisual {...p} chrome="One handover" chips={['Wizard', 'Sequence']} />
  ),
  (p: {reduce: boolean | null}) => <PackPriceVisual {...p} apart="$4,250" pack="$3,400 · one window" />,
  (p: {reduce: boolean | null}) => (
    <PackNotInVisual {...p} inPack="Capture plus follow-up" later="AI Concierge optional" />
  ),
]

export const QUOTE_PATH_STACK_VISUALS = [QuoteCaptureStackVisual, QuoteFollowupStackVisual]

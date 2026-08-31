import React from 'react'
import {
  OnpageStackVisual,
  PackChipsVisual,
  PackNotInVisual,
  PackPathVisual,
  PackPriceVisual,
  SchemaStackVisual,
  SearchFixStackVisual,
} from './bundle-motion-kit'

export const GET_FOUND_FULL_BENEFIT_VISUALS = [
  (p: {reduce: boolean | null}) => (
    <PackPathVisual {...p} chrome="Findability" steps={['Indexed', 'Written and answered']} />
  ),
  (p: {reduce: boolean | null}) => (
    <PackChipsVisual {...p} chrome="One handover" chips={['Index', 'On-page', 'FAQ']} />
  ),
  (p: {reduce: boolean | null}) => <PackPriceVisual {...p} apart="$4,500" pack="$3,600 · one window" />,
  (p: {reduce: boolean | null}) => (
    <PackNotInVisual {...p} inPack="Search, on-page, schema" later="Conversion Pass later" />
  ),
]

export const GET_FOUND_FULL_STACK_VISUALS = [
  SearchFixStackVisual,
  OnpageStackVisual,
  SchemaStackVisual,
]

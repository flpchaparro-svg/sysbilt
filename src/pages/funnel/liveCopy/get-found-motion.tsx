import React from 'react'
import {
  PackChipsVisual,
  PackNotInVisual,
  PackPathVisual,
  PackPriceVisual,
  SchemaStackVisual,
  SearchFixStackVisual,
} from './bundle-motion-kit'

export const GET_FOUND_BENEFIT_VISUALS = [
  (p: {reduce: boolean | null}) => (
    <PackPathVisual {...p} chrome="Findability" steps={['Blocks cleared', 'Answers marked up']} />
  ),
  (p: {reduce: boolean | null}) => (
    <PackChipsVisual {...p} chrome="One handover" chips={['Index', 'FAQ']} />
  ),
  (p: {reduce: boolean | null}) => <PackPriceVisual {...p} apart="$2,600" pack="$2,100 · one window" />,
  (p: {reduce: boolean | null}) => (
    <PackNotInVisual {...p} inPack="Search Fix plus Schema and FAQ" later="On-Page Search later" />
  ),
]

export const GET_FOUND_STACK_VISUALS = [SearchFixStackVisual, SchemaStackVisual]

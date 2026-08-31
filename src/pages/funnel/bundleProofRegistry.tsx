import type {ComponentType} from 'react'
import {FOUND_BOOKED_STRIPE_URL} from '../../constants/foundBookedStripe'
import {CATCH_THE_LEAD_STRIPE_URL} from '../../constants/catchTheLeadStripe'
import {BUNDLE_FRONT_DOOR_STRIPE_URL} from '../../constants/bundleFrontDoorStripe'
import {BUNDLE_SPEED_NEXT_STRIPE_URL} from '../../constants/bundleSpeedNextStripe'
import {CALL_AND_BOOK_STRIPE_URL} from '../../constants/callAndBookStripe'
import {MAPS_TRUST_STRIPE_URL} from '../../constants/mapsTrustStripe'
import {FULL_DIARY_STRIPE_URL} from '../../constants/fullDiaryStripe'
import {GET_FOUND_STRIPE_URL} from '../../constants/getFoundStripe'
import {GET_FOUND_FULL_STRIPE_URL} from '../../constants/getFoundFullStripe'
import {QUOTE_PATH_STRIPE_URL} from '../../constants/quotePathStripe'
import {
  FoundBookedDeliverableMock,
  FoundBookedEvidenceCard,
  FoundBookedLeakPair,
  FoundBookedPainCards,
} from './FoundBookedProof'
import {
  CallAndBookDeliverableMock,
  CallAndBookEvidenceCard,
  CallAndBookLeakPair,
  CallAndBookPainCards,
  CatchTheLeadDeliverableMock,
  CatchTheLeadEvidenceCard,
  CatchTheLeadLeakPair,
  CatchTheLeadPainCards,
  FullDiaryDeliverableMock,
  FullDiaryEvidenceCard,
  FullDiaryLeakPair,
  FullDiaryPainCards,
  GetFoundDeliverableMock,
  GetFoundEvidenceCard,
  GetFoundFullDeliverableMock,
  GetFoundFullEvidenceCard,
  GetFoundFullLeakPair,
  GetFoundFullPainCards,
  GetFoundLeakPair,
  GetFoundPainCards,
  MapsTrustDeliverableMock,
  MapsTrustEvidenceCard,
  MapsTrustLeakPair,
  MapsTrustPainCards,
  QuotePathDeliverableMock,
  QuotePathEvidenceCard,
  QuotePathLeakPair,
  QuotePathPainCards,
} from './bundleCatalogueProof'
import {BundleFrontDoorDeliverableMock} from './BundleFrontDoorDeliverableMock'
import {BundleFrontDoorEvidenceCard} from './BundleFrontDoorEvidenceCard'
import {BundleFrontDoorLeakPair} from './BundleFrontDoorLeakPair'
import {BundleFrontDoorPainCards} from './BundleFrontDoorPainCards'
import {BundleSpeedNextDeliverableMock} from './BundleSpeedNextDeliverableMock'
import {BundleSpeedNextEvidenceCard} from './BundleSpeedNextEvidenceCard'
import {BundleSpeedNextLeakPair} from './BundleSpeedNextLeakPair'
import {BundleSpeedNextPainCards} from './BundleSpeedNextPainCards'

export type BundleProofUi = {
  motionVariant:
    | 'found-booked'
    | 'catch-the-lead'
    | 'bundle-front-door'
    | 'bundle-speed-next'
    | 'call-and-book'
    | 'maps-trust'
    | 'full-diary'
    | 'get-found'
    | 'get-found-full'
    | 'quote-path'
  stripeUrl: string
  Evidence: ComponentType<{business?: string | null}>
  Leak: ComponentType
  Pain: ComponentType
  Deliverable: ComponentType
}

const REGISTRY: Record<string, BundleProofUi> = {}

export function registerBundleProof(slug: string, ui: BundleProofUi) {
  REGISTRY[slug] = ui
}

export function getBundleProof(proofKind: string | undefined): BundleProofUi | undefined {
  if (!proofKind) return undefined
  return REGISTRY[proofKind]
}

registerBundleProof('found-booked', {
  motionVariant: 'found-booked',
  stripeUrl: FOUND_BOOKED_STRIPE_URL,
  Evidence: FoundBookedEvidenceCard,
  Leak: FoundBookedLeakPair,
  Pain: FoundBookedPainCards,
  Deliverable: FoundBookedDeliverableMock,
})

registerBundleProof('catch-the-lead', {
  motionVariant: 'catch-the-lead',
  stripeUrl: CATCH_THE_LEAD_STRIPE_URL,
  Evidence: CatchTheLeadEvidenceCard,
  Leak: CatchTheLeadLeakPair,
  Pain: CatchTheLeadPainCards,
  Deliverable: CatchTheLeadDeliverableMock,
})

registerBundleProof('bundle-front-door', {
  motionVariant: 'bundle-front-door',
  stripeUrl: BUNDLE_FRONT_DOOR_STRIPE_URL,
  Evidence: BundleFrontDoorEvidenceCard,
  Leak: BundleFrontDoorLeakPair,
  Pain: BundleFrontDoorPainCards,
  Deliverable: BundleFrontDoorDeliverableMock,
})

registerBundleProof('bundle-speed-next', {
  motionVariant: 'bundle-speed-next',
  stripeUrl: BUNDLE_SPEED_NEXT_STRIPE_URL,
  Evidence: BundleSpeedNextEvidenceCard,
  Leak: BundleSpeedNextLeakPair,
  Pain: BundleSpeedNextPainCards,
  Deliverable: BundleSpeedNextDeliverableMock,
})

registerBundleProof('call-and-book', {
  motionVariant: 'call-and-book',
  stripeUrl: CALL_AND_BOOK_STRIPE_URL,
  Evidence: CallAndBookEvidenceCard,
  Leak: CallAndBookLeakPair,
  Pain: CallAndBookPainCards,
  Deliverable: CallAndBookDeliverableMock,
})

registerBundleProof('maps-trust', {
  motionVariant: 'maps-trust',
  stripeUrl: MAPS_TRUST_STRIPE_URL,
  Evidence: MapsTrustEvidenceCard,
  Leak: MapsTrustLeakPair,
  Pain: MapsTrustPainCards,
  Deliverable: MapsTrustDeliverableMock,
})

registerBundleProof('full-diary', {
  motionVariant: 'full-diary',
  stripeUrl: FULL_DIARY_STRIPE_URL,
  Evidence: FullDiaryEvidenceCard,
  Leak: FullDiaryLeakPair,
  Pain: FullDiaryPainCards,
  Deliverable: FullDiaryDeliverableMock,
})

registerBundleProof('get-found', {
  motionVariant: 'get-found',
  stripeUrl: GET_FOUND_STRIPE_URL,
  Evidence: GetFoundEvidenceCard,
  Leak: GetFoundLeakPair,
  Pain: GetFoundPainCards,
  Deliverable: GetFoundDeliverableMock,
})

registerBundleProof('get-found-full', {
  motionVariant: 'get-found-full',
  stripeUrl: GET_FOUND_FULL_STRIPE_URL,
  Evidence: GetFoundFullEvidenceCard,
  Leak: GetFoundFullLeakPair,
  Pain: GetFoundFullPainCards,
  Deliverable: GetFoundFullDeliverableMock,
})

registerBundleProof('quote-path', {
  motionVariant: 'quote-path',
  stripeUrl: QUOTE_PATH_STRIPE_URL,
  Evidence: QuotePathEvidenceCard,
  Leak: QuotePathLeakPair,
  Pain: QuotePathPainCards,
  Deliverable: QuotePathDeliverableMock,
})

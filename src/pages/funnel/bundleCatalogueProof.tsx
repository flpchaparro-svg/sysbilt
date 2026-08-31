import React from 'react'
import {
  BundleDeliverableMock,
  BundleEvidencePath,
  BundleLeakPair,
  BundlePainCards,
} from './bundleUiKit'

export function CatchTheLeadEvidenceCard({business}: {business?: string | null}) {
  return (
    <BundleEvidencePath
      business={business}
      badge="Catch the lead"
      doors={[
        {label: 'Find', detail: 'Profile ready'},
        {label: 'Trust', detail: 'Reviews habit'},
        {label: 'Catch', detail: 'Missed call text'},
      ]}
    />
  )
}

export function CatchTheLeadLeakPair() {
  return (
    <BundleLeakPair
      leftTitle="Three gaps"
      leftFoot="The enquiry never lands"
      locked={['Listing thin', 'Reviews stalled', 'Ring-out silence']}
      rightTitle="Catch the lead"
      rightFoot="Seen · Trusted · Texted"
      open={['Google Profile Fix', 'Review Engine', 'Missed-Call Text-Back']}
    />
  )
}

export function CatchTheLeadPainCards() {
  return (
    <BundlePainCards
      cards={[
        {title: 'Profile messy', rows: ['Wrong hours', 'Old photos', 'Weak category'], stamp: 'Off'},
        {title: 'Nobody asks', rows: ['After the job', 'Staff forgot', 'No QR'], stamp: 'Quiet'},
        {title: 'Missed calls go quiet', rows: ['Lunch ring-out', 'After hours', 'No SMS'], stamp: 'Gone'},
        {title: 'Three projects never start', rows: ['Profile', 'Reviews', 'Missed-call'], stamp: 'Queued'},
      ]}
    />
  )
}

export function CatchTheLeadDeliverableMock() {
  return (
    <BundleDeliverableMock
      title="Catch the lead"
      steps={[
        {label: 'Google Profile Fix', detail: 'Listing overhauled'},
        {label: 'Review Engine', detail: 'Ask path live'},
        {label: 'Missed-Call Text-Back', detail: 'Live miss proved'},
        {label: 'Handoff', detail: 'Who owns asks and calls'},
      ]}
    />
  )
}

export function CallAndBookEvidenceCard({business}: {business?: string | null}) {
  return (
    <BundleEvidencePath
      business={business}
      badge="Call and book"
      doors={[
        {label: 'Book', detail: 'Book now live'},
        {label: 'Catch', detail: 'Missed call text'},
      ]}
    />
  )
}

export function CallAndBookLeakPair() {
  return (
    <BundleLeakPair
      leftTitle="Two gaps"
      leftFoot="The booking never lands"
      locked={['Still "call us"', 'Ring-out silence']}
      rightTitle="Call and book"
      rightFoot="Booked · Texted"
      open={['Booking System', 'Missed-Call Text-Back']}
    />
  )
}

export function CallAndBookPainCards() {
  return (
    <BundlePainCards
      cards={[
        {title: 'Booking is still call us', rows: ['Site CTA', 'Maps CTA', 'No calendar wire'], stamp: 'Call'},
        {title: 'Missed calls go quiet', rows: ['Lunch ring-out', 'After hours', 'No SMS'], stamp: 'Gone'},
        {title: 'Two projects never start', rows: ['Booking', 'Missed-call'], stamp: 'Queued'},
        {title: 'After hours is lost', rows: ['Decides at 10pm', 'Must remember tomorrow'], stamp: 'Gone'},
      ]}
    />
  )
}

export function CallAndBookDeliverableMock() {
  return (
    <BundleDeliverableMock
      title="Call and book"
      steps={[
        {label: 'Booking System', detail: 'Calendar wired'},
        {label: 'Missed-Call Text-Back', detail: 'Live miss proved'},
        {label: 'Book now tested', detail: 'End-to-end live'},
      ]}
    />
  )
}

export function MapsTrustEvidenceCard({business}: {business?: string | null}) {
  return (
    <BundleEvidencePath
      business={business}
      badge="Maps trust"
      doors={[
        {label: 'Find', detail: 'Profile ready'},
        {label: 'Trust', detail: 'Reviews habit'},
      ]}
    />
  )
}

export function MapsTrustLeakPair() {
  return (
    <BundleLeakPair
      leftTitle="Two gaps"
      leftFoot="They tap next door"
      locked={['Listing thin', 'Reviews stalled']}
      rightTitle="Maps trust"
      rightFoot="Seen · Trusted"
      open={['Google Profile Fix', 'Review Engine']}
    />
  )
}

export function MapsTrustPainCards() {
  return (
    <BundlePainCards
      cards={[
        {title: 'Profile messy', rows: ['Wrong hours', 'Old photos', 'Weak category'], stamp: 'Off'},
        {title: 'Nobody asks', rows: ['After the job', 'Staff forgot', 'No QR'], stamp: 'Quiet'},
        {title: 'Two projects never start', rows: ['Profile', 'Reviews'], stamp: 'Queued'},
        {title: 'Looks unrun', rows: ['Last review 2022', 'Hours wrong'], stamp: 'Thin'},
      ]}
    />
  )
}

export function MapsTrustDeliverableMock() {
  return (
    <BundleDeliverableMock
      title="Maps trust"
      steps={[
        {label: 'Google Profile Fix', detail: 'Listing overhauled'},
        {label: 'Review Engine', detail: 'Ask path live'},
        {label: 'Handoff', detail: 'Who owns the monthly check'},
      ]}
    />
  )
}

export function FullDiaryEvidenceCard({business}: {business?: string | null}) {
  return (
    <BundleEvidencePath
      business={business}
      badge="Full diary"
      doors={[
        {label: 'Book', detail: 'Book now live'},
        {label: 'Catch', detail: 'Missed call text'},
        {label: 'Hold', detail: 'No-show rescue'},
      ]}
    />
  )
}

export function FullDiaryLeakPair() {
  return (
    <BundleLeakPair
      leftTitle="Three gaps"
      leftFoot="The week stays thin"
      locked={['Still "call us"', 'Ring-out silence', 'Empty slots']}
      rightTitle="Full diary"
      rightFoot="Booked · Texted · Held"
      open={['Booking System', 'Missed-Call Text-Back', 'No-Show Rescue']}
    />
  )
}

export function FullDiaryPainCards() {
  return (
    <BundlePainCards
      cards={[
        {title: 'Booking is still call us', rows: ['Site CTA', 'Maps CTA', 'No calendar wire'], stamp: 'Call'},
        {title: 'Missed calls go quiet', rows: ['Lunch ring-out', 'After hours', 'No SMS'], stamp: 'Gone'},
        {title: 'Slots go empty', rows: ['No reminder', 'No rebook', 'Late gap'], stamp: 'Hole'},
        {title: 'Three projects never start', rows: ['Booking', 'Missed-call', 'No-show'], stamp: 'Queued'},
      ]}
    />
  )
}

export function FullDiaryDeliverableMock() {
  return (
    <BundleDeliverableMock
      title="Full diary"
      steps={[
        {label: 'Booking System', detail: 'Calendar wired'},
        {label: 'Missed-Call Text-Back', detail: 'Live miss proved'},
        {label: 'No-Show Rescue', detail: 'Dummy booking proved'},
        {label: 'Book now tested', detail: 'End-to-end live'},
      ]}
    />
  )
}

export function GetFoundEvidenceCard({business}: {business?: string | null}) {
  return (
    <BundleEvidencePath
      business={business}
      badge="Get found"
      doors={[
        {label: 'Index', detail: 'Blocks cleared'},
        {label: 'Answer', detail: 'FAQ marked up'},
      ]}
    />
  )
}

export function GetFoundLeakPair() {
  return (
    <BundleLeakPair
      leftTitle="Two gaps"
      leftFoot="Search skips you"
      locked={['Pages blocked', 'No answers']}
      rightTitle="Get found"
      rightFoot="Indexed · Citeable"
      open={['Search Visibility Fix', 'Schema and FAQ Pack']}
    />
  )
}

export function GetFoundPainCards() {
  return (
    <BundlePainCards
      cards={[
        {title: 'Pages never appear', rows: ['noindex', 'Robots', 'Broken canonical'], stamp: 'Blocked'},
        {title: 'Nothing to cite', rows: ['No FAQ', 'No markup', 'Awkward questions skipped'], stamp: 'Blank'},
        {title: 'Two projects never start', rows: ['Search Fix', 'Schema'], stamp: 'Queued'},
        {title: 'You cannot tell which leak', rows: ['Technical', 'Words'], stamp: 'Guess'},
      ]}
    />
  )
}

export function GetFoundDeliverableMock() {
  return (
    <BundleDeliverableMock
      title="Get found"
      steps={[
        {label: 'Search Visibility Fix', detail: 'Crawl blocks cleared'},
        {label: 'Schema and FAQ Pack', detail: 'Answers marked up'},
        {label: '30-day watch', detail: 'Recrawl monitored'},
      ]}
    />
  )
}

export function GetFoundFullEvidenceCard({business}: {business?: string | null}) {
  return (
    <BundleEvidencePath
      business={business}
      badge="Get found (full)"
      doors={[
        {label: 'Index', detail: 'Blocks cleared'},
        {label: 'Write', detail: 'On-page done'},
        {label: 'Answer', detail: 'FAQ marked up'},
      ]}
    />
  )
}

export function GetFoundFullLeakPair() {
  return (
    <BundleLeakPair
      leftTitle="Three gaps"
      leftFoot="Search still skips you"
      locked={['Pages blocked', 'Thin titles', 'No answers']}
      rightTitle="Get found (full)"
      rightFoot="Indexed · Written · Citeable"
      open={['Search Visibility Fix', 'On-Page Search Pack', 'Schema and FAQ Pack']}
    />
  )
}

export function GetFoundFullPainCards() {
  return (
    <BundlePainCards
      cards={[
        {title: 'Pages never appear', rows: ['noindex', 'Robots', 'Broken canonical'], stamp: 'Blocked'},
        {title: 'Titles say nothing', rows: ['Home', 'Services', 'Thin copy'], stamp: 'Weak'},
        {title: 'Nothing to cite', rows: ['No FAQ', 'No markup'], stamp: 'Blank'},
        {title: 'Three projects never start', rows: ['Search', 'On-page', 'Schema'], stamp: 'Queued'},
      ]}
    />
  )
}

export function GetFoundFullDeliverableMock() {
  return (
    <BundleDeliverableMock
      title="Get found (full)"
      steps={[
        {label: 'Search Visibility Fix', detail: 'Crawl blocks cleared'},
        {label: 'On-Page Search Pack', detail: 'Up to eight pages'},
        {label: 'Schema and FAQ Pack', detail: 'Answers marked up'},
        {label: '30-day watch', detail: 'Recrawl monitored'},
      ]}
    />
  )
}

export function QuotePathEvidenceCard({business}: {business?: string | null}) {
  return (
    <BundleEvidencePath
      business={business}
      badge="Quote path"
      doors={[
        {label: 'Price', detail: 'Wizard on your card'},
        {label: 'Chase', detail: 'Follow-up running'},
      ]}
    />
  )
}

export function QuotePathLeakPair() {
  return (
    <BundleLeakPair
      leftTitle="Two gaps"
      leftFoot="The job never lands"
      locked={['Blank form', 'Quote sits quiet']}
      rightTitle="Quote path"
      rightFoot="Priced · Chased"
      open={['Quote Capture', 'Quote Follow-Up Autopilot']}
    />
  )
}

export function QuotePathPainCards() {
  return (
    <BundlePainCards
      cards={[
        {title: 'The form cannot price', rows: ['Blank box', 'No rate card', 'No PDF'], stamp: 'Stuck'},
        {title: 'Nobody chases', rows: ['Inbox pile', 'Forgot Thursday', 'No stop rule'], stamp: 'Quiet'},
        {title: 'Two projects never start', rows: ['Capture', 'Follow-up'], stamp: 'Queued'},
        {title: 'The job goes next door', rows: ['Asked, then silence'], stamp: 'Lost'},
      ]}
    />
  )
}

export function QuotePathDeliverableMock() {
  return (
    <BundleDeliverableMock
      title="Quote path"
      steps={[
        {label: 'Quote Capture', detail: 'Wizard live on your card'},
        {label: 'Quote Follow-Up Autopilot', detail: 'Sequence tested'},
        {label: 'Live quote', detail: 'Proved with you watching'},
      ]}
    />
  )
}

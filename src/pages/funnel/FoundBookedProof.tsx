import React from 'react'
import {
  BundleDeliverableMock,
  BundleEvidencePath,
  BundleLeakPair,
  BundlePainCards,
} from './bundleUiKit'

export function FoundBookedEvidenceCard({business}: {business?: string | null}) {
  return (
    <BundleEvidencePath
      business={business}
      badge="Found and booked"
      doors={[
        {label: 'Find', detail: 'Profile ready'},
        {label: 'Book', detail: 'Book now live'},
        {label: 'Catch', detail: 'Missed call text'},
      ]}
    />
  )
}

export function FoundBookedLeakPair() {
  return (
    <BundleLeakPair
      leftTitle="Three gaps"
      leftFoot="The enquiry never lands"
      locked={['Listing thin', 'Still "call us"', 'Ring-out silence']}
      rightTitle="Found and booked"
      rightFoot="Seen · Booked · Texted"
      open={['Google Profile Fix', 'Booking System', 'Missed-Call Text-Back']}
    />
  )
}

export function FoundBookedPainCards() {
  return (
    <BundlePainCards
      cards={[
        {title: 'Profile messy', rows: ['Wrong hours', 'Old photos', 'Weak category'], stamp: 'Off'},
        {title: 'Booking is still call us', rows: ['Site CTA', 'Maps CTA', 'No calendar wire'], stamp: 'Call'},
        {title: 'Missed calls go quiet', rows: ['Lunch ring-out', 'After hours', 'No SMS'], stamp: 'Gone'},
        {
          title: 'Three projects never start',
          rows: ['Profile', 'Booking', 'Missed-call'],
          stamp: 'Queued',
        },
      ]}
    />
  )
}

export function FoundBookedDeliverableMock() {
  return (
    <BundleDeliverableMock
      title="Found and booked"
      steps={[
        {label: 'Google Profile Fix', detail: 'Listing overhauled'},
        {label: 'Booking System', detail: 'Calendar wired'},
        {label: 'Missed-Call Text-Back', detail: 'Live miss proved'},
        {label: 'Book now tested', detail: 'End-to-end live'},
      ]}
    />
  )
}

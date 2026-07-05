import type { FC } from 'react'
import {
  BtsCh01TwoReaders,
  BtsCh01MarketplaceOwned,
  BtsCh02KeysArmour,
  BtsCh02PaymentHandoff,
  BtsCh02CatalogueAsset,
  BtsCh03Anatomy,
  BtsCh03TwoReaders,
  BtsCh03Words,
} from './btsCh01-03'
import {
  BtsCh04PageJobs,
  BtsCh04CheckoutBleed,
  BtsCh05FourWays,
  BtsCh05JourneyMap,
  BtsCh05CartRecovery,
  BtsCh05BackInStock,
  BtsCh06OperatingRhythm,
  BtsCh06OneStockTruth,
  BtsCh07WhatRunsUnderneath,
  BtsCh07ProductProblem,
  BtsCh07HonestPrice,
  BtsCh07OneSecondPaying,
  BtsCh08ThreeStages,
  BtsCh08RankedCitedTransacted,
  BtsCh08FeedIsStore,
} from './btsCh04-08'
import {
  BtsCh09Hub,
  BtsCh09OneOrder,
  BtsCh09TwoBuyers,
  BtsCh09ThreeStrangers,
  BtsCh10RentedOwned,
  BtsCh10OneHubDoorways,
  BtsCh11MethodLoop,
  BtsCh11FourChecks,
} from './btsCh09-11'

type DiagramProps = { caption: string }

/** All Built to Sell diagram IDs → components (Stage 6 registry). */
export const BTS_DIAGRAMS: Record<string, FC<DiagramProps>> = {
  'bts-ch01-two-readers': BtsCh01TwoReaders,
  'bts-ch01-marketplace-owned': BtsCh01MarketplaceOwned,
  'bts-ch02-keys-armour': BtsCh02KeysArmour,
  'bts-ch02-payment-handoff': BtsCh02PaymentHandoff,
  'bts-ch02-catalogue-asset': BtsCh02CatalogueAsset,
  'bts-ch03-anatomy': BtsCh03Anatomy,
  'bts-ch03-two-readers': BtsCh03TwoReaders,
  'bts-ch03-words': BtsCh03Words,
  'bts-ch04-page-jobs': BtsCh04PageJobs,
  'bts-ch04-checkout-bleed': BtsCh04CheckoutBleed,
  'bts-ch05-four-ways': BtsCh05FourWays,
  'bts-ch05-journey-map': BtsCh05JourneyMap,
  'bts-ch05-cart-recovery': BtsCh05CartRecovery,
  'bts-ch05-back-in-stock': BtsCh05BackInStock,
  'bts-ch06-operating-rhythm': BtsCh06OperatingRhythm,
  'bts-ch06-one-stock-truth': BtsCh06OneStockTruth,
  'bts-ch07-what-runs-underneath': BtsCh07WhatRunsUnderneath,
  'bts-ch07-product-problem': BtsCh07ProductProblem,
  'bts-ch07-honest-price': BtsCh07HonestPrice,
  'bts-ch07-one-second-paying': BtsCh07OneSecondPaying,
  'bts-ch08-three-stages': BtsCh08ThreeStages,
  'bts-ch08-ranked-cited-transacted': BtsCh08RankedCitedTransacted,
  'bts-ch08-feed-is-store': BtsCh08FeedIsStore,
  'bts-ch09-hub': BtsCh09Hub,
  'bts-ch09-one-order': BtsCh09OneOrder,
  'bts-ch09-two-buyers': BtsCh09TwoBuyers,
  'bts-ch09-three-strangers': BtsCh09ThreeStrangers,
  'bts-ch10-rented-owned': BtsCh10RentedOwned,
  'bts-ch10-one-hub-doorways': BtsCh10OneHubDoorways,
  'bts-ch11-method-loop': BtsCh11MethodLoop,
  'bts-ch11-four-checks': BtsCh11FourChecks,
}

export const BTS_DIAGRAM_IDS = Object.keys(BTS_DIAGRAMS)

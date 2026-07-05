import type { FC } from 'react'
import { Fig, MonoBox, PlateSvg } from './diagramPrimitives'

type D = { caption: string }

function btcPlaceholder(fig: string, ariaLabel: string, labels: string[]): FC<D> {
  return function BtcPlaceholder({ caption }: D) {
    const count = labels.length
    const gap = Math.max(24, (720 - count * 140) / (count + 1))
    const boxW = Math.min(160, (720 - gap * (count + 1)) / count)
    const boxH = 56
    const boxY = 72

    return (
      <Fig fig={fig} caption={caption}>
        <PlateSvg viewBox="0 0 720 200" ariaLabel={ariaLabel}>
          {labels.map((label, i) => (
            <MonoBox
              key={label}
              x={gap + i * (boxW + gap)}
              y={boxY}
              w={boxW}
              h={boxH}
              label={label}
              gold={i === count - 1}
              fontSize={label.length > 14 ? 7.5 : label.length > 10 ? 9 : 10}
            />
          ))}
        </PlateSvg>
      </Fig>
    )
  }
}

/* —— Ch01 —— */
export const BtcCh01OldWay = btcPlaceholder('FIG. 01.1', 'The old way versus a system', ['INBOX', 'NOTEBOOK', 'CRM'])
export const BtcCh01ThreeLeaks = btcPlaceholder('FIG. 01.2', 'The three leaks', ['SPEED', 'MEMORY', 'HANDOFF'])
export const BtcCh01InboxOrSystem = btcPlaceholder('FIG. 01.3', 'Inbox and spreadsheet or a system', ['INBOX', 'SHEET', 'CRM'])

/* —— Ch02 —— */
export const BtcCh02FourWords = btcPlaceholder('FIG. 02.1', 'The four words that matter', ['CONTACTS', 'DEALS', 'ACTIVITIES', 'OWNERS'])
export const BtcCh02RightSized = btcPlaceholder('FIG. 02.2', 'Right-sized CRM choice', ['TOO BIG', 'RIGHT FIT', 'TOO SMALL'])
export const BtcCh02WhatYouOwn = btcPlaceholder('FIG. 02.3', 'What you own', ['YOUR DATA', 'EXPORT KEY'])

/* —— Ch03 —— */
export const BtcCh03Pipeline = btcPlaceholder('FIG. 03.1', 'Pipeline stages', ['NEW', 'QUALIFIED', 'PROPOSAL', 'WON'])
export const BtcCh03TooManyFew = btcPlaceholder('FIG. 03.2', 'Too many or too few stages', ['TOO MANY', 'TOO FEW'])
export const BtcCh03OneOwner = btcPlaceholder('FIG. 03.3', 'One owner per deal', ['ONE OWNER', 'NEXT STEP'])
export const BtcCh03ReadingBoard = btcPlaceholder('FIG. 03.4', 'Reading the board', ['STUCK', 'AGING', 'NEXT'])

/* —— Ch04 —— */
export const BtcCh04FewerFields = btcPlaceholder('FIG. 04.1', 'Fewer fields ruthlessly', ['NAME', 'PHONE', 'SOURCE'])
export const BtcCh04OneHuman = btcPlaceholder('FIG. 04.2', 'One human one record', ['ONE HUMAN', 'ONE RECORD'])
export const BtcCh04HygieneRhythm = btcPlaceholder('FIG. 04.3', 'Hygiene rhythm', ['WEEKLY', 'MONTHLY', 'QUARTERLY'])

/* —— Ch05 —— */
export const BtcCh05FourWays = btcPlaceholder('FIG. 05.1', 'Four ways to use a feature', ['CAPTURE', 'REMIND', 'ROUTE', 'REPORT'])
export const BtcCh05LeaksMap = btcPlaceholder('FIG. 05.2', 'Features mapped to leaks', ['SPEED', 'MEMORY', 'HANDOFF'])
export const BtcCh05SequenceRails = btcPlaceholder('FIG. 05.3', 'Sequences on rails', ['DAY 1', 'DAY 3', 'DAY 7'])
export const BtcCh05Spine = btcPlaceholder('FIG. 05.4', 'CRM feature spine', ['FORMS', 'INBOX', 'TASKS', 'REPORT'])

/* —— Ch06 —— */
export const BtcCh06FifteenMinutes = btcPlaceholder('FIG. 06.1', 'Fifteen-minute morning rhythm', ['LEADS', 'TASKS', 'BOARD'])
export const BtcCh06WeeklyReview = btcPlaceholder('FIG. 06.2', 'Weekly pipeline review', ['STUCK', 'ZOMBIES', 'FORECAST'])

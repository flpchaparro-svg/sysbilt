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

/* —— Ch07 —— */
export const BtcCh07PersistentPest = btcPlaceholder('FIG. 07.1', 'Persistent versus pest', ['PEST', 'PERSISTENT'])
export const BtcCh07CadenceShape = btcPlaceholder('FIG. 07.2', 'Cadence shape', ['DAY 1', 'DAY 4', 'DAY 10', 'CLOSE'])
export const BtcCh07Reputation = btcPlaceholder('FIG. 07.3', 'Sender reputation', ['INBOX', 'SPAM', 'REPLIES'])

/* —— Ch08 —— */
export const BtcCh08LeadsOrWork = btcPlaceholder('FIG. 08.1', 'Leads versus work won', ['LEADS', 'WON REVENUE'])
export const BtcCh08SourceAtBirth = btcPlaceholder('FIG. 08.2', 'Source tagged at birth', ['FORM', 'UTM', 'SOURCE'])
export const BtcCh08DarkFunnel = btcPlaceholder('FIG. 08.3', 'Dark funnel honesty', ['TRACKED', 'UNKNOWN', 'ASK'])

/* —— Ch09 —— */
export const BtcCh09Hub = btcPlaceholder('FIG. 09.1', 'CRM as the hub', ['CRM', 'WEB', 'EMAIL', 'PHONE'])
export const BtcCh09OneLead = btcPlaceholder('FIG. 09.2', 'One lead start to finish', ['LEAD IN', 'CRM', 'WON JOB'])
export const BtcCh09SentNotReceived = btcPlaceholder('FIG. 09.3', 'Sent versus received', ['SENT', 'RECEIVED'])
export const BtcCh09SpokeOrder = btcPlaceholder('FIG. 09.4', 'Spoke wiring order', ['WEB', 'INBOX', 'QUOTE', 'ACCOUNTS'])

/* —— Ch10 —— */
export const BtcCh10WhyCrmsDie = btcPlaceholder('FIG. 10.1', 'Why CRMs die', ['FRICTION', 'NO VALUE', 'NO OWNER'])
export const BtcCh10DesignLaziness = btcPlaceholder('FIG. 10.2', 'Design for laziness', ['FEWER CLICKS', 'AUTO LOG', 'DEFAULTS'])
export const BtcCh10RolloutArc = btcPlaceholder('FIG. 10.3', 'Rollout arc', ['OWNER', 'TEAM', 'FEATURES'])

/* —— Ch11 —— */
export const BtcCh11DivisionLabour = btcPlaceholder('FIG. 11.1', 'Division of labour', ['AI DRAFT', 'YOU APPROVE'])
export const BtcCh11SelfWritingRecord = btcPlaceholder('FIG. 11.2', 'Self-writing record', ['CALL', 'NOTE', 'CRM'])

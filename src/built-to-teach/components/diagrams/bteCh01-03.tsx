import type { ReactNode } from 'react'
import { Fig } from './diagramPrimitives'

type D = { caption: string }

function Plate({ children, footer }: { children: ReactNode; footer?: string }) {
  return (
    <div className="border border-[#1a1a1a]/22 bg-[#FFF2EC]/60 p-4">
      {children}
      {footer ? (
        <p className="mt-4 text-center font-mono text-[10px] font-bold uppercase tracking-widest text-[#8B6914]">{footer}</p>
      ) : null}
    </div>
  )
}

function Box({ title, body, gold = false, crossed = false }: { title: string; body?: string; gold?: boolean; crossed?: boolean }) {
  const border = gold ? 'border-[#C5A059] border-2' : 'border-[#1a1a1a]'
  return (
    <div className={`relative overflow-hidden border bg-[#FFF2EC] p-3 ${border} ${crossed ? 'opacity-70' : ''}`}>
      {crossed ? <div className="pointer-events-none absolute inset-0 flex items-center justify-center"><span className="h-px w-[120%] -rotate-12 bg-[#1a1a1a]/35" /></div> : null}
      <p className={`font-mono text-[11px] font-bold uppercase tracking-widest ${gold ? 'text-[#8B6914]' : 'text-[#1a1a1a]'}`}>{title}</p>
      {body ? <p className="mt-2 font-sans text-[12px] leading-snug text-[#1a1a1a]/70">{body}</p> : null}
    </div>
  )
}

function Row({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 gap-3 md:grid-cols-2">{children}</div>
}

function Stack({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-3">{children}</div>
}

function Gate({ label }: { label: string }) {
  return <div className="rounded border-2 border-[#C5A059] bg-[#FFF2EC] px-3 py-2 text-center font-mono text-[11px] font-bold uppercase tracking-widest text-[#8B6914]">{label}</div>
}

export function BteCh01OneSourceManyFormats({ caption }: D) {
  return (
    <Fig fig="FIG. 01.1" caption={caption}>
      <Plate footer="The production collapsed. What is left is the knowledge itself.">
        <Stack>
          <Box gold title="ONE CAPTURED EXPLANATION" body="Made in an afternoon, from one source." />
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            <Box title="PROCEDURE" />
            <Box title="VIDEO" />
            <Box title="PODCAST" />
            <Box title="QUIZ" />
            <Box title="INFOGRAPHIC" />
            <Box title="VOICE AGENT" gold />
          </div>
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BteCh01ManagerAsManual({ caption }: D) {
  return (
    <Fig fig="FIG. 01.2" caption={caption}>
      <Plate footer="Every hour re-explaining is an hour not leading.">
        <Row>
          <Box title="THE KNOWLEDGE LIVES HERE" body="Everyone queues with the same questions. The senior person is the manual." crossed />
          <Box gold title="KNOWLEDGE CAPTURED" body="The team draws from the system. The senior person does the work only they can do." />
        </Row>
      </Plate>
    </Fig>
  )
}

export function BteCh01AdoptionFailure({ caption }: D) {
  return (
    <Fig fig="FIG. 01.3" caption={caption}>
      <Plate footer="Every system is multiplied by one factor, and it is set in the training.">
        <Stack>
          <Gate label="DID THE TEAM ACTUALLY USE IT?" />
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            <Box title="WEBSITE" crossed />
            <Box title="CRM" crossed />
            <Box title="AUTOMATION" gold />
            <Box title="AI" crossed />
            <Box title="CONTENT" crossed />
            <Box title="UNUSED, WORTH NOTHING" body="Past a closed gate." crossed />
          </div>
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BteCh02AssetUnsafePlace({ caption }: D) {
  return (
    <Fig fig="FIG. 02.1" caption={caption}>
      <Plate footer="It goes home every night and might not come back.">
        <Row>
          <Box title="THE VAULT" body="Equipment and money. The business protects." />
          <Box gold title="HOW THE BUSINESS WORKS" body="The most valuable asset, in the least secure place. Unguarded." />
        </Row>
      </Plate>
    </Fig>
  )
}

export function BteCh02SingleSource({ caption }: D) {
  return (
    <Fig fig="FIG. 02.2" caption={caption}>
      <Plate footer="Skip the source and you get ten versions that contradict each other, which is worse than none.">
        <Stack>
          <Row>
            <Box title="SCATTERED" body="Sticky notes, heads, folders, chats." crossed />
            <Box gold title="ONE SOURCE OF TRUTH" body="One source, one truth, everything generated from it." />
          </Row>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            <Box title="PROCEDURE" />
            <Box title="VIDEO" />
            <Box title="QUIZ" />
            <Box title="AGENT" gold />
          </div>
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BteCh02PersonWhoKnewEverything({ caption }: D) {
  return (
    <Fig fig="FIG. 02.3" caption={caption}>
      <Plate footer="The only insurance is capturing it while they are still here to give it.">
        <Row>
          <Box title="WHILE THEY ARE HERE" body="Everything runs smoothly. The risk is invisible." />
          <Box title="THE DAY THEY LEAVE" body="Months of painfully rediscovering what the business already knew." crossed />
        </Row>
      </Plate>
    </Fig>
  )
}

export function BteCh03OneSkill({ caption }: D) {
  return (
    <Fig fig="FIG. 03.1" caption={caption}>
      <Plate>
        <Row>
          <Box title="EVERYTHING AT ONCE" body="A firehose hitting an overwhelmed person. Almost nothing lands." crossed />
          <Box gold title="ONE SKILL AT A TIME" body="Each has a chance to stick, and fits a short format." />
        </Row>
      </Plate>
    </Fig>
  )
}

export function BteCh03ShowDoCheck({ caption }: D) {
  return (
    <Fig fig="FIG. 03.2" caption={caption}>
      <Plate footer="Being told is not learning. Doing is.">
        <Stack>
          <Box title="SHOW" body="Demonstrate it clearly. Most training stops here." crossed />
          <Box gold title="DO" body="They do it themselves. Where learning happens." />
          <Box gold title="CHECK" body="Confirm it landed." />
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BteCh03ShortClose({ caption }: D) {
  return (
    <Fig fig="FIG. 03.3" caption={caption}>
      <Plate footer="People forget what they are not about to apply.">
        <Row>
          <Box title="LONG SESSION WEEKS BEFORE" body="Mostly forgotten by the time the work arrives." crossed />
          <Box gold title="FIVE MINUTES AT THE MOMENT OF NEED" body="Applied immediately." />
        </Row>
      </Plate>
    </Fig>
  )
}

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

export function BttCh09StandardPlug({ caption }: D) {
  return (
    <Fig fig="FIG. 09.1" caption={caption}>
      <Plate footer="Read widely, write narrowly, spend never without a human.">
        <Stack><div className="grid grid-cols-3 gap-2"><Box title="CRM · READ" gold /><Box title="BOOKS · READ" gold /><Box title="WRITE · HUMAN" /></div><Box title="PLAIN-ENGLISH QUESTION IN → ANSWER FROM LIVE SYSTEMS OUT" gold /></Stack>
      </Plate>
    </Fig>
  )
}

export function BttCh09FourThoughts({ caption }: D) {
  return (
    <Fig fig="FIG. 09.2" caption={caption}>
      <Plate footer="The fifth step was never the machine's.">
        <Stack><Box title="RULES · ZERO TOKENS" body="Capture · tag · acknowledge · alert." gold /><div className="grid grid-cols-2 gap-2 md:grid-cols-4"><Box title="CLASSIFIER · SMALL" /><Box title="RESEARCHER · MID" /><Box title="EXTRACTOR · SMALL" /><Box title="DRAFTER · LARGE" gold /></div><Gate label="DRAFTS · HUMAN GATE" /></Stack>
      </Plate>
    </Fig>
  )
}

export function BttCh09MeteredFailure({ caption }: D) {
  return (
    <Fig fig="FIG. 09.3" caption={caption}>
      <Plate footer="The loop trips a flag instead of running a tab.">
        <Row><Box title="RETRY LOOP + RISING BILL" body="Un defended." crossed /><Box gold title="CAP · ALERT · CIRCUIT BREAKER" body="Ends at a flag to a human." /></Row>
      </Plate>
    </Fig>
  )
}

export function BttCh09TokensHealth({ caption }: D) {
  return (
    <Fig fig="FIG. 09.4" caption={caption}>
      <Plate footer="A sudden change in any direction is the earliest alarm there is.">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3"><Box title="ENQUIRIES / DAY" gold /><Box title="DRAFTS / DAY" gold /><Box title="TOKENS / DAY" gold /></div>
      </Plate>
    </Fig>
  )
}

export function BttCh10Ladder({ caption }: D) {
  return (
    <Fig fig="FIG. 10.1" caption={caption}>
      <Plate footer="Skipping rungs is how the chapter-one statistics get made.">
        <Stack><Box gold title="1 · NOTES & SUMMARIES" /><Box title="2 · DRAFTING" /><Box title="3 · CLASSIFICATION" /><Box title="4 · CHAT AGENT" /><Box title="5 · VOICE" /><Box title="6 · CONNECTED AI" /></Stack>
      </Plate>
    </Fig>
  )
}

export function BttCh10RungGate({ caption }: D) {
  return (
    <Fig fig="FIG. 10.2" caption={caption}>
      <Plate footer="Fix fit, briefing, or knowledge here, where it is cheap.">
        <Stack><Box gold title="PASS" body="Costs known · savings honest · errors shrinking · would notice absence." /><Box title="FAIL → FIX HERE" body="Fit · briefing · knowledge." crossed /></Stack>
      </Plate>
    </Fig>
  )
}

export function BttCh10LaunchWeek({ caption }: D) {
  return (
    <Fig fig="FIG. 10.3" caption={caption}>
      <Plate footer="Composure costs nothing. The gates make new models a config change.">
        <Row><Box title="SHINY LAUNCHES STREAMING BY" crossed /><Box gold title="WHICH TASK, ON WHICH RUNG, BETTER / CHEAPER / SAFER?" body="One boring question card." /></Row>
      </Plate>
    </Fig>
  )
}

export function BttCh11FourChecks({ caption }: D) {
  return (
    <Fig fig="FIG. 11.1" caption={caption}>
      <Plate footer="A draft passing through all four to yours to send.">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4"><Box gold title="TRUTH" /><Box title="TONE" /><Box title="OWNERSHIP" /><Box title="PRIVACY" /></div><Gate label="YOURS TO SEND" />
      </Plate>
    </Fig>
  )
}


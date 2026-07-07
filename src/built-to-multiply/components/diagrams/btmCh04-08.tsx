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

export function BtmCh04RepurposingTree({ caption }: D) {
  return (
    <Fig fig="FIG. 04.1" caption={caption}>
      <Plate footer="Make the good thing once, then multiply it, rather than making mediocre things endlessly.">
        <Stack><Box gold title="SOURCE PIECE" body="Made once, on ground you own." /><div className="grid grid-cols-2 gap-2 md:grid-cols-3"><Box title="CAROUSEL" /><Box title="SHORT POSTS" /><Box title="VIDEO + CLIPS" /><Box title="EMAIL" /><Box title="VARIATIONS" gold /></div></Stack>
      </Plate>
    </Fig>
  )
}

export function BtmCh04LibraryCompounds({ caption }: D) {
  return (
    <Fig fig="FIG. 04.2" caption={caption}>
      <Plate>
        <Row><Box title="NO LIBRARY" body="Blank page every time. Never speeds up." crossed /><Box gold title="WITH LIBRARY" body="Each piece builds on reusable parts. Gets faster as it goes." /></Row>
      </Plate>
    </Fig>
  )
}

export function BtmCh04OneRuleTemplate({ caption }: D) {
  return (
    <Fig fig="FIG. 04.3" caption={caption}>
      <Plate footer="A good template is a rule you only have to follow once.">
        <Row><Box gold title="TEN FILLED TEMPLATES" body="One business." /><Box title="TEN FREEHAND PIECES" body="Ten businesses." crossed /></Row>
      </Plate>
    </Fig>
  )
}

export function BtmCh05ToolkitMap({ caption }: D) {
  return (
    <Fig fig="FIG. 05.1" caption={caption}>
      <Plate footer="Choose the few that make your system run. Ignore the rest.">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3"><Box title="DRAFT" /><Box title="MAKE" /><Box title="SHARPEN" /><Box title="PUBLISH" /><Box title="CAPTURE" gold /><Box title="LEARN" gold /></div>
      </Plate>
    </Fig>
  )
}

export function BtmCh05ImageLine({ caption }: D) {
  return (
    <Fig fig="FIG. 05.2" caption={caption}>
      <Plate footer="Fine for the illustrative. Never a substitute for real photography of your real work.">
        <Row><Box gold title="SAFE" body="Concepts, backgrounds, illustrations, graphics." /><Box title="DANGEROUS" body="Fake photos of your real products, people, work." crossed /></Row>
      </Plate>
    </Fig>
  )
}

export function BtmCh05CapturePipe({ caption }: D) {
  return (
    <Fig fig="FIG. 05.3" caption={caption}>
      <Plate footer="Public attention becomes a private conversation on ground you own.">
        <Stack><Box title="PUBLIC POST + COMMENT" /><Box title="AUTO DM + PROMISED LINK" gold /><Box title="CAPTURED CONTACT, TAGGED" gold /></Stack>
      </Plate>
    </Fig>
  )
}

export function BtmCh06FiveMinutes({ caption }: D) {
  return (
    <Fig fig="FIG. 06.1" caption={caption}>
      <Plate footer="The making is five minutes. The system around it is what makes those five minutes worth posting.">
        <Stack><Box gold title="FIVE-MINUTE MAKING" body="Brief, shape, template, done." /><div className="grid grid-cols-3 gap-2"><Box title="STRATEGY DECIDED" /><Box title="TEMPLATE EXISTS" /><Box title="HUMAN EDITS" gold /></div></Stack>
      </Plate>
    </Fig>
  )
}

export function BtmCh06BatchSchedule({ caption }: D) {
  return (
    <Fig fig="FIG. 06.2" caption={caption}>
      <Plate>
        <Row><Box title="ONE PIECE A DAY" body="The daily scramble." crossed /><Box gold title="BATCH + CALENDAR" body="Consistency without living in the apps." /></Row>
      </Plate>
    </Fig>
  )
}

export function BtmCh06ThreeLevels({ caption }: D) {
  return (
    <Fig fig="FIG. 06.3" caption={caption}>
      <Plate footer="A person making good content fast, not a machine making content nobody chose.">
        <Stack><Box gold title="MANUAL WITH AI" body="Where most businesses should be." /><Box title="SEMI-AUTOMATED" body="Wired steps, human approves." /><Box title="FULLY AUTOMATED" body="Machine flood. A step too far for most." crossed /></Stack>
      </Plate>
    </Fig>
  )
}

export function BtmCh07ClaimsProvable({ caption }: D) {
  return (
    <Fig fig="FIG. 07.1" caption={caption}>
      <Plate footer="Fast making does not excuse false claiming.">
        <Row><Box title="BEST · FASTEST · CHEAPEST" body="No evidence. Misleading conduct." crossed /><Box gold title="SPECIFIC, PROVABLE CLAIM" body="True and able to be backed up." /></Row>
      </Plate>
    </Fig>
  )
}

export function BtmCh07NeverFakeProof({ caption }: D) {
  return (
    <Fig fig="FIG. 07.2" caption={caption}>
      <Plate>
        <Row><Box title="FAKE REVIEWS" body="Written, bought, cherry-picked." crossed /><Box gold title="REAL REVIEW FLOW" body="Genuine proof, gathered honestly." /></Row>
      </Plate>
    </Fig>
  )
}

export function BtmCh07LookingCheap({ caption }: D) {
  return (
    <Fig fig="FIG. 07.3" caption={caption}>
      <Plate footer="Thrown away the moment you let the tools publish their first draft with your name on it.">
        <Row><Box title="FEED OF CHEAP MACHINE CONTENT" body="Grey, generic, forgettable." crossed /><Box gold title="ONE CONSIDERED PIECE" body="Stands out. The whole advantage." /></Row>
      </Plate>
    </Fig>
  )
}

export function BtmCh08NumberMatchesJob({ caption }: D) {
  return (
    <Fig fig="FIG. 08.1" caption={caption}>
      <Plate footer="Match the number to the job, or it lies to you constantly.">
        <Stack><Box gold title="AWARENESS → REACH + HELD" /><Box title="CONSIDERATION → TRUST SIGNALS" /><Box title="LEAD CAPTURE → ACTION ONLY" gold /></Stack>
      </Plate>
    </Fig>
  )
}

export function BtmCh08PatternsNotVerdicts({ caption }: D) {
  return (
    <Fig fig="FIG. 08.2" caption={caption}>
      <Plate>
        <Row><Box title="ONE POST REACTION" body="Superstition. Chasing noise." crossed /><Box gold title="PATTERNS ACROSS MANY" body="Genuine learning every month." /></Row>
      </Plate>
    </Fig>
  )
}

export function BtmCh08VanityOrPays({ caption }: D) {
  return (
    <Fig fig="FIG. 08.3" caption={caption}>
      <Plate footer="A smaller account winning real business beats a large one collecting applause.">
        <Row><Box title="VANITY" body="Followers, likes, raw views. Feels good, pays nothing." crossed /><Box gold title="WHAT PAYS" body="Held attention, trust that leads somewhere, captures and enquiries." /></Row>
      </Plate>
    </Fig>
  )
}


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

export function BseCh01RearviewWindscreen({ caption }: D) {
  return (
    <Fig fig="FIG. 01.1" caption={caption}>
      <Plate>
        <Row>
          <Box title="THE OLD WAY" body="Gut feel and last month's report. Learning where you were after you have been there." crossed />
          <Box gold title="SEEING CLEARLY" body="A clear windscreen and a live dashboard. A current view you can act on now." />
        </Row>
      </Plate>
    </Fig>
  )
}

export function BseCh01TwoBlindnesses({ caption }: D) {
  return (
    <Fig fig="FIG. 01.2" caption={caption}>
      <Plate footer="Less, connected and honest, beats more, scattered and partial.">
        <Row>
          <Box title="TOO LITTLE" body="One old report arriving late. Starved, and always behind." crossed />
          <Box title="TOO MUCH" body="A dozen dashboards in a dozen tabs, none agreeing. Drowning, and still cannot see." crossed />
        </Row>
      </Plate>
    </Fig>
  )
}

export function BseCh01FlyingOrClear({ caption }: D) {
  return (
    <Fig fig="FIG. 01.3" caption={caption}>
      <Plate footer="The difference between reacting to the business and steering it.">
        <Row>
          <Box title="FLYING BLIND" body="Decisions on gut and old reports. Problems found late as crises." crossed />
          <Box gold title="SEEING CLEARLY" body="A few numbers that matter, one honest current view, problems caught small, steering on evidence." />
        </Row>
      </Plate>
    </Fig>
  )
}

export function BseCh02AssetSystemsBuilding({ caption }: D) {
  return (
    <Fig fig="FIG. 02.1" caption={caption}>
      <Plate footer="Not exhaust. One of the most valuable things the business owns.">
        <Stack>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            <Box title="WEBSITE" />
            <Box title="CRM" />
            <Box title="STORE" />
            <Box title="AUTOMATIONS" />
            <Box title="CONTENT" />
            <Box title="ACCOUNTING" />
          </div>
          <Box gold title="THE INSTRUMENT PANEL" body="The memory and instrument panel of the whole business. Scattered data converging into one view." />
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BseCh02ReachableOrHostage({ caption }: D) {
  return (
    <Fig fig="FIG. 02.2" caption={caption}>
      <Plate footer="A dashboard is only as complete as the data you can actually get out.">
        <Row>
          <Box gold title="OWNED AND REACHABLE" body="Data easy to export, flowing freely to the dashboard. A complete picture." />
          <Box title="HELD HOSTAGE" body="Data locked inside a tool with no export. Half owned, and your picture stays partial." crossed />
        </Row>
      </Plate>
    </Fig>
  )
}

export function BseCh02OneWordOneMeaning({ caption }: D) {
  return (
    <Fig fig="FIG. 02.3" caption={caption}>
      <Plate footer="Get the definitions right first, or the impressive dashboard misleads confidently.">
        <Row>
          <Stack>
            <Box title="LEAD IN SYSTEM A" body="Anyone who enquired." />
            <Box title="LEAD IN SYSTEM B" body="Only qualified." />
            <Box title="LEAD IN SYSTEM C" body="Anyone who visited." />
            <Box title="COMBINED NUMBER" body="Meaningless, but it looks authoritative." crossed />
          </Stack>
          <Box gold title="ONE SHARED DEFINITION" body="The word means the same thing in every system. Now the number means something." />
        </Row>
      </Plate>
    </Fig>
  )
}

export function BseCh03OneQuestion({ caption }: D) {
  return (
    <Fig fig="FIG. 03.1" caption={caption}>
      <Plate>
        <Row>
          <Box title="ONE MEGA-DASHBOARD" body="Crammed with everything. Answers nothing well, a scavenger hunt on one screen." crossed />
          <Stack>
            <Box gold title="HOW ARE SALES TRACKING?" body="One focused view, answered at a glance." />
            <Box gold title="WHICH MARKETING WORKS?" body="One focused view, answered at a glance." />
            <Box gold title="IS ANYTHING WRONG NOW?" body="One focused view, answered at a glance." />
          </Stack>
        </Row>
      </Plate>
    </Fig>
  )
}

export function BseCh03FiveNotForty({ caption }: D) {
  return (
    <Fig fig="FIG. 03.2" caption={caption}>
      <Plate footer="Less on the screen is more in the head.">
        <Row>
          <Box title="FORTY NUMBERS" body="The five that matter buried among them. Glanced at once, found overwhelming, ignored." crossed />
          <Box gold title="FIVE CLEAR NUMBERS" body="Read in seconds, used daily." />
        </Row>
      </Plate>
    </Fig>
  )
}

export function BseCh03NumberInContext({ caption }: D) {
  return (
    <Fig fig="FIG. 03.3" caption={caption}>
      <Plate footer="Context is what makes a number a signal, not a digit.">
        <Row>
          <Box title="A BARE NUMBER" body="$X. Is that good or bad? You cannot tell." crossed />
          <Box gold title="NUMBER IN CONTEXT" body="Versus last month, versus target, trend arrow. Now a glance tells you what needs attention." />
        </Row>
      </Plate>
    </Fig>
  )
}

export function BseCh03FiveSecondTest({ caption }: D) {
  return (
    <Fig fig="FIG. 03.4" caption={caption}>
      <Plate footer="Build for the glance, and it joins the daily rhythm.">
        <Row>
          <Box gold title="PASSES THE FIVE-SECOND TEST" body="How things are and what needs attention, in one glance." />
          <Box title="REQUIRES STUDY" body="Busy people glance, they do not study, so it gets ignored." crossed />
        </Row>
      </Plate>
    </Fig>
  )
}

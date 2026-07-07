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

export function BseCh07GarbageGospel({ caption }: D) {
  return (
    <Fig fig="FIG. 07.1" caption={caption}>
      <Plate footer="The better the dashboard looks, the more convincingly it lies.">
        <Stack>
          <Box title="MESSY DATA IN" body="Duplicates, gaps, a broken feed." crossed />
          <Box title="CLEAN, AUTHORITATIVE NUMBERS OUT" body="It does not just fail, it dresses wrong numbers in a form that invites confidence." crossed />
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BseCh07DashboardFroze({ caption }: D) {
  return (
    <Fig fig="FIG. 07.2" caption={caption}>
      <Plate footer="It fails silently and keeps smiling. Monitor the pipes, not just the view.">
        <Row>
          <Box title="THE DASHBOARD" body="Normal-looking numbers. These numbers froze last Tuesday, reality moved on." crossed />
          <Box gold title="PIPE MONITOR" body="Watching the connection. Raises a flag when flow stops." />
        </Row>
      </Plate>
    </Fig>
  )
}

export function BseCh07WhoSeesWhat({ caption }: D) {
  return (
    <Fig fig="FIG. 07.3" caption={caption}>
      <Plate footer="The right people, the right numbers, deliberately decided.">
        <Stack>
          <Box gold title="OWNER" body="Revenue, margin, full financials." />
          <Box title="SALESPERSON" body="Their own pipeline, not the full financials." />
          <Box title="EACH ROLE" body="The numbers relevant to their decisions." />
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BseCh08ToldNotWatching({ caption }: D) {
  return (
    <Fig fig="FIG. 08.1" caption={caption}>
      <Plate footer="The burden moves from you watching to the system flagging.">
        <Row>
          <Box title="YOU WATCHING" body="Depends on your vigilance, and you are busy." crossed />
          <Box gold title="THE SYSTEM WATCHING" body="Taps you on the shoulder only when something crosses a line. Silence genuinely means fine." />
        </Row>
      </Plate>
    </Fig>
  )
}

export function BseCh08ThresholdsAnomalies({ caption }: D) {
  return (
    <Fig fig="FIG. 08.2" caption={caption}>
      <Plate footer="The lines you drew, and the departures from normal you did not think to draw.">
        <Row>
          <Box gold title="THRESHOLD" body="Leads below a level, cash owed above a level. Lines you set." />
          <Box gold title="ANOMALY" body="Sales suddenly halved, a steady cost doubled, enquiries stopped. Flagged even though you set no line." />
        </Row>
      </Plate>
    </Fig>
  )
}

export function BseCh08AskQuestion({ caption }: D) {
  return (
    <Fig fig="FIG. 08.3" caption={caption}>
      <Plate footer="A one-off question is no longer a project, it is a sentence.">
        <Stack>
          <Box gold title="PLAIN-LANGUAGE QUESTION" body="Which service made the most margin this quarter?" />
          <Box title="GOVERNED READ-ONLY CONNECTION" body="Permissions govern what it sees." />
          <Box gold title="ANSWER WITH FIGURES BEHIND IT" body="Read-only for questions. Sanity-check the surprising ones." />
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BseCh08ForecastWeather({ caption }: D) {
  return (
    <Fig fig="FIG. 08.4" caption={caption}>
      <Plate footer="Precision is not accuracy. A very exact forecast is still a forecast.">
        <Row>
          <Box title="FALSE PRECISION" body="Sitting on screen looking exactly as solid as a measured fact. Acted on as certainty." crossed />
          <Box gold title="WEATHER REPORT" body="A range or estimate, held loosely. Informed guidance that earns alertness, not a bet." />
        </Row>
      </Plate>
    </Fig>
  )
}

export function BseCh09WholeMachineVisible({ caption }: D) {
  return (
    <Fig fig="FIG. 09.1" caption={caption}>
      <Plate footer="The last piece, because it needs all the others.">
        <Stack>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            <Box title="WEBSITE SENSES" />
            <Box title="CRM REMEMBERS" />
            <Box title="AUTOMATIONS ACT" />
            <Box title="CONTENT EARNS" />
            <Box title="ACCOUNTING SCORES" />
            <Box title="TEAM DELIVERS" />
          </div>
          <Gate label="THE SCREEN" />
          <Box gold title="THE NERVOUS SYSTEM" body="The nervous system this series built, now with a screen." />
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BseCh09EnquiryLoopVisible({ caption }: D) {
  return (
    <Fig fig="FIG. 09.2" caption={caption}>
      <Plate footer="The dashboard does not just show numbers. It shows the machine working.">
        <Stack>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            <Box title="ARRIVES" />
            <Box title="TAGGED LEAD" />
            <Box title="ACKNOWLEDGED" />
            <Box title="WORKED" />
            <Box title="WON" />
            <Box title="INVOICED" />
            <Box title="DELIVERED" gold />
          </div>
          <Box gold title="THE DASHBOARD ABOVE" body="Leads by source, conversion, pipeline, revenue, margin. Each step emitting a number." />
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BseCh09PipesBehindScreen({ caption }: D) {
  return (
    <Fig fig="FIG. 09.3" caption={caption}>
      <Plate footer="Seeing clearly, like everything else, is a system, built and maintained, not conjured.">
        <Stack>
          <Box gold title="THE SINGLE SCREEN" body="One dashboard fed by pipes from a dozen systems." />
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            <Box title="RELIABLE CONNECTION" />
            <Box title="REFRESH SCHEDULE" />
            <Box title="SILENT FAILURE MONITOR" />
            <Box title="RECONCILED COUNTS" />
            <Box title="GOVERNED CREDENTIALS" gold />
          </div>
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BseCh10ThreeStages({ caption }: D) {
  return (
    <Fig fig="FIG. 10.1" caption={caption}>
      <Plate footer="You cannot understand or anticipate until you can simply see.">
        <Stack>
          <Box gold title="SEE WHAT HAPPENED" body="The current state. Where most should start, and most do not even have." />
          <Box gold title="UNDERSTAND WHY" body="The causes behind the numbers. Built on seeing." />
          <Box gold title="ANTICIPATE WHAT IS COMING" body="Leading numbers and patterns. Built on both. Held as estimate, not certainty." />
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BseCh10BuildWhenDecision({ caption }: D) {
  return (
    <Fig fig="FIG. 10.2" caption={caption}>
      <Plate footer="Every view earns its place by the decision it drives.">
        <Stack>
          <Gate label="IS THERE A REAL QUESTION AND A REAL DECISION THIS INFORMS?" />
          <Row>
            <Box gold title="BUILD IT" body="A real question with a real decision behind it." />
            <Box title="CHART-PORN" body="It would look impressive. Admired once and ignored." crossed />
          </Row>
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BseCh10GrowOneView({ caption }: D) {
  return (
    <Fig fig="FIG. 10.3" caption={caption}>
      <Plate footer="Build what earns its place, in the order see-understand-anticipate.">
        <Stack>
          <Box gold title="DAILY GLANCE" body="Used and trusted. The starting point." />
          <Box gold title="ONE OR TWO MORE VIEWS" body="Each added only when a genuine new question keeps needing answering." />
          <Box title="ELABORATE WALL OF CHARTS" body="Built all at once. Impressive-looking, ignored." crossed />
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BseCh11FourChecks({ caption }: D) {
  return (
    <Fig fig="FIG. 11.1" caption={caption}>
      <Plate footer="A frozen number looks exactly like a live one. Check before you act.">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          <Box gold title="TRUSTWORTHY" body="Clean and current, not stale or dirty." />
          <Box title="DEFINED" body="Means what I think, consistently." />
          <Box title="MEASURED OR ESTIMATED" body="Fact or forecast, and they deserve different confidence." />
          <Box title="ACTIONABLE" body="I would do something different." />
        </div>
        <Gate label="ACT" />
      </Plate>
    </Fig>
  )
}

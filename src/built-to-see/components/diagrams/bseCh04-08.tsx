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

export function BseCh04LeadingLagging({ caption }: D) {
  return (
    <Fig fig="FIG. 04.1" caption={caption}>
      <Plate footer="A dashboard of only lagging numbers is a rear-view mirror.">
        <Stack>
          <Box gold title="LEADING NUMBERS (NOW)" body="Leads, quotes, pipeline. Happening now, predict the future, you can still steer." />
          <Box title="LAGGING NUMBERS (DONE)" body="Revenue, profit. Already happened, you can only confirm." />
          <Gate label="LEADING NOW BECOMES LAGGING LATER" />
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BseCh04CoreNumbers({ caption }: D) {
  return (
    <Fig fig="FIG. 04.2" caption={caption}>
      <Plate footer="The right ones from each group, in the right views, not all on one screen.">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          <Box gold title="GETTING WORK" body="Leads, quotes, pipeline. Leading." />
          <Box title="CONVERSION" body="Rate, speed." />
          <Box title="RESULTS" body="Revenue, margin. Lagging." />
          <Box title="CASH" body="In bank, owed. Survival." />
          <Box title="DELIVERY" body="Capacity, workload. Keeping promises." gold />
        </div>
      </Plate>
    </Fig>
  )
}

export function BseCh04NumbersFollowGoal({ caption }: D) {
  return (
    <Fig fig="FIG. 04.3" caption={caption}>
      <Plate footer="Watch the numbers your actual priorities demand, not the same ones out of habit.">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-2">
          <Box gold title="GROWTH" body="Leads, pipeline, conversion." />
          <Box gold title="PROFITABILITY" body="Margin, costs." />
          <Box gold title="CASH" body="Cash position, what is owed." />
          <Box gold title="AT CAPACITY" body="Delivery, workload." />
        </div>
      </Plate>
    </Fig>
  )
}

export function BseCh05DashboardLibrary({ caption }: D) {
  return (
    <Fig fig="FIG. 05.1" caption={caption}>
      <Plate footer="A few focused views, each answering one question, not one giant screen.">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          <Box gold title="DAILY GLANCE" body="Is everything okay right now? Daily." />
          <Box title="PIPELINE AND SALES" body="Where is work heading? Weekly." />
          <Box title="MARKETING" body="Which marketing works? Monthly." />
          <Box title="MONEY" body="Is the business healthy? Weekly-monthly." />
          <Box title="OPERATIONS" body="Can we deliver? As work moves." />
          <Box title="CONTENT AND SOCIAL" body="Is content earning business? Monthly." />
        </div>
      </Plate>
    </Fig>
  )
}

export function BseCh05DailyGlance({ caption }: D) {
  return (
    <Fig fig="FIG. 05.2" caption={caption}>
      <Plate footer="The most-used dashboard a business has, because it is the quickest.">
        <Stack>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-2">
            <Box title="YESTERDAY'S LEADS" />
            <Box title="YESTERDAY'S SALES" />
            <Box title="ANYTHING WRONG OVERNIGHT" />
            <Box title="CASH" />
            <Box title="TODAY'S KEY COMMITMENTS" gold />
          </div>
          <Gate label="ALL OKAY / NEEDS ATTENTION" />
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BseCh05StartWithGlance({ caption }: D) {
  return (
    <Fig fig="FIG. 05.3" caption={caption}>
      <Plate footer="A few focused views genuinely used beats one overwhelming dashboard admired once.">
        <Stack>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-2">
            <Box gold title="DAILY GLANCE" body="Core starting point." />
            <Box gold title="PIPELINE" body="Core starting point." />
            <Box gold title="MONEY" body="Core starting point." />
            <Box gold title="MARKETING" body="Core starting point." />
            <Box title="OPERATIONS" body="Added when delivery becomes a priority." />
            <Box title="CONTENT" body="Added when content becomes a priority." />
          </div>
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BseCh06Rhythms({ caption }: D) {
  return (
    <Fig fig="FIG. 06.1" caption={caption}>
      <Plate>
        <Stack>
          <Box gold title="DAILY" body="Two minutes, the glance, anything for today." />
          <Box gold title="WEEKLY" body="Twenty minutes, pipeline and money, plan the week." />
          <Box gold title="MONTHLY" body="An hour, marketing and content, what to change." />
        </Stack>
        <p className="mt-3 text-center font-sans text-[12px] text-[#1a1a1a]/70">Short by design, meant to save time, not consume it.</p>
      </Plate>
    </Fig>
  )
}

export function BseCh06ActOnOnly({ caption }: D) {
  return (
    <Fig fig="FIG. 06.2" caption={caption}>
      <Plate footer="A number you will not act on should not be on the dashboard.">
        <Stack>
          <Gate label="WHAT WOULD I DO DIFFERENTLY BASED ON THIS?" />
          <Row>
            <Box gold title="A REAL ANSWER" body="Stays on the dashboard." />
            <Box title="NOTHING" body="Comes off. Decoration that crowds out what matters." crossed />
          </Row>
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BseCh06OneScreen({ caption }: D) {
  return (
    <Fig fig="FIG. 06.3" caption={caption}>
      <Plate footer="Spend meeting time deciding, not disputing.">
        <Row>
          <Box title="THREE DIFFERENT SPREADSHEETS" body="Whose numbers are right? Time spent reconciling." crossed />
          <Box gold title="ONE SHARED DASHBOARD" body="One agreed picture, straight to deciding." />
        </Row>
      </Plate>
    </Fig>
  )
}

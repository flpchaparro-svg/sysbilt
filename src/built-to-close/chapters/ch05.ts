import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch05Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 5,
    title: 'Your features',
    subtitle: 'Each feature is a small machine with one job.',
  }),
  flow(
    ...p('This is the chapter you will come back to. A CRM is built from features, and each one is a small machine with one job: catch a lead, remember a promise, fire a follow-up, or show you the truth. Most businesses use a tenth of what they pay for, not because the features are hard but because nobody framed what each is actually for. We treat every feature as a worker that has to earn its place.'),
    ...p('For each: what it is, what it does for winning work, how you use it day to day, and where it grows next. You will not need all of them on day one, and chapter ten will argue you should not try. Take what fits how your business wins, and leave the rest for the version of you that needs it.'),
    { type: 'featureIntro' },
    {
      type: 'diagram',
      id: 'btc-ch05-four-ways',
      caption: 'Every feature, four ways. WHAT IT IS / WHAT IT DOES / HOW YOU USE IT / WHERE IT GROWS.',
    },
    {
      type: 'diagram',
      id: 'btc-ch05-leaks-map',
      caption: 'The features mapped to the three leaks from chapter one: forgotten lead, quiet quote, drifted client.',
    },
  ),
  flow(
    {
      type: 'featureCard',
      title: 'Forms wired straight in',
      what: 'The contact form on your website, and every landing page and lead magnet behind it, should feed the CRM directly: submission becomes contact, tagged with source and page, deal opened if the enquiry warrants one, no retyping and no inbox limbo.',
      does: 'This is the front door of the whole system and the fix for chapter one\'s first leak, because a lead that lands in the CRM at the moment it exists is a lead that cannot be forgotten before anyone even saw it.',
      use: 'acting on what arrives',
      next: 'it feeds the sequences and the speed-to-lead machinery below',
    },
    {
      type: 'featureCard',
      title: 'The unified inbox',
      what: 'Enquiries arrive scattered, email, website chat, messages, socials, and the unified inbox pulls the conversations into one place, attached to the contact they belong to.',
      does: 'Its value is the end of the hunt: no more checking five apps to find who needs answering, no more thread lost in a staff member\'s personal phone.',
      use: 'as the one place conversations get answered, which also means when someone is sick or leaves, the relationship\'s history stays with the business, not the person. That last sentence is quietly one of the strongest reasons in this whole chapter',
      next: '',
    },
  ),
  flow(
    {
      type: 'featureCard',
      title: 'Email and calendar sync',
      what: 'Connect your email and calendar and the CRM starts remembering by itself: correspondence logging to the right contact, meetings appearing on the record, no copy-paste.',
      does: 'This is the feature that makes chapter four\'s clean data achievable by lazy humans, which is the only kind, and it is the difference between a CRM that must be fed and one that feeds itself.',
      use: 'switching it on and then simply working',
      next: 'open-and-click tracking can tell you when a quiet quote was just read, which is the warmest possible moment to call',
    },
    {
      type: 'featureCard',
      title: 'Missed-call text-back',
      what: 'A missed call is a lead at its hottest and most perishable.',
      does: 'This feature answers the moment you cannot: the caller instantly receives a text, sorry we missed you, we will call back shortly, or here is a link to book, and the missed call logs as a contact and a task instead of evaporating. For any business that lives by the phone, it is one of the highest-return switches in the book.',
      use: 'honouring it, the text buys you an hour, not a week',
      next: '',
    },
  ),
  flow(
    {
      type: 'featureCard',
      title: 'Tasks and reminders',
      what: 'The humble core of never forgetting: every promise becomes a task with a date, call Thursday, chase the quote Monday, check in come March, and the system holds it so no human has to.',
      does: 'The day\'s work becomes a list the CRM wrote from your own commitments.',
      use: 'trusting it completely, which means putting everything in, because a reminder system used sometimes is a memory with holes, which is what you had before',
      next: '',
    },
    {
      type: 'featureCard',
      title: 'Sequences',
      what: 'A sequence is a pre-written series of touches, emails, task prompts, spaced over days or weeks, that starts when a trigger fires: quote sent, enquiry received, client gone quiet. The follow-up that chapter one showed dying of busyness now runs on rails, each message in your voice, written once, delivered every time, with the whole sequence stopping the moment the person replies.',
      does: 'This is the single feature that most directly seals the three leaks.',
      use: 'writing a few core sequences well, the quote follow-up above all, and letting them run. Chapter seven is entirely about doing this without burning people, because rails can carry warmth or spam with equal efficiency, and the difference is craft',
      next: '',
    },
    {
      type: 'diagram',
      id: 'btc-ch05-sequence-rails',
      caption: 'The sequence on rails. Quote sent, touches at day 3, 8, 16, 25 graceful close. Client replies: sequence stops itself.',
    },
  ),
  flow(
    {
      type: 'featureCard',
      title: 'Meeting scheduler',
      what: 'A booking link that shows your real availability and lets a lead pick a time, ending the four-email dance that cools warm interest.',
      does: 'The booked meeting lands on the calendar and the contact record together.',
      use: 'in your signature, your follow-ups, and your website. Friction removed at the exact moment someone is ready to talk is revenue, plainly',
      next: '',
    },
    {
      type: 'featureCard',
      title: 'Quotes and proposals from the record',
      what: 'Producing the quote from inside the CRM, drawing the contact\'s details and the deal\'s substance into a clean template, means faster quotes, fewer retyping errors, and, the quiet gold, the system knowing the quote went out, which is what lets the follow-up sequence start itself and the pipeline stage update honestly.',
      does: '',
      use: 'templating your two or three standard formats once',
      next: 'seen-and-opened tracking tells you when the decision is actually being read',
    },
  ),
  flow(
    {
      type: 'featureCard',
      title: 'Lists and segmentation',
      what: 'The memory is not just for one-at-a-time.',
      does: 'Lists cut the database by what it knows: past clients in one suburb, everyone quoted over a threshold who went quiet, contacts who came from referral. Segmentation is what makes any message to many people relevant instead of noise, the win-back to lapsed clients, the announcement to the right postcode, and relevance is the entire difference between marketing and spam, as chapter seven will insist.',
      use: 'keeping the underlying fields clean, which is chapter four earning its keep again',
      next: '',
    },
    {
      type: 'featureCard',
      title: 'Lead scoring',
      what: 'Scoring ranks leads by fit and behaviour, size, source, engagement, so attention lands on the likeliest first.',
      does: 'It is genuinely useful and genuinely a later feature: with modest volume, judgment beats arithmetic, and premature scoring is configuration theatre.',
      use: 'when enquiry volume outgrows the ability to treat every lead as urgent, which is a good day, and chapter ten covers its timing',
      next: '',
    },
  ),
  flow(
    {
      type: 'featureCard',
      title: 'Automation triggers',
      what: 'The connective tissue: when this happens here, do that there.',
      does: 'Deal marked won, invoice drafted and onboarding email sent. Lead untouched for three days, owner nudged and manager flagged. New enquiry from the website, acknowledgement out inside the minute. Each is one small rule doing one boring thing forever, and together they are why a systemised business feels calm. The deeper craft of automation has a book of its own in this series; here, the CRM\'s native triggers cover the everyday brilliantly.',
      use: '',
      next: '',
    },
    {
      type: 'featureCard',
      title: 'Win-back and retention flows',
      what: 'The machinery for chapter one\'s third leak, the client you already won.',
      does: 'Flows that notice silence, a good customer with nothing on since last year, and act: the check-in, the seasonal reminder, the anniversary note. Past clients are the warmest list a business owns and the cheapest work it will ever win again, and this feature is simply the system refusing to let them drift.',
      use: 'setting honest rhythms per client type and keeping every touch genuinely worth receiving',
      next: '',
    },
  ),
  flow(
    {
      type: 'featureCard',
      title: 'Dashboards',
      what: 'The pipeline board is the daily truth; dashboards are the weekly and monthly one.',
      does: 'Leads by source, conversion by stage, revenue won, response times, the handful of numbers that tell you whether the machine is working and where it leaks. You use them in a standing weekly look, brief and honest, and resist the urge to chart everything, because a dashboard nobody can read in a minute is a dashboard nobody reads. The full discipline of seeing your business clearly gets its own book in this series.',
      use: '',
      next: '',
    },
    {
      type: 'featureCard',
      title: 'The mobile app',
      what: 'Last and far from least, because adoption lives or dies here: the CRM in every pocket, so the update happens in the carpark after the meeting, not from memory at a desk three days later, which is to say, not at all.',
      does: 'Voice-note the meeting record, call from the contact card, see the day\'s tasks on site.',
      use: 'making it the default: if the CRM is not effortless from a phone, for your team it does not exist. Chapter ten builds on exactly this',
      next: '',
    },
  ),
  flow(
    ...section(
      'CHOOSING',
      'Choosing what you actually need',
      ...p('That is the toolkit. Start with the spine, forms wired in, email sync, tasks, the quote-follow-up sequence, the mobile app, and let the rest earn its way in as volume demands. A handful of features genuinely used beats a full suite genuinely ignored, every time. Now, the habits that keep the machine honest: running it day to day.'),
      {
        type: 'diagram',
        id: 'btc-ch05-spine',
        caption: 'The spine to start with. Day one: wired forms, email sync, tasks, the quote sequence, mobile app. Earned later by volume: scoring, deeper automation, more pipelines.',
      },
    ),
  ),
]

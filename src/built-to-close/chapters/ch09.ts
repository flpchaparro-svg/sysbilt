import type { BtwPage } from '../types'
import { closing, flow, opener, p, realPicture, section } from '../../built-to-work/helpers'

export const ch09Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 9,
    title: 'Your CRM as the hub',
    subtitle: 'The centre the whole business\'s relationships run through.',
  }),

  flow(
    ...p(
      'Everything so far has treated the CRM as a system you look into. It is time to see it the other way, because a properly wired CRM is not a database with a login, it is the hub the whole business\'s relationships run through: the website feeding it, the inbox and calendar syncing to it, the phone logging to it, the proposals flowing from it, the accounting hearing from it, the reports reading from it. This is the chapter that connects the machine, and it is where the calm this book keeps promising actually comes from.',
      'The shift from chapter one is what makes it possible: the wiring that was enterprise plumbing a decade ago now connects willingly and cheaply. Picture the CRM at the centre and the spokes around it, website, email and calendar, phone, quoting, accounting, marketing, reporting. In a business grown the usual way these are islands and a person ferries between them; in a business wired as a hub, the information moves itself, and the compounding difference is chapter one\'s whole argument made physical.',
    ),
    {
      type: 'diagram',
      id: 'btc-ch09-hub',
      caption:
        'The CRM at the centre. CRM as the central node, seven spokes: Website, Email + calendar, Phone, Quoting, Accounting, Marketing, Reporting. Arrows mostly inward (feeding the memory), reporting reading outward. The visual centrepiece of the book.',
    },
  ),

  flow(
    ...section(
      'ONE LEAD',
      'One lead, start to finish',
      ...p(
        'Follow a single lead through the wired version, once, because the journey is the argument.',
        'An enquiry lands on the website at 8:40 on a Tuesday. In that second: the contact exists in the CRM, tagged with source and page; the acknowledgement is in the enquirer\'s inbox; the owner\'s phone has the alert; a deal sits in the first stage with a next step already dated. The call happens within the hour, and the two-line note goes in from the mobile app. Thursday, the quote goes out from the deal record, template filled from the fields, and the moment it sends, the follow-up sequence arms itself and the stage updates. The sequence touches gently over the next fortnight, and stops itself the instant the client replies. The deal is marked won, and in that second: the invoice drafts itself in the accounting system, the onboarding email goes out, the job appears wherever jobs are managed, and the dashboard ticks. Months later, the win-back rhythm inherits the relationship.',
        'Count the human touches: the call, the note, the quote\'s substance, the conversations, everything that needed a person. Count what moved without one: every capture, acknowledgement, alert, log, chase, handover and ledger entry. That ratio is the hub, and it is the difference between a business that runs on memory and one that runs.',
      ),
      {
        type: 'diagram',
        id: 'btc-ch09-one-lead',
        caption:
          'One lead, start to finish. ROW 1 (banner "8:40 Tuesday"): enquiry → contact tagged → acknowledgement sent → owner alerted → deal staged with next step. ROW 2 (the days after): call + carpark note → quote from record → sequence arms itself → client replies, sequence stops → WON → invoice drafts + onboarding sends + dashboard ticks. Human-touch steps marked with a person icon; everything else marked with a gear.',
      },
    ),
  ),

  flow(
    ...realPicture({
      title: 'Underneath the clean journey',
      paragraphs: [
        'That clean journey stays clean because a great deal of engineering keeps it that way, and it is worth seeing the unglamorous truth of it, because this is exactly where a wired business and a demo that worked once part company.',
        'Start with the hand-offs. Every hop in that story, form to CRM, CRM to accounting, deal to sequence, is a message between systems, and messages fail: the receiving system is busy, the connection times out, a rate limit refuses the request. A hobbyist wiring sends once and hopes. A reliable one confirms every delivery, queues what cannot go yet, and retries what did not arrive, because sent and received are different things, and the gap between them is where leads vanish without a sound.',
        'Then the duplicates, chapter four\'s one-human rule under industrial pressure. The same person enquires through the form, then calls, then replies to a sequence from a second email address, and unless the wiring is built to recognise and merge, your best prospect becomes three thin strangers, each getting their own follow-up, which reads from the outside as a business that cannot keep its own house in order. Matching and merging across systems is deliberate logic, built once, earning forever.',
        'Then the quietest danger in this whole series: the automation that stops. A field gets renamed, a platform updates, a credential expires, and a flow dies with no error on any screen. The forms still submit. The board still looks plausible. And nothing has landed for eleven days, discovered as a mysteriously quiet fortnight. The only real defence is monitoring built into the flows themselves, watching not whether systems are up but whether information is actually moving, and raising a hand the moment it is not, which is also why chapter six\'s monthly test lead is not paranoia but procedure.',
        'And beneath it all, the keys. Wiring the CRM to the accounting means granting one system the power to write into another\'s heart, and that power lives in credentials that must be stored, scoped and retired properly, because a leaked key is an open door into your customer records and your ledger at once. Connections built in a hurry share master keys and forget them; connections built properly grant each link only what it needs and keep a register of who can open what.',
        'None of this is visible when it works, which is the point and the peril. The idea is simple; the engineering that makes it true at 8:40 on your busiest Tuesday, and still true in the eleventh month, is not. That is the work, and it decides whether the hub is an asset you trust or a clever thing that fails silently at the worst possible moment.',
      ],
    }),
    {
      type: 'diagram',
      id: 'btc-ch09-sent-not-received',
      caption:
        'Sent is not received. TOP (crossed): system A fires once into a gap, message lost, "hobbyist: send and hope". BOTTOM (gold): system A → queue → confirm → retry loop → system B, "reliable: confirm, queue, retry". Footer: "The gap between sent and received is where leads vanish."',
    },
  ),

  flow(
    ...section(
      'CONNECTIONS',
      'The connections that matter',
      ...p(
        'Beyond the walkthrough, the spokes in the order they usually earn their place. Website to CRM first, always, the front door. Email and calendar sync second, the self-feeding memory. The phone third, calls logged, missed calls caught, for any business that lives by ringing. Quoting and proposals from the record, so the sequence machinery has its trigger. Accounting next, won-to-invoice, the wire owners love most, retyping gone and nothing falling between sales and billing. Marketing tools drawing on the CRM\'s segments, so every campaign is aimed rather than sprayed. And reporting last, reading from everything, the single truthful screen.',
      ),
      {
        type: 'diagram',
        id: 'btc-ch09-spoke-order',
        caption:
          'The order the spokes earn their place. A numbered path: 1 Website in, 2 Email + calendar, 3 Phone, 4 Quoting, 5 Accounting, 6 Marketing, 7 Reporting. Drawn as a build sequence, not a menu.',
      },
    ),
    ...section(
      'OWNERSHIP',
      'The ground you own, one more time',
      ...p(
        'A closing note that echoes every book in this series, because here it has teeth. The hub\'s value is the memory it accumulates, and that memory must live on ground you own: your account, your export rights, your documented configuration. A decade of relationship history is the least replaceable asset the business will ever build. Wire it deep, and hold the keys.',
      ),
    ),
    ...closing(
      'In short',
      ...p(
        'Seen whole, the CRM stops being software and becomes what chapter one promised: the memory of the business, awake, connected, and acting, catching what the website sends, remembering what every conversation adds, chasing what would have gone quiet, and telling the money systems the moment there is money to handle. What remains is the human layer that makes or breaks all of it, the team actually using the thing, and that is chapter ten.',
      ),
    ),
  ),
]

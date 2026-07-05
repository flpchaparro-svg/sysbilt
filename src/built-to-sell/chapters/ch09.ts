import type { BtwPage } from '../types'
import { closing, flow, opener, p, realPicture, section } from '../../built-to-work/helpers'

export const ch09Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 9,
    title: 'Your store as the hub',
    subtitle: 'One order, one second — and everything behind it connected.',
  }),

  flow(
    ...p(
      'Everything so far has treated the store as a shopfront. It is time to see it whole, because a properly built store is not a website with a till attached. It is the hub of a trading business: the centre that inventory, money, fulfilment, marketing and customer memory all connect to and flow through. This is the chapter that shows what that looks like, and why the right store makes the whole business easier to run, not just the selling.',
      'The shift this book opened with is what makes it possible. Connecting systems used to be enterprise work; now the tools speak to each other willingly, and a growing store can run wiring that only chains could afford a decade ago. Picture the store at the centre, and around it: the stock system, the payments, the shipping and fulfilment, the accounting, the customer records, the email and messages, the reporting. In a store run the usual way these are islands, and a person, usually the owner, ferries information between them every day. In a store built as a hub, the information moves itself, and the difference compounds with every order.',
    ),
    {
      type: 'diagram',
      id: 'bts-ch09-hub',
      caption:
        'The store at the centre. STORE as the central node, spokes to: Inventory, Payments, Fulfilment and shipping, Accounting, Customer records, Email and messages, Reporting. Most arrows flow both ways.',
    },
  ),

  flow(
    ...section(
      'ONE ORDER',
      'One order, start to finish',
      ...p(
        'Follow a single order through a properly wired store, once, because seeing the journey shows you what all the wiring is for.',
        'A customer taps buy. In that second: the payment is authorised by the provider and the money\'s journey begins. The stock system decrements the item, everywhere at once, so the last unit cannot be sold twice, online, in person, anywhere. The order lands in fulfilment as a pick-and-pack task, and the confirmation lands in the customer\'s inbox. The sale writes itself into the accounting, invoice raised, revenue recorded, no retyping. The customer\'s record updates, who they are, what they have bought, what that makes them worth. And the dashboard ticks over, so tomorrow morning the owner sees yesterday truthfully without assembling it. One tap by the buyer; six systems, one truth, no hands.',
        'Then dispatch: the label prints, the tracking number flows back through the store to the customer, and the post-purchase sequence begins, the reassurance, the delivery updates, in time the review request, and later still the win-back if they go quiet. The order that took the buyer a second to place has been handled end to end, and every system that needed to know, knows.',
      ),
      {
        type: 'diagram',
        id: 'bts-ch09-one-order',
        caption:
          'One order, one second. BUY tapped → payment authorised → stock decremented everywhere → fulfilment task created → confirmation to customer → sale written to accounting → customer record updated → dashboard ticks. Second row: label prints → tracking flows to customer → post-purchase sequence → review request.',
      },
    ),
  ),

  flow(
    ...realPicture({
      title: 'Underneath the clean journey',
      paragraphs: [
        'That clean journey stays clean only because a great deal is engineered to keep it that way, and in a store the stakes of the plumbing are higher than anywhere else in this series, because here the messages are orders, stock and money.',
        'Start with the one everyone learns the hard way: overselling. Two buyers, one unit, seconds apart, perhaps on different channels, and unless the systems agree fast enough about who got it, both are promised the same item. Preventing it takes sync that is quick, ordered and honest about conflicts, and a decision, made in advance, about which system holds the truth when two disagree. Stores that skip that decision discover it during their busiest hour, which is exactly when the sync is slowest and the stakes highest.',
        'Then the silent failure, the automation-killer this whole series keeps warning about, wearing its most expensive costume. A connection between store and fulfilment breaks quietly, the orders keep arriving, and nothing ships, no error on any screen, just a growing queue of paid customers receiving nothing, discovered days later through angry emails. Or the accounting sync halts and the books drift from reality one sale at a time. The only defence is monitoring built into the flows themselves, watching not whether systems are up but whether the traffic between them is actually moving, and raising the alarm the moment it stops.',
        'Money has its own reconciliation truth. The store\'s record of a day and the payment provider\'s record of the same day should match, and untended, they drift: a refund issued here but not recorded there, a partial return, a currency rounding, a dispute clawed back weeks later. Each is small; unreconciled for a quarter, they become an accounting archaeology project. The engineered version reconciles continuously, flags every mismatch while it is one line, and keeps refunds writing back to stock, books and customer record in one motion.',
        'And underneath it all, the same person arriving as three: guest checkout today, account tomorrow, in-store next month, and unless the systems are built to recognise and merge, your best customer looks like three strangers, each too small to matter. The store that knows them as one person serves them like a regular; the store that does not markets to them like a stranger, forever.',
        'None of this is visible when it works, and that is the point. The idea, everything connected, everything flowing, is simple. The engineering that makes it true on the busiest day of the year, at the moment the sale goes live and the traffic spikes and every system is under load at once, is not. That is the work, and it is the work that decides whether a connected store is an asset you trust or a clever demo that fails on the day it matters most.',
      ],
    }),
    {
      type: 'diagram',
      id: 'bts-ch09-two-buyers',
      caption:
        'Two buyers, one unit. Two buyer icons tapping BUY seconds apart on two channels, converging on a product box labelled "1 left". WITHOUT SYNC: both receive "yours", one receives an apology. WITH SYNC: first receives "yours", second instantly receives "sold out, notify me".',
    },
    {
      type: 'diagram',
      id: 'bts-ch09-three-strangers',
      caption:
        'Three strangers, one customer. Three separate thin records (guest checkout, account, in-store) with a merge arrow into one full record labelled with order history and value. Footer: "The store that knows them as one person serves them like a regular."',
    },
  ),

  flow(
    ...section(
      'MEMORY',
      'To your customer memory',
      ...p(
        'The connection with the longest payoff is the one to your customer records, because a store that remembers sells again. Every order, every enquiry, every conversation lands on one record per human, and from that memory flows everything the mature store does well: the segments that make email relevant, the win-backs timed to real buying cycles, the recognition of your best customers before a discount ever needs to buy them. The list from chapter two was the asset; this is the machinery that grows and spends it.',
      ),
    ),
    ...section(
      'MONEY',
      'To your money',
      ...p(
        'The store-to-accounting connection is unglamorous and beloved by every owner who has it: sales, fees, refunds and payouts flowing into the books automatically, GST handled consistently, the bookkeeping burden of a growing order count staying flat instead of growing with it. The measure of success is a quiet one, the end of the month arrives and the numbers are simply there, already true.',
      ),
    ),
    ...section(
      'CHANNELS',
      'To your channels',
      ...p(
        'And the hub reaches outward: the same catalogue, the same stock truth and the same customer memory feeding every place you sell, the marketplaces, the social shops, wherever the buyers are, so that selling in five places does not mean running five stores. That, the art of being everywhere while owning your centre, is the next chapter.',
      ),
    ),
  ),

  flow(
    ...closing(
      'In short',
      ...p(
        'Seen whole, a store is far more than a page with a buy button. It is the centre of a system that sells, remembers, replenishes, accounts and learns, with every part feeding the others and less and less of it depending on anyone\'s memory or evening hours. That is what becomes possible when a store is built the right way, and it is what makes the next question, where else to sell, an opportunity instead of a burden.',
      ),
    ),
  ),
]

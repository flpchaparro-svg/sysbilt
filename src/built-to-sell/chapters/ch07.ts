import type { BtwPage } from '../types'
import { closing, flow, opener, p, realPicture, section } from '../../built-to-work/helpers'

export const ch07Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 7,
    title: 'Keeping it healthy, legal and fast',
    subtitle: 'Money and personal data make the maintenance bar higher.',
  }),

  flow(
    ...p(
      'A store is a living thing that handles other people\'s money and information all day, which puts its maintenance in a different weight class from an ordinary website\'s. Most of this layer runs out of sight, and you do not need to do most of it yourself. You do need to know what it is, what good looks like, and where the law has quietly raised the floor, because in Australia it has, in ways that catch store owners out.',
    ),
    ...section(
      'WHO DOES WHAT',
      'What runs in the background, and what you touch',
      ...p(
        'The clean line holds here as everywhere: on one side, the technical care, patching, monitoring, backups of your data, the platform\'s own upkeep, that should simply be handled; on the other, the content and commercial decisions that are yours. The store-specific addition to the background layer is transactional monitoring: not just is the site up, but are orders flowing, are payments succeeding, did the overnight sync run. A store can be perfectly online and completely broken, and only monitoring that watches the money-path knows the difference.',
      ),
      {
        type: 'diagram',
        id: 'bts-ch07-what-runs-underneath',
        caption:
          'What runs underneath, and what you touch, store edition. BELOW the line, "handled for you": patching, monitoring the money-path, backups, platform upkeep. ABOVE the line, "yours": prices, content, policies, the app-and-widget restraint. The store addition labelled below the line: "transactional monitoring: are orders and payments actually flowing".',
      },
    ),
  ),

  flow(
    ...section(
      'SPEED',
      'Speed is revenue',
      ...p(
        'Everything true about website speed is truer with a checkout attached, because in a store every second of delay is measurable in abandoned carts. The heavy pages in a store are predictable, product images, endless scrolling collections, third-party scripts that pile up over the years, and keeping them fast is ongoing work, not a launch-day setting. The owner\'s part is restraint: every app, widget and tracking pixel added to the store carries a speed cost, and the quarterly question is which of them still earns its keep. A store accumulates plugins the way a drawer accumulates cables, and someone has to be willing to throw the dead ones out.',
      ),
    ),
    ...section(
      'STAGING',
      'Staging, backups and the sale-day rule',
      ...p(
        'Changes to a live store get tested on a private copy first, always, and doubly so in the weeks that matter, because the worst possible time to discover a broken theme update is the first morning of your biggest sale. The professional rule is a change freeze before major trading periods: the store is tested, then left alone. Backups follow the chapter two doctrine, your catalogue, customers, orders and customisations exported regularly to somewhere you control, tested occasionally so restore is a fact rather than a hope.',
      ),
    ),
  ),

  flow(
    ...section(
      'GUARANTEES',
      'The legal floor: consumer guarantees',
      ...p(
        'Now the law, plainly, because Australian consumer law is generous to buyers and blunt with stores that get it wrong, and the rules apply to every online sale.',
        'When you sell a product, the law itself guarantees it: acceptable quality, matching its description, fit for the purpose the buyer told you about. These guarantees are automatic, and no policy, sign or checkbox can remove them, a store cannot write no refunds anywhere, because the words themselves are unlawful, implying rights the customer cannot lose. When a product has a major problem, the customer chooses the remedy, refund or replacement, and you cannot send them to the manufacturer or insist on repair after repair. Minor problems you may fix, promptly and free. Final sale and outlet items carry the same guarantees, sale price does not mean sold as-is.',
        'What the law does not require is change-of-mind refunds. You can choose to offer them, and many good stores do because generous returns sell, but the moment you publish a returns policy, you must honour it exactly as written. The clean position for a premium store: a plain, honest returns page that states your change-of-mind policy, and never says a word that narrows the guarantees the law already gave. Have a lawyer read the final wording before it ships, cheap insurance against expensive sentences.',
      ),
      {
        type: 'diagram',
        id: 'bts-ch07-product-problem',
        caption:
          'When a product has a problem. A plain decision path. Start: "Product has a problem" → branch MAJOR: "Customer chooses: refund or replacement" → branch MINOR: "You fix it, promptly and free". A separate branch: "Change of mind" → "Your policy applies, and you must honour it as written". Footer: "These guarantees cannot be signed away or signed out of."',
      },
    ),
  ),

  flow(
    ...section(
      'PRICING',
      'The legal floor: honest prices and honest claims',
      ...p(
        'The second pillar is pricing honesty, and the principle is single and simple: the price a buyer sees first is the price they can actually pay. Unavoidable fees belong in the advertised price, not revealed at the checkout, the practice known as drip pricing, and it is treated as misleading conduct. Delivery estimates must be genuine. Was/now prices must reflect a price actually charged. Claims about products, materials, origins, benefits, must be true and provable.',
        'And one change worth knowing arrived recently: surcharging card payments on the major networks has come to an end, by regulator decision, with card costs now expected to live inside the sticker price rather than appearing as a fee at payment. The direction of all of it is the same and worth internalising rather than memorising: the total, honest cost, up front. Which, conveniently, is exactly what chapter three said sells best, the law and good conversion practice have converged on the same sentence.',
      ),
      {
        type: 'diagram',
        id: 'bts-ch07-honest-price',
        caption:
          'The honest price. LEFT (crossed through): a small advertised price with fees stacking up at checkout, labelled "drip pricing, unlawful". RIGHT (clean, gold-accented): one price tag labelled "the full price, up front", with a line beneath: "the law and good conversion agree".',
      },
    ),
    ...section(
      'CONSENT',
      'The legal floor: reviews, privacy and consent',
      ...p(
        'Three more lines, briefly. Reviews must be real: writing them, buying them, or publishing only the good ones while quietly suppressing the bad is misleading conduct, and platforms and regulators both hunt for it. Privacy follows the wider law covered in this series: be open about what you collect, protect it properly, and lean on information customers give you willingly, and note that a store, holding names, addresses, purchase histories and payment records, has more to protect than most. And every marketing message follows the permission rules: consent to receive it, clarity about who sent it, and an unsubscribe that works, first time.',
      ),
    ),
  ),

  flow(
    ...realPicture({
      title: 'Underneath one second of paying',
      paragraphs: [
        'It is worth seeing what actually sits underneath the one second in which a customer pays you, because "we take payments" hides a stack of machinery that someone has to keep standing, and the difference between a store that handles money properly and one that merely appears to shows up exactly here.',
        'Start with the card details themselves. The global security standard for handling them is strict enough that the correct answer for almost every store is architectural: never possess them. The properly built checkout is a carefully engineered hand-off, the buyer\'s card details travel encrypted to a specialist provider, are vaulted there, and your systems receive back only a token and a verdict. Getting that hand-off right, and keeping it right through every theme change and platform update, is real work, because one careless customisation that starts logging what it should not turns a compliant store into a liability without anything visibly breaking.',
        'Then the verdict itself. In the second after the buyer taps pay, a chain of systems confers: the provider screens the transaction against fraud patterns, the card\'s bank approves or declines, address and card checks run, and increasingly a step called strong authentication may challenge the buyer to confirm it is really them. Each layer stops losses, and each layer, tuned wrongly, blocks real customers, too strict and good orders die at the door, too loose and stolen cards walk through. Tuning that balance is a quiet, ongoing craft, reviewed against the store\'s actual decline and fraud numbers rather than set once and forgotten.',
        'And then the part nobody sees until it hurts: the disputes. When a cardholder challenges a charge, months after the sale, the store must answer with evidence, the order, the delivery confirmation, the correspondence, inside strict deadlines, or lose by default. A store that keeps clean records wins the winnable ones almost automatically. A store that does not simply pays, again and again, and never learns why.',
        'None of this is here to worry you. It is here to be honest that the calm, instant, tap-and-done experience your customer has is produced by engineered machinery and maintained vigilance, and that when a store is built properly, all of it is carried for you. The customer feels one second. The system underneath earns it.',
      ],
    }),
    {
      type: 'diagram',
      id: 'bts-ch07-one-second-paying',
      caption:
        'One second of paying. A horizontal micro-timeline of the second after "Pay" is tapped: encrypted hand-off → fraud screening → bank verdict → (occasional) buyer challenge → "Paid". Beneath, a parallel note: "months later, a dispute may ask for the evidence", pointing to a folder icon labelled "clean records win".',
    },
  ),

  flow(
    ...section(
      'ACCESSIBILITY',
      'Accessibility, still',
      ...p(
        'Everything about accessibility from the wider law applies to stores with the same force, the recognised standard, the obligation reaching private business, the one in five Australians it serves, with one addition worth naming: a checkout that cannot be completed with a keyboard or a screen reader is not just non-compliant, it is a till that a share of your customers physically cannot reach. Building to the standard is protection and reach in the same move.',
      ),
    ),
    ...closing(
      'In short',
      ...p(
        'The floor is higher for a store because the stakes are: money, personal information, and promises made at scale. Kept properly, none of it is burdensome, most of it is automatic, and all of it points the same direction as good selling: honest, fast, safe, and clear. With the machine sound, the question becomes the one every owner asks next, how do buyers find it, and that is chapter eight.',
      ),
    ),
  ),
]

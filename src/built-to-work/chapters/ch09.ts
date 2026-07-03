import type { BtwPage } from '../types'
import { flow, opener, p, section, closing, realPicture } from '../helpers'

export const ch09Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 9,
    title: 'Your website as the hub',
    subtitle:
      'A properly built website is not an island. It is the centre your whole business runs through.',
  }),

  flow(
    ...p(
      'Everything so far has treated your website as a single thing. It is time to see it differently, because a properly built website is not an island. It is the hub of your entire business, the centre that everything else connects to and runs through. This is the chapter that opens up what a website is truly capable of when it is built the right way, and it is the reason the right website makes the whole of your business easier to run, not just your marketing.',
      'This is also where the shift this book opened with becomes concrete. The reason a website can now be the hub, rather than just a brochure, is that connecting systems to each other has become genuinely achievable, where it was once specialist and expensive. The tools speak to one another more easily than they ever have. That is the opportunity.',
    ),
  ),

  flow(
    ...p(
      'Picture your website at the centre, and around it the other parts of your business, your customer records, your follow-up, your reporting, your phone, your content, your social presence. In a business that has grown the usual way, these sit apart, each in its own tool, none of them talking to the others. In a business built around a proper website, they are all wired to that centre, and information flows between them without anyone moving it by hand. That picture, the hub and everything connected to it, is what this chapter is about.',
    ),
    {
      type: 'diagram',
      id: 'hub-spoke',
      caption: 'Your website at the centre, everything plugged into it.',
    },
  ),

  flow(
    ...section(
      'ONE SYSTEM',
      'One system, not ten tools',
      ...p(
        'Here is the difference it makes, and it is bigger than it sounds. Most businesses end up with a drawer full of disconnected tools. One place holds the website, another the customer list, another the email, another the bookings, another the numbers. Each was added to solve a problem, and none of them speaks to the rest. So the owner, or a member of staff, becomes the glue, copying details from one into another, chasing information across half a dozen logins, and losing things in the gaps.',
        'A connected system removes that work entirely. When the website is the hub and everything runs through it, a lead captured on the site appears in the customer list on its own, the follow-up begins without anyone starting it, and the numbers update themselves. The information moves so the people do not have to. In the early days, when the business is small, the difference feels minor. As it grows, it becomes the difference between a business that scales smoothly and one that drowns in its own admin. This is the quiet, compounding reason to build properly. Not just a better website, but a business that runs itself a little more with every passing month.',
      ),
    ),
  ),

  flow({
    type: 'pullQuote',
    text: 'Not just a better website, but a business that runs itself a little more with every passing month.',
  }),

  flow(
    ...section(
      'THE CRM',
      'To your customer records',
      ...p(
        'The first and most important connection is to the place your customers and leads are kept, your customer record system. This is the memory of your business, and the website feeds it automatically.',
        'Every enquiry the site captures, a form, a message, a booking, lands here as a named contact. It does not arrive as a bare name, either. It is tagged with the page it came from, the campaign or link that brought the person in, and what they were looking at, so each contact carries the story of how they found you. When someone who has been before returns and enquires again, a well-built connection recognises them and adds to their existing record rather than starting a second one, so their history stays in one place. Nothing is lost, nothing has to be typed in, and nothing slips through because someone was busy. Over time this builds something valuable, a complete and growing record of everyone who has ever shown interest in your business, exactly how they found you, and every step they have taken since. That record is the foundation for following up properly, for understanding which marketing actually works, and for never letting a lead go cold because it arrived at a busy moment. The website catches the lead. The customer record keeps it. Together they make sure that interest, once shown, is never wasted.',
      ),
    ),
  ),

  flow(
    ...section(
      'AUTOMATION',
      'To automation',
      ...p(
        'Once the website and the customer record are connected, something more powerful becomes possible. The system can act on its own. This is automation, and it means the routine work that follows an enquiry happens without anyone doing it.',
        'It works on simple rules. When this happens, do that. A visitor fills in a form, and they immediately receive a warm acknowledgement while you are alerted to follow up. Someone makes a booking, and a reminder is sent the day before so they actually turn up. A person spends real time on a particular service page, and the system can note that interest and flag it. The real power is that these rules can branch and stack, so a new enquiry can be handled differently depending on what the person asked for, where they came from, or whether they are already a customer, each path taken care of correctly without anyone deciding it in the moment. Every one of these is a small task someone would otherwise have to remember and do, and each is now handled the instant it needs to be, reliably, every time. Automation is what turns a website from something that simply collects enquiries into something that responds to them, the moment they happen, while you get on with the work. It is the difference between a site that takes messages and a site that actually moves people forward for you.',
      ),
    ),
  ),

  flow(
    ...section(
      'UNDER THE HOOD',
      'One enquiry, start to finish',
      ...p(
        'It is worth following a single enquiry from beginning to end, once, because seeing how it actually travels shows you what a properly wired website really is.',
        'A visitor fills in a form on your site and presses send. In that instant, the website does not just email you. It sends the details, in the background, to your other systems through a connection called a webhook, which is a way for one tool to pass information to another the moment something happens. The customer record receives those details and creates a new contact, tagging them with the page they came from. That new contact triggers the next step, an instant acknowledgement to the visitor and an alert to you, so the person hears back within moments rather than hours. At the same time, that enquiry is counted in your reporting, so the leads from that page update on your dashboard without anyone recording it. One action by the visitor, and the website, the customer record, the follow-up, and the reporting all respond together, in about a second, with no one lifting a finger.',
      ),
    ),
  ),

  flow(
    ...p(
      'That is one enquiry. Now imagine it happening for every enquiry, every booking, every message, day and night, without fail.',
    ),
    {
      type: 'diagram',
      id: 'one-enquiry-flow',
      caption: 'One enquiry, start to finish.',
    },
  ),

  flow(
    ...realPicture({
      title: 'What it takes to make one sentence true every time',
      paragraphs: [
        'That clean story only stays clean because a great deal is engineered to keep it that way, and this is the part almost no one sees. It is worth showing, because it is exactly where the difference between a connection that works in a demonstration and one that works every day actually lives.',
        'Take the moment the website passes that enquiry on. It passes it once. If the system meant to receive it is busy, slow, or briefly offline in that instant, and every system has its moments, the message is simply gone, and no one is told. A reliable setup never assumes the message arrived. It confirms it, and when confirmation does not come, it waits and tries again, because sent and received are not the same thing, and the gap between them is where leads disappear.',
        'Then there are limits. The systems you connect to will only accept so many requests in a given window, and once you cross that line they begin refusing, completely and without apology. On a slow day you would never know. On the day a campaign lands and enquiries arrive in a rush, an unprepared connection hits that ceiling and starts dropping the very leads you paid to bring in. Handling it means holding requests in an orderly queue and feeding them through at a pace the other system will accept, so a busy day becomes a good problem rather than a silent loss.',
        'There is the same person arriving twice. Someone enquires, then books, then sends a message, and unless the system is built to understand that these are one person and not three, the record fills with duplicates and your follow-up emails the same individual several times over, which to a discerning client reads as a business that cannot keep its own house in order. Preventing it takes deliberate logic that matches and merges people as they come in.',
        'And there is the quietest danger of all. An automation can stop. A field gets renamed, a connected system updates, something downstream shifts, and the chain breaks with no error on the screen and no alarm in the room. The site looks perfectly fine. The forms still submit. But nothing is landing where it should, and a business can lose weeks of leads to that silence before anyone thinks to check. The only real defence is monitoring built into the system itself, watching that information is genuinely flowing and raising a flag the moment it stops.',
        'Beneath all of it sits security. Connecting your website to your customer records means granting the website permission to write into the heart of your business data, and that permission is held as a set of credentials that have to be stored and handled with real care, because a credential that leaks is an open door into everything. It is why these connections are built with secure, properly managed access, not wired together in a hurry.',
        'None of this is here to alarm you. It is here to be honest about what sits beneath a single, simple sentence: the enquiry lands in your system. The idea is genuinely simple. The engineering that makes it true every time, under load, at two in the morning, when something it depends on is having a bad night, is not. That is the work, and it is the work that decides whether a connected website is an asset you can trust or a clever-looking thing that fails quietly at the worst moment.',
      ],
    }),
    ...p(
      'You never see any of this, and that is the entire point. The complexity is real, and we carry it, so that from where you sit a lead arrives, the follow-up happens, and the system works. Making something genuinely complicated feel effortless to the person relying on it is not a sign that it was easy. It is the whole of the craft.',
    ),
  ),

  flow(
    ...section(
      'REPORTING',
      'To reporting and dashboards',
      ...p(
        'All of this activity produces information, and that information is worth seeing. Connected to your reporting, your website tells you not just how many people visited, but what they did, where they came from, which pages drew them in, and, crucially, where they slipped away.',
        'This is where guesswork ends. Instead of wondering which marketing is working, you can see it. Instead of assuming people are enquiring, you can watch where on the site they stop and leave, and fix it. Tools that read this behaviour show you the path visitors take and the point at which they hesitate, turning a vague sense that the site could do better into a clear list of what to improve. Pulled together onto a single dashboard, the numbers from every part of the system sit in one view, so you can tell at a glance how the business is actually performing rather than piecing it together from memory. A website that reports back is a website you can improve on purpose, rather than hoping it is doing its job.',
      ),
    ),
  ),

  flow(
    ...section(
      'PHONE & ASSISTANT',
      'To your phone and your assistant',
      ...p(
        'Your website does not only connect to your screens. It connects to your conversations. The chat assistant on your site, the phone calls you take, and the messages people send can all be tied into the same single thread, so a person is recognised across every way they reach you.',
        'In practice, this means the assistant that answers a question at midnight, the visitor who left an enquiry, and the call that comes in the next morning can all be understood as the same person, with their history attached, rather than three disconnected strangers. The caller is not starting from scratch, because the system already knows they were on your site looking at a particular service the night before. This is where the website meets the deeper world of assistants and call handling, which is a subject large enough to have a guide of its own, so we will not go further into building it here. What matters for now is the principle. Every conversation, on every channel, can feed the same single picture of the customer, so you are always speaking to a person you already understand, not a name you have never seen.',
      ),
    ),
  ),

  flow(
    ...section(
      'CONTENT',
      'To your content',
      ...p(
        'There is one more connection, and it runs the other way. The website does not only receive, it broadcasts. It is the home of your voice, the place where how your business sounds and looks is set, and everything you publish elsewhere flows out from it.',
        'An article written for your site becomes the source for posts across your social channels, for an email to your list, for material your team can draw on. The website holds the definitive version, and the rest are extensions of it, all consistent because they came from the same place. This matters because a business that says one thing on its website, something different on social, and something different again in its emails feels scattered and uncertain. A business whose every word traces back to one clear source feels deliberate and trustworthy. The website is that source. Build your voice there, properly, once, and everything else you put out into the world carries it without effort.',
      ),
    ),
  ),

  flow(
    ...section(
      'THE ONES WHO LEAVE',
      'Catching the ones who leave',
      ...p(
        'Most of this chapter has been about the people who reach out. But the truth of any website is that the majority of visitors leave without making contact at all. A properly connected site gives you ways to recover some of them, which most businesses never even realise is possible.',
        'The first is call tracking, which ties every phone enquiry back to the part of your marketing that produced it, so you finally know which channels are making the phone ring rather than guessing. The second is more striking. There are tools that can identify a meaningful share of the businesses visiting your site, even when they never fill in a thing, surfacing the companies showing interest so you can follow up with them directly. Neither of these turns every lost visitor into a lead, and nothing could. What they do is widen the net beyond the small fraction who happen to make contact, so the interest that would otherwise vanish without trace becomes something you can see and act on. For a business that takes its growth seriously, that is an edge most competitors do not have.',
      ),
    ),
  ),

  flow(
    ...section(
      'OWNED VS RENTED',
      'The ground you own, and rented land',
      ...p(
        'It is worth stepping back to see why the website deserves to be the centre of all this, rather than your social media or anything else. The reason is ownership.',
        'Your website is ground you own. You control it, it cannot be taken from you, and everything you build into it is yours. Your presence on social platforms is rented land. It can be useful, but you do not own it, the rules can change overnight, an account can be restricted or lost, and the audience you built there was never truly yours. The sensible way to treat the two is to let the rented land point back to the ground you own. Social media draws attention and sends people to your website, where they become a contact in your own system, on a platform you control, that no one can switch off. Lean too heavily on rented land and you are building your business on someone else\'s property. Make the website the hub and the asset, and let everything else feed it, and what you build actually belongs to you.',
      ),
    ),
    {
      type: 'diagram',
      id: 'owned-vs-rented',
      caption: 'Ground you own, and rented land.',
    },
  ),

  flow(
    ...section(
      'YOUR OWN DATA',
      'Your own data',
      ...p(
        'This connects to one last shift worth understanding. For years, much of the web ran on tracking that followed people around the internet, the invisible pixels that watched behaviour across many different sites. That era is ending, as both the rules and the technology turn against it, and businesses that depended on it are losing their grip on who their customers are.',
        'The answer, and the advantage, is your own data. Information that people give you directly, an enquiry, a download, a booking, a subscription, captured into your own system, is yours to keep and yours to use, and it does not depend on tracking that is disappearing. A connected website is, more than anything, a machine for gathering this kind of information honestly and continuously. While other businesses scramble to replace what they have lost, the one with a properly built website has been building its own record of its own customers all along. That is the most durable asset of all, and it is exactly what the hub is for.',
      ),
    ),
  ),

  flow(
    ...closing(
      'In short',
      ...p(
        'Seen this way, a website is far more than a page on a screen. It is the centre of a system that captures, remembers, responds, reports, and grows, with every part feeding the others and less and less depending on you to hold it together. That is what becomes possible when a website is built the right way, and it is why the right one makes the whole business easier to run. A system like this is not built all at once, though. It grows, piece by piece, in a sensible order. Knowing what to add and when is the subject of the next chapter.',
      ),
    ),
  ),
]

import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../helpers'

export const ch05Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 5,
    title: 'Your features',
    subtitle: 'Your website is built from small machines. Each one has a job to do.',
  }),

  flow(
    ...p(
      'This is the chapter you\'ll come back to. Your website is built from features, and each one is a small machine with a job to do. Most sites treat features as boxes to tick, a form here, a gallery there, with no thought to what each is actually for. We treat every feature as a worker that has to earn its place. Many of these were once expensive, specialist additions. The shift this book opened with, cheaper tools and capable artificial intelligence, is what has brought them within reach of an ordinary business, which is part of why the website can now do so much more than it used to.',
      'For each feature, the same four things: what it is, what it does for your marketing and conversion, how you use it day to day, and where it can grow next. You will not need all of them. Take the ones that fit your business and leave the rest.',
    ),
    { type: 'featureIntro' },
    {
      type: 'diagram',
      id: 'every-feature-four-ways',
      caption: 'Every feature, four ways.',
    },
  ),

  flow(
    {
      type: 'featureCard',
      title: 'Contact form, wired to your CRM',
      what: 'A contact form is the simplest way for someone to reach you in writing, a few fields and a button. The words that matter are "wired to your CRM". A form on its own just sends you an email that can be missed or buried. Wired properly, every submission lands automatically in your customer system, tagged with the page it came from, as a named lead you can act on.',
      does: 'This is the workhorse of lead capture, and the tagging does quiet, valuable work. Over time it shows you which pages and which marketing actually bring enquiries, so you stop guessing about what is working.',
      use: 'You do not manage the form itself. You action what arrives, each enquiry sitting in one place with its context attached, ready for a reply.',
      next: 'From here it connects to automation, so a new enquiry can trigger an instant acknowledgement to the sender and an alert to you. We cover that wiring later in the book.',
    },
    {
      type: 'featureCard',
      title: 'Booking calendar',
      what: 'A booking calendar lets a visitor choose a time and book it themselves, without the back and forth of emails or phone tag. It shows your real availability and writes the appointment straight into your calendar.',
      does: 'Its value is that it removes friction at the exact moment someone is ready to commit. A visitor who has to wait for you to reply to arrange a time is a visitor who can cool off or book a competitor instead. Self-booking captures them while the intent is strong.',
      use: 'You use it by keeping your availability accurate, and the bookings simply appear.',
      next: 'From here it can send automatic reminders that cut no-shows, and it can sit behind a qualifying step so only the right enquiries reach your calendar.',
    },
  ),

  flow({
    type: 'featureCard',
    title: 'AI chat with handoff to a human',
    what: 'This is a chat window on your site that can answer common questions instantly, at any hour, and hand the conversation to a person when it needs to. It is not a clumsy bot reading from a script. A well-built assistant understands what is being asked, answers in your voice, and knows when to step aside.',
    does: 'What it does for you is meet visitors in the moment they have a question, which is often the moment they decide whether to go further. It answers the routine things so a person does not have to, and it captures the visitor\'s details in the process, turning a passing question into a lead.',
    use: 'You use it by reviewing the conversations it has and the leads it captures. There is real depth to building an assistant like this, enough that it has a guide of its own.',
    next: 'The next step beyond chat is an assistant that answers the phone too, a voice agent that can field a call, answer questions, book an appointment, and log it all to your records, which is a subject for that separate guide. On the website, though, the job is simple. Answer, help, capture, and hand over when a human is needed.',
  }),

  flow(
    {
      type: 'featureCard',
      title: 'Click-to-WhatsApp and SMS',
      what: 'These are buttons that open a direct message to you, on WhatsApp or by text, with a single tap. For many people, sending a quick message feels far easier than filling in a form or making a call.',
      does: 'Their value is meeting people on the channel they already live in. A visitor who would never complete a form will happily fire off a one-line message, and that message is a conversation you can turn into work.',
      use: 'You use them by replying as you would to any message, ideally quickly.',
      next: 'From here they can feed into the same system as your other enquiries, so a message is logged as a lead rather than living only in your phone.',
    },
    {
      type: 'featureCard',
      title: 'Blog and insights',
      what: 'A blog, or an insights section, is where you publish useful articles for the people you want to reach. Not diary entries, but answers to the real questions your prospective clients are asking.',
      does: 'It does two jobs at once. It gives search engines and AI assistants fresh, relevant content to show people, which is a large part of how you get found, and it builds your authority, so a visitor who reads a sharp, helpful piece thinks of you as the expert before they have even spoken to you.',
      use: 'You use it by publishing on a steady rhythm, which we cover in the next chapter and again when we get to getting found.',
      next: 'Each piece is also a seed for everything else, since a single article can become posts, an email, and material your team draws on. The website is where it all begins.',
    },
  ),

  flow(
    {
      type: 'featureCard',
      title: 'Lead magnet and gated download',
      what: 'A lead magnet is something useful you offer in exchange for a visitor\'s contact details, a guide, a checklist, a short report. The download is gated, meaning the visitor gives an email to receive it.',
      does: 'Its purpose is to capture the people who are interested but not yet ready to enquire. They are not going to call today, but they will trade an email for something valuable, and that gives you permission to stay in touch until the timing is right.',
      use: 'You use it by having something worth wanting and letting the system collect the details.',
      next: 'From here those contacts can flow into a follow-up sequence, so interest does not go cold while a prospect makes up their mind.',
    },
    {
      type: 'featureCard',
      title: 'Interactive tools, estimators and quizzes',
      what: 'These are small tools a visitor can use on your site, an estimate of cost or scope, an instant indicative quote, a short quiz that points them to the right service. They invite the visitor to do something rather than just read.',
      does: 'They earn their place in two ways. They are far more engaging than a static page, so people stay and take part, and they qualify the visitor as they go, telling you about the person\'s needs before the first conversation. The detail that turns one of these from a clever toy into a lead generator is where you place the result. Rather than handing back the full answer on the page for free, the tool gathers the visitor\'s details and delivers the result to them, so a person who has just told you about their project and what they are after becomes a named, qualified lead rather than an anonymous visitor who clicks away.',
      use: 'You use it by acting on those qualified enquiries, already knowing a great deal about what the person wants.',
      next: 'These tools take more thought to build than a simple form, and they reward it, because a visitor who has invested a minute interacting is far closer to becoming a client.',
    },
  ),

  flow(
    {
      type: 'featureCard',
      title: 'Structured data',
      what: 'Structured data is invisible to your visitors and increasingly important to everyone else. It is a way of labelling the information on your site, your business details, your services, your reviews, your prices where you show them, so that search engines and AI assistants can read it precisely rather than guessing.',
      does: 'Its value has grown sharply, because the systems that decide whether to show you, and whether to recommend you in an AI answer, rely on being able to understand your information cleanly. A site with proper structured data is easier for them to read, trust, and present, which can mean appearing as a rich result with your reviews or details shown, and being more likely to be cited when an assistant answers a question.',
      use: 'You do not touch any of this. We add it, correctly, to the pages where it counts.',
      next: 'The natural next step is labelling more of your information this way as the site grows, your individual services, your frequently asked questions, your team, so that more of what you offer is legible to the machines that now sit between you and your customers.',
    },
    {
      type: 'featureCard',
      title: 'Reviews and testimonials, as a system',
      what: 'Most sites paste a few testimonials in once and leave them there to age. Treated as a system, reviews are gathered continuously and shown where they do the most good, so your proof is always current and always growing.',
      does: 'Their value is trust, the single most persuasive thing on any site. A steady flow of recent, genuine reviews answers a visitor\'s doubt more convincingly than anything you can say about yourself. The system matters because reviews gathered by chance dry up, while reviews gathered on a process keep coming.',
      use: 'You use it by prompting happy clients to leave a review at the right moment, which can be made almost automatic.',
      next: 'From here those reviews can surface across the site and feed your presence on places like your business profile, where they pull in people who have not even reached your site yet.',
    },
  ),

  flow(
    {
      type: 'featureCard',
      title: 'Gallery and portfolio',
      what: 'A gallery or portfolio shows your work, finished projects, results, the things you are proud of. For any business whose quality is visible, this is where you prove it.',
      does: 'Its job is to turn a claim into evidence. Telling a visitor you do excellent work is weak. Showing them is strong. Real images of real work let the visitor judge for themselves and picture what you could do for them.',
      use: 'You use it by keeping it current, adding your best recent work and retiring the tired older pieces.',
      next: 'From here strong images do double duty, carrying your marketing across social channels and back to the site, so the work that wins clients is seen by as many of the right people as possible.',
    },
    {
      type: 'featureCard',
      title: 'Video, done right',
      what: 'Video can be the most persuasive thing on a page, but only when it is handled properly. Done right means it loads without slowing the page, plays silently until a visitor chooses sound, and carries captions and a written transcript so it works for everyone and can be found in search.',
      does: 'Its value is connection. A short, well-made video lets a visitor see and hear you, which builds trust faster than text alone, and a clear explainer can do the work of a whole page in under a minute.',
      use: 'You use it by featuring the right video in the right place, an introduction on the about page, a service explained on its own page.',
      next: 'Handled carelessly, video makes a site slow and clumsy. Handled well, it is the closest a visitor gets to meeting you before they make contact.',
    },
  ),

  flow(
    {
      type: 'featureCard',
      title: 'Pop-ups, triggered by behaviour',
      what: 'A pop-up is a message that appears over the page, often an offer or a prompt to act. The difference between one that works and one that annoys is timing. Triggered by behaviour means it appears in response to what the visitor does, not the second they arrive, and not on every page.',
      does: 'Used with judgement, it catches attention at a useful moment, as someone is about to leave, or once they have shown real interest, and offers them a reason to stay or to act. Used badly, it interrupts people the moment they land and trains them to close the site.',
      use: 'You use it by choosing the right offer and the right trigger, then leaving it to do its work.',
      next: 'From here what it captures flows into the same lead system as everything else, so a pop-up earns its keep rather than just getting in the way.',
    },
    {
      type: 'featureCard',
      title: 'Click to call',
      what: 'On a phone, a click-to-call button turns your number into a single tap that places the call. No copying, no dialling, no chance to lose the number along the way.',
      does: 'It seems small, and it removes a real point of friction. The visitor ready to speak to you right now is the most valuable visitor you have, and every extra step between them and the call is a chance to lose them. One tap keeps that moment.',
      use: 'You use it by answering.',
      next: 'Track those calls so you know which part of your marketing made the phone ring, which we come back to in the connections chapter.',
    },
  ),

  flow(
    {
      type: 'featureCard',
      title: 'FAQ',
      what: 'A frequently asked questions section answers the things people always want to know, plainly and in one place, how you work, your timelines, what to expect, the concerns that come up before someone commits.',
      does: 'It does more than save you repeating yourself. A good FAQ removes the small doubts and unknowns that stop people acting, so a visitor with a lingering question finds the answer and moves forward instead of clicking away. Written well, it can also help you get found, because the questions people ask a website are often the exact questions they ask a search engine or an AI assistant, in almost the same words.',
      use: 'You use it by keeping it honest and current, adding the real questions you hear from clients.',
      next: 'It is one of the simplest features to build and one of the most quietly effective.',
    },
    {
      type: 'featureCard',
      title: 'Dynamic content and personalisation',
      what: 'This is one of the newer advantages, and it is where the design edge and the technical edge meet. A static page shows the same thing to everyone. A page with dynamic content can adapt what it shows based on what is known about the visitor.',
      does: 'In practice that can be modest and still powerful. A returning visitor can be greeted differently from a first-time one. The message or offer in the hero can shift depending on which advertisement or link a visitor arrived through, so someone who clicked an ad about a particular service lands on a page that speaks directly to that service rather than a generic welcome. The location named in a heading can match where the visitor actually is. None of this asks the visitor to do anything, and all of it makes the page feel more relevant, which lifts the chance they act.',
      use: 'You do not manage it moment to moment. It runs on rules set up once.',
      next: 'It is not essential on day one, and it is the kind of advanced layer that separates a site built for now from one built only for the way things used to be done.',
    },
  ),

  flow(
    {
      type: 'featureCard',
      title: 'Speed to lead',
      what: 'Speed to lead is less a feature you see and more a result you feel. The moment an enquiry comes in, the system responds, sending the visitor an instant acknowledgement and alerting you straight away, so a fresh lead is contacted in minutes rather than hours.',
      does: 'This matters more than almost anything else on the list. Interest fades fast, and the business that responds first is very often the business that wins the work, simply because it got there while the person was still paying attention. A lead that waits until tomorrow is frequently a lead already lost to someone quicker.',
      use: 'You use it by being ready to follow up on the alert, while the automatic acknowledgement holds the visitor\'s attention for you.',
      next: 'It turns the speed of your systems into a real advantage, doing for you automatically what a competitor is still doing by hand.',
    },
    {
      type: 'diagram',
      id: 'speed-to-lead-timeline',
      caption: 'Speed to lead, in under a minute.',
    },
  ),

  flow(
    ...section(
      'CHOOSING',
      'Choosing what you actually need',
      ...p(
        'That is the toolkit. You will not use every feature, and you should not try to. The skill is choosing the few that fit how your business wins work, building those properly, and leaving the rest. A handful of features doing their job well will always beat a site stuffed with every option and mastering none. Once the right features are in place, the question becomes how you run them, which is where we go next.',
      ),
    ),
  ),
]

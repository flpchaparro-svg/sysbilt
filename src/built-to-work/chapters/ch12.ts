import type { BtwPage } from '../types'
import { flow, opener, p, section, glossary } from '../helpers'

export const ch12Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 12,
    title: 'Glossary, and who to call',
    subtitle:
      'The plain meaning of every term in this book, and a note on getting help when you want it.',
  }),

  flow(
    ...p(
      'This last chapter is a reference rather than a read. The web is full of jargon, and this book has tried to avoid it, but a few terms are worth knowing plainly so you are never left nodding along to something you do not follow. What follows is a plain-English glossary of the words used in this book, and a short note on what ongoing support looks like and when to reach for it.',
    ),
    ...glossary(
      {
        title: 'A plain-English glossary',
        intro:
          'The few terms worth knowing plainly, so you are never left nodding along to something you do not follow.',
      },
      [
        {
          term: 'Alt text',
          definition:
            'A short written description of an image, added behind the scenes. It lets people who cannot see the image understand it, and helps search engines know what it shows.',
        },
        {
          term: 'API key',
          definition:
            'A credential that lets two systems connect and talk to each other automatically, like a key one tool uses to open another. It needs to be stored securely, because anyone who has it can use the access it grants.',
        },
        {
          term: 'Automation',
          definition:
            'Routine tasks happening on their own, triggered by something a visitor does. For example, an enquiry automatically sending an acknowledgement and an alert, with no one pressing a button.',
        },
        {
          term: 'Backup',
          definition:
            'A saved copy of your whole website, taken regularly, so it can be restored quickly if anything ever goes wrong.',
        },
        {
          term: 'Business profile',
          definition:
            'Your listing that appears on the map and beside search results when people look for what you do nearby. Often a major source of enquiries for local businesses.',
        },
        {
          term: 'Call tracking',
          definition:
            'A way of knowing which part of your marketing produced each phone call, so you can tell what is actually making the phone ring.',
        },
        {
          term: 'Conversion',
          definition:
            'A visitor taking the action you want, such as calling, enquiring, or booking. Turning a visitor into a lead or a customer.',
        },
        {
          term: 'Core Web Vitals',
          definition:
            'A set of measures of how well a page performs for the visitor, mainly how fast it appears, how steady it is as it loads, and how quickly it responds.',
        },
        {
          term: 'CRM',
          definition:
            'Your customer record system, the place that holds your leads and customers and remembers everyone who has shown interest. Short for customer relationship management.',
        },
        {
          term: 'DNS',
          definition:
            'The address book of the internet. It connects your domain name to your actual website and email, so that typing your address takes people to the right place.',
        },
        {
          term: 'Domain',
          definition:
            'Your address on the web, the name people type to reach you. Something you own and renew in your name.',
        },
        {
          term: 'Dynamic content',
          definition:
            'Parts of a page that change based on who is visiting, for example showing a different message to a returning visitor or matching the page to the advertisement someone clicked. The visitor does nothing to trigger it.',
        },
        {
          term: 'First-party data',
          definition:
            'Information people give you directly, such as an enquiry or a subscription, kept in your own system. Yours to keep and use, unlike tracking that follows people across other sites, which is disappearing.',
        },
        {
          term: 'GEO',
          definition:
            'The work of making your content easy for AI assistants to read, trust, and cite, so your business is named when someone asks an assistant a question. Largely an extension of good search practice.',
        },
        {
          term: 'Hero',
          definition:
            'The section at the very top of a page, the first thing a visitor sees. Usually a clear headline, a supporting line, and a button.',
        },
        {
          term: 'Hosting',
          definition:
            "The service that stores your website's files on a computer that is always on, so your site is available to visitors at all times.",
        },
        {
          term: 'INP',
          definition:
            "A measure of how quickly a page responds when a visitor taps or clicks. Part of how a site's speed and quality are judged.",
        },
        {
          term: 'Lead',
          definition:
            'A person who has shown interest in your business, for example by making an enquiry. A potential customer.',
        },
        {
          term: 'Lead magnet',
          definition:
            "Something useful you offer in exchange for a visitor's contact details, such as a guide or a checklist. A way to capture people who are interested but not yet ready to buy.",
        },
        {
          term: 'Meta description',
          definition:
            'The short summary of a page that appears beneath its title in search results, written to make people want to click.',
        },
        {
          term: 'Meta title',
          definition: 'The clickable title of a page as it appears in search results.',
        },
        {
          term: 'Monitoring',
          definition:
            'A system that watches your site around the clock and raises the alarm the moment something is wrong, so problems are caught before customers notice.',
        },
        {
          term: 'Schema',
          definition:
            'A way of labelling the information on your site so that search engines and AI assistants can read and understand it correctly.',
        },
        {
          term: 'Speed to lead',
          definition:
            'Responding to an enquiry as fast as possible, ideally within minutes, because the business that replies first usually wins the work.',
        },
        {
          term: 'SSL',
          definition:
            'The technology behind the padlock beside a web address. It secures the connection between your site and the visitor, and is essential for trust and search.',
        },
        {
          term: 'Staging',
          definition:
            'A private copy of your site where changes are tested before going live, so visitors never see a half-finished or broken page.',
        },
        {
          term: 'Uptime',
          definition: 'A measure of your site being online and available, as opposed to down.',
        },
        {
          term: 'Visitor identification',
          definition:
            'Tools that can recognise a share of the businesses visiting your site even when they do not make contact, so you can follow up with them.',
        },
        {
          term: 'Webhook',
          definition:
            'A way for one tool to pass information to another the instant something happens, for example a form sending an enquiry straight into your customer records.',
        },
      ],
    ),
  ),

  flow(
    ...section(
      'NEXT STEP',
      'Who to call, and ongoing support',
      ...p(
        'A website is never truly finished, as this book has said throughout, and the businesses that get the most from theirs are the ones that keep it cared for rather than leaving it to drift. That care can be handled in different ways, and it is worth understanding what good ongoing support actually covers.',
        'At its core, ongoing support keeps the parts of your site you should never have to think about running smoothly, the security and updates, the monitoring and backups, the speed and the fixes when something needs attention. Beyond that, it can extend to the work that keeps a site growing, the content and the getting-found rhythm, the small improvements, and the new features and connections added as the business expands. The real value of a good support arrangement is not only the work itself, but having someone who knows your particular system, so that when you need something changed or something goes wrong, you are not explaining your business from scratch to a stranger.',
      ),
    ),
  ),

  flow(
    ...p(
      'So here is the honest invitation. You have just read, in real detail, what goes into a website that genuinely brings in business, the build, the connections, the upkeep, and the engineering underneath that keeps all of it working when it matters. If, reading it, you saw your own site falling short of that, or you decided that building and running this properly is not how you want to spend your time, then it is worth a conversation.',
      'The place to start is a Website Systems Review. It is a straight, no-obligation look at your current site measured against everything this book describes. We show you where it is genuinely working, where it is quietly losing you enquiries, what is missing from the way it connects to the rest of your business, and what we would do about it, in the order that matters most. There is no pitch and no pressure in it. Either way, you come away with a clear, honest picture of where your website actually stands.',
    ),
  ),

  flow(
    ...p(
      'If that would be useful, request your review at sysbilt.com. Fill in the form and we will get back to you, and you will also receive an audit of your business, a clear read on where you stand right now and where the biggest gains are. Tell us you read this, and we will walk you through a live example of the kind of connected system you have just read about, so you can see exactly how it works before you decide anything at all.',
      'Because a website built this way is not a one-off project. It is a system you grow, and a partnership while you grow it. When you are ready for one that genuinely works, we are ready to build it with you.',
    ),
  ),
]

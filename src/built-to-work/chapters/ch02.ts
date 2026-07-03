import type { BtwPage } from '../types'
import { divider, subsection, p, flow, opener } from '../helpers'

export const ch02Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 2,
    title: 'What you own, and what keeps it safe',
    subtitle:
      'Most owners assume they own their website. Plenty find out too late that they do not.',
  }),
  flow(
    ...p(
      'Before a single page is designed, there is a question most business owners never think to ask, and it is the one that causes the most pain later. Do you actually own your website? Plenty of owners assume they do, right up until the day they need access and find someone else is holding the keys. This chapter has two halves. First, the keys to the castle, what you must own outright. Then the armour, what keeps it safe once it is yours.',
    ),
    {
      type: 'diagram',
      id: 'ch02-keys-armour',
      caption:
        'Keys, and armour. Left, a key labelled "What you own" (domain, code, hosting, accounts). Right, a shield labelled "What keeps it safe" (SSL, Cloudflare, passwords, email security, spam protection).',
    },
  ),
  flow(
    ...divider('PART ONE', 'The keys to the castle'),
    ...subsection(
      'OWNERSHIP',
      'Who owns what',
      ...p(
        'A website is made of a few separate things, and you should own every one of them.',
        'There is the domain, your address on the web. There is the site itself, the design and the code. And there are the accounts that sit behind it, the hosting, the analytics, the tools that make it run. Each of these can be registered in someone\'s name. The mistake we see again and again is a business whose website was built by someone who registered all of it under their own account. The site works, so no one questions it. Then the relationship ends, or the contractor moves on, and the owner finds they cannot touch their own website, move it, or even prove it is theirs.',
        'The rule is simple. Everything is registered in your name, under accounts you control, and you hold the master logins. A good partner builds on your accounts and hands you the keys. If anyone ever resists putting these things in your name, treat it as the warning it is.',
      ),
      {
        type: 'pullQuote',
        text: 'Everything is registered in your name, under accounts you control, and you hold the master logins.',
      },
    ),
  ),
  flow(
    ...subsection(
      'YOUR DOMAIN',
      'Your domain, in plain terms',
      ...p(
        'Your domain is the address people type to reach you, the name on the door. It is also one of the few things on this list that is truly yours to own, renewed in your name each year.',
        'This is the one to guard most closely. Whoever controls the domain controls where your website and your email point. If a contractor holds it, they hold the ability to switch off your entire online presence. You want the domain registered to your business, in an account only you control, set to renew automatically so it can never lapse by accident. Losing a domain because a renewal was missed is one of the most damaging things that can happen to a business online, and one of the most avoidable.',
      ),
    ),
  ),
  flow(
    ...subsection(
      'DNS',
      'DNS, without the jargon',
      ...p(
        'Once you own the domain, something has to connect that name to your actual website and email. That job belongs to DNS.',
        'The plain version: DNS is the address book of the internet. When someone types your domain, DNS tells their browser where to find your site, and it directs your email to the right place. You do not need to understand the individual entries. You only need to know that this layer exists, that it should sit in an account you own and control rather than your developer\'s, and that it is where a surprising number of problems are traced to when a site or an email stops working.',
      ),
    ),
  ),
  flow(
    ...subsection(
      'HOSTING',
      'Where your site actually lives',
      ...p(
        'Your website is a set of files, and those files have to live on a computer that is always on and connected. That is hosting.',
        'Good hosting is fast, reliable, and rarely something you think about, which is exactly the point. The thing to understand is that hosting is a service paid for in your name, not something bundled invisibly into a deal you cannot see inside. When it is set up properly and in your control, your site loads quickly, stays online, and can be moved or upgraded whenever you decide, rather than whenever someone else allows.',
      ),
    ),
  ),
  flow(
    ...divider(
      'PART TWO',
      'The armour that protects the castle',
      ...p(
        'Owning your site is the first half. Keeping it safe is the second, and it matters more now than ever, because a modern website does not sit alone. It connects to your other systems, which means protecting it means protecting the doors between them too.',
      ),
    ),
    ...subsection(
      'SSL',
      'The padlock, and why it is not optional',
      ...p(
        'If you have ever noticed a small padlock beside a web address, that is SSL doing its work. It encrypts the connection between your site and the person visiting it, so anything they send, an enquiry, their details, a payment, cannot be read in transit.',
        'This is no longer a nice extra. Browsers now warn visitors away from any site without it, flashing a "not secure" notice that does more damage to trust in one second than any amount of good design can repair. Search engines favour secure sites too. Every site we build has this in place from the first day it goes live, and yours should never run without it.',
      ),
    ),
  ),
  flow(
    ...subsection(
      'CLOUDFLARE',
      'What Cloudflare does for you',
      ...p(
        'Sitting in front of many well-built sites is a service like Cloudflare, and it earns its place without fuss.',
        'It does two things that matter to you. It makes your site faster by serving it from locations close to each visitor, wherever they are. And it shields your site from the constant background noise of the internet, the automated bots and malicious traffic that probe every site online whether you notice them or not. You will never see most of what it stops, and that is the point. What you do see is a site that loads quickly and stays standing when something unfriendly comes knocking.',
      ),
    ),
  ),
  flow(
    ...subsection(
      'ACCESS & KEYS',
      'Passwords, access, and the keys between systems',
      ...p(
        'The strongest website in the world is only as secure as the logins behind it, and this is where most businesses are exposed without realising.',
        'A few habits change that. Use a password manager, so every account has a long, unique password you never have to remember or reuse. Turn on two-factor authentication, the second step that confirms it is really you, on everything that offers it. Keep a clear record of who has access to what. And when someone leaves the business, remove their access the same day, the same way you would collect a key to the building.',
        'There is a second kind of key worth understanding, because it becomes important the moment your website starts talking to your other systems, which is most of what the later chapters are about. When your site connects to your customer records, your payments, or any other tool, that connection is opened with a credential, often called an API key. It is, in effect, a key that lets two systems talk to each other automatically. Like any key, it has to be stored securely and handled with care, because a key that leaks is an open door into whatever it unlocks. You will never touch these yourself. What matters is knowing they exist, and that a properly built site stores and manages them safely rather than leaving them lying around, which is one of the real differences between a site wired together in a hurry and one engineered to be connected.',
      ),
    ),
  ),
  flow(
    ...subsection(
      'DELIVERABILITY',
      'Email that actually arrives',
      ...p(
        'Here is a problem that costs businesses leads without them ever knowing. You send an enquiry reply or a newsletter, and it lands in the recipient\'s spam folder, or never arrives at all.',
        'The cause is usually a set of behind-the-scenes settings with awkward names, SPF, DKIM and DMARC. You do not need to learn them. What they do is prove to the world that email from your domain truly comes from you, and not from someone impersonating you. Set up correctly, your messages arrive in the inbox where they belong. Left unset, your legitimate email gets treated as suspicious, and the lead you were chasing never even sees your reply. This is one of the first things worth checking and one of the most overlooked.',
      ),
    ),
  ),
  flow(
    ...subsection(
      'CONSENT',
      'Permission to email',
      ...p(
        'If you are going to email people, and a good website will steadily build you a list of people worth emailing, there are rules in Australia about how you do it, and they exist for good reason.',
        'The principle is straightforward. You need permission to email someone, you need to make clear who the message is from, and you need to give every recipient an easy way to unsubscribe. Follow that and you stay on the right side of the law and, just as importantly, the right side of the people on your list. Ignore it and you risk penalties and a reputation as a sender that inboxes learn to filter out. We will return to this when we cover building and using your list. The foundation is consent, honesty, and an easy way out.',
      ),
    ),
  ),
  flow(
    ...subsection(
      'SPAM',
      'Stopping form spam',
      ...p(
        'Once your site has a contact form, something predictable happens. Automated bots find it and start filling it with junk. Left unchecked, this buries the real enquiries in noise, and the genuine lead gets lost among the rubbish. The fix is built in and unobtrusive, simple protections that catch automated submissions before they ever reach you, without making real visitors jump through hoops to get in touch. You should never have to wade through a pile of fake messages to find the one that matters. Done properly, you simply stop seeing the junk.',
      ),
    ),
  ),
]

import type { BtwPage } from '../types'
import { closing, flow, opener, p, realPicture, section } from '../helpers'

export const ch07Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 7,
    title: 'Keeping it healthy, legal and fast',
    subtitle:
      'Most of what keeps a site safe and quick happens out of sight. Here is what it takes.',
  }),

  flow(
    ...p(
      'A website is a living thing, and like anything that runs continuously, it needs upkeep to stay reliable, quick and safe. Most of this happens out of sight, which is why so many owners never think about it, right up until something breaks. This chapter is about the layer beneath the surface, the maintenance that keeps your site standing, fast, and on the right side of the law. You do not need to do most of it yourself. You do need to know it matters, and what good looks like.',
    ),
    ...section(
      'WHO DOES WHAT',
      'What runs in the background, and what you touch',
      ...p(
        'There is a clean line between two kinds of upkeep. On one side sits the technical care that keeps the site secure, current and online. This runs in the background and is not something an owner should have to manage. It covers, broadly:',
      ),
      {
        type: 'bullets',
        items: [
          'Security patches, applied as new threats and weaknesses appear',
          'Software and dependency updates, so the parts the site is built from stay current and safe',
          'Monitoring, watching that the site is up and working around the clock',
          'Backups, regular saved copies so the site can be restored if anything goes wrong',
        ],
      },
    ),
  ),

  flow(
    ...p(
      'On the other side sits the content, the words, images and updates that keep the site fresh, which is yours to look after and which we covered in the last chapter. Knowing which is which matters, because it tells you what you are responsible for and what should be handled for you. When the background care is in place, you are free to focus on your business and your content, while the machinery underneath stays maintained without your attention. When it is neglected, problems build silently until one of them surfaces at the worst possible moment. The whole point of proper upkeep is that you never have to think about it.',
    ),
    {
      type: 'diagram',
      id: 'what-runs-underneath',
      caption: 'What runs underneath, and what you touch.',
    },
  ),

  flow(
    ...section(
      'SPEED',
      'Speed, and why fast is a sales tool',
      ...p(
        'Speed is not a technical nicety. It is one of the most direct influences on whether a visitor stays or leaves. People have very little patience for a slow page, and a site that takes too long to appear loses a share of its visitors before they have seen anything at all.',
        'There is a recognised set of measures for this, often called Core Web Vitals, that look at how quickly a page appears, how steady it is as it loads, and how fast it responds when someone interacts with it. That last measure, responsiveness, is now tracked as something called INP, which reflects how quickly the page reacts when a visitor taps or clicks. You do not need to follow the detail. What matters is the principle. A fast site keeps more of its visitors, converts more of them, and is favoured by search engines, so speed earns its keep twice over, in the visitors it holds onto and in the ranking it helps you reach. We build for speed from the start and keep an eye on it, because on the web, slow costs you business.',
      ),
    ),
  ),

  flow(
    ...section(
      'STAGING',
      'Staging, so you never see a broken page',
      ...p(
        'When a change is made to a live website, there is always a small risk it does not behave as expected. The professional way to remove that risk is staging.',
        'Staging means changes are made and tested first on a private copy of your site, a clone the public never sees, and only moved across to the live site once they work perfectly. It is the difference between testing a change in private and experimenting on the site your customers are looking at right now. The benefit to you is simple. Updates happen smoothly and invisibly, and you never have the experience of a visitor seeing a half-finished or broken page. Work is proven safe before it ever goes live, so the version your clients see is always the polished one.',
      ),
    ),
    ...section(
      'BACKUPS',
      'Backups, and getting back to yesterday',
      ...p(
        'A backup is a saved copy of your entire website, taken regularly, so that whatever happens, you can return to a working version quickly. Things do occasionally go wrong online, a faulty update, a technical fault, in rare cases an attack, and without backups, recovering from one can mean rebuilding from nothing.',
      ),
    ),
  ),

  flow(
    ...p(
      'With proper backups in place, the same situation is a minor inconvenience rather than a disaster. The site is restored to how it was yesterday, or last week, in a matter of minutes, and business carries on. You will likely never need them, and that is exactly why they have to be there, taken automatically and stored safely, as the insurance policy behind everything else. The cost of having backups is small. The cost of needing them and not having them can be the whole site.',
    ),
    ...section(
      'MONITORING',
      'Uptime and monitoring',
      ...p(
        'Uptime is the measure of your site being online and available. Monitoring is the system that watches it around the clock and raises the alarm the moment something is wrong.',
        'The value here is in catching problems before your customers do. Without monitoring, the first you tend to hear of your site being down is a customer telling you, or worse, a customer who gave up and went elsewhere without a word. With it in place, an issue is spotted and addressed, often before anyone has even noticed, so the site stays reliably available. You do not need to watch it yourself. You need to know that something is watching it for you, every hour of every day, so the front door to your business is never left shut without anyone realising.',
      ),
    ),
  ),

  flow(
    ...realPicture({
      leadIn:
        'The calm, never-think-about-it experience of a well-kept site is produced by constant, unseen effort. It is worth being honest about why.',
      title: 'A website is never finished being attacked',
      paragraphs: [
        'From the day it goes online, automated programs probe it continuously, looking for a known weakness, a way in, a form to abuse. You never see this traffic, but it never stops, and the only thing standing between it and your site is software that is kept current and defences that are kept watchful.',
        'A site left alone does not stay as safe as the day it launched. It slowly becomes more exposed, because the weaknesses being discovered out in the world keep changing, and a site that stops being updated stops keeping pace with them.',
        'Then there is the quiet risk in the updates themselves. A modern website is built from many moving parts, and those parts release updates constantly. Applying them keeps the site secure, but any update can occasionally change how something behaves, which is precisely why updates are tested on a private copy first rather than pushed straight to the live site. Skipping that testing to save time is how a routine update silently breaks a contact form or a checkout, and how a business can lose enquiries for a week without realising the cause.',
        'And there is the discipline of knowing, rather than hoping. Anyone can claim a site is backed up and monitored. The real work is confirming it. A backup that has never been tested is not a backup, it is a guess, and the moment you discover it does not actually restore is the worst possible moment to discover it. Monitoring that is not watching the right things tells you the site is fine while a key part of it has stopped working. Doing this properly means backups that are checked, and monitoring that watches not just whether the site loads but whether the things that matter, the forms, the connections, are truly working.',
        'None of this is here to worry you. It is here to be clear that the calm, reliable, never-think-about-it experience of a well-kept site is produced by constant, unseen effort. That is the work, and we carry it, so that from where you sit the site simply stays up, stays fast, and stays safe, which is exactly how it should feel.',
      ],
    }),
  ),

  flow(
    ...section(
      'HOUSEKEEPING',
      'Housekeeping',
      ...p(
        'Over time, every website accumulates small untidiness. A link that once worked now leads nowhere because the page it pointed to has moved. A page of information has gone out of date. None of these is a crisis on its own, and left unattended they add up, chipping away at how professional and trustworthy the site feels.',
        'Regular housekeeping keeps this in check, finding and fixing broken links, and reviewing pages so the information stays accurate and current. A broken link is a small thing that tells a visitor the site is not well cared for, and a page of stale information can actively mislead. Keeping on top of both is unglamorous and it matters. A tidy, current, well-maintained site reflects a business that pays attention to detail, which is exactly the impression a serious operator wants to leave.',
      ),
    ),
  ),

  flow(
    ...p(
      'There is one safety net worth building for the times a link does slip through, or someone simply mistypes your address. Rather than dropping that visitor onto a cold "page not found" message, which is a dead end that loses them, a good site catches the moment with a custom page that says sorry in a line and points them straight back to the home page and your main services. It turns a wrong turn into a second chance rather than a lost visitor.',
    ),
    ...section(
      'ACCESSIBILITY',
      'Accessibility, and the law',
      ...p(
        'Accessibility means building your site so that everyone can use it, including people who navigate with a keyboard rather than a mouse, who rely on a screen reader, or who need strong colour contrast to read comfortably. It used to be treated as an optional extra. In Australia, it no longer is.',
      ),
    ),
  ),

  flow(
    ...p(
      'In 2025 the bar was raised. The standard now recognised as the minimum is a set of guidelines known as WCAG, version 2.2, at a level called AA. In plain terms, that level covers practical things like buttons and links being large enough to tap easily, a clear visible marker showing where you are as you move through a page or a form, and sign-ins that do not depend on remembering and typing a fiddly code. The obligation behind it flows from the Disability Discrimination Act, which makes it unlawful to shut people with disability out of goods and services. That obligation reaches private businesses, not only government. A site that falls short can expose a business to a discrimination complaint, and around one in five Australians live with some form of disability, so this is not a small or distant group. It is a real share of the people you want as customers.',
      'There are two reasons it matters, then, and they pull in the same direction. One is risk, the legal and reputational exposure of an inaccessible site. The other is reach. A site that is easier for everyone to use brings more people in, not fewer, and the same things that make a site accessible, clear structure, readable contrast, sensible navigation, captions and text descriptions, also make it faster, easier to find in search, and easier for AI assistants to read. We build to this standard as a matter of course, both to protect you and because building so that everyone can use your site is the right way to build.',
    ),
  ),

  flow(
    ...section(
      'PRIVACY',
      'Privacy and consent',
      ...p(
        'If your website collects any information about its visitors, and almost every site does, you have a responsibility to be open about it and to handle it with care. This is where a cookie notice and a privacy policy come in, and the ground beneath both has been moving.',
        'Australian privacy law is being reformed for the first time in years, and the direction is one way, tighter. From 2025, individuals gained the ability to take direct action over serious misuse of their personal information, rather than relying on a regulator to act for them, and common practices like tracking people across the web and building profiles of their behaviour are squarely in the frame. Further change is on the way. None of this means you cannot collect information. It means you must do it openly and handle it properly.',
        'In practice that is straightforward. A cookie notice, done well, tells visitors plainly what is being collected and lets them make a real choice, rather than the deceptive tricks that nudge people into agreeing without realising. A privacy policy, kept visible and honest, explains what you gather, why, and what you do with it. And the smartest position, both for trust and for what is coming, is to lean on information people give you directly and willingly rather than on invisible tracking that is falling out of favour and out of the law. A visitor who can see that you handle their information openly is more inclined to trust you with their enquiry, and a business that treats data with care is the one that stays both compliant and trusted as the rules tighten. We set this up properly from the outset, so you meet your responsibilities and signal that you are a business worth trusting.',
      ),
    ),
  ),

  flow(
    ...closing(
      'In short',
      ...p(
        'Upkeep like this is invisible when it is done well, which is exactly why it is so often skipped, and exactly why it matters. A site that is fast, safe, current and compliant is a site that can be trusted to do its job day after day. With that foundation solid, we can turn to the question every business owner eventually asks. How do people actually find you in the first place. That is the next chapter.',
      ),
    ),
  ),
]

// =============================================================================
// FAQ DATA — UPDATED STRUCTURE
// =============================================================================
// 
// STRATEGY:
// - System Page (SystemPage.tsx) → Universal Q&A (12 questions)
// - Pillar Pages → Pillar-specific Q&A ONLY (5 questions each)
// 
// This avoids duplicate content and puts the right questions in the right place.
// =============================================================================

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

// =============================================================================
// SYSTEM PAGE QUESTIONS
// =============================================================================
// These appear ONLY on SystemPage.tsx (The System page)
// They answer the big "should I do this?" questions
// =============================================================================

export const systemPageFAQs: FAQ[] = [
  {
    id: 'need-all-pillars',
    question: 'Do I need all 7 pillars',
    answer: `No. Most businesses start with one or two. Each pillar works on its own and you pick what you need now and add more later if it makes sense. Start where the pain is worst.`
  },
  {
    id: 'which-pillar-first',
    question: 'Which pillar should I start with',
    answer: `It depends on where you're losing time or money. If you're losing leads, start with your website or CRM. If you're drowning in admin, start with automation. If you're missing calls after hours, start with AI. If you have no time for marketing, start with content. If your team won't use the tools you've bought, start with training. If you're flying blind on numbers, start with dashboards. Not sure? Book a call and we'll help you figure it out.`
  },
  {
    id: 'combine-services',
    question: 'Can I combine services into one project',
    answer: `Yes, and it's often smarter to. If you need a website and a CRM, building them together means they're connected from day one with no awkward integration later. We'll tell you honestly if combining makes sense or if you should do one first.`
  },
  {
    id: 'project-timeline',
    question: 'How long does a project take',
    answer: `Most projects run in short sprints. Simple builds like lead forms or basic automations take 3 to 7 days. Core builds like websites, CRM setup, or AI assistants take 7 to 14 days. More complex multi-system projects take 21 to 30 days or more. You'll see progress in weeks, not quarters.`
  },
  {
    id: 'pricing',
    question: 'How much does this cost',
    answer: `Every project is different so we don't list prices. What we can tell you is that we work in fixed-price sprints. You know the cost before we start and it doesn't change mid-project. Book a call, tell us what you need, and we'll give you a straight answer.`
  },
  {
    id: 'after-project',
    question: 'Do I own the systems you build',
    answer: `You own everything. We hand over full access to all systems with no vendor lock-in, training videos so your team knows how to use it, and documentation for future reference. If you want ongoing support we can arrange that, but if you want to run it yourself you'll be fully equipped.`
  },
  {
    id: 'burned-before',
    question: "I've been burned by tech projects before, how is this different",
    answer: `We get it. Most tech projects fail because the scope creeps, the team doesn't use the new system, or the vendor disappears. We work differently. Scope and price are locked in fixed sprints. We don't leave until your team actually uses it. And you own the code and the accounts so there's no lock-in.`
  },
  {
    id: 'small-test',
    question: 'Can we start with a small test project',
    answer: `We recommend it. Start with something contained like a lead capture form, a simple automation, or a CRM cleanup. See how we work. See results. Then decide if you want to go further.`
  },
  {
    id: 'how-systems-connect',
    question: 'How do the 3 systems work together',
    answer: `Get Clients (Pillars 1 to 3) brings people in and captures them. Scale Faster (Pillars 4 to 6) multiplies your output without adding headcount. See Clearly (Pillar 7) shows you what's working and what's not. Each phase feeds the next. The website catches leads, the CRM tracks them, automation moves the data, AI handles the overflow, content brings in more traffic, training makes sure everyone uses the tools, and the dashboard shows you the results.`
  },
  {
    id: 'existing-systems',
    question: 'What if I already have a CRM or a website',
    answer: `We work with what you have. If your current CRM is fine but you need automation on top of it, we build that. If your website is decent but not capturing leads properly, we fix the forms and tracking. We don't replace things that are working.`
  },
  {
    id: 'how-involved',
    question: 'How involved do I need to be',
    answer: `For the initial setup you'll need a few focused sessions where we learn your business, your workflow, and your pain points. After that it's as involved as you want to be. Some clients want weekly check-ins and others just want us to build it and hand it over. Both work.`
  },
  {
    id: 'after-project-done',
    question: 'What happens after the project is done',
    answer: `Three options. You run it yourself and we give you training and documentation. You go on a monthly support retainer where we monitor, maintain, and improve. Or you call us when something breaks for one-off support. Most clients start with option one and move to option two once they see the value of ongoing optimisation.`
  }
];


// =============================================================================
// PILLAR-SPECIFIC QUESTIONS
// =============================================================================
// These appear ONLY on their respective pillar page
// They answer the "tell me more about THIS service" questions
// =============================================================================

export const pillarFAQs = {
  // -------------------------------------------------------------------------
  // PILLAR 1: WEBSITES & E-COMMERCE
  // File: Pillar1.tsx | View ID: pillar1
  // -------------------------------------------------------------------------
  pillar1: [
    {
      id: 'p1-timeline',
      question: 'How long does it take to build a website',
      answer: `It depends on what you need. A simple site with a few pages takes about 7 days. A standard business website with 10 or so pages takes around 14 days. Larger builds with a blog, multiple service pages, or e-commerce take longer. We'll give you a clear timeline before we start.`
    },
    {
      id: 'p1-mobile',
      question: 'Will my website work properly on mobile',
      answer: `Yes. We design mobile-first because that's where most of your visitors are, often 70% or more. Your site will load fast and look good on every device. If someone fills out a form at 11pm on their phone, it works.`
    },
    {
      id: 'p1-seo',
      question: 'Do you handle SEO',
      answer: `We build with SEO foundations baked in. Fast loading, proper structure, local business tags, and clean metadata. We don't run ongoing SEO campaigns like monthly link building or blog writing, but if you need that we can point you in the right direction.`
    },
    {
      id: 'p1-accounting',
      question: 'Can my website connect to Xero or MYOB',
      answer: `Yes. That's one of the most valuable connections we build. An enquiry comes in through your site, gets tracked in your CRM, and when the deal closes the invoice can be generated in your accounting software automatically.`
    },
    {
      id: 'p1-complex',
      question: 'What if I need something more complex later',
      answer: `We build sites that can grow with you. If you start with a simple 5-page site and later need e-commerce, a client portal, or more advanced features, we can add them. The foundation is built to handle it.`
    }
  ],

  // -------------------------------------------------------------------------
  // PILLAR 2: CRM & LEAD TRACKING
  // File: Pillar2.tsx | View ID: pillar2
  // -------------------------------------------------------------------------
  pillar2: [
    {
      id: 'p2-team-hated',
      question: "My team hated our last CRM, what's different",
      answer: `Most CRMs fail because they create more work than they remove. We set up systems that are simple to use and that fit how your team actually works. If it's too complicated they won't use it, so we keep it simple and train them until they're comfortable.`
    },
    {
      id: 'p2-integrations',
      question: 'Can this connect to software we already use',
      answer: `Yes. We connect your CRM to your website, your accounting software, your email, and your marketing tools. If it has an API or an integration we can wire it in.`
    },
    {
      id: 'p2-migration',
      question: 'How do you handle our existing contacts and data',
      answer: `We migrate everything. Your current spreadsheet, your email contacts, your existing deals. We clean the data, remove duplicates, and organise it properly before we set up the new system.`
    },
    {
      id: 'p2-source-tracking',
      question: 'Will I be able to see which marketing channels are working',
      answer: `Yes. Every lead gets tagged with where they came from. Google Ads, social media, referrals, word of mouth. You see exactly which channels are bringing in paying clients and which ones are wasting money.`
    },
    {
      id: 'p2-outgrow',
      question: 'What happens if we outgrow the CRM',
      answer: `We build on platforms that scale. If you start as a 5-person team and grow to 30, the CRM handles it. If your needs change we can adjust the setup, add custom fields, or connect new tools without starting from scratch.`
    }
  ],

  // -------------------------------------------------------------------------
  // PILLAR 3: AUTOMATION
  // File: Pillar3.tsx | View ID: pillar3
  // -------------------------------------------------------------------------
  pillar3: [
    {
      id: 'p3-what-automate',
      question: 'What kind of tasks can you automate',
      answer: `Anything repetitive. Sending follow-up emails, creating invoices, updating records, notifying your team, generating documents, syncing data between apps. If you do the same task more than twice a week, it's worth automating.`
    },
    {
      id: 'p3-breaks',
      question: 'Will automation break if something changes',
      answer: `We build with error handling so if something unexpected happens the system pauses and alerts you instead of doing the wrong thing. We also monitor and adjust as your business evolves.`
    },
    {
      id: 'p3-tools',
      question: 'What tools do you use to build automations',
      answer: `Right now we primarily use Make.com, Zapier, and n8n depending on the complexity. But the technology in this space moves fast and better tools come out regularly. We always use whatever works best for your specific situation.`
    },
    {
      id: 'p3-complex',
      question: 'Can automation handle complex multi-step processes',
      answer: `Yes. We build workflows that run across multiple tools and multiple steps. A lead comes in, gets qualified, gets assigned, gets quoted, gets invoiced, and gets onboarded without anyone doing it manually. The more steps in your process, the more time automation saves you.`
    },
    {
      id: 'p3-results',
      question: 'How long before I see results',
      answer: `Simple automations are live within days. You'll notice the difference immediately because the tasks you were doing manually just stop appearing on your to-do list. More complex workflows take a couple of weeks to build and test properly.`
    }
  ],

  // -------------------------------------------------------------------------
  // PILLAR 4: AI ASSISTANTS
  // File: Pillar4.tsx | View ID: pillar4
  // -------------------------------------------------------------------------
  pillar4: [
    {
      id: 'p4-chatbot-vs-ai',
      question: "What's the difference between a chatbot and an AI assistant",
      answer: `Old chatbots followed scripts and were frustrating to use. AI assistants understand natural language and can answer specific questions about your business using your actual information. One reads from a menu, the other has a real conversation.`
    },
    {
      id: 'p4-book-appointments',
      question: 'Can the AI actually book real appointments',
      answer: `Yes. It connects to your calendar, checks availability in real time, and confirms the booking. A customer asks for a slot and the AI handles it with no back-and-forth emails needed.`
    },
    {
      id: 'p4-phone-calls',
      question: 'Can I have an AI that answers my phone',
      answer: `Yes. An AI voice agent answers around the clock, handles common questions, qualifies leads, and books meetings. It sounds human and hands off to a real person when needed.`
    },
    {
      id: 'p4-cant-answer',
      question: "What happens if someone asks something the AI doesn't know",
      answer: `It hands off gracefully. We build clear escalation paths so the AI knows its limits. It will connect the person to someone who can help instead of guessing or making things up.`
    },
    {
      id: 'p4-train-ai',
      question: 'How does the AI learn about my specific business',
      answer: `We feed it your documents, your website content, your pricing, and your policies. We test it, find gaps, and refine until it answers accurately. Most AI assistants are ready to launch in a few days.`
    }
  ],

  // -------------------------------------------------------------------------
  // PILLAR 5: CONTENT SYSTEMS
  // File: Pillar5.tsx | View ID: pillar5
  // -------------------------------------------------------------------------
  pillar5: [
    {
      id: 'p5-hate-camera',
      question: 'Do I have to be on camera for this to work',
      answer: `No. We work with whatever you're comfortable with. Voice memos, written notes, a phone call where we ask you questions. We extract your expertise in the format that suits you. If you hate video, we don't do video.`
    },
    {
      id: 'p5-voice-style',
      question: 'Can you create content that sounds like me',
      answer: `Yes, that's the whole point. We calibrate the tone until it matches how you actually talk. The content sounds like you wrote it, not like a marketing agency churned it out.`
    },
    {
      id: 'p5-how-much',
      question: 'How much content can this system produce',
      answer: `One 30-minute conversation can become a long-form blog post, five social media updates, an email newsletter, and a script. One input, many outputs.`
    },
    {
      id: 'p5-replace-marketing',
      question: 'Does this replace my marketing team',
      answer: `It replaces the production work of creating content. It doesn't replace high-level strategy or community management. Think of it as a production line that handles the heavy lifting so your team can focus on the thinking.`
    },
    {
      id: 'p5-platforms',
      question: 'Which platforms can this post to',
      answer: `Most of them. LinkedIn, Facebook, Instagram, Twitter/X, YouTube, and your blog. We set up auto-posting so you approve once and it goes everywhere.`
    }
  ],

  // -------------------------------------------------------------------------
  // PILLAR 6: TEAM TRAINING
  // File: Pillar6.tsx | View ID: pillar6
  // -------------------------------------------------------------------------
  pillar6: [
    {
      id: 'p6-resists-change',
      question: 'My team hates new software, how do you get them to use it',
      answer: `Resistance usually comes from fear that it means more work. We make adoption easy with short videos and clear guides, and we show them the direct benefit to their day. We don't disappear after training, we stay until they're actually using it.`
    },
    {
      id: 'p6-who-trained',
      question: 'Do you train everyone or just the manager',
      answer: `Everyone who uses the system gets trained. Managers get the strategy view and staff get the day-to-day workflow view. We also create materials for future hires so you don't have to re-train every time someone new joins.`
    },
    {
      id: 'p6-format',
      question: 'Is the training live, videos, or documents',
      answer: `A mix of all three. Short rewatchable videos for the core processes, a live walkthrough for questions and rollout, and written documentation for reference. We don't do 3-hour webinars. Your team watches a 3-minute video when they're stuck.`
    },
    {
      id: 'p6-new-hires',
      question: 'What happens when I hire someone new after the project',
      answer: `They use the same training library. Videos, docs, and the AI knowledge base. You onboard new staff without paying us again. The training is yours to keep.`
    },
    {
      id: 'p6-how-long',
      question: 'How long until my team is comfortable with new systems',
      answer: `Simple tools take a week or two. More complex systems take about a month. We start small, add features over time, and don't overwhelm them on day one.`
    }
  ],

  // -------------------------------------------------------------------------
  // PILLAR 7: DASHBOARDS & REPORTING
  // File: Pillar7.tsx | View ID: pillar7
  // -------------------------------------------------------------------------
  pillar7: [
    {
      id: 'p7-vs-accounting',
      question: 'How is a dashboard different from reports in Xero or MYOB',
      answer: `Accounting software shows you history. Money in, money out. A dashboard shows you the full picture in real time including where your leads come from, where the bottlenecks are, and what your pipeline looks like for the next 90 days. It's the windshield, not the rearview mirror.`
    },
    {
      id: 'p7-mobile',
      question: 'Can I check my dashboard from my phone',
      answer: `Yes. We build for desktop, tablet, and mobile. You can check your business numbers from a cafe or the train with real-time data and no laptop needed.`
    },
    {
      id: 'p7-data-sources',
      question: 'What systems can feed into the dashboard',
      answer: `Almost anything. Your CRM, your accounting software like Xero or MYOB, your ad platforms like Google and Meta, your e-commerce platform, and your spreadsheets. If it has data we can pull it in.`
    },
    {
      id: 'p7-update-frequency',
      question: 'Is the data live or does it update once a day',
      answer: `It depends on what makes sense for you. Sales pipeline data can be real-time. Financial summaries might update daily. We decide together what needs to be instant and what can be slower. More frequency means more complexity.`
    },
    {
      id: 'p7-role-views',
      question: 'Can different people see different dashboards',
      answer: `Yes. Role-based views are standard. The owner sees cash flow and overall health. The sales manager sees deals and pipeline. Marketing sees lead sources and campaign performance. Everyone sees what they need and nothing more.`
    }
  ]
};


// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

// Get FAQs for System Page (SystemPage.tsx)
export const getSystemPageFAQs = () => systemPageFAQs;

// Get FAQs for a specific Pillar Page
export const getPillarFAQs = (pillarId: string): FAQ[] => {
  const pillarKey = pillarId as keyof typeof pillarFAQs;
  return pillarFAQs[pillarKey] || [];
};


// =============================================================================
// SEO: Generate FAQPage Schema
// =============================================================================

// Strip **bold** markers for schema plain text (UI still renders bold via FAQSection)
const stripBold = (text: string) => text.replace(/\*\*([^*]+)\*\*/g, '$1');

export const generateFAQSchema = (faqs: FAQ[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": stripBold(faq.answer).replace(/\n/g, ' ').replace(/•/g, '-')
      }
    }))
  };
};

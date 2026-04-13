import React from 'react';
import {
  Package,
  Building2,
  Clock,
  Users,
  Calendar,
  FileWarning,
  FlaskConical,
  Heart,
} from 'lucide-react';

export const ARCHITECT_CONTENT = {
  architect: {
    headline: (
      <>
        Small team, <br className="hidden md:block" />
        <span className="italic font-serif text-gold-on-cream">big output</span>
      </>
    ),
    subhead:
      'We run our business on the same systems we build for you. No account managers, no junior handoffs. You talk directly to the people building your system.',
    timeline: [
      {
        id: 'a1',
        icon: Package,
        title: 'We use what we sell',
        text: "We capture our own leads, automate our own follow-ups, and run our own operations through the same system we build for clients. If it doesn't work for us, we don't sell it to you.",
      },
      {
        id: 'a2',
        icon: Building2,
        title: "We've been on the floor",
        text: "We've worked inside trade, wholesale, and service businesses. We know what operations actually look like when stock goes missing, staff call in sick, and the phone won't stop ringing.",
      },
      {
        id: 'a3',
        icon: Clock,
        title: "We've run the books at midnight",
        text: "Before we built systems for other people, we ran our own companies. We've chased invoices on a Sunday, trained staff who wouldn't read the manual, and managed chaos with spreadsheets. That's exactly why we built SYSBILT.",
      },
      {
        id: 'a4',
        icon: Users,
        title: 'Few clients, full attention',
        text: 'We take on a small number of clients at a time so every build gets the focus it needs. No rushed jobs, no half-finished systems, no disappearing after handover.',
      },
    ],
  },
  human: {
    headline: (
      <>
        Built out of <br className="hidden md:block" />
        <span className="italic font-serif text-gold-on-cream">actual frustration</span>
      </>
    ),
    subhead:
      'Before SYSBILT, Felipe ran companies, managed franchises, and worked the floor. He built this company to create the exact systems he wished he had back then.',
    timeline: [
      {
        id: 'h1',
        icon: Calendar,
        title: 'The Sunday invoice chase',
        text: 'The original frustration was spending Sunday nights manually reconciling accounts and chasing late payers. That specific pain is exactly why we built automation into the core of everything we do.',
      },
      {
        id: 'h2',
        icon: FileWarning,
        title: 'The manual nobody reads',
        text: 'Writing procedures that staff ignored was a constant drain. We fix that now by building the process directly into the software so the right steps happen automatically. No manual required.',
      },
      {
        id: 'h3',
        icon: FlaskConical,
        title: 'Systems thinking from the start',
        text: "Felipe trained as a chemist before moving into business. That background means we don't just look at your business as a website project. We treat every bottleneck as a process problem with a logical fix.",
      },
      {
        id: 'h4',
        icon: Heart,
        title: 'Built for real people',
        text: "We learned early that you have to adapt systems to the people using them. If you force busy staff into rigid software, they go back to paper. We build tools that fit how your team actually works.",
      },
    ],
  },
};

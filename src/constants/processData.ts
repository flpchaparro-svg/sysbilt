import { Search, PenTool, Hammer, Flag, CheckCircle2 } from 'lucide-react';

export const PRINCIPLES = [
  {
    id: 'p1',
    label: '01 / CLARITY',
    title: "If we can't explain it at a pub, it's too complex",
    body: "You'll understand exactly how your system works. If you don't, we haven't done our job.",
    icon: Search
  },
  {
    id: 'p2',
    label: '02 / PEOPLE',
    title: "If a tool makes your team's day harder, it's failed",
    body: 'Your team will actually use what we build. Not fight against it.',
    icon: CheckCircle2
  }
];

export const STEPS = [
  {
    id: '01',
    phase: '01 / DIAGNOSE',
    title: 'Find the leaks',
    text: 'Where does your data get typed twice? Where do your leads go cold? Where does profit disappear? We find it.',
    icon: Search,
    color: 'text-red-text',
    borderColor: 'border-red-solid'
  },
  {
    id: '02',
    phase: '02 / DESIGN',
    title: 'Pick the right tools',
    text: 'No platform lock-in. We pick the software that actually fits your business and map the logic before writing a single line of code.',
    icon: PenTool,
    color: 'text-gold',
    borderColor: 'border-gold'
  },
  {
    id: '03',
    phase: '03 / BUILD',
    title: 'Build in sprints',
    text: 'No six-month projects that drain your budget. We work in short sprints. You see progress in weeks, not quarters.',
    icon: Hammer,
    color: 'text-gold',
    borderColor: 'border-gold'
  },
  {
    id: '04',
    phase: '04 / HANDOVER',
    title: 'Make it stick',
    text: "Software fails when people don't use it. We handle the training, support, and check-ins until your team actually adopts it.",
    icon: Flag,
    color: 'text-gold',
    borderColor: 'border-gold'
  }
];

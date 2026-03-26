import React from 'react';
import { 
  FlaskConical, Award, Wrench, Target, 
  Coffee, Globe, Code2, Database, Zap 
} from 'lucide-react';

export const ARCHITECT_CONTENT = {
  architect: {
    label: '/ THE ARCHITECT',
    accent: 'text-red-text',
    // Storing JSX directly in data allows for rich text formatting
    headline: (
      <>
        One person. <br className="hidden md:block" />
        <span className="italic font-serif text-gold-on-cream">Ten person output</span>
      </>
    ),
    subhead: "No account managers. No junior handoffs. No endless meetings. You talk directly to the person building your system. Automation and AI let me deliver what agencies charge a team for.",
    timeline: [
      { id: 'a1', icon: FlaskConical, title: 'No Templates', text: "Every solution is built for your specific situation. Nothing copy-pasted." },
      { id: 'a2', icon: Award, title: 'No Shortcuts', text: "I trained as a chemist. If you miss a step, the reaction fails. Same with business systems." },
      { id: 'a3', icon: Wrench, title: 'Enterprise Tools', text: "Same platforms as large agencies. HubSpot. Make.com. Sized for real businesses." },
      { id: 'a4', icon: Target, title: 'Your Time Back', text: "If your sales team is doing data entry, something is broken. I fix that." }
    ],
    credentials: [
      { label: '24+ Certifications', icon: Award },
      { label: 'HubSpot Certified', icon: Database },
      { label: 'Sydney Based', icon: Globe },
      { label: 'Same-Day Response', icon: Zap }
    ]
  },
  human: {
    label: '/ THE HUMAN',
    accent: 'text-gold-on-cream',
    headline: (
      <>
        I've run businesses. <br className="hidden md:block" />
        <span className="italic font-serif text-gold-on-cream">Not just consulted them</span>
      </>
    ),
    subhead: "Before I built systems for others, I ran my own café, managed international franchises, and worked factory floors. I know what it's like to chase invoices at midnight. No theory. Just what actually works.",
    timeline: [
      { id: 'h1', icon: FlaskConical, title: 'Trained as a Chemist', text: "In Chile, I learned that every problem needs a custom process. No templates. Just problem-solving." },
      { id: 'h2', icon: Coffee, title: 'Ran My Own Café', text: "Hiring, payroll, marketing, chasing invoices. I know what running a business actually costs." },
      { id: 'h3', icon: Globe, title: 'Managed a Franchise', text: "Fitness franchise in Southeast Asia. I learned to adapt systems to people, not force people into systems." },
      { id: 'h4', icon: Code2, title: 'Now I Build Systems', text: "The systems I wish I'd had when I was running my café. So you can focus on work that matters." }
    ]
  }
};

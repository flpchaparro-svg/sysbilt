import { Filter, Magnet, Cog, Brain, LayoutGrid, Dna, BarChart3, LucideIcon } from 'lucide-react';
import { SystemPillarDetail } from '../types';
import { SERVICES } from './services';
import { colors } from './theme';

// SystemPage-specific view data that extends SERVICES
const SYSTEM_PILLAR_VIEW_DATA: Record<string, {
  number: string;
  icon: LucideIcon;
  displayTitle: string; // SystemPage-specific display title (e.g., "THE FACE")
  subtitle: string; // SystemPage-specific subtitle (different from SERVICES subtitle)
  subtitleMobile?: string;
  categoryHex: string;
  categoryLabel: string;
  body: string;
  systemPurpose: string;
  subServices: Array<{ title: string; description: string }>;
}> = {
  pillar1: {
    number: '01',
    icon: Filter,
    displayTitle: 'THE FRONT DOOR',
    subtitle: 'Websites & E-commerce',
    subtitleMobile: 'Websites',
    categoryHex: colors.redSolid,
    categoryLabel: 'GET CLIENTS',
    body: 'We build your website so it catches leads and feeds them straight into your system',
    systemPurpose: 'Stop losing leads.',
    subServices: [
      { title: 'How it connects', description: 'When someone fills out a form, that data goes straight to your CRM with no inbox and no copy-pasting. The lead exists in your system before they\'ve closed the browser.' },
      { title: 'What this unlocks', description: 'Your CRM knows where they came from, your automation can respond instantly, and your dashboard can track which pages actually bring in money.' }
    ]
  },
  pillar2: {
    number: '02',
    icon: Magnet,
    displayTitle: 'THE MEMORY',
    subtitle: 'CRM & Lead Tracking',
    subtitleMobile: 'CRM',
    categoryHex: colors.redSolid,
    categoryLabel: 'GET CLIENTS',
    body: 'Every lead, every deal, and every follow-up tracked in one place',
    systemPurpose: 'Stop losing leads.',
    subServices: [
      { title: 'How it connects', description: 'Everything your website catches lands here. When you move a deal forward automation knows, when you win a job invoices get sent, and when something stalls you get reminded.' },
      { title: 'What this unlocks', description: 'Your AI assistant can read the CRM before a call and know who\'s ringing. Your dashboard can show pipeline and forecast. Nothing lives in your head anymore.' }
    ]
  },
  pillar3: {
    number: '03',
    icon: Cog,
    displayTitle: 'THE ENGINE',
    subtitle: 'Automation',
    subtitleMobile: 'Automation',
    categoryHex: colors.redSolid,
    categoryLabel: 'GET CLIENTS',
    body: 'Data moves between your tools without anyone doing it manually',
    systemPurpose: 'Stop losing leads.',
    subServices: [
      { title: 'How it connects', description: 'When a lead comes in it replies, when a deal closes it invoices, and when someone forgets to follow up it chases. It watches your CRM and acts without you lifting a finger.' },
      { title: 'What this unlocks', description: 'Your website and CRM become a machine that runs while you sleep. You stop doing admin and your team stops forgetting things.' }
    ]
  },
  pillar4: {
    number: '04',
    icon: Brain,
    displayTitle: 'THE ASSISTANT',
    subtitle: 'AI Assistants',
    subtitleMobile: 'AI Bots',
    categoryHex: colors.gold,
    categoryLabel: 'SCALE FASTER',
    body: 'AI that answers your phone, qualifies leads, and handles repetitive questions',
    systemPurpose: 'Do more without hiring more.',
    subServices: [
      { title: 'How it connects', description: 'When your website captures leads, AI picks up the phone, reads your CRM to know who\'s calling, and updates the record after the call without you touching it.' },
      { title: 'What this unlocks', description: 'You double your lead volume without hiring. Your CRM stays updated without your team doing data entry and nights and weekends are covered.' }
    ]
  },
  pillar5: {
    number: '05',
    icon: LayoutGrid,
    displayTitle: 'THE AMPLIFIER',
    subtitle: 'Content Systems',
    subtitleMobile: 'Content',
    categoryHex: colors.gold,
    categoryLabel: 'SCALE FASTER',
    body: 'One conversation turned into a month of content across every platform',
    systemPurpose: 'Do more without hiring more.',
    subServices: [
      { title: 'How it connects', description: 'More content means more traffic, more traffic means more leads hitting your website, and more leads means more work for your CRM, automation, and AI to handle.' },
      { title: 'What this unlocks', description: 'You stay visible without posting every day. Your website has something to catch and the rest of the system has fuel to run on.' }
    ]
  },
  pillar6: {
    number: '06',
    icon: Dna,
    displayTitle: 'THE COACH',
    subtitle: 'Team Training',
    subtitleMobile: 'Training',
    categoryHex: colors.gold,
    categoryLabel: 'SCALE FASTER',
    body: 'Short videos, clear guides, and support until your team actually uses the tools',
    systemPurpose: 'Do more without hiring more.',
    subServices: [
      { title: 'How it connects', description: 'Your CRM only works if your team uses it, your automation only works if your data is clean, and your AI only works if people trust it. Training makes sure they do.' },
      { title: 'What this unlocks', description: 'The tools you paid for actually get used. Data stays clean, your dashboard tells the truth, and nothing becomes expensive shelfware.' }
    ]
  },
  pillar7: {
    number: '07',
    icon: BarChart3,
    displayTitle: 'THE DASHBOARD',
    subtitle: 'Dashboards & Reporting',
    subtitleMobile: 'Dashboards',
    categoryHex: colors.dark,
    categoryLabel: 'SEE CLEARLY',
    body: 'Revenue, margin, and pipeline on one screen, updated live',
    systemPurpose: 'Know your numbers.',
    subServices: [
      { title: 'How it connects', description: 'Your dashboard pulls from everything. Website traffic, CRM pipeline, automation logs, AI call stats, and training adoption all visible on one screen.' },
      { title: 'What this unlocks', description: 'You see problems before they cost you money, you know which marketing works, and you stop guessing and start steering.' }
    ]
  }
};

/**
 * Merges SERVICES data with SystemPage-specific view data
 * This creates a single source of truth by combining base service data with view-specific properties
 */
export const getAllPillars = (): SystemPillarDetail[] => {
  return SERVICES.map(service => {
    const viewData = SYSTEM_PILLAR_VIEW_DATA[service.id];
    if (!viewData) {
      throw new Error(`Missing view data for pillar: ${service.id}`);
    }
    
    return {
      ...service,
      number: viewData.number,
      icon: viewData.icon,
      title: viewData.displayTitle, // Use SystemPage-specific display title
      subtitle: viewData.subtitle, // Override with SystemPage-specific subtitle
      subtitleMobile: viewData.subtitleMobile,
      categoryHex: viewData.categoryHex,
      categoryLabel: viewData.categoryLabel,
      body: viewData.body,
      systemPurpose: viewData.systemPurpose,
      subServices: viewData.subServices,
    };
  });
};

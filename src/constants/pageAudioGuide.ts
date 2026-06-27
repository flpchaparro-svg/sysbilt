export type PageAudioGuideEntry = {
  src: string;
  label: string;
};

/** Per-route narration audio served from `/public/audio/`. */
export const PAGE_AUDIO_GUIDES: Record<string, PageAudioGuideEntry> = {
  '/': {
    src: '/audio/home.mp3',
    label: 'Listen to homepage overview',
  },
  '/system': {
    src: '/audio/system.mp3',
    label: 'Listen to system overview',
  },
  '/pillar1': {
    src: '/audio/website-ecommerce.mp3',
    label: 'Listen to Websites & E-Commerce overview',
  },
  '/pillar2': {
    src: '/audio/crm-lead-tracking.mp3',
    label: 'Listen to CRM & Lead Tracking overview',
  },
  '/pillar3': {
    src: '/audio/automation.mp3',
    label: 'Listen to Automation overview',
  },
  '/pillar4': {
    src: '/audio/ai-assistants.mp3',
    label: 'Listen to AI Assistants overview',
  },
  '/pillar5': {
    src: '/audio/content-systems.mp3',
    label: 'Listen to Content Systems overview',
  },
  '/pillar6': {
    src: '/audio/team-training.mp3',
    label: 'Listen to Team Training overview',
  },
  '/pillar7': {
    src: '/audio/dashboards.mp3',
    label: 'Listen to Dashboards overview',
  },
};

export function getPageAudioGuide(pathname: string): PageAudioGuideEntry | null {
  return PAGE_AUDIO_GUIDES[pathname] ?? null;
}

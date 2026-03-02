import { LucideIcon } from 'lucide-react';

export interface Persona {
  id: string;
  icon: LucideIcon;
  title: string;
  examples: string;
  painTitle: string;
  painText: string;
  solution: string;
}

export interface Tier {
  id: string;
  label: string;
  hook: string;
  summary: string;
  sprint: string;
  specs: string[];
  personas: Persona[];
}

export interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string; // Used in SystemPhases/Modal (e.g., "The Face")
  technicalLabel?: string; // Full technical label for display box (optional - not currently used)
  systemGroup?: string; // New field for System Architecture Grouping
  symptom?: string; // New field for Diagnostic Modal
  description: string; // Full description for display box
  smallCardBody?: string; // Short hook/question text for desktop small cards
  features: string[];
  visualPrompt: string;
  bgImage?: string; // Optional - not currently used
  icon?: string; // Optional - not currently used (string names are unused, components import icons directly)
}

// Extended interface for SystemPage grid view
export interface SystemPillarDetail extends ServiceDetail {
  number: string; // e.g., '01', '02'
  icon: LucideIcon; // React component icon
  subtitle: string; // SystemPage-specific subtitle (e.g., "Websites & E-commerce")
  subtitleMobile?: string; // Mobile-specific subtitle
  categoryHex: string; // Color for the pillar
  categoryLabel: string; // e.g., "GET CLIENTS"
  body: string; // Short body text for grid cards
  systemPurpose: string; // Core function description
  subServices: Array<{
    title: string;
    description: string;
  }>;
}

export type GridSpan = {
  col: string;
  row: string;
};

// --- NEW SANITY CMS TYPES ---
export interface SanityService {
  _id: string;
  serviceName: string;
  pillar: string;
  systemPhase: string;
  tagline: string;
  promise: string;
  theirPain: string;
  whoBuysIt: string;
  sprintLength: string;
  setupFee: string;
  retainer: string;
  keyTools: string[];
  leadsTo: string;
}
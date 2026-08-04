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
  subtitle: string; 
  technicalLabel?: string; 
  systemGroup?: string; 
  symptom?: string; 
  description: string; 
  smallCardBody?: string; 
  features: string[];
  visualPrompt: string;
  bgImage?: string; 
  icon?: string; 
}

export interface SystemPillarDetail extends Omit<ServiceDetail, 'icon'> {
  number: string; 
  icon: LucideIcon; 
  subtitle: string; 
  subtitleMobile?: string; 
  categoryHex: string; 
  categoryLabel: string; 
  body: string; 
  systemPurpose: string; 
  subServices: Array<{
    title: string;
    description: string;
  }>;
}

export type GridSpan = {
  col: string;
  row: string;
};

// --- SANITY CMS TYPES ---
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
  // setupFee and retainer have been securely removed from the frontend type
  keyTools: string[];
  leadsTo: string;
}

export interface SanityCaseStudy {
  _id: string;
  clientName: string;
  clientIndustry: string;
  pillarFocus: string;
  terminalLines: string[];
  problemItems: Array<{
    title: string;
    metric: string;
    label: string;
    desc: string;
    impact: string;
  }>;
  solutionItems: Array<{
    title: string;
    what: string;
    why: string;
  }>;
  evidenceMetrics: Array<{
    label: string;
    val: number;
    prefix: string;
    suffix: string;
    note: string;
  }>;
  beforeImage?: string;
  afterImage?: string;
  gallery?: string[];
}
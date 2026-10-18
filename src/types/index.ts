export interface PrayerOffering {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  durationOrSchedule: string;
  whatIsIncluded: string[];
  contribution: string;
  isFeatured?: boolean;
}

export interface PrayerInquiry {
  id: string;
  seekerName: string;
  email: string;
  phone?: string;
  intentionCategory: 'Healing & Health' | 'Grief & Comfort' | 'Guidance & Clarity' | 'Family & Relationships' | 'Gratitude & Peace' | 'Other';
  serviceRequested?: string;
  message: string;
  candleLit: boolean;
  createdAt: string;
  status: 'new' | 'in_prayer' | 'completed' | 'archived';
  spiritualNotes?: string;
}

export interface SitePillar {
  id: string;
  title: string;
  description: string;
}

export interface CoreValue {
  id?: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  seekerName: string;
  locationOrContext: string;
  intentionSummary: string;
}

export interface SiteContent {
  branding: {
    siteName: string;
    tagline: string;
    contactEmail: string;
    locationNote: string;
  };
  hero: {
    badgeText: string;
    headline: string;
    subheadline: string;
    quoteText: string;
    quoteAuthor: string;
    primaryCtaText: string;
    secondaryCtaText: string;
  };
  approach: {
    sectionKicker: string;
    title: string;
    description: string;
    pillars: SitePillar[];
  };
  about: {
    sectionKicker: string;
    title: string;
    practitionerName: string;
    practitionerRole: string;
    narrativeParagraphs: string[];
    missionStatement: string;
    values: CoreValue[];
  };
  services: {
    sectionKicker: string;
    title: string;
    description: string;
    offerings: PrayerOffering[];
  };
  testimonials: {
    sectionKicker: string;
    title: string;
    items: Testimonial[];
  };
  contact: {
    sectionKicker: string;
    title: string;
    description: string;
    responsePledge: string;
    confidentialityNotice: string;
  };
}

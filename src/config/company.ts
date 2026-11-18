/**
 * Central AASAN LIFE Company & Enquiry Configuration
 * ---------------------------------------------------------------------------
 * Update company contact placeholders and integration endpoints here.
 * All UI sections (Navbar, Enquiry Form, Footer) read directly from this file.
 */

export interface CompanyConfig {
  companyName: string;
  tagline: string;
  shortDescription: string;
  contact: {
    phoneDisplay: string;
    whatsappDisplay: string;
    /**
     * Digits only with country code (e.g. "919876543210") to enable live
     * WhatsApp enquiry redirection. Leave empty until your official number is ready.
     */
    whatsappDigits: string;
    emailDisplay: string;
    addressDisplay: string;
  };
  integrations: {
    /**
     * Optional Google Apps Script / CRM / REST webhook URL for live form POSTs.
     * Example: "https://script.google.com/macros/s/YOUR_DEPLOY_ID/exec"
     * Leave empty to run in transparent Demo Preview + WhatsApp fallback mode.
     */
    enquiryApiEndpoint: string;
    /**
     * Optional webhook URL for newsletter email subscriptions.
     * Leave empty for transparent Demo Mode preview confirmation.
     */
    newsletterApiEndpoint: string;
  };
  social: {
    /**
     * Add full profile URLs (e.g. "https://www.linkedin.com/company/aasan-life")
     * when official pages are live. Leave empty for placeholder state.
     */
    linkedinUrl: string;
    instagramUrl: string;
    facebookUrl: string;
  };
}

export const COMPANY_CONFIG: CompanyConfig = {
  companyName: 'AASAN LIFE',
  tagline: 'Insurance for a Secure Tomorrow.',
  shortDescription:
    'An online insurance training platform offering a paid internship programme to help aspiring professionals learn insurance fundamentals, products, and industry operations.',
  contact: {
    phoneDisplay: '[ADD COMPANY PHONE NUMBER]',
    whatsappDisplay: '[ADD WHATSAPP NUMBER]',
    whatsappDigits: '',
    emailDisplay: '[ADD COMPANY EMAIL]',
    addressDisplay: '[ADD COMPANY ADDRESS]',
  },
  integrations: {
    enquiryApiEndpoint: '',
    newsletterApiEndpoint: '',
  },
  social: {
    linkedinUrl: '',
    instagramUrl: '',
    facebookUrl: '',
  },
};

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Internship Programme', href: '#internship-programme' },
  { label: "What You'll Learn", href: '#curriculum' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Contact Us', href: '#contact' },
];

export interface ParticipantStory {
  id: string;
  name: string;
  initials: string;
  qualification: string;
  city: string;
  feedback: string;
  focusArea: string;
}

/**
 * Editable participant feedback entries for the Student Success Stories carousel.
 * Replace with verified participant testimonials as cohorts complete the programme.
 */
export const PARTICIPANT_STORIES: ParticipantStory[] = [
  {
    id: 'story-1',
    name: 'Ananya Deshmukh',
    initials: 'AD',
    qualification: 'B.Com Graduate',
    city: 'Pune',
    feedback:
      'Before joining AASAN LIFE, policy terms and corporate coverage felt confusing. The online modules broke down life, general, and corporate insurance step by step so everything finally made sense.',
    focusArea: 'Fundamentals & Corporate Insurance',
  },
  {
    id: 'story-2',
    name: 'Rohan Kulkarni',
    initials: 'RK',
    qualification: 'Final Year BBA Student',
    city: 'Bengaluru',
    feedback:
      'Because the training is 100% online, I could attend alongside my college schedule. Learning how insurance operations and documentation actually work gave me real clarity on the sector.',
    focusArea: 'Insurance Operations',
  },
  {
    id: 'story-3',
    name: 'Priya Nair',
    initials: 'PN',
    qualification: 'MBA (Finance) Graduate',
    city: 'Kochi',
    feedback:
      'The corporate insurance sessions on Fire, Marine, and Group Health policies were especially useful. It helped me connect textbook finance concepts to practical business risk protection.',
    focusArea: 'Corporate Insurance & Risk',
  },
  {
    id: 'story-4',
    name: 'Karthik Iyer',
    initials: 'KI',
    qualification: 'B.A. Economics Graduate',
    city: 'Chennai',
    feedback:
      'I came from a non-commerce background and wanted to understand the insurance industry from scratch. The structured approach made risk assessment and policy basics easy to follow.',
    focusArea: 'Risk Assessment',
  },
  {
    id: 'story-5',
    name: 'Sneha Chatterjee',
    initials: 'SC',
    qualification: 'M.Com Student',
    city: 'Kolkata',
    feedback:
      'What stood out for me was the focus on professional communication and customer interaction alongside technical insurance concepts. It builds genuine confidence when discussing products.',
    focusArea: 'Professional Skills',
  },
  {
    id: 'story-6',
    name: 'Aditya Verma',
    initials: 'AV',
    qualification: 'B.Sc. Mathematics Graduate',
    city: 'Jaipur',
    feedback:
      'The online internship gave me a clear foundation in how life and general insurers evaluate risk and structure policies. Every module felt practical, focused, and easy to revisit.',
    focusArea: 'Life & General Insurance',
  },
];

export interface KeyMetric {
  id: 'students-enrolled' | 'industry-partners' | 'courses-completed';
  label: string;
  targetValue: number;
  suffix: string;
  description: string;
}

/**
 * Editable Key Metrics figures for the animated counter section.
 * Update targetValue and suffix with verified AASAN LIFE figures.
 */
export const KEY_METRICS: KeyMetric[] = [
  {
    id: 'students-enrolled',
    label: 'Students Enrolled',
    targetValue: 1250,
    suffix: '+',
    description: 'Aspiring insurance learners registered across online training cohorts.',
  },
  {
    id: 'industry-partners',
    label: 'Industry Partners',
    targetValue: 35,
    suffix: '+',
    description: 'Insurance sector collaborators supporting practical industry perspectives.',
  },
  {
    id: 'courses-completed',
    label: 'Courses Completed',
    targetValue: 980,
    suffix: '+',
    description: 'Structured online insurance training modules completed by learners.',
  },
];



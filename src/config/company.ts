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

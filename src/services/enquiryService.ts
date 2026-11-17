import { COMPANY_CONFIG } from '../config/company';

export type CurrentStatus = 'Student' | 'Graduate' | 'Working Professional' | 'Other';
export type PreferredContactMethod = 'Call' | 'WhatsApp';

export interface EnquiryPayload {
  fullName: string;
  mobileNumber: string;
  email: string;
  qualification: string;
  currentStatus: CurrentStatus;
  city: string;
  preferredContact: PreferredContactMethod;
}

export interface EnquirySubmissionResult {
  mode: 'live-api' | 'demo-fallback';
  submittedAt: string;
  whatsappUrl: string | null;
  formattedSummary: string;
}

export function formatEnquiryMessage(payload: EnquiryPayload): string {
  return [
    'Hello AASAN LIFE Team,',
    'I would like to enquire about the Online Paid Internship Programme.',
    '',
    `Full Name: ${payload.fullName}`,
    `Mobile Number: ${payload.mobileNumber}`,
    `Email Address: ${payload.email}`,
    `Current Qualification: ${payload.qualification}`,
    `Current Status: ${payload.currentStatus}`,
    `City: ${payload.city}`,
    `Preferred Contact Method: ${payload.preferredContact}`,
  ].join('\n');
}

export function buildWhatsAppEnquiryUrl(payload: EnquiryPayload): string | null {
  const digits = COMPANY_CONFIG.contact.whatsappDigits.replace(/\D/g, '');
  if (!digits) {
    return null;
  }
  const encodedText = encodeURIComponent(formatEnquiryMessage(payload));
  return `https://wa.me/${digits}?text=${encodedText}`;
}

export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquirySubmissionResult> {
  const endpoint = COMPANY_CONFIG.integrations.enquiryApiEndpoint.trim();
  const formattedSummary = formatEnquiryMessage(payload);
  const whatsappUrl = buildWhatsAppEnquiryUrl(payload);
  const submittedAt = new Date().toISOString();

  if (endpoint) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        source: 'AASAN LIFE Landing Page',
        submittedAt,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Unable to submit enquiry to the configured endpoint (HTTP ${response.status}). Please try WhatsApp or try again shortly.`
      );
    }

    return {
      mode: 'live-api',
      submittedAt,
      whatsappUrl,
      formattedSummary,
    };
  }

  // No backend endpoint configured yet: return transparent demo-fallback mode
  // without faking a server database save.
  await new Promise((resolve) => setTimeout(resolve, 350));

  return {
    mode: 'demo-fallback',
    submittedAt,
    whatsappUrl,
    formattedSummary,
  };
}

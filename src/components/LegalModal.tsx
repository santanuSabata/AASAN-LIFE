import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

export type LegalDocType = 'privacy' | 'terms' | null;

interface LegalModalProps {
  docType: LegalDocType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ docType, onClose }) => {
  useEffect(() => {
    if (!docType) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [docType, onClose]);

  if (!docType) return null;

  const isPrivacy = docType === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A2055]/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl border border-[#0A2055]/15 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#0A2055]/10 bg-[#F5F8FC]">
          <h2
            id="legal-modal-title"
            className="text-lg font-bold text-[#0A2055]"
          >
            {title} — {COMPANY_CONFIG.companyName}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
            className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-[#0A2055] hover:bg-[#0A2055]/8 transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-sm text-[#17233D]/85 leading-relaxed max-h-[70vh] overflow-y-auto">
          {isPrivacy ? (
            <>
              <p>
                {COMPANY_CONFIG.companyName} respects your privacy. Information submitted through
                the programme enquiry form (such as your full name, mobile number, email address,
                qualification, current status, city, and preferred contact method) is collected
                solely to respond to your enquiry regarding the Online Paid Internship Programme.
              </p>
              <p>
                We do not sell or rent your personal contact details to third-party marketers. If
                you would like your enquiry details updated or removed, please contact our team
                using the official contact details listed in the footer.
              </p>
            </>
          ) : (
            <>
              <p>
                By submitting an enquiry on the {COMPANY_CONFIG.companyName} website, you express
                interest in receiving programme information regarding the Online Paid Insurance
                Internship Programme.
              </p>
              <p>
                Programme schedules, applicable fees, duration, and enrolment terms are shared
                directly by the {COMPANY_CONFIG.companyName} team prior to registration. Submitting
                an enquiry form does not constitute automatic enrolment.
              </p>
            </>
          )}
        </div>

        <div className="px-6 py-4 border-t border-[#0A2055]/10 bg-[#F5F8FC]/60 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-white bg-[#1455D9] hover:bg-[#0A2055] rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

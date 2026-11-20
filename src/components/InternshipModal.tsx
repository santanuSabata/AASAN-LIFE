import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { EnquiryFormFields } from './EnquiryFormFields';

interface InternshipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InternshipModal: React.FC<InternshipModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="internship-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A2055]/65 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl border border-[#0A2055]/15 shadow-[0_24px_60px_rgba(10,32,85,0.28)] overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 px-6 py-5 bg-[#0A2055] text-white shrink-0">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#E4B052] mb-1">
              AASAN BIMA EDUCATION · Online Paid Internship Programme
            </p>
            <h2
              id="internship-modal-title"
              className="text-xl sm:text-2xl font-bold text-white leading-snug"
            >
              Apply for the Insurance Internship Programme
            </h2>
            <p className="text-sm text-white/80 mt-1">
              Share your details below and our team will contact you with programme and enrolment
              information.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close internship enquiry modal"
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-white/85 hover:text-white hover:bg-white/12 transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4B052]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          <EnquiryFormFields idPrefix="modal" compact />
        </div>
      </div>
    </div>
  );
};
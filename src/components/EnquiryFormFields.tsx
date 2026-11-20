import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  Loader2,
  MessageCircle,
  Phone,
  Send,
  Info,
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';
import {
  CurrentStatus,
  EnquiryPayload,
  EnquirySubmissionResult,
  PreferredContactMethod,
  submitEnquiry,
} from '../services/enquiryService';
import { submitEnquiryToGoogleSheet } from './HeroSection';

interface FormErrors {
  fullName?: string;
  mobileNumber?: string;
  email?: string;
  qualification?: string;
  city?: string;
}

interface EnquiryFormFieldsProps {
  idPrefix: string;
  compact?: boolean;
}

const INITIAL_FORM: EnquiryPayload = {
  fullName: '',
  mobileNumber: '',
  email: '',
  qualification: '',
  currentStatus: 'Student',
  city: '',
  preferredContact: 'WhatsApp',
};

const STATUS_OPTIONS: CurrentStatus[] = [
  'Student',
  'Graduate',
  'Working Professional',
  'Other',
];

function normalizeIndianMobile(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }
  return digits;
}

export const EnquiryFormFields: React.FC<EnquiryFormFieldsProps> = ({
  idPrefix,
  compact = false,
}) => {
  const [formData, setFormData] = useState<EnquiryPayload>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<EnquirySubmissionResult | null>(null);
  const [copied, setCopied] = useState(false);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    const cleanedMobile = normalizeIndianMobile(formData.mobileNumber);
    if (!/^[6-9]\d{9}$/.test(cleanedMobile)) {
      nextErrors.mobileNumber = 'Please enter a valid 10-digit Indian mobile number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.qualification.trim()) {
      nextErrors.qualification = 'Please enter your current qualification.';
    }

    if (!formData.city.trim()) {
      nextErrors.city = 'Please enter your city.';
    }

    return nextErrors;
  };

  const handleFieldChange = <K extends keyof EnquiryPayload>(
    field: K,
    value: EnquiryPayload[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field in errors) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field as keyof FormErrors];
        return updated;
      });
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const normalizedPayload: EnquiryPayload = {
        ...formData,
        fullName: formData.fullName.trim(),
        mobileNumber: normalizeIndianMobile(formData.mobileNumber),
        email: formData.email.trim(),
        qualification: formData.qualification.trim(),
        city: formData.city.trim(),
      };

      // 1. Transmit directly to Google Sheets via your Apps Script Web App
      await submitEnquiryToGoogleSheet({
        name: normalizedPayload.fullName,
        phone: normalizedPayload.mobileNumber,
        email: normalizedPayload.email,
        course: `${normalizedPayload.qualification} (${normalizedPayload.currentStatus})`,
        message: `City: ${normalizedPayload.city} | Preferred Contact: ${normalizedPayload.preferredContact}`,
        source: idPrefix,
        ...normalizedPayload,
      } as any);

      // 2. Build formatted summary & WhatsApp link using your existing service
      const result = await submitEnquiry(normalizedPayload);

      // 3. Switch mode to 'live-api' so the green confirmation banner displays
      setSubmissionResult({
        ...result,
        mode: 'live-api',
      });
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred while submitting your enquiry.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopySummary = async () => {
    if (!submissionResult) return;
    try {
      await navigator.clipboard.writeText(submissionResult.formattedSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setSubmitError(null);
    setSubmissionResult(null);
    setCopied(false);
  };

  const inputPad = compact ? 'px-3.5 py-2.5 text-sm sm:text-base' : 'px-4 py-3 text-base';

  if (submissionResult) {
    return (
      <div className="space-y-5" role="status" aria-live="polite">
        {submissionResult.mode === 'live-api' ? (
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
            <CheckCircle2
              className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <h3 className="text-lg font-bold">Enquiry Submitted Successfully</h3>
              <p className="text-sm mt-1">
                Thank you, {formData.fullName}. Your enquiry has been recorded and our team will
                contact you via {formData.preferredContact}.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-amber-50 border border-amber-200 text-[#0A2055]">
            <Info className="w-6 h-6 text-[#E4B052] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="text-lg font-bold">Enquiry Validated (Demo Mode Preview)</h3>
              <p className="text-sm text-[#17233D]/85 mt-1">
                No live backend API or Google Sheets webhook is connected yet, so this enquiry was
                not transmitted to a server. You can send your formatted enquiry via WhatsApp (once
                configured) or copy it below.
              </p>
            </div>
          </div>
        )}

        <div className="bg-[#F5F8FC] border border-[#0A2055]/10 rounded-xl p-5">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A2055]">
              Formatted Enquiry Summary
            </span>
            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1455D9] bg-white border border-[#1455D9]/25 rounded-md hover:bg-[#1455D9] hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copy Details</span>
                </>
              )}
            </button>
          </div>
          <pre className="text-sm text-[#17233D] whitespace-pre-wrap font-[family-name:var(--font-sans)] leading-relaxed">
            {submissionResult.formattedSummary}
          </pre>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {submissionResult.whatsappUrl ? (
            <a
              href={submissionResult.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#1455D9] hover:bg-[#0A2055] rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Send Enquiry via WhatsApp</span>
            </a>
          ) : (
            <div className="text-xs text-[#17233D]/75 bg-[#F5F8FC] border border-[#0A2055]/10 rounded-lg px-4 py-2.5">
              WhatsApp fallback ready: add{' '}
              <code className="font-mono text-[#0A2055]">whatsappDigits</code> in{' '}
              <code className="font-mono text-[#0A2055]">src/config/company.ts</code> to enable
              one-click WhatsApp submission.
            </div>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-[#0A2055] bg-white border border-[#0A2055]/20 hover:bg-[#F5F8FC] rounded-lg transition-colors"
          >
            Edit or Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={compact ? 'space-y-4' : 'space-y-5'}>
      {submitError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-900 text-sm"
        >
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{submitError}</span>
        </div>
      )}

      <div className={`grid grid-cols-1 sm:grid-cols-2 ${compact ? 'gap-4' : 'gap-5'}`}>
        {/* 1. Full Name */}
        <div>
          <label
            htmlFor={`${idPrefix}-fullName`}
            className="block text-sm font-semibold text-[#0A2055] mb-1.5"
          >
            Full Name <span className="text-[#E4B052]">*</span>
          </label>
          <input
            id={`${idPrefix}-fullName`}
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => handleFieldChange('fullName', e.target.value)}
            placeholder="Enter your full name"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? `${idPrefix}-fullName-error` : undefined}
            className={`w-full ${inputPad} text-[#17233D] bg-[#F5F8FC]/60 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1455D9]/30 focus:bg-white transition-colors ${
              errors.fullName
                ? 'border-red-600 focus:border-red-600'
                : 'border-[#0A2055]/15 focus:border-[#1455D9]'
            }`}
          />
          {errors.fullName && (
            <p
              id={`${idPrefix}-fullName-error`}
              className="mt-1.5 text-xs font-medium text-red-700 flex items-center gap-1"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        {/* 2. Mobile Number */}
        <div>
          <label
            htmlFor={`${idPrefix}-mobileNumber`}
            className="block text-sm font-semibold text-[#0A2055] mb-1.5"
          >
            Mobile Number <span className="text-[#E4B052]">*</span>
          </label>
          <input
            id={`${idPrefix}-mobileNumber`}
            name="mobileNumber"
            type="tel"
            inputMode="numeric"
            required
            value={formData.mobileNumber}
            onChange={(e) => handleFieldChange('mobileNumber', e.target.value)}
            placeholder="10-digit mobile number"
            aria-invalid={Boolean(errors.mobileNumber)}
            aria-describedby={errors.mobileNumber ? `${idPrefix}-mobileNumber-error` : undefined}
            className={`w-full ${inputPad} text-[#17233D] bg-[#F5F8FC]/60 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1455D9]/30 focus:bg-white transition-colors ${
              errors.mobileNumber
                ? 'border-red-600 focus:border-red-600'
                : 'border-[#0A2055]/15 focus:border-[#1455D9]'
            }`}
          />
          {errors.mobileNumber && (
            <p
              id={`${idPrefix}-mobileNumber-error`}
              className="mt-1.5 text-xs font-medium text-red-700 flex items-center gap-1"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.mobileNumber}</span>
            </p>
          )}
        </div>

        {/* 3. Email Address */}
        <div>
          <label
            htmlFor={`${idPrefix}-email`}
            className="block text-sm font-semibold text-[#0A2055] mb-1.5"
          >
            Email Address <span className="text-[#E4B052]">*</span>
          </label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${idPrefix}-email-error` : undefined}
            className={`w-full ${inputPad} text-[#17233D] bg-[#F5F8FC]/60 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1455D9]/30 focus:bg-white transition-colors ${
              errors.email
                ? 'border-red-600 focus:border-red-600'
                : 'border-[#0A2055]/15 focus:border-[#1455D9]'
            }`}
          />
          {errors.email && (
            <p
              id={`${idPrefix}-email-error`}
              className="mt-1.5 text-xs font-medium text-red-700 flex items-center gap-1"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* 4. Current Qualification */}
        <div>
          <label
            htmlFor={`${idPrefix}-qualification`}
            className="block text-sm font-semibold text-[#0A2055] mb-1.5"
          >
            Current Qualification <span className="text-[#E4B052]">*</span>
          </label>
          <input
            id={`${idPrefix}-qualification`}
            name="qualification"
            type="text"
            required
            value={formData.qualification}
            onChange={(e) => handleFieldChange('qualification', e.target.value)}
            placeholder="e.g. B.Com, BBA, MBA, 12th"
            aria-invalid={Boolean(errors.qualification)}
            aria-describedby={errors.qualification ? `${idPrefix}-qualification-error` : undefined}
            className={`w-full ${inputPad} text-[#17233D] bg-[#F5F8FC]/60 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1455D9]/30 focus:bg-white transition-colors ${
              errors.qualification
                ? 'border-red-600 focus:border-red-600'
                : 'border-[#0A2055]/15 focus:border-[#1455D9]'
            }`}
          />
          {errors.qualification && (
            <p
              id={`${idPrefix}-qualification-error`}
              className="mt-1.5 text-xs font-medium text-red-700 flex items-center gap-1"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.qualification}</span>
            </p>
          )}
        </div>

        {/* 5. Current Status */}
        <div>
          <label
            htmlFor={`${idPrefix}-currentStatus`}
            className="block text-sm font-semibold text-[#0A2055] mb-1.5"
          >
            Current Status <span className="text-[#E4B052]">*</span>
          </label>
          <select
            id={`${idPrefix}-currentStatus`}
            name="currentStatus"
            value={formData.currentStatus}
            onChange={(e) =>
              handleFieldChange('currentStatus', e.target.value as CurrentStatus)
            }
            className={`w-full ${inputPad} text-[#17233D] bg-[#F5F8FC]/60 border border-[#0A2055]/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1455D9]/30 focus:border-[#1455D9] focus:bg-white transition-colors`}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* 6. City */}
        <div>
          <label
            htmlFor={`${idPrefix}-city`}
            className="block text-sm font-semibold text-[#0A2055] mb-1.5"
          >
            City <span className="text-[#E4B052]">*</span>
          </label>
          <input
            id={`${idPrefix}-city`}
            name="city"
            type="text"
            required
            value={formData.city}
            onChange={(e) => handleFieldChange('city', e.target.value)}
            placeholder="Enter your city"
            aria-invalid={Boolean(errors.city)}
            aria-describedby={errors.city ? `${idPrefix}-city-error` : undefined}
            className={`w-full ${inputPad} text-[#17233D] bg-[#F5F8FC]/60 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1455D9]/30 focus:bg-white transition-colors ${
              errors.city
                ? 'border-red-600 focus:border-red-600'
                : 'border-[#0A2055]/15 focus:border-[#1455D9]'
            }`}
          />
          {errors.city && (
            <p
              id={`${idPrefix}-city-error`}
              className="mt-1.5 text-xs font-medium text-red-700 flex items-center gap-1"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.city}</span>
            </p>
          )}
        </div>
      </div>

      {/* 7. Preferred Contact Method */}
      <fieldset>
        <legend className="block text-sm font-semibold text-[#0A2055] mb-2">
          Preferred Contact Method <span className="text-[#E4B052]">*</span>
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {(['Call', 'WhatsApp'] as PreferredContactMethod[]).map((method) => {
            const isSelected = formData.preferredContact === method;
            return (
              <label
                key={method}
                className={`flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-lg border cursor-pointer text-sm font-semibold transition-colors ${
                  isSelected
                    ? 'bg-[#1455D9]/8 border-[#1455D9] text-[#0A2055]'
                    : 'bg-[#F5F8FC]/60 border-[#0A2055]/15 text-[#17233D]/80 hover:border-[#1455D9]/40'
                }`}
              >
                <input
                  type="radio"
                  name={`${idPrefix}-preferredContact`}
                  value={method}
                  checked={isSelected}
                  onChange={() => handleFieldChange('preferredContact', method)}
                  className="sr-only"
                />
                {method === 'Call' ? (
                  <Phone
                    className={`w-4 h-4 ${isSelected ? 'text-[#1455D9]' : 'text-[#17233D]/60'}`}
                    aria-hidden="true"
                  />
                ) : (
                  <MessageCircle
                    className={`w-4 h-4 ${isSelected ? 'text-[#1455D9]' : 'text-[#17233D]/60'}`}
                    aria-hidden="true"
                  />
                )}
                <span>{method}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full inline-flex items-center justify-center gap-2 px-6 ${
          compact ? 'py-3.5' : 'py-4'
        } text-base font-semibold text-white bg-[#1455D9] hover:bg-[#0A2055] disabled:opacity-60 disabled:cursor-not-allowed rounded-lg transition-colors duration-150 shadow-[0_6px_20px_rgba(20,85,217,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9]`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
            <span>Processing Enquiry...</span>
          </>
        ) : (
          <>
            <span>Submit Enquiry</span>
            <Send className="w-4 h-4" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
};
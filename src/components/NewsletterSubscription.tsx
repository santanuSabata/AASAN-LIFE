import React, { useEffect, useState } from 'react';
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, Mail, X } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface ToastState {
  id: number;
  email: string;
  mode: 'live' | 'demo';
}

export const NewsletterSubscription: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => {
      setToast(null);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const endpoint = COMPANY_CONFIG.integrations.newsletterApiEndpoint.trim();

      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: trimmed,
            source: 'AASAN BIMA EDUCATION Footer Newsletter',
            subscribedAt: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error('Unable to complete subscription right now. Please try again.');
        }

        setToast({ id: Date.now(), email: trimmed, mode: 'live' });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 250));
        setToast({ id: Date.now(), email: trimmed, mode: 'demo' });
      }

      setEmail('');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to subscribe right now. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-white/6 border border-white/12 rounded-2xl p-6 sm:p-7 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E4B052] mb-1.5">
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>Industry Updates</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Stay Updated on Insurance Industry Insights
            </h2>
            <p className="text-sm text-white/75 mt-1 leading-relaxed">
              Receive updates on insurance training modules, upcoming internship cohorts, and
              industry learning resources.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubmit} noValidate className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address for industry updates
                </label>
                <input
                  id="newsletter-email"
                  name="newsletterEmail"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Enter your email address"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'newsletter-email-error' : undefined}
                  className={`flex-1 px-4 py-3 text-sm sm:text-base text-[#17233D] bg-white border rounded-lg placeholder:text-[#17233D]/50 focus:outline-none focus:ring-2 focus:ring-[#E4B052]/50 ${
                    error ? 'border-red-500' : 'border-transparent'
                  }`}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-bold text-[#0A2055] bg-[#E4B052] hover:bg-white disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4B052]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>

              {error && (
                <p
                  id="newsletter-email-error"
                  className="text-xs font-medium text-amber-300 flex items-center gap-1.5 pt-1"
                  role="alert"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{error}</span>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation Toast Message */}
      {toast && (
        <div
          key={toast.id}
          role="status"
          aria-live="polite"
          className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-50 max-w-sm bg-white text-[#17233D] border border-[#0A2055]/15 rounded-xl p-4 shadow-[0_14px_38px_rgba(10,32,85,0.22)] flex items-start gap-3"
        >
          <div className="w-9 h-9 rounded-lg bg-[#1455D9]/10 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5 text-[#1455D9]" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-[#0A2055]">
              {toast.mode === 'live'
                ? 'Subscribed for Industry Updates'
                : 'Subscription Validated (Demo Mode)'}
            </p>
            <p className="text-xs text-[#17233D]/80 mt-0.5 leading-relaxed">
              {toast.mode === 'live'
                ? `${toast.email} has been added to AASAN BIMA EDUCATION industry updates.`
                : `${toast.email} validated cleanly. Connect newsletterApiEndpoint in src/config/company.ts for live email list storage.`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            aria-label="Dismiss notification"
            className="w-7 h-7 inline-flex items-center justify-center rounded-md text-[#17233D]/60 hover:text-[#0A2055] hover:bg-[#F5F8FC] transition-colors shrink-0"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
};

import React, { useState } from 'react';
import { AppLink, AppRoutePath } from '../context/RouterContext';
import { Breadcrumb } from './Breadcrumb';
import { User, Mail, Phone, Send, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { EnquiryFormFields } from './EnquiryFormFields';
import { submitEnquiryToGoogleSheet } from './HeroSection';

interface StatItem {
  label: string;
  value: string;
  subtext?: string;
}

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbLabel?: string;
  ctaLabel?: string;
  ctaTo?: AppRoutePath;
  onCtaClick?: () => void;
  imageUrl?: string;
  imageAlt?: string;
  stats?: StatItem[];
  showQuickForm?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  breadcrumbLabel,
  ctaLabel,
  ctaTo,
  onCtaClick,
  imageUrl,
  stats,
  showQuickForm = true,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    qualification: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      await submitEnquiryToGoogleSheet({
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        course: formData.qualification.trim(),
        source: 'page-header-quick-form',
      });

      toast.success('Internship application inquiry submitted successfully!');
      setFormData({ fullName: '', email: '', phone: '', qualification: '' });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Unable to submit enquiry right now.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0A2055] via-[#0E2A6B] to-[#1455D9] text-white py-16 sm:py-5 border-b border-white/10 shadow-lg">
      {/* Background Decorative Glow Elements */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 w-[450px] h-[450px] rounded-full bg-[#1455D9]/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#E4B052]/15 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <Breadcrumb
          variant="dark"
          className="mb-6"
          items={
            breadcrumbLabel
              ? [{ label: 'Home', to: '/' }, { label: breadcrumbLabel }]
              : undefined
          }
        />

        <div className={`grid grid-cols-1 ${imageUrl ? 'lg:grid-cols-12' : ''} gap-8 items-center justify-between`}>
          {/* Left Text Content & Stats */}
          <div className={`${imageUrl ? 'lg:col-span-7' : 'max-w-4xl'}`}>
            <span className="inline-block px-3 py-1 rounded-full bg-[#E4B052]/20 border border-[#E4B052]/40 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E4B052] mb-3 shadow-xs">
              {eyebrow}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-5">
              {title}
            </h1>
            <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl mb-8">
              {description}
            </p>

            {/* Metric Cards / Stats Counter Grid */}
            {stats && stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 shadow-sm hover:bg-white/15 transition-all"
                  >
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#E4B052] tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                      {stat.label}
                    </div>
                    {stat.subtext && (
                      <div className="text-[11px] text-white/70 mt-1">
                        {stat.subtext}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {ctaLabel && (onCtaClick || ctaTo) && (
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {onCtaClick ? (
                  <button
                    type="button"
                    onClick={onCtaClick}
                    className="inline-flex items-center justify-center px-7 py-3.5 text-sm sm:text-base font-bold text-[#0A2055] bg-[#E4B052] hover:bg-white rounded-xl transition-all duration-200 whitespace-nowrap shadow-[0_6px_20px_rgba(255,133,27,0.3)] hover:-translate-y-0.5 cursor-pointer"
                  >
                    {ctaLabel}
                  </button>
                ) : ctaTo ? (
                  <AppLink
                    to={ctaTo}
                    className="inline-flex items-center justify-center px-7 py-3.5 text-sm sm:text-base font-bold text-[#0A2055] bg-[#E4B052] hover:bg-white rounded-xl transition-all duration-200 whitespace-nowrap shadow-[0_6px_20px_rgba(255,133,27,0.3)] hover:-translate-y-0.5 cursor-pointer"
                  >
                    {ctaLabel}
                  </AppLink>
                ) : null}
              </div>
            )}
          </div>

          {/* Right Featured Enquiry Card */}
           
            <div className="lg:col-span-5 relative w-full max-w-md mx-auto lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-white p-5 sm:p-6 text-[#17233D]">
                <EnquiryFormFields idPrefix="page-header" compact />
              </div>
            </div>
           
        </div> 
         
      </div>
    </section>
  );
};
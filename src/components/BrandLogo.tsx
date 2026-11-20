import React, { useState } from 'react';

const OFFICIAL_LOGO_PATH = '/assets/aistudio/logo.png';

interface BrandLogoProps {
  variant?: 'dark' | 'light';
  className?: string;
}

/**
 * Official AASAN BIMA EDUCATION brand logo component.
 * Displays the exact attached company logo without modification or distortion.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  const wrapperClasses =
    variant === 'light'
      ? 'inline-flex items-center bg-white rounded-xl px-3.5 py-2 shadow-xs shrink-0'
      : 'inline-flex items-center shrink-0';

  const imgHeightClasses =
    variant === 'light'
      ? 'h-11 sm:h-18 w-auto object-contain'
      : 'h-11 lg:h-18 w-auto object-contain';

  if (imgError) {
    return (
      <span
        className={`inline-flex items-center whitespace-nowrap shrink-0 font-[family-name:var(--font-display)] text-xl font-extrabold tracking-tight leading-none ${
          variant === 'light' ? 'text-white' : 'text-[#0A2055]'
        } ${className}`}
      >
        AASAN <span className={variant === 'light' ? 'text-[#E4B052] ml-1.5' : 'text-[#1455D9] ml-1.5'}>LIFE</span>
      </span>
    );
  }

  return (
    <span className={`${wrapperClasses} ${className}`}>
      <img
        src={OFFICIAL_LOGO_PATH}
        alt="AASAN BIMA EDUCATION — Insurance for a Secure Tomorrow"
        width={1774}
        height={887}
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className={imgHeightClasses}
      />
    </span>
  );
};


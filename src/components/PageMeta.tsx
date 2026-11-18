import React, { useEffect } from 'react';
import { useAppRouter } from '../context/RouterContext';

interface PageMetaProps {
  title: string;
  description: string;
  keywords?: string;
}

function upsertMetaTag(
  attributeName: 'name' | 'property',
  attributeValue: string,
  content: string
): void {
  if (typeof document === 'undefined') return;
  let meta = document.head.querySelector<HTMLMetaElement>(
    `meta[${attributeName}="${attributeValue}"]`
  );
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attributeName, attributeValue);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function upsertCanonicalLink(href: string): void {
  if (typeof document === 'undefined') return;
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export const PageMeta: React.FC<PageMetaProps> = ({ title, description, keywords }) => {
  const { currentPath } = useAppRouter();

  useEffect(() => {
    const canonicalUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}${currentPath}`
        : `https://www.aasanlife.example.com${currentPath}`;

    document.title = title;

    upsertMetaTag('name', 'description', description);
    if (keywords) {
      upsertMetaTag('name', 'keywords', keywords);
    }

    upsertMetaTag('property', 'og:title', title);
    upsertMetaTag('property', 'og:description', description);
    upsertMetaTag('property', 'og:url', canonicalUrl);

    upsertMetaTag('name', 'twitter:title', title);
    upsertMetaTag('name', 'twitter:description', description);

    upsertCanonicalLink(canonicalUrl);
  }, [title, description, keywords, currentPath]);

  return null;
};

import React, { useEffect } from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { AppLink, AppRoutePath, ROUTES, useAppRouter } from '../context/RouterContext';

export interface BreadcrumbItem {
  label: string;
  to?: AppRoutePath;
}

interface BreadcrumbProps {
  /**
   * Optional explicit trail. When omitted, the trail is automatically derived
   * from the active navigation path (e.g., Home > About Us).
   */
  items?: BreadcrumbItem[];
  /** Visual surface context: 'dark' for navy headers, 'light' for white/light sections. */
  variant?: 'dark' | 'light';
  /** Whether to render on the Home route ('/'). Defaults to false. */
  showOnHome?: boolean;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  variant = 'dark',
  showOnHome = false,
  className = '',
}) => {
  const { currentPath } = useAppRouter();

  const resolvedItems: BreadcrumbItem[] = React.useMemo(() => {
    if (items && items.length > 0) {
      return items;
    }

    if (currentPath === '/') {
      return showOnHome ? [{ label: ROUTES['/'].label }] : [];
    }

    const activeRoute = ROUTES[currentPath];
    return [
      { label: ROUTES['/'].label, to: '/' },
      { label: activeRoute ? activeRoute.label : 'Page' },
    ];
  }, [items, currentPath, showOnHome]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const scriptId = 'aasan-breadcrumb-jsonld';
    const existing = document.getElementById(scriptId);

    if (resolvedItems.length === 0) {
      existing?.remove();
      return;
    }

    const origin =
      typeof window !== 'undefined' ? window.location.origin : 'https://www.aasanlife.example.com';

    const payload = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: resolvedItems.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.label,
        item: item.to ? `${origin}${item.to}` : `${origin}${currentPath}`,
      })),
    };

    const script =
      existing ??
      (() => {
        const el = document.createElement('script');
        el.id = scriptId;
        el.setAttribute('type', 'application/ld+json');
        document.head.appendChild(el);
        return el;
      })();

    script.textContent = JSON.stringify(payload);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [resolvedItems, currentPath]);

  if (resolvedItems.length === 0) {
    return null;
  }

  const isDark = variant === 'dark';
  const linkClass = isDark
    ? 'inline-flex items-center gap-1.5 text-white/75 hover:text-[#E4B052] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4B052] rounded-xs'
    : 'inline-flex items-center gap-1.5 text-[#17233D]/70 hover:text-[#1455D9] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1455D9] rounded-xs';
  const separatorClass = isDark ? 'text-white/40' : 'text-[#0A2055]/30';
  const currentClass = isDark
    ? 'font-semibold text-[#E4B052]'
    : 'font-semibold text-[#0A2055]';

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
        {resolvedItems.map((item, idx) => {
          const isLast = idx === resolvedItems.length - 1;
          const isHomeItem = idx === 0 && item.to === '/';

          return (
            <React.Fragment key={`${item.label}-${idx}`}>
              {idx > 0 && (
                <li aria-hidden="true" className="inline-flex items-center">
                  <ChevronRight className={`w-3.5 h-3.5 ${separatorClass}`} />
                </li>
              )}
              <li
                className={isLast ? currentClass : undefined}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.to && !isLast ? (
                  <AppLink to={item.to} className={linkClass}>
                    {isHomeItem && <Home className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
                    <span>{item.label}</span>
                  </AppLink>
                ) : (
                  <span className="inline-flex items-center gap-1.5">
                    {isHomeItem && <Home className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
                    <span>{item.label}</span>
                  </span>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

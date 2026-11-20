import React, { createContext, useContext, useEffect, useState } from 'react';

export type AppRoutePath =
  | '/'
  | '/about-us'
  | '/internship-program'
  | '/what-you-learn'
  | '/benefits'
  | '/contact-us'
  | '/privacy-policy'
  | '/terms-and-conditions';

export interface RouteMeta {
  path: AppRoutePath;
  label: string;
  title: string;
}

export const ROUTES: Record<AppRoutePath, RouteMeta> = {
  '/': {
    path: '/',
    label: 'Home',
    title: 'AASAN BIMA EDUCATION | Online Insurance Training & Paid Internship Programme',
  },
  '/about-us': {
    path: '/about-us',
    label: 'About Us',
    title: 'About Us | AASAN BIMA EDUCATION',
  },
  '/internship-program': {
    path: '/internship-program',
    label: 'Internship Program',
    title: 'Internship Program | AASAN BIMA EDUCATION',
  },
  '/what-you-learn': {
    path: '/what-you-learn',
    label: 'What You Learn',
    title: 'What You Learn | AASAN BIMA EDUCATION',
  },
  '/benefits': {
    path: '/benefits',
    label: 'Benefits',
    title: 'Benefits | AASAN BIMA EDUCATION',
  },
  '/contact-us': {
    path: '/contact-us',
    label: 'Contact Us',
    title: 'Contact Us | AASAN BIMA EDUCATION',
  },
  '/privacy-policy': {
    path: '/privacy-policy',
    label: 'Privacy Policy',
    title: 'Privacy Policy | AASAN BIMA EDUCATION',
  },
  '/terms-and-conditions': {
    path: '/terms-and-conditions',
    label: 'Terms & Conditions',
    title: 'Terms & Conditions | AASAN BIMA EDUCATION',
  },
};

function normalizePath(rawPath: string): AppRoutePath {
  const cleaned = rawPath.replace(/\/+$/, '') || '/';
  if (cleaned in ROUTES) {
    return cleaned as AppRoutePath;
  }
  return '/';
}

interface RouterContextValue {
  currentPath: AppRoutePath;
  navigate: (to: AppRoutePath) => void;
}

const RouterContext = createContext<RouterContextValue>({
  currentPath: '/',
  navigate: () => undefined,
});

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<AppRoutePath>(() =>
    typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '/'
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: AppRoutePath) => {
    const target = normalizePath(to);
    if (target !== currentPath) {
      window.history.pushState({}, '', target);
      setCurrentPath(target);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export function useAppRouter(): RouterContextValue {
  return useContext(RouterContext);
}

interface AppLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: AppRoutePath;
}

export const AppLink: React.FC<AppLinkProps> = ({ to, onClick, children, ...rest }) => {
  const { navigate } = useAppRouter();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }
    event.preventDefault();
    onClick?.(event);
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};

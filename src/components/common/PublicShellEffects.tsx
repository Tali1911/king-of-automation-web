import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Applies the dark theme to <html> while a public page is mounted so that
 * portalled UI (dialogs, toasts, popovers) inherits it. Removed on unmount so
 * the admin portal stays light.
 */
export const DarkDocument = () => {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('dark');
    return () => root.classList.remove('dark');
  }, []);
  return null;
};

/** Decorative fade/rise transition on route change. Purely visual. */
export const PageTransition = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
};

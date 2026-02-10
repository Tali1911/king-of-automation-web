import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    // Don't track admin routes
    if (location.pathname.startsWith('/admin')) return;

    const trackVisit = async () => {
      try {
        await supabase.functions.invoke('track-visit', {
          body: { path: location.pathname },
        });
      } catch (err) {
        // Silently fail - tracking should never break the site
        console.debug('Page tracking failed:', err);
      }
    };

    trackVisit();
  }, [location.pathname]);
}

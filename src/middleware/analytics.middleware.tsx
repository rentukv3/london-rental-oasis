
import { useEffect, PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from '@/lib/analytics.service';

export const AnalyticsMiddleware: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const analytics = useAnalytics();

  useEffect(() => {
    // Track page view when location changes
    analytics.trackPageView(location.pathname);
  }, [location, analytics]);

  return <>{children}</>;
};

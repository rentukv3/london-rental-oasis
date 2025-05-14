import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from '@/lib/analytics.service';

export const AnalyticsMiddleware = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const analytics = useAnalytics();

  useEffect(() => {
    analytics.trackPageView(location.pathname);
  }, [location]);

  return <>{children}</>;
}; 
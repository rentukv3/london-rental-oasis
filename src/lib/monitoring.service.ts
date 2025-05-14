
import { performanceMonitor } from './performance.service';

/**
 * Initialize application monitoring
 */
export const initMonitoring = () => {
  // Initialize error tracking
  window.addEventListener('error', (event) => {
    console.error('Uncaught error:', event);
    // Here you would typically send to your error tracking service
  });

  // Initialize unhandled promise rejection tracking
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event);
    // Here you would typically send to your error tracking service
  });
};

/**
 * Log an event to the monitoring system
 */
export const logEvent = (eventName: string, eventData: Record<string, any>) => {
  console.log(`[EVENT] ${eventName}:`, eventData);
  // Here you would typically send to your analytics service
};

/**
 * Track component performance
 */
export const trackComponentPerformance = (componentName: string) => {
  performanceMonitor.start(componentName);
  return () => {
    performanceMonitor.end(componentName);
  };
};

/**
 * Monitor network requests
 */
export const monitorNetworkRequest = async <T>(
  requestName: string, 
  requestFn: () => Promise<T>
): Promise<T> => {
  const startTime = performance.now();
  try {
    const result = await requestFn();
    const duration = performance.now() - startTime;
    console.log(`[Network] ${requestName} completed in ${duration.toFixed(2)}ms`);
    return result;
  } catch (error) {
    const duration = performance.now() - startTime;
    console.error(`[Network] ${requestName} failed after ${duration.toFixed(2)}ms:`, error);
    throw error;
  }
};

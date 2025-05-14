
/**
 * Performance monitoring service
 * Used to track application performance metrics
 */

/**
 * Initialize performance monitoring
 */
export function initPerformanceMonitoring() {
  if (typeof window !== 'undefined' && 'performance' in window) {
    console.log('Performance monitoring initialized');
  }
}

/**
 * Track a performance metric
 */
export function trackPerformance(metricName: string, value: number) {
  if (typeof window !== 'undefined' && 'performance' in window) {
    try {
      performance.mark(`${metricName}-start`);
      // Simulating some operation
      setTimeout(() => {
        performance.mark(`${metricName}-end`);
        performance.measure(metricName, `${metricName}-start`, `${metricName}-end`);
        console.log(`Performance metric: ${metricName} = ${value}ms`);
      }, value);
    } catch (error) {
      console.error('Error tracking performance:', error);
    }
  }
}

/**
 * Get performance metrics
 */
export function getPerformanceMetrics() {
  if (typeof window !== 'undefined' && 'performance' in window) {
    return performance.getEntriesByType('measure');
  }
  return [];
}

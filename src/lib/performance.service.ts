
/**
 * Service for monitoring and reporting application performance metrics
 */

/**
 * Initialize performance monitoring
 */
export const initPerformanceMonitoring = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Capture navigation timing
    const navigationTiming = performance.getEntriesByType('navigation')[0];
    console.log('Navigation timing:', navigationTiming);
  }
};

/**
 * Log a performance mark
 */
export const markPerformance = (name: string) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    performance.mark(name);
  }
};

/**
 * Measure time between two performance marks
 */
export const measurePerformance = (name: string, startMark: string, endMark: string) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    performance.measure(name, startMark, endMark);
    const measures = performance.getEntriesByName(name, 'measure');
    if (measures.length > 0) {
      console.log(`${name}: ${measures[0].duration.toFixed(2)}ms`);
      return measures[0].duration;
    }
  }
  return null;
};

/**
 * Monitor performance for specific component
 */
export const performanceMonitor = {
  start: (componentName: string) => {
    markPerformance(`${componentName}_start`);
  },
  end: (componentName: string) => {
    markPerformance(`${componentName}_end`);
    return measurePerformance(
      `${componentName}_render_time`, 
      `${componentName}_start`, 
      `${componentName}_end`
    );
  }
};

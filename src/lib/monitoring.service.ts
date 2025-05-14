import { performanceMonitor } from './performance.service';

interface MonitoringConfig {
  enabled: boolean;
  sampleRate: number;
  endpoint: string;
}

class MonitoringService {
  private config: MonitoringConfig = {
    enabled: process.env.NODE_ENV === 'production',
    sampleRate: 1.0,
    endpoint: process.env.VITE_MONITORING_ENDPOINT || '',
  };

  private metrics: any[] = [];

  trackPageView(page: string) {
    if (!this.config.enabled) return;

    this.metrics.push({
      type: 'pageview',
      page,
      timestamp: Date.now(),
    });
  }

  trackError(error: Error) {
    if (!this.config.enabled) return;

    this.metrics.push({
      type: 'error',
      error: {
        message: error.message,
        stack: error.stack,
      },
      timestamp: Date.now(),
    });
  }

  trackApiCall(endpoint: string, duration: number, status: number) {
    if (!this.config.enabled) return;

    this.metrics.push({
      type: 'api',
      endpoint,
      duration,
      status,
      timestamp: Date.now(),
    });
  }

  async sendMetrics() {
    if (!this.config.enabled || this.metrics.length === 0) return;

    try {
      const metrics = [...this.metrics];
      this.metrics = [];

      await fetch(this.config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metrics),
      });
    } catch (error) {
      console.error('Error sending metrics:', error);
    }
  }
}

export const monitoringService = new MonitoringService();

// Enviar métricas cada 5 minutos
setInterval(() => {
  monitoringService.sendMetrics();
}, 5 * 60 * 1000); 
interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp?: number;
}

class AnalyticsService {
  private queue: AnalyticsEvent[] = [];
  private isProcessing = false;
  private readonly batchSize = 10;
  private readonly flushInterval = 5 * 60 * 1000; // 5 minutes

  constructor() {
    // Iniciar el proceso de envío periódico
    setInterval(() => this.processQueue(), this.flushInterval);
  }

  trackEvent(event: AnalyticsEvent) {
    // Agregar timestamp si no existe
    const eventWithTimestamp = {
      ...event,
      timestamp: event.timestamp || Date.now()
    };
    
    this.queue.push(eventWithTimestamp);
    
    // Procesar la cola si alcanza el tamaño del lote
    if (this.queue.length >= this.batchSize) {
      this.processQueue();
    }
  }

  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;
    let eventsToProcess: AnalyticsEvent[] = [];

    try {
      // Tomar los eventos actuales y limpiar la cola
      eventsToProcess = [...this.queue];
      this.queue = [];

      // Aquí implementarías la lógica para enviar los eventos a tu servicio de analytics
      await this.sendEvents(eventsToProcess);
      
      console.log(`Processed ${eventsToProcess.length} analytics events`);
    } catch (error) {
      console.error('Error processing analytics queue:', error);
      // Reintentar eventos fallidos
      this.queue = [...this.queue, ...eventsToProcess];
    } finally {
      this.isProcessing = false;
    }
  }

  private async sendEvents(events: AnalyticsEvent[]) {
    // Aquí implementarías la lógica para enviar los eventos a tu servicio de analytics
    // Por ejemplo, usando fetch para enviar a un endpoint
    try {
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending analytics events:', error);
      throw error;
    }
  }

  // Métodos de utilidad para eventos comunes
  trackPageView(page: string) {
    this.trackEvent({
      category: 'Page',
      action: 'View',
      label: page,
    });
  }

  trackSearch(query: string) {
    this.trackEvent({
      category: 'Search',
      action: 'Query',
      label: query,
    });
  }

  trackPropertyView(propertyId: string) {
    this.trackEvent({
      category: 'Property',
      action: 'View',
      label: propertyId,
    });
  }

  trackBooking(propertyId: string, status: string) {
    this.trackEvent({
      category: 'Booking',
      action: status,
      label: propertyId,
    });
  }

  trackUserAction(action: string, details?: string) {
    this.trackEvent({
      category: 'User',
      action,
      label: details,
    });
  }
}

// Exportar una instancia única del servicio
export const analyticsService = new AnalyticsService();

// Hook para usar el servicio en componentes React
export const useAnalytics = () => {
  return analyticsService;
}; 
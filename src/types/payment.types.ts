
/**
 * Available payment methods
 */
export type PaymentMethod = 'stripe' | 'paypal' | 'manual';

/**
 * Status of a payment
 */
export type PaymentStatus = 
  | 'pending'   // Payment initiated but not completed
  | 'succeeded' // Payment completed successfully
  | 'failed'    // Payment failed
  | 'refunded'; // Payment was refunded

/**
 * Payment record information
 */
export interface Payment {
  /** Unique identifier */
  id: string;
  /** ID of the subscription this payment is for (may be null for one-off payments) */
  subscriptionId?: string;
  /** ID of the user who made this payment */
  userId: string;
  /** Payment amount */
  amount: number;
  /** Currency code (USD, EUR, etc.) */
  currency: string;
  /** Current status of the payment */
  status: PaymentStatus;
  /** Payment method used */
  paymentMethod: PaymentMethod;
  /** Transaction ID from payment provider (Stripe PaymentIntent ID or PayPal transaction ID) */
  transactionId?: string;
  /** Invoice ID from payment provider */
  invoiceId?: string;
  /** Date when the payment was created */
  createdAt: Date;
}

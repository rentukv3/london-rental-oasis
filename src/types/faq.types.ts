
/**
 * Frequently asked question
 */
export interface Faq {
  /** Question text */
  question: string;
  /** Answer text */
  answer: string;
  /** Optional category for grouping FAQs */
  category?: string;
  /** Optional order for sorting FAQs */
  order?: number;
}

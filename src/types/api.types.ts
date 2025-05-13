
/**
 * Standard API error structure
 */
export interface ApiError {
  /** Error code */
  code: string;
  /** Human-readable error message */
  message: string;
  /** Additional error details */
  details?: Record<string, any>;
}

/**
 * Generic API response structure
 */
export interface ApiResponse<T = any> {
  /** Whether the request was successful */
  success: boolean;
  /** Response data (if success is true) */
  data?: T;
  /** Error information (if success is false) */
  error?: ApiError;
  /** Pagination information (if applicable) */
  pagination?: {
    /** Current page number */
    page: number;
    /** Number of items per page */
    pageSize: number;
    /** Total number of items */
    total: number;
    /** Total number of pages */
    totalPages: number;
  };
}

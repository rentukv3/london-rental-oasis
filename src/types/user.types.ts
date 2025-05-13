
/**
 * User profile information
 */
export interface UserProfile {
  /** First name */
  firstName?: string;
  /** Last name */
  lastName?: string;
  /** Display name (may be different from first/last name) */
  displayName?: string;
  /** Profile picture URL */
  avatarUrl?: string;
  /** Phone number */
  phone?: string;
  /** Whether the user is a verified agent/realtor */
  isVerifiedAgent?: boolean;
  /** User bio or description */
  bio?: string;
  /** Company name (for agents/realtors) */
  company?: string;
  /** Company website */
  website?: string;
}

/**
 * User information including auth and profile data
 */
export interface User {
  /** Unique identifier */
  id: string;
  /** Email address */
  email: string;
  /** Whether the email has been verified */
  emailVerified: boolean;
  /** Profile information */
  profile: UserProfile;
  /** When the user registered */
  createdAt: Date;
  /** When the user information was last updated */
  updatedAt: Date;
}

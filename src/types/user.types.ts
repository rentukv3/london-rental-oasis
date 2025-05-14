
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
 * Database profile format, to map between camelCase and snake_case
 */
export interface DbProfile {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  display_name?: string | null;
  avatar_url?: string | null;
  phone?: string | null;
  is_verified_agent?: boolean | null;
  bio?: string | null;
  company?: string | null;
  website?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

/**
 * Maps database profile to frontend UserProfile format
 */
export function mapDbProfileToUserProfile(dbProfile: DbProfile): UserProfile {
  return {
    firstName: dbProfile.first_name || undefined,
    lastName: dbProfile.last_name || undefined,
    displayName: dbProfile.display_name || undefined,
    avatarUrl: dbProfile.avatar_url || undefined,
    phone: dbProfile.phone || undefined,
    isVerifiedAgent: dbProfile.is_verified_agent || undefined,
    bio: dbProfile.bio || undefined,
    company: dbProfile.company || undefined,
    website: dbProfile.website || undefined,
  };
}

/**
 * Maps frontend UserProfile format to database format
 */
export function mapUserProfileToDb(profile: UserProfile): Partial<DbProfile> {
  return {
    first_name: profile.firstName || null,
    last_name: profile.lastName || null,
    display_name: profile.displayName || null,
    avatar_url: profile.avatarUrl || null,
    phone: profile.phone || null,
    is_verified_agent: profile.isVerifiedAgent || null,
    bio: profile.bio || null,
    company: profile.company || null,
    website: profile.website || null
  };
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

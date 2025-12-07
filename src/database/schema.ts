/**
 * ============================================================================
 * COMPREHENSIVE DATABASE SCHEMA WITH RELATIONSHIPS
 * ============================================================================
 * 
 * This schema represents the complete database structure for the MFTBC EN
 * application with all primary keys (PK), foreign keys (FK), and relationships.
 * 
 * Created based on actual application forms and functionality analysis.
 * ============================================================================
 */

// ============================================================================
// 1. USER MANAGEMENT & AUTHENTICATION
// ============================================================================

export interface User {
  id: string;                          // PK - UUID
  email: string;                       // UNIQUE, NOT NULL
  password_hash: string;               // NOT NULL
  full_name: string;                   // NOT NULL
  avatar_url?: string;
  role: 'admin' | 'internal' | 'external'; // NOT NULL, DEFAULT 'internal'
  department_id?: string;              // FK -> Department.id
  job_title?: string;
  phone?: string;
  location?: string;
  is_active: boolean;                  // DEFAULT true
  last_login?: Date;
  created_at: Date;                    // DEFAULT NOW()
  updated_at: Date;                    // DEFAULT NOW()
}

export interface Department {
  id: string;                          // PK - UUID
  name: string;                        // NOT NULL, UNIQUE
  description?: string;
  parent_department_id?: string;       // FK -> Department.id (self-reference for hierarchy)
  manager_id?: string;                 // FK -> User.id
  created_at: Date;                    // DEFAULT NOW()
  updated_at: Date;                    // DEFAULT NOW()
}

export interface Role {
  id: string;                          // PK - UUID
  name: string;                        // NOT NULL, UNIQUE
  description?: string;
  created_at: Date;                    // DEFAULT NOW()
}

export interface Permission {
  id: string;                          // PK - UUID
  name: string;                        // NOT NULL, UNIQUE
  resource: string;                    // NOT NULL (e.g., 'blog', 'document', 'space')
  action: string;                      // NOT NULL (e.g., 'create', 'read', 'update', 'delete')
  description?: string;
  created_at: Date;                    // DEFAULT NOW()
}

export interface RolePermission {
  id: string;                          // PK - UUID
  role_id: string;                     // FK -> Role.id, NOT NULL
  permission_id: string;               // FK -> Permission.id, NOT NULL
  created_at: Date;                    // DEFAULT NOW()
  // UNIQUE(role_id, permission_id)
}

export interface UserRole {
  id: string;                          // PK - UUID
  user_id: string;                     // FK -> User.id, NOT NULL
  role_id: string;                     // FK -> Role.id, NOT NULL
  assigned_at: Date;                   // DEFAULT NOW()
  assigned_by: string;                 // FK -> User.id
  // UNIQUE(user_id, role_id)
}

// ============================================================================
// 2. SPACES (Parent & Sub-Spaces)
// ============================================================================

export interface Space {
  id: string;                          // PK - UUID
  name: string;                        // NOT NULL
  description?: string;
  parent_space_id?: string;            // FK -> Space.id (NULL for parent spaces)
  image_url?: string;
  created_by: string;                  // FK -> User.id, NOT NULL
  is_active: boolean;                  // DEFAULT true
  visibility: 'public' | 'private';    // DEFAULT 'public'
  created_at: Date;                    // DEFAULT NOW()
  updated_at: Date;                    // DEFAULT NOW()
}

export interface SpaceTab {
  id: string;                          // PK - UUID
  space_id: string;                    // FK -> Space.id, NOT NULL
  tab_name: string;                    // NOT NULL (e.g., 'Overview', 'Documents', 'Discussions')
  tab_icon?: string;
  display_order: number;               // NOT NULL, DEFAULT 0
  is_enabled: boolean;                 // DEFAULT true
  created_at: Date;                    // DEFAULT NOW()
  // UNIQUE(space_id, tab_name)
}

export interface SpaceMember {
  id: string;                          // PK - UUID
  space_id: string;                    // FK -> Space.id, NOT NULL
  user_id: string;                     // FK -> User.id, NOT NULL
  role: 'owner' | 'admin' | 'member' | 'viewer'; // NOT NULL, DEFAULT 'member'
  joined_at: Date;                     // DEFAULT NOW()
  invited_by?: string;                 // FK -> User.id
  // UNIQUE(space_id, user_id)
}

// ============================================================================
// 3. BLOG POSTS / NEWS (with Space & HR Category relationships)
// ============================================================================

export interface BlogPost {
  id: string;                          // PK - UUID
  title: string;                       // NOT NULL
  slug: string;                        // UNIQUE, NOT NULL
  excerpt: string;                     // NOT NULL, MAX 200 chars
  content: string;                     // NOT NULL (Rich text)
  cover_image_url?: string;
  
  // Space relationship
  space_id: string;                    // FK -> Space.id, NOT NULL
  
  // HR Category relationship (only if space is HR)
  hr_category_id?: string;             // FK -> HRCategory.id (NULL if not HR space)
  
  // Blog category
  category: string;                    // NOT NULL (announcement, tutorial, case-study, news, etc.)
  
  author_id: string;                   // FK -> User.id, NOT NULL
  author_name: string;                 // NOT NULL
  
  tags: string[];                      // Array of tags
  
  publish_status: 'draft' | 'published' | 'archived'; // NOT NULL, DEFAULT 'draft'
  visibility: 'public' | 'private';    // NOT NULL, DEFAULT 'public'
  
  published_at?: Date;
  views_count: number;                 // DEFAULT 0
  likes_count: number;                 // DEFAULT 0
  comments_count: number;              // DEFAULT 0
  
  created_at: Date;                    // DEFAULT NOW()
  updated_at: Date;                    // DEFAULT NOW()
}

// ============================================================================
// 4. DOCUMENTS (with Space & HR Category relationships)
// ============================================================================

export interface Document {
  id: string;                          // PK - UUID
  title: string;                       // NOT NULL
  slug: string;                        // UNIQUE, NOT NULL
  content: string;                     // NOT NULL (Rich text)
  
  // Space relationship
  space_id: string;                    // FK -> Space.id, NOT NULL
  
  // HR Category relationship (only if space is HR)
  hr_category_id?: string;             // FK -> HRCategory.id (NULL if not HR space)
  
  // Document category
  category: 'policy' | 'guide' | 'report' | 'procedure' | 'template' | 'manual' | 'memo' | 'other'; // NOT NULL
  
  language: 'en' | 'jp';               // NOT NULL, DEFAULT 'en'
  
  author_id: string;                   // FK -> User.id, NOT NULL
  
  tags: string[];                      // Array of tags
  attachments: string[];               // Array of attachment URLs
  
  version: number;                     // DEFAULT 1
  parent_document_id?: string;         // FK -> Document.id (for versioning)
  
  status: 'draft' | 'published' | 'archived'; // NOT NULL, DEFAULT 'draft'
  visibility: 'public' | 'private';    // NOT NULL, DEFAULT 'public'
  
  published_at?: Date;
  views_count: number;                 // DEFAULT 0
  downloads_count: number;             // DEFAULT 0
  
  created_at: Date;                    // DEFAULT NOW()
  updated_at: Date;                    // DEFAULT NOW()
}

// ============================================================================
// 5. ACTIVITIES & EVENTS
// ============================================================================

export interface Activity {
  id: string;                          // PK - UUID
  title: string;                       // NOT NULL
  slug: string;                        // UNIQUE, NOT NULL
  description: string;                 // NOT NULL
  
  type: 'event' | 'workshop' | 'training' | 'social' | 'volunteer' | 'sports' | 'team-building' | 'conference'; // NOT NULL
  
  // Date & Time
  activity_date: Date;                 // NOT NULL
  start_time: string;                  // NOT NULL (HH:MM format)
  end_time: string;                    // NOT NULL (HH:MM format)
  
  // Location
  location: string;                    // NOT NULL
  venue?: string;
  
  // Capacity & Registration
  capacity: number;                    // NOT NULL
  registered_count: number;            // DEFAULT 0
  waitlist_count: number;              // DEFAULT 0
  
  organizer: string;                   // NOT NULL
  organizer_id: string;                // FK -> User.id, NOT NULL
  
  department_id: string;               // FK -> Department.id, NOT NULL
  
  tags: string[];                      // Array of tags
  image_url?: string;
  
  registration_deadline: Date;         // NOT NULL
  
  // Settings
  requires_approval: boolean;          // DEFAULT false
  is_public: boolean;                  // DEFAULT true
  allow_waitlist: boolean;             // DEFAULT false
  send_reminders: boolean;             // DEFAULT true
  
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'; // NOT NULL, DEFAULT 'upcoming'
  
  views_count: number;                 // DEFAULT 0
  
  created_at: Date;                    // DEFAULT NOW()
  updated_at: Date;                    // DEFAULT NOW()
}

export interface ActivityRegistration {
  id: string;                          // PK - UUID
  activity_id: string;                 // FK -> Activity.id, NOT NULL
  user_id: string;                     // FK -> User.id, NOT NULL
  status: 'registered' | 'waitlist' | 'approved' | 'rejected' | 'cancelled'; // NOT NULL
  registration_date: Date;             // DEFAULT NOW()
  approved_by?: string;                // FK -> User.id
  approved_at?: Date;
  notes?: string;
  // UNIQUE(activity_id, user_id)
}

// ============================================================================
// 6. CROSS-FUNCTIONAL TEAMS (with Space relationship)
// ============================================================================

export interface CrossfunctionTeam {
  id: string;                          // PK - UUID
  title: string;                       // NOT NULL
  slug: string;                        // UNIQUE, NOT NULL
  
  // Space relationship
  space_id: string;                    // FK -> Space.id, NOT NULL
  
  department_id: string;               // FK -> Department.id, NOT NULL
  organization: string;                // NOT NULL
  location: string;                    // NOT NULL
  
  // Contact Information
  contact_person: string;              // NOT NULL
  contact_email: string;               // NOT NULL
  contact_phone: string;               // NOT NULL
  
  description: string;                 // NOT NULL (Rich text)
  objectives: string;                  // NOT NULL (Rich text)
  
  tags: string[];                      // Array of tags
  
  priority: 'low' | 'medium' | 'high'; // NOT NULL, DEFAULT 'medium'
  status: 'active' | 'planning' | 'completed' | 'on-hold'; // NOT NULL, DEFAULT 'active'
  
  created_by: string;                  // FK -> User.id, NOT NULL
  
  views_count: number;                 // DEFAULT 0
  members_count: number;               // DEFAULT 0
  
  created_at: Date;                    // DEFAULT NOW()
  updated_at: Date;                    // DEFAULT NOW()
}

export interface CrossfunctionMember {
  id: string;                          // PK - UUID
  team_id: string;                     // FK -> CrossfunctionTeam.id, NOT NULL
  user_id: string;                     // FK -> User.id, NOT NULL
  role: 'lead' | 'member' | 'contributor'; // NOT NULL, DEFAULT 'member'
  joined_at: Date;                     // DEFAULT NOW()
  // UNIQUE(team_id, user_id)
}

// ============================================================================
// 7. HR SECTION - CATEGORIES (6 Types)
// ============================================================================

export interface HRCategory {
  id: string;                          // PK - UUID
  name: string;                        // NOT NULL
  slug: string;                        // UNIQUE, NOT NULL
  type: 'market-recruiting' | 'onboarding' | 'time-absence' | 'compensation' | 'hr-development' | 'social-welfare'; // NOT NULL
  description?: string;
  icon?: string;
  color?: string;
  display_order: number;               // NOT NULL, DEFAULT 0
  is_active: boolean;                  // DEFAULT true
  
  // Counts
  blogs_count: number;                 // DEFAULT 0
  documents_count: number;             // DEFAULT 0
  
  created_at: Date;                    // DEFAULT NOW()
  updated_at: Date;                    // DEFAULT NOW()
}

// ============================================================================
// 8. HR SECTION - WELCOME MESSAGE
// ============================================================================

export interface HRWelcomeMessage {
  id: string;                          // PK - UUID
  title: string;                       // NOT NULL
  message: string;                     // NOT NULL (Rich text)
  author_id: string;                   // FK -> User.id, NOT NULL
  author_name: string;                 // NOT NULL
  author_title?: string;
  author_avatar_url?: string;
  is_active: boolean;                  // DEFAULT true (only one active at a time)
  created_at: Date;                    // DEFAULT NOW()
  updated_at: Date;                    // DEFAULT NOW()
}

// ============================================================================
// 9. HR SECTION - ANNOUNCEMENTS
// ============================================================================

export interface HRAnnouncement {
  id: string;                          // PK - UUID
  title: string;                       // NOT NULL
  content: string;                     // NOT NULL
  target_audience: 'all' | 'managers' | 'hr' | 'it' | 'sales' | string; // NOT NULL
  category: 'project-hyperion' | 'policy' | 'system' | 'benefits' | 'training' | 'general'; // NOT NULL
  priority: 'normal' | 'high' | 'urgent'; // NOT NULL, DEFAULT 'normal'
  sent_date: Date;                     // NOT NULL
  attachment_url?: string;
  created_by: string;                  // FK -> User.id, NOT NULL
  views_count: number;                 // DEFAULT 0
  created_at: Date;                    // DEFAULT NOW()
  updated_at: Date;                    // DEFAULT NOW()
}

// ============================================================================
// 10. HR SECTION - HR CAFE (Scheme & Career Articles)
// ============================================================================

export interface HRCafeArticle {
  id: string;                          // PK - UUID
  menu_type: 'scheme' | 'career';      // NOT NULL
  title: string;                       // NOT NULL
  description: string;                 // NOT NULL
  image_url: string;                   // NOT NULL
  link_url: string;                    // NOT NULL
  is_featured: boolean;                // DEFAULT false
  publish_date: Date;                  // NOT NULL
  views_count: number;                 // DEFAULT 0
  likes_count: number;                 // DEFAULT 0
  created_by: string;                  // FK -> User.id, NOT NULL
  created_at: Date;                    // DEFAULT NOW()
  updated_at: Date;                    // DEFAULT NOW()
}

// ============================================================================
// 11. HR SECTION - HEALTH & PRODUCTIVITY NEWS
// ============================================================================

export interface HealthNews {
  id: string;                          // PK - UUID
  title: string;                       // NOT NULL
  description?: string;
  news_date: Date;                     // NOT NULL
  category: 'recognition' | 'event' | 'program' | 'training' | 'initiative' | 'other'; // NOT NULL
  link_url?: string;
  created_by: string;                  // FK -> User.id, NOT NULL
  created_at: Date;                    // DEFAULT NOW()
  updated_at: Date;                    // DEFAULT NOW()
}

// ============================================================================
// 12. HR SECTION - INTERNAL JOB POSTINGS
// ============================================================================

export interface JobPosting {
  id: string;                          // PK - UUID
  job_title: string;                   // NOT NULL
  slug: string;                        // UNIQUE, NOT NULL
  department_id: string;               // FK -> Department.id, NOT NULL
  location: string;                    // NOT NULL
  employment_type: 'full-time' | 'part-time' | 'contract' | 'temporary'; // NOT NULL
  experience_level: 'entry' | 'mid' | 'senior' | 'lead' | 'executive'; // NOT NULL
  
  description: string;                 // NOT NULL
  responsibilities: string;            // NOT NULL
  requirements: string;                // NOT NULL
  benefits?: string;
  salary_range?: string;
  
  contact_email: string;               // NOT NULL
  application_deadline: Date;          // NOT NULL
  
  is_urgent: boolean;                  // DEFAULT false
  status: 'open' | 'closed' | 'filled'; // NOT NULL, DEFAULT 'open'
  
  applications_count: number;          // DEFAULT 0
  views_count: number;                 // DEFAULT 0
  
  posted_by: string;                   // FK -> User.id, NOT NULL
  
  created_at: Date;                    // DEFAULT NOW()
  updated_at: Date;                    // DEFAULT NOW()
}

export interface JobApplication {
  id: string;                          // PK - UUID
  job_posting_id: string;              // FK -> JobPosting.id, NOT NULL
  applicant_id: string;                // FK -> User.id, NOT NULL
  cover_letter?: string;
  resume_url?: string;
  status: 'pending' | 'reviewing' | 'interview' | 'accepted' | 'rejected'; // NOT NULL, DEFAULT 'pending'
  applied_at: Date;                    // DEFAULT NOW()
  reviewed_by?: string;                // FK -> User.id
  reviewed_at?: Date;
  notes?: string;
  // UNIQUE(job_posting_id, applicant_id)
}

// ============================================================================
// 13. INTERACTIONS - LIKES
// ============================================================================

export interface Like {
  id: string;                          // PK - UUID
  user_id: string;                     // FK -> User.id, NOT NULL
  
  // Polymorphic relationship - can like different content types
  likeable_type: 'blog' | 'document' | 'comment' | 'hr_cafe'; // NOT NULL
  likeable_id: string;                 // NOT NULL (ID of the liked item)
  
  created_at: Date;                    // DEFAULT NOW()
  // UNIQUE(user_id, likeable_type, likeable_id)
}

// ============================================================================
// 14. INTERACTIONS - COMMENTS
// ============================================================================

export interface Comment {
  id: string;                          // PK - UUID
  user_id: string;                     // FK -> User.id, NOT NULL
  
  // Polymorphic relationship - can comment on different content types
  commentable_type: 'blog' | 'document' | 'activity' | 'crossfunction'; // NOT NULL
  commentable_id: string;              // NOT NULL (ID of the commented item)
  
  content: string;                     // NOT NULL
  
  // Nested comments (replies)
  parent_comment_id?: string;          // FK -> Comment.id (NULL for top-level comments)
  
  likes_count: number;                 // DEFAULT 0
  replies_count: number;               // DEFAULT 0
  
  is_edited: boolean;                  // DEFAULT false
  is_deleted: boolean;                 // DEFAULT false
  
  created_at: Date;                    // DEFAULT NOW()
  updated_at: Date;                    // DEFAULT NOW()
}

// ============================================================================
// 15. INTERACTIONS - BOOKMARKS
// ============================================================================

export interface Bookmark {
  id: string;                          // PK - UUID
  user_id: string;                     // FK -> User.id, NOT NULL
  
  // Polymorphic relationship - can bookmark different content types
  bookmarkable_type: 'blog' | 'document' | 'activity' | 'crossfunction' | 'job'; // NOT NULL
  bookmarkable_id: string;             // NOT NULL (ID of the bookmarked item)
  
  notes?: string;
  
  created_at: Date;                    // DEFAULT NOW()
  // UNIQUE(user_id, bookmarkable_type, bookmarkable_id)
}

// ============================================================================
// 16. INTERACTIONS - VIEWS TRACKING
// ============================================================================

export interface View {
  id: string;                          // PK - UUID
  user_id?: string;                    // FK -> User.id (NULL for anonymous views)
  
  // Polymorphic relationship - can track views on different content types
  viewable_type: 'blog' | 'document' | 'activity' | 'crossfunction' | 'job'; // NOT NULL
  viewable_id: string;                 // NOT NULL (ID of the viewed item)
  
  ip_address?: string;
  user_agent?: string;
  
  viewed_at: Date;                     // DEFAULT NOW()
}

// ============================================================================
// 17. NOTIFICATIONS
// ============================================================================

export interface Notification {
  id: string;                          // PK - UUID
  user_id: string;                     // FK -> User.id, NOT NULL
  
  type: 'comment' | 'like' | 'mention' | 'activity_reminder' | 'announcement' | 'job_application' | 'system'; // NOT NULL
  
  title: string;                       // NOT NULL
  message: string;                     // NOT NULL
  
  // Link to related content
  related_type?: string;               // (e.g., 'blog', 'activity', 'job')
  related_id?: string;                 // ID of the related item
  
  is_read: boolean;                    // DEFAULT false
  read_at?: Date;
  
  created_at: Date;                    // DEFAULT NOW()
}

// ============================================================================
// 18. ANALYTICS & TRACKING
// ============================================================================

export interface Analytics {
  id: string;                          // PK - UUID
  
  // Content tracking
  content_type: 'blog' | 'document' | 'activity' | 'crossfunction' | 'space'; // NOT NULL
  content_id: string;                  // NOT NULL
  
  // Metrics
  views: number;                       // DEFAULT 0
  unique_views: number;                // DEFAULT 0
  likes: number;                       // DEFAULT 0
  comments: number;                    // DEFAULT 0
  shares: number;                      // DEFAULT 0
  bookmarks: number;                   // DEFAULT 0
  
  // Time tracking
  avg_time_spent?: number;             // In seconds
  
  date: Date;                          // NOT NULL (for daily aggregation)
  
  created_at: Date;                    // DEFAULT NOW()
  updated_at: Date;                    // DEFAULT NOW()
  // UNIQUE(content_type, content_id, date)
}

// ============================================================================
// RECOMMENDED DATABASE INDEXES
// ============================================================================

/**
 * CREATE INDEX idx_users_email ON User(email);
 * CREATE INDEX idx_users_department ON User(department_id);
 * CREATE INDEX idx_users_role ON User(role);
 * 
 * CREATE INDEX idx_spaces_parent ON Space(parent_space_id);
 * CREATE INDEX idx_spaces_created_by ON Space(created_by);
 * 
 * CREATE INDEX idx_blog_space ON BlogPost(space_id);
 * CREATE INDEX idx_blog_hr_category ON BlogPost(hr_category_id);
 * CREATE INDEX idx_blog_author ON BlogPost(author_id);
 * CREATE INDEX idx_blog_status ON BlogPost(publish_status);
 * CREATE INDEX idx_blog_published ON BlogPost(published_at);
 * 
 * CREATE INDEX idx_document_space ON Document(space_id);
 * CREATE INDEX idx_document_hr_category ON Document(hr_category_id);
 * CREATE INDEX idx_document_author ON Document(author_id);
 * CREATE INDEX idx_document_status ON Document(status);
 * 
 * CREATE INDEX idx_activity_date ON Activity(activity_date);
 * CREATE INDEX idx_activity_department ON Activity(department_id);
 * CREATE INDEX idx_activity_status ON Activity(status);
 * 
 * CREATE INDEX idx_crossfunction_space ON CrossfunctionTeam(space_id);
 * CREATE INDEX idx_crossfunction_department ON CrossfunctionTeam(department_id);
 * CREATE INDEX idx_crossfunction_status ON CrossfunctionTeam(status);
 * 
 * CREATE INDEX idx_job_department ON JobPosting(department_id);
 * CREATE INDEX idx_job_status ON JobPosting(status);
 * CREATE INDEX idx_job_deadline ON JobPosting(application_deadline);
 * 
 * CREATE INDEX idx_likes_user ON Like(user_id);
 * CREATE INDEX idx_likes_content ON Like(likeable_type, likeable_id);
 * 
 * CREATE INDEX idx_comments_user ON Comment(user_id);
 * CREATE INDEX idx_comments_content ON Comment(commentable_type, commentable_id);
 * CREATE INDEX idx_comments_parent ON Comment(parent_comment_id);
 * 
 * CREATE INDEX idx_bookmarks_user ON Bookmark(user_id);
 * CREATE INDEX idx_bookmarks_content ON Bookmark(bookmarkable_type, bookmarkable_id);
 * 
 * CREATE INDEX idx_views_content ON View(viewable_type, viewable_id);
 * CREATE INDEX idx_views_date ON View(viewed_at);
 * 
 * CREATE INDEX idx_notifications_user ON Notification(user_id);
 * CREATE INDEX idx_notifications_read ON Notification(is_read);
 * 
 * CREATE INDEX idx_analytics_content ON Analytics(content_type, content_id);
 * CREATE INDEX idx_analytics_date ON Analytics(date);
 */

// ============================================================================
// KEY RELATIONSHIPS SUMMARY
// ============================================================================

/**
 * 1. USER RELATIONSHIPS:
 *    - User -> Department (many-to-one)
 *    - User -> Role (many-to-many via UserRole)
 *    - User -> Space (many-to-many via SpaceMember)
 * 
 * 2. SPACE RELATIONSHIPS:
 *    - Space -> Space (parent-child, self-referencing)
 *    - Space -> SpaceTab (one-to-many)
 *    - Space -> SpaceMember (one-to-many)
 *    - Space -> BlogPost (one-to-many)
 *    - Space -> Document (one-to-many)
 *    - Space -> CrossfunctionTeam (one-to-many)
 * 
 * 3. HR CATEGORY RELATIONSHIPS:
 *    - HRCategory -> BlogPost (one-to-many, when space is HR)
 *    - HRCategory -> Document (one-to-many, when space is HR)
 * 
 * 4. CONTENT RELATIONSHIPS:
 *    - BlogPost -> Space (many-to-one) [REQUIRED]
 *    - BlogPost -> HRCategory (many-to-one) [OPTIONAL, only if HR space]
 *    - BlogPost -> User (author, many-to-one)
 *    
 *    - Document -> Space (many-to-one) [REQUIRED]
 *    - Document -> HRCategory (many-to-one) [OPTIONAL, only if HR space]
 *    - Document -> User (author, many-to-one)
 *    
 *    - Activity -> Department (many-to-one)
 *    - Activity -> User (organizer, many-to-one)
 *    - Activity -> ActivityRegistration (one-to-many)
 *    
 *    - CrossfunctionTeam -> Space (many-to-one) [REQUIRED]
 *    - CrossfunctionTeam -> Department (many-to-one)
 *    - CrossfunctionTeam -> User (creator, many-to-one)
 *    - CrossfunctionTeam -> CrossfunctionMember (one-to-many)
 * 
 * 5. HR SECTION RELATIONSHIPS:
 *    - HRWelcomeMessage -> User (author, many-to-one)
 *    - HRAnnouncement -> User (creator, many-to-one)
 *    - HRCafeArticle -> User (creator, many-to-one)
 *    - HealthNews -> User (creator, many-to-one)
 *    - JobPosting -> Department (many-to-one)
 *    - JobPosting -> User (poster, many-to-one)
 *    - JobPosting -> JobApplication (one-to-many)
 * 
 * 6. INTERACTION RELATIONSHIPS (Polymorphic):
 *    - Like -> [BlogPost, Document, Comment, HRCafeArticle] (polymorphic)
 *    - Comment -> [BlogPost, Document, Activity, CrossfunctionTeam] (polymorphic)
 *    - Bookmark -> [BlogPost, Document, Activity, CrossfunctionTeam, JobPosting] (polymorphic)
 *    - View -> [BlogPost, Document, Activity, CrossfunctionTeam, JobPosting] (polymorphic)
 * 
 * 7. NOTIFICATION RELATIONSHIPS:
 *    - Notification -> User (many-to-one)
 *    - Notification -> [Any Content Type] (polymorphic reference)
 */

// ============================================================================
// IMPORTANT NOTES FOR IMPLEMENTATION
// ============================================================================

/**
 * 1. SPACE SELECTION IN FORMS:
 *    - Blog creation: MUST select a Space (space_id is required)
 *    - Document creation: MUST select a Space (space_id is required)
 *    - Crossfunction creation: MUST select a Space (space_id is required)
 * 
 * 2. HR CATEGORY SELECTION:
 *    - Only shown when HR space is selected
 *    - Creates relationship: BlogPost/Document -> HRCategory
 *    - Allows HR content to be organized by 6 category types:
 *      * Market and Recruiting
 *      * Onboarding
 *      * Time and Absence
 *      * Compensation
 *      * HR Development
 *      * Social Welfare
 * 
 * 3. CASCADING DELETES:
 *    - When Space is deleted -> Delete all related BlogPosts, Documents, CrossfunctionTeams
 *    - When User is deleted -> Anonymize or reassign their content
 *    - When BlogPost/Document is deleted -> Delete all related Likes, Comments, Bookmarks, Views
 * 
 * 4. ROW LEVEL SECURITY (RLS):
 *    - Implement RLS policies for all tables
 *    - Users can only edit their own content
 *    - Admins can edit all content
 *    - Public content visible to all
 *    - Private content only visible to space members
 * 
 * 5. VALIDATION RULES:
 *    - Blog excerpt max 200 characters
 *    - Email must be unique
 *    - Space names must be unique within parent
 *    - Job application deadline must be future date
 *    - Activity registration deadline must be before activity date
 */

export default {
  User,
  Department,
  Role,
  Permission,
  RolePermission,
  UserRole,
  Space,
  SpaceTab,
  SpaceMember,
  BlogPost,
  Document,
  Activity,
  ActivityRegistration,
  CrossfunctionTeam,
  CrossfunctionMember,
  HRCategory,
  HRWelcomeMessage,
  HRAnnouncement,
  HRCafeArticle,
  HealthNews,
  JobPosting,
  JobApplication,
  Like,
  Comment,
  Bookmark,
  View,
  Notification,
  Analytics
};

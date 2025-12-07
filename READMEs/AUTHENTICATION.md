# Authentication System Documentation

## Overview

The Social Intranet application uses a JWT-based authentication system with role-based access control (RBAC). Users must authenticate to access protected resources and create content.

## User Roles

The system supports three user roles:

### 1. Admin Role
- Full access to all features
- Can view and access the Admin Panel
- Can create, read, update, and delete users
- Can manage all content across the platform
- Can view analytics and system-wide reports

### 2. Internal Role
- Access to all public pages (Home, News, HR, Activity, Crossfunction)
- Can create and manage their own content
- Cannot access the Admin Panel
- Can view and interact with all published content

### 3. External Role
- Limited access based on assigned tabs during user creation
- Can only access specific sections assigned by admin
- Can create content (if permitted)
- Cannot access the Admin Panel

## Database Setup

### 1. Run Migrations

Execute all database migrations to create the required tables:

```bash
cd backend
node migrations/migrate.js
```

This will create the following tables:
- users
- departments
- roles
- permissions
- role_permissions
- user_roles
- spaces
- space_tabs
- space_members
- hr_categories
- blog_posts
- likes
- comments
- bookmarks
- views

### 2. Seed Initial Data

Run the seed script to create test users and sample data:

```bash
cd ..
node scripts/seed.js
```

This creates:
- Admin user: `admin@company.com` / `admin123`
- Internal user: `user@company.com` / `internal123`
- Sample spaces: General, Engineering, HR & People, Sales & Marketing
- HR categories: Market and Recruiting, Onboarding, Time and Absence, Compensation, HR Development, Social Welfare

## Backend API Endpoints

### Authentication Endpoints

#### POST /api/auth/register
Register a new user (currently not used in production - users are created by admin).

**Request Body:**
```json
{
  "email": "newuser@company.com",
  "password": "securepassword",
  "full_name": "John Doe",
  "role": "internal",
  "department_id": "uuid-optional",
  "job_title": "Software Engineer",
  "phone": "+1234567890",
  "location": "New York"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "uuid",
      "email": "newuser@company.com",
      "full_name": "John Doe",
      "role": "internal",
      "is_active": true
    },
    "token": "jwt-token-here"
  }
}
```

#### POST /api/auth/login
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "admin@company.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "uuid",
      "email": "admin@company.com",
      "full_name": "Admin User",
      "role": "admin",
      "is_active": true
    },
    "token": "jwt-token-here"
  }
}
```

#### GET /api/auth/me
Get current authenticated user details.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "uuid",
      "email": "admin@company.com",
      "full_name": "Admin User",
      "role": "admin",
      "department_id": null,
      "job_title": null,
      "is_active": true
    }
  }
}
```

#### POST /api/auth/logout
Logout current user (client-side token removal).

**Headers:**
```
Authorization: Bearer <jwt-token>
```

### User Management Endpoints (Admin Only)

#### POST /api/users
Create a new internal user.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "email": "newinternal@company.com",
  "password": "securepassword",
  "full_name": "Jane Smith",
  "role": "internal",
  "department_id": "uuid-optional",
  "job_title": "Product Manager",
  "phone": "+1234567890",
  "location": "San Francisco",
  "is_active": true
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "uuid",
      "email": "newinternal@company.com",
      "full_name": "Jane Smith",
      "role": "internal",
      "is_active": true
    }
  }
}
```

#### GET /api/users
Get all users with optional filters.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `role`: Filter by role (admin, internal, external)
- `is_active`: Filter by active status (true, false)

**Response:**
```json
{
  "status": "success",
  "data": {
    "users": [
      {
        "id": "uuid",
        "email": "admin@company.com",
        "full_name": "Admin User",
        "role": "admin",
        "is_active": true
      }
    ],
    "total": 1
  }
}
```

#### GET /api/users/:id
Get user by ID.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

#### PATCH /api/users/:id
Update user details.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body (all fields optional):**
```json
{
  "email": "updated@company.com",
  "full_name": "Updated Name",
  "role": "internal",
  "job_title": "Senior Engineer",
  "is_active": true
}
```

#### POST /api/users/:id/deactivate
Deactivate a user account.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

## Frontend Integration

### Authentication Context

The application uses React Context API for global authentication state management.

**Location:** `/Frontend/src/context/AuthContext.tsx`

**Usage:**
```tsx
import { useAuth } from '@/context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please login</div>;

  return <div>Welcome, {user.full_name}</div>;
}
```

### Protected Routes

Protected routes automatically redirect unauthenticated users to the login page.

**Location:** `/Frontend/src/components/auth/ProtectedRoute.tsx`

**Usage in Router:**
```tsx
{
  path: "/admin",
  element: (
    <ProtectedRoute requireAdmin>
      <AdminPanel />
    </ProtectedRoute>
  ),
}
```

### Login Page

**Location:** `/Frontend/src/pages/login/page.tsx`

**Features:**
- Email and password input
- Show/hide password toggle
- Remember me checkbox
- Forgot password link
- Loading state during authentication
- Error message display
- Automatic redirect to home page after successful login

### Create Internal User Modal

**Location:** `/Frontend/src/pages/admin/components/CreateInternalUserModal.tsx`

**Admin can:**
- Create new users with roles (admin, internal, external)
- Assign user details (name, email, job title, phone, location)
- Set initial password
- Select accessible tabs for external users (planned feature)

## API Services

### Auth API Service

**Location:** `/Frontend/src/services/auth.api.ts`

```typescript
import { authApi } from '@/services/auth.api';

// Login
const response = await authApi.login({ email, password });
const { user, token } = response.data;

// Get current user
const userResponse = await authApi.getCurrentUser();

// Logout
await authApi.logout();

// Token management
authApi.setToken(token);
const token = authApi.getToken();
authApi.removeToken();

// User storage
authApi.setUser(user);
const user = authApi.getUser();
authApi.removeUser();
```

### User API Service

**Location:** `/Frontend/src/services/user.api.ts`

```typescript
import { userApi } from '@/services/user.api';

// Create user (admin only)
await userApi.createUser({
  email: 'newuser@company.com',
  password: 'securepassword',
  full_name: 'John Doe',
  role: 'internal',
  job_title: 'Engineer'
});

// Get all users (admin only)
const { data } = await userApi.getAllUsers({ role: 'internal', page: 1 });

// Update user
await userApi.updateUser(userId, { full_name: 'Updated Name' });

// Deactivate user
await userApi.deactivateUser(userId);
```

## Security Features

### Password Security
- Passwords are hashed using bcrypt with salt rounds of 12
- Plain passwords are never stored in the database
- Password validation ensures minimum complexity

### JWT Tokens
- Tokens are signed with a secret key (configured in .env)
- Default expiration: 7 days
- Tokens are stored in localStorage on the client
- Tokens are automatically included in API requests via Authorization header

### API Protection
- Rate limiting: 100 requests per 15 minutes per IP
- Helmet.js for security headers
- CORS configuration for allowed origins
- Input validation using Joi
- SQL injection prevention using parameterized queries

### Role-Based Access Control
- Middleware checks user role before allowing access to protected routes
- Admin-only endpoints return 403 Forbidden for non-admin users
- Protected routes redirect unauthenticated users to login

## Testing Credentials

After running the seed script, use these credentials to test:

### Admin User
- **Email:** admin@company.com
- **Password:** admin123
- **Access:** Full access including Admin Panel

### Internal User
- **Email:** user@company.com
- **Password:** internal123
- **Access:** All pages except Admin Panel

## Environment Variables

### Backend (.env)
```env
JWT_SECRET=your_jwt_secret_key_change_this_in_production_2024
JWT_EXPIRES_IN=7d
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Troubleshooting

### "You are not logged in" Error
- Ensure you have logged in and received a JWT token
- Check that the token is stored in localStorage (key: 'authToken')
- Verify the token hasn't expired
- Check that the Authorization header is being sent with requests

### "You do not have permission" Error
- Verify your user role has access to the endpoint
- Admin-only endpoints require role: 'admin'
- Check that your account is active (is_active: true)

### Login Fails with Valid Credentials
- Verify database connection is working
- Check that migrations have been run
- Ensure seed script created the test users
- Check backend logs for detailed error messages

### Token Expired
- Default token expiration is 7 days
- User must login again to get a new token
- Future: Implement refresh token mechanism

## Future Enhancements

1. **Tab-Based Access for External Users**
   - Store accessible tabs in database
   - Enforce tab restrictions on frontend and backend
   - Dynamic navigation based on user permissions

2. **Refresh Tokens**
   - Implement refresh token mechanism
   - Auto-refresh expired tokens without requiring re-login

3. **Password Reset**
   - Email-based password reset flow
   - Secure token generation for reset links

4. **Two-Factor Authentication**
   - Optional 2FA for admin accounts
   - SMS or authenticator app integration

5. **Session Management**
   - Track active sessions
   - Allow users to view and revoke active sessions
   - Force logout from all devices

6. **Audit Logging**
   - Log all authentication attempts
   - Track user actions for security auditing
   - Admin dashboard for security monitoring

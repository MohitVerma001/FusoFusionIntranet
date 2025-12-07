# Social Intranet Application - Setup Guide

## Project Overview

A comprehensive Social Intranet application built with **React (Frontend)** and **Node.js + PostgreSQL (Backend)**.

### Tech Stack

**Frontend:**
- React 19 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Lexical Rich Text Editor for blog content
- React Router for navigation
- i18next for internationalization

**Backend:**
- Node.js with Express.js
- PostgreSQL database
- JWT authentication
- Multer for file uploads
- Joi for validation
- Production-ready architecture

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **PostgreSQL** (v14 or higher)
- **npm** or **yarn** package manager

## Database Setup

### 1. Install PostgreSQL

**On macOS:**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**On Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**On Windows:**
Download and install from https://www.postgresql.org/download/windows/

### 2. Create Database

```bash
psql -U postgres

CREATE DATABASE social_intranet;

\q
```

### 3. Configure Database Connection

Edit `backend/.env` file with your database credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=social_intranet
DB_USER=postgres
DB_PASSWORD=your_password_here
```

## Installation Steps

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies

```bash
cd ../Frontend
npm install
```

### 3. Run Database Migrations

```bash
cd ../backend
npm run migrate
```

This will create all necessary tables:
- users, departments, roles, permissions
- spaces, space_tabs, space_members
- blog_posts, documents, activities
- hr_categories, hr_announcements, job_postings
- comments, likes, bookmarks, views
- And more...

## Running the Application

### 1. Start the Backend Server

```bash
cd backend
npm run dev
```

The backend API will be available at `http://localhost:5000`

### 2. Start the Frontend Development Server

```bash
cd Frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Environment Variables

### Backend (.env)

```env
NODE_ENV=development
PORT=5000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=social_intranet
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d

# File Uploads
UPLOAD_DIR=uploads

# CORS
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## API Endpoints

### Blog/News Endpoints

- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get blog by ID
- `GET /api/blogs/slug/:slug` - Get blog by slug
- `POST /api/blogs` - Create new blog (requires authentication)
- `PATCH /api/blogs/:id` - Update blog (requires authentication)
- `DELETE /api/blogs/:id` - Delete blog (requires authentication)
- `GET /api/blogs/my-blogs` - Get user's blogs (requires authentication)

### Space Endpoints

- `GET /api/spaces` - Get all spaces
- `GET /api/spaces/:id` - Get space by ID

### HR Category Endpoints

- `GET /api/hr-categories` - Get all HR categories
- `GET /api/hr-categories/:id` - Get HR category by ID

### Health Check

- `GET /api/health` - API health status

## Features Implemented

### Blog/News System ✅

1. **Create Blog Post**
   - Rich text editor with formatting options (headings, lists, quotes, code blocks)
   - Banner image upload (up to 10MB)
   - Space selection
   - Category selection
   - Optional HR category (when category is "HR")
   - Tags support
   - Excerpt (max 200 characters)
   - Draft/Published status
   - Public/Private visibility

2. **View Blogs**
   - Filter by status, category, space
   - View count tracking
   - Likes and comments count

3. **Edit/Delete Blogs**
   - Only author or admin can edit/delete
   - Update all blog fields

4. **My Content**
   - View all user's created blogs
   - Edit and manage personal content

## Project Structure

```
project/
├── Frontend/                  # React Frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── base/        # Base components (RichTextEditor)
│   │   │   └── feature/     # Feature components (Modals)
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   │   ├── http.service.ts    # HTTP client
│   │   │   ├── blog.api.ts        # Blog APIs
│   │   │   ├── space.api.ts       # Space APIs
│   │   │   └── hrCategory.api.ts  # HR Category APIs
│   │   ├── database/        # TypeScript schema definitions
│   │   └── i18n/           # Internationalization
│   └── ...
│
├── backend/                   # Node.js Backend
│   ├── config/               # Configuration files
│   │   ├── env.js           # Environment config
│   │   ├── database.js      # Database connection
│   │   └── logger.js        # Logger utility
│   ├── routes/              # API routes
│   ├── controllers/         # Request handlers
│   ├── services/            # Business logic
│   ├── models/              # Database models
│   ├── middlewares/         # Middleware functions
│   │   ├── auth.js         # Authentication
│   │   ├── validation.js   # Input validation
│   │   ├── upload.js       # File upload
│   │   └── errorHandler.js # Error handling
│   ├── utils/              # Utility functions
│   └── server.js           # Express server
│
├── migrations/              # Database migrations
├── scripts/                # Utility scripts
└── READMEs/               # Documentation
```

## Database Schema

The application uses a comprehensive relational database schema with 18+ tables including:

- User Management (users, departments, roles, permissions)
- Spaces System (spaces, space_tabs, space_members)
- Content (blog_posts, documents, activities, crossfunction_teams)
- HR System (hr_categories, hr_announcements, hr_cafe_articles, job_postings)
- Interactions (likes, comments, bookmarks, views)
- Notifications and Analytics

All tables have proper indexes, foreign key constraints, and triggers for data integrity.

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation using Joi
- File upload restrictions (type, size)
- CORS configuration
- Helmet.js security headers
- Rate limiting
- SQL injection prevention (parameterized queries)

## Next Steps

1. **Authentication System**
   - Implement user registration and login
   - Add protected routes
   - Implement JWT token refresh

2. **Document System**
   - Similar to blog system
   - File attachments support
   - Version control

3. **Activity/Events System**
   - Create and manage events
   - Registration system
   - Calendar integration

4. **HR Features**
   - Job postings management
   - HR announcements
   - Employee onboarding

5. **Social Features**
   - Comments on blogs/documents
   - Likes and bookmarks
   - User profiles
   - Notifications

## Troubleshooting

### Database Connection Issues

```bash
psql -U postgres
SELECT 1;
```

If this fails, ensure PostgreSQL is running:
```bash
sudo systemctl status postgresql
```

### Port Already in Use

If port 5000 or 5173 is in use, change the PORT in `.env` files.

### Module Not Found Errors

Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Support

For issues or questions, refer to the schema documentation in `/Frontend/src/database/schema.ts`

---

**Built with ❤️ following enterprise-grade architecture patterns**

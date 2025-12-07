# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Blog/News Endpoints

### 1. Get All Blogs

**GET** `/blogs`

Query Parameters:
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 10)
- `publish_status` (string, optional): Filter by status ('draft' | 'published' | 'archived')
- `category` (string, optional): Filter by category
- `space_id` (UUID, optional): Filter by space
- `hr_category_id` (UUID, optional): Filter by HR category

**Response:**
```json
{
  "status": "success",
  "data": {
    "blogs": [...],
    "total": 100,
    "page": 1,
    "limit": 10
  }
}
```

### 2. Get Blog by ID

**GET** `/blogs/:id`

**Response:**
```json
{
  "status": "success",
  "data": {
    "blog": {
      "id": "uuid",
      "title": "Blog Title",
      "slug": "blog-title-123456",
      "excerpt": "Brief summary...",
      "content": "Full content...",
      "cover_image_url": "https://...",
      "space_id": "uuid",
      "space_name": "Space Name",
      "hr_category_id": "uuid",
      "hr_category_name": "HR Category",
      "category": "news",
      "author_id": "uuid",
      "author_name": "John Doe",
      "tags": ["tag1", "tag2"],
      "publish_status": "published",
      "visibility": "public",
      "published_at": "2024-12-07T10:00:00Z",
      "views_count": 150,
      "likes_count": 25,
      "comments_count": 10,
      "created_at": "2024-12-07T10:00:00Z",
      "updated_at": "2024-12-07T10:00:00Z"
    }
  }
}
```

### 3. Get Blog by Slug

**GET** `/blogs/slug/:slug`

Same response format as Get Blog by ID.

### 4. Create Blog

**POST** `/blogs` (Requires Authentication)

**Content-Type:** `multipart/form-data`

**Body:**
```
title: "Blog Title"
excerpt: "Brief summary (max 200 chars)"
content: "Full blog content"
space_id: "uuid"
category: "news"
hr_category_id: "uuid" (optional)
tags: ["tag1", "tag2"] (as JSON string)
publish_status: "draft" | "published"
visibility: "public" | "private"
cover_image_url: "https://..." (optional)
cover_image: <file> (optional)
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "blog": {...}
  }
}
```

### 5. Update Blog

**PATCH** `/blogs/:id` (Requires Authentication)

**Content-Type:** `multipart/form-data`

**Body:** Same as Create Blog (all fields optional)

**Response:**
```json
{
  "status": "success",
  "data": {
    "blog": {...}
  }
}
```

### 6. Delete Blog

**DELETE** `/blogs/:id` (Requires Authentication)

**Response:**
```json
{
  "status": "success",
  "data": null
}
```

### 7. Get My Blogs

**GET** `/blogs/my-blogs` (Requires Authentication)

Query Parameters:
- `page` (number, optional)
- `limit` (number, optional)

**Response:**
```json
{
  "status": "success",
  "data": {
    "blogs": [...],
    "total": 50
  }
}
```

## Space Endpoints

### 1. Get All Spaces

**GET** `/spaces`

Query Parameters:
- `visibility` ('public' | 'private', optional)
- `parent_space_id` (UUID | 'null', optional)

**Response:**
```json
{
  "status": "success",
  "data": {
    "spaces": [
      {
        "id": "uuid",
        "name": "Space Name",
        "description": "Description",
        "parent_space_id": null,
        "image_url": "https://...",
        "created_by": "uuid",
        "creator_name": "John Doe",
        "is_active": true,
        "visibility": "public",
        "created_at": "2024-12-07T10:00:00Z",
        "updated_at": "2024-12-07T10:00:00Z"
      }
    ]
  }
}
```

### 2. Get Space by ID

**GET** `/spaces/:id`

**Response:**
```json
{
  "status": "success",
  "data": {
    "space": {...}
  }
}
```

## HR Category Endpoints

### 1. Get All HR Categories

**GET** `/hr-categories`

Query Parameters:
- `type` (string, optional): Filter by type

**Response:**
```json
{
  "status": "success",
  "data": {
    "categories": [
      {
        "id": "uuid",
        "name": "Market and Recruiting",
        "slug": "market-recruiting",
        "type": "market-recruiting",
        "description": "...",
        "icon": "icon-name",
        "color": "#FF0000",
        "display_order": 1,
        "is_active": true,
        "blogs_count": 10,
        "documents_count": 5,
        "created_at": "2024-12-07T10:00:00Z",
        "updated_at": "2024-12-07T10:00:00Z"
      }
    ]
  }
}
```

### 2. Get HR Category by ID

**GET** `/hr-categories/:id`

**Response:**
```json
{
  "status": "success",
  "data": {
    "category": {...}
  }
}
```

## Health Check

**GET** `/health`

**Response:**
```json
{
  "status": "success",
  "message": "API is running",
  "timestamp": "2024-12-07T10:00:00Z"
}
```

## Error Responses

All errors follow this format:

```json
{
  "status": "fail" | "error",
  "message": "Error description"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `204` - No Content (successful deletion)
- `400` - Bad Request (validation error)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## File Upload

### Supported Image Types:
- image/jpeg
- image/png
- image/gif
- image/webp
- application/pdf

### Max File Size:
- 10 MB

### Upload Directory:
Files are stored in `backend/uploads/` directory and accessible via:
```
http://localhost:5000/uploads/<filename>
```

## Rate Limiting

API requests are limited to 100 requests per 15 minutes per IP address.

## CORS

CORS is enabled for the frontend origin: `http://localhost:5173`

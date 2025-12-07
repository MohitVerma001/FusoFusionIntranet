import { httpService } from './http.service';
import { BlogPost } from '../database/schema';

interface CreateBlogData {
  title: string;
  excerpt: string;
  content: string;
  cover_image_url?: string;
  space_id: string;
  hr_category_id?: string;
  category: string;
  tags: string[];
  publish_status: 'draft' | 'published' | 'archived';
  visibility: 'public' | 'private';
}

interface UpdateBlogData extends Partial<CreateBlogData> {}

interface BlogsResponse {
  status: string;
  data: {
    blogs: BlogPost[];
    total: number;
    page: number;
    limit: number;
  };
}

interface BlogResponse {
  status: string;
  data: {
    blog: BlogPost;
  };
}

export const blogApi = {
  async createBlog(data: CreateBlogData, coverImage?: File): Promise<BlogResponse> {
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('excerpt', data.excerpt);
    formData.append('content', data.content);
    formData.append('space_id', data.space_id);
    formData.append('category', data.category);
    formData.append('tags', JSON.stringify(data.tags));
    formData.append('publish_status', data.publish_status);
    formData.append('visibility', data.visibility);

    if (data.hr_category_id) {
      formData.append('hr_category_id', data.hr_category_id);
    }

    if (data.cover_image_url) {
      formData.append('cover_image_url', data.cover_image_url);
    }

    if (coverImage) {
      formData.append('cover_image', coverImage);
    }

    return httpService.post<BlogResponse>('/blogs', formData);
  },

  async getAllBlogs(filters?: {
    page?: number;
    limit?: number;
    publish_status?: string;
    category?: string;
    space_id?: string;
    hr_category_id?: string;
  }): Promise<BlogsResponse> {
    return httpService.get<BlogsResponse>('/blogs', { params: filters });
  },

  async getBlogById(id: string): Promise<BlogResponse> {
    return httpService.get<BlogResponse>(`/blogs/${id}`);
  },

  async getBlogBySlug(slug: string): Promise<BlogResponse> {
    return httpService.get<BlogResponse>(`/blogs/slug/${slug}`);
  },

  async updateBlog(id: string, data: UpdateBlogData, coverImage?: File): Promise<BlogResponse> {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === 'tags' && Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });

    if (coverImage) {
      formData.append('cover_image', coverImage);
    }

    return httpService.patch<BlogResponse>(`/blogs/${id}`, formData);
  },

  async deleteBlog(id: string): Promise<void> {
    return httpService.delete<void>(`/blogs/${id}`);
  },

  async getMyBlogs(filters?: { page?: number; limit?: number }): Promise<BlogsResponse> {
    return httpService.get<BlogsResponse>('/blogs/my-blogs', { params: filters });
  },
};

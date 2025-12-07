import slugify from 'slugify';
import { blogModel } from '../models/blogModel.js';
import { AppError } from '../middlewares/errorHandler.js';

export const blogService = {
  async createBlog(blogData, user) {
    if (blogData.excerpt && blogData.excerpt.length > 200) {
      throw new AppError('Excerpt cannot exceed 200 characters', 400);
    }

    const slug = slugify(blogData.title, { lower: true, strict: true }) + '-' + Date.now();

    const newBlog = await blogModel.create({
      ...blogData,
      slug,
      author_id: user.id,
      author_name: user.full_name,
    });

    return newBlog;
  },

  async getAllBlogs(filters) {
    const blogs = await blogModel.findAll(filters);
    const total = await blogModel.count(filters);

    return {
      blogs,
      total,
      page: filters.page || 1,
      limit: filters.limit || 10,
    };
  },

  async getBlogById(id) {
    const blog = await blogModel.findById(id);

    if (!blog) {
      throw new AppError('Blog not found', 404);
    }

    return blog;
  },

  async getBlogBySlug(slug) {
    const blog = await blogModel.findBySlug(slug);

    if (!blog) {
      throw new AppError('Blog not found', 404);
    }

    return blog;
  },

  async updateBlog(id, blogData, user) {
    const blog = await blogModel.findById(id);

    if (!blog) {
      throw new AppError('Blog not found', 404);
    }

    if (blog.author_id !== user.id && user.role !== 'admin') {
      throw new AppError('You do not have permission to update this blog', 403);
    }

    if (blogData.excerpt && blogData.excerpt.length > 200) {
      throw new AppError('Excerpt cannot exceed 200 characters', 400);
    }

    if (blogData.title && blogData.title !== blog.title) {
      blogData.slug = slugify(blogData.title, { lower: true, strict: true }) + '-' + Date.now();
    }

    const updatedBlog = await blogModel.update(id, blogData);
    return updatedBlog;
  },

  async deleteBlog(id, user) {
    const blog = await blogModel.findById(id);

    if (!blog) {
      throw new AppError('Blog not found', 404);
    }

    if (blog.author_id !== user.id && user.role !== 'admin') {
      throw new AppError('You do not have permission to delete this blog', 403);
    }

    await blogModel.delete(id);
    return { message: 'Blog deleted successfully' };
  },

  async getMyBlogs(userId, filters) {
    const blogs = await blogModel.findAll({ ...filters, author_id: userId });
    const total = await blogModel.count({ author_id: userId });

    return {
      blogs,
      total,
    };
  },
};

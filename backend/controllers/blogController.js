import { blogService } from '../services/blogService.js';
import { asyncHandler } from '../middlewares/errorHandler.js';

export const blogController = {
  createBlog: asyncHandler(async (req, res) => {
    const blog = await blogService.createBlog(req.body, req.user);

    res.status(201).json({
      status: 'success',
      data: { blog },
    });
  }),

  getAllBlogs: asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, publish_status, category, space_id, hr_category_id } = req.query;

    const filters = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      offset: (parseInt(page, 10) - 1) * parseInt(limit, 10),
      publish_status,
      category,
      space_id,
      hr_category_id,
    };

    const result = await blogService.getAllBlogs(filters);

    res.status(200).json({
      status: 'success',
      data: result,
    });
  }),

  getBlogById: asyncHandler(async (req, res) => {
    const blog = await blogService.getBlogById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: { blog },
    });
  }),

  getBlogBySlug: asyncHandler(async (req, res) => {
    const blog = await blogService.getBlogBySlug(req.params.slug);

    res.status(200).json({
      status: 'success',
      data: { blog },
    });
  }),

  updateBlog: asyncHandler(async (req, res) => {
    const blog = await blogService.updateBlog(req.params.id, req.body, req.user);

    res.status(200).json({
      status: 'success',
      data: { blog },
    });
  }),

  deleteBlog: asyncHandler(async (req, res) => {
    await blogService.deleteBlog(req.params.id, req.user);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  }),

  getMyBlogs: asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const filters = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      offset: (parseInt(page, 10) - 1) * parseInt(limit, 10),
    };

    const result = await blogService.getMyBlogs(req.user.id, filters);

    res.status(200).json({
      status: 'success',
      data: result,
    });
  }),

  uploadImage: asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No image file provided',
      });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    res.status(200).json({
      status: 'success',
      data: { imageUrl },
    });
  }),
};

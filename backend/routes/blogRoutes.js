import express from 'express';
import { blogController } from '../controllers/blogController.js';
import { protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validation.js';
import { blogValidation } from '../utils/validation.js';
import { upload } from '../middlewares/upload.js';

const router = express.Router();

router.get('/', blogController.getAllBlogs);

router.get('/my-blogs', protect, blogController.getMyBlogs);

router.get('/:id', blogController.getBlogById);

router.get('/slug/:slug', blogController.getBlogBySlug);

router.post(
  '/',
  protect,
  upload.single('cover_image'),
  validate(blogValidation.create),
  blogController.createBlog
);

router.patch(
  '/:id',
  protect,
  upload.single('cover_image'),
  validate(blogValidation.update),
  blogController.updateBlog
);

router.delete('/:id', protect, blogController.deleteBlog);

export default router;

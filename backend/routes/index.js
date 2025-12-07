import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import blogRoutes from './blogRoutes.js';
import spaceRoutes from './spaceRoutes.js';
import hrCategoryRoutes from './hrCategoryRoutes.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: "Social Intranet API is running",
    routes: {
      auth: "/api/auth",
      users: "/api/users",
      blogs: "/api/blogs",
      spaces: "/api/spaces",
      hr_categories: "/api/hr-categories",
      health: "/api/health",
    }
  });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/spaces', spaceRoutes);
router.use('/hr-categories', hrCategoryRoutes);

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;

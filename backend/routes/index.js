import express from 'express';
import blogRoutes from './blogRoutes.js';
import spaceRoutes from './spaceRoutes.js';
import hrCategoryRoutes from './hrCategoryRoutes.js';

const router = express.Router();

// Base API route → fixes "/api" 404
router.get('/', (req, res) => {
  res.status(200).json({
    message: "Fusion Intranet API is running",
    routes: {
      blogs: "/api/blogs",
      spaces: "/api/spaces",
      hr_categories: "/api/hr-categories",
      health: "/api/health",
    }
  });
});

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

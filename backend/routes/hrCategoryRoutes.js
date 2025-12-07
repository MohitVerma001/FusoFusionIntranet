import express from 'express';
import { hrCategoryController } from '../controllers/hrCategoryController.js';

const router = express.Router();

router.get('/', hrCategoryController.getAllCategories);

router.get('/:id', hrCategoryController.getCategoryById);

export default router;

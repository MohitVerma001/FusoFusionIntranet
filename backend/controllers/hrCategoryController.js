import { hrCategoryService } from '../services/hrCategoryService.js';
import { asyncHandler } from '../middlewares/errorHandler.js';

export const hrCategoryController = {
  getAllCategories: asyncHandler(async (req, res) => {
    const { type } = req.query;

    const filters = { type };

    const categories = await hrCategoryService.getAllCategories(filters);

    res.status(200).json({
      status: 'success',
      data: { categories },
    });
  }),

  getCategoryById: asyncHandler(async (req, res) => {
    const category = await hrCategoryService.getCategoryById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: { category },
    });
  }),
};

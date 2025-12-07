import { hrCategoryModel } from '../models/hrCategoryModel.js';

export const hrCategoryService = {
  async getAllCategories(filters) {
    const categories = await hrCategoryModel.findAll(filters);
    return categories;
  },

  async getCategoryById(id) {
    const category = await hrCategoryModel.findById(id);
    return category;
  },
};

import { httpService } from './http.service';
import { HRCategory } from '../database/schema';

interface HRCategoriesResponse {
  status: string;
  data: {
    categories: HRCategory[];
  };
}

interface HRCategoryResponse {
  status: string;
  data: {
    category: HRCategory;
  };
}

export const hrCategoryApi = {
  async getAllCategories(filters?: { type?: string }): Promise<HRCategoriesResponse> {
    return httpService.get<HRCategoriesResponse>('/hr-categories', { params: filters });
  },

  async getCategoryById(id: string): Promise<HRCategoryResponse> {
    return httpService.get<HRCategoryResponse>(`/hr-categories/${id}`);
  },
};

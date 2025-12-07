import { spaceModel } from '../models/spaceModel.js';
import { AppError } from '../middlewares/errorHandler.js';

export const spaceService = {
  async getAllSpaces(filters) {
    const spaces = await spaceModel.findAll(filters);
    return spaces;
  },

  async getSpaceById(id) {
    const space = await spaceModel.findById(id);

    if (!space) {
      throw new AppError('Space not found', 404);
    }

    return space;
  },
};

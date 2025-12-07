import { spaceService } from '../services/spaceService.js';
import { asyncHandler } from '../middlewares/errorHandler.js';

export const spaceController = {
  getAllSpaces: asyncHandler(async (req, res) => {
    const { visibility, parent_space_id } = req.query;

    const filters = {
      visibility,
      parent_space_id: parent_space_id === 'null' ? null : parent_space_id,
    };

    const spaces = await spaceService.getAllSpaces(filters);

    res.status(200).json({
      status: 'success',
      data: { spaces },
    });
  }),

  getSpaceById: asyncHandler(async (req, res) => {
    const space = await spaceService.getSpaceById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: { space },
    });
  }),
};

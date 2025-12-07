import { userService } from '../services/userService.js';
import { asyncHandler } from '../middlewares/errorHandler.js';

export const userController = {
  createUser: asyncHandler(async (req, res) => {
    const user = await userService.createUser(req.body, req.user);

    res.status(201).json({
      status: 'success',
      data: { user },
    });
  }),

  getAllUsers: asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, role, is_active } = req.query;

    const filters = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      offset: (parseInt(page, 10) - 1) * parseInt(limit, 10),
      role,
      is_active: is_active !== undefined ? is_active === 'true' : undefined,
    };

    const result = await userService.getAllUsers(filters, req.user);

    res.status(200).json({
      status: 'success',
      data: result,
    });
  }),

  getUserById: asyncHandler(async (req, res) => {
    const user = await userService.getUserById(req.params.id, req.user);

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  }),

  updateUser: asyncHandler(async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body, req.user);

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  }),

  deactivateUser: asyncHandler(async (req, res) => {
    await userService.deactivateUser(req.params.id, req.user);

    res.status(200).json({
      status: 'success',
      message: 'User deactivated successfully',
    });
  }),
};

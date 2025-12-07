import { authService } from '../services/authService.js';
import { asyncHandler } from '../middlewares/errorHandler.js';

export const authController = {
  register: asyncHandler(async (req, res) => {
    const result = await authService.register(req.body);

    res.status(201).json({
      status: 'success',
      data: result,
    });
  }),

  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.status(200).json({
      status: 'success',
      data: result,
    });
  }),

  getCurrentUser: asyncHandler(async (req, res) => {
    const user = await authService.getCurrentUser(req.user.id);

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  }),

  logout: asyncHandler(async (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully',
    });
  }),
};

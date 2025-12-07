import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { AppError } from './errorHandler.js';
import { asyncHandler } from './errorHandler.js';
import { pool } from '../config/database.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  const decoded = jwt.verify(token, config.jwt.secret);

  const result = await pool.query(
    'SELECT id, email, full_name, role, is_active FROM users WHERE id = $1',
    [decoded.id]
  );

  if (result.rows.length === 0) {
    return next(new AppError('The user belonging to this token no longer exists.', 401));
  }

  const currentUser = result.rows[0];

  if (!currentUser.is_active) {
    return next(new AppError('Your account has been deactivated.', 401));
  }

  req.user = currentUser;
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};

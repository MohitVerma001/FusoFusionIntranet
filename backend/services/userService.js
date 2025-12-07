import bcrypt from 'bcrypt';
import { userModel } from '../models/userModel.js';
import { AppError } from '../middlewares/errorHandler.js';

export const userService = {
  async createUser(userData, creatorUser) {
    if (creatorUser.role !== 'admin') {
      throw new AppError('Only admins can create users', 403);
    }

    const existingUser = await userModel.findByEmail(userData.email);
    if (existingUser) {
      throw new AppError('Email already registered', 400);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 12);

    const newUser = await userModel.create({
      ...userData,
      password_hash: hashedPassword,
    });

    const { password_hash, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  },

  async getAllUsers(filters, requestUser) {
    if (requestUser.role !== 'admin') {
      throw new AppError('Only admins can view all users', 403);
    }

    const users = await userModel.findAll(filters);
    const total = await userModel.count(filters);

    const usersWithoutPasswords = users.map(user => {
      const { password_hash, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return {
      users: usersWithoutPasswords,
      total,
    };
  },

  async getUserById(userId, requestUser) {
    if (requestUser.role !== 'admin' && requestUser.id !== userId) {
      throw new AppError('Access denied', 403);
    }

    const user = await userModel.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const { password_hash, ...userWithoutPassword } = user;

    return userWithoutPassword;
  },

  async updateUser(userId, userData, requestUser) {
    if (requestUser.role !== 'admin' && requestUser.id !== userId) {
      throw new AppError('Access denied', 403);
    }

    if (userData.password) {
      userData.password_hash = await bcrypt.hash(userData.password, 12);
      delete userData.password;
    }

    if (userData.role && requestUser.role !== 'admin') {
      throw new AppError('Only admins can change user roles', 403);
    }

    const updatedUser = await userModel.update(userId, userData);

    if (!updatedUser) {
      throw new AppError('User not found', 404);
    }

    const { password_hash, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
  },

  async deactivateUser(userId, requestUser) {
    if (requestUser.role !== 'admin') {
      throw new AppError('Only admins can deactivate users', 403);
    }

    const updatedUser = await userModel.update(userId, { is_active: false });

    if (!updatedUser) {
      throw new AppError('User not found', 404);
    }

    return { message: 'User deactivated successfully' };
  },
};

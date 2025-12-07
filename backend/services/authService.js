import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/userModel.js';
import { config } from '../config/env.js';
import { AppError } from '../middlewares/errorHandler.js';

export const authService = {
  async register(userData) {
    const existingUser = await userModel.findByEmail(userData.email);
    if (existingUser) {
      throw new AppError('Email already registered', 400);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 12);

    const newUser = await userModel.create({
      ...userData,
      password_hash: hashedPassword,
    });

    const token = this.generateToken(newUser);

    const { password_hash, ...userWithoutPassword } = newUser;

    return {
      user: userWithoutPassword,
      token,
    };
  },

  async login(email, password) {
    const user = await userModel.findByEmail(email);

    if (!user || !user.is_active) {
      throw new AppError('Invalid credentials', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    await userModel.updateLastLogin(user.id);

    const token = this.generateToken(user);

    const { password_hash, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  },

  generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      config.jwt.secret,
      {
        expiresIn: config.jwt.expiresIn,
      }
    );
  },

  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      return decoded;
    } catch (error) {
      throw new AppError('Invalid or expired token', 401);
    }
  },

  async getCurrentUser(userId) {
    const user = await userModel.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const { password_hash, ...userWithoutPassword } = user;

    return userWithoutPassword;
  },
};

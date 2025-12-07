import express from 'express';
import { authController } from '../controllers/authController.js';
import { protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validation.js';
import { authValidation } from '../utils/validation.js';

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);

router.post('/login', validate(authValidation.login), authController.login);

router.get('/me', protect, authController.getCurrentUser);

router.post('/logout', protect, authController.logout);

export default router;

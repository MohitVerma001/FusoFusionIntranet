import express from 'express';
import { userController } from '../controllers/userController.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { validate } from '../middlewares/validation.js';
import { userValidation } from '../utils/validation.js';

const router = express.Router();

router.use(protect);

router.post('/', restrictTo('admin'), validate(userValidation.create), userController.createUser);

router.get('/', restrictTo('admin'), userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.patch('/:id', validate(userValidation.update), userController.updateUser);

router.post('/:id/deactivate', restrictTo('admin'), userController.deactivateUser);

export default router;

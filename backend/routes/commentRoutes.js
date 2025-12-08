import express from 'express';
import { commentController } from '../controllers/commentController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.get('/:entity_type/:entity_id', commentController.getCommentsByEntity);

router.post('/', protect, commentController.createComment);

router.patch('/:id', protect, commentController.updateComment);

router.delete('/:id', protect, commentController.deleteComment);

router.post('/:id/like', protect, commentController.likeComment);

router.delete('/:id/like', protect, commentController.unlikeComment);

export default router;

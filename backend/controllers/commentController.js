import { commentService } from '../services/commentService.js';
import { asyncHandler } from '../middlewares/errorHandler.js';

export const commentController = {
  createComment: asyncHandler(async (req, res) => {
    const comment = await commentService.createComment(req.body, req.user);

    res.status(201).json({
      status: 'success',
      data: { comment },
    });
  }),

  getCommentsByEntity: asyncHandler(async (req, res) => {
    const { entity_type, entity_id } = req.params;
    const userId = req.user?.id;

    const comments = await commentService.getCommentsByEntity(
      entity_type,
      entity_id,
      userId
    );

    res.status(200).json({
      status: 'success',
      data: { comments },
    });
  }),

  updateComment: asyncHandler(async (req, res) => {
    const comment = await commentService.updateComment(
      req.params.id,
      req.body,
      req.user
    );

    res.status(200).json({
      status: 'success',
      data: { comment },
    });
  }),

  deleteComment: asyncHandler(async (req, res) => {
    await commentService.deleteComment(req.params.id, req.user);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  }),

  likeComment: asyncHandler(async (req, res) => {
    await commentService.likeComment(req.params.id, req.user.id);

    res.status(200).json({
      status: 'success',
      message: 'Comment liked successfully',
    });
  }),

  unlikeComment: asyncHandler(async (req, res) => {
    await commentService.unlikeComment(req.params.id, req.user.id);

    res.status(200).json({
      status: 'success',
      message: 'Comment unliked successfully',
    });
  }),
};

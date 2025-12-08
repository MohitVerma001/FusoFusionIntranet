import { commentModel } from '../models/commentModel.js';

export const commentService = {
  async createComment(data, user) {
    const commentData = {
      content: data.content,
      author_id: user.id,
      author_name: user.username || user.email,
      parent_id: data.parent_id,
      entity_type: data.entity_type,
      entity_id: data.entity_id,
    };

    const comment = await commentModel.create(commentData);
    return comment;
  },

  async getCommentsByEntity(entityType, entityId, userId) {
    const comments = await commentModel.findByEntity(entityType, entityId);

    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await commentModel.findRepliesByCommentId(comment.id);

        const repliesWithLikes = await Promise.all(
          replies.map(async (reply) => ({
            ...reply,
            has_user_liked: userId ? await commentModel.hasUserLiked(reply.id, userId) : false,
          }))
        );

        return {
          ...comment,
          replies: repliesWithLikes,
          has_user_liked: userId ? await commentModel.hasUserLiked(comment.id, userId) : false,
        };
      })
    );

    return commentsWithReplies;
  },

  async updateComment(commentId, data, user) {
    const comment = await commentModel.findById(commentId);

    if (!comment) {
      const error = new Error('Comment not found');
      error.statusCode = 404;
      throw error;
    }

    if (comment.author_id !== user.id) {
      const error = new Error('Not authorized to update this comment');
      error.statusCode = 403;
      throw error;
    }

    const updatedComment = await commentModel.update(commentId, data);
    return updatedComment;
  },

  async deleteComment(commentId, user) {
    const comment = await commentModel.findById(commentId);

    if (!comment) {
      const error = new Error('Comment not found');
      error.statusCode = 404;
      throw error;
    }

    if (comment.author_id !== user.id) {
      const error = new Error('Not authorized to delete this comment');
      error.statusCode = 403;
      throw error;
    }

    await commentModel.softDelete(commentId);
  },

  async likeComment(commentId, userId) {
    const comment = await commentModel.findById(commentId);

    if (!comment) {
      const error = new Error('Comment not found');
      error.statusCode = 404;
      throw error;
    }

    await commentModel.likeComment(commentId, userId);
  },

  async unlikeComment(commentId, userId) {
    await commentModel.unlikeComment(commentId, userId);
  },
};

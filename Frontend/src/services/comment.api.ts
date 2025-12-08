import { httpService } from './http.service';

export interface Comment {
  id: string;
  content: string;
  author_id: string;
  author_name: string;
  parent_id?: string;
  entity_type: string;
  entity_id: string;
  likes_count: number;
  is_edited: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  username?: string;
  profile_picture_url?: string;
  replies?: Comment[];
  reply_count?: number;
  has_user_liked?: boolean;
}

export interface CreateCommentData {
  content: string;
  entity_type: string;
  entity_id: string;
  parent_id?: string;
}

export interface UpdateCommentData {
  content: string;
}

export const commentApi = {
  getCommentsByEntity: (entityType: string, entityId: string) =>
    httpService.get(`/comments/${entityType}/${entityId}`),

  createComment: (data: CreateCommentData) =>
    httpService.post('/comments', data),

  updateComment: (commentId: string, data: UpdateCommentData) =>
    httpService.patch(`/comments/${commentId}`, data),

  deleteComment: (commentId: string) =>
    httpService.delete(`/comments/${commentId}`),

  likeComment: (commentId: string) =>
    httpService.post(`/comments/${commentId}/like`, {}),

  unlikeComment: (commentId: string) =>
    httpService.delete(`/comments/${commentId}/like`),
};

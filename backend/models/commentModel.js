import pool from '../config/database.js';

export const commentModel = {
  async create(commentData) {
    const query = `
      INSERT INTO comments (
        content, author_id, author_name, parent_id,
        entity_type, entity_id
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const values = [
      commentData.content,
      commentData.author_id,
      commentData.author_name,
      commentData.parent_id || null,
      commentData.entity_type,
      commentData.entity_id,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findByEntity(entityType, entityId) {
    const query = `
      SELECT
        c.*,
        u.username,
        u.profile_picture_url,
        (SELECT COUNT(*) FROM comments WHERE parent_id = c.id AND is_deleted = false) as reply_count
      FROM comments c
      LEFT JOIN users u ON c.author_id = u.id
      WHERE c.entity_type = $1
        AND c.entity_id = $2
        AND c.is_deleted = false
        AND c.parent_id IS NULL
      ORDER BY c.created_at DESC
    `;

    const result = await pool.query(query, [entityType, entityId]);
    return result.rows;
  },

  async findRepliesByCommentId(commentId) {
    const query = `
      SELECT
        c.*,
        u.username,
        u.profile_picture_url
      FROM comments c
      LEFT JOIN users u ON c.author_id = u.id
      WHERE c.parent_id = $1 AND c.is_deleted = false
      ORDER BY c.created_at ASC
    `;

    const result = await pool.query(query, [commentId]);
    return result.rows;
  },

  async findById(id) {
    const query = `
      SELECT
        c.*,
        u.username,
        u.profile_picture_url
      FROM comments c
      LEFT JOIN users u ON c.author_id = u.id
      WHERE c.id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  async update(id, commentData) {
    const query = `
      UPDATE comments
      SET
        content = COALESCE($1, content),
        is_edited = true,
        updated_at = NOW()
      WHERE id = $2
      RETURNING *
    `;

    const result = await pool.query(query, [commentData.content, id]);
    return result.rows[0];
  },

  async softDelete(id) {
    const query = `
      UPDATE comments
      SET
        is_deleted = true,
        updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  async likeComment(commentId, userId) {
    const query = `
      INSERT INTO comment_likes (comment_id, user_id)
      VALUES ($1, $2)
      ON CONFLICT (comment_id, user_id) DO NOTHING
      RETURNING *
    `;

    const result = await pool.query(query, [commentId, userId]);
    return result.rows[0];
  },

  async unlikeComment(commentId, userId) {
    const query = `
      DELETE FROM comment_likes
      WHERE comment_id = $1 AND user_id = $2
      RETURNING *
    `;

    const result = await pool.query(query, [commentId, userId]);
    return result.rows[0];
  },

  async hasUserLiked(commentId, userId) {
    const query = `
      SELECT EXISTS(
        SELECT 1 FROM comment_likes
        WHERE comment_id = $1 AND user_id = $2
      )
    `;

    const result = await pool.query(query, [commentId, userId]);
    return result.rows[0].exists;
  },

  async getCommentCount(entityType, entityId) {
    const query = `
      SELECT COUNT(*) as count
      FROM comments
      WHERE entity_type = $1
        AND entity_id = $2
        AND is_deleted = false
    `;

    const result = await pool.query(query, [entityType, entityId]);
    return parseInt(result.rows[0].count, 10);
  },
};

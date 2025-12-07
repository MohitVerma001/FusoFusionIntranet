import { pool } from '../config/database.js';

export const spaceModel = {
  async findAll(filters = {}) {
    let query = `
      SELECT s.*, u.full_name as creator_name
      FROM spaces s
      LEFT JOIN users u ON s.created_by = u.id
      WHERE s.is_active = TRUE
    `;

    const values = [];
    let paramCount = 0;

    if (filters.visibility) {
      paramCount++;
      query += ` AND s.visibility = $${paramCount}`;
      values.push(filters.visibility);
    }

    if (filters.parent_space_id === null) {
      query += ` AND s.parent_space_id IS NULL`;
    } else if (filters.parent_space_id) {
      paramCount++;
      query += ` AND s.parent_space_id = $${paramCount}`;
      values.push(filters.parent_space_id);
    }

    query += ` ORDER BY s.created_at DESC`;

    const result = await pool.query(query, values);
    return result.rows;
  },

  async findById(id) {
    const query = `
      SELECT s.*, u.full_name as creator_name
      FROM spaces s
      LEFT JOIN users u ON s.created_by = u.id
      WHERE s.id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};

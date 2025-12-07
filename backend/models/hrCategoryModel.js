import { pool } from '../config/database.js';

export const hrCategoryModel = {
  async findAll(filters = {}) {
    let query = 'SELECT * FROM hr_categories WHERE is_active = TRUE';

    if (filters.type) {
      query += ` AND type = $1`;
      const result = await pool.query(query, [filters.type]);
      return result.rows;
    }

    query += ' ORDER BY display_order ASC';

    const result = await pool.query(query);
    return result.rows;
  },

  async findById(id) {
    const query = 'SELECT * FROM hr_categories WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};

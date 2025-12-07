import { pool } from '../config/database.js';

export const userModel = {
  async create(userData) {
    const query = `
      INSERT INTO users (
        email, password_hash, full_name, role, department_id,
        job_title, phone, location, is_active
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id, email, full_name, role, department_id, job_title,
                phone, location, is_active, created_at
    `;

    const values = [
      userData.email,
      userData.password_hash,
      userData.full_name,
      userData.role || 'internal',
      userData.department_id || null,
      userData.job_title || null,
      userData.phone || null,
      userData.location || null,
      userData.is_active !== undefined ? userData.is_active : true,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findByEmail(email) {
    const query = `
      SELECT u.*, d.name as department_name
      FROM users u
      LEFT JOIN departments d ON u.department_id = d.id
      WHERE u.email = $1
    `;

    const result = await pool.query(query, [email]);
    return result.rows[0];
  },

  async findById(id) {
    const query = `
      SELECT u.*, d.name as department_name
      FROM users u
      LEFT JOIN departments d ON u.department_id = d.id
      WHERE u.id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  async findAll(filters = {}) {
    let query = `
      SELECT u.id, u.email, u.full_name, u.role, u.department_id,
             u.job_title, u.phone, u.location, u.is_active,
             u.last_login, u.created_at, d.name as department_name
      FROM users u
      LEFT JOIN departments d ON u.department_id = d.id
      WHERE 1=1
    `;

    const values = [];
    let paramCount = 0;

    if (filters.role) {
      paramCount++;
      query += ` AND u.role = $${paramCount}`;
      values.push(filters.role);
    }

    if (filters.is_active !== undefined) {
      paramCount++;
      query += ` AND u.is_active = $${paramCount}`;
      values.push(filters.is_active);
    }

    query += ` ORDER BY u.created_at DESC`;

    if (filters.limit) {
      paramCount++;
      query += ` LIMIT $${paramCount}`;
      values.push(filters.limit);
    }

    if (filters.offset) {
      paramCount++;
      query += ` OFFSET $${paramCount}`;
      values.push(filters.offset);
    }

    const result = await pool.query(query, values);
    return result.rows;
  },

  async update(id, userData) {
    const fields = [];
    const values = [];
    let paramCount = 0;

    Object.keys(userData).forEach((key) => {
      if (userData[key] !== undefined && key !== 'id') {
        paramCount++;
        fields.push(`${key} = $${paramCount}`);
        values.push(userData[key]);
      }
    });

    if (fields.length === 0) {
      return null;
    }

    paramCount++;
    values.push(id);

    const query = `
      UPDATE users
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id, email, full_name, role, department_id, job_title,
                phone, location, is_active, created_at
    `;

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async updateLastLogin(id) {
    const query = 'UPDATE users SET last_login = NOW() WHERE id = $1';
    await pool.query(query, [id]);
  },

  async count(filters = {}) {
    let query = 'SELECT COUNT(*) FROM users WHERE 1=1';
    const values = [];
    let paramCount = 0;

    if (filters.role) {
      paramCount++;
      query += ` AND role = $${paramCount}`;
      values.push(filters.role);
    }

    if (filters.is_active !== undefined) {
      paramCount++;
      query += ` AND is_active = $${paramCount}`;
      values.push(filters.is_active);
    }

    const result = await pool.query(query, values);
    return parseInt(result.rows[0].count, 10);
  },
};

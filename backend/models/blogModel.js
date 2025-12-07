import { pool } from '../config/database.js';

export const blogModel = {
  async create(blogData) {
    const query = `
      INSERT INTO blog_posts (
        title, slug, excerpt, content, cover_image_url, space_id, hr_category_id,
        category, author_id, author_name, tags, publish_status, visibility,
        published_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *
    `;

    const values = [
      blogData.title,
      blogData.slug,
      blogData.excerpt,
      blogData.content,
      blogData.cover_image_url || null,
      blogData.space_id,
      blogData.hr_category_id || null,
      blogData.category,
      blogData.author_id,
      blogData.author_name,
      blogData.tags || [],
      blogData.publish_status || 'draft',
      blogData.visibility || 'public',
      blogData.publish_status === 'published' ? new Date() : null,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findAll(filters = {}) {
    let query = `
      SELECT bp.*,
             s.name as space_name,
             hc.name as hr_category_name,
             u.full_name as author_name, u.avatar_url as author_avatar
      FROM blog_posts bp
      LEFT JOIN spaces s ON bp.space_id = s.id
      LEFT JOIN hr_categories hc ON bp.hr_category_id = hc.id
      LEFT JOIN users u ON bp.author_id = u.id
      WHERE 1=1
    `;

    const values = [];
    let paramCount = 0;

    if (filters.publish_status) {
      paramCount++;
      query += ` AND bp.publish_status = $${paramCount}`;
      values.push(filters.publish_status);
    }

    if (filters.category) {
      paramCount++;
      query += ` AND bp.category = $${paramCount}`;
      values.push(filters.category);
    }

    if (filters.space_id) {
      paramCount++;
      query += ` AND bp.space_id = $${paramCount}`;
      values.push(filters.space_id);
    }

    if (filters.author_id) {
      paramCount++;
      query += ` AND bp.author_id = $${paramCount}`;
      values.push(filters.author_id);
    }

    if (filters.hr_category_id) {
      paramCount++;
      query += ` AND bp.hr_category_id = $${paramCount}`;
      values.push(filters.hr_category_id);
    }

    query += ` ORDER BY bp.created_at DESC`;

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

  async findById(id) {
    const query = `
      SELECT bp.*,
             s.name as space_name,
             hc.name as hr_category_name,
             u.full_name as author_full_name, u.avatar_url as author_avatar
      FROM blog_posts bp
      LEFT JOIN spaces s ON bp.space_id = s.id
      LEFT JOIN hr_categories hc ON bp.hr_category_id = hc.id
      LEFT JOIN users u ON bp.author_id = u.id
      WHERE bp.id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  async findBySlug(slug) {
    const query = `
      SELECT bp.*,
             s.name as space_name,
             hc.name as hr_category_name,
             u.full_name as author_full_name, u.avatar_url as author_avatar
      FROM blog_posts bp
      LEFT JOIN spaces s ON bp.space_id = s.id
      LEFT JOIN hr_categories hc ON bp.hr_category_id = hc.id
      LEFT JOIN users u ON bp.author_id = u.id
      WHERE bp.slug = $1
    `;

    const result = await pool.query(query, [slug]);
    return result.rows[0];
  },

  async update(id, blogData) {
    const fields = [];
    const values = [];
    let paramCount = 0;

    Object.keys(blogData).forEach((key) => {
      if (blogData[key] !== undefined) {
        paramCount++;
        fields.push(`${key} = $${paramCount}`);
        values.push(blogData[key]);
      }
    });

    if (blogData.publish_status === 'published' && !blogData.published_at) {
      paramCount++;
      fields.push(`published_at = $${paramCount}`);
      values.push(new Date());
    }

    paramCount++;
    values.push(id);

    const query = `
      UPDATE blog_posts
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async delete(id) {
    const query = 'DELETE FROM blog_posts WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  async count(filters = {}) {
    let query = 'SELECT COUNT(*) FROM blog_posts WHERE 1=1';
    const values = [];
    let paramCount = 0;

    if (filters.publish_status) {
      paramCount++;
      query += ` AND publish_status = $${paramCount}`;
      values.push(filters.publish_status);
    }

    if (filters.category) {
      paramCount++;
      query += ` AND category = $${paramCount}`;
      values.push(filters.category);
    }

    const result = await pool.query(query, values);
    return parseInt(result.rows[0].count, 10);
  },
};

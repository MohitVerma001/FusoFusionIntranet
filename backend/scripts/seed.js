import pg from 'pg';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });


const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME || 'social_intranet',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
});

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...\n');

    const adminPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const existingAdmin = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      ['admin@company.com']
    );

    if (existingAdmin.rows.length > 0) {
      console.log('⚠️  Admin user already exists');
      console.log('   Email: admin@company.com');
      console.log('   Password: admin123\n');
    } else {
      await pool.query(
        `INSERT INTO users (email, password_hash, full_name, role, is_active)
         VALUES ($1, $2, $3, $4, $5)`,
        ['admin@company.com', hashedPassword, 'Admin User', 'admin', true]
      );

      console.log('✅ Admin user created successfully!');
      console.log('   Email: admin@company.com');
      console.log('   Password: admin123\n');
    }

    const internalPassword = 'internal123';
    const internalHashedPassword = await bcrypt.hash(internalPassword, 12);

    const existingInternal = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      ['user@company.com']
    );

    if (existingInternal.rows.length > 0) {
      console.log('⚠️  Internal user already exists');
      console.log('   Email: user@company.com');
      console.log('   Password: internal123\n');
    } else {
      await pool.query(
        `INSERT INTO users (email, password_hash, full_name, role, is_active)
         VALUES ($1, $2, $3, $4, $5)`,
        ['user@company.com', internalHashedPassword, 'Internal User', 'internal', true]
      );

      console.log('✅ Internal user created successfully!');
      console.log('   Email: user@company.com');
      console.log('   Password: internal123\n');
    }

    const spaceCheck = await pool.query('SELECT COUNT(*) FROM spaces');
    if (parseInt(spaceCheck.rows[0].count) === 0) {
      const adminUser = await pool.query('SELECT id FROM users WHERE role = $1 LIMIT 1', ['admin']);
      const adminId = adminUser.rows[0].id;

      await pool.query(
        `INSERT INTO spaces (name, description, created_by, visibility, is_active)
         VALUES
         ('General', 'General announcements and company updates', $1, 'public', true),
         ('Engineering', 'Engineering team discussions and updates', $1, 'public', true),
         ('HR & People', 'Human Resources and People Operations', $1, 'public', true),
         ('Sales & Marketing', 'Sales and Marketing updates', $1, 'public', true)`,
        [adminId]
      );

      console.log('✅ Sample spaces created\n');
    } else {
      console.log('⚠️  Spaces already exist\n');
    }

    const hrCategoryCheck = await pool.query('SELECT COUNT(*) FROM hr_categories');
    if (parseInt(hrCategoryCheck.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO hr_categories (name, slug, type, description, display_order, is_active)
        VALUES
        ('Market and Recruiting', 'market-recruiting', 'market-recruiting', 'Job postings and recruitment', 1, true),
        ('Onboarding', 'onboarding', 'onboarding', 'New employee onboarding', 2, true),
        ('Time and Absence', 'time-absence', 'time-absence', 'Time tracking and leave management', 3, true),
        ('Compensation', 'compensation', 'compensation', 'Salary and benefits information', 4, true),
        ('HR Development', 'hr-development', 'hr-development', 'Professional development and training', 5, true),
        ('Social Welfare', 'social-welfare', 'social-welfare', 'Employee wellness and benefits', 6, true)
      `);

      console.log('✅ HR categories created\n');
    } else {
      console.log('⚠️  HR categories already exist\n');
    }

    console.log('🎉 Database seeding completed successfully!\n');
    console.log('═══════════════════════════════════════');
    console.log('TEST CREDENTIALS');
    console.log('═══════════════════════════════════════');
    console.log('ADMIN:');
    console.log('  Email: admin@company.com');
    console.log('  Password: admin123');
    console.log('');
    console.log('INTERNAL USER:');
    console.log('  Email: user@company.com');
    console.log('  Password: internal123');
    console.log('═══════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Seeding error:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

seedDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

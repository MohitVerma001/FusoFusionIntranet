-- Migration: Create HR Categories
-- Description: Six types of HR categories for content organization

-- HR Categories Table
CREATE TABLE IF NOT EXISTS hr_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  type VARCHAR(50) NOT NULL CHECK (type IN (
    'market-recruiting',
    'onboarding',
    'time-absence',
    'compensation',
    'hr-development',
    'social-welfare'
  )),
  description TEXT,
  icon VARCHAR(100),
  color VARCHAR(50),
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  blogs_count INTEGER DEFAULT 0,
  documents_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_hr_categories_type ON hr_categories(type);
CREATE INDEX idx_hr_categories_slug ON hr_categories(slug);
CREATE INDEX idx_hr_categories_active ON hr_categories(is_active);

-- Create trigger for updated_at
CREATE TRIGGER update_hr_categories_updated_at BEFORE UPDATE ON hr_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Migration: Create Blog Posts / News Table
-- Description: Blog posts and news articles with space and HR category relationships

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  excerpt VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  cover_image_url TEXT,

  space_id UUID NOT NULL REFERENCES spaces(id) ON DELETE CASCADE,
  hr_category_id UUID REFERENCES hr_categories(id) ON DELETE SET NULL,

  category VARCHAR(100) NOT NULL,

  author_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  author_name VARCHAR(255) NOT NULL,

  tags TEXT[] DEFAULT '{}',

  publish_status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (publish_status IN ('draft', 'published', 'archived')),
  visibility VARCHAR(20) NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'private')),

  published_at TIMESTAMP,
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_blog_space ON blog_posts(space_id);
CREATE INDEX idx_blog_hr_category ON blog_posts(hr_category_id);
CREATE INDEX idx_blog_author ON blog_posts(author_id);
CREATE INDEX idx_blog_status ON blog_posts(publish_status);
CREATE INDEX idx_blog_published ON blog_posts(published_at);
CREATE INDEX idx_blog_category ON blog_posts(category);
CREATE INDEX idx_blog_slug ON blog_posts(slug);

-- Create trigger for updated_at
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to automatically update hr_categories counts
CREATE OR REPLACE FUNCTION update_hr_category_blog_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.hr_category_id IS NOT NULL THEN
    UPDATE hr_categories SET blogs_count = blogs_count + 1
    WHERE id = NEW.hr_category_id;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.hr_category_id IS NOT NULL AND NEW.hr_category_id IS NULL THEN
      UPDATE hr_categories SET blogs_count = blogs_count - 1
      WHERE id = OLD.hr_category_id;
    ELSIF OLD.hr_category_id IS NULL AND NEW.hr_category_id IS NOT NULL THEN
      UPDATE hr_categories SET blogs_count = blogs_count + 1
      WHERE id = NEW.hr_category_id;
    ELSIF OLD.hr_category_id IS NOT NULL AND NEW.hr_category_id IS NOT NULL AND OLD.hr_category_id != NEW.hr_category_id THEN
      UPDATE hr_categories SET blogs_count = blogs_count - 1
      WHERE id = OLD.hr_category_id;
      UPDATE hr_categories SET blogs_count = blogs_count + 1
      WHERE id = NEW.hr_category_id;
    END IF;
  ELSIF TG_OP = 'DELETE' AND OLD.hr_category_id IS NOT NULL THEN
    UPDATE hr_categories SET blogs_count = blogs_count - 1
    WHERE id = OLD.hr_category_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for blog count updates
CREATE TRIGGER update_hr_blog_count_trigger
AFTER INSERT OR UPDATE OR DELETE ON blog_posts
FOR EACH ROW EXECUTE FUNCTION update_hr_category_blog_count();

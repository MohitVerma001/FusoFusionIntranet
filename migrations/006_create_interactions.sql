-- Migration: Create Interaction Tables (Likes, Comments, Bookmarks, Views)
-- Description: User engagement and interaction tracking

-- Likes Table (Polymorphic)
CREATE TABLE IF NOT EXISTS likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  likeable_type VARCHAR(50) NOT NULL CHECK (likeable_type IN ('blog', 'document', 'comment', 'hr_cafe')),
  likeable_id UUID NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, likeable_type, likeable_id)
);

-- Comments Table (Polymorphic with nested comments)
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  commentable_type VARCHAR(50) NOT NULL CHECK (commentable_type IN ('blog', 'document', 'activity', 'crossfunction')),
  commentable_id UUID NOT NULL,
  content TEXT NOT NULL,
  parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  likes_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  is_edited BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookmarks Table (Polymorphic)
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  bookmarkable_type VARCHAR(50) NOT NULL CHECK (bookmarkable_type IN ('blog', 'document', 'activity', 'crossfunction', 'job')),
  bookmarkable_id UUID NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, bookmarkable_type, bookmarkable_id)
);

-- Views Table (Polymorphic)
CREATE TABLE IF NOT EXISTS views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  viewable_type VARCHAR(50) NOT NULL CHECK (viewable_type IN ('blog', 'document', 'activity', 'crossfunction', 'job')),
  viewable_id UUID NOT NULL,
  ip_address VARCHAR(50),
  user_agent TEXT,
  viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_likes_user ON likes(user_id);
CREATE INDEX idx_likes_content ON likes(likeable_type, likeable_id);

CREATE INDEX idx_comments_user ON comments(user_id);
CREATE INDEX idx_comments_content ON comments(commentable_type, commentable_id);
CREATE INDEX idx_comments_parent ON comments(parent_comment_id);

CREATE INDEX idx_bookmarks_user ON bookmarks(user_id);
CREATE INDEX idx_bookmarks_content ON bookmarks(bookmarkable_type, bookmarkable_id);

CREATE INDEX idx_views_content ON views(viewable_type, viewable_id);
CREATE INDEX idx_views_date ON views(viewed_at);

-- Create trigger for comments updated_at
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update likes count on blog_posts
CREATE OR REPLACE FUNCTION update_blog_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.likeable_type = 'blog' THEN
    UPDATE blog_posts SET likes_count = likes_count + 1 WHERE id = NEW.likeable_id;
  ELSIF TG_OP = 'DELETE' AND OLD.likeable_type = 'blog' THEN
    UPDATE blog_posts SET likes_count = likes_count - 1 WHERE id = OLD.likeable_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to update comments count on blog_posts
CREATE OR REPLACE FUNCTION update_blog_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.commentable_type = 'blog' AND NEW.parent_comment_id IS NULL THEN
    UPDATE blog_posts SET comments_count = comments_count + 1 WHERE id = NEW.commentable_id;
  ELSIF TG_OP = 'DELETE' AND OLD.commentable_type = 'blog' AND OLD.parent_comment_id IS NULL THEN
    UPDATE blog_posts SET comments_count = comments_count - 1 WHERE id = OLD.commentable_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to update views count on blog_posts
CREATE OR REPLACE FUNCTION update_blog_views_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.viewable_type = 'blog' THEN
    UPDATE blog_posts SET views_count = views_count + 1 WHERE id = NEW.viewable_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER blog_likes_count_trigger
AFTER INSERT OR DELETE ON likes
FOR EACH ROW EXECUTE FUNCTION update_blog_likes_count();

CREATE TRIGGER blog_comments_count_trigger
AFTER INSERT OR DELETE ON comments
FOR EACH ROW EXECUTE FUNCTION update_blog_comments_count();

CREATE TRIGGER blog_views_count_trigger
AFTER INSERT ON views
FOR EACH ROW EXECUTE FUNCTION update_blog_views_count();

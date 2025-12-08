/*
  # Create Comments Table

  1. New Tables
    - `comments`
      - `id` (uuid, primary key)
      - `content` (text) - Comment content
      - `author_id` (uuid) - User who posted the comment
      - `author_name` (text) - Name of the comment author
      - `parent_id` (uuid) - For nested replies (nullable)
      - `entity_type` (text) - Type of entity (blog, document, space, etc.)
      - `entity_id` (uuid) - ID of the related entity
      - `likes_count` (integer) - Number of likes
      - `is_edited` (boolean) - Whether comment was edited
      - `is_deleted` (boolean) - Soft delete flag
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `comments` table
    - Add policies for authenticated users to:
      - Read all published comments
      - Create their own comments
      - Update their own comments
      - Delete their own comments
*/

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('blog', 'document', 'space', 'activity', 'crossfunction', 'news', 'hr_category')),
  entity_id UUID NOT NULL,
  likes_count INTEGER DEFAULT 0,
  is_edited BOOLEAN DEFAULT false,
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_comments_entity ON comments(entity_type, entity_id) WHERE is_deleted = false;
CREATE INDEX IF NOT EXISTS idx_comments_author ON comments(author_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent ON comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_comments_created ON comments(created_at DESC);

-- Create comment_likes table for tracking who liked which comments
CREATE TABLE IF NOT EXISTS comment_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(comment_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_comment_likes_comment ON comment_likes(comment_id);
CREATE INDEX IF NOT EXISTS idx_comment_likes_user ON comment_likes(user_id);

-- Enable Row Level Security
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;

-- Policies for comments table
CREATE POLICY "Anyone can view non-deleted comments"
  ON comments FOR SELECT
  USING (is_deleted = false);

CREATE POLICY "Authenticated users can create comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own comments"
  ON comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can delete their own comments"
  ON comments FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- Policies for comment_likes table
CREATE POLICY "Anyone can view comment likes"
  ON comment_likes FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can like comments"
  ON comment_likes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own likes"
  ON comment_likes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to update comment count on entities
CREATE OR REPLACE FUNCTION update_entity_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.is_deleted = false THEN
    IF NEW.entity_type = 'blog' THEN
      UPDATE blog_posts SET comments_count = comments_count + 1 WHERE id = NEW.entity_id;
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.is_deleted = false AND NEW.is_deleted = true THEN
      IF NEW.entity_type = 'blog' THEN
        UPDATE blog_posts SET comments_count = GREATEST(comments_count - 1, 0) WHERE id = NEW.entity_id;
      END IF;
    ELSIF OLD.is_deleted = true AND NEW.is_deleted = false THEN
      IF NEW.entity_type = 'blog' THEN
        UPDATE blog_posts SET comments_count = comments_count + 1 WHERE id = NEW.entity_id;
      END IF;
    END IF;
  ELSIF TG_OP = 'DELETE' AND OLD.is_deleted = false THEN
    IF OLD.entity_type = 'blog' THEN
      UPDATE blog_posts SET comments_count = GREATEST(comments_count - 1, 0) WHERE id = OLD.entity_id;
    END IF;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger to update comment counts
DROP TRIGGER IF EXISTS trigger_update_comment_count ON comments;
CREATE TRIGGER trigger_update_comment_count
  AFTER INSERT OR UPDATE OR DELETE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_entity_comment_count();

-- Function to update like count on comments
CREATE OR REPLACE FUNCTION update_comment_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE comments SET likes_count = likes_count + 1 WHERE id = NEW.comment_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE comments SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = OLD.comment_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger to update like counts
DROP TRIGGER IF EXISTS trigger_update_comment_like_count ON comment_likes;
CREATE TRIGGER trigger_update_comment_like_count
  AFTER INSERT OR DELETE ON comment_likes
  FOR EACH ROW
  EXECUTE FUNCTION update_comment_like_count();

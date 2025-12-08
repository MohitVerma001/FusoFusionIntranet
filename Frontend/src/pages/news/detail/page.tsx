import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import GlobalNav from '../../../components/feature/GlobalNav';
import Footer from '../../../components/feature/Footer';
import { blogApi } from '../../../services/blog.api';
import { BlogPost } from '../../../database/schema';
import { commentApi, Comment } from '../../../services/comment.api';

export default function NewsDetailPage() {
  const { id } = useParams();
  const [language, setLanguage] = useState<'en' | 'jp'>('en');
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await blogApi.getBlogById(id);
        setBlog(response.data.blog);

        const relatedResponse = await blogApi.getAllBlogs({
          publish_status: 'published',
          limit: 3
        });
        setRelatedBlogs(relatedResponse.data.blogs.filter(b => b.id !== id).slice(0, 3));

        await fetchComments();
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  const fetchComments = async () => {
    if (!id) return;

    try {
      setCommentsLoading(true);
      const response = await commentApi.getCommentsByEntity('blog', id);
      setComments(response.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setCommentsLoading(false);
    }
  };

  useEffect(() => {
    const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '[]');
    const bookmarkedBlogs = JSON.parse(localStorage.getItem('bookmarkedBlogs') || '[]');

    if (id) {
      setLiked(likedBlogs.includes(id));
      setBookmarked(bookmarkedBlogs.includes(id));
    }
  }, [id]);

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]*>/g, '');
    const wordCount = textContent.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleLike = () => {
    const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs') || '[]');

    if (liked) {
      const updated = likedBlogs.filter((blogId: string) => blogId !== id);
      localStorage.setItem('likedBlogs', JSON.stringify(updated));
      setLiked(false);
    } else {
      likedBlogs.push(id);
      localStorage.setItem('likedBlogs', JSON.stringify(likedBlogs));
      setLiked(true);
    }
  };

  const handleBookmark = () => {
    const bookmarkedBlogs = JSON.parse(localStorage.getItem('bookmarkedBlogs') || '[]');

    if (bookmarked) {
      const updated = bookmarkedBlogs.filter((blogId: string) => blogId !== id);
      localStorage.setItem('bookmarkedBlogs', JSON.stringify(updated));
      setBookmarked(false);
    } else {
      bookmarkedBlogs.push(id);
      localStorage.setItem('bookmarkedBlogs', JSON.stringify(bookmarkedBlogs));
      setBookmarked(true);
    }
  };

  const handleSavePDF = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <GlobalNav userRole="admin" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <GlobalNav userRole="admin" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <i className="ri-file-unknow-line text-6xl text-gray-600 mb-4"></i>
            <h2 className="text-2xl font-bold text-white mb-2">Article Not Found</h2>
            <p className="text-gray-400 mb-6">The article you're looking for doesn't exist.</p>
            <Link
              to="/news"
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-red-600/30 transition-all duration-200"
            >
              Back to News
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
  const coverImage = blog.cover_image_url
    ? (blog.cover_image_url.startsWith('http') ? blog.cover_image_url : `${API_BASE_URL}${blog.cover_image_url}`)
    : 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1200';
  const publishDate = new Date(blog.published_at || blog.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const readTime = calculateReadTime(blog.content);

  const handleSubmitComment = async () => {
    if (!comment.trim() || !id) return;

    try {
      setIsSubmittingComment(true);
      await commentApi.createComment({
        content: comment,
        entity_type: 'blog',
        entity_id: id,
      });

      setComment('');
      await fetchComments();
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to post comment. Please try again.');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    try {
      const commentToUpdate = comments.find(c => c.id === commentId);
      if (!commentToUpdate) return;

      if (commentToUpdate.has_user_liked) {
        await commentApi.unlikeComment(commentId);
      } else {
        await commentApi.likeComment(commentId);
      }

      await fetchComments();
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <GlobalNav userRole="admin" />
      
      <div className="pt-16">
        <div className="pt-20 pb-12">
          <div className="max-w-5xl mx-auto px-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 animate-slide-up">
              <Link to="/" className="hover:text-red-500 transition-colors duration-200">Home</Link>
              <i className="ri-arrow-right-s-line"></i>
              <Link to="/news" className="hover:text-red-500 transition-colors duration-200">News</Link>
              <i className="ri-arrow-right-s-line"></i>
              <span className="text-white">Article</span>
            </div>

            {/* Article Header */}
            <div className="mb-8 animate-slide-up">
              <div className="flex items-center gap-3 mb-4">
                {blog.tags && blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-600/20 border border-red-600/30 text-red-500 text-xs font-medium rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                {blog.title}
              </h1>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-semibold">
                    {blog.author_name ? blog.author_name.substring(0, 2).toUpperCase() : 'AN'}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{blog.author_name || 'Anonymous'}</div>
                    <div className="text-sm text-gray-400">{blog.category || 'News'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <span className="flex items-center gap-2">
                    <i className="ri-calendar-line"></i>
                    {publishDate}
                  </span>
                  <span className="flex items-center gap-2">
                    <i className="ri-time-line"></i>
                    {readTime}
                  </span>
                  <span className="flex items-center gap-2">
                    <i className="ri-eye-line"></i>
                    {blog.views_count || 0} views
                  </span>
                </div>
              </div>
            </div>

            {/* Language Toggle & Actions */}
            <div className="flex items-center justify-between mb-8 animate-slide-up">
              <div className="flex items-center gap-2 bg-dark-card border border-dark-border rounded-lg p-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    language === 'en'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('jp')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    language === 'jp'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  日本語
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    liked
                      ? 'bg-red-600/20 border-red-600 text-red-500'
                      : 'bg-dark-card border-dark-border text-gray-400 hover:border-red-600/50 hover:text-red-500'
                  }`}
                >
                  <i className={liked ? 'ri-heart-fill' : 'ri-heart-line'}></i>
                  <span className="text-sm font-medium">{(blog.likes_count || 0) + (liked ? 1 : 0)}</span>
                </button>

                <button
                  onClick={handleBookmark}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    bookmarked
                      ? 'bg-red-600/20 border-red-600 text-red-500'
                      : 'bg-dark-card border-dark-border text-gray-400 hover:border-red-600/50 hover:text-red-500'
                  }`}
                >
                  <i className={bookmarked ? 'ri-bookmark-fill' : 'ri-bookmark-line'}></i>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 bg-dark-card border border-dark-border text-gray-400 rounded-lg hover:border-red-600/50 hover:text-red-500 transition-all duration-200 whitespace-nowrap cursor-pointer">
                  <i className="ri-share-line"></i>
                  <span className="text-sm font-medium">Share</span>
                </button>

                <button
                  onClick={() => setFollowing(!following)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    following
                      ? 'bg-dark-card border border-dark-border text-gray-400 hover:border-red-600/50'
                      : 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30'
                  }`}
                >
                  <i className={following ? 'ri-user-unfollow-line' : 'ri-user-follow-line'}></i>
                  <span className="text-sm font-medium">{following ? 'Following' : 'Follow'}</span>
                </button>

                <button
                  onClick={handleSavePDF}
                  className="flex items-center gap-2 px-4 py-2 bg-dark-card border border-dark-border text-gray-400 rounded-lg hover:border-red-600/50 hover:text-red-500 transition-all duration-200 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-file-pdf-line"></i>
                  <span className="text-sm font-medium">PDF</span>
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-96 rounded-lg overflow-hidden mb-10 animate-scale-in">
              <img
                src={coverImage}
                alt={blog.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Article Content */}
            <article className="bg-dark-card border border-dark-border rounded-lg p-8 mb-8">
              <div className="prose prose-invert prose-lg max-w-none">
                <div
                  className="text-white leading-relaxed space-y-4 blog-content"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                  style={{
                    fontSize: '1.125rem',
                    lineHeight: '1.75'
                  }}
                />
              </div>
            </article>

            {/* Comments Section */}
            <div className="bg-dark-card border border-dark-border rounded-lg p-8 mb-10 animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Comments ({comments.length})</h3>
                <button
                  onClick={() => setShowComments(!showComments)}
                  className="text-sm text-red-500 hover:text-red-400 transition-colors duration-200 cursor-pointer"
                >
                  {showComments ? 'Hide Comments' : 'Show Comments'}
                </button>
              </div>

              {/* Add Comment */}
              <div className="mb-6">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full px-4 py-3 bg-dark-hover border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-200 resize-none"
                  rows={3}
                  maxLength={500}
                  disabled={isSubmittingComment}
                />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm text-gray-500">{comment.length}/500</span>
                  <button
                    onClick={handleSubmitComment}
                    disabled={isSubmittingComment || !comment.trim()}
                    className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-red-600/30 transition-all duration-200 whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingComment ? 'Posting...' : 'Post Comment'}
                  </button>
                </div>
              </div>

              {/* Comments List */}
              {showComments && (
                <div className="space-y-4">
                  {commentsLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600 mx-auto"></div>
                    </div>
                  ) : comments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No comments yet. Be the first to comment!
                    </div>
                  ) : (
                    comments.map((commentItem) => {
                      const commentDate = new Date(commentItem.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      });

                      return (
                        <div key={commentItem.id} className="bg-dark-hover border border-dark-border rounded-lg p-5">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                              {commentItem.author_name.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <div className="text-white font-semibold">{commentItem.author_name}</div>
                                  <div className="text-xs text-gray-500">
                                    {commentDate}
                                    {commentItem.is_edited && <span className="ml-2">(edited)</span>}
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleLikeComment(commentItem.id)}
                                  className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                                >
                                  <i className={commentItem.has_user_liked ? 'ri-heart-fill text-red-500' : 'ri-heart-line'}></i>
                                  <span className="text-sm">{commentItem.likes_count}</span>
                                </button>
                              </div>
                              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{commentItem.content}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* Related Articles */}
            {relatedBlogs.length > 0 && (
              <div className="animate-slide-up">
                <h3 className="text-2xl font-bold text-white mb-6">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedBlogs.map((article) => {
                    const articleCover = article.cover_image_url || 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400';
                    const articleDate = new Date(article.published_at || article.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    });

                    return (
                      <Link
                        key={article.id}
                        to={`/news/${article.id}`}
                        className="bg-dark-card border border-dark-border rounded-lg overflow-hidden hover:shadow-xl hover:shadow-red-600/20 hover:border-red-600/50 transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={articleCover}
                            alt={article.title}
                            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                        <div className="p-4">
                          <h4 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-red-500 transition-colors duration-200">
                            {article.title}
                          </h4>
                          <span className="text-xs text-gray-500">{articleDate}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

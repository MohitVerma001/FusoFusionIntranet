import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { blogApi } from '../../../services/blog.api';
import { BlogPost } from '../../../database/schema';

export default function LatestNews() {
  const [newsItems, setNewsItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        setLoading(true);
        const response = await blogApi.getAllBlogs({ publish_status: 'published', limit: 3 });
        setNewsItems(response.data.blogs);
      } catch (error) {
        console.error('Error fetching latest blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBlogs();
  }, []);

  if (loading) {
    return (
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <i className="ri-newspaper-line text-red-600"></i>
            Latest News
          </h2>
          <Link
            to="/news"
            className="text-red-600 hover:text-red-500 font-medium flex items-center gap-2 cursor-pointer transition-colors duration-200"
          >
            View All
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (newsItems.length === 0) {
    return (
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <i className="ri-newspaper-line text-red-600"></i>
            Latest News
          </h2>
        </div>
        <div className="text-center py-8 bg-dark-card rounded-lg border border-dark-border">
          <i className="ri-file-list-3-line text-4xl text-gray-600 mb-2"></i>
          <p className="text-gray-400">No news available yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <i className="ri-newspaper-line text-red-600"></i>
          Latest News
        </h2>
        <Link
          to="/news"
          className="text-red-600 hover:text-red-500 font-medium flex items-center gap-2 cursor-pointer transition-colors duration-200"
        >
          View All
          <i className="ri-arrow-right-line"></i>
        </Link>
      </div>

      <div className="space-y-4">
        {newsItems.map((news) => {
          const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
          const coverImage = news.cover_image_url
            ? (news.cover_image_url.startsWith('http') ? news.cover_image_url : `${API_BASE_URL}${news.cover_image_url}`)
            : 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800';
          const publishDate = new Date(news.published_at || news.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });

          return (
            <Link
              key={news.id}
              to={`/news/${news.id}`}
              className="block bg-gradient-to-r from-dark-card to-gray-900 rounded-lg overflow-hidden hover:shadow-xl hover:shadow-red-600/20 transition-all duration-300 hover:-translate-y-1 border border-dark-border hover:border-red-600/50 group cursor-pointer"
            >
              <div className="flex gap-4 p-4">
                <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={coverImage}
                    alt={news.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-600 transition-colors duration-200 line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                      {news.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <i className="ri-user-line text-red-600"></i>
                        {news.author_name || 'Anonymous'}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="ri-calendar-line text-red-600"></i>
                        {publishDate}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-gray-500 text-sm">
                        <i className="ri-heart-line"></i>
                        {news.likes_count || 0}
                      </span>
                      <span className="flex items-center gap-1 text-gray-500 text-sm">
                        <i className="ri-chat-3-line"></i>
                        {news.comments_count || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

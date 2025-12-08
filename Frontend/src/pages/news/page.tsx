import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import GlobalNav from '../../components/feature/GlobalNav';
import SecondaryNav from '../../components/feature/SecondaryNav';
import HeroSection from '../home/components/HeroSection';
import Footer from '../../components/feature/Footer';
import { blogApi } from '../../services/blog.api';
import { BlogPost } from '../../database/schema';

export default function NewsPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [newsItems, setNewsItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
        document.body.classList.add('scrolled');
      } else {
        setIsScrolled(false);
        document.body.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('scrolled');
    };
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await blogApi.getAllBlogs({ publish_status: 'published', limit: 100 });
        setNewsItems(response.data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter and sort logic
  const filteredAndSortedNews = useMemo(() => {
    let filtered = [...newsItems];

    // Filter by author
    if (selectedAuthor !== 'all') {
      filtered = filtered.filter(item => {
        const author = item.author_name || item.author_id;
        if (author) {
          return author.toLowerCase().includes(selectedAuthor);
        }
        return false;
      });
    }

    // Filter by tag
    if (selectedTag !== 'all') {
      filtered = filtered.filter(item => {
        if (item.tags && Array.isArray(item.tags)) {
          return item.tags.some(tag => tag.toLowerCase().includes(selectedTag));
        }
        return false;
      });
    }

    // Filter by date
    const now = new Date();
    const itemDate = (dateStr: string) => new Date(dateStr);

    filtered = filtered.filter(item => {
      const date = itemDate(item.published_at || item.created_at);
      const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

      switch (selectedDate) {
        case '7days':
          return diffDays <= 7;
        case '30days':
          return diffDays <= 30;
        case '3months':
          return diffDays <= 90;
        case '6months':
          return diffDays <= 180;
        default:
          return true;
      }
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime();
        case 'oldest':
          return new Date(a.published_at || a.created_at).getTime() - new Date(b.published_at || b.created_at).getTime();
        case 'popular':
          return (b.likes_count || 0) - (a.likes_count || 0);
        case 'commented':
          return (b.comments_count || 0) - (a.comments_count || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedAuthor, selectedTag, selectedDate, sortBy, newsItems]);

  const clearFilters = () => {
    setSelectedAuthor('all');
    setSelectedTag('all');
    setSelectedDate('all');
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <GlobalNav userRole="admin" />
      <SecondaryNav userRole="admin" />
      <HeroSection 
        title="MFTBC News"
        subtitle="Stay updated with the latest news, announcements, and insights from FUSO"
        showSearch={true}
      />
      
      {/* Main Content */}
      <div className={`transition-all duration-700 ${isScrolled ? 'pt-36' : 'pt-[430px]'}`}>
        <div className="max-w-7xl mx-auto px-6 pb-12">
          {/* Filters */}
          <div className="bg-dark-card rounded-lg shadow-sm border border-dark-border p-4 mb-6">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <i className="ri-filter-line text-red-500 text-lg"></i>
                <span className="text-sm font-semibold text-white">Filters:</span>
              </div>
              
              <select 
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                className="px-4 py-2 bg-dark-hover border border-dark-border text-white rounded-lg text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-200 cursor-pointer"
              >
                <option value="all">All Authors</option>
                <option value="corporate">Corporate Communications</option>
                <option value="hr">HR Department</option>
                <option value="finance">Finance Department</option>
                <option value="r&d">R&D Division</option>
                <option value="it">IT Department</option>
              </select>

              <select 
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-4 py-2 bg-dark-hover border border-dark-border text-white rounded-lg text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-200 cursor-pointer"
              >
                <option value="all">All Tags</option>
                <option value="sustainability">Sustainability</option>
                <option value="innovation">Innovation</option>
                <option value="financial">Financial</option>
                <option value="hr">HR</option>
                <option value="technology">Technology</option>
              </select>

              <select 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 bg-dark-hover border border-dark-border text-white rounded-lg text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-200 cursor-pointer"
              >
                <option value="all">All Time</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
              </select>

              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-dark-hover border border-dark-border text-white rounded-lg text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-200 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
                <option value="commented">Most Commented</option>
              </select>

              <div className="ml-auto flex items-center gap-3">
                <span className="text-sm text-gray-400">
                  <span className="font-semibold text-white">{filteredAndSortedNews.length}</span> articles
                </span>
                <button 
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm text-red-500 hover:bg-red-600/10 rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* News Grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading blogs...</p>
            </div>
          ) : filteredAndSortedNews.length === 0 ? (
            <div className="text-center py-20">
              <i className="ri-file-list-3-line text-6xl text-gray-600 mb-4"></i>
              <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your filters to see more results</p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-red-600/30 transition-all duration-200 whitespace-nowrap cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {filteredAndSortedNews.map((news, index) => {
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
                    className="bg-gradient-to-br from-dark-card to-gray-900/50 border border-dark-border rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-red-600/30 hover:border-red-600/70 transition-all duration-300 hover:-translate-y-2 group cursor-pointer animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={coverImage}
                        alt={news.title}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                      <div className="absolute top-3 right-3 flex gap-2">
                        {news.tags && news.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-red-600 backdrop-blur-sm text-white text-xs font-semibold rounded-lg shadow-lg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-red-500 transition-colors duration-200 leading-tight">
                        {news.title}
                      </h3>
                      <p className="text-sm text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                        {news.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-400 mb-4 pb-4 border-b border-dark-border">
                        <span className="flex items-center gap-2">
                          <i className="ri-user-line text-red-500"></i>
                          <span className="line-clamp-1 font-medium">{news.author_name || 'Anonymous'}</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <i className="ri-calendar-line text-red-500"></i>
                          <span className="font-medium">{publishDate}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-5">
                        <button
                          onClick={(e) => e.preventDefault()}
                          className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                        >
                          <i className="ri-heart-line text-base"></i>
                          <span className="text-sm font-semibold">{news.likes_count || 0}</span>
                        </button>
                        <button
                          onClick={(e) => e.preventDefault()}
                          className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                        >
                          <i className="ri-chat-3-line text-base"></i>
                          <span className="text-sm font-semibold">{news.comments_count || 0}</span>
                        </button>
                        <button
                          onClick={(e) => e.preventDefault()}
                          className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer ml-auto"
                        >
                          <i className="ri-share-line text-base"></i>
                        </button>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {filteredAndSortedNews.length > 0 && (
            <div className="flex items-center justify-center gap-2">
              <button className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-sm font-medium text-gray-400 hover:bg-dark-hover hover:text-white hover:border-red-600/50 transition-all duration-200 whitespace-nowrap cursor-pointer">
                <i className="ri-arrow-left-s-line"></i>
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg text-sm font-medium whitespace-nowrap shadow-lg shadow-red-600/30 cursor-pointer">1</button>
              <button className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-sm font-medium text-gray-400 hover:bg-dark-hover hover:text-white hover:border-red-600/50 transition-all duration-200 whitespace-nowrap cursor-pointer">2</button>
              <button className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-sm font-medium text-gray-400 hover:bg-dark-hover hover:text-white hover:border-red-600/50 transition-all duration-200 whitespace-nowrap cursor-pointer">3</button>
              <button className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-sm font-medium text-gray-400 hover:bg-dark-hover hover:text-white hover:border-red-600/50 transition-all duration-200 whitespace-nowrap cursor-pointer">
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

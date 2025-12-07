import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import GlobalNav from '../../components/feature/GlobalNav';
import SecondaryNav from '../../components/feature/SecondaryNav';
import HeroSection from '../home/components/HeroSection';
import Footer from '../../components/feature/Footer';

export default function NewsPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

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

  const newsItems = [
    {
      id: 1,
      title: 'FUSO Announces New Sustainability Initiative for 2025',
      image: 'https://readdy.ai/api/search-image?query=modern%20sustainable%20green%20technology%20innovation%20in%20automotive%20industry%20with%20clean%20energy%20solutions%20eco%20friendly%20manufacturing%20facility%20professional%20corporate%20setting%20dark%20background&width=400&height=250&seq=news001&orientation=landscape',
      author: 'Corporate Communications',
      date: '2025-01-15',
      tags: ['Sustainability', 'Innovation', 'Corporate'],
      likes: 234,
      comments: 45,
      bookmarked: false,
      excerpt: 'FUSO is proud to announce our comprehensive sustainability roadmap aimed at reducing carbon emissions by 40% over the next five years through innovative green technologies and manufacturing processes.'
    },
    {
      id: 2,
      title: 'Q4 2024 Results Exceed Expectations with Record Growth',
      image: 'https://readdy.ai/api/search-image?query=business%20success%20growth%20chart%20analytics%20dashboard%20with%20upward%20trending%20graphs%20professional%20corporate%20financial%20data%20visualization%20modern%20office%20setting&width=400&height=250&seq=news002&orientation=landscape',
      author: 'Finance Department',
      date: '2025-01-12',
      tags: ['Financial', 'Results', 'Growth'],
      likes: 189,
      comments: 32,
      bookmarked: true,
      excerpt: 'Our fourth quarter results demonstrate exceptional performance across all business units, with revenue growth of 18% year-over-year and expanded market share in key segments.'
    },
    {
      id: 3,
      title: 'New R&D Center Opens in Tokyo with Advanced Facilities',
      image: 'https://readdy.ai/api/search-image?query=state%20of%20the%20art%20research%20and%20development%20laboratory%20facility%20with%20modern%20equipment%20advanced%20technology%20workspace%20clean%20professional%20environment%20innovation%20center&width=400&height=250&seq=news003&orientation=landscape',
      author: 'R&D Division',
      date: '2025-01-10',
      tags: ['R&D', 'Innovation', 'Facilities'],
      likes: 312,
      comments: 67,
      bookmarked: false,
      excerpt: 'The new Tokyo R&D Center features cutting-edge laboratories and testing facilities, enabling our engineers to accelerate innovation in electric vehicle technology and autonomous driving systems.'
    },
    {
      id: 4,
      title: 'Employee Wellness Program Launches Company-Wide',
      image: 'https://readdy.ai/api/search-image?query=corporate%20wellness%20program%20healthy%20workplace%20environment%20employees%20exercising%20yoga%20meditation%20modern%20fitness%20facility%20professional%20business%20setting&width=400&height=250&seq=news004&orientation=landscape',
      author: 'HR Department',
      date: '2025-01-08',
      tags: ['HR', 'Wellness', 'Benefits'],
      likes: 456,
      comments: 89,
      bookmarked: false,
      excerpt: 'Our comprehensive wellness program includes fitness memberships, mental health support, nutrition counseling, and flexible work arrangements to support employee wellbeing and work-life balance.'
    },
    {
      id: 5,
      title: 'Strategic Partnership with Leading Tech Company Announced',
      image: 'https://readdy.ai/api/search-image?query=business%20partnership%20handshake%20corporate%20collaboration%20meeting%20modern%20office%20boardroom%20professional%20executives%20technology%20innovation%20alliance&width=400&height=250&seq=news005&orientation=landscape',
      author: 'Business Development',
      date: '2025-01-05',
      tags: ['Partnership', 'Technology', 'Strategy'],
      likes: 278,
      comments: 54,
      bookmarked: true,
      excerpt: 'This strategic alliance will combine our automotive expertise with advanced AI and IoT technologies to develop next-generation connected vehicle solutions for the global market.'
    },
    {
      id: 6,
      title: 'FUSO Wins Industry Excellence Award for Innovation',
      image: 'https://readdy.ai/api/search-image?query=prestigious%20business%20award%20trophy%20ceremony%20corporate%20recognition%20event%20professional%20achievement%20celebration%20modern%20elegant%20setting&width=400&height=250&seq=news006&orientation=landscape',
      author: 'Corporate Affairs',
      date: '2025-01-03',
      tags: ['Awards', 'Recognition', 'Innovation'],
      likes: 523,
      comments: 102,
      bookmarked: false,
      excerpt: 'We are honored to receive the Industry Excellence Award recognizing our groundbreaking work in electric commercial vehicle development and our commitment to sustainable transportation solutions.'
    },
    {
      id: 7,
      title: 'Digital Transformation Initiative Accelerates Operations',
      image: 'https://readdy.ai/api/search-image?query=digital%20transformation%20technology%20automation%20modern%20workplace%20with%20advanced%20computer%20systems%20cloud%20computing%20data%20analytics%20professional%20business%20environment&width=400&height=250&seq=news007&orientation=landscape',
      author: 'IT Department',
      date: '2025-01-01',
      tags: ['Technology', 'Digital', 'Operations'],
      likes: 198,
      comments: 41,
      bookmarked: false,
      excerpt: 'Our digital transformation program is revolutionizing business processes through AI-powered automation, cloud infrastructure, and advanced data analytics capabilities.'
    },
    {
      id: 8,
      title: 'Global Expansion Plans Unveiled for Asian Markets',
      image: 'https://readdy.ai/api/search-image?query=global%20business%20expansion%20international%20markets%20world%20map%20with%20connection%20lines%20modern%20corporate%20strategy%20planning%20professional%20setting&width=400&height=250&seq=news008&orientation=landscape',
      author: 'Strategy Division',
      date: '2024-12-28',
      tags: ['Expansion', 'Strategy', 'International'],
      likes: 367,
      comments: 78,
      bookmarked: false,
      excerpt: 'FUSO announces ambitious expansion plans targeting key Asian markets with new manufacturing facilities, distribution networks, and localized product offerings.'
    },
    {
      id: 9,
      title: 'Safety Innovation Receives International Recognition',
      image: 'https://readdy.ai/api/search-image?query=vehicle%20safety%20technology%20advanced%20driver%20assistance%20systems%20crash%20test%20facility%20automotive%20innovation%20professional%20engineering%20environment&width=400&height=250&seq=news009&orientation=landscape',
      author: 'Safety Engineering',
      date: '2024-12-25',
      tags: ['Safety', 'Innovation', 'Awards'],
      likes: 445,
      comments: 93,
      bookmarked: true,
      excerpt: 'Our latest safety innovations in collision avoidance and driver assistance systems have earned top ratings from international safety organizations.'
    }
  ];

  // Filter and sort logic
  const filteredAndSortedNews = useMemo(() => {
    let filtered = [...newsItems];

    // Filter by author
    if (selectedAuthor !== 'all') {
      filtered = filtered.filter(item => {
        const authorLower = item.author.toLowerCase();
        return authorLower.includes(selectedAuthor);
      });
    }

    // Filter by tag
    if (selectedTag !== 'all') {
      filtered = filtered.filter(item => 
        item.tags.some(tag => tag.toLowerCase().includes(selectedTag))
      );
    }

    // Filter by date
    const now = new Date();
    const itemDate = (dateStr: string) => new Date(dateStr);
    
    filtered = filtered.filter(item => {
      const date = itemDate(item.date);
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
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'popular':
          return b.likes - a.likes;
        case 'commented':
          return b.comments - a.comments;
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
          {filteredAndSortedNews.length === 0 ? (
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
              {filteredAndSortedNews.map((news, index) => (
                <Link
                  key={news.id}
                  to={`/news/${news.id}`}
                  className="bg-gradient-to-br from-dark-card to-gray-900/50 border border-dark-border rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-red-600/30 hover:border-red-600/70 transition-all duration-300 hover:-translate-y-2 group cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    <div className="absolute top-3 right-3 flex gap-2">
                      {news.tags.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-red-600 backdrop-blur-sm text-white text-xs font-semibold rounded-lg shadow-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {news.bookmarked && (
                      <div className="absolute top-3 left-3">
                        <i className="ri-bookmark-fill text-red-500 text-xl drop-shadow-lg"></i>
                      </div>
                    )}
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
                        <span className="line-clamp-1 font-medium">{news.author}</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <i className="ri-calendar-line text-red-500"></i>
                        <span className="font-medium">{news.date}</span>
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-5">
                      <button 
                        onClick={(e) => e.preventDefault()}
                        className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                      >
                        <i className="ri-heart-line text-base"></i>
                        <span className="text-sm font-semibold">{news.likes}</span>
                      </button>
                      <button 
                        onClick={(e) => e.preventDefault()}
                        className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                      >
                        <i className="ri-chat-3-line text-base"></i>
                        <span className="text-sm font-semibold">{news.comments}</span>
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
              ))}
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

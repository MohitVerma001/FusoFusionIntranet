import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import GlobalNav from '../../components/feature/GlobalNav';
import SecondaryNav from '../../components/feature/SecondaryNav';
import HeroSection from '../home/components/HeroSection';
import Footer from '../../components/feature/Footer';

export default function ActivityPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activities = [
    {
      id: 1,
      type: 'event',
      title: 'Annual Company Retreat 2025',
      description: 'Join us for three days of team building, strategic planning, and networking at our beautiful mountain resort location. This year\'s retreat will focus on innovation, collaboration, and celebrating our achievements together.',
      image: 'https://readdy.ai/api/search-image?query=corporate%20team%20building%20retreat%20mountain%20resort%20professional%20business%20event%20outdoor%20activities%20group%20collaboration%20modern%20elegant%20setting&width=600&height=350&seq=activity001&orientation=landscape',
      author: {
        name: 'Yuki Nakamura',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20asian%20female%20business%20executive%20portrait%20modern%20office%20setting%20confident%20smile%20corporate%20headshot&width=100&height=100&seq=avatar001&orientation=squarish',
        role: 'HR Manager'
      },
      date: '2024-02-15',
      location: 'Hakone Resort',
      attendees: 156,
      likes: 234,
      comments: 45,
      shares: 23,
      tags: ['Team Building', 'Corporate Event', 'Networking']
    },
    {
      id: 2,
      type: 'workshop',
      title: 'Leadership Development Workshop Series',
      description: 'Enhance your leadership skills through our comprehensive workshop series covering strategic thinking, team management, effective communication, and change leadership in today\'s dynamic business environment.',
      image: 'https://readdy.ai/api/search-image?query=professional%20leadership%20training%20workshop%20business%20seminar%20modern%20conference%20room%20presentation%20corporate%20learning%20environment&width=600&height=350&seq=activity002&orientation=landscape',
      author: {
        name: 'David Chen',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20asian%20male%20business%20executive%20portrait%20modern%20office%20setting%20confident%20corporate%20headshot&width=100&height=100&seq=avatar002&orientation=squarish',
        role: 'Training Director'
      },
      date: '2024-02-10',
      location: 'Training Center A',
      attendees: 45,
      likes: 189,
      comments: 32,
      shares: 18,
      tags: ['Leadership', 'Training', 'Professional Development']
    },
    {
      id: 3,
      type: 'social',
      title: 'FUSO Family Day Celebration',
      description: 'Bring your family for a day of fun activities, entertainment, food, and games. Celebrate the FUSO community spirit with colleagues and their loved ones in a relaxed, festive atmosphere.',
      image: 'https://readdy.ai/api/search-image?query=corporate%20family%20day%20celebration%20outdoor%20festival%20colorful%20activities%20children%20playing%20food%20stalls%20entertainment%20happy%20families%20professional%20event&width=600&height=350&seq=activity003&orientation=landscape',
      author: {
        name: 'Maria Santos',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20female%20business%20executive%20portrait%20modern%20office%20setting%20warm%20smile%20corporate%20headshot&width=100&height=100&seq=avatar003&orientation=squarish',
        role: 'Employee Relations'
      },
      date: '2024-02-08',
      location: 'FUSO Campus Grounds',
      attendees: 423,
      likes: 567,
      comments: 98,
      shares: 45,
      tags: ['Family', 'Social', 'Community']
    },
    {
      id: 4,
      type: 'training',
      title: 'Advanced Technical Skills Bootcamp',
      description: 'Intensive hands-on training covering the latest technologies, tools, and methodologies in automotive engineering, software development, and digital transformation initiatives.',
      image: 'https://readdy.ai/api/search-image?query=technical%20training%20bootcamp%20computer%20lab%20modern%20workspace%20engineers%20coding%20programming%20professional%20learning%20environment&width=600&height=350&seq=activity004&orientation=landscape',
      author: {
        name: 'Hiroshi Tanaka',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20asian%20male%20engineer%20portrait%20modern%20office%20setting%20technical%20expert%20corporate%20headshot&width=100&height=100&seq=avatar004&orientation=squarish',
        role: 'Technical Lead'
      },
      date: '2024-02-05',
      location: 'Innovation Lab',
      attendees: 67,
      likes: 312,
      comments: 54,
      shares: 29,
      tags: ['Technical', 'Training', 'Innovation']
    },
    {
      id: 5,
      type: 'volunteer',
      title: 'Community Outreach Program',
      description: 'Join our volunteer initiative to give back to the local community through environmental cleanup, educational support, and social welfare activities. Make a positive impact together.',
      image: 'https://readdy.ai/api/search-image?query=corporate%20volunteer%20community%20service%20group%20activity%20environmental%20cleanup%20teamwork%20social%20responsibility%20professional%20setting&width=600&height=350&seq=activity005&orientation=landscape',
      author: {
        name: 'Emily Rodriguez',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20female%20business%20executive%20portrait%20modern%20office%20setting%20friendly%20smile%20corporate%20headshot&width=100&height=100&seq=avatar005&orientation=squarish',
        role: 'CSR Coordinator'
      },
      date: '2024-02-01',
      location: 'Various Locations',
      attendees: 89,
      likes: 445,
      comments: 67,
      shares: 34,
      tags: ['Volunteer', 'CSR', 'Community']
    },
    {
      id: 6,
      type: 'sports',
      title: 'Inter-Department Sports Tournament',
      description: 'Compete in friendly sports competitions including basketball, volleyball, badminton, and table tennis. Build camaraderie and team spirit through healthy competition and athletic activities.',
      image: 'https://readdy.ai/api/search-image?query=corporate%20sports%20tournament%20indoor%20gymnasium%20basketball%20volleyball%20professional%20athletic%20competition%20team%20spirit%20modern%20facility&width=600&height=350&seq=activity006&orientation=landscape',
      author: {
        name: 'James Park',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20male%20business%20executive%20portrait%20modern%20office%20setting%20athletic%20corporate%20headshot&width=100&height=100&seq=avatar006&orientation=squarish',
        role: 'Wellness Coordinator'
      },
      date: '2024-01-28',
      location: 'FUSO Sports Complex',
      attendees: 234,
      likes: 389,
      comments: 76,
      shares: 41,
      tags: ['Sports', 'Wellness', 'Team Building']
    }
  ];

  // Filter activities based on category and search
  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      const matchesCategory = selectedCategory === 'all' || activity.type === selectedCategory.slice(0, -1);
      const matchesSearch = searchQuery === '' || 
        activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-dark-bg">
      <GlobalNav userRole="admin" />
      
      {/* Hero Section with Collapse */}
      <div className={`relative overflow-hidden transition-all duration-700 ease-in-out ${
        isScrolled ? 'h-[20px]' : 'h-[350px]'
      }`}>
        <div className={`absolute inset-0 transition-opacity duration-700 ${
          isScrolled ? 'opacity-0' : 'opacity-100'
        }`}>
          <HeroSection 
            title="MFTBC Activity"
            subtitle="Discover and participate in company activities, events, and team building initiatives"
            showSearch={true}
          />
        </div>
      </div>
      
      {/* Secondary Navigation */}
      <SecondaryNav userRole="admin" />
      
      {/* Main Content */}
      <div className="pt-6">
        <div className="max-w-7xl mx-auto px-6 pb-12">
          {/* Page Header */}
          <div className="mb-6 animate-slide-up">
            <h1 className="text-4xl font-bold text-white mb-2">Activities & Events</h1>
            <p className="text-lg text-gray-400">Discover and join exciting activities happening at FUSO</p>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2 animate-slide-up">
            {['all', 'events', 'workshops', 'training', 'social', 'volunteer', 'sports'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30'
                    : 'bg-dark-card border border-dark-border text-gray-400 hover:bg-dark-hover hover:text-white hover:border-red-600/50'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredActivities.map((activity, index) => (
              <Link
                key={activity.id}
                to={`/activity/${activity.id}`}
                className="bg-dark-card border border-dark-border rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-red-600/20 hover:border-red-600/50 transition-all duration-300 hover:-translate-y-2 group cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    {activity.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-red-600 backdrop-blur-sm text-white text-xs font-semibold rounded-lg shadow-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3 text-white">
                      <img
                        src={activity.author.avatar}
                        alt={activity.author.name}
                        className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      />
                      <div>
                        <p className="font-semibold text-sm">{activity.author.name}</p>
                        <p className="text-xs text-white/90">{activity.author.role}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-red-500 transition-colors duration-200 leading-tight">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-gray-300 mb-4 line-clamp-2 leading-relaxed">
                    {activity.description}
                  </p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <i className="ri-calendar-line text-red-500"></i>
                      <span>{activity.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <i className="ri-map-pin-line text-red-500"></i>
                      <span className="line-clamp-1">{activity.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4 pb-4 border-b border-dark-border text-sm text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <i className="ri-user-line text-red-500"></i>
                      <span>{activity.attendees} attending</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={(e) => e.preventDefault()}
                        className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                      >
                        <i className="ri-heart-line"></i>
                        <span className="text-sm font-medium">{activity.likes}</span>
                      </button>
                      <button 
                        onClick={(e) => e.preventDefault()}
                        className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                      >
                        <i className="ri-chat-3-line"></i>
                        <span className="text-sm font-medium">{activity.comments}</span>
                      </button>
                      <button 
                        onClick={(e) => e.preventDefault()}
                        className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                      >
                        <i className="ri-share-line"></i>
                        <span className="text-sm font-medium">{activity.shares}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredActivities.length === 0 && (
            <div className="text-center py-16 animate-slide-up">
              <div className="w-20 h-20 bg-dark-card border border-dark-border rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-calendar-event-line text-4xl text-gray-600"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No activities found</h3>
              <p className="text-gray-400">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

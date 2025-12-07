import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GlobalNav from '../../components/feature/GlobalNav';
import SecondaryNav from '../../components/feature/SecondaryNav';
import HeroSection from '../home/components/HeroSection';
import Footer from '../../components/feature/Footer';

export default function CrossfunctionPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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

  const crossfunctions = [
    {
      id: 1,
      title: 'Digital Transformation Initiative',
      department: 'Engineering',
      organization: 'FUSO Corporation',
      location: 'Tokyo HQ, Building 3, Floor 5',
      contactPerson: 'Sarah Johnson',
      email: 'sarah.johnson@fuso.com',
      phone: '+81 3-1234-5678',
      description: 'Leading the company-wide digital transformation with focus on AI integration, cloud migration, and process automation across all departments.',
      priority: 'high',
      status: 'active',
      tags: ['Innovation', 'Digital', 'AI', 'Cloud'],
      members: 24,
      views: 1523,
      likes: 234,
      comments: 45,
      createdBy: 'Michael Chen',
      createdDate: '2024-01-15',
      image: 'https://readdy.ai/api/search-image?query=modern%20digital%20transformation%20technology%20innovation%20artificial%20intelligence%20cloud%20computing%20professional%20team%20collaboration%20dark%20background%20wide%20angle&width=800&height=400&seq=cross001&orientation=landscape'
    },
    {
      id: 2,
      title: 'Product Launch Team Q1 2025',
      department: 'Product',
      organization: 'FUSO Corporation',
      location: 'Osaka Office, Floor 8',
      contactPerson: 'Takeshi Yamamoto',
      email: 'takeshi.yamamoto@fuso.com',
      phone: '+81 6-5678-1234',
      description: 'Cross-functional team coordinating the launch of our new electric vehicle line with marketing, sales, engineering, and customer support.',
      priority: 'high',
      status: 'active',
      tags: ['Product Launch', 'EV', 'Marketing', 'Sales'],
      members: 18,
      views: 987,
      likes: 156,
      comments: 32,
      createdBy: 'Emily Watson',
      createdDate: '2024-01-10',
      image: 'https://readdy.ai/api/search-image?query=electric%20vehicle%20product%20launch%20modern%20automotive%20innovation%20team%20collaboration%20professional%20setting%20dark%20background%20wide%20angle&width=800&height=400&seq=cross002&orientation=landscape'
    },
    {
      id: 3,
      title: 'Sustainability & Green Energy Program',
      department: 'Operations',
      organization: 'FUSO Corporation',
      location: 'Nagoya Plant, Main Building',
      contactPerson: 'Dr. Yuki Tanaka',
      email: 'yuki.tanaka@fuso.com',
      phone: '+81 52-9876-5432',
      description: 'Implementing sustainable practices and renewable energy solutions across all manufacturing facilities to achieve carbon neutrality by 2027.',
      priority: 'high',
      status: 'active',
      tags: ['Sustainability', 'Green Energy', 'Environment'],
      members: 32,
      views: 2145,
      likes: 389,
      comments: 67,
      createdBy: 'Robert Kim',
      createdDate: '2024-01-08',
      image: 'https://readdy.ai/api/search-image?query=sustainable%20green%20energy%20renewable%20power%20solar%20panels%20wind%20turbines%20eco%20friendly%20manufacturing%20facility%20dark%20background%20wide%20angle&width=800&height=400&seq=cross003&orientation=landscape'
    },
    {
      id: 4,
      title: 'Customer Experience Enhancement',
      department: 'Marketing',
      organization: 'FUSO Corporation',
      location: 'Tokyo HQ, Floor 12',
      contactPerson: 'Lisa Anderson',
      email: 'lisa.anderson@fuso.com',
      phone: '+81 3-2345-6789',
      description: 'Redesigning customer journey and touchpoints to deliver exceptional experiences through digital channels and personalized service.',
      priority: 'medium',
      status: 'active',
      tags: ['Customer Experience', 'UX', 'Digital'],
      members: 15,
      views: 756,
      likes: 123,
      comments: 28,
      createdBy: 'David Park',
      createdDate: '2024-01-05',
      image: 'https://readdy.ai/api/search-image?query=customer%20experience%20digital%20interface%20user%20journey%20personalization%20modern%20technology%20professional%20setting%20dark%20background%20wide%20angle&width=800&height=400&seq=cross004&orientation=landscape'
    },
    {
      id: 5,
      title: 'Supply Chain Optimization',
      department: 'Operations',
      organization: 'FUSO Corporation',
      location: 'Yokohama Logistics Center',
      contactPerson: 'James Wilson',
      email: 'james.wilson@fuso.com',
      phone: '+81 45-3456-7890',
      description: 'Streamlining supply chain processes with AI-powered forecasting, inventory optimization, and logistics automation.',
      priority: 'medium',
      status: 'planning',
      tags: ['Supply Chain', 'Logistics', 'AI', 'Optimization'],
      members: 21,
      views: 634,
      likes: 98,
      comments: 19,
      createdBy: 'Anna Martinez',
      createdDate: '2024-01-03',
      image: 'https://readdy.ai/api/search-image?query=supply%20chain%20logistics%20warehouse%20automation%20artificial%20intelligence%20inventory%20management%20professional%20setting%20dark%20background%20wide%20angle&width=800&height=400&seq=cross005&orientation=landscape'
    },
    {
      id: 6,
      title: 'Employee Wellness Initiative',
      department: 'Human Resources',
      organization: 'FUSO Corporation',
      location: 'All Locations',
      contactPerson: 'Dr. Kenji Sato',
      email: 'kenji.sato@fuso.com',
      phone: '+81 3-4567-8901',
      description: 'Comprehensive wellness program focusing on mental health, physical fitness, work-life balance, and professional development.',
      priority: 'medium',
      status: 'active',
      tags: ['Wellness', 'HR', 'Health', 'Development'],
      members: 12,
      views: 892,
      likes: 167,
      comments: 34,
      createdBy: 'Sophie Chen',
      createdDate: '2023-12-28',
      image: 'https://readdy.ai/api/search-image?query=employee%20wellness%20mental%20health%20fitness%20work%20life%20balance%20professional%20development%20modern%20office%20dark%20background%20wide%20angle&width=800&height=400&seq=cross006&orientation=landscape'
    }
  ];

  const departments = ['all', 'Engineering', 'Product', 'Operations', 'Marketing', 'Human Resources', 'Finance', 'IT'];
  const priorities = ['all', 'high', 'medium', 'low'];
  const statuses = ['all', 'active', 'planning'];

  const filteredCrossfunctions = crossfunctions.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDepartment = selectedDepartment === 'all' || item.department === selectedDepartment;
    const matchesPriority = selectedPriority === 'all' || item.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesPriority && matchesStatus;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-600/10 border-red-600/30';
      case 'medium': return 'text-yellow-500 bg-yellow-600/10 border-yellow-600/30';
      case 'low': return 'text-green-500 bg-green-600/10 border-green-600/30';
      default: return 'text-gray-500 bg-gray-600/10 border-gray-600/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500 bg-green-600/10 border-green-600/30';
      case 'planning': return 'text-yellow-500 bg-yellow-600/10 border-yellow-600/30';
      default: return 'text-gray-500 bg-gray-600/10 border-gray-600/30';
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <GlobalNav userRole="admin" />
      
      {/* Hero Section with Collapse */}
      <div className={`relative overflow-hidden transition-all duration-700 ease-in-out ${
        isScrolled ? 'h-[20px]' : 'h-[350px]'
      }`}>
        <div className={`absolute inset-0 transition-opacity duration-700 ${
          isScrolled ? 'opacity-0' : 'opacity-100'
        }`}>
          <HeroSection 
            title="MFTBC Crossfunction"
            subtitle="Collaborate across departments and teams to drive innovation and excellence"
            showSearch={true}
          />
        </div>
      </div>
      
      {/* Secondary Navigation */}
      <SecondaryNav userRole="admin" />
      
      {/* Main Content */}
      <div className="pt-6 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Search & Filters */}
          <div className="bg-dark-card border border-dark-border rounded-lg p-6 mb-8 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search teams, tags, or descriptions..."
                    className="w-full pl-11 pr-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-200 text-sm"
                  />
                </div>
              </div>

              {/* Department Filter */}
              <div>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-200 cursor-pointer text-sm"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept === 'all' ? 'All Departments' : dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority Filter */}
              <div>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-200 cursor-pointer text-sm"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>
                      {priority === 'all' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-200 cursor-pointer text-sm"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-dark-border">
              <div className="text-sm text-gray-400">
                Showing <span className="text-white font-semibold">{filteredCrossfunctions.length}</span> of <span className="text-white font-semibold">{crossfunctions.length}</span> teams
              </div>
              <div className="flex items-center gap-2 bg-dark-bg border border-dark-border rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <i className="ri-grid-line mr-1.5"></i>
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <i className="ri-list-check mr-1.5"></i>
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Teams Grid/List */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredCrossfunctions.map((team, index) => (
              <Link
                key={team.id}
                to={`/crossfunction/${team.id}`}
                className="bg-dark-card border border-dark-border rounded-lg overflow-hidden hover:shadow-xl hover:shadow-purple-600/20 hover:border-purple-600/50 transition-all duration-300 hover:-translate-y-1 group cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={team.image}
                    alt={team.title}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Priority & Status Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className={`px-2.5 py-1 border rounded-md text-xs font-semibold uppercase ${getPriorityColor(team.priority)}`}>
                      {team.priority}
                    </span>
                    <span className={`px-2.5 py-1 border rounded-md text-xs font-semibold uppercase ${getStatusColor(team.status)}`}>
                      {team.status}
                    </span>
                  </div>

                  {/* Members Count */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <i className="ri-team-line text-white text-sm"></i>
                    <span className="text-white text-xs font-semibold">{team.members} members</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-500 transition-colors duration-200">
                    {team.title}
                  </h3>

                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {team.description}
                  </p>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4 pb-4 border-b border-dark-border">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <i className="ri-building-line text-purple-600"></i>
                      <span className="text-white">{team.organization}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <i className="ri-map-pin-line text-red-600"></i>
                      <span className="text-white">{team.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <i className="ri-user-line text-purple-600"></i>
                      <span className="text-white">{team.contactPerson}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <i className="ri-mail-line text-red-600"></i>
                      <span className="text-white">{team.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <i className="ri-phone-line text-purple-600"></i>
                      <span className="text-white">{team.phone}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {team.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-dark-bg border border-dark-border text-gray-300 text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                    {team.tags.length > 3 && (
                      <span className="px-2 py-1 bg-dark-bg border border-dark-border text-gray-400 text-xs rounded-md">
                        +{team.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <i className="ri-eye-line"></i>
                        {team.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="ri-heart-line"></i>
                        {team.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="ri-chat-3-line"></i>
                        {team.comments}
                      </span>
                    </div>
                    <span className="text-gray-500">{team.createdDate}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredCrossfunctions.length === 0 && (
            <div className="text-center py-16 animate-slide-up">
              <div className="w-20 h-20 bg-dark-card border border-dark-border rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-group-line text-4xl text-gray-600"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No teams found</h3>
              <p className="text-gray-400">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import GlobalNav from '../../../components/feature/GlobalNav';
import Footer from '../../../components/feature/Footer';

export default function CrossfunctionDetailPage() {
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [markedStatus, setMarkedStatus] = useState<'none' | 'action' | 'success'>('none');
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'feeds'>('overview');

  const teamDetail = {
    id: 1,
    title: 'Digital Transformation Initiative',
    department: 'Engineering',
    organization: 'FUSO Corporation',
    location: 'Tokyo HQ, Building 3, Floor 5',
    contactPerson: 'Sarah Johnson',
    email: 'sarah.johnson@fuso.com',
    phone: '+81 3-1234-5678',
    description: 'Leading the company-wide digital transformation with focus on AI integration, cloud migration, and process automation across all departments. This initiative aims to modernize our technology stack, improve operational efficiency, and enhance customer experiences through digital innovation.',
    objectives: [
      'Implement AI-powered automation across 80% of manual processes by Q4 2025',
      'Migrate all legacy systems to cloud infrastructure within 18 months',
      'Achieve 40% improvement in operational efficiency metrics',
      'Reduce IT infrastructure costs by 30% through cloud optimization',
      'Train 500+ employees on new digital tools and platforms'
    ],
    priority: 'high',
    status: 'active',
    tags: ['Innovation', 'Digital', 'AI', 'Cloud', 'Automation', 'Transformation'],
    members: 24,
    views: 1523,
    likes: 234,
    comments: 45,
    shares: 67,
    createdBy: {
      name: 'Michael Chen',
      avatar: 'MC',
      role: 'Chief Technology Officer',
      date: '2024-01-15'
    },
    modifiedBy: {
      name: 'Sarah Johnson',
      avatar: 'SJ',
      role: 'Project Lead',
      date: '2024-01-20'
    },
    image: 'https://readdy.ai/api/search-image?query=modern%20digital%20transformation%20technology%20innovation%20artificial%20intelligence%20cloud%20computing%20professional%20team%20collaboration%20futuristic%20interface%20dark%20background%20wide%20angle%20high%20quality&width=1200&height=600&seq=crossdetail001&orientation=landscape',
    timeline: [
      { phase: 'Phase 1', period: 'Q1 2024', status: 'completed', description: 'Infrastructure assessment and planning' },
      { phase: 'Phase 2', period: 'Q2-Q3 2024', status: 'in-progress', description: 'Cloud migration and AI implementation' },
      { phase: 'Phase 3', period: 'Q4 2024-Q1 2025', status: 'upcoming', description: 'Process automation and optimization' },
      { phase: 'Phase 4', period: 'Q2-Q4 2025', status: 'upcoming', description: 'Full deployment and training' }
    ]
  };

  const teamMembers = [
    { name: 'Sarah Johnson', role: 'Project Lead', avatar: 'SJ', department: 'Engineering' },
    { name: 'Michael Chen', role: 'Tech Advisor', avatar: 'MC', department: 'IT' },
    { name: 'Emily Watson', role: 'Product Manager', avatar: 'EW', department: 'Product' },
    { name: 'David Park', role: 'UX Designer', avatar: 'DP', department: 'Design' },
    { name: 'Lisa Anderson', role: 'Marketing Lead', avatar: 'LA', department: 'Marketing' },
    { name: 'Robert Kim', role: 'Data Analyst', avatar: 'RK', department: 'Analytics' }
  ];

  const feeds = [
    {
      id: 1,
      author: 'Sarah Johnson',
      avatar: 'SJ',
      role: 'Project Lead',
      date: '2024-01-20',
      time: '14:30',
      type: 'update',
      content: 'Great progress this week! We\'ve successfully migrated 3 major systems to the cloud and the AI automation pilot is showing 35% efficiency gains. Team is doing amazing work! 🚀',
      likes: 45,
      comments: 12
    },
    {
      id: 2,
      author: 'Michael Chen',
      avatar: 'MC',
      role: 'Tech Advisor',
      date: '2024-01-19',
      time: '10:15',
      type: 'milestone',
      content: 'Milestone achieved: Cloud infrastructure setup completed ahead of schedule. All security protocols are in place and tested. Ready for Phase 2 migration.',
      likes: 67,
      comments: 18
    },
    {
      id: 3,
      author: 'Emily Watson',
      avatar: 'EW',
      role: 'Product Manager',
      date: '2024-01-18',
      time: '16:45',
      type: 'discussion',
      content: 'Team meeting tomorrow at 10 AM to discuss the AI integration roadmap. Please review the documentation I shared and come prepared with questions.',
      likes: 23,
      comments: 8
    },
    {
      id: 4,
      author: 'David Park',
      avatar: 'DP',
      role: 'UX Designer',
      date: '2024-01-17',
      time: '11:20',
      type: 'update',
      content: 'New dashboard designs are ready for review. The interface is much more intuitive and aligns with our digital transformation goals. Check it out!',
      likes: 34,
      comments: 15
    }
  ];

  const comments_list = [
    {
      id: 1,
      author: 'Robert Kim',
      avatar: 'RK',
      role: 'Data Analyst',
      date: '2024-01-20',
      content: 'This initiative is exactly what we need! The AI automation potential is huge. Happy to contribute from the analytics side.',
      likes: 23
    },
    {
      id: 2,
      author: 'Lisa Anderson',
      avatar: 'LA',
      role: 'Marketing Lead',
      date: '2024-01-19',
      content: 'Excited to see how this will transform our customer engagement capabilities. The cloud migration will enable so many new possibilities!',
      likes: 18
    }
  ];

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

  const getFeedIcon = (type: string) => {
    switch (type) {
      case 'update': return 'ri-information-line text-blue-500';
      case 'milestone': return 'ri-flag-line text-green-500';
      case 'discussion': return 'ri-chat-3-line text-purple-500';
      default: return 'ri-notification-line text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <GlobalNav userRole="admin" />
      
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 animate-slide-up">
            <Link to="/" className="hover:text-red-500 transition-colors duration-200">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link to="/crossfunction" className="hover:text-red-500 transition-colors duration-200">Cross-Functional Teams</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-white">Team Details</span>
          </div>

          {/* Header */}
          <div className="mb-8 animate-slide-up">
            <div className="flex items-center gap-3 mb-4">
              {[teamDetail.priority, teamDetail.status].map((badge, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 border rounded-md text-xs font-semibold uppercase ${
                    index === 0 ? getPriorityColor(badge) : getStatusColor(badge)
                  }`}
                >
                  {badge}
                </span>
              ))}
            </div>
            
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              {teamDetail.title}
            </h1>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-semibold">
                    {teamDetail.createdBy.avatar}
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Created by</div>
                    <div className="text-white font-semibold">{teamDetail.createdBy.name}</div>
                    <div className="text-xs text-gray-400">{teamDetail.createdBy.role}</div>
                  </div>
                </div>

                <div className="w-px h-12 bg-dark-border"></div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-semibold">
                    {teamDetail.modifiedBy.avatar}
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Modified by</div>
                    <div className="text-white font-semibold">{teamDetail.modifiedBy.name}</div>
                    <div className="text-xs text-gray-400">{teamDetail.modifiedBy.role}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <i className="ri-calendar-line"></i>
                  <span className="text-white">{teamDetail.createdBy.date}</span>
                </span>
                <span className="flex items-center gap-2">
                  <i className="ri-eye-line"></i>
                  <span className="text-white">{teamDetail.views} views</span>
                </span>
                <span className="flex items-center gap-2">
                  <i className="ri-team-line"></i>
                  <span className="text-white">{teamDetail.members} members</span>
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mb-8 animate-slide-up flex-wrap">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 whitespace-nowrap cursor-pointer ${
                liked
                  ? 'bg-red-600/20 border-red-600 text-red-500'
                  : 'bg-dark-card border-dark-border text-gray-400 hover:border-red-600/50 hover:text-red-500'
              }`}
            >
              <i className={liked ? 'ri-heart-fill' : 'ri-heart-line'}></i>
              <span className="text-sm font-medium">{teamDetail.likes + (liked ? 1 : 0)}</span>
            </button>

            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 whitespace-nowrap cursor-pointer ${
                bookmarked
                  ? 'bg-red-600/20 border-red-600 text-red-500'
                  : 'bg-dark-card border-dark-border text-gray-400 hover:border-red-600/50 hover:text-red-500'
              }`}
            >
              <i className={bookmarked ? 'ri-bookmark-fill' : 'ri-bookmark-line'}></i>
              <span className="text-sm font-medium">Bookmark</span>
            </button>

            <button
              onClick={() => setFollowing(!following)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${
                following
                  ? 'bg-dark-card border border-dark-border text-gray-400 hover:border-red-600/50'
                  : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-600/30'
              }`}
            >
              <i className={following ? 'ri-user-unfollow-line' : 'ri-user-follow-line'}></i>
              <span className="text-sm font-medium">{following ? 'Following' : 'Follow'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMarkedStatus('action')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  markedStatus === 'action'
                    ? 'bg-yellow-600/20 border-yellow-600 text-yellow-500'
                    : 'bg-dark-card border-dark-border text-gray-400 hover:border-yellow-600/50 hover:text-yellow-500'
                }`}
              >
                <i className="ri-flag-line"></i>
                <span className="text-sm font-medium">Mark for Action</span>
              </button>

              <button
                onClick={() => setMarkedStatus('success')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  markedStatus === 'success'
                    ? 'bg-green-600/20 border-green-600 text-green-500'
                    : 'bg-dark-card border-dark-border text-gray-400 hover:border-green-600/50 hover:text-green-500'
                }`}
              >
                <i className="ri-checkbox-circle-line"></i>
                <span className="text-sm font-medium">Mark Success</span>
              </button>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-dark-card border border-dark-border text-gray-400 rounded-lg hover:border-red-600/50 hover:text-red-500 transition-all duration-200 whitespace-nowrap cursor-pointer">
              <i className="ri-file-pdf-line"></i>
              <span className="text-sm font-medium">View PDF</span>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 bg-dark-card border border-dark-border text-gray-400 rounded-lg hover:border-red-600/50 hover:text-red-500 transition-all duration-200 whitespace-nowrap cursor-pointer">
              <i className="ri-share-line"></i>
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>

          {/* Featured Image */}
          <div className="relative h-96 rounded-lg overflow-hidden mb-10 animate-scale-in">
            <img
              src={teamDetail.image}
              alt={teamDetail.title}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 bg-dark-card border border-dark-border rounded-lg p-1 mb-8 animate-slide-up">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <i className="ri-file-list-3-line mr-2"></i>
              Overview
            </button>
            <button
              onClick={() => setActiveTab('feeds')}
              className={`flex-1 px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeTab === 'feeds'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <i className="ri-rss-line mr-2"></i>
              Activity Feeds
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Organization Details */}
              <div className="bg-dark-card border border-dark-border rounded-lg p-8 animate-slide-up">
                <h3 className="text-2xl font-bold text-white mb-6">Organization Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-purple-600/10 rounded-lg flex-shrink-0">
                      <i className="ri-building-line text-purple-600"></i>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Organization</div>
                      <div className="text-white font-semibold">{teamDetail.organization}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-red-600/10 rounded-lg flex-shrink-0">
                      <i className="ri-map-pin-line text-red-600"></i>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Location</div>
                      <div className="text-white font-semibold">{teamDetail.location}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-purple-600/10 rounded-lg flex-shrink-0">
                      <i className="ri-user-line text-purple-600"></i>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Contact Person</div>
                      <div className="text-white font-semibold">{teamDetail.contactPerson}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-red-600/10 rounded-lg flex-shrink-0">
                      <i className="ri-mail-line text-red-600"></i>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Email</div>
                      <div className="text-white font-semibold">{teamDetail.email}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-purple-600/10 rounded-lg flex-shrink-0">
                      <i className="ri-phone-line text-purple-600"></i>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Phone</div>
                      <div className="text-white font-semibold">{teamDetail.phone}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-red-600/10 rounded-lg flex-shrink-0">
                      <i className="ri-briefcase-line text-red-600"></i>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Department</div>
                      <div className="text-white font-semibold">{teamDetail.department}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-dark-hover rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-500 mb-4">Team Description</h3>
                <p className="text-white leading-relaxed mb-6">
                  {teamDetail.description}
                </p>

                <h3 className="text-xl font-bold text-red-500 mb-4">Key Objectives</h3>
                <ul className="space-y-3 mb-6">
                  {teamDetail.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3 text-white">
                      <i className="ri-checkbox-circle-fill text-green-500 text-xl flex-shrink-0 mt-0.5"></i>
                      <span className="leading-relaxed">{objective}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-bold text-red-500 mb-4">Project Timeline</h3>
                <div className="space-y-3">
                  {teamDetail.timeline.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 bg-dark-card rounded-lg p-4">
                      <div className="w-10 h-10 flex items-center justify-center bg-purple-600/20 rounded-lg flex-shrink-0">
                        <i className="ri-calendar-check-line text-purple-500 text-lg"></i>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-semibold">{item.phase}</div>
                        <div className="text-sm text-gray-400">{item.date}</div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'Completed' ? 'bg-green-600/20 text-green-500' :
                        item.status === 'In Progress' ? 'bg-blue-600/20 text-blue-500' :
                        'bg-gray-600/20 text-gray-400'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Members */}
              <div className="bg-dark-card border border-dark-border rounded-lg p-8 animate-slide-up">
                <h3 className="text-2xl font-bold text-white mb-6">Team Members ({teamMembers.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-dark-hover border border-dark-border rounded-lg hover:border-purple-600/50 transition-all duration-200">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                        {member.avatar}
                      </div>
                      <div>
                        <div className="text-white font-semibold">{member.name}</div>
                        <div className="text-xs text-gray-400">{member.role}</div>
                        <div className="text-xs text-gray-500">{member.department}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-dark-card border border-dark-border rounded-lg p-8 animate-slide-up">
                <h3 className="text-2xl font-bold text-white mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {teamDetail.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-dark-bg border border-dark-border text-gray-300 rounded-lg hover:border-red-600/50 hover:text-red-500 transition-all duration-200 cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Comments */}
              <div className="bg-dark-card border border-dark-border rounded-lg p-8 animate-slide-up">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Comments ({teamDetail.comments})</h3>
                  <button
                    onClick={() => setShowComments(!showComments)}
                    className="text-sm text-red-500 hover:text-red-400 transition-colors duration-200 cursor-pointer"
                  >
                    {showComments ? 'Hide Comments' : 'Show Comments'}
                  </button>
                </div>

                <div className="mb-6">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full px-4 py-3 bg-dark-hover border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-200 resize-none"
                    rows={3}
                    maxLength={500}
                  />
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-gray-500">{comment.length}/500</span>
                    <button className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-red-600/30 transition-all duration-200 whitespace-nowrap cursor-pointer">
                      Post Comment
                    </button>
                  </div>
                </div>

                {showComments && (
                  <div className="space-y-4">
                    {comments_list.map((comment) => (
                      <div key={comment.id} className="bg-dark-hover border border-dark-border rounded-lg p-5">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                            {comment.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <div className="text-white font-semibold">{comment.author}</div>
                                <div className="text-xs text-gray-500">{comment.role} • {comment.date}</div>
                              </div>
                              <button className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer">
                                <i className="ri-heart-line"></i>
                                <span className="text-sm">{comment.likes}</span>
                              </button>
                            </div>
                            <p className="text-gray-300 leading-relaxed">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Feeds Tab */}
          {activeTab === 'feeds' && (
            <div className="space-y-4 animate-slide-up">
              {feeds.map((feed) => (
                <div key={feed.id} className="bg-dark-card border border-dark-border rounded-lg p-6 hover:border-purple-600/50 transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {feed.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="text-white font-semibold">{feed.author}</div>
                          <div className="text-xs text-gray-500">{feed.role} • {feed.date} at {feed.time}</div>
                        </div>
                        <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                          feed.type === 'update' ? 'bg-blue-600/10' :
                          feed.type === 'milestone' ? 'bg-green-600/10' :
                          'bg-purple-600/10'
                        }`}>
                          <i className={getFeedIcon(feed.type)}></i>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed mb-4">{feed.content}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-400">
                        <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors duration-200 cursor-pointer">
                          <i className="ri-heart-line"></i>
                          <span>{feed.likes}</span>
                        </button>
                        <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors duration-200 cursor-pointer">
                          <i className="ri-chat-3-line"></i>
                          <span>{feed.comments}</span>
                        </button>
                        <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors duration-200 cursor-pointer">
                          <i className="ri-share-line"></i>
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

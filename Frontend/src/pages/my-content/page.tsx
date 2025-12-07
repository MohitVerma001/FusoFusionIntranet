import { useState, useMemo, useEffect } from 'react';
import GlobalNav from '../../components/feature/GlobalNav';
import SecondaryNav from '../../components/feature/SecondaryNav';
import Footer from '../../components/feature/Footer';
import EditContentModal from './components/EditContentModal';

interface ContentItem {
  id: string;
  type: 'blog' | 'document' | 'crossfunction' | 'activity' | 'announcement' | 'job';
  title: string;
  description: string;
  category?: string;
  status: 'published' | 'draft';
  publishedDate: string;
  views: number;
  likes: number;
}

export default function MyContentPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'blog' | 'document' | 'crossfunction' | 'activity' | 'announcement' | 'job'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  // Mock data - replace with actual data from your backend
  const [contents, setContents] = useState<ContentItem[]>([
    {
      id: '1',
      type: 'blog',
      title: 'Understanding Project Hyperion Changes',
      description: 'A comprehensive guide to the new HR system changes coming with Project Hyperion.',
      category: 'HR Development',
      status: 'published',
      publishedDate: '2025-01-15',
      views: 234,
      likes: 45
    },
    {
      id: '2',
      type: 'document',
      title: 'Employee Onboarding Checklist 2025',
      description: 'Complete checklist for new employee onboarding process.',
      category: 'Onboarding',
      status: 'published',
      publishedDate: '2025-01-10',
      views: 156,
      likes: 28
    },
    {
      id: '3',
      type: 'crossfunction',
      title: 'Cross-Department Collaboration Initiative',
      description: 'New initiative to improve collaboration between departments.',
      status: 'draft',
      publishedDate: '2025-01-08',
      views: 89,
      likes: 12
    },
    {
      id: '4',
      type: 'activity',
      title: 'Team Building Workshop - Q1 2025',
      description: 'Quarterly team building activities and workshops.',
      status: 'published',
      publishedDate: '2025-01-05',
      views: 312,
      likes: 67
    },
    {
      id: '5',
      type: 'announcement',
      title: 'New Benefits Package Announcement',
      description: 'Important updates to employee benefits starting February 2025.',
      category: 'Compensation',
      status: 'published',
      publishedDate: '2025-01-03',
      views: 445,
      likes: 89
    },
    {
      id: '6',
      type: 'job',
      title: 'Senior Software Engineer - Tokyo',
      description: 'We are looking for an experienced software engineer to join our team.',
      status: 'published',
      publishedDate: '2024-12-28',
      views: 523,
      likes: 34
    }
  ]);

  // Filter contents based on tab and search
  const filteredContents = useMemo(() => {
    return contents.filter(content => {
      const matchesTab = activeTab === 'all' || content.type === activeTab;
      const matchesSearch = searchQuery === '' ||
        content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (content.category && content.category.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery, contents]);

  const handleEdit = (content: ContentItem) => {
    setSelectedContent(content);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      setContents(contents.filter(c => c.id !== id));
    }
  };

  const handleSaveEdit = (updatedContent: ContentItem) => {
    setContents(contents.map(c => c.id === updatedContent.id ? updatedContent : c));
    setIsEditModalOpen(false);
    setSelectedContent(null);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blog': return 'ri-article-line';
      case 'document': return 'ri-file-text-line';
      case 'crossfunction': return 'ri-team-line';
      case 'activity': return 'ri-calendar-event-line';
      case 'announcement': return 'ri-megaphone-line';
      case 'job': return 'ri-briefcase-line';
      default: return 'ri-file-line';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'blog': return 'bg-blue-500';
      case 'document': return 'bg-green-500';
      case 'crossfunction': return 'bg-purple-500';
      case 'activity': return 'bg-orange-500';
      case 'announcement': return 'bg-red-500';
      case 'job': return 'bg-teal-500';
      default: return 'bg-gray-500';
    }
  };

  const stats = {
    total: contents.length,
    published: contents.filter(c => c.status === 'published').length,
    draft: contents.filter(c => c.status === 'draft').length,
    totalViews: contents.reduce((sum, c) => sum + c.views, 0),
    totalLikes: contents.reduce((sum, c) => sum + c.likes, 0)
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <GlobalNav />
      
      {/* Hero Section with Collapse */}
      <div className={`relative overflow-hidden transition-all duration-700 ease-in-out ${
        isScrolled ? 'h-[20px]' : 'h-[350px]'
      }`}>
        <div className={`absolute inset-0 transition-opacity duration-700 ${
          isScrolled ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="bg-gradient-to-r from-red-600 to-black text-white py-12">
            <div className="max-w-7xl mx-auto px-6">
              <h1 className="text-4xl font-bold mb-2">My Content</h1>
              <p className="text-lg text-red-100">Manage and edit all your published content</p>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Navigation */}
      <SecondaryNav userRole="admin" />
      
      <main className="flex-1 pt-6">
        {/* Stats Cards */}
        <div className={`max-w-7xl mx-auto px-6 mb-8 transition-all duration-700 ${
          isScrolled ? 'mt-4' : '-mt-8'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-red-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Content</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-file-list-3-line text-2xl text-red-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Published</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.published}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-checkbox-circle-line text-2xl text-green-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-orange-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Drafts</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.draft}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="ri-draft-line text-2xl text-orange-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Views</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalViews}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-eye-line text-2xl text-blue-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-purple-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Likes</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalLikes}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="ri-heart-line text-2xl text-purple-600"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Tabs */}
              <div className="flex flex-wrap gap-2">
                {['all', 'blog', 'document', 'crossfunction', 'activity', 'announcement', 'job'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
                      activeTab === tab
                        ? 'bg-red-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full md:w-80">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                <input
                  type="text"
                  placeholder="Search content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content List */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          {filteredContents.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <i className="ri-inbox-line text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No content found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredContents.map((content) => (
                <div
                  key={content.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      {/* Content Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 ${getTypeColor(content.type)} rounded-lg flex items-center justify-center`}>
                            <i className={`${getTypeIcon(content.type)} text-xl text-white`}></i>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{content.title}</h3>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-gray-500">
                                {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                              </span>
                              {content.category && (
                                <>
                                  <span className="text-gray-300">•</span>
                                  <span className="text-xs text-gray-500">{content.category}</span>
                                </>
                              )}
                              <span className="text-gray-300">•</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                content.status === 'published'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-orange-100 text-orange-700'
                              }`}>
                                {content.status.charAt(0).toUpperCase() + content.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{content.description}</p>
                        
                        {/* Stats */}
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <i className="ri-calendar-line"></i>
                            <span>{new Date(content.publishedDate).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <i className="ri-eye-line"></i>
                            <span>{content.views} views</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <i className="ri-heart-line"></i>
                            <span>{content.likes} likes</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleEdit(content)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                        >
                          <i className="ri-edit-line"></i>
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => window.REACT_APP_NAVIGATE(`/${content.type}/${content.id}`)}
                          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                        >
                          <i className="ri-eye-line"></i>
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => handleDelete(content.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                        >
                          <i className="ri-delete-bin-line"></i>
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Edit Modal */}
      {isEditModalOpen && selectedContent && (
        <EditContentModal
          content={selectedContent}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedContent(null);
          }}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}

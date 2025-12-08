import { useState, useMemo, useEffect } from 'react';
import GlobalNav from '../../components/feature/GlobalNav';
import SecondaryNav from '../../components/feature/SecondaryNav';
import Footer from '../../components/feature/Footer';
import EditContentModal from './components/EditContentModal';
import { blogApi } from '../../services/blog.api';
import { BlogPost } from '../../database/schema';

export default function MyContentPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'draft'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    try {
      setLoading(true);
      const response = await blogApi.getMyBlogs({ limit: 100 });
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error('Error fetching my blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter contents based on tab and search
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const matchesTab = activeTab === 'all' || blog.publish_status === activeTab;
      const matchesSearch = searchQuery === '' ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (blog.category && blog.category.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery, blogs]);

  const handleEdit = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogApi.deleteBlog(id);
        setBlogs(blogs.filter(b => b.id !== id));
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog');
      }
    }
  };

  const handleSaveEdit = async () => {
    setIsEditModalOpen(false);
    setSelectedBlog(null);
    await fetchMyBlogs();
  };

  const stats = {
    total: blogs.length,
    published: blogs.filter(b => b.publish_status === 'published').length,
    draft: blogs.filter(b => b.publish_status === 'draft').length,
    totalViews: blogs.reduce((sum, b) => sum + (b.views_count || 0), 0),
    totalLikes: blogs.reduce((sum, b) => sum + (b.likes_count || 0), 0)
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
                {(['all', 'published', 'draft'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
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
                  placeholder="Search blogs..."
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
          {loading ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading your content...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <i className="ri-inbox-line text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No blogs found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredBlogs.map((blog) => {
                const publishDate = new Date(blog.published_at || blog.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                });

                return (
                  <div
                    key={blog.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        {/* Content Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                              <i className="ri-article-line text-xl text-white"></i>
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">{blog.title}</h3>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs text-gray-500">Blog</span>
                                {blog.category && (
                                  <>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-xs text-gray-500">{blog.category}</span>
                                  </>
                                )}
                                <span className="text-gray-300">•</span>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  blog.publish_status === 'published'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-orange-100 text-orange-700'
                                }`}>
                                  {blog.publish_status.charAt(0).toUpperCase() + blog.publish_status.slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">{blog.excerpt}</p>

                          {/* Stats */}
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <i className="ri-calendar-line"></i>
                              <span>{publishDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <i className="ri-eye-line"></i>
                              <span>{blog.views_count || 0} views</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <i className="ri-heart-line"></i>
                              <span>{blog.likes_count || 0} likes</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleEdit(blog)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                          >
                            <i className="ri-edit-line"></i>
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => window.location.href = `/news/${blog.id}`}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                          >
                            <i className="ri-eye-line"></i>
                            <span>View</span>
                          </button>
                          <button
                            onClick={() => handleDelete(blog.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                          >
                            <i className="ri-delete-bin-line"></i>
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Edit Modal */}
      {isEditModalOpen && selectedBlog && (
        <EditContentModal
          blog={selectedBlog}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedBlog(null);
          }}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}

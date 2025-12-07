
import { useState } from 'react';

export default function ContentManagement() {
  const [activeContentType, setActiveContentType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const contentTypes = [
    { id: 'all', label: 'All Content', count: 1752 },
    { id: 'news', label: 'News', count: 156 },
    { id: 'blogs', label: 'Blogs', count: 234 },
    { id: 'documents', label: 'Documents', count: 892 },
    { id: 'activities', label: 'Activities', count: 423 },
    { id: 'crossfunctions', label: 'Crossfunctions', count: 67 }
  ];

  const contentItems = [
    { id: 1, title: 'Q4 Marketing Strategy 2024', type: 'Blog', author: 'Sarah Chen', date: '2024-01-15', status: 'Published', views: 987, likes: 156 },
    { id: 2, title: 'Employee Handbook Update', type: 'Document', author: 'HR Team', date: '2024-01-14', status: 'Published', views: 1234, likes: 89 },
    { id: 3, title: 'New Office Opening Announcement', type: 'News', author: 'Admin', date: '2024-01-13', status: 'Published', views: 2341, likes: 234 },
    { id: 4, title: 'Team Building Workshop', type: 'Activity', author: 'HR Team', date: '2024-01-12', status: 'Scheduled', views: 876, likes: 123 },
    { id: 5, title: 'Product Launch Team', type: 'Crossfunction', author: 'John Smith', date: '2024-01-11', status: 'Active', views: 654, likes: 78 },
    { id: 6, title: 'Financial Report Q4 2023', type: 'Document', author: 'Finance Team', date: '2024-01-10', status: 'Draft', views: 432, likes: 45 },
    { id: 7, title: 'Company Milestone Achieved', type: 'News', author: 'Lisa Wang', date: '2024-01-09', status: 'Published', views: 1876, likes: 267 },
    { id: 8, title: 'Remote Work Best Practices', type: 'Blog', author: 'Mike Johnson', date: '2024-01-08', status: 'Published', views: 1123, likes: 189 }
  ];

  const getStatusColor = (status) => {
    try {
      switch (status) {
        case 'Published': return 'bg-green-600/10 text-green-600';
        case 'Draft': return 'bg-yellow-600/10 text-yellow-600';
        case 'Scheduled': return 'bg-blue-600/10 text-blue-600';
        case 'Active': return 'bg-purple-600/10 text-purple-600';
        default: return 'bg-gray-600/10 text-gray-600';
      }
    } catch (error) {
      console.error('Error getting status color:', error);
      return 'bg-gray-600/10 text-gray-600';
    }
  };

  const handleSearchChange = (e) => {
    try {
      setSearchQuery(e.target.value);
    } catch (error) {
      console.error('Error handling search change:', error);
    }
  };

  const handleContentTypeChange = (typeId) => {
    try {
      setActiveContentType(typeId);
    } catch (error) {
      console.error('Error handling content type change:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative flex-1 max-w-md w-full">
          <input
            type="text"
            placeholder="Search content by title, author, or type..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-3 pl-11 bg-dark-card border border-dark-border rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
          />
          <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2.5 bg-dark-card border border-dark-border text-gray-300 rounded-lg hover:bg-dark-hover transition-all duration-300 cursor-pointer whitespace-nowrap">
            <i className="ri-filter-line mr-2"></i>
            Filters
          </button>
          <button className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300 cursor-pointer whitespace-nowrap">
            <i className="ri-download-line mr-2"></i>
            Export
          </button>
        </div>
      </div>

      {/* Content Type Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {contentTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleContentTypeChange(type.id)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap cursor-pointer ${
              activeContentType === type.id
                ? 'bg-red-600 text-white'
                : 'bg-dark-card border border-dark-border text-gray-400 hover:text-white hover:border-red-600/50'
            }`}
          >
            {type.label} <span className="ml-2 opacity-70">({type.count})</span>
          </button>
        ))}
      </div>

      {/* Content Table */}
      <div className="bg-dark-card border border-dark-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-bg border-b border-dark-border">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  <input type="checkbox" className="w-4 h-4 rounded border-dark-border bg-dark-bg cursor-pointer" />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Author</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Engagement</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {contentItems.map((item) => (
                <tr key={item.id} className="hover:bg-dark-hover transition-colors duration-150">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-dark-border bg-dark-bg cursor-pointer" />
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-white">{item.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-400">{item.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-400">{item.author}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-400">{item.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <i className="ri-eye-line"></i> {item.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="ri-heart-line"></i> {item.likes}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-bg rounded-lg transition-all duration-300 cursor-pointer">
                        <i className="ri-edit-line"></i>
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-600/10 rounded-lg transition-all duration-300 cursor-pointer">
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-dark-border flex items-center justify-between">
          <p className="text-sm text-gray-400">Showing 1 to 8 of 1,752 results</p>
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-dark-bg border border-dark-border text-gray-400 rounded-lg hover:text-white hover:border-red-600/50 transition-all duration-300 cursor-pointer">
              Previous
            </button>
            <button className="px-3 py-2 bg-red-600 text-white rounded-lg cursor-pointer">1</button>
            <button className="px-3 py-2 bg-dark-bg border border-dark-border text-gray-400 rounded-lg hover:text-white hover:border-red-600/50 transition-all duration-300 cursor-pointer">2</button>
            <button className="px-3 py-2 bg-dark-bg border border-dark-border text-gray-400 rounded-lg hover:text-white hover:border-red-600/50 transition-all duration-300 cursor-pointer">3</button>
            <button className="px-3 py-2 bg-dark-bg border border-dark-border text-gray-400 rounded-lg hover:text-white hover:border-red-600/50 transition-all duration-300 cursor-pointer">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

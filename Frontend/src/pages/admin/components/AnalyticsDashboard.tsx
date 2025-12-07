
import { useState } from 'react';

export default function AnalyticsDashboard() {
  const stats = [
    { label: 'Total Users', value: '1,247', change: '+12%', icon: 'ri-user-line', color: 'from-blue-600 to-blue-700', bgColor: 'bg-blue-600/10' },
    { label: 'Logged In Users', value: '342', change: '+8%', icon: 'ri-user-follow-line', color: 'from-green-600 to-green-700', bgColor: 'bg-green-600/10' },
    { label: 'Total News', value: '156', change: '+23%', icon: 'ri-newspaper-line', color: 'from-purple-600 to-purple-700', bgColor: 'bg-purple-600/10' },
    { label: 'Total Documents', value: '892', change: '+15%', icon: 'ri-file-text-line', color: 'from-orange-600 to-orange-700', bgColor: 'bg-orange-600/10' },
    { label: 'Total Blogs', value: '234', change: '+18%', icon: 'ri-article-line', color: 'from-pink-600 to-pink-700', bgColor: 'bg-pink-600/10' },
    { label: 'Active Spaces', value: '45', change: '+5%', icon: 'ri-layout-grid-line', color: 'from-red-600 to-red-700', bgColor: 'bg-red-600/10' },
    { label: 'Crossfunctions', value: '67', change: '+10%', icon: 'ri-group-line', color: 'from-indigo-600 to-indigo-700', bgColor: 'bg-indigo-600/10' },
    { label: 'Total Activities', value: '423', change: '+20%', icon: 'ri-calendar-event-line', color: 'from-teal-600 to-teal-700', bgColor: 'bg-teal-600/10' }
  ];

  const recentActivities = [
    { user: 'Sarah Chen', action: 'created a new blog post', item: 'Q4 Marketing Strategy', time: '5 minutes ago', avatar: 'SC' },
    { user: 'Mike Johnson', action: 'uploaded a document', item: 'Financial Report 2024', time: '12 minutes ago', avatar: 'MJ' },
    { user: 'Emily Davis', action: 'joined the platform', item: 'New User Registration', time: '25 minutes ago', avatar: 'ED' },
    { user: 'John Smith', action: 'created a crossfunction', item: 'Product Launch Team', time: '1 hour ago', avatar: 'JS' },
    { user: 'Lisa Wang', action: 'published news', item: 'Company Milestone Achieved', time: '2 hours ago', avatar: 'LW' }
  ];

  const topContent = [
    { title: 'Employee Handbook 2024', type: 'Document', views: 1234, likes: 89, author: 'HR Team' },
    { title: 'Q4 Sales Strategy', type: 'Blog', views: 987, likes: 156, author: 'Sales Team' },
    { title: 'New Office Opening', type: 'News', views: 2341, likes: 234, author: 'Admin' },
    { title: 'Team Building Event', type: 'Activity', views: 876, likes: 123, author: 'HR Team' },
    { title: 'Product Roadmap 2024', type: 'Document', views: 1567, likes: 198, author: 'Product Team' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-dark-card border border-dark-border rounded-lg p-6 hover:border-red-600/50 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br ${stat.color}`}>
                <i className={`${stat.icon} text-white text-xl`}></i>
              </div>
              <span className="text-green-500 text-sm font-semibold">{stat.change}</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Activities</h2>
            <button className="text-sm text-red-600 hover:text-red-500 font-medium cursor-pointer whitespace-nowrap">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b border-dark-border last:border-0 last:pb-0">
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-red-600 to-red-700 rounded-full text-white text-sm font-semibold flex-shrink-0">
                  {activity.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-white">{activity.user}</span>{' '}
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">{activity.item}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Content */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Top Content</h2>
            <button className="text-sm text-red-600 hover:text-red-500 font-medium cursor-pointer whitespace-nowrap">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topContent.map((content, index) => (
              <div key={index} className="pb-4 border-b border-dark-border last:border-0 last:pb-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-sm font-semibold text-white flex-1">{content.title}</h3>
                  <span className="text-xs px-2 py-1 bg-red-600/10 text-red-600 rounded-full whitespace-nowrap">
                    {content.type}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-2">By {content.author}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <i className="ri-eye-line"></i> {content.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="ri-heart-line"></i> {content.likes}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


import { useState } from 'react';

export default function RolePermissions() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const permissions = [
    { id: 'news', label: 'Create News', icon: 'ri-newspaper-line', color: 'text-purple-600' },
    { id: 'blogs', label: 'Create Blogs', icon: 'ri-article-line', color: 'text-pink-600' },
    { id: 'documents', label: 'Create Documents', icon: 'ri-file-text-line', color: 'text-blue-600' },
    { id: 'activities', label: 'Create Activities', icon: 'ri-calendar-event-line', color: 'text-green-600' },
    { id: 'crossfunctions', label: 'Create Crossfunctions', icon: 'ri-group-line', color: 'text-purple-600' },
    { id: 'spaces', label: 'Create Spaces', icon: 'ri-layout-grid-line', color: 'text-red-600' },
    { id: 'events', label: 'Create Events', icon: 'ri-calendar-line', color: 'text-orange-600' },
    { id: 'polls', label: 'Create Polls', icon: 'ri-bar-chart-box-line', color: 'text-indigo-600' }
  ];

  const users = [
    { id: 1, name: 'Sarah Chen', email: 'sarah.chen@company.com', role: 'Internal User', avatar: 'SC', permissions: ['news', 'blogs', 'documents'] },
    { id: 2, name: 'Mike Johnson', email: 'mike.j@company.com', role: 'Internal User', avatar: 'MJ', permissions: ['news', 'activities'] },
    { id: 3, name: 'Emily Davis', email: 'emily.d@company.com', role: 'Internal User', avatar: 'ED', permissions: ['documents', 'spaces'] },
    { id: 4, name: 'John Smith', email: 'john.smith@external.com', role: 'External User', avatar: 'JS', permissions: [] },
    { id: 5, name: 'Lisa Wang', email: 'lisa.wang@company.com', role: 'Internal User', avatar: 'LW', permissions: ['blogs', 'news', 'activities', 'crossfunctions'] }
  ];

  const contentAccess = [
    { id: 'all-news', label: 'All News Articles', type: 'News', count: 156 },
    { id: 'all-blogs', label: 'All Blog Posts', type: 'Blogs', count: 234 },
    { id: 'all-docs', label: 'All Documents', type: 'Documents', count: 892 },
    { id: 'hr-space', label: 'HR Space', type: 'Space', count: 45 },
    { id: 'finance-space', label: 'Finance Space', type: 'Space', count: 67 },
    { id: 'marketing-space', label: 'Marketing Space', type: 'Space', count: 89 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User List */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Select User</h2>
          <div className="space-y-2">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user.id.toString())}
                className={`w-full p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                  selectedUser === user.id.toString()
                    ? 'border-red-600 bg-red-600/10'
                    : 'border-dark-border bg-dark-bg hover:border-red-600/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-red-600 to-red-700 rounded-full text-white text-sm font-semibold">
                    {user.avatar}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-blue-600/10 text-blue-600 rounded-full">
                    {user.role}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Permissions Panel */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Create Permissions</h2>
          {selectedUser ? (
            <div className="space-y-3">
              {permissions.map((permission) => {
                const user = users.find(u => u.id.toString() === selectedUser);
                const isChecked = user?.permissions.includes(permission.id) || false;
                
                return (
                  <label
                    key={permission.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-dark-border hover:border-red-600/50 transition-all duration-300 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      className="w-5 h-5 rounded border-dark-border bg-dark-bg cursor-pointer"
                    />
                    <div className={`w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800/50 ${permission.color}`}>
                      <i className={`${permission.icon} text-lg`}></i>
                    </div>
                    <span className="text-sm font-medium text-white">{permission.label}</span>
                  </label>
                );
              })}
              <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300 font-medium whitespace-nowrap cursor-pointer">
                Save Permissions
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <i className="ri-user-settings-line text-6xl text-gray-600 mb-4"></i>
              <p className="text-gray-400">Select a user to manage permissions</p>
            </div>
          )}
        </div>
      </div>

      {/* Content Access for External Users */}
      <div className="bg-dark-card border border-dark-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Content Access Control</h2>
            <p className="text-sm text-gray-400 mt-1">Assign specific content access for external users</p>
          </div>
        </div>

        {selectedUser ? (
          <div>
            {users.find(u => u.id.toString() === selectedUser)?.role === 'External User' ? (
              <div className="space-y-3">
                {contentAccess.map((content) => (
                  <label
                    key={content.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-dark-border hover:border-red-600/50 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-dark-border bg-dark-bg cursor-pointer"
                      />
                      <div>
                        <p className="text-sm font-medium text-white">{content.label}</p>
                        <p className="text-xs text-gray-400">{content.count} items</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-purple-600/10 text-purple-600 rounded-full">
                      {content.type}
                    </span>
                  </label>
                ))}
                <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300 font-medium whitespace-nowrap cursor-pointer">
                  Save Content Access
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <i className="ri-information-line text-6xl text-gray-600 mb-4"></i>
                <p className="text-gray-400">Content access control is only available for external users</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <i className="ri-lock-line text-6xl text-gray-600 mb-4"></i>
            <p className="text-gray-400">Select a user to manage content access</p>
          </div>
        )}
      </div>
    </div>
  );
}

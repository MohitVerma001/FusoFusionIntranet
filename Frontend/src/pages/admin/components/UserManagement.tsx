import { useState } from 'react';
import CreateInternalUserModal from './CreateInternalUserModal';

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

  const userTabs = [
    { id: 'all', label: 'All Users', count: 1247 },
    { id: 'pending', label: 'Pending Approval', count: 23 },
    { id: 'admin', label: 'Admins', count: 8 },
    { id: 'internal', label: 'Internal Users', count: 1189 },
    { id: 'external', label: 'External Users', count: 27 }
  ];

  const users = [
    { id: 1, name: 'Sarah Chen', email: 'sarah.chen@company.com', role: 'Admin', status: 'Active', lastLogin: '2 hours ago', avatar: 'SC' },
    { id: 2, name: 'Mike Johnson', email: 'mike.j@company.com', role: 'Internal User', status: 'Active', lastLogin: '5 hours ago', avatar: 'MJ' },
    { id: 3, name: 'Emily Davis', email: 'emily.d@company.com', role: 'Internal User', status: 'Pending', lastLogin: 'Never', avatar: 'ED' },
    { id: 4, name: 'John Smith', email: 'john.smith@external.com', role: 'External User', status: 'Active', lastLogin: '1 day ago', avatar: 'JS' },
    { id: 5, name: 'Lisa Wang', email: 'lisa.wang@company.com', role: 'Internal User', status: 'Active', lastLogin: '3 hours ago', avatar: 'LW' },
    { id: 6, name: 'David Brown', email: 'david.b@company.com', role: 'Admin', status: 'Active', lastLogin: '1 hour ago', avatar: 'DB' },
    { id: 7, name: 'Anna Martinez', email: 'anna.m@external.com', role: 'External User', status: 'Pending', lastLogin: 'Never', avatar: 'AM' },
    { id: 8, name: 'Tom Wilson', email: 'tom.w@company.com', role: 'Internal User', status: 'Inactive', lastLogin: '2 weeks ago', avatar: 'TW' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-600/10 text-green-600';
      case 'Pending': return 'bg-yellow-600/10 text-yellow-600';
      case 'Inactive': return 'bg-gray-600/10 text-gray-600';
      default: return 'bg-gray-600/10 text-gray-600';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return 'bg-red-600/10 text-red-600';
      case 'Internal User': return 'bg-blue-600/10 text-blue-600';
      case 'External User': return 'bg-purple-600/10 text-purple-600';
      default: return 'bg-gray-600/10 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">User Management</h2>
          <p className="text-gray-400 mt-1">Manage user accounts and access</p>
        </div>
        <button
          onClick={() => setIsCreateUserModalOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300 font-medium cursor-pointer whitespace-nowrap flex items-center gap-2"
        >
          <i className="ri-user-add-line text-lg"></i>
          <span>Internal User</span>
        </button>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative flex-1 max-w-md w-full">
          <input
            type="text"
            placeholder="Search users by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-11 bg-dark-card border border-dark-border rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
          />
          <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2.5 bg-dark-card border border-dark-border text-gray-300 rounded-lg hover:bg-dark-hover transition-all duration-300 cursor-pointer whitespace-nowrap">
            <i className="ri-filter-line mr-2"></i>
            Filters
          </button>
          <button 
            onClick={() => setShowCreateUserModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-user-add-line mr-2"></i>
            Create External User
          </button>
        </div>
      </div>

      {/* User Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {userTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-red-600 text-white'
                : 'bg-dark-card border border-dark-border text-gray-400 hover:text-white hover:border-red-600/50'
            }`}
          >
            {tab.label} <span className="ml-2 opacity-70">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-dark-card border border-dark-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-bg border-b border-dark-border">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  <input type="checkbox" className="w-4 h-4 rounded border-dark-border bg-dark-bg cursor-pointer" />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-dark-hover transition-colors duration-150">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-dark-border bg-dark-bg cursor-pointer" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-red-600 to-red-700 rounded-full text-white text-sm font-semibold">
                        {user.avatar}
                      </div>
                      <span className="text-sm font-medium text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-400">{user.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-400">{user.lastLogin}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {user.status === 'Pending' && (
                        <button className="px-3 py-1.5 bg-green-600/10 text-green-600 text-xs font-medium rounded-lg hover:bg-green-600/20 transition-all duration-300 cursor-pointer whitespace-nowrap">
                          Approve
                        </button>
                      )}
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
          <p className="text-sm text-gray-400">Showing 1 to 8 of 1,247 users</p>
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

      {/* Create External User Modal */}
      {showCreateUserModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] animate-fadeIn">
          <div className="bg-dark-card border border-dark-border rounded-lg w-full max-w-2xl mx-4 shadow-2xl shadow-red-600/20 animate-scale-in">
            <div className="px-6 py-4 border-b border-dark-border flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Create External User</h2>
              <button
                onClick={() => setShowCreateUserModal(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-hover rounded-lg transition-all duration-300 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setShowCreateUserModal(false); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
                    placeholder="john@external.com"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Username</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
                    placeholder="johndoe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
                    placeholder="••••••••"
                    required
                    minLength={8}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateUserModal(false)}
                  className="flex-1 px-6 py-3 bg-dark-bg border border-dark-border text-white rounded-lg hover:bg-dark-hover transition-all duration-300 font-medium whitespace-nowrap cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300 font-medium whitespace-nowrap cursor-pointer"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      <CreateInternalUserModal
        isOpen={isCreateUserModalOpen}
        onClose={() => setIsCreateUserModalOpen(false)}
      />
    </div>
  );
}

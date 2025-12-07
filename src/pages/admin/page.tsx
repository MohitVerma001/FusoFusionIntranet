import { useState } from 'react';
import GlobalNav from '../../components/feature/GlobalNav';
import Footer from '../../components/feature/Footer';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ContentManagement from './components/ContentManagement';
import UserManagement from './components/UserManagement';
import RolePermissions from './components/RolePermissions';
import ManageHR from './components/ManageHR';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'content' | 'users' | 'roles' | 'hr'>('analytics');

  const tabs = [
    { id: 'analytics' as const, label: 'Analytics Dashboard', icon: 'ri-dashboard-line' },
    { id: 'content' as const, label: 'Content Management', icon: 'ri-file-list-3-line' },
    { id: 'users' as const, label: 'User Management', icon: 'ri-user-settings-line' },
    { id: 'roles' as const, label: 'Roles & Permissions', icon: 'ri-shield-user-line' },
    { id: 'hr' as const, label: 'Manage HR', icon: 'ri-briefcase-line' },
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      <GlobalNav userRole="admin" />
      
      <div className="pt-16">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 py-8">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-red-100">Manage your intranet platform</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-dark-card border-b border-dark-border sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 flex items-center gap-2 font-medium transition-all duration-300 border-b-2 whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'text-red-500 border-red-500'
                      : 'text-gray-400 border-transparent hover:text-white hover:border-gray-600'
                  }`}
                >
                  <i className={`${tab.icon} text-lg`}></i>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {activeTab === 'analytics' && <AnalyticsDashboard />}
          {activeTab === 'content' && <ContentManagement />}
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'roles' && <RolePermissions />}
          {activeTab === 'hr' && <ManageHR />}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

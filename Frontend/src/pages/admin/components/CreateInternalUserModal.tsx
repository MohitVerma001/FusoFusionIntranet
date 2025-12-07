import { useState } from 'react';
import { userApi } from '../../../services/user.api';

interface CreateInternalUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CreateInternalUserModal({ isOpen, onClose, onSuccess }: CreateInternalUserModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    job_title: '',
    phone: '',
    location: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'internal' | 'admin' | 'external'>('internal');
  const [selectedTabs, setSelectedTabs] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const availableTabs = [
    { id: 'home', label: 'Home', icon: 'ri-home-line' },
    { id: 'news', label: 'News', icon: 'ri-newspaper-line' },
    { id: 'activity', label: 'Activity', icon: 'ri-calendar-event-line' },
    { id: 'crossfunction', label: 'Crossfunction', icon: 'ri-group-line' },
    { id: 'hr', label: 'HR', icon: 'ri-briefcase-line' },
    { id: 'my-content', label: 'My Content', icon: 'ri-folder-user-line' },
  ];

  const handleTabToggle = (tabId: string) => {
    setSelectedTabs(prev =>
      prev.includes(tabId)
        ? prev.filter(id => id !== tabId)
        : [...prev, tabId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await userApi.createUser({
        ...formData,
        role: role as 'admin' | 'internal' | 'external',
      });

      setFormData({
        email: '',
        password: '',
        full_name: '',
        job_title: '',
        phone: '',
        location: '',
      });
      setRole('internal');
      setSelectedTabs([]);

      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-dark-card border border-dark-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="sticky top-0 bg-dark-card border-b border-dark-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
              <i className="ri-user-add-line text-white text-lg"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Create Internal User</h2>
              <p className="text-sm text-gray-400">Add a new user to the system</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-hover rounded-lg transition-all duration-300 cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-600/10 border border-red-600/30 rounded-lg">
              <p className="text-red-500 text-sm flex items-center gap-2">
                <i className="ri-error-warning-line"></i>
                {error}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="user-full-name" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="user-full-name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all duration-300"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="user-email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="user-email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all duration-300"
                placeholder="john.doe@company.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="user-password" className="block text-sm font-medium text-gray-300 mb-2">
              Password <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i className="ri-lock-line text-gray-400"></i>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="user-password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-11 pr-12 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all duration-300"
                placeholder="Enter password"
                minLength={6}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="user-job-title" className="block text-sm font-medium text-gray-300 mb-2">
                Job Title
              </label>
              <input
                type="text"
                id="user-job-title"
                value={formData.job_title}
                onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all duration-300"
                placeholder="Software Engineer"
              />
            </div>

            <div>
              <label htmlFor="user-phone" className="block text-sm font-medium text-gray-300 mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="user-phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all duration-300"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div>
            <label htmlFor="user-location" className="block text-sm font-medium text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              id="user-location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all duration-300"
              placeholder="Tokyo, Japan"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Select Role <span className="text-red-600">*</span>
            </label>
            <div className="grid grid-cols-1 gap-3">
              {/* Internal User */}
              <label className={`relative flex items-center gap-4 p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                role === 'internal'
                  ? 'border-red-600 bg-red-600/10'
                  : 'border-dark-border bg-dark-bg hover:border-red-600/50'
              }`}>
                <input
                  type="radio"
                  name="role"
                  value="internal"
                  checked={role === 'internal'}
                  onChange={(e) => setRole(e.target.value as 'internal' | 'admin' | 'external')}
                  className="w-5 h-5 text-red-600 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <i className="ri-user-line text-blue-600"></i>
                    <span className="font-semibold text-white">Internal User</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Full access to all features and content</p>
                </div>
              </label>

              {/* Admin User */}
              <label className={`relative flex items-center gap-4 p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                role === 'admin'
                  ? 'border-red-600 bg-red-600/10'
                  : 'border-dark-border bg-dark-bg hover:border-red-600/50'
              }`}>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={(e) => setRole(e.target.value as 'internal' | 'admin' | 'external')}
                  className="w-5 h-5 text-red-600 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <i className="ri-admin-line text-red-600"></i>
                    <span className="font-semibold text-white">Admin User</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Full access + admin panel and management tools</p>
                </div>
              </label>

              {/* External User */}
              <label className={`relative flex items-center gap-4 p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                role === 'external'
                  ? 'border-red-600 bg-red-600/10'
                  : 'border-dark-border bg-dark-bg hover:border-red-600/50'
              }`}>
                <input
                  type="radio"
                  name="role"
                  value="external"
                  checked={role === 'external'}
                  onChange={(e) => setRole(e.target.value as 'internal' | 'admin' | 'external')}
                  className="w-5 h-5 text-red-600 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <i className="ri-user-shared-line text-purple-600"></i>
                    <span className="font-semibold text-white">External User</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Limited access to selected tabs only</p>
                </div>
              </label>
            </div>
          </div>

          {/* Tab Access Selection - Only for External Users */}
          {role === 'external' && (
            <div className="bg-dark-bg border border-dark-border rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Select Accessible Tabs <span className="text-red-600">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {availableTabs.map((tab) => (
                  <label
                    key={tab.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                      selectedTabs.includes(tab.id)
                        ? 'border-red-600 bg-red-600/10'
                        : 'border-dark-border hover:border-red-600/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedTabs.includes(tab.id)}
                      onChange={() => handleTabToggle(tab.id)}
                      className="w-4 h-4 rounded border-dark-border text-red-600 cursor-pointer"
                    />
                    <i className={`${tab.icon} text-gray-400`}></i>
                    <span className="text-sm text-white">{tab.label}</span>
                  </label>
                ))}
              </div>
              {selectedTabs.length === 0 && (
                <p className="text-xs text-red-600 mt-2">Please select at least one tab</p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-dark-border">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-dark-bg border border-dark-border text-gray-300 rounded-lg hover:bg-dark-hover hover:border-red-600/50 transition-all duration-300 font-medium cursor-pointer whitespace-nowrap"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || (role === 'external' && selectedTabs.length === 0)}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <i className="ri-loader-4-line animate-spin"></i>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <i className="ri-user-add-line"></i>
                  <span>Create User</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

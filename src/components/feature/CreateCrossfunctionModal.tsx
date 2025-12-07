import { useState } from 'react';
import RichTextEditor from '../base/RichTextEditor';

interface CreateCrossfunctionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateCrossfunctionModal({ isOpen, onClose }: CreateCrossfunctionModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    space: '',
    department: '',
    organization: '',
    location: '',
    contactPerson: '',
    email: '',
    phone: '',
    description: '',
    objectives: '',
    tags: '',
    priority: 'medium',
    status: 'active'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Creating crossfunction:', formData);
    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setFormData({
      title: '',
      space: '',
      department: '',
      organization: '',
      location: '',
      contactPerson: '',
      email: '',
      phone: '',
      description: '',
      objectives: '',
      tags: '',
      priority: 'medium',
      status: 'active'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] animate-fadeIn">
      <div className="bg-dark-card border border-dark-border rounded-lg w-full max-w-4xl mx-4 shadow-2xl shadow-purple-600/20 animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-dark-card border-b border-dark-border px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-purple-600/10 rounded-lg">
              <i className="ri-group-line text-purple-600 text-xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Create Cross-Functional Team</h2>
              <p className="text-sm text-gray-400">Collaborate across departments and organizations</p>
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
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Team Title <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Digital Transformation Initiative, Product Launch Team"
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
            />
          </div>

          {/* Space Selection */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Select Space <span className="text-red-600">*</span>
            </label>
            <select
              required
              value={formData.space}
              onChange={(e) => setFormData({ ...formData, space: e.target.value })}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 cursor-pointer"
            >
              <option value="">Choose a space</option>
              <option value="marketing">Marketing Team</option>
              <option value="hr">Human Resources</option>
              <option value="it">IT Department</option>
              <option value="sales">Sales Team</option>
              <option value="product">Product Development</option>
              <option value="finance">Finance</option>
              <option value="operations">Operations</option>
            </select>
          </div>

          {/* Department & Organization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Department <span className="text-red-600">*</span>
              </label>
              <select
                required
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 cursor-pointer"
              >
                <option value="">Select department</option>
                <option value="engineering">Engineering</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
                <option value="hr">Human Resources</option>
                <option value="finance">Finance</option>
                <option value="operations">Operations</option>
                <option value="product">Product</option>
                <option value="it">IT</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Organization <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="e.g., FUSO Corporation"
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Location <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., Tokyo HQ, Building 3, Floor 5"
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
            />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Contact Person <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                placeholder="Full name"
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="contact@fuso.com"
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Phone <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+81 3-1234-5678"
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
              />
            </div>
          </div>

          {/* Priority & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Priority Level <span className="text-red-600">*</span>
              </label>
              <div className="flex gap-3">
                {[
                  { value: 'low', label: 'Low', color: 'text-green-600' },
                  { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
                  { value: 'high', label: 'High', color: 'text-red-600' }
                ].map((priority) => (
                  <button
                    key={priority.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, priority: priority.value })}
                    className={`flex-1 px-4 py-3 border rounded-lg transition-all duration-300 cursor-pointer ${
                      formData.priority === priority.value
                        ? 'border-red-600 bg-red-600/10 text-white'
                        : 'border-dark-border bg-dark-bg text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    <span className={formData.priority === priority.value ? priority.color : ''}>
                      {priority.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Status <span className="text-red-600">*</span>
              </label>
              <div className="flex gap-3">
                {[
                  { value: 'active', label: 'Active', icon: 'ri-play-circle-line' },
                  { value: 'planning', label: 'Planning', icon: 'ri-time-line' }
                ].map((status) => (
                  <button
                    key={status.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, status: status.value })}
                    className={`flex-1 px-4 py-3 border rounded-lg transition-all duration-300 cursor-pointer ${
                      formData.status === status.value
                        ? 'border-red-600 bg-red-600/10 text-white'
                        : 'border-dark-border bg-dark-bg text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    <i className={`${status.icon} mr-2`}></i>
                    {status.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Team Description <span className="text-red-600">*</span>
            </label>
            <RichTextEditor
              value={formData.description}
              onChange={(value) => setFormData({ ...formData, description: value })}
              placeholder="Describe the purpose and scope of this cross-functional team..."
            />
            <p className="text-xs text-gray-500 mt-2">{formData.description.length}/3000 characters</p>
          </div>

          {/* Objectives */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Key Objectives <span className="text-red-600">*</span>
            </label>
            <RichTextEditor
              value={formData.objectives}
              onChange={(value) => setFormData({ ...formData, objectives: value })}
              placeholder="List the main objectives and goals of this team..."
            />
            <p className="text-xs text-gray-500 mt-2">{formData.objectives.length}/2000 characters</p>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Tags
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g., innovation, digital, transformation (comma separated)"
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-dark-bg border border-dark-border text-white rounded-lg hover:bg-dark-hover transition-all duration-300 font-medium whitespace-nowrap cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:shadow-lg hover:shadow-purple-600/50 transition-all duration-300 font-medium whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="ri-loader-4-line animate-spin"></i>
                  Creating...
                </span>
              ) : (
                'Create Cross-Functional Team'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

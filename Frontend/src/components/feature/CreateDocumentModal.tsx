import { useState } from 'react';
import RichTextEditor from '../base/RichTextEditor';

interface CreateDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateDocumentModal({ isOpen, onClose }: CreateDocumentModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    space: '',
    category: '',
    hrCategory: '',
    content: '',
    tags: '',
    language: 'en',
    attachments: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Creating document:', formData);
    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setFormData({
      title: '',
      space: '',
      category: '',
      content: '',
      tags: '',
      language: 'en',
      attachments: ''
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] animate-fadeIn">
      <div className="bg-dark-card border border-dark-border rounded-lg w-full max-w-3xl mx-4 shadow-2xl shadow-red-600/20 animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-dark-card border-b border-dark-border px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-600/10 rounded-lg">
              <i className="ri-file-text-line text-blue-600 text-xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Create New Document</h2>
              <p className="text-sm text-gray-400">Share knowledge and information with your team</p>
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
          {/* Document Title */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Document Title <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Q4 Marketing Strategy, Employee Handbook"
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

          {/* HR Category Selection - Only show if HR space is selected */}
          {formData.space === 'hr' && (
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                HR Category <span className="text-red-600">*</span>
              </label>
              <select
                required={formData.space === 'hr'}
                value={formData.hrCategory}
                onChange={(e) => setFormData({ ...formData, hrCategory: e.target.value })}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 cursor-pointer"
              >
                <option value="">Select HR category</option>
                <option value="market-recruiting">Market and Recruiting</option>
                <option value="onboarding">Onboarding</option>
                <option value="time-absence">Time and Absence</option>
                <option value="compensation">Compensation</option>
                <option value="hr-development">HR Development</option>
                <option value="social-welfare">Social Welfare</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">This document will be published under the selected HR category</p>
            </div>
          )}

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Document Category <span className="text-red-600">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { value: 'policy', icon: 'ri-shield-check-line', label: 'Policy' },
                { value: 'guide', icon: 'ri-book-open-line', label: 'Guide' },
                { value: 'report', icon: 'ri-file-chart-line', label: 'Report' },
                { value: 'procedure', icon: 'ri-list-check-2', label: 'Procedure' },
                { value: 'template', icon: 'ri-file-copy-line', label: 'Template' },
                { value: 'manual', icon: 'ri-book-2-line', label: 'Manual' },
                { value: 'memo', icon: 'ri-file-list-line', label: 'Memo' },
                { value: 'other', icon: 'ri-file-line', label: 'Other' }
              ].map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.value })}
                  className={`p-3 border rounded-lg transition-all duration-300 cursor-pointer ${
                    formData.category === cat.value
                      ? 'border-red-600 bg-red-600/10'
                      : 'border-dark-border bg-dark-bg hover:border-gray-600'
                  }`}
                >
                  <i className={`${cat.icon} text-xl ${formData.category === cat.value ? 'text-red-600' : 'text-gray-400'}`}></i>
                  <p className={`text-xs font-medium mt-1 ${formData.category === cat.value ? 'text-white' : 'text-gray-300'}`}>
                    {cat.label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Language <span className="text-red-600">*</span>
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, language: 'en' })}
                className={`flex-1 px-4 py-3 border rounded-lg transition-all duration-300 cursor-pointer ${
                  formData.language === 'en'
                    ? 'border-red-600 bg-red-600/10 text-white'
                    : 'border-dark-border bg-dark-bg text-gray-400 hover:border-gray-600'
                }`}
              >
                <i className="ri-global-line mr-2"></i>
                English
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, language: 'jp' })}
                className={`flex-1 px-4 py-3 border rounded-lg transition-all duration-300 cursor-pointer ${
                  formData.language === 'jp'
                    ? 'border-red-600 bg-red-600/10 text-white'
                    : 'border-dark-border bg-dark-bg text-gray-400 hover:border-gray-600'
                }`}
              >
                <i className="ri-translate-2 mr-2"></i>
                Japanese
              </button>
            </div>
          </div>

          {/* Content - Rich Text Editor */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Document Content <span className="text-red-600">*</span>
            </label>
            <RichTextEditor
              value={formData.content}
              onChange={(value) => setFormData({ ...formData, content: value })}
              placeholder="Write your document content here... Use the toolbar to format your text."
            />
            <p className="text-xs text-gray-500 mt-2">{formData.content.length}/5000 characters</p>
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
              placeholder="e.g., policy, guidelines, important (comma separated)"
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
            />
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Attachments (URLs)
            </label>
            <input
              type="text"
              value={formData.attachments}
              onChange={(e) => setFormData({ ...formData, attachments: e.target.value })}
              placeholder="Add file URLs (comma separated)"
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
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300 font-medium whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="ri-loader-4-line animate-spin"></i>
                  Creating...
                </span>
              ) : (
                'Create Document'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

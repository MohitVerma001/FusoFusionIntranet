import { useState } from 'react';
import RichTextEditor from '../base/RichTextEditor';

interface CreateBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateBlogModal({ isOpen, onClose }: CreateBlogModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    space: '',
    category: '',
    hrCategory: '',
    content: '',
    excerpt: '',
    tags: '',
    coverImage: '',
    author: '',
    publishStatus: 'draft',
    visibility: 'public'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Creating blog post:', formData);
    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setFormData({
      title: '',
      space: '',
      category: '',
      hrCategory: '',
      content: '',
      excerpt: '',
      tags: '',
      coverImage: '',
      author: '',
      publishStatus: 'draft',
      visibility: 'public'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] animate-fadeIn">
      <div className="bg-black border border-red-600/30 rounded-lg w-full max-w-4xl mx-4 shadow-2xl shadow-red-600/20 animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-black border-b border-red-600/30 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-red-600/10 rounded-lg">
              <i className="ri-article-line text-red-600 text-xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Create Blog Post / News</h2>
              <p className="text-sm text-gray-400">Share insights, updates, and stories with your audience</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/10 rounded-lg transition-all duration-300 cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Blog Title */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Blog Title <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., 10 Tips for Remote Team Collaboration"
              className="w-full px-4 py-3 bg-black border border-red-600/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
            />
          </div>

          {/* Space & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Select Space <span className="text-red-600">*</span>
              </label>
              <select
                required
                value={formData.space}
                onChange={(e) => setFormData({ ...formData, space: e.target.value })}
                className="w-full px-4 py-3 bg-black border border-red-600/30 rounded-lg text-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 cursor-pointer"
              >
                <option value="">Choose a space</option>
                <option value="MFTBCEn">MFTBC English</option>
                <option value="MFTBCJa">MFTBC Japanese</option>
                <option value="DTAEn">DTA English</option>
                <option value="DTAJa">DTA Japanese</option>
                
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Category <span className="text-red-600">*</span>
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-black border border-red-600/30 rounded-lg text-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 cursor-pointer"
              >
                <option value="">Select category</option>
                <option value="News">News</option>
                <option value="hr">HR</option>
                <option value="content">Content</option>
                <option value="IT">IT</option>
                <option value="personalBlog">Personal Blog</option>
                <option value="crossfunctions">Crossfunctions</option> 
              </select>
            </div>
          </div>

          {/* HR Category Selection - Only show if HR space is selected */}
          {formData.category === 'hr' && (
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                HR Category <span className="text-red-600">*</span>
              </label>
              <select
                required={formData.space === 'hr'}
                value={formData.hrCategory}
                onChange={(e) => setFormData({ ...formData, hrCategory: e.target.value })}
                className="w-full px-4 py-3 bg-black border border-red-600/30 rounded-lg text-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 cursor-pointer"
              >
                <option value="">Select HR category</option>
                <option value="market-recruiting">Market and Recruiting</option>
                <option value="onboarding">Onboarding</option>
                <option value="time-absence">Time and Absence</option>
                <option value="compensation">Compensation</option>
                <option value="hr-development">HR Development</option>
                <option value="social-welfare">Social Welfare</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">This blog will be published under the selected HR category</p>
            </div>
          )}

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Author <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              placeholder="Author name"
              className="w-full px-4 py-3 bg-black border border-red-600/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Cover Image URL
            </label>
            <input
              type="url"
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 bg-black border border-red-600/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
            />
            <p className="text-xs text-gray-500 mt-1">Add a featured image for your blog post</p>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Excerpt <span className="text-red-600">*</span>
            </label>
            <textarea
              required
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Write a brief summary of your blog post (150-200 characters)"
              rows={3}
              maxLength={200}
              className="w-full px-4 py-3 bg-black border border-red-600/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/200 characters</p>
          </div>

          {/* Content - Rich Text Editor */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Blog Content <span className="text-red-600">*</span>
            </label>
            <RichTextEditor
              value={formData.content}
              onChange={(value) => setFormData({ ...formData, content: value })}
              placeholder="Write your blog post content here... Use the toolbar to format your text."
            />
            <p className="text-xs text-gray-500 mt-2">{formData.content.length}/10000 characters</p>
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
              placeholder="e.g., productivity, remote work, collaboration (comma separated)"
              className="w-full px-4 py-3 bg-black border border-red-600/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
            />
          </div>

          {/* Publish Status & Visibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Publish Status <span className="text-red-600">*</span>
              </label>
              <div className="flex gap-3">
                {[
                  { value: 'draft', label: 'Draft', icon: 'ri-draft-line' },
                  { value: 'published', label: 'Publish', icon: 'ri-send-plane-line' }
                ].map((status) => (
                  <button
                    key={status.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, publishStatus: status.value })}
                    className={`flex-1 px-4 py-3 border rounded-lg transition-all duration-300 cursor-pointer ${
                      formData.publishStatus === status.value
                        ? 'border-red-600 bg-red-600/10 text-white'
                        : 'border-red-600/30 bg-black text-gray-400 hover:border-red-600/50'
                    }`}
                  >
                    <i className={`${status.icon} mr-2`}></i>
                    {status.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Visibility <span className="text-red-600">*</span>
              </label>
              <div className="flex gap-3">
                {[
                  { value: 'public', label: 'Public', icon: 'ri-global-line' },
                  { value: 'private', label: 'Private', icon: 'ri-lock-line' }
                ].map((visibility) => (
                  <button
                    key={visibility.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, visibility: visibility.value })}
                    className={`flex-1 px-4 py-3 border rounded-lg transition-all duration-300 cursor-pointer ${
                      formData.visibility === visibility.value
                        ? 'border-red-600 bg-red-600/10 text-white'
                        : 'border-red-600/30 bg-black text-gray-400 hover:border-red-600/50'
                    }`}
                  >
                    <i className={`${visibility.icon} mr-2`}></i>
                    {visibility.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-black border border-red-600/30 text-white rounded-lg hover:bg-red-600/10 transition-all duration-300 font-medium whitespace-nowrap cursor-pointer"
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
                  {formData.publishStatus === 'published' ? 'Publishing...' : 'Saving...'}
                </span>
              ) : (
                formData.publishStatus === 'published' ? 'Publish Blog Post' : 'Save as Draft'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

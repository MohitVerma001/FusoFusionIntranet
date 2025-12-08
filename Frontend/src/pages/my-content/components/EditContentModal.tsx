import { useState, useEffect } from 'react';
import { BlogPost } from '../../../database/schema';
import { blogApi } from '../../../services/blog.api';
import RichTextEditor from '../../../components/base/RichTextEditor';

interface EditContentModalProps {
  blog: BlogPost;
  onClose: () => void;
  onSave: () => void;
}

export default function EditContentModal({ blog, onClose, onSave }: EditContentModalProps) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
  const initialImageUrl = blog.cover_image_url
    ? (blog.cover_image_url.startsWith('http') ? blog.cover_image_url : `${API_BASE_URL}${blog.cover_image_url}`)
    : '';

  const [formData, setFormData] = useState({
    title: blog.title,
    excerpt: blog.excerpt,
    content: blog.content,
    category: blog.category || '',
    tags: blog.tags || [],
    publish_status: blog.publish_status
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>(initialImageUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({
          ...formData,
          tags: [...formData.tags, tagInput.trim()]
        });
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = async (e: React.FormEvent, shouldPublish: boolean = false) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updateData = {
        ...formData,
        publish_status: shouldPublish ? 'published' as const : formData.publish_status
      };

      await blogApi.updateBlog(blog.id, updateData, coverImage || undefined);
      onSave();
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Failed to update blog');
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    'Market and Recruiting',
    'Onboarding',
    'Time and Absence',
    'Compensation',
    'HR Development',
    'Social Welfare'
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card border border-dark-border rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-black text-white px-6 py-4 flex items-center justify-between border-b border-dark-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <i className="ri-edit-line text-xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold">Edit Blog</h2>
              <p className="text-sm text-red-100">Update your blog post</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 hover:bg-white/20 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={(e) => handleSubmit(e, false)} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="space-y-6">
            {/* Cover Image */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Cover Image
              </label>
              {coverImagePreview && (
                <div className="mb-3">
                  <img
                    src={coverImagePreview}
                    alt="Cover preview"
                    className="w-full h-48 object-cover rounded-lg border border-dark-border"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImageChange}
                className="w-full px-4 py-3 bg-dark-hover border border-dark-border text-white rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-200 text-sm"
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-dark-hover border border-dark-border text-white rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-200 text-sm placeholder-gray-500"
                placeholder="Enter blog title"
                required
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Excerpt <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-dark-hover border border-dark-border text-white rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-200 text-sm resize-none placeholder-gray-500"
                placeholder="Brief summary of your blog"
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <RichTextEditor
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
                placeholder="Write your blog content here..."
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-dark-hover border border-dark-border text-white rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-200 text-sm cursor-pointer"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-red-600/20 text-red-400 border border-red-600/30 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-red-300 cursor-pointer"
                    >
                      <i className="ri-close-line"></i>
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="w-full px-4 py-3 bg-dark-hover border border-dark-border text-white rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-200 text-sm placeholder-gray-500"
                placeholder="Type a tag and press Enter"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Status
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="draft"
                    checked={formData.publish_status === 'draft'}
                    onChange={(e) => setFormData({ ...formData, publish_status: e.target.value as 'draft' | 'published' })}
                    className="w-4 h-4 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-300">Draft</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="published"
                    checked={formData.publish_status === 'published'}
                    onChange={(e) => setFormData({ ...formData, publish_status: e.target.value as 'draft' | 'published' })}
                    className="w-4 h-4 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-300">Published</span>
                </label>
              </div>
            </div>

            {/* Stats Display */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark-hover rounded-lg p-4 border border-dark-border">
                <div className="flex items-center gap-2 mb-1">
                  <i className="ri-eye-line text-red-500"></i>
                  <span className="text-sm font-semibold text-gray-300">Views</span>
                </div>
                <p className="text-2xl font-bold text-white">{blog.views_count || 0}</p>
              </div>
              <div className="bg-dark-hover rounded-lg p-4 border border-dark-border">
                <div className="flex items-center gap-2 mb-1">
                  <i className="ri-heart-line text-red-500"></i>
                  <span className="text-sm font-semibold text-gray-300">Likes</span>
                </div>
                <p className="text-2xl font-bold text-white">{blog.likes_count || 0}</p>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="bg-dark-hover px-6 py-4 flex items-center justify-between border-t border-dark-border">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-2.5 border border-dark-border text-gray-300 rounded-lg hover:bg-dark-card hover:text-white transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
          >
            Cancel
          </button>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={(e) => handleSubmit(e, false)}
              disabled={isLoading}
              className="px-6 py-2.5 bg-dark-card border border-dark-border text-white rounded-lg hover:border-red-600/50 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              {isLoading ? (
                <>
                  <i className="ri-loader-4-line animate-spin"></i>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <i className="ri-save-line"></i>
                  <span>Save Draft</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              disabled={isLoading}
              className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg hover:shadow-red-600/30 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              {isLoading ? (
                <>
                  <i className="ri-loader-4-line animate-spin"></i>
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <i className="ri-send-plane-fill"></i>
                  <span>Save & Publish</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

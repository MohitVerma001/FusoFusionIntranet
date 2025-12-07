import { useState, useEffect } from 'react';
import RichTextEditor from '../base/RichTextEditor';
import { blogApi } from '../../services/blog.api';
import { spaceApi } from '../../services/space.api';
import { hrCategoryApi } from '../../services/hrCategory.api';
import { Space, HRCategory } from '../../database/schema';

interface CreateBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CreateBlogModal({ isOpen, onClose, onSuccess }: CreateBlogModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    space: '',
    category: '',
    hrCategory: '',
    content: '',
    excerpt: '',
    tags: '',
    coverImage: '',
    publishStatus: 'draft',
    visibility: 'public'
  });

  const [spaces, setSpaces] = useState<Space[]>([]);
  const [hrCategories, setHRCategories] = useState<HRCategory[]>([]);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadSpaces();
      loadHRCategories();
    }
  }, [isOpen]);

  const loadSpaces = async () => {
    try {
      const response = await spaceApi.getAllSpaces({ visibility: 'public' });
      setSpaces(response.data.spaces);
    } catch (err) {
      console.error('Failed to load spaces:', err);
    }
  };

  const loadHRCategories = async () => {
    try {
      const response = await hrCategoryApi.getAllCategories();
      setHRCategories(response.data.categories);
    } catch (err) {
      console.error('Failed to load HR categories:', err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('Image size must be less than 10MB');
        return;
      }

      if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
        setError('Please upload a valid image file (JPEG, PNG, GIF, or WEBP)');
        return;
      }

      setCoverImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const removeImage = () => {
    setCoverImageFile(null);
    setImagePreview('');
    setFormData({ ...formData, coverImage: '' });
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const tagsArray = formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

      const blogData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        space_id: formData.space,
        category: formData.category,
        hr_category_id: formData.hrCategory || undefined,
        tags: tagsArray,
        publish_status: formData.publishStatus as 'draft' | 'published',
        visibility: formData.visibility as 'public' | 'private',
        cover_image_url: formData.coverImage || undefined,
      };

      await blogApi.createBlog(blogData, coverImageFile || undefined);

      setFormData({
        title: '',
        space: '',
        category: '',
        hrCategory: '',
        content: '',
        excerpt: '',
        tags: '',
        coverImage: '',
        publishStatus: 'draft',
        visibility: 'public'
      });
      setCoverImageFile(null);
      setImagePreview('');

      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create blog post. Please try again.');
      console.error('Failed to create blog:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] animate-fadeIn">
      <div className="bg-black border border-red-600/30 rounded-lg w-full max-w-4xl mx-4 shadow-2xl shadow-red-600/20 animate-scale-in max-h-[90vh] overflow-y-auto">
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

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-600/10 border border-red-600/30 rounded-lg">
              <p className="text-red-500 text-sm flex items-center gap-2">
                <i className="ri-error-warning-line"></i>
                {error}
              </p>
            </div>
          )}

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
                {spaces.map((space) => (
                  <option key={space.id} value={space.id}>
                    {space.name}
                  </option>
                ))}
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
                <option value="news">News</option>
                <option value="hr">HR</option>
                <option value="content">Content</option>
                <option value="it">IT</option>
                <option value="personal-blog">Personal Blog</option>
                <option value="crossfunctions">Crossfunctions</option>
              </select>
            </div>
          </div>

          {formData.category === 'hr' && (
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                HR Category <span className="text-red-600">*</span>
              </label>
              <select
                required={formData.category === 'hr'}
                value={formData.hrCategory}
                onChange={(e) => setFormData({ ...formData, hrCategory: e.target.value })}
                className="w-full px-4 py-3 bg-black border border-red-600/30 rounded-lg text-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 cursor-pointer"
              >
                <option value="">Select HR category</option>
                {hrCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">This blog will be published under the selected HR category</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Banner Image
            </label>
            <div className="space-y-3">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border border-red-600/30"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300 cursor-pointer"
                  >
                    <i className="ri-close-line"></i>
                  </button>
                </div>
              ) : (
                <label className="w-full px-4 py-6 bg-black border-2 border-dashed border-red-600/30 rounded-lg hover:border-red-600/50 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer">
                  <i className="ri-image-add-line text-4xl text-red-600 mb-2"></i>
                  <span className="text-white text-sm mb-1">Click to upload banner image</span>
                  <span className="text-gray-500 text-xs">JPEG, PNG, GIF or WEBP (max 10MB)</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
              <input
                type="url"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                placeholder="Or paste an image URL"
                className="w-full px-4 py-3 bg-black border border-red-600/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
              />
            </div>
          </div>

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

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Blog Content <span className="text-red-600">*</span>
            </label>
            <RichTextEditor
              value={formData.content}
              onChange={(value) => setFormData({ ...formData, content: value })}
              placeholder="Write your blog post content here... Use the toolbar to format your text."
            />
            <p className="text-xs text-gray-500 mt-2">{formData.content.length} characters</p>
          </div>

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

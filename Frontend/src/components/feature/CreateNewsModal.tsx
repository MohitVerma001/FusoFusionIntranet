
import { useState } from 'react';

interface CreateNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateNewsModal({ isOpen, onClose }: CreateNewsModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    department: '',
    category: '',
    tags: [] as string[],
    image: null as File | null,
    publishDate: '',
    status: 'draft',
    featured: false,
    allowComments: true,
    notifyUsers: false
  });

  const [tagInput, setTagInput] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('News Article Created:', formData);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card border border-dark-border rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-dark-card border-b border-dark-border px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <i className="ri-newspaper-line text-white text-xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Create News Article</h2>
              <p className="text-sm text-gray-400">Share important news and updates</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-dark-hover transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-gray-400 text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Article Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter article title..."
              className="w-full px-4 py-3 bg-dark-hover border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Excerpt <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Brief summary of the article (max 200 characters)..."
              maxLength={200}
              rows={2}
              className="w-full px-4 py-3 bg-dark-hover border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/200 characters</p>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Article Content <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write your article content here..."
              rows={8}
              className="w-full px-4 py-3 bg-dark-hover border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all resize-none"
            />
          </div>

          {/* Author & Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="Author name..."
                className="w-full px-4 py-3 bg-dark-hover border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-4 py-3 bg-dark-hover border border-dark-border rounded-lg text-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all cursor-pointer"
              >
                <option value="">Select department</option>
                <option value="corporate">Corporate Communications</option>
                <option value="hr">HR Department</option>
                <option value="finance">Finance Department</option>
                <option value="rd">R&D Division</option>
                <option value="it">IT Department</option>
                <option value="marketing">Marketing Department</option>
                <option value="sales">Sales Department</option>
              </select>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-dark-hover border border-dark-border rounded-lg text-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all cursor-pointer"
            >
              <option value="">Select category</option>
              <option value="company-news">Company News</option>
              <option value="product-launch">Product Launch</option>
              <option value="sustainability">Sustainability</option>
              <option value="innovation">Innovation</option>
              <option value="financial">Financial Results</option>
              <option value="partnership">Partnership</option>
              <option value="awards">Awards & Recognition</option>
              <option value="technology">Technology</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add tags..."
                className="flex-1 px-4 py-3 bg-dark-hover border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer"
              >
                Add Tag
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-blue-600/20 border border-blue-600/30 text-blue-400 rounded-lg text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-blue-300 cursor-pointer"
                    >
                      <i className="ri-close-line"></i>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Featured Image <span className="text-red-500">*</span>
            </label>
            {imagePreview ? (
              <div className="relative">
                <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, image: null });
                    setImagePreview('');
                  }}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center cursor-pointer"
                >
                  <i className="ri-delete-bin-line text-white"></i>
                </button>
              </div>
            ) : (
              <label className="block w-full h-48 border-2 border-dashed border-dark-border rounded-lg hover:border-blue-600 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  required
                />
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <i className="ri-image-add-line text-4xl mb-2"></i>
                  <p className="text-sm font-medium">Click to upload image</p>
                  <p className="text-xs mt-1">PNG, JPG, GIF up to 10MB</p>
                </div>
              </label>
            )}
          </div>

          {/* Publish Date */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Publish Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              required
              value={formData.publishDate}
              onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
              className="w-full px-4 py-3 bg-dark-hover border border-dark-border rounded-lg text-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all cursor-pointer"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-3 bg-dark-hover border border-dark-border rounded-lg text-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all cursor-pointer"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-5 h-5 rounded border-dark-border bg-dark-hover text-blue-600 focus:ring-2 focus:ring-blue-600/20 cursor-pointer"
              />
              <span className="text-sm text-gray-300">Feature this article on homepage</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.allowComments}
                onChange={(e) => setFormData({ ...formData, allowComments: e.target.checked })}
                className="w-5 h-5 rounded border-dark-border bg-dark-hover text-blue-600 focus:ring-2 focus:ring-blue-600/20 cursor-pointer"
              />
              <span className="text-sm text-gray-300">Allow comments</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.notifyUsers}
                onChange={(e) => setFormData({ ...formData, notifyUsers: e.target.checked })}
                className="w-5 h-5 rounded border-dark-border bg-dark-hover text-blue-600 focus:ring-2 focus:ring-blue-600/20 cursor-pointer"
              />
              <span className="text-sm text-gray-300">Send notification to all users</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-dark-border">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-dark-hover hover:bg-gray-700 text-white rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-medium transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? 'Creating...' : 'Create Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState } from 'react';

interface CreateHRCafeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateHRCafeModal({ isOpen, onClose }: CreateHRCafeModalProps) {
  const [formData, setFormData] = useState({
    menuType: 'scheme',
    title: '',
    description: '',
    imageURL: '',
    linkURL: '',
    publishDate: new Date().toISOString().split('T')[0],
    featured: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Creating HR Cafe article:', formData);
    setIsSubmitting(false);
    onClose();
    
    setFormData({
      menuType: 'scheme',
      title: '',
      description: '',
      imageURL: '',
      linkURL: '',
      publishDate: new Date().toISOString().split('T')[0],
      featured: false
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] animate-fadeIn">
      <div className="bg-dark-card border border-dark-border rounded-lg w-full max-w-2xl mx-4 shadow-2xl shadow-red-600/20 animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-dark-card border-b border-dark-border px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-green-600/10 rounded-lg">
              <i className="ri-cup-line text-green-600 text-xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Create HR Cafe Article</h2>
              <p className="text-sm text-gray-400">Add new content to HR Cafe menu</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-hover rounded-lg transition-all duration-300 cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Menu Type <span className="text-red-600">*</span>
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, menuType: 'scheme' })}
                className={`flex-1 px-4 py-3 border rounded-lg transition-all duration-300 cursor-pointer ${
                  formData.menuType === 'scheme'
                    ? 'border-red-600 bg-red-600/10 text-white'
                    : 'border-dark-border bg-dark-bg text-gray-400 hover:border-gray-600'
                }`}
              >
                <i className="ri-shield-check-line mr-2"></i>
                Scheme
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, menuType: 'career' })}
                className={`flex-1 px-4 py-3 border rounded-lg transition-all duration-300 cursor-pointer ${
                  formData.menuType === 'career'
                    ? 'border-red-600 bg-red-600/10 text-white'
                    : 'border-dark-border bg-dark-bg text-gray-400 hover:border-gray-600'
                }`}
              >
                <i className="ri-briefcase-line mr-2"></i>
                Career
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Article Title <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder={formData.menuType === 'scheme' ? 'e.g., Understanding Employee Benefits' : 'e.g., Career Paths in IT Department'}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Description <span className="text-red-600">*</span>
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter a brief description of the article..."
              rows={4}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Image URL <span className="text-red-600">*</span>
            </label>
            <input
              type="url"
              required
              value={formData.imageURL}
              onChange={(e) => setFormData({ ...formData, imageURL: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Article Link URL <span className="text-red-600">*</span>
            </label>
            <input
              type="url"
              required
              value={formData.linkURL}
              onChange={(e) => setFormData({ ...formData, linkURL: e.target.value })}
              placeholder="https://example.com/article"
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Publish Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              required
              value={formData.publishDate}
              onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-5 h-5 bg-dark-bg border border-dark-border rounded cursor-pointer"
            />
            <label htmlFor="featured" className="text-sm text-gray-300 cursor-pointer">
              Mark as featured article
            </label>
          </div>

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
                'Create Article'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

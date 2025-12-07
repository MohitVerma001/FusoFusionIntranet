import { useState } from 'react';

interface CreateHRCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateHRCategoryModal({ isOpen, onClose }: CreateHRCategoryModalProps) {
  const [formData, setFormData] = useState({
    categoryName: '',
    icon: 'ri-folder-line',
    description: '',
    documents: [{ title: '', url: '' }],
    displayOrder: '1',
    isActive: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const addDocument = () => {
    setFormData({
      ...formData,
      documents: [...formData.documents, { title: '', url: '' }]
    });
  };

  const removeDocument = (index: number) => {
    const newDocuments = formData.documents.filter((_, i) => i !== index);
    setFormData({ ...formData, documents: newDocuments });
  };

  const updateDocument = (index: number, field: 'title' | 'url', value: string) => {
    const newDocuments = [...formData.documents];
    newDocuments[index][field] = value;
    setFormData({ ...formData, documents: newDocuments });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Creating HR category:', formData);
    setIsSubmitting(false);
    onClose();
    
    setFormData({
      categoryName: '',
      icon: 'ri-folder-line',
      description: '',
      documents: [{ title: '', url: '' }],
      displayOrder: '1',
      isActive: true
    });
  };

  const iconOptions = [
    { value: 'ri-briefcase-line', label: 'Briefcase' },
    { value: 'ri-user-add-line', label: 'User Add' },
    { value: 'ri-time-line', label: 'Time' },
    { value: 'ri-money-dollar-circle-line', label: 'Money' },
    { value: 'ri-graduation-cap-line', label: 'Education' },
    { value: 'ri-shield-check-line', label: 'Shield' },
    { value: 'ri-folder-line', label: 'Folder' },
    { value: 'ri-file-list-line', label: 'File List' }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] animate-fadeIn">
      <div className="bg-dark-card border border-dark-border rounded-lg w-full max-w-3xl mx-4 shadow-2xl shadow-red-600/20 animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-dark-card border-b border-dark-border px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-purple-600/10 rounded-lg">
              <i className="ri-folder-settings-line text-purple-600 text-xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Create HR Category</h2>
              <p className="text-sm text-gray-400">Add a new category with documents</p>
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
              Category Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.categoryName}
              onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
              placeholder="e.g., Market and Recruiting, Onboarding, Time and Absence"
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Icon <span className="text-red-600">*</span>
              </label>
              <select
                required
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 cursor-pointer"
              >
                {iconOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Display Order
              </label>
              <input
                type="number"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                min="1"
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Description <span className="text-red-600">*</span>
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of this category..."
              rows={3}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 resize-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-white">
                Documents
              </label>
              <button
                type="button"
                onClick={addDocument}
                className="px-3 py-1.5 bg-red-600/10 text-red-600 rounded-lg hover:bg-red-600/20 transition-all duration-300 text-sm font-medium whitespace-nowrap cursor-pointer"
              >
                <i className="ri-add-line mr-1"></i>
                Add Document
              </button>
            </div>

            <div className="space-y-3">
              {formData.documents.map((doc, index) => (
                <div key={index} className="p-4 bg-dark-bg border border-dark-border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 space-y-3">
                      <input
                        type="text"
                        value={doc.title}
                        onChange={(e) => updateDocument(index, 'title', e.target.value)}
                        placeholder="Document title"
                        className="w-full px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 text-sm"
                      />
                      <input
                        type="url"
                        value={doc.url}
                        onChange={(e) => updateDocument(index, 'url', e.target.value)}
                        placeholder="Document URL"
                        className="w-full px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 text-sm"
                      />
                    </div>
                    {formData.documents.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDocument(index)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-600/10 rounded-lg transition-all duration-300 cursor-pointer"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-5 h-5 bg-dark-bg border border-dark-border rounded cursor-pointer"
            />
            <label htmlFor="isActive" className="text-sm text-gray-300 cursor-pointer">
              Make this category active and visible
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
                'Create Category'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

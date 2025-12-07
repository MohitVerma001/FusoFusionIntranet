import { useState } from 'react';

interface CreateSpaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateSpaceModal({ isOpen, onClose }: CreateSpaceModalProps) {
  const [formData, setFormData] = useState({
    parentSpace: 'MFTBC EN',
    subSpaceName: '',
    imageFile: null as File | null,
    imagePreview: '',
    selectedTabs: [] as string[]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const availableTabs = [
    { id: 'overview', label: 'Overview', icon: 'ri-dashboard-line' },
    { id: 'documents', label: 'Documents', icon: 'ri-file-text-line' },
    { id: 'discussions', label: 'Discussions', icon: 'ri-chat-3-line' },
    { id: 'calendar', label: 'Calendar', icon: 'ri-calendar-line' },
    { id: 'members', label: 'Members', icon: 'ri-group-line' },
    { id: 'tasks', label: 'Tasks', icon: 'ri-task-line' },
    { id: 'files', label: 'Files', icon: 'ri-folder-line' },
    { id: 'analytics', label: 'Analytics', icon: 'ri-bar-chart-box-line' }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, imageFile: file, imagePreview: URL.createObjectURL(file) });
    }
  };

  const toggleTab = (tabId: string) => {
    const newTabs = formData.selectedTabs.includes(tabId)
      ? formData.selectedTabs.filter(id => id !== tabId)
      : [...formData.selectedTabs, tabId];
    setFormData({ ...formData, selectedTabs: newTabs });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Creating space:', formData);
    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setFormData({
      parentSpace: 'MFTBC EN',
      subSpaceName: '',
      imageFile: null,
      imagePreview: '',
      selectedTabs: []
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] animate-fadeIn">
      <div className="bg-dark-card border border-dark-border rounded-lg w-full max-w-2xl mx-4 shadow-2xl shadow-red-600/20 animate-scale-in max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="sticky top-0 bg-dark-card border-b border-dark-border px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-red-600/10 rounded-lg">
              <i className="ri-layout-grid-line text-red-600 text-xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Create New Space</h2>
              <p className="text-sm text-gray-400">Build a collaborative workspace for your team</p>
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
          {/* Parent Space Selection */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Select Parent Space <span className="text-red-600">*</span>
            </label>
            <select
              required
              value={formData.parentSpace}
              onChange={(e) => setFormData({ ...formData, parentSpace: e.target.value })}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 cursor-pointer"
            >
              <option value="MFTBC EN">MFTBC EN</option>
              <option value="MFTBC JP">MFTBC JP</option>
              <option value="HR Department">HR Department</option>
              <option value="IT Department">IT Department</option>
              <option value="Finance Department">Finance Department</option>
              <option value="Marketing Department">Marketing Department</option>
            </select>
          </div>

          {/* Sub Space Name */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Sub Space Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.subSpaceName}
              onChange={(e) => setFormData({ ...formData, subSpaceName: e.target.value })}
              placeholder="e.g., Marketing Team, Product Development"
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
            />
          </div>

          {/* Upload Image */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Upload Space Image <span className="text-red-600">*</span>
            </label>
            <div className="space-y-3">
              {/* Image Preview */}
              {formData.imagePreview && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border border-dark-border">
                  <img 
                    src={formData.imagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, imageFile: null, imagePreview: '' })}
                    className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 cursor-pointer"
                  >
                    <i className="ri-close-line"></i>
                  </button>
                </div>
              )}

              {/* Upload Button */}
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-dark-border rounded-lg cursor-pointer bg-dark-bg hover:bg-dark-hover transition-all duration-300">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <i className="ri-upload-cloud-2-line text-4xl text-gray-400 mb-2"></i>
                  <p className="text-sm text-gray-400">
                    <span className="font-semibold text-red-600">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  required={!formData.imagePreview}
                />
              </label>
            </div>
          </div>

          {/* Select Tabs */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Select Tabs <span className="text-red-600">*</span>
            </label>
            <p className="text-xs text-gray-400 mb-3">Choose which tabs to include in this space</p>
            <div className="grid grid-cols-2 gap-3">
              {availableTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => toggleTab(tab.id)}
                  className={`p-4 border rounded-lg transition-all duration-300 cursor-pointer flex items-center gap-3 ${
                    formData.selectedTabs.includes(tab.id)
                      ? 'border-red-600 bg-red-600/10'
                      : 'border-dark-border bg-dark-bg hover:border-gray-600'
                  }`}
                >
                  <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                    formData.selectedTabs.includes(tab.id) ? 'bg-red-600/20' : 'bg-gray-800/50'
                  }`}>
                    <i className={`${tab.icon} text-xl ${
                      formData.selectedTabs.includes(tab.id) ? 'text-red-600' : 'text-gray-400'
                    }`}></i>
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-medium ${
                      formData.selectedTabs.includes(tab.id) ? 'text-white' : 'text-gray-300'
                    }`}>
                      {tab.label}
                    </p>
                  </div>
                  {formData.selectedTabs.includes(tab.id) && (
                    <i className="ri-check-line text-red-600 ml-auto"></i>
                  )}
                </button>
              ))}
            </div>
            {formData.selectedTabs.length === 0 && (
              <p className="text-xs text-red-500 mt-2">Please select at least one tab</p>
            )}
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
              disabled={isSubmitting || formData.selectedTabs.length === 0}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300 font-medium whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="ri-loader-4-line animate-spin"></i>
                  Creating...
                </span>
              ) : (
                'Create Space'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

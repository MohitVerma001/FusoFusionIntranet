import { useState } from 'react';

interface CreateWelcomeMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateWelcomeMessageModal({ isOpen, onClose }: CreateWelcomeMessageModalProps) {
  const [formData, setFormData] = useState({
    messageEN: '',
    messageJP: '',
    showLanguageToggle: true,
    displayOrder: '1'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Creating welcome message:', formData);
    setIsSubmitting(false);
    onClose();
    
    setFormData({
      messageEN: '',
      messageJP: '',
      showLanguageToggle: true,
      displayOrder: '1'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] animate-fadeIn">
      <div className="bg-dark-card border border-dark-border rounded-lg w-full max-w-2xl mx-4 shadow-2xl shadow-red-600/20 animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-dark-card border-b border-dark-border px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-red-600/10 rounded-lg">
              <i className="ri-message-3-line text-red-600 text-xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Create Welcome Message</h2>
              <p className="text-sm text-gray-400">Set the welcome message for HR section</p>
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
              Welcome Message (English) <span className="text-red-600">*</span>
            </label>
            <textarea
              required
              value={formData.messageEN}
              onChange={(e) => setFormData({ ...formData, messageEN: e.target.value })}
              placeholder="Enter the welcome message in English..."
              rows={4}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Welcome Message (Japanese)
            </label>
            <textarea
              value={formData.messageJP}
              onChange={(e) => setFormData({ ...formData, messageJP: e.target.value })}
              placeholder="日本語でウェルカムメッセージを入力してください..."
              rows={4}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 resize-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="showLanguageToggle"
              checked={formData.showLanguageToggle}
              onChange={(e) => setFormData({ ...formData, showLanguageToggle: e.target.checked })}
              className="w-5 h-5 bg-dark-bg border border-dark-border rounded cursor-pointer"
            />
            <label htmlFor="showLanguageToggle" className="text-sm text-gray-300 cursor-pointer">
              Show "Change to Japanese" toggle button
            </label>
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
                'Create Welcome Message'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState } from 'react';

interface CreateAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateAnnouncementModal({ isOpen, onClose }: CreateAnnouncementModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    targetAudience: 'all',
    category: 'project-hyperion',
    content: '',
    sentDate: new Date().toISOString().split('T')[0],
    priority: 'normal',
    attachmentURL: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Creating announcement:', formData);
    setIsSubmitting(false);
    onClose();
    
    setFormData({
      title: '',
      targetAudience: 'all',
      category: 'project-hyperion',
      content: '',
      sentDate: new Date().toISOString().split('T')[0],
      priority: 'normal',
      attachmentURL: ''
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] animate-fadeIn">
      <div className="bg-dark-card border border-dark-border rounded-lg w-full max-w-3xl mx-4 shadow-2xl shadow-red-600/20 animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-dark-card border-b border-dark-border px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-orange-600/10 rounded-lg">
              <i className="ri-megaphone-line text-orange-600 text-xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Create HR Announcement</h2>
              <p className="text-sm text-gray-400">Publish important announcements for employees</p>
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
              Announcement Title <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Change of HR systems due to Project Hyperion"
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Target Audience <span className="text-red-600">*</span>
              </label>
              <select
                required
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 cursor-pointer"
              >
                <option value="all">For all employees</option>
                <option value="managers">For Managers</option>
                <option value="hr">For HR Team</option>
                <option value="it">For IT Department</option>
                <option value="sales">For Sales Team</option>
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
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 cursor-pointer"
              >
                <option value="project-hyperion">Project Hyperion</option>
                <option value="policy">Policy Update</option>
                <option value="system">System Change</option>
                <option value="benefits">Benefits</option>
                <option value="training">Training</option>
                <option value="general">General</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Sent Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.sentDate}
                onChange={(e) => setFormData({ ...formData, sentDate: e.target.value })}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Priority <span className="text-red-600">*</span>
              </label>
              <select
                required
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 cursor-pointer"
              >
                <option value="normal">Normal</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Announcement Content <span className="text-red-600">*</span>
            </label>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Enter the full announcement details..."
              rows={6}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Attachment URL
            </label>
            <input
              type="url"
              value={formData.attachmentURL}
              onChange={(e) => setFormData({ ...formData, attachmentURL: e.target.value })}
              placeholder="https://example.com/document.pdf"
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
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
                  Publishing...
                </span>
              ) : (
                'Publish Announcement'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

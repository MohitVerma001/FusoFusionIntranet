
import { useState } from 'react';

interface CreateActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateActivityModal({ isOpen, onClose }: CreateActivityModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    venue: '',
    capacity: '',
    organizer: '',
    department: '',
    tags: [] as string[],
    image: null as File | null,
    registrationDeadline: '',
    requiresApproval: false,
    isPublic: true,
    allowWaitlist: false,
    sendReminders: true
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
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Activity Created:', formData);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card border border-dark-border rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-dark-card border-b border-dark-border px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <i className="ri-calendar-event-line text-white text-xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Create Activity</h2>
              <p className="text-sm text-gray-400">Organize events and activities</p>
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
              Activity Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter activity title..."
              className="w-full px-4 py-3 bg-dark-hover border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the activity, what participants can expect..."
              rows={5}
              className="w-full px-4 py-3 bg-dark-hover border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all resize-none"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Activity Type <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-3 bg-dark-hover border border-dark-border rounded-lg text-white focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all cursor-pointer"
            >
              <option value="">Select activity type</option>
              <option value="event">Event</option>
              <option value="workshop">Workshop</option>
              <option value="training">Training</option>
              <option value="social">Social Gathering</option>
              <option value="volunteer">Volunteer Activity</option>
              <option value="sports">Sports Activity</option>
              <option value="team-building">Team Building</option>
              <option value="conference">Conference</option>
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 bg-dark-hover border border-dark-border rounded-lg text-white focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Start Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                required
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-4 py-3 bg-dark-hover border border-dark-border rounded-lg text-white focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                End Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                required
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-4 py-3 bg-dark-hover border border-dark-border rounded-lg text-white focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all cursor-pointer"
              />
            </div>
          </div>

          {/* Location & Venue */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Tokyo Office, Online"
                className="w-full px-4 py-3 bg-dark-hover border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Venue Details
              </label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                placeholder="e.g., Conference Room A, Zoom Link"
                className="w-full px-4 py-3 bg-dark-hover border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all"
              />
            </div>
          </div>

          {/* Capacity & Organizer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Capacity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                placeholder="Maximum participants"
                className="w-full px-4 py-3 bg-dark-hover border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Organizer <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.organizer}
                onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                placeholder="Organizer name"
                className="w-full px-4 py-3 bg-dark-hover border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all"
              />
            </div>
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Department <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-4 py-3 bg-dark-hover border border-dark-border rounded-lg text-white focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all cursor-pointer"
            >
              <option value="">Select department</option>
              <option value="hr">HR Department</option>
              <option value="it">IT Department</option>
              <option value="finance">Finance Department</option>
              <option value="marketing">Marketing Department</option>
              <option value="sales">Sales Department</option>
              <option value="rd">R&D Division</option>
              <option value="operations">Operations</option>
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
                className="flex-1 px-4 py-3 bg-dark-hover border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer"
              >
                Add Tag
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-purple-600/20 border border-purple-600/30 text-purple-400 rounded-lg text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-purple-300 cursor-pointer"
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
              Activity Image <span className="text-red-500">*</span>
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
              <label className="block w-full h-48 border-2 border-dashed border-dark-border rounded-lg hover:border-purple-600 transition-colors cursor-pointer">
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

          {/* Registration Deadline */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Registration Deadline <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              required
              value={formData.registrationDeadline}
              onChange={(e) => setFormData({ ...formData, registrationDeadline: e.target.value })}
              className="w-full px-4 py-3 bg-dark-hover border border-dark-border rounded-lg text-white focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all cursor-pointer"
            />
          </div>

          {/* Options */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.requiresApproval}
                onChange={(e) => setFormData({ ...formData, requiresApproval: e.target.checked })}
                className="w-5 h-5 rounded border-dark-border bg-dark-hover text-purple-600 focus:ring-2 focus:ring-purple-600/20 cursor-pointer"
              />
              <span className="text-sm text-gray-300">Requires approval for registration</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPublic}
                onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                className="w-5 h-5 rounded border-dark-border bg-dark-hover text-purple-600 focus:ring-2 focus:ring-purple-600/20 cursor-pointer"
              />
              <span className="text-sm text-gray-300">Make this activity public</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.allowWaitlist}
                onChange={(e) => setFormData({ ...formData, allowWaitlist: e.target.checked })}
                className="w-5 h-5 rounded border-dark-border bg-dark-hover text-purple-600 focus:ring-2 focus:ring-purple-600/20 cursor-pointer"
              />
              <span className="text-sm text-gray-300">Allow waitlist when full</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.sendReminders}
                onChange={(e) => setFormData({ ...formData, sendReminders: e.target.checked })}
                className="w-5 h-5 rounded border-dark-border bg-dark-hover text-purple-600 focus:ring-2 focus:ring-purple-600/20 cursor-pointer"
              />
              <span className="text-sm text-gray-300">Send reminders to participants</span>
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
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? 'Creating...' : 'Create Activity'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

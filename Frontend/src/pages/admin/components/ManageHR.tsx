import { useState } from 'react';
import CreateWelcomeMessageModal from '../../../components/feature/CreateWelcomeMessageModal';
import CreateAnnouncementModal from '../../../components/feature/CreateAnnouncementModal';
import CreateHRCafeModal from '../../../components/feature/CreateHRCafeModal';
import CreateHealthNewsModal from '../../../components/feature/CreateHealthNewsModal';
import CreateHRCategoryModal from '../../../components/feature/CreateHRCategoryModal';
import CreateJobPostingModal from '../../../components/feature/CreateJobPostingModal';

export default function ManageHR() {
  const [isCreateWelcomeMessageModalOpen, setIsCreateWelcomeMessageModalOpen] = useState(false);
  const [isCreateAnnouncementModalOpen, setIsCreateAnnouncementModalOpen] = useState(false);
  const [isCreateHRCafeModalOpen, setIsCreateHRCafeModalOpen] = useState(false);
  const [isCreateHealthNewsModalOpen, setIsCreateHealthNewsModalOpen] = useState(false);
  const [isCreateHRCategoryModalOpen, setIsCreateHRCategoryModalOpen] = useState(false);
  const [isCreateJobPostingModalOpen, setIsCreateJobPostingModalOpen] = useState(false);

  const hrOptions = [
    {
      icon: 'ri-message-3-line',
      label: 'Welcome Message',
      color: 'text-red-600',
      bgColor: 'bg-red-600/10',
      hoverColor: 'hover:bg-red-600/20',
      description: 'Edit welcome message for HR section',
      action: () => setIsCreateWelcomeMessageModalOpen(true)
    },
    {
      icon: 'ri-megaphone-line',
      label: 'HR Announcement',
      color: 'text-orange-600',
      bgColor: 'bg-orange-600/10',
      hoverColor: 'hover:bg-orange-600/20',
      description: 'Create announcements for employees',
      action: () => setIsCreateAnnouncementModalOpen(true)
    },
    {
      icon: 'ri-cup-line',
      label: 'HR Cafe Article',
      color: 'text-green-600',
      bgColor: 'bg-green-600/10',
      hoverColor: 'hover:bg-green-600/20',
      description: 'Add articles about schemes and careers',
      action: () => setIsCreateHRCafeModalOpen(true)
    },
    {
      icon: 'ri-heart-pulse-line',
      label: 'Health News',
      color: 'text-teal-600',
      bgColor: 'bg-teal-600/10',
      hoverColor: 'hover:bg-teal-600/20',
      description: 'Add health & productivity news',
      action: () => setIsCreateHealthNewsModalOpen(true)
    },
    {
      icon: 'ri-folder-settings-line',
      label: 'HR Category',
      color: 'text-purple-600',
      bgColor: 'bg-purple-600/10',
      hoverColor: 'hover:bg-purple-600/20',
      description: 'Create new HR categories with documents',
      action: () => setIsCreateHRCategoryModalOpen(true)
    },
    {
      icon: 'ri-briefcase-4-line',
      label: 'Job Posting',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-600/10',
      hoverColor: 'hover:bg-indigo-600/20',
      description: 'Post internal job opportunities',
      action: () => setIsCreateJobPostingModalOpen(true)
    }
  ];

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Manage HR Content</h2>
            <p className="text-gray-400 mt-1">Create and manage HR section content</p>
          </div>
        </div>

        {/* HR Creation Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hrOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className={`p-6 bg-dark-card border border-dark-border rounded-lg ${option.hoverColor} transition-all duration-300 cursor-pointer group text-left`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 flex items-center justify-center ${option.bgColor} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`${option.icon} text-2xl ${option.color}`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{option.label}</h3>
                  <p className="text-sm text-gray-400">{option.description}</p>
                </div>
                <i className="ri-arrow-right-line text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"></i>
              </div>
            </button>
          ))}
        </div>

        {/* Recent HR Content */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-white mb-4">Recent HR Content</h3>
          <div className="bg-dark-card border border-dark-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-dark-bg border-b border-dark-border">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                <tr className="hover:bg-dark-hover transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-orange-600/10 text-orange-600 rounded">Announcement</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-white">Project Hyperion Update</td>
                  <td className="px-6 py-4 text-sm text-gray-400">2025.12.04</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-green-600/10 text-green-600 rounded">Published</span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-red-600 hover:text-red-500 mr-3 cursor-pointer">
                      <i className="ri-edit-line"></i>
                    </button>
                    <button className="text-gray-400 hover:text-white cursor-pointer">
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-dark-hover transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-indigo-600/10 text-indigo-600 rounded">Job Posting</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-white">Senior HR Manager</td>
                  <td className="px-6 py-4 text-sm text-gray-400">2025.12.01</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-green-600/10 text-green-600 rounded">Active</span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-red-600 hover:text-red-500 mr-3 cursor-pointer">
                      <i className="ri-edit-line"></i>
                    </button>
                    <button className="text-gray-400 hover:text-white cursor-pointer">
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-dark-hover transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-green-600/10 text-green-600 rounded">HR Cafe</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-white">Understanding Benefits Scheme</td>
                  <td className="px-6 py-4 text-sm text-gray-400">2025.11.28</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-green-600/10 text-green-600 rounded">Published</span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-red-600 hover:text-red-500 mr-3 cursor-pointer">
                      <i className="ri-edit-line"></i>
                    </button>
                    <button className="text-gray-400 hover:text-white cursor-pointer">
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateWelcomeMessageModal 
        isOpen={isCreateWelcomeMessageModalOpen} 
        onClose={() => setIsCreateWelcomeMessageModalOpen(false)} 
      />
      <CreateAnnouncementModal 
        isOpen={isCreateAnnouncementModalOpen} 
        onClose={() => setIsCreateAnnouncementModalOpen(false)} 
      />
      <CreateHRCafeModal 
        isOpen={isCreateHRCafeModalOpen} 
        onClose={() => setIsCreateHRCafeModalOpen(false)} 
      />
      <CreateHealthNewsModal 
        isOpen={isCreateHealthNewsModalOpen} 
        onClose={() => setIsCreateHealthNewsModalOpen(false)} 
      />
      <CreateHRCategoryModal 
        isOpen={isCreateHRCategoryModalOpen} 
        onClose={() => setIsCreateHRCategoryModalOpen(false)} 
      />
      <CreateJobPostingModal 
        isOpen={isCreateJobPostingModalOpen} 
        onClose={() => setIsCreateJobPostingModalOpen(false)} 
      />
    </>
  );
}

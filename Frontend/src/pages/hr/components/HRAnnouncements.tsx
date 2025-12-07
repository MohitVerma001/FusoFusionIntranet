import { useState } from 'react';

export default function HRAnnouncements() {
  const [isExpanded, setIsExpanded] = useState(false);

  const announcements = [
    {
      id: 1,
      title: '[For all employees] Change of HR systems due to Project Hyperion',
      date: '2025.12.04',
      category: 'All Employees',
      icon: 'ri-group-line',
    },
    {
      id: 2,
      title: '[For Managers] Change of HR systems due to Project Hyperion',
      date: '2025.12.04',
      category: 'Managers',
      icon: 'ri-user-star-line',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-800 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-red-600 to-red-700 rounded-lg">
            <i className="ri-megaphone-line text-white text-xl"></i>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">HR Announcements</h2>
            <p className="text-sm text-gray-400">HR announcements related to Project Hyperion</p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300 cursor-pointer"
        >
          <i className={`ri-arrow-${isExpanded ? 'up' : 'down'}-s-line text-xl transition-transform duration-300`}></i>
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-3 animate-slide-down">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="p-4 bg-gray-800/50 hover:bg-gray-800 rounded-lg border border-gray-700 hover:border-red-600/50 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-700 group-hover:bg-red-600/20 rounded-lg transition-all duration-300">
                  <i className={`${announcement.icon} text-gray-400 group-hover:text-red-500 text-lg`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium group-hover:text-red-500 transition-colors duration-300 mb-1">
                    {announcement.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <i className="ri-calendar-line"></i>
                      Sent: {announcement.date}
                    </span>
                    <span className="px-2 py-0.5 bg-gray-700 rounded text-gray-300">
                      {announcement.category}
                    </span>
                  </div>
                </div>
                <i className="ri-arrow-right-line text-gray-400 group-hover:text-red-500 text-lg transition-colors duration-300"></i>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

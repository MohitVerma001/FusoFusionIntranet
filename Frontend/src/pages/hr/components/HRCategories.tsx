import { useState } from 'react';

export default function HRCategories() {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  const categories = [
    {
      id: 1,
      title: 'Market and Recruiting',
      description: 'Information about job market trends, recruitment processes, and hiring guidelines',
      icon: 'ri-user-search-line',
      color: 'from-blue-600 to-blue-700',
      documents: [
        'Recruitment Policy 2025',
        'Interview Guidelines',
        'Candidate Assessment Framework',
        'Onboarding Checklist',
      ],
    },
    {
      id: 2,
      title: 'Onboarding',
      description: 'Complete guide for new employee orientation and integration processes',
      icon: 'ri-user-add-line',
      color: 'from-green-600 to-green-700',
      documents: [
        'New Employee Welcome Guide',
        'First Week Checklist',
        'IT Setup Instructions',
        'Company Culture Handbook',
      ],
    },
    {
      id: 3,
      title: 'Time and Absence',
      description: 'Policies and procedures for time tracking, leave management, and attendance',
      icon: 'ri-calendar-check-line',
      color: 'from-purple-600 to-purple-700',
      documents: [
        'Time Tracking Policy',
        'Leave Request Procedures',
        'Absence Management Guidelines',
        'Holiday Calendar 2025',
      ],
    },
    {
      id: 4,
      title: 'Compensation',
      description: 'Salary structures, bonus schemes, and compensation-related information',
      icon: 'ri-money-dollar-circle-line',
      color: 'from-yellow-600 to-yellow-700',
      documents: [
        'Salary Structure Overview',
        'Bonus Calculation Method',
        'Performance Review Guidelines',
        'Compensation FAQ',
      ],
    },
    {
      id: 5,
      title: 'HR Development',
      description: 'Training programs, career development, and skill enhancement opportunities',
      icon: 'ri-graduation-cap-line',
      color: 'from-red-600 to-red-700',
      documents: [
        'Training Catalog 2025',
        'Career Development Framework',
        'Leadership Programs',
        'Skill Assessment Tools',
      ],
    },
    {
      id: 6,
      title: 'Social Welfare',
      description: 'Employee benefits, welfare programs, and social support services',
      icon: 'ri-heart-line',
      color: 'from-pink-600 to-pink-700',
      documents: [
        'Employee Benefits Guide',
        'Health Insurance Information',
        'Retirement Plan Details',
        'Welfare Program Overview',
      ],
    },
  ];

  const toggleCategory = (id: number) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-800 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-red-600 to-red-700 rounded-lg">
          <i className="ri-folder-open-line text-white text-xl"></i>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">HR Categories</h2>
          <p className="text-sm text-gray-400">Browse HR documents by category</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-gray-800/50 rounded-lg border border-gray-700 hover:border-red-600/50 transition-all duration-300 overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 flex items-center justify-center bg-gradient-to-br ${category.color} rounded-lg flex-shrink-0`}>
                  <i className={`${category.icon} text-white text-lg`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold mb-1">{category.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{category.description}</p>
                </div>
              </div>

              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full mt-2 px-3 py-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg flex items-center justify-between text-sm text-gray-300 hover:text-white transition-all duration-300 cursor-pointer"
              >
                <span className="font-medium">View Documents</span>
                <i className={`ri-arrow-${expandedCategory === category.id ? 'up' : 'down'}-s-line text-lg transition-transform duration-300`}></i>
              </button>

              {expandedCategory === category.id && (
                <div className="mt-3 space-y-2 animate-slide-down">
                  {category.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="p-2 bg-gray-700/30 hover:bg-gray-700/50 rounded flex items-center gap-2 cursor-pointer group transition-all duration-300"
                    >
                      <i className="ri-file-text-line text-gray-400 group-hover:text-red-500 text-sm"></i>
                      <span className="text-xs text-gray-300 group-hover:text-white flex-1">{doc}</span>
                      <i className="ri-download-line text-gray-400 group-hover:text-red-500 text-sm"></i>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

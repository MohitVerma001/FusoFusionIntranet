import { useState } from 'react';

export default function WhatShouldIDo() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const sections = [
    {
      id: 1,
      title: 'Time / Absence / Leaves',
      icon: 'ri-calendar-check-line',
      color: 'from-purple-600 to-purple-700',
      links: [
        'How to request annual leave',
        'Sick leave procedures',
        'Maternity/Paternity leave',
        'Time-off in lieu (TOIL)',
        'Remote work requests',
      ],
    },
    {
      id: 2,
      title: 'Compensations & Allowances',
      icon: 'ri-money-dollar-circle-line',
      color: 'from-green-600 to-green-700',
      links: [
        'Understanding your payslip',
        'Overtime compensation',
        'Travel allowances',
        'Housing allowance',
        'Meal vouchers',
      ],
    },
    {
      id: 3,
      title: 'Increase / Decrease Family Members',
      icon: 'ri-parent-line',
      color: 'from-pink-600 to-pink-700',
      links: [
        'Adding a new family member',
        'Updating dependent information',
        'Family benefits enrollment',
        'Childcare support',
        'Family insurance coverage',
      ],
    },
    {
      id: 4,
      title: 'Benefits & Insurance',
      icon: 'ri-shield-check-line',
      color: 'from-blue-600 to-blue-700',
      links: [
        'Health insurance enrollment',
        'Life insurance options',
        'Dental coverage',
        'Vision care benefits',
        'Wellness programs',
      ],
    },
    {
      id: 5,
      title: 'Career Development',
      icon: 'ri-rocket-line',
      color: 'from-orange-600 to-orange-700',
      links: [
        'Training opportunities',
        'Internal job applications',
        'Performance reviews',
        'Mentorship programs',
        'Skill development courses',
      ],
    },
  ];

  const toggleSection = (id: number) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-800 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-red-600 to-red-700 rounded-lg">
          <i className="ri-question-line text-white text-xl"></i>
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">What Should I Do in This Case?</h2>
        </div>
      </div>

      <div className="space-y-3">
        {sections.map((section) => (
          <div
            key={section.id}
            className="bg-gray-800/50 rounded-lg border border-gray-700 hover:border-red-600/50 transition-all duration-300 overflow-hidden"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-800/70 transition-all duration-300"
            >
              <div className={`w-9 h-9 flex items-center justify-center bg-gradient-to-br ${section.color} rounded-lg flex-shrink-0`}>
                <i className={`${section.icon} text-white text-lg`}></i>
              </div>
              <span className="flex-1 text-left text-sm font-medium text-white">{section.title}</span>
              <i className={`ri-arrow-${expandedSection === section.id ? 'up' : 'down'}-s-line text-gray-400 text-lg transition-transform duration-300`}></i>
            </button>

            {expandedSection === section.id && (
              <div className="px-3 pb-3 space-y-1 animate-slide-down">
                {section.links.map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block px-3 py-2 text-xs text-gray-400 hover:text-white hover:bg-gray-700/50 rounded transition-all duration-300 cursor-pointer"
                  >
                    <i className="ri-arrow-right-s-line text-red-500 mr-1"></i>
                    {link}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

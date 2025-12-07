import { useState } from 'react';

interface CategoryDropdownProps {
  title: string;
  icon: string;
  color: string;
}

export default function CategoryDropdown({ title, icon, color }: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const documents = [
    {
      id: 1,
      title: 'Innovation Success Story: Electric Vehicle Development',
      author: 'Innovation Team',
      date: '2024-01-14',
      type: 'PDF',
      size: '2.4 MB',
    },
    {
      id: 2,
      title: 'Team Collaboration Best Practices Guide',
      author: 'HR Department',
      date: '2024-01-12',
      type: 'PDF',
      size: '1.8 MB',
    },
    {
      id: 3,
      title: 'Quarterly Performance Review Highlights',
      author: 'Management',
      date: '2024-01-10',
      type: 'PDF',
      size: '3.2 MB',
    },
    {
      id: 4,
      title: 'Customer Success Case Study Collection',
      author: 'Sales Team',
      date: '2024-01-08',
      type: 'PDF',
      size: '4.1 MB',
    },
  ];

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 bg-gradient-to-r ${color} rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer group`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <i className={`${icon} text-xl text-white`}></i>
          </div>
          <span className="text-lg font-bold text-white">{title}</span>
        </div>
        <i className={`ri-arrow-${isOpen ? 'up' : 'down'}-s-line text-2xl text-white transition-transform duration-300`}></i>
      </button>

      {isOpen && (
        <div className="mt-3 space-y-2 animate-slide-down">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-dark-card border border-dark-border rounded-lg p-4 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/10 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-file-pdf-line text-2xl text-red-600"></i>
                </div>
                
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-2 group-hover:text-red-600 transition-colors duration-200">
                    {doc.title}
                  </h4>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <i className="ri-user-line text-red-600"></i>
                      {doc.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="ri-calendar-line text-red-600"></i>
                      {doc.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="ri-file-line text-red-600"></i>
                      {doc.type} • {doc.size}
                    </span>
                  </div>
                </div>
                
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors duration-200 whitespace-nowrap">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

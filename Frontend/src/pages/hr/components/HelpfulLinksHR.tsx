export default function HelpfulLinksHR() {
  const links = [
    {
      id: 1,
      title: 'Employee Handbook',
      description: 'Complete guide to company policies',
      icon: 'ri-book-open-line',
      color: 'from-blue-600 to-blue-700',
      url: '#',
    },
    {
      id: 2,
      title: 'HR Portal Login',
      description: 'Access your HR information',
      icon: 'ri-login-box-line',
      color: 'from-green-600 to-green-700',
      url: '#',
    },
    {
      id: 3,
      title: 'Benefits Summary',
      description: 'Overview of employee benefits',
      icon: 'ri-gift-line',
      color: 'from-purple-600 to-purple-700',
      url: '#',
    },
    {
      id: 4,
      title: 'Training Calendar',
      description: 'Upcoming training sessions',
      icon: 'ri-calendar-event-line',
      color: 'from-orange-600 to-orange-700',
      url: '#',
    },
    {
      id: 5,
      title: 'Contact HR',
      description: 'Get in touch with HR team',
      icon: 'ri-customer-service-line',
      color: 'from-red-600 to-red-700',
      url: '#',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-800 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-lg">
          <i className="ri-links-line text-white text-xl"></i>
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Helpful Links</h2>
        </div>
      </div>

      <div className="space-y-2">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            className="block p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg border border-gray-700 hover:border-yellow-600/50 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 flex items-center justify-center bg-gradient-to-br ${link.color} rounded-lg flex-shrink-0`}>
                <i className={`${link.icon} text-white text-lg`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white group-hover:text-yellow-500 transition-colors duration-300">
                  {link.title}
                </h3>
                <p className="text-xs text-gray-400">{link.description}</p>
              </div>
              <i className="ri-arrow-right-line text-gray-400 group-hover:text-yellow-500 transition-colors duration-300"></i>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

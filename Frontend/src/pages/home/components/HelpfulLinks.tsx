export default function HelpfulLinks() {
  const links = [
    { id: 1, title: 'Market & Communication Guidelines', icon: 'ri-book-line', url: '#' },
    { id: 2, title: 'COMs Contact List', icon: 'ri-contacts-line', url: '#' },
    { id: 3, title: 'Organizational History & Corporate Presentation', icon: 'ri-building-line', url: '#' },
    { id: 4, title: 'FUSO Official Website', icon: 'ri-global-line', url: 'https://www.fuso.com' },
    { id: 5, title: 'FUSO Extract', icon: 'ri-file-text-line', url: '#' },
    { id: 6, title: 'OUR Brand', icon: 'ri-award-line', url: '#' },
    { id: 7, title: 'eCommunity', icon: 'ri-community-line', url: '#' },
    { id: 8, title: 'Facility Management', icon: 'ri-building-2-line', url: '#' },
    { id: 9, title: 'Mitsubishi Monitor', icon: 'ri-dashboard-line', url: '#' },
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <i className="ri-links-line text-red-600"></i>
        Helpful Links
      </h3>

      <div className="bg-dark-card border border-dark-border rounded-lg p-4">
        <div className="space-y-2">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : '_self'}
              rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-dark-hover hover:border-red-600/50 border border-transparent transition-all duration-200 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 transition-colors duration-200">
                <i className={`${link.icon} text-lg text-red-600 group-hover:text-white transition-colors duration-200`}></i>
              </div>
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200 flex-1">
                {link.title}
              </span>
              <i className="ri-arrow-right-line text-gray-500 group-hover:text-red-600 transition-colors duration-200"></i>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

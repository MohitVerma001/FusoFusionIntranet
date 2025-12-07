export default function HealthProductivity() {
  const newsItems = [
    {
      date: 'March 13, 2025',
      content: 'Recognized as a Certified Health & Productivity Management Organization 2025 (Large Enterprise Category) by the Ministry of Economy, Trade and Industry and the Nippon Kenko Kaigi.',
    },
    {
      date: 'January 20, 2025',
      content: 'Hosted a Health Promotion Talk',
    },
    {
      date: 'July 26, 2024',
      content: 'Our official Health & Productivity Management logo was finalized.',
    },
    {
      date: 'November 2023',
      content: 'Launched eLearning programs on health and productivity management for all employees.',
    },
    {
      date: 'October 13, 2023',
      content: 'Held the first training session for Health Promotion Ambassadors.',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-800 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-green-600 to-green-700 rounded-lg">
          <i className="ri-heart-pulse-line text-white text-xl"></i>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Health & Productivity Management</h2>
          <p className="text-sm text-gray-400">Empowering Employee Well-being for Sustainable Corporate Growth</p>
        </div>
      </div>

      {/* Official Website Link */}
      <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
          <i className="ri-global-line text-green-500"></i>
          Official Website
        </h3>
        <a
          href="#"
          className="text-sm text-blue-400 hover:text-blue-300 underline cursor-pointer"
        >
          Health & Productivity Management page at MFTBC official site
        </a>
      </div>

      {/* Intranet Page Link */}
      <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
          <i className="ri-building-line text-green-500"></i>
          Intranet Page
        </h3>
        <p className="text-sm text-gray-300 mb-2">
          "Supporting You at Work and Beyond: The Role of the Health Care Center"
        </p>
        <a
          href="#"
          className="text-sm text-blue-400 hover:text-blue-300 underline cursor-pointer"
        >
          Mitsubishi Fuso Truck and Bus Corporation: Supporting You at Work and Beyond
        </a>
      </div>

      {/* News Section */}
      <div className="mb-4">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <i className="ri-newspaper-line text-green-500"></i>
          News
        </h3>
        <div className="space-y-3">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className="p-3 bg-gray-800/30 hover:bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-green-600/50 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 mb-1">{item.date}</p>
                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                    {item.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* More Details Link */}
      <div className="pt-4 border-t border-gray-700">
        <button className="text-sm text-red-500 hover:text-red-400 font-medium flex items-center gap-2 cursor-pointer whitespace-nowrap">
          <span>Click here for more details</span>
          <i className="ri-arrow-right-line"></i>
        </button>
      </div>
    </div>
  );
}

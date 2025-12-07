export default function HRCafe() {
  const cafeItems = [
    {
      id: 1,
      title: 'Menu: Scheme',
      description: 'The "Scheme" menu will introduce various HR schemes that Mitsubishi Fuso employees should know by easy-to-understand articles.',
      image: 'https://readdy.ai/api/search-image?query=modern%20office%20workspace%20with%20documents%20and%20charts%20showing%20employee%20benefits%20schemes%20in%20professional%20corporate%20environment%20with%20clean%20minimalist%20background&width=400&height=300&seq=hr-cafe-scheme-1&orientation=landscape',
      icon: 'ri-file-list-3-line',
      color: 'from-blue-600 to-blue-700',
    },
    {
      id: 2,
      title: 'Menu: Career',
      description: 'The "Career" menu will regularly introduce the departments and jobs in MFTBC.',
      image: 'https://readdy.ai/api/search-image?query=professional%20career%20development%20concept%20with%20ladder%20and%20growth%20symbols%20in%20modern%20corporate%20office%20setting%20with%20clean%20minimalist%20background&width=400&height=300&seq=hr-cafe-career-1&orientation=landscape',
      icon: 'ri-briefcase-line',
      color: 'from-purple-600 to-purple-700',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-800 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg">
          <i className="ri-cup-line text-white text-xl"></i>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">HR Cafe</h2>
          <p className="text-sm text-gray-400">Explore HR schemes and career opportunities</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cafeItems.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 hover:border-red-600/50 transition-all duration-300 cursor-pointer group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-gradient-to-br ${item.color} rounded-lg shadow-lg`}>
                <i className={`${item.icon} text-white text-lg`}></i>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold mb-2 group-hover:text-red-500 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-3">
                {item.description}
              </p>
              <button className="text-sm text-red-500 hover:text-red-400 font-medium flex items-center gap-1 cursor-pointer whitespace-nowrap">
                <span>Learn More</span>
                <i className="ri-arrow-right-line"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

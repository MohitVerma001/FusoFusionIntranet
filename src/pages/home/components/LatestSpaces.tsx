export default function LatestSpaces() {
  const spaces = [
    {
      id: 1,
      name: 'Engineering Hub',
      description: 'Collaborative space for engineering teams to share knowledge and innovations',
      members: 156,
      posts: 342,
      icon: 'ri-tools-line',
      color: 'from-blue-600 to-blue-700',
    },
    {
      id: 2,
      name: 'Marketing Central',
      description: 'Marketing strategies, campaigns, and creative resources',
      members: 89,
      posts: 218,
      icon: 'ri-megaphone-line',
      color: 'from-purple-600 to-purple-700',
    },
    {
      id: 3,
      name: 'Innovation Lab',
      description: 'Explore new ideas, technologies, and future projects',
      members: 124,
      posts: 287,
      icon: 'ri-lightbulb-line',
      color: 'from-yellow-600 to-orange-600',
    },
    {
      id: 4,
      name: 'HR Connect',
      description: 'Human resources updates, policies, and employee support',
      members: 203,
      posts: 456,
      icon: 'ri-team-line',
      color: 'from-green-600 to-green-700',
    },
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <i className="ri-layout-grid-line text-red-600"></i>
          Latest Spaces
        </h2>
        <button className="text-red-600 hover:text-red-500 font-medium flex items-center gap-2 cursor-pointer transition-colors duration-200">
          View All
          <i className="ri-arrow-right-line"></i>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {spaces.map((space) => (
          <div
            key={space.id}
            className="bg-dark-card border border-dark-border rounded-lg p-5 hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/10 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 bg-gradient-to-br ${space.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                <i className={`${space.icon} text-2xl text-white`}></i>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-600 transition-colors duration-200">
                  {space.name}
                </h3>
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                  {space.description}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <i className="ri-user-line text-red-600"></i>
                    {space.members} members
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="ri-file-text-line text-red-600"></i>
                    {space.posts} posts
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

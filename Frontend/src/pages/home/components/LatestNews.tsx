import { Link } from 'react-router-dom';

export default function LatestNews() {
  const newsItems = [
    {
      id: 1,
      title: 'FUSO Announces New Sustainability Initiative for 2025',
      image: 'https://readdy.ai/api/search-image?query=modern%20sustainable%20green%20technology%20innovation%20in%20automotive%20industry%20with%20clean%20energy%20solutions%20eco%20friendly%20manufacturing%20facility%20professional%20corporate%20setting%20simple%20clean%20background&width=400&height=250&seq=homenews001&orientation=landscape',
      author: 'Corporate Communications',
      date: '2024-01-15',
      excerpt: 'FUSO is proud to announce our comprehensive sustainability roadmap aimed at reducing carbon emissions by 40% over the next five years.',
      likes: 234,
      comments: 45,
    },
    {
      id: 2,
      title: 'Q4 2024 Results Exceed Expectations with Record Growth',
      image: 'https://readdy.ai/api/search-image?query=business%20success%20growth%20chart%20analytics%20dashboard%20with%20upward%20trending%20graphs%20professional%20corporate%20financial%20data%20visualization%20modern%20office%20setting%20simple%20clean%20background&width=400&height=250&seq=homenews002&orientation=landscape',
      author: 'Finance Department',
      date: '2024-01-12',
      excerpt: 'Our fourth quarter results demonstrate exceptional performance across all business units, with revenue growth of 18% year-over-year.',
      likes: 189,
      comments: 32,
    },
    {
      id: 3,
      title: 'New R&D Center Opens in Tokyo with Advanced Facilities',
      image: 'https://readdy.ai/api/search-image?query=state%20of%20the%20art%20research%20and%20development%20laboratory%20facility%20with%20modern%20equipment%20advanced%20technology%20workspace%20clean%20professional%20environment%20innovation%20center%20simple%20clean%20background&width=400&height=250&seq=homenews003&orientation=landscape',
      author: 'R&D Division',
      date: '2024-01-10',
      excerpt: 'The new Tokyo R&D Center features cutting-edge laboratories and testing facilities, enabling our engineers to accelerate innovation.',
      likes: 312,
      comments: 67,
    },
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <i className="ri-newspaper-line text-red-600"></i>
          Latest News
        </h2>
        <Link 
          to="/news" 
          className="text-red-600 hover:text-red-500 font-medium flex items-center gap-2 cursor-pointer transition-colors duration-200"
        >
          View All
          <i className="ri-arrow-right-line"></i>
        </Link>
      </div>

      <div className="space-y-4">
        {newsItems.map((news) => (
          <Link
            key={news.id}
            to={`/news/${news.id}`}
            className="block bg-gradient-to-r from-dark-card to-gray-900 rounded-lg overflow-hidden hover:shadow-xl hover:shadow-red-600/20 transition-all duration-300 hover:-translate-y-1 border border-dark-border hover:border-red-600/50 group cursor-pointer"
          >
            <div className="flex gap-4 p-4">
              <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-600 transition-colors duration-200 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                    {news.excerpt}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <i className="ri-user-line text-red-600"></i>
                      {news.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="ri-calendar-line text-red-600"></i>
                      {news.date}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-gray-500 text-sm">
                      <i className="ri-heart-line"></i>
                      {news.likes}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500 text-sm">
                      <i className="ri-chat-3-line"></i>
                      {news.comments}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

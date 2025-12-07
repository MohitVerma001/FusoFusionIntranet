import { useState } from 'react';

export default function VideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const videos = [
    {
      id: 1,
      title: 'FUSO Hydrogen Truck Launch Event',
      thumbnail: 'https://readdy.ai/api/search-image?query=FUSO%20hydrogen%20fuel%20cell%20truck%20launch%20event%20professional%20corporate%20presentation%20modern%20automotive%20technology%20showcase%20red%20and%20black%20branding%20simple%20clean%20background&width=400&height=225&seq=video001&orientation=landscape',
      duration: '5:32',
      views: '12.5K',
      date: '2024-01-15',
    },
    {
      id: 2,
      title: 'Sustainability Journey 2025',
      thumbnail: 'https://readdy.ai/api/search-image?query=sustainable%20green%20technology%20eco%20friendly%20manufacturing%20process%20clean%20energy%20innovation%20corporate%20video%20presentation%20simple%20clean%20background&width=400&height=225&seq=video002&orientation=landscape',
      duration: '8:15',
      views: '8.3K',
      date: '2024-01-12',
    },
    {
      id: 3,
      title: 'Employee Spotlight: Innovation Team',
      thumbnail: 'https://readdy.ai/api/search-image?query=professional%20corporate%20team%20collaboration%20innovation%20workspace%20modern%20office%20environment%20employee%20spotlight%20video%20simple%20clean%20background&width=400&height=225&seq=video003&orientation=landscape',
      duration: '6:45',
      views: '15.2K',
      date: '2024-01-10',
    },
    {
      id: 4,
      title: 'Q4 2024 Company Highlights',
      thumbnail: 'https://readdy.ai/api/search-image?query=corporate%20business%20highlights%20presentation%20professional%20office%20setting%20company%20achievements%20success%20story%20video%20simple%20clean%20background&width=400&height=225&seq=video004&orientation=landscape',
      duration: '10:20',
      views: '20.1K',
      date: '2024-01-08',
    },
  ];

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const currentVideo = videos[currentIndex];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <i className="ri-video-line text-red-600"></i>
        Videos
      </h3>

      <div className="bg-dark-card border border-dark-border rounded-lg overflow-hidden">
        {/* Main Video */}
        <div className="relative group cursor-pointer">
          <img
            src={currentVideo.thumbnail}
            alt={currentVideo.title}
            className="w-full h-56 object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-600/50 group-hover:scale-110 transition-transform duration-300">
              <i className="ri-play-fill text-3xl text-white ml-1"></i>
            </div>
          </div>
          
          {/* Duration Badge */}
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 backdrop-blur-sm text-white text-xs rounded">
            {currentVideo.duration}
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={prevVideo}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <i className="ri-arrow-left-s-line text-xl"></i>
          </button>
          <button
            onClick={nextVideo}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <i className="ri-arrow-right-s-line text-xl"></i>
          </button>
        </div>

        {/* Video Info */}
        <div className="p-4">
          <h4 className="text-white font-semibold mb-2 line-clamp-2">
            {currentVideo.title}
          </h4>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <i className="ri-eye-line text-red-600"></i>
              {currentVideo.views} views
            </span>
            <span className="flex items-center gap-1">
              <i className="ri-calendar-line text-red-600"></i>
              {currentVideo.date}
            </span>
          </div>
        </div>

        {/* Video Thumbnails */}
        <div className="border-t border-dark-border p-3 space-y-2">
          {videos.map((video, index) => (
            <div
              key={video.id}
              onClick={() => setCurrentIndex(index)}
              className={`flex gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-red-600/20 border border-red-600/50'
                  : 'hover:bg-dark-hover'
              }`}
            >
              <div className="relative w-24 h-14 flex-shrink-0 rounded overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-1 right-1 px-1 bg-black/80 text-white text-xs rounded">
                  {video.duration}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-sm text-white font-medium line-clamp-2 mb-1">
                  {video.title}
                </h5>
                <p className="text-xs text-gray-500">{video.views} views</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

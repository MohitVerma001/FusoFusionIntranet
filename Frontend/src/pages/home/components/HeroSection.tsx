import { useState, useEffect } from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  showSearch?: boolean;
}

export default function HeroSection({ title, subtitle, showSearch = true }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
        document.body.classList.add('scrolled');
      } else {
        setIsScrolled(false);
        document.body.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-16 left-0 right-0 z-30 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-b border-dark-border transition-all duration-700 ease-in-out overflow-hidden ${
      isScrolled ? 'h-[20px]' : 'h-[350px]'
    }`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=modern%20corporate%20office%20workspace%20with%20technology%20innovation%20digital%20transformation%20professional%20business%20environment%20sleek%20design%20dark%20elegant%20atmosphere&width=1920&height=400&seq=hero001&orientation=landscape"
          alt="Hero Background"
          className="w-full h-full object-cover object-top opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(220, 38, 38, 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Content */}
      <div className={`relative w-full px-6 py-8 transition-opacity duration-700 ${
        isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-3">
            {title}
          </h1>
          <p className="text-lg text-gray-400 mb-6">
            {subtitle}
          </p>

          {/* Global Search Bar */}
          {showSearch && (
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search news, articles, and updates..."
                  className="w-full px-6 py-4 pl-14 bg-dark-card border border-dark-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
                />
                <i className="ri-search-line absolute left-5 top-1/2 -translate-y-1/2 text-xl text-gray-500"></i>
                <button className="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300 whitespace-nowrap cursor-pointer">
                  Search
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

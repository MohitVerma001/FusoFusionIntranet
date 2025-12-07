import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface SecondaryNavProps {
  userRole?: 'admin' | 'internal' | 'external';
}

export default function SecondaryNav({ userRole = 'internal' }: SecondaryNavProps) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: 'ri-home-5-line' },
    { path: '/news', label: 'News', icon: 'ri-newspaper-line' },
    { path: '/activity', label: 'Activity', icon: 'ri-calendar-event-line' },
    { path: '/crossfunction', label: 'Crossfunction', icon: 'ri-group-line' },
    { path: '/hr', label: 'HR', icon: 'ri-user-heart-line' },
    { path: '/my-content', label: 'My Content', icon: 'ri-folder-user-line' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav 
      className={`fixed left-0 right-0 z-40 transition-all duration-700 ease-in-out ${
        isScrolled 
          ? 'top-16 bg-[#0f0f0f]/95 backdrop-blur-lg shadow-lg shadow-red-600/5' 
          : 'top-[366px] bg-[#0f0f0f]/80 backdrop-blur-md'
      }`}
    >
      <div className="w-full px-6">
        <div className="flex items-center justify-center gap-2 h-14">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative px-5 py-2 flex items-center gap-2 font-medium transition-all duration-300 cursor-pointer whitespace-nowrap group ${
                isActive(item.path)
                  ? 'text-red-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <i className={`${item.icon} text-base ${
                isActive(item.path) 
                  ? 'text-red-500' 
                  : 'text-gray-500 group-hover:text-red-500'
              } transition-colors duration-300`}></i>
              <span className="text-sm">{item.label}</span>
              
              {/* Active indicator - bottom border */}
              <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300 ${
                isActive(item.path) ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
              }`}></span>
              
              {/* Hover background */}
              <span className={`absolute inset-0 bg-red-600/5 rounded-lg transition-all duration-300 ${
                isActive(item.path) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}></span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

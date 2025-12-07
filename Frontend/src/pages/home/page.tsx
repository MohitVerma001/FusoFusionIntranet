import { useState, useEffect } from 'react';
import GlobalNav from '../../components/feature/GlobalNav';
import SecondaryNav from '../../components/feature/SecondaryNav';
import HeroSection from './components/HeroSection';
import LatestNews from './components/LatestNews';
import CategoryDropdown from './components/CategoryDropdown';
import LatestSpaces from './components/LatestSpaces';
import VideoCarousel from './components/VideoCarousel';
import HelpfulLinks from './components/HelpfulLinks';
import Footer from '../../components/feature/Footer';

export default function Home() {
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

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Global Navigation */}
      <GlobalNav userRole="admin" />

      {/* Hero Section */}
      <HeroSection 
        title="Welcome to Fusion Intranet"
        subtitle="Your central hub for news, collaboration, and knowledge sharing"
      />

      {/* Secondary Navigation - Always visible, moves up on scroll */}
      <SecondaryNav userRole="admin" />

      {/* Main Content */}
      <div className={`transition-all duration-700 ${isScrolled ? 'pt-32' : 'pt-[430px]'}`}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Latest News */}
              <LatestNews />

              {/* SEICHOU Stories */}
              <CategoryDropdown
                title="SEICHOU Stories"
                icon="ri-book-open-line"
                gradientFrom="from-red-600"
                gradientTo="to-orange-600"
              />

              {/* Kizuna Talks */}
              <CategoryDropdown
                title="Kizuna Talks"
                icon="ri-chat-voice-line"
                gradientFrom="from-purple-600"
                gradientTo="to-pink-600"
              />

              {/* Latest Spaces */}
              <LatestSpaces />
            </div>

            {/* Right Side - Sidebar */}
            <div className="space-y-8">
              {/* Video Carousel */}
              <VideoCarousel />

              {/* Helpful Links */}
              <HelpfulLinks />
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

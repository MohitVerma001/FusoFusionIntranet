import { useState, useEffect } from 'react';
import GlobalNav from '../../components/feature/GlobalNav';
import SecondaryNav from '../../components/feature/SecondaryNav';
import HeroSection from '../home/components/HeroSection';
import Footer from '../../components/feature/Footer';
import WelcomeSection from './components/WelcomeSection';
import HRAnnouncements from './components/HRAnnouncements';
import HRCafe from './components/HRCafe';
import HealthProductivity from './components/HealthProductivity';
import HRCategories from './components/HRCategories';
import InternalJobPostings from './components/InternalJobPostings';
import WhatShouldIDo from './components/WhatShouldIDo';
import HelpfulLinksHR from './components/HelpfulLinksHR';

export default function HRPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

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

  const filters = [
    { id: 'all', label: 'All', icon: 'ri-apps-line' },
    { id: 'announcements', label: 'Announcements', icon: 'ri-megaphone-line' },
    { id: 'policies', label: 'Policies', icon: 'ri-file-list-3-line' },
    { id: 'benefits', label: 'Benefits', icon: 'ri-heart-line' },
    { id: 'training', label: 'Training', icon: 'ri-graduation-cap-line' },
  ];

  // Determine which sections to show based on filter
  const shouldShowSection = (sectionType: string) => {
    if (selectedFilter === 'all') return true;
    
    const sectionMap: { [key: string]: string[] } = {
      'announcements': ['welcome', 'announcements'],
      'policies': ['categories', 'whatshouldi'],
      'benefits': ['health', 'helpfullinks'],
      'training': ['cafe', 'categories']
    };
    
    return sectionMap[selectedFilter]?.includes(sectionType) || false;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Global Navigation */}
      <GlobalNav userRole="admin" />

      {/* Hero Section with Collapse */}
      <div className={`relative overflow-hidden transition-all duration-700 ease-in-out ${
        isScrolled ? 'h-[20px]' : 'h-[350px]'
      }`}>
        <div className={`absolute inset-0 transition-opacity duration-700 ${
          isScrolled ? 'opacity-0' : 'opacity-100'
        }`}>
          <HeroSection 
            title="HR - Human Resources"
            subtitle="Your comprehensive HR portal for policies, benefits, and employee services"
          />
        </div>
      </div>

      {/* Secondary Navigation */}
      <SecondaryNav userRole="admin" />

      {/* Main Content */}
      <div className="pt-6">
        {/* Filters Bar */}
        <div className="sticky top-16 z-30 bg-black/95 backdrop-blur-lg border-b border-gray-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 flex items-center gap-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    selectedFilter === filter.id
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30'
                      : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <i className={`${filter.icon} text-lg`}></i>
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Main Content (2/3) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Welcome Section */}
              {shouldShowSection('welcome') && <WelcomeSection />}

              {/* HR Announcements */}
              {shouldShowSection('announcements') && <HRAnnouncements />}

              {/* HR Cafe */}
              {shouldShowSection('cafe') && <HRCafe />}

              {/* Health & Productivity Management */}
              {shouldShowSection('health') && <HealthProductivity />}

              {/* HR Categories */}
              {shouldShowSection('categories') && <HRCategories />}
            </div>

            {/* Right Side - Sidebar (1/3) */}
            <div className="space-y-8">
              {/* Internal Job Postings */}
              {shouldShowSection('jobs') && <InternalJobPostings />}

              {/* What Should I Do */}
              {shouldShowSection('whatshouldi') && <WhatShouldIDo />}

              {/* Helpful Links */}
              {shouldShowSection('helpfullinks') && <HelpfulLinksHR />}
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

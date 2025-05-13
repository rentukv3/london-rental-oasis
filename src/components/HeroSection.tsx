
import React from 'react';
import { SearchCriteria } from '@/types';
import PropertySearch from './PropertySearch';

interface HeroSectionProps {
  onSearch: (criteria: SearchCriteria) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  return (
    <div className="relative bg-gray-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="bg-london-skyline bg-cover bg-center h-full w-full opacity-40"></div>
      </div>
      
      <div className="relative z-10">
        {/* Wave shape at the bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-white">
            <path fill="currentColor" fillOpacity="1" d="M0,256L80,261.3C160,267,320,277,480,261.3C640,245,800,203,960,197.3C1120,192,1280,224,1360,240L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Find Your Perfect{" "}
              <span className="text-rent-blue-light">London</span>{" "}
              Home
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-12">
              The premium platform for renting apartments, rooms, and shared houses in London,
              tailored for young professionals and families.
            </p>
            
            <div className="flex justify-center space-x-4 mb-8">
              <a href="#search" className="bg-rent-blue hover:bg-rent-blue-light text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Start Your Search
              </a>
              <a href="/how-it-works" className="bg-white text-rent-blue hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors">
                How It Works
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-6 max-w-3xl mx-auto relative z-20" id="search">
            <PropertySearch onSearch={onSearch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

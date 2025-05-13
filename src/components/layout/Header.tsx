
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../ui/logo';
import { Button } from '@/components/ui/button';
import { LogIn, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleLogin = () => {
    // Handle login logic here
    console.log('Login button clicked');
  };
  
  const handlePublish = () => {
    // Handle publish property logic here
    console.log('Publish property button clicked');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="border-b bg-white sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium ${isActive('/') ? 'text-rent-blue' : 'text-gray-700 hover:text-rent-blue'}`}
            >
              Home
            </Link>
            <Link 
              to="/properties" 
              className={`font-medium ${isActive('/properties') ? 'text-rent-blue' : 'text-gray-700 hover:text-rent-blue'}`}
            >
              Properties
            </Link>
            <Link 
              to="/how-it-works" 
              className={`font-medium ${isActive('/how-it-works') ? 'text-rent-blue' : 'text-gray-700 hover:text-rent-blue'}`}
            >
              How it Works
            </Link>
            <Link 
              to="/faq" 
              className={`font-medium ${isActive('/faq') ? 'text-rent-blue' : 'text-gray-700 hover:text-rent-blue'}`}
            >
              FAQ
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium ${isActive('/contact') ? 'text-rent-blue' : 'text-gray-700 hover:text-rent-blue'}`}
            >
              Contact
            </Link>
          </nav>
          
          {/* Desktop action buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={handleLogin} 
              className="flex items-center gap-2 border-rent-blue text-rent-blue hover:bg-rent-blue hover:text-white"
            >
              <LogIn size={16} />
              <span>Log In</span>
            </Button>
            
            <Button 
              onClick={handlePublish}
              className="bg-rent-blue hover:bg-rent-blue-light text-white"
            >
              Publish Property
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`font-medium ${isActive('/') ? 'text-rent-blue' : 'text-gray-700'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/properties" 
                className={`font-medium ${isActive('/properties') ? 'text-rent-blue' : 'text-gray-700'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Properties
              </Link>
              <Link 
                to="/how-it-works" 
                className={`font-medium ${isActive('/how-it-works') ? 'text-rent-blue' : 'text-gray-700'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                How it Works
              </Link>
              <Link 
                to="/faq" 
                className={`font-medium ${isActive('/faq') ? 'text-rent-blue' : 'text-gray-700'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                to="/contact" 
                className={`font-medium ${isActive('/contact') ? 'text-rent-blue' : 'text-gray-700'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              <div className="pt-4 mt-4 border-t border-gray-200 flex flex-col space-y-3">
                <Button 
                  variant="outline" 
                  onClick={handleLogin} 
                  className="w-full justify-center border-rent-blue text-rent-blue hover:bg-rent-blue hover:text-white"
                >
                  <LogIn size={16} className="mr-2" />
                  Log In
                </Button>
                
                <Button 
                  onClick={handlePublish}
                  className="w-full justify-center bg-rent-blue hover:bg-rent-blue-light text-white"
                >
                  Publish Property
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;


import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../ui/logo';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
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

  return (
    <header className="border-b bg-white sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />
        
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
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={handleLogin} 
            className="hidden sm:flex items-center gap-2 border-rent-blue text-rent-blue hover:bg-rent-blue hover:text-white"
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
    </header>
  );
};

export default Header;

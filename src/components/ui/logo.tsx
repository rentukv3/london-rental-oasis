
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-1">
      <span className="text-2xl font-bold">rent<span className="text-rent-blue">in</span><span className="text-rent-blue">london</span></span>
    </Link>
  );
};

export default Logo;

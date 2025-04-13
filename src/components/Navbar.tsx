
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Home, Plus } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm py-4 px-4 md:px-6 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
        <img
            src='/images/fund.png'
            alt="FundMyProject Logo"
            className="h-10 w-10 rounded-md object-cover"
          />
          <span className="text-xl font-bold text-gray-800">FundMyProject</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/">
            <Button variant="ghost">Explore</Button>
          </Link>
          <Link to="/create">
            <Button className="flex items-center gap-1">
              <Plus size={16} />
              <span>Start a Campaign</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

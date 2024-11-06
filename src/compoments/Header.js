import React from 'react';
import { Search, ShoppingCart, Heart, User, Menu,  ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Upper Header */}
        <div className="flex items-center justify-between py-4 border-b">
          <div className="flex items-center gap-2">
            <Menu className="h-6 w-6 text-gray-600 cursor-pointer" />
            <h1 className="text-2xl font-bold text-blue-600" onClick={() => navigate('/home')}>CHICIFY</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full py-2 px-4 pr-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">
          <div className='relative'>
            <span 
             className="absolute -right-2 -top-4 bg-gray-600 text-white text-sm font-semibold 
             rounded-full w-8 h-8 flex items-center justify-center shadow-lg 
             cursor-pointer hover:bg-red-700 transition-transform transform hover:scale-90"
            onClick={() => navigate('/model')}>3D</span>
            </div>
            <Heart className="h-6 w-6 text-gray-600 cursor-pointer hover:text-blue-600" />
            <div className="relative">
              <ShoppingCart
                className="h-6 w-6 text-gray-600 cursor-pointer hover:text-blue-600"
                onClick={() => navigate('/cart')} // Navigate to cart page
              />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </div>
            <User className="h-6 w-6 text-gray-600 cursor-pointer hover:text-blue-600"
            onClick={() => navigate('/profile')} />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center justify-center py-3">
          <ul className="flex gap-8">
            {['New Arrivals', 'Women', 'Men', 'Accessories', 'Sale'].map((item) => (
              <li key={item}>
                <button href="#" className="text-gray-600 hover:text-blue-600 font-medium flex items-center gap-1">
                  {item}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

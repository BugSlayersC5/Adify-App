// Navbar Component (No changes needed here, it relies on AuthContext)
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, LogOut, Sun, Moon, PlusCircle, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Assuming this path is correct
import { useTheme } from '../context/ThemeContext'; // Assuming this path is correct

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth(); // `user` object will now correctly contain `role` and `username`
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle user logout
  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false); // Close mobile menu on logout
    setShowUserMenu(false); // Close user dropdown on logout
    localStorage.removeItem("ACCESS_TOKEN");
  };

  // Determine the correct dashboard link based on user role
  const getDashboardLink = () => {
    // If the user is a vendor, direct them to the vendor dashboard
    if (user?.role === 'vendor') return '/vendor-dashboard';
    // For any other authenticated user (regular user), direct to the general dashboard
    return '/user-dashboard';
  };

  // Helper function to check if a link is currently active
  const isActive = (path) => location.pathname === path;
  

  return (
    <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Site Title */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold gradient-text">ADIFY</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Browse Ads Link */}
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              Browse Ads
            </Link>

            {/* Conditional Links based on User Authentication */}
            {user ? (
              <>
                {/* Vendor Specific Links */}
                {user.role === 'vendor' && (
                  <>
                    <Link
                      to="/post-advert"
                      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive('/vendor/post')
                          ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                    >
                      <PlusCircle className="h-4 w-4" />
                      <span>Post Ad</span>
                    </Link>
                    <Link
                      to="/manage-adverts"
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive('/manage-adverts')
                          ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                    >
                      Manage Ads
                    </Link>
                  </>
                )}

                {/* User Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <User className="h-5 w-5" />
                    {/* Display user's username (first name + last name) */}
                    <span className="text-sm font-medium">{user.username}</span>
                  </button>

                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-700">
                      <Link
                        to={getDashboardLink()}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-left" // Added text-left for consistency
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // Links for Non-Authenticated Users
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary" // Assuming btn-primary is a Tailwind class defined elsewhere
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/')
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Browse Ads
            </Link>

            {/* Conditional Mobile Links based on User Authentication */}
            {user ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>

                {/* Vendor Specific Mobile Links */}
                {user.role === 'vendor' && (
                  <>
                    <Link
                      to="/vendor/post"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300"
                      onClick={() => setIsOpen(false)}
                    >
                      Post Ad
                    </Link>
                    <Link
                      to="/vendor/manage"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300"
                      onClick={() => setIsOpen(false)}
                    >
                      Manage Ads
                    </Link>
                  </>
                )}

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300"
                >
                  Logout
                </button>
              </>
            ) : (
              // Mobile Links for Non-Authenticated Users
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
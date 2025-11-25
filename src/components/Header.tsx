import { ShoppingCart, Search, Menu, User, BookOpen, GraduationCap, MoreVertical, Settings, HelpCircle, LogOut } from 'lucide-react';
import { UserMenu } from './UserMenu';
import { SearchBar } from './SearchBar';
import { useState } from 'react';

export function Header({ cartCount, onCartClick, onLogoClick, user, onSignInClick, onSignUpClick, onSignOut, courses, onCourseSelect }) {
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <button 
            onClick={onLogoClick}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <div className="bg-gradient-to-r from-cyan-500 to-teal-600 p-2 rounded-lg">
              <GraduationCap className="text-white" size={24} />
            </div>
            <span className="text-xl bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent">Edureka</span>
          </button>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <SearchBar courses={courses} onCourseSelect={onCourseSelect} />
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <a href="#" className="text-gray-700 hover:text-cyan-600 transition">
              Courses
            </a>
            <a href="#" className="text-gray-700 hover:text-cyan-600 transition">
              Categories
            </a>
            <a href="#" className="text-gray-700 hover:text-cyan-600 transition">
              About
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition lg:hidden">
              <Search size={20} />
            </button>
            
            <button 
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <UserMenu user={user} onSignOut={onSignOut} />
            ) : (
              <>
                <button 
                  onClick={onSignInClick}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                >
                  <User size={18} />
                  <span>Sign In</span>
                </button>

                <button 
                  onClick={onSignUpClick}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-600 text-white rounded-lg hover:opacity-90 transition"
                >
                  Sign Up
                </button>
              </>
            )}

            <div className="relative">
              <button 
                onClick={() => setShowOptionsMenu(!showOptionsMenu)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <MoreVertical size={20} />
              </button>

              {showOptionsMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowOptionsMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50 py-2">
                    <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition">
                      <Settings size={18} />
                      <span>Settings</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition">
                      <HelpCircle size={18} />
                      <span>Help Center</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition">
                      <Menu size={18} />
                      <span>My Courses</span>
                    </a>
                    {user && (
                      <>
                        <div className="border-t my-2"></div>
                        <button 
                          onClick={() => {
                            onSignOut();
                            setShowOptionsMenu(false);
                          }}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition w-full text-left text-red-600"
                        >
                          <LogOut size={18} />
                          <span>Sign Out</span>
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <SearchBar courses={courses} onCourseSelect={onCourseSelect} />
        </div>
      </div>
    </header>
  );
}

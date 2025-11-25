import { useState, useRef, useEffect } from 'react';
import { User, LogOut, BookOpen, Settings, Heart } from 'lucide-react';

export function UserMenu({ user, onSignOut }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center text-white text-sm">
          {getInitials(user.name)}
        </div>
        <span className="hidden md:block">{user.name.split(' ')[0]}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border py-2 z-50">
          <div className="px-4 py-3 border-b">
            <p className="text-sm text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>

          <div className="py-2">
            <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition flex items-center gap-3">
              <BookOpen size={18} className="text-gray-600" />
              <span>My Courses</span>
            </button>
            <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition flex items-center gap-3">
              <Heart size={18} className="text-gray-600" />
              <span>Wishlist</span>
            </button>
            <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition flex items-center gap-3">
              <Settings size={18} className="text-gray-600" />
              <span>Settings</span>
            </button>
          </div>

          <div className="border-t pt-2">
            <button
              onClick={onSignOut}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 transition flex items-center gap-3 text-red-600"
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

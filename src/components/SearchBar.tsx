import { useState, useRef, useEffect } from 'react';
import { Search, Clock, TrendingUp } from 'lucide-react';

export function SearchBar({ courses, onCourseSelect }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCourses = query.trim()
    ? courses.filter(course => 
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.instructor.toLowerCase().includes(query.toLowerCase()) ||
        course.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  const popularCourses = courses
    .sort((a, b) => b.students - a.students)
    .slice(0, 4);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleCourseClick = (course) => {
    onCourseSelect(course);
    setQuery('');
    setIsOpen(false);
    setIsFocused(false);
  };

  const showDropdown = (isOpen || isFocused) && (query.trim() || !query);

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            setIsFocused(true);
            setIsOpen(true);
          }}
          placeholder="Search for courses..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border max-h-96 overflow-y-auto z-50">
          {query.trim() ? (
            <>
              {filteredCourses.length > 0 ? (
                <div className="p-2">
                  <div className="px-3 py-2 text-xs text-gray-500 uppercase">
                    Search Results
                  </div>
                  {filteredCourses.map(course => (
                    <button
                      key={course.id}
                      onClick={() => handleCourseClick(course)}
                      className="w-full flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition text-left"
                    >
                      <div className="w-16 h-12 rounded overflow-hidden flex-shrink-0 bg-gray-200">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm line-clamp-1 mb-1">{course.title}</div>
                        <div className="text-xs text-gray-500">{course.instructor}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-cyan-600">{course.category}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-600">${course.price}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <Search size={48} className="mx-auto mb-3 text-gray-300" />
                  <p>No courses found for "{query}"</p>
                  <p className="text-sm mt-1">Try searching with different keywords</p>
                </div>
              )}
            </>
          ) : (
            <div className="p-2">
              <div className="px-3 py-2 flex items-center gap-2 text-xs text-gray-500 uppercase">
                <TrendingUp size={14} />
                Popular Courses
              </div>
              {popularCourses.map(course => (
                <button
                  key={course.id}
                  onClick={() => handleCourseClick(course)}
                  className="w-full flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition text-left"
                >
                  <div className="w-16 h-12 rounded overflow-hidden flex-shrink-0 bg-gray-200">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm line-clamp-1 mb-1">{course.title}</div>
                    <div className="text-xs text-gray-500">{course.instructor}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-cyan-600">{course.category}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-600">{course.students.toLocaleString()} students</span>
                    </div>
                  </div>
                </button>
              ))}
              
              <div className="border-t mt-2 pt-2 px-3">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <Clock size={14} />
                  Quick Links
                </div>
                <div className="space-y-1">
                  <button className="w-full text-left text-sm px-3 py-2 hover:bg-gray-50 rounded transition">
                    Web Development
                  </button>
                  <button className="w-full text-left text-sm px-3 py-2 hover:bg-gray-50 rounded transition">
                    Data Science
                  </button>
                  <button className="w-full text-left text-sm px-3 py-2 hover:bg-gray-50 rounded transition">
                    Design
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

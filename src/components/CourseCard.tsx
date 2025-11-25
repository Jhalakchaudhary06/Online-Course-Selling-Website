import { Star, Users, Clock, ShoppingCart, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CourseCard({ course, onClick, onAddToCart, isInCart }) {
  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(course);
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition cursor-pointer group"
    >
      <div className="relative overflow-hidden aspect-video">
        <ImageWithFallback
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm">
          Best Seller
        </div>
      </div>
      
      <div className="p-5">
        <div className="text-sm text-cyan-600 mb-2">{course.category}</div>
        
        <h3 className="mb-2 line-clamp-2 group-hover:text-cyan-600 transition">
          {course.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>
        
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="text-yellow-400 fill-yellow-400" size={16} />
            <span>{course.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{course.students.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{course.duration}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl text-gray-900">${course.price}</span>
              {course.originalPrice && (
                <span className="text-gray-400 line-through">
                  ${course.originalPrice}
                </span>
              )}
            </div>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`p-2 rounded-lg transition ${
              isInCart
                ? 'bg-green-100 text-green-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-teal-600 text-white hover:opacity-90'
            }`}
          >
            {isInCart ? <Check size={20} /> : <ShoppingCart size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}

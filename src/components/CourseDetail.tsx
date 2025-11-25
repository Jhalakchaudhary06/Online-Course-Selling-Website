import { ArrowLeft, Star, Users, Clock, BarChart, PlayCircle, FileText, Award, Check, ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CourseDetail({ course, onBack, onAddToCart, onBuyNow, isInCart }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition"
          >
            <ArrowLeft size={20} />
            Back to Courses
          </button>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="inline-block bg-yellow-400 text-gray-900 px-3 py-1 rounded text-sm mb-3">
                Best Seller
              </div>
              <h1 className="mb-4">{course.title}</h1>
              <p className="text-xl text-gray-300 mb-4">{course.description}</p>
              
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-400 fill-yellow-400" size={18} />
                  <span>{course.rating} rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
              </div>
              
              <p className="text-gray-300">Created by {course.instructor}</p>
            </div>
            
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg overflow-hidden text-gray-900 sticky top-24">
                <div className="relative aspect-video">
                  <ImageWithFallback
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition">
                    <div className="bg-white rounded-full p-4">
                      <PlayCircle className="text-cyan-600" size={32} />
                    </div>
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">${course.price}</span>
                    {course.originalPrice && (
                      <span className="text-gray-400 line-through text-xl">
                        ${course.originalPrice}
                      </span>
                    )}
                    {course.originalPrice && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                        {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => onAddToCart(course)}
                    disabled={isInCart}
                    className={`w-full py-3 rounded-lg mb-3 transition ${
                      isInCart
                        ? 'bg-green-600 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-cyan-500 to-teal-600 text-white hover:opacity-90'
                    }`}
                  >
                    {isInCart ? (
                      <span className="flex items-center justify-center gap-2">
                        <Check size={20} />
                        Added to Cart
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <ShoppingCart size={20} />
                        Add to Cart
                      </span>
                    )}
                  </button>
                  
                  <button 
                    onClick={() => onBuyNow(course)}
                    className="w-full py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition"
                  >
                    Buy Now
                  </button>
                  
                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Clock size={18} />
                      <span>{course.duration} on-demand video</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText size={18} />
                      <span>{course.lessons} lectures</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BarChart size={18} />
                      <span>{course.level} level</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award size={18} />
                      <span>Certificate of completion</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* What you'll learn */}
            <div className="bg-white rounded-lg p-6 border">
              <h2 className="mb-4">What you'll learn</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {course.whatYouLearn.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <Check className="text-green-600 flex-shrink-0" size={20} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Course Content */}
            <div className="bg-white rounded-lg p-6 border">
              <h2 className="mb-4">Course Content</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span>12 sections</span>
                <span>•</span>
                <span>{course.lessons} lectures</span>
                <span>•</span>
                <span>{course.duration} total length</span>
              </div>
              
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((section) => (
                  <details key={section} className="border rounded-lg">
                    <summary className="p-4 cursor-pointer hover:bg-gray-50 transition">
                      <div className="flex items-center justify-between">
                        <span>Section {section}: Getting Started</span>
                        <span className="text-sm text-gray-600">{Math.floor(Math.random() * 10) + 5} lectures • {Math.floor(Math.random() * 3) + 1}h {Math.floor(Math.random() * 60)}m</span>
                      </div>
                    </summary>
                    <div className="px-4 pb-4 space-y-2">
                      {[1, 2, 3].map((lecture) => (
                        <div key={lecture} className="flex items-center justify-between py-2 text-sm">
                          <div className="flex items-center gap-2">
                            <PlayCircle size={16} className="text-gray-400" />
                            <span>Lecture {lecture}: Introduction</span>
                          </div>
                          <span className="text-gray-600">{Math.floor(Math.random() * 15) + 5}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}</span>
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>
            
            {/* Requirements */}
            <div className="bg-white rounded-lg p-6 border">
              <h2 className="mb-4">Requirements</h2>
              <ul className="space-y-2 list-disc list-inside text-gray-700">
                <li>No prior experience required - we'll teach you everything you need to know</li>
                <li>A computer with internet access</li>
                <li>Willingness to learn and practice</li>
              </ul>
            </div>
            
            {/* Description */}
            <div className="bg-white rounded-lg p-6 border">
              <h2 className="mb-4">Description</h2>
              <div className="text-gray-700 space-y-4">
                <p>{course.description}</p>
                <p>
                  This comprehensive course is designed to take you from a complete beginner to a professional level. 
                  With hands-on projects and real-world examples, you'll gain the practical skills needed to succeed in today's market.
                </p>
                <p>
                  Our experienced instructor will guide you through every step of the learning process, ensuring you understand 
                  each concept thoroughly before moving on to the next topic.
                </p>
              </div>
            </div>
            
            {/* Instructor */}
            <div className="bg-white rounded-lg p-6 border">
              <h2 className="mb-4">Instructor</h2>
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white text-2xl">
                  {course.instructor.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="mb-1">{course.instructor}</h3>
                  <p className="text-gray-600 mb-3">Expert {course.category} Instructor</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-400 fill-yellow-400" size={16} />
                      <span>4.8 Instructor Rating</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>50,000+ Students</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

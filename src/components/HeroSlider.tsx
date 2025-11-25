import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1758874573138-f3dd1ed25c7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwb25saW5lfGVufDF8fHx8MTc2MzkzMTQxOHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Learn Without Limits",
    subtitle: "Start, switch, or advance your career with thousands of courses from industry experts",
    cta: "Get Started"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1758520144424-2e04f4ad7f60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBqb2IlMjBpbnRlcnZpZXclMjBzdWNjZXNzfGVufDF8fHx8MTc2NDAzODkyMXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Launch Your Dream Career",
    subtitle: "Join thousands of students who landed their dream jobs after completing our courses",
    cta: "Explore Careers"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1628763448616-5d81ad40b1fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHdvcmtpbmclMjBsYXB0b3AlMjBjb2ZmZWV8ZW58MXx8fHwxNzY0MDM4OTIyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Learn Anywhere, Anytime",
    subtitle: "Study at your own pace with flexible online courses designed for busy professionals",
    cta: "Start Learning"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1739298061740-5ed03045b280?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NjQwMDc0ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Build Real-World Skills",
    subtitle: "Work on hands-on projects and collaborate with peers to gain practical experience",
    cta: "View Projects"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1762438136374-b2fe754053f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0ZSUyMGNlbGVicmF0aW9uJTIwc3VjY2Vzc3xlbnwxfHx8fDE3NjQwMzg5MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Achieve Your Goals",
    subtitle: "Get certified and celebrate your success with recognized credentials from industry leaders",
    cta: "Get Certified"
  }
];

export function HeroSlider({ onLearnMoreClick, onGetCertifiedClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleCtaClick = (cta) => {
    if (cta === "Get Certified" && onGetCertifiedClick) {
      onGetCertifiedClick();
    }
  };

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <ImageWithFallback
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          </div>

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-100">
                {slide.subtitle}
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => handleCtaClick(slide.cta)}
                  className="bg-gradient-to-r from-cyan-500 to-teal-600 text-white px-8 py-3 rounded-lg hover:opacity-90 transition"
                >
                  {slide.cta}
                </button>
                <button 
                  onClick={onLearnMoreClick}
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/20 transition"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition z-10"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? 'w-8 h-2 bg-white'
                : 'w-2 h-2 bg-white/50 hover:bg-white/75'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

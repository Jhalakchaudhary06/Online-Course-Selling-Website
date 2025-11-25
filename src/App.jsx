import { useState, useRef } from 'react';
import { Header } from './components/Header';
import { CourseCard } from './components/CourseCard';
import { CourseDetail } from './components/CourseDetail';
import { Cart } from './components/Cart';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { HeroSlider } from './components/HeroSlider';
import { PaymentGateway } from './components/PaymentGateway';

const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    price: 49.99,
    originalPrice: 199.99,
    rating: 4.8,
    students: 15420,
    duration: "42 hours",
    level: "Beginner",
    category: "Web Development",
    description: "Learn web development from scratch with HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and launch your career as a web developer.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    lessons: 312,
    whatYouLearn: [
      "Build modern responsive websites",
      "Master React and Node.js",
      "Create full-stack applications",
      "Deploy projects to production"
    ]
  },
  {
    id: 2,
    title: "Python for Data Science & Machine Learning",
    instructor: "Dr. Michael Chen",
    price: 59.99,
    originalPrice: 179.99,
    rating: 4.9,
    students: 23150,
    duration: "38 hours",
    level: "Intermediate",
    category: "Data Science",
    description: "Master Python programming, data analysis, visualization, and machine learning algorithms. Work with real datasets and build predictive models.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    lessons: 285,
    whatYouLearn: [
      "Python programming fundamentals",
      "Data analysis with Pandas",
      "Machine learning algorithms",
      "Build predictive models"
    ]
  },
  {
    id: 3,
    title: "Digital Marketing Masterclass",
    instructor: "Emma Thompson",
    price: 39.99,
    originalPrice: 149.99,
    rating: 4.7,
    students: 18730,
    duration: "28 hours",
    level: "Beginner",
    category: "Marketing",
    description: "Learn SEO, social media marketing, email marketing, content strategy, and analytics. Grow your business or start a career in digital marketing.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    lessons: 198,
    whatYouLearn: [
      "SEO and content marketing",
      "Social media strategies",
      "Email marketing campaigns",
      "Analytics and optimization"
    ]
  },
  {
    id: 4,
    title: "UI/UX Design Fundamentals",
    instructor: "Alex Martinez",
    price: 44.99,
    originalPrice: 169.99,
    rating: 4.8,
    students: 12890,
    duration: "32 hours",
    level: "Beginner",
    category: "Design",
    description: "Master the principles of user interface and user experience design. Learn Figma, create beautiful designs, and build a professional portfolio.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
    lessons: 245,
    whatYouLearn: [
      "UI/UX design principles",
      "Figma and design tools",
      "User research methods",
      "Build design portfolio"
    ]
  },
  {
    id: 5,
    title: "iOS App Development with Swift",
    instructor: "James Wilson",
    price: 54.99,
    originalPrice: 189.99,
    rating: 4.7,
    students: 9560,
    duration: "45 hours",
    level: "Intermediate",
    category: "Mobile Development",
    description: "Build native iOS applications using Swift and SwiftUI. Learn iOS development best practices and publish apps to the App Store.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
    lessons: 328,
    whatYouLearn: [
      "Swift programming language",
      "SwiftUI framework",
      "iOS app architecture",
      "Publish to App Store"
    ]
  },
  {
    id: 6,
    title: "Blockchain & Cryptocurrency Essentials",
    instructor: "Dr. Lisa Anderson",
    price: 64.99,
    originalPrice: 199.99,
    rating: 4.6,
    students: 7240,
    duration: "25 hours",
    level: "Advanced",
    category: "Blockchain",
    description: "Understand blockchain technology, smart contracts, and cryptocurrency. Learn to develop decentralized applications and navigate the crypto space.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0",
    lessons: 156,
    whatYouLearn: [
      "Blockchain fundamentals",
      "Smart contract development",
      "Cryptocurrency trading",
      "Build DApps"
    ]
  },
  {
    id: 7,
    title: "Advanced Python: From Zero to Hero",
    instructor: "Dr. Rajesh Kumar",
    price: 44.99,
    originalPrice: 159.99,
    rating: 4.9,
    students: 31200,
    duration: "35 hours",
    level: "Beginner",
    category: "Data Science",
    description: "Complete Python programming course covering basics to advanced topics. Perfect for beginners who want to master Python for data science and automation.",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935",
    lessons: 268,
    whatYouLearn: [
      "Python syntax and fundamentals",
      "Object-oriented programming",
      "Working with APIs and databases",
      "Automation and scripting"
    ]
  },
  {
    id: 8,
    title: "Data Visualization with Python & Tableau",
    instructor: "Jennifer Park",
    price: 52.99,
    originalPrice: 174.99,
    rating: 4.7,
    students: 14580,
    duration: "26 hours",
    level: "Intermediate",
    category: "Data Science",
    description: "Learn to create stunning data visualizations using Python libraries and Tableau. Transform complex data into compelling visual stories.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    lessons: 185,
    whatYouLearn: [
      "Matplotlib and Seaborn",
      "Interactive dashboards with Tableau",
      "Data storytelling techniques",
      "Advanced visualization methods"
    ]
  },
  {
    id: 9,
    title: "Deep Learning & Neural Networks",
    instructor: "Prof. David Zhang",
    price: 69.99,
    originalPrice: 219.99,
    rating: 4.8,
    students: 19340,
    duration: "48 hours",
    level: "Advanced",
    category: "Data Science",
    description: "Master deep learning with TensorFlow and PyTorch. Build neural networks, CNNs, RNNs, and work on real-world AI projects.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    lessons: 342,
    whatYouLearn: [
      "Neural network architectures",
      "TensorFlow and PyTorch",
      "Computer vision applications",
      "Natural language processing"
    ]
  },
  {
    id: 10,
    title: "Full-Stack JavaScript Development",
    instructor: "Marcus Rodriguez",
    price: 54.99,
    originalPrice: 189.99,
    rating: 4.8,
    students: 22470,
    duration: "52 hours",
    level: "Intermediate",
    category: "Web Development",
    description: "Become a full-stack JavaScript developer. Learn React, Node.js, Express, MongoDB, and deploy production-ready applications.",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
    lessons: 395,
    whatYouLearn: [
      "Modern JavaScript ES6+",
      "React and Redux",
      "Node.js backend development",
      "RESTful API design"
    ]
  },
  {
    id: 11,
    title: "React & Next.js - The Complete Guide",
    instructor: "Sophie Miller",
    price: 47.99,
    originalPrice: 164.99,
    rating: 4.9,
    students: 28190,
    duration: "44 hours",
    level: "Intermediate",
    category: "Web Development",
    description: "Master React and Next.js from basics to advanced. Build server-side rendered applications with modern best practices.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    lessons: 312,
    whatYouLearn: [
      "React hooks and context",
      "Next.js framework",
      "Server-side rendering",
      "Performance optimization"
    ]
  },
  {
    id: 12,
    title: "Android Development Masterclass",
    instructor: "Kevin Patel",
    price: 49.99,
    originalPrice: 179.99,
    rating: 4.6,
    students: 16720,
    duration: "46 hours",
    level: "Beginner",
    category: "Mobile Development",
    description: "Learn Android app development with Kotlin. Build beautiful native Android apps and publish them to Google Play Store.",
    image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb",
    lessons: 338,
    whatYouLearn: [
      "Kotlin programming language",
      "Android Studio and tools",
      "Material Design principles",
      "App deployment strategies"
    ]
  },
  {
    id: 13,
    title: "Flutter & Dart - Build Native Apps",
    instructor: "Amanda Costa",
    price: 56.99,
    originalPrice: 194.99,
    rating: 4.8,
    students: 19850,
    duration: "40 hours",
    level: "Intermediate",
    category: "Mobile Development",
    description: "Build beautiful cross-platform mobile apps with Flutter and Dart. One codebase for iOS and Android applications.",
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec",
    lessons: 298,
    whatYouLearn: [
      "Flutter framework",
      "Dart programming",
      "State management",
      "Cross-platform development"
    ]
  },
  {
    id: 14,
    title: "Graphic Design Masterclass",
    instructor: "Isabella Romano",
    price: 42.99,
    originalPrice: 154.99,
    rating: 4.7,
    students: 21340,
    duration: "30 hours",
    level: "Beginner",
    category: "Design",
    description: "Learn graphic design from scratch. Master Adobe Photoshop, Illustrator, and design principles to create stunning visuals.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d",
    lessons: 215,
    whatYouLearn: [
      "Design theory and principles",
      "Adobe Creative Suite",
      "Typography and color theory",
      "Portfolio development"
    ]
  },
  {
    id: 15,
    title: "Motion Graphics & Animation",
    instructor: "Carlos Mendez",
    price: 59.99,
    originalPrice: 199.99,
    rating: 4.8,
    students: 12560,
    duration: "36 hours",
    level: "Intermediate",
    category: "Design",
    description: "Create stunning motion graphics and animations. Master After Effects, Cinema 4D, and bring your designs to life.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
    lessons: 246,
    whatYouLearn: [
      "After Effects mastery",
      "3D animation basics",
      "Motion design principles",
      "Video compositing"
    ]
  },
  {
    id: 16,
    title: "Social Media Marketing 2025",
    instructor: "Rachel Green",
    price: 37.99,
    originalPrice: 139.99,
    rating: 4.6,
    students: 24890,
    duration: "24 hours",
    level: "Beginner",
    category: "Marketing",
    description: "Master social media marketing across all platforms. Learn Instagram, TikTok, Facebook, LinkedIn strategies that work in 2025.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113",
    lessons: 178,
    whatYouLearn: [
      "Platform-specific strategies",
      "Content creation and planning",
      "Influencer marketing",
      "Analytics and ROI tracking"
    ]
  },
  {
    id: 17,
    title: "Email Marketing & Automation",
    instructor: "Thomas Wright",
    price: 41.99,
    originalPrice: 149.99,
    rating: 4.7,
    students: 15670,
    duration: "22 hours",
    level: "Intermediate",
    category: "Marketing",
    description: "Build profitable email marketing campaigns. Learn automation, copywriting, and advanced segmentation strategies.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3",
    lessons: 164,
    whatYouLearn: [
      "Email campaign design",
      "Marketing automation",
      "A/B testing strategies",
      "Conversion optimization"
    ]
  },
  {
    id: 18,
    title: "SQL & Database Design",
    instructor: "Dr. Yuki Tanaka",
    price: 48.99,
    originalPrice: 169.99,
    rating: 4.8,
    students: 18920,
    duration: "32 hours",
    level: "Beginner",
    category: "Data Science",
    description: "Master SQL and database design. Learn to query, analyze, and manage data efficiently with PostgreSQL and MySQL.",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
    lessons: 225,
    whatYouLearn: [
      "SQL fundamentals",
      "Database design principles",
      "Query optimization",
      "Data modeling"
    ]
  },
  {
    id: 19,
    title: "AWS Cloud Practitioner Essentials",
    instructor: "Robert Kim",
    price: 53.99,
    originalPrice: 184.99,
    rating: 4.7,
    students: 16430,
    duration: "28 hours",
    level: "Beginner",
    category: "Web Development",
    description: "Learn Amazon Web Services from basics to deployment. Get AWS certified and build scalable cloud applications.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    lessons: 196,
    whatYouLearn: [
      "AWS core services",
      "Cloud architecture",
      "Security best practices",
      "Cost optimization"
    ]
  },
  {
    id: 20,
    title: "Cybersecurity Fundamentals",
    instructor: "Dr. Sarah Mitchell",
    price: 61.99,
    originalPrice: 209.99,
    rating: 4.9,
    students: 13280,
    duration: "38 hours",
    level: "Intermediate",
    category: "Web Development",
    description: "Protect systems and networks from cyber threats. Learn ethical hacking, penetration testing, and security best practices.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    lessons: 272,
    whatYouLearn: [
      "Network security",
      "Ethical hacking techniques",
      "Security frameworks",
      "Incident response"
    ]
  },
  {
    id: 21,
    title: "Business Analytics with Excel & Power BI",
    instructor: "Victoria Hughes",
    price: 45.99,
    originalPrice: 159.99,
    rating: 4.6,
    students: 20150,
    duration: "26 hours",
    level: "Beginner",
    category: "Data Science",
    description: "Transform data into business insights. Master Excel, Power BI, and data analysis for business decision-making.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    lessons: 188,
    whatYouLearn: [
      "Advanced Excel formulas",
      "Power BI dashboards",
      "Data analysis techniques",
      "Business intelligence"
    ]
  }
];

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [paymentItems, setPaymentItems] = useState([]);

  const coursesRef = useRef(null);
  const footerRef = useRef(null);

  const categories = ['All', 'Web Development', 'Data Science', 'Marketing', 'Design', 'Mobile Development', 'Blockchain'];

  const addToCart = (course) => {
    if (!cartItems.find(item => item.id === course.id)) {
      setCartItems([...cartItems, course]);
    }
  };

  const removeFromCart = (courseId) => {
    setCartItems(cartItems.filter(item => item.id !== courseId));
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const handleSignInClick = () => {
    setAuthMode('signin');
    setAuthModalOpen(true);
  };

  const handleSignUpClick = () => {
    setAuthMode('signup');
    setAuthModalOpen(true);
  };

  const handleLearnMoreClick = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGetCertifiedClick = () => {
    coursesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBuyNow = (course) => {
    setPaymentItems([course]);
    setShowPaymentGateway(true);
  };

  const handleCheckout = () => {
    setPaymentItems(cartItems);
    setShowPaymentGateway(true);
  };

  const handlePaymentSuccess = () => {
    setCartItems([]);
    setPaymentItems([]);
  };

  const filteredCourses = selectedCategory === 'All' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  if (selectedCourse) {
    return (
      <>
        <Header 
          cartCount={cartItems.length} 
          onCartClick={() => setShowCart(true)}
          onLogoClick={() => setSelectedCourse(null)}
          user={user}
          onSignInClick={handleSignInClick}
          onSignUpClick={handleSignUpClick}
          onSignOut={handleSignOut}
          courses={courses}
          onCourseSelect={setSelectedCourse}
        />
        <CourseDetail 
          course={selectedCourse} 
          onBack={() => setSelectedCourse(null)}
          onAddToCart={addToCart}
          onBuyNow={handleBuyNow}
          isInCart={cartItems.some(item => item.id === selectedCourse.id)}
        />
        <Footer />
        {showCart && (
          <Cart 
            items={cartItems} 
            onClose={() => setShowCart(false)}
            onRemove={removeFromCart}
            onCheckout={handleCheckout}
          />
        )}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialMode={authMode}
          onAuthSuccess={handleAuthSuccess}
        />
        {showPaymentGateway && (
          <PaymentGateway
            items={paymentItems}
            onClose={() => setShowPaymentGateway(false)}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartCount={cartItems.length} 
        onCartClick={() => setShowCart(true)}
        onLogoClick={() => setSelectedCourse(null)}
        user={user}
        onSignInClick={handleSignInClick}
        onSignUpClick={handleSignUpClick}
        onSignOut={handleSignOut}
        courses={courses}
        onCourseSelect={setSelectedCourse}
      />
      
      {/* Hero Slider */}
      <HeroSlider 
        onLearnMoreClick={handleLearnMoreClick}
        onGetCertifiedClick={handleGetCertifiedClick}
      />

      {/* Category Filter */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-3 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section ref={coursesRef} className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="mb-2">
            {selectedCategory === 'All' ? 'All Courses' : selectedCategory}
          </h2>
          <p className="text-gray-600">
            {filteredCourses.length} courses available
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => setSelectedCourse(course)}
              onAddToCart={addToCart}
              isInCart={cartItems.some(item => item.id === course.id)}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent mb-2">10K+</div>
              <div className="text-gray-600">Online Courses</div>
            </div>
            <div>
              <div className="text-4xl bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent mb-2">500K+</div>
              <div className="text-gray-600">Students</div>
            </div>
            <div>
              <div className="text-4xl bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent mb-2">200+</div>
              <div className="text-gray-600">Expert Instructors</div>
            </div>
            <div>
              <div className="text-4xl bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      <div ref={footerRef}>
        <Footer />
      </div>

      {showCart && (
        <Cart 
          items={cartItems} 
          onClose={() => setShowCart(false)}
          onRemove={removeFromCart}
          onCheckout={handleCheckout}
        />
      )}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onAuthSuccess={handleAuthSuccess}
      />

      {showPaymentGateway && (
        <PaymentGateway
          items={paymentItems}
          onClose={() => setShowPaymentGateway(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}

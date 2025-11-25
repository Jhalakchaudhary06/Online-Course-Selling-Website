import { BookOpen, GraduationCap, Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-cyan-500 to-teal-600 p-2 rounded-lg">
                <GraduationCap className="text-white" size={24} />
              </div>
              <span className="text-xl text-white">Edureka</span>
            </div>
            <p className="text-sm mb-4">
              Empowering learners worldwide with high-quality online courses from industry experts.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-white mb-4">Top Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Web Development</a></li>
              <li><a href="#" className="hover:text-white transition">Data Science</a></li>
              <li><a href="#" className="hover:text-white transition">Mobile Development</a></li>
              <li><a href="#" className="hover:text-white transition">Design</a></li>
              <li><a href="#" className="hover:text-white transition">Marketing</a></li>
              <li><a href="#" className="hover:text-white transition">Business</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">FAQs</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Sitemap</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white mb-4">Newsletter</h3>
            <p className="text-sm mb-4">
              Subscribe to get updates on new courses and special offers.
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white text-sm"
                />
              </div>
            </div>
            <button className="w-full mt-2 py-2 bg-gradient-to-r from-cyan-500 to-teal-600 hover:opacity-90 text-white rounded-lg transition text-sm">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© 2025 Edureka. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

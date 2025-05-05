import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGooglePlay, FaApple } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const courseCategories = [
    'Web Development',
    'Data Science',
    'Design',
    'Marketing',
    'Python',
    'UI/UX',
    'Mobile Development',
    'Cybersecurity'
  ];

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Brand Info */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-red-400">SmartLearn</h3>
          <p className="text-sm text-gray-300 mb-4">
            Empowering learners with practical skills for the digital world. Join us and transform your career.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className='text-blue-600' ><FaFacebookF /></a>
            <a href="#" className='text-blue-400' ><FaTwitter /></a>
            <a href="#" className='text-pink-500' ><FaInstagram /></a>
            <a href="#" className='text-blue-400' ><FaLinkedinIn /></a>


            
          </div>
          
        </div>

        {/* Course Categories */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Top Categories</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            {courseCategories.map((cat, index) => (
              <li key={index}>
                <Link to="/courses" className="hover:text-red-400">{cat}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/about" className="hover:text-red-400">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-red-400">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-red-400">FAQs</Link></li>
            <li><Link to="/privacy" className="hover:text-red-400">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-red-400">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Newsletter + App Download */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Stay Updated</h4>
          <p className="text-sm text-gray-300 mb-2">Subscribe to our newsletter for latest updates & offers.</p>
          <form className="flex mt-3">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded-l bg-white text-black focus:outline-none w-full"
            />
            <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-r text-white font-semibold">
              Subscribe
            </button>
          </form>

          <div className="mt-6">
            <p className="text-sm mb-2">Download our App:</p>
            <div className="flex gap-2">
              <a href="#" className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded hover:bg-gray-700">
                <FaGooglePlay className="text-xl" />
                <span className="text-sm">Google Play</span>
              </a>
              <a href="#" className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded hover:bg-gray-700">
                <FaApple className="text-xl" />
                <span className="text-sm">App Store</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} SmartLearn. All rights reserved.
      </div>

      {/* Custom Line - Social Icons Credit */}
      <div className="text-center mt-4">
        <p className="text-white text-lg font-bold">
          Created by Siddharth Soni Developer....
        </p>
      </div>
    </footer>
  );
};

export default Footer;

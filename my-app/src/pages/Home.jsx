import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import LatestNews from '../components/LatestNews';
import FeaturedCourses from '../components/FeaturedCourses';
import UserAds from './UserAds';

const Home = () => {
  // Data moved outside component for better performance (won't re-create on every render)  
  
  const categories = useMemo(() => ["Development", "Design", "Business", "Marketing", "Data Science", "Photography"], []);

  const testimonials = useMemo(() => [
    {
      name: "Ayesha Khan",
      country: "🇵🇰 Pakistan",
      course: "Spoken English",
      rating: 5,
      feedback: "The AI-powered lessons were so personalized. I improved my fluency in just 3 weeks!",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      name: "John Doe",
      country: "🇺🇸 USA",
      course: "Business Communication",
      rating: 4,
      feedback: "Loved the gamification! Made learning super fun and engaging.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sneha Verma",
      country: "🇮🇳 India",
      course: "IELTS Prep",
      rating: 5,
      feedback: "This platform boosted my confidence and got me a Band 8 in IELTS!",
      image: "https://randomuser.me/api/portraits/women/75.jpg",
    },
  ], []);

  const images = useMemo(() => [
    {
      src: "https://images.unsplash.com/photo-1545670723-196ed0954986?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHdlYiUyMGRldmVsb3BtZW50fGVufDB8fDB8fHww",
      alt: "Web Development",
      heading: "💻 50% OFF on Web Development",
      subheading: "Master HTML, CSS, JavaScript & React in one go!",
    },
    {
      src: "https://images.unsplash.com/photo-1581091215367-7f3c2b3f8d5b?auto=format&fit=crop&w=1600&q=80",
      alt: "Marketing Course",
      heading: "📈 Boost Your Career",
      subheading: "Digital Marketing Certification at 40% OFF",
    },
    {
      src: "https://images.unsplash.com/photo-1584697964265-c7c91b6f859b?auto=format&fit=crop&w=1600&q=80",
      alt: "Data Science",
      heading: "📊 Become a Data Scientist",
      subheading: "Explore Python, ML, and AI with top-rated courses",
    },
  ], []);
  // Carousel state and logic
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }, 2000);
  }, [images.length]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
    resetTimer();
  }, [resetTimer]);

  

  // Memoized components for better performance
  const CarouselDots = useMemo(() => (
    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
      {images.map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-all ${index === currentIndex ? 'bg-white w-4 sm:w-5' : 'bg-white/50'
            }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  ), [images, currentIndex, goToSlide]);

  const CarouselSlides = useMemo(() => (
    images.map((image, index) => (
      <div
        key={index}
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center px-4">
          <div className="text-white">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
              {image.heading}
            </h3>
            <p className="text-sm sm:text-base">{image.subheading}</p>
          </div>
        </div>
      </div>
    ))
  ), [images, currentIndex]);

  return (
    <main className="w-full overflow-hidden">
      {/* Banner Section */}
      <header
        className="relative w-full h-[80vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20190220/ourmid/pngtree-cartoon-education-training-cram-school-image_9149.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-opacity-1 z-0"  />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 pt-45 mb-40">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight ">
            Learn Anything, Anytime, Anywhere 📚
          </h1>
          <p className="text-white text-base sm:text-lg max-w-2xl mx-auto ">
            Join thousands of learners unlocking new skills!
          </p>
          <Link to="/courses">
            <button className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out">
            purchase  Courses
            </button>
          </Link>
        </div>
      </header>
   {/*<UserAds/>*/} 
      {/* Offer */}
      <section className="bg-yellow-100 py-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">🔥 Spring Offer: 50% OFF on Premium Courses!</h2>
        <p className="text-gray-700">Use code <span className="font-bold text-red-600">LEARN50</span> at checkout.</p>
      </section>

      {/* Image Carousel */}
      <section className="w-full max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-red-500">
          ✨ <span className="text-black">Explore Learning Moments:</span> Special Discounts on All Courses!
        </h2>

        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[22rem] overflow-hidden rounded-xl shadow-xl">
          {CarouselSlides}
          {CarouselDots}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-6">🎓 Explore Top Categories</h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          {categories.map((cat, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold shadow-sm hover:bg-blue-200 cursor-pointer transition-all"
            >
              {cat}
            </span>
          ))}
        </div>
      </section>


      {/* Featured Courses */}
      <FeaturedCourses/>
      {/* Future of Learning */}
      <section className="bg-gradient-to-b from-white via-gray-50 to-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">🚀 The Future of Learning is Here</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
            Discover how modern technology is revolutionizing education with cutting-edge tools, smart personalization, and immersive learning.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-left">
            {[
              {
                bg: "bg-blue-50",
                color: "text-blue-700",
                title: "🤖 AI-Powered Learning",
                content: "Smarter learning paths with real-time feedback and progress tracking using artificial intelligence."
              },
              {
                bg: "bg-yellow-50",
                color: "text-yellow-700",
                title: "🎮 Gamified Learning",
                content: "Boost engagement through quizzes, leaderboards, rewards, and progress achievements."
              },
              {
                bg: "bg-green-50",
                color: "text-green-700",
                title: "🌐 Global Classrooms",
                content: "Learn with peers worldwide via virtual classrooms and global discussions."
              },
              {
                bg: "bg-purple-50",
                color: "text-purple-700",
                title: "🧑‍💻 Hands-On Labs",
                content: "Practice coding, simulations, and real projects in interactive environments."
              },
              {
                bg: "bg-pink-50",
                color: "text-pink-700",
                title: "🔮 AR/VR Experiences",
                content: "Step into virtual labs, 3D worlds, and immersive scenarios for deeper learning."
              }
            ].map((card, index) => (
              <div
                key={index}
                className={`${card.bg} p-5 rounded-xl shadow hover:shadow-xl transition`}
              >
                <h3 className={`text-lg font-semibold ${card.color} mb-2`}>{card.title}</h3>
                <p className="text-sm text-gray-700">{card.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Why Choose EduPlatform */}
      <section className="bg-white py-16 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">🎯 Why Choose <span className="text-red-500">EduPlatform?</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              {
                bg: "bg-red-50",
                color: "text-red-500",
                title: "✅ Industry Experts",
                content: "Courses taught by real-world professionals with hands-on experience."
              },
              {
                bg: "bg-blue-50",
                color: "text-blue-500",
                title: "🕐 Lifetime Access",
                content: "Learn on your own schedule with unlimited access to your courses."
              },
              {
                bg: "bg-green-50",
                color: "text-green-500",
                title: "🌍 Global Community",
                content: "Collaborate with learners from all around the world."
              },
              {
                bg: "bg-purple-50",
                color: "text-purple-500",
                title: "📱 Mobile Friendly",
                content: "Learn on the go from any device — anytime, anywhere."
              },
              {
                bg: "bg-yellow-50",
                color: "text-yellow-500",
                title: "🎓 Certified Courses",
                content: "Earn recognized certificates to boost your resume and LinkedIn profile."
              },
              {
                bg: "bg-pink-50",
                color: "text-pink-500",
                title: "💬 24/7 Support",
                content: "Get expert assistance from our team anytime you need help."
              }
            ].map((card, index) => (
              <article
                key={index}
                className={`${card.bg} p-6 rounded-xl shadow hover:shadow-md transition`}
              >
                <h3 className={`text-xl font-semibold ${card.color} mb-2`}>{card.title}</h3>
                <p className="text-gray-700 text-sm">{card.content}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <LatestNews />
      {/* Online Learning Info Section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-red-500">
            🎓 All Courses Provided Online
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Learn from anywhere at your own pace with industry-expert instructors and hands-on projects.
            Whether you're a beginner or an upskiller, our courses are designed to prepare you for real-world jobs.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              bg: "bg-yellow-100",
              color: "text-red-500",
              title: "💡 Career-Focused",
              content: "Each course is structured with career goals in mind to help you get job-ready quickly."
            },
            {
              bg: "bg-blue-100",
              color: "text-blue-600",
              title: "🌐 100% Online",
              content: "Access your course material anytime, from any device — learn at your convenience."
            },
            {
              bg: "bg-green-100",
              color: "text-green-600",
              title: "🛠️ Project-Based Learning",
              content: "Get hands-on experience through real-world projects and case studies."
            }
          ].map((card, index) => (
            <div
              key={index}
              className={`${card.bg} rounded-xl shadow-md p-6`}
            >
              <h3 className={`text-xl font-bold ${card.color} mb-2`}>{card.title}</h3>
              <p className="text-gray-700">{card.content}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Testimonials */}
      <section className="bg-gray-50 py-20 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
            💬 What Our Learners Say
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-16 h-16 rounded-full mb-4 object-cover border-2 border-indigo-500"
                    loading="lazy"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">{t.name}</h3>
                  <span className="text-sm text-gray-500">{t.country} · {t.course}</span>
                  <div className="flex mt-2 space-x-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.24 3.818a1 1 0 00.95.69h4.01c.969 0 1.371 1.24.588 1.81l-3.24 2.35a1 1 0 00-.364 1.118l1.24 3.818c.3.921-.755 1.688-1.54 1.118l-3.24-2.35a1 1 0 00-1.176 0l-3.24 2.35c-.785.57-1.84-.197-1.54-1.118l1.24-3.818a1 1 0 00-.364-1.118l-3.24-2.35c-.783-.57-.38-1.81.588-1.81h4.01a1 1 0 00.95-.69l1.24-3.818z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="mt-4 text-gray-600 text-sm italic">
                    “{t.feedback}”
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
export default Home;
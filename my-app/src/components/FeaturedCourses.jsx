import React, { useCallback, useMemo, useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedCourses = () => {
  const courseScrollRef = useRef();

  const scroll = useCallback((direction) => {
    const { current } = courseScrollRef;
    if (current) {
      current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  }, []);

  const courses = useMemo(() => [
    { id: 1, title: "Web Development", price: "₹14,000", image: "https://www.susla.edu/assets/susla/images/WebDevelopmentImage.jpeg" },
    { id: 2, title: "Python", price: "₹10,000", image: "https://afrihub.com/assets/img/pc/python.png" },
    { id: 3, title: "React Js", price: "₹6000", image: "https://www.developerguru.in/images/courses/reactjs.png" },
    { id: 4, title: "JavaScript", price: "₹4000", image: "https://nctaindia.in/images/course/javascript.jpg" },
    { id: 5, title: "Data Science with Python", price: "₹15,000", image: "https://cdn.shopaccino.com/igmguru/products/data-science--with-python-igmguru_176161162_l.jpg?v=462" },
    { id: 6, title: "Mobile App Development", price: "₹14,700", image: "https://t4.ftcdn.net/jpg/04/78/08/31/360_F_478083183_6CQZKaiML4lyTBKOx450KCRkU0aExkVH.jpg" },
    { id: 7, title: "Full Stack Development", price: "₹15,000", image: "https://www.w3webschool.com/wp-content/uploads/2024/02/Full-Stack-Web-Development-Course-in-Kolkata-1024x576.webp" },
    { id: 8, title: "Data Analytics", price: "₹17,000", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqnXJqBpea7JGDR7D9ES31BBy-laX1b7H-Gh2DKpe6FwV22cfUTO-brZAfDe6JmNYNxi4&usqp=CAU" },
    { id: 9, title: "UI/UX Design", price: "₹5000", image: "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg?semt=ais_hybrid&w=740" },
    { id: 10, title: "Machine Learning", price: "₹14,000", image: "https://media.istockphoto.com/id/966248982/photo/robot-with-education-hud.jpg?s=612x612&w=0&k=20&c=9eoZYRXNZsuU3edU87PksxN4Us-c9rB6IR7U_IGZ-U8=" },
    { id: 11, title: "Graphic Design", price: "₹4000", image: "https://blog-frontend.envato.com/cdn-cgi/image/width=1200,quality=75,format=auto,fit=crop,height=630/uploads/sites/2/2022/05/graphic-design-tools.png" },
    { id: 12, title: "Cloud Computing", price: "₹13,000", image: "https://platinumdatarecovery.com/wp-content/uploads/2023/05/cloud-computing-diagram.webp" },
    { id: 13, title: "Cybersecurity Basics", price: "₹12,000", image: "https://img.freepik.com/free-vector/global-data-security-personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37368.jpg" },
    { id: 14, title: "Digital Marketing", price: "₹7000", image: "https://www.michaelpage.ae/sites/michaelpage.ae/files/legacy/7_digital_skills600x387.png" },
    { id: 15, title: "Game Development", price: "₹8,000", image: "https://miro.medium.com/v2/resize:fit:1400/1*3gh-krzOrAoNyX8mJGyc2Q.jpeg" },
  ], []);

  return (
    <section className="py-10 px-4 md:px-10 bg-gray-50 relative">
      <div className="relative">
        <h2 className="text-3xl font-bold text-center mb-8">🌟 Featured Courses</h2>

        {/* Arrows */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-[50%] -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 hidden md:block"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-[50%] -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 hidden md:block"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Course Cards Scroll Area */}
      <div
        ref={courseScrollRef}
        className="flex overflow-x-auto gap-4 pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide"
      >
        {courses.map((course) => (
          <article
            key={course.id}
            className="min-w-[250px] bg-white shadow-md rounded-lg overflow-hidden snap-start flex-shrink-0"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-40 object-cover"
              loading="lazy"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{course.title}</h3>
              <p className="text-lg text-green-500 mt-1">{course.price}</p>
             
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCourses;

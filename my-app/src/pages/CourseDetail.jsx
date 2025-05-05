import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import axios from 'axios';

const staticCourses = [
  { id: 1, title: "Web Development", price: "₹14,000", image: "https://www.susla.edu/assets/susla/images/WebDevelopmentImage.jpeg" },
  { id: 2, title: "Python", price: "₹10,000", image: "https://afrihub.com/assets/img/pc/python.png" },
  { id: 3, title: "React Js", price: "₹6000", image: "https://www.developerguru.in/images/courses/reactjs.png" },
  { id: 4, title: "JavaScript", price: "₹4000" ,image:"https://nctaindia.in/images/course/javascript.jpg" },
  { id: 5, title: "Data Science with Python", price: "₹15,000" ,image:"https://cdn.shopaccino.com/igmguru/products/data-science--with-python-igmguru_176161162_l.jpg?v=462" },
  { id: 6, title: "Mobile App Development", price: "₹14,700" ,image:"https://t4.ftcdn.net/jpg/04/78/08/31/360_F_478083183_6CQZKaiML4lyTBKOx450KCRkU0aExkVH.jpg" },
  { id: 7, title: " Full Stack Development", price: "₹15,000" ,image:"https://www.w3webschool.com/wp-content/uploads/2024/02/Full-Stack-Web-Development-Course-in-Kolkata-1024x576.webp" },
  { id: 8, title: "Data Analytics", price: "₹17,000" ,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqnXJqBpea7JGDR7D9ES31BBy-laX1b7H-Gh2DKpe6FwV22cfUTO-brZAfDe6JmNYNxi4&usqp=CAU" },
  { id: 9, title: "UI/UX Design", price: "₹5000" ,image:"https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg?semt=ais_hybrid&w=740" },
  { id: 10, title: "Machine Learning", price: "₹14,000" ,image:"https://media.istockphoto.com/id/966248982/photo/robot-with-education-hud.jpg?s=612x612&w=0&k=20&c=9eoZYRXNZsuU3edU87PksxN4Us-c9rB6IR7U_IGZ-U8=" },
  { id: 11, title: "Graphic Design", price: "₹4000" ,image:"https://blog-frontend.envato.com/cdn-cgi/image/width=1200,quality=75,format=auto,fit=crop,height=630/uploads/sites/2/2022/05/graphic-design-tools.png" },
  { id: 12, title: "Cloud Computing", price: "₹13,000" ,image:"https://platinumdatarecovery.com/wp-content/uploads/2023/05/cloud-computing-diagram.webp" },
  { id: 13, title: "Cybersecurity Basics", price: "₹12,000" ,image:"https://img.freepik.com/free-vector/global-data-security-personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37368.jpg" },
  { id: 14, title: "Digital Marketing", price: "₹7000" , image:"https://www.michaelpage.ae/sites/michaelpage.ae/files/legacy/7_digital_skills600x387.png" },
  { id: 15, title: "Game Development", price: "₹8,000" ,image:"https://miro.medium.com/v2/resize:fit:1400/1*3gh-krzOrAoNyX8mJGyc2Q.jpeg" },
];

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCurriculum, setShowCurriculum] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showFAQs, setShowFAQs] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        const fallbackCourse = staticCourses.find((c) => c.id === parseInt(id));
        setCourse(fallbackCourse || null);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] flex-col text-gray-500">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mb-4"></div>
        <p className="text-lg font-semibold text-red-500">Loading course details...</p>
      </div>
    );
  }

  if (!course) {
    return <div className="text-center mt-10 text-red-600 font-semibold">Course not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <Link to="/courses" className="text-blue-600 hover:underline flex items-center mb-6">
        <ChevronLeft size={20} className="mr-1" /> Back to Courses
      </Link>

      {/* Course Header */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        <img src={course.image} alt={course.title} className="w-full md:w-1/2 object-cover" />
        <div className="p-6 md:w-1/2">
          <h2 className="text-3xl font-bold mb-2">{course.title}</h2>
          <p className="text-gray-600 mb-4">{course.description || "Master this course with expert guidance."}</p>
          <p className="text-lg font-semibold text-red-500 mb-2">{course.price}</p>
          <p className="text-sm text-gray-500 mb-4">⭐ 4.8 | 👨‍🎓 1200+ students</p>
          <div className="flex flex-wrap gap-3">
          <Link to={`/courses/${id}/enroll`} className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600">
  Enroll Now
</Link>
            <button className="border border-gray-300 px-5 py-2 rounded text-gray-700 hover:bg-gray-100">Add to Wishlist</button>
            <button className="border border-blue-500 text-blue-600 px-4 py-2 rounded hover:bg-blue-100">Share Course</button>
            <button className="border border-green-500 text-green-600 px-4 py-2 rounded hover:bg-green-100">Contact Instructor</button>
          </div>
        </div>
      </div>

      {/* Learning Objectives */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow">
        <h3 className="text-2xl font-bold mb-4">🎯 What You'll Learn</h3>
        <ul className="grid md:grid-cols-2 gap-2 text-gray-700 list-disc list-inside">
          <li>Build real-world projects</li>
          <li>Use React Router & Hooks</li>
          <li>API integration using Axios</li>
          <li>Deploy with Vercel/Netlify</li>
        </ul>
      </div>

      {/* Highlights */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow">
        <h3 className="text-2xl font-bold mb-4">🔥 Course Highlights</h3>
        <ul className="grid md:grid-cols-2 gap-3 list-disc list-inside text-gray-700">
          <li>Lifetime Access</li>
          <li>Downloadable Resources</li>
          <li>Completion Certificate</li>
          <li>Real-time Chat Support</li>
        </ul>
      </div>

      {/* Curriculum */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowCurriculum(!showCurriculum)}>
          <h3 className="text-2xl font-bold">📘 Course Curriculum</h3>
          {showCurriculum ? <ChevronDown /> : <ChevronRight />}
        </div>
        {showCurriculum && (
          <ul className="mt-4 text-gray-700 list-disc list-inside space-y-2">
            <li>📍 Introduction to React</li>
            <li>📍 JSX, Props, and Components</li>
            <li>📍 React Hooks (useState, useEffect)</li>
            <li>📍 Routing with React Router</li>
            <li>📍 Final Project: Build a Blog App</li>
          </ul>
        )}
      </div>

      {/* Certification Info */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow">
        <h3 className="text-2xl font-bold mb-4">🎓 Certification</h3>
        <p className="text-gray-700">Receive a digital certificate after course completion. Share it on LinkedIn or resume to show your expertise!</p>
      </div>

      {/* FAQs */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowFAQs(!showFAQs)}>
          <h3 className="text-2xl font-bold">❓ FAQs</h3>
          {showFAQs ? <ChevronDown /> : <ChevronRight />}
        </div>
        {showFAQs && (
          <div className="mt-4 text-gray-700 space-y-4">
            <div>
              <p className="font-semibold">Q: Is prior knowledge required?</p>
              <p>A: No, this course is beginner-friendly!</p>
            </div>
            <div>
              <p className="font-semibold">Q: Will I get a certificate?</p>
              <p>A: Yes, after successful completion of the course.</p>
            </div>
          </div>
        )}
      </div>

      {/* Instructor and Reviews (Shown after "Enroll Now") */}
      {showDetails && (
        <>
          <div className="mt-10 bg-white p-6 rounded-lg shadow flex flex-col md:flex-row gap-6">
            <img src={course.instructorImage || "https://via.placeholder.com/100"} alt="Instructor" className="w-24 h-24 rounded-full object-cover" />
            <div>
              <h3 className="text-xl font-bold">👨‍🏫 Instructor: {course.instructor || "Siddharth Soni"}</h3>
              <p className="text-gray-600 mt-1">
                5+ years of experience in full-stack development and React training. Passionate about real-world learning.
              </p>
            </div>
          </div>

          <div className="mt-10 bg-white p-6 rounded-lg shadow">
            <h3 className="text-2xl font-bold mb-4">💬 Student Reviews</h3>
            <div className="space-y-4">
              <div className="border-b pb-2">
                <p className="font-semibold">Anjali Sharma ⭐⭐⭐⭐⭐</p>
                <p className="text-gray-600">Clear concepts and practical approach!</p>
              </div>
              <div className="border-b pb-2">
                <p className="font-semibold">Rahul Verma ⭐⭐⭐⭐☆</p>
                <p className="text-gray-600">Great for beginners. More quizzes could be added.</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseDetail;

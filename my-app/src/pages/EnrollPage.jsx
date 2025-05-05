import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const courses = [
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
];

const EnrollPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', agree: false });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(res.data);
      } catch (error) {
        // fallback to local course array
        const fallbackCourse = courses.find((c) => c.id === parseInt(id));
        setCourse(
          fallbackCourse || {
            title: "Unknown Course",
            price: "₹0",
            description: "This course is not found in our records.",
            image: "https://via.placeholder.com/400x200",
          }
        );
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("Please agree to terms and conditions.");
      return;
    }
    setSubmitted(true);
  };

  

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 text-gray-800">
      <Link to={`/courses/${id}`} className="text-blue-600 hover:underline mb-4 block">← Back to Course</Link>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="md:col-span-2 bg-white p-6 rounded shadow">
          <h1 className="text-3xl font-bold mb-4">📥 Enroll in Course</h1>
          <p className="mb-6 text-gray-600">
            Fill in your details to enroll in <strong>{course?.title}</strong>.
          </p>

          {submitted ? (
            <div className="bg-green-100 text-green-800 p-4 rounded">
              🎉 You have successfully enrolled in <strong>{course?.title}</strong>!
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full border p-2 rounded"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full border p-2 rounded"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full border p-2 rounded"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  name="agree"
                  className="mt-1"
                  checked={formData.agree}
                  onChange={handleChange}
                />
                <label className="text-sm text-gray-700">
                  I agree to the <span className="text-blue-600 underline cursor-pointer">terms and conditions</span>.
                </label>
              </div>
              <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all">
                Confirm Enrollment
              </button>
            </form>
          )}
        </div>

        {/* Sidebar Summary */}
        <div className="bg-gray-50 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">📝 Course Summary</h2>
          <img src={course?.image} alt={course?.title} className="rounded w-full h-40 object-cover mb-4"/>
          <p className="text-lg font-bold">{course?.title}</p>
          <p className="text-red-500 font-semibold">{course?.price}</p>
          <p className="text-sm text-gray-600 mt-2">{course?.description || "No description available."}</p>

          <div className="mt-6 border-t pt-4 text-sm text-gray-700 space-y-2">
            <p>✅ Certificate Included</p>
            <p>🕒 Lifetime Access</p>
            <p>📧 Email Support</p>
            <p>💼 Job Assistance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollPage;

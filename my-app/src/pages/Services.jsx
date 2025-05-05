import React from "react";
import {
  FaLaptopCode,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaMobileAlt,
  FaBookReader,
  FaNetworkWired,
} from "react-icons/fa";

const Service = () => {
  return (
    <section className="bg-gray-100 py-16 px-4" id="services">
      <div className="max-w-7xl mx-auto text-center space-y-8">
        <div className="text-center mb-12 ">
          <h2 className="text-4xl font-bold flex justify-center items-center gap-3 flex-wrap">
            <span className="text-black">Our</span>
            <span className="text-red-500">Services</span>
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            Explore our expert offerings crafted for your success.
          </p>
        </div>
        <p className="text-lg text-black font-bold max-w-2xl mx-auto">
          We provide high-quality, expert-led services that help learners grow, connect, and succeed in their careers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ===== Reusable Card =====
const ServiceCard = ({ icon, title, description }) => (
  <div className="relative overflow-hidden bg-white rounded-xl shadow-md p-6 space-y-3 group transition-all duration-500 hover:bg-red-600 hover:text-white">
    <div className="absolute top-0 left-0 h-full w-1 bg-red-600 transition-all duration-500 group-hover:w-full group-hover:opacity-100 z-0"></div>

    <div className="relative z-10">
      <div className="text-blue-600 text-3xl group-hover:text-white transition duration-300">
        {icon}
      </div>
      <h3 className="font-semibold text-xl">{title}</h3>
      <p className="text-gray-600 group-hover:text-white transition duration-300">
        {description}
      </p>
    </div>
  </div>
);

// ===== Data =====
const services = [
  {
    icon: <FaLaptopCode />,
    title: "Web Development",
    description: "Build modern, responsive websites with hands-on projects and expert mentorship.",
  },
  {
    icon: <FaChalkboardTeacher />,
    title: "1-on-1 Mentorship",
    description: "Get personalized guidance from industry professionals to boost your career.",
  },
  {
    icon: <FaUserGraduate />,
    title: "Career Counseling",
    description: "Strategic advice on skills, job applications, and interview preparation.",
  },
  {
    icon: <FaMobileAlt />,
    title: "Mobile App Training",
    description: "Learn mobile app development with real-world projects and deployment tips.",
  },
  {
    icon: <FaBookReader />,
    title: "Study Materials",
    description: "Download notes, ebooks, and curated study content for your courses.",
  },
  {
    icon: <FaNetworkWired />,
    title: "Community Network",
    description: "Join a thriving community of learners, developers, and tech leaders.",
  },
];

export default Service;

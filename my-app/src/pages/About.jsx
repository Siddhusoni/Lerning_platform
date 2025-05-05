import React from "react";
import { FaUsers, FaBookOpen, FaChalkboardTeacher } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 mt-10">
      {/* Hero Section */}
      <section className="bg-blue-50 py-12 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-red-500">About Us</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto font-bold text-gray-700">
          Empowering learners worldwide with quality, accessible education through innovation and community.
        </p>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 text-lg">
              We started with one goal — to make high-quality learning accessible to everyone, everywhere. Today, we’ve helped thousands of students upskill, earn certifications, and land their dream careers.
            </p>
          </div>
          <img
            src="https://static.wixstatic.com/media/65246d_c7bd3ba476fb4191af59a11494ad027f~mv2.jpg/v1/fill/w_820,h_460,al_c,q_85/65246d_c7bd3ba476fb4191af59a11494ad027f~mv2.jpg"
            alt="Our Story"
            className="rounded-xl shadow-md"
          />
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <FeatureCard
              icon={<FaBookOpen />}
              title="Online Courses"
              description="A wide range of updated, industry-relevant courses taught by experts."
            />
            <FeatureCard
              icon={<FaChalkboardTeacher />}
              title="Expert Mentors"
              description="One-on-one mentorship and career support by experienced professionals."
            />
            <FeatureCard
              icon={<FaUsers />}
              title="Student Community"
              description="Join a vibrant community of learners, mentors, and industry leaders."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <StatCard label="Students Enrolled" value="25,000+" />
          <StatCard label="Courses Offered" value="150+" />
          <StatCard label="Certified Mentors" value="100+" />
        </div>
      </section>

      {/* Vision & Values */}
      <section className="bg-blue-50 py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-center">Our Vision & Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <ValueCard title="Innovation" description="Always improving and pushing boundaries in digital learning." />
            <ValueCard title="Inclusivity" description="Everyone deserves access to quality education." />
            <ValueCard title="Empowerment" description="Helping individuals reach their full potential." />
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 px-4 bg-white text-center">
        <h2 className="text-2xl font-semibold mb-4">Want to know more?</h2>
        <p className="text-gray-600 mb-6">Connect with our team or explore our courses to get started.</p>
        <a
          href="/contact"
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
};

// ===== Reusable Components =====

const FeatureCard = ({ icon, title, description }) => (
  <div className="relative overflow-hidden bg-white rounded-xl shadow-md p-6 space-y-3 group transition-all duration-500 hover:bg-blue-600 hover:text-white">
    {/* Left sliding color effect */}
    <div className="absolute top-0 left-0 h-full w-1 bg-blue-600 transition-all duration-500 group-hover:w-full group-hover:opacity-100 z-0"></div>

    {/* Content on top */}
    <div className="relative z-10">
      <div className="text-blue-600 text-3xl group-hover:text-white transition duration-300">{icon}</div>
      <h3 className="font-semibold text-xl">{title}</h3>
      <p className="text-gray-600 group-hover:text-white transition duration-300">{description}</p>
    </div>
  </div>
);

const StatCard = ({ label, value }) => (
  <div className="bg-white p-6 rounded-xl shadow text-center">
    <h3 className="text-3xl font-bold text-blue-600">{value}</h3>
    <p className="text-gray-700 mt-2">{label}</p>
  </div>
);

const ValueCard = ({ title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
    <h4 className="font-semibold text-xl text-gray-800 mb-2">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default About;

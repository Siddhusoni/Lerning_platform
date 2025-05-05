import React, { useState } from "react";
import axios from "axios";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/contact", formData);
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Submission failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white px-4 py-12 text-gray-800 mt-10">
      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Get in Touch</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          We'd love to hear from you! Reach out with questions, feedback, or partnership opportunities.
        </p>
      </section>

      {/* Success Alert */}
      {success && (
        <div className="max-w-xl mx-auto mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded transition-all duration-300 animate-bounce">
          Message sent successfully!
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-6 text-red-600">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              onChange={handleChange}
              value={formData.name}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transform transition duration-200 focus:scale-[1.02]"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              onChange={handleChange}
              value={formData.email}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transform transition duration-200 focus:scale-[1.02]"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              onChange={handleChange}
              value={formData.message}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transform transition duration-200 focus:scale-[1.02]"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition duration-300 shadow-lg hover:shadow-xl"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info + Map */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Contact Information</h3>
            <div className="space-y-3 text-gray-600">
              <p className="flex items-center gap-3 hover:text-red-600 transition"><FaPhoneAlt /> +91 8878721435</p>
              <p className="flex items-center gap-3 hover:text-red-600 transition"><FaEnvelope /> siddharthsoni070@gmail.com</p>
              <p className="flex items-center gap-3 hover:text-red-600 transition"><FaMapMarkerAlt /> Indore, Vijay Nagar</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition duration-300">
            <iframe
              className="w-full h-64"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d36500092.06641161!2d68.17664517917153!3d20.59368400113627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ffb4f0d705d%3A0x19fffc82c3d6ec2d!2sIndia!5e0!3m2!1sen!2sin!4v1618883760385!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              title="Google Map - India"
            />
          </div>

          <div className="flex gap-6 text-2xl text-gray-600 justify-center lg:justify-start">
            <a href="#" className="text-blue-600 "><FaFacebook /></a>
            <a href="#" className="text-blue-400 "><FaTwitter /></a>
            <a href="#" className="text-pink-500 "><FaInstagram /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const privacySections = [
  {
    title: "1. Information We Collect",
    content:
      "We collect personal information including your name, email, phone number, and payment details when you register, enroll in a course, or contact us. We also collect usage data to improve our platform.",
  },
  {
    title: "2. How We Use Your Data",
    content:
      "Your information is used to provide course access, improve learning recommendations, offer customer support, and send important updates regarding courses and policies.",
  },
  {
    title: "3. Course Progress & Analytics",
    content:
      "We track your progress within courses for personalized learning experiences, certification eligibility, and to suggest relevant courses based on your interests.",
  },
  {
    title: "4. Cookies and Tracking Technologies",
    content:
      "Cookies are used to remember your preferences, login sessions, and course history. You can control cookie settings through your browser.",
  },
  {
    title: "5. Third-Party Integrations",
    content:
      "We may use third-party tools like Google Analytics, payment gateways, or embedded video players which may collect anonymized data. We do not sell your personal information.",
  },
  {
    title: "6. Data Security & Retention",
    content:
      "Your data is encrypted and stored securely. We retain your learning history and course completion records unless you request deletion.",
  },
  {
    title: "7. Your Rights",
    content:
      "You have the right to view, update, download, or delete your data. Contact our support team at privacy@learnonline.com for any requests.",
  }
];

const PrivacyPolicy = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-10 text-gray-800">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
          Learn how we handle your data, protect your privacy, and empower you to control your information while using our learning platform.
        </p>
      </div>

      {/* Sections */}
      <div className="max-w-5xl mx-auto space-y-6">
        {privacySections.map((section, index) => (
          <div key={index} className="bg-gray-100 rounded-xl shadow-sm p-5">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(index)}
            >
              <h3 className="text-xl font-semibold">{section.title}</h3>
              <span>
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>
            {openIndex === index && (
              <p className="mt-3 text-gray-700">{section.content}</p>
            )}
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-16 text-center text-sm text-gray-500">
        Last updated: April 2025 • For inquiries: <span className="underline">privacy@learnonline.com</span>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

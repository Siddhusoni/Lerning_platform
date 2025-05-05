import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqItems = [
  {
    title: "1. Course Access & Licensing",
    content: "When you enroll in a course, you get a non-transferable license to view the content for personal and educational use only. Sharing or reselling is strictly prohibited.",
  },
  {
    title: "2. Payment & Refund Policy",
    content: "All payments made are non-refundable unless stated otherwise in the course-specific refund policy. Ensure you review the course details before purchase.",
  },
  {
    title: "3. Intellectual Property",
    content: "All content, graphics, videos, quizzes, and downloadable materials are copyrighted and owned by our platform or respective instructors.",
  },
  {
    title: "4. User Conduct",
    content: "You agree not to misuse the platform by sharing offensive content, attempting to hack our systems, or misrepresenting your identity.",
  },
  {
    title: "5. Course Updates",
    content: "Courses may be updated, replaced, or removed based on relevance and quality. Users are encouraged to complete courses within the active period.",
  },
  {
    title: "6. Support & Instructor Help",
    content: "We provide email and chat support for enrolled users. Instructor communication is available within each course discussion section.",
  }
];

const TermsService = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12 text-gray-800">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">Terms of Service</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Please read our terms and conditions carefully before enrolling in any online course on our platform.
        </p>
      </div>

      {/* Terms Sections */}
      <div className="max-w-4xl mx-auto space-y-6">
        {faqItems.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-xl p-6">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <span className="text-gray-500">
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>
            {openIndex === index && (
              <p className="mt-3 text-gray-700">{item.content}</p>
            )}
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-16 text-center text-sm text-gray-500">
        Last updated: April 2025 • For questions, contact: <span className="underline">support@learnonline.com</span>
      </div>
    </div>
  );
};

export default TermsService;

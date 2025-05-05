import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqData = [
  {
    question: "What courses are available on this platform?",
    answer: "We offer courses in Web Development, Data Science, AI/ML, Digital Marketing, and more. New courses are added regularly.",
  },
  {
    question: "Are there free courses available?",
    answer: "Yes, we offer both free and premium courses. Free courses are marked clearly and require only registration to access.",
  },
  {
    question: "Do I get a certificate after completing a course?",
    answer: "Yes, every course offers a certificate upon successful completion, which you can download and share.",
  },
  {
    question: "Can I access the courses on mobile?",
    answer: "Absolutely! Our platform is mobile responsive and you can learn from any device—laptop, tablet, or phone.",
  },
  {
    question: "How do I get support if I face any issues?",
    answer: "You can contact our support team via the contact page or email support@learnonline.com. We usually respond within 24 hours.",
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes, we use trusted third-party payment gateways with secure encryption protocols to protect your data.",
  },
  {
    question: "Can I download course videos?",
    answer: "Currently, course content is available online only to protect intellectual property, but offline access will be added soon.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-5 md:px-12 text-gray-800">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Find answers to common questions about courses, certifications, payments, and using the platform.
        </p>
      </div>

      {/* FAQ Sections */}
      <div className="max-w-5xl mx-auto space-y-5">
        {faqData.map((item, index) => (
          <div key={index} className="bg-gray-100 rounded-xl p-5 shadow">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold">{item.question}</h3>
              <span>
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>
            {openIndex === index && (
              <p className="mt-3 text-gray-700">{item.answer}</p>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 mt-12">
        Still have questions? <a href="/contact" className="underline text-blue-600">Contact us</a>
      </div>
    </div>
  );
};

export default FAQs;

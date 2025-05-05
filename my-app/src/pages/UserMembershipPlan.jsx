import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const UserMembershipPlan = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchPlans();
  },[]);  
  const fetchPlans = async () => {
    const res = await axios.get('http://localhost:5000/api/membership');
    setPlans(res.data);
  };
  const handleSubscribe = (planTitle) => {
    localStorage.setItem('membershipPlan', planTitle); // Save the subscribed plan
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      navigate('/subscription-details'); // Navigate to a new page
    }, 2000);
  };
  return (
    <div className="pt-24 pb-16 px-4 md:px-8 bg-white min-h-screen">
      <h2 className="text-4xl font-bold text-center text-red-500 mb-6">Choose Your Membership</h2>
      <p className="text-center text-black font-bold mb-12 text-lg">Flexible plans for learners of all levels. Upgrade anytime.</p>
      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="relative p-6 rounded-2xl shadow-xl border-2 bg-white border-gray-200 hover:scale-105 transition-transform duration-300"
          >
            {plan.badge && (
              <span className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                {plan.badge}
              </span>
            )}
            <h3 className="text-2xl font-bold mb-2 text-gray-800">{plan.title}</h3>
            <p className="text-4xl font-extrabold text-orange-500 mb-2">{plan.price}</p>
            <p className="text-sm text-black font-bold mb-4">{plan.duration}</p>

            <ul className="mb-6 space-y-3">
              {JSON.parse(plan.features).map((feature, idx) => (
                <li key={idx} className="text-black font-bold flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan.title)}
              className="w-full bg-red-600 hover:bg-green-700 text-white font-medium py-2 rounded-xl transition"
            >
              {plan.title === 'Free Plan' ? 'Start Free' : 'Subscribe Now'}
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Static Section */}
      <div className="max-w-5xl mx-auto mt-20 p-6 bg-gray-50 border-t-2 border-red-200 rounded-xl shadow-md">
        <h3 className="text-2xl font-bold text-center mb-4 text-gray-700">Why Choose Our Membership?</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-800 font-medium">
          <li>Access exclusive premium content tailored for your learning journey</li>
          <li>Weekly mentorship sessions and Q&A with instructors</li>
          <li>Downloadable resources and certificates upon completion</li>
          <li>Priority support and future discounts on advanced courses</li>
          <li>Lifetime access to all updates under your plan</li>
        </ul>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed bottom-6 right-6 bg-green-100 border border-green-400 text-green-800 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 transition-all duration-300 z-50">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <span className="text-md font-semibold">Subscription successful!</span>
        </div>
      )}
    </div>
  );
};

export default UserMembershipPlan;

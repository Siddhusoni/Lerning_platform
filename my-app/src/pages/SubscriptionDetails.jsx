import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SubscriptionDetails = () => {
  const navigate = useNavigate();
  const plan = localStorage.getItem('membershipPlan');
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const now = new Date();
    setDateTime(now.toLocaleString());
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-10 bg-gradient-to-br from-white to-gray-100 text-center">
      {/* Confirmation Card */}
      <div className="bg-white max-w-3xl mx-auto shadow-2xl rounded-2xl p-8 border border-gray-200">
        <div className="flex flex-col items-center">
          <CheckCircle className="text-green-600 w-12 h-12 mb-4" />
          <h2 className="text-3xl font-extrabold text-green-700">
            🎉 Subscribed to <span className="text-red-600">{plan}</span>!
          </h2>
          <p className="mt-2 text-gray-600 text-sm">
            Subscription confirmed on: <span className="font-medium">{dateTime}</span>
          </p>

          <div className="mt-6 text-left w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">What’s included:</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>✅ Unlimited access to all relevant courses</li>
              <li>✅ Downloadable resources and lifetime access</li>
              <li>✅ Premium support & certificate of completion</li>
              <li>✅ Live Q&A and community access</li>
            </ul>
          </div>

          <button
            onClick={() => navigate('/courses')}
            className="mt-8 bg-red-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 transition"
          >
            Go to Courses <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mt-12 text-left bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-black">❓ Can I upgrade my plan later?</p>
            <p className="text-gray-700">Absolutely! You can upgrade anytime via your dashboard.</p>
          </div>
          <div>
            <p className="font-semibold text-black">❓ Will I lose my progress if I unsubscribe?</p>
            <p className="text-gray-700">No. Your progress and data remain safe with us.</p>
          </div>
          <div>
            <p className="font-semibold text-black">❓ How do I access the premium content?</p>
            <p className="text-gray-700">Your dashboard will now unlock premium course areas.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetails;

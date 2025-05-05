import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [enrollmentCount, setEnrollmentCount] = useState(0);

  useEffect(() => {
    const fetchEnrollmentCount = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/enrollments/count");
        setEnrollmentCount(res.data.count);
      } catch (err) {
        console.error("Failed to fetch enrollment count", err);
      }
    };

    fetchEnrollmentCount();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">📊 Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's an overview of your learning platform.</p>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border-t-4 border-blue-500 shadow rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold text-blue-600">Enrolled Courses</h2>
            <p className="text-3xl mt-2 font-bold text-gray-800">{enrollmentCount}</p>
          </div>
          <div className="bg-white border-t-4 border-green-500 shadow rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold text-green-600">Completed</h2>
            <p className="text-3xl mt-2 font-bold text-gray-800">{enrollmentCount}</p>
          </div>
          <div className="bg-white border-t-4 border-yellow-500 shadow rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold text-yellow-600">In Progress</h2>
            <p className="text-3xl mt-2 font-bold text-gray-800">{enrollmentCount}</p>
          </div>
          <div className="bg-white border-t-4 border-purple-500 shadow rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold text-purple-600">Learning Hours</h2>
            <p className="text-3xl mt-2 font-bold text-gray-800">8 hrs</p>
                        </div>
                      </div>
        {/* Continue Learning Section */}
        <div className="mt-10 bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📚 Continue Learning</h2>
          <ul className="space-y-2">
            <li className="border-b py-2 text-gray-700">➡️ React for Beginners - 60% complete</li>
            <li className="border-b py-2 text-gray-700">➡️ Tailwind CSS Mastery - 90% complete</li>
            <li className="py-2 text-gray-700">➡️ JavaScript Fundamentals - 30% complete</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

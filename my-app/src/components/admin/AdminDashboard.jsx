import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/auth');
    }
  }, [navigate]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-40 p-8 w-full mt-20">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to the Admin Dashboard</h1>
        <p className="text-gray-600">Use the sidebar to manage content like news, users, and more.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;

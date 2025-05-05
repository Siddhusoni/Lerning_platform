import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // hamburger & close icon

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger Button (Mobile only) */}
      <div className="md:hidden fixed top-4 left-4 z-50 mt-16 ">
        <button onClick={toggleSidebar} className="p-2 bg-black text-white rounded focus:outline-none">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 mt-16  w-40 bg-white shadow-lg p-5 z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block `}
      >
        <h2 className="text-2xl font-bold mb-6 text-red-600">🛠 Admin Panel</h2>
        <nav className="space-y-4">
          <Link to="/admin" className="block font-semibold text-gray-700 hover:text-red-500">Dashboard</Link>
          <Link to="/admin/news" className="block font-semibold text-gray-700 hover:text-red-500">Manage News</Link>
          <Link to="/admin/course" className="block font-semibold text-gray-700 hover:text-red-500">
            Manage Featured Courses
          </Link>
          <Link to="/MemberShipMange" className="block font-semibold text-gray-700 hover:text-red-500">
            Manage MemberShip
          </Link>
          <Link to="/adminads" className="block font-semibold text-gray-700 hover:text-red-500">
            Manage Ads
          </Link>


        </nav>
      </div>

      {/* Overlay (only on mobile when sidebar is open) */}
      {isOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;

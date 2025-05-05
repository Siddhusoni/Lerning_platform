import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    closeMenu();
    navigate('/auth');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" onClick={closeMenu}>
          <h1 className="text-xl font-bold text-red-600">📘SmartLearn</h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 text-lg font-semibold">
          <NavLink to="/" currentPath={location.pathname}>Home</NavLink>
          <NavLink to="/about" currentPath={location.pathname}>About</NavLink>
          <NavLink to="/service" currentPath={location.pathname}>Service</NavLink>
          {isLoggedIn && (
            <> 
              <NavLink to="/courses" currentPath={location.pathname}>Courses</NavLink>
              <NavLink to="/membership" currentPath={location.pathname}>Membership</NavLink>
              <NavLink to="/quiz" currentPath={location.pathname}>Quiz</NavLink>
              <NavLink to="/dashboard" currentPath={location.pathname}>Dashboard</NavLink>
            </>
          )}
          <NavLink to="/contact" currentPath={location.pathname}>Contact</NavLink>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/auth"
                className="ml-4 text-black hover:text-red-600 transition"
              >
                Login
              </Link>
              <Link
                to="/auth"
                className="text-white bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-md transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? 'max-h-screen py-4' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col space-y-4 px-6">
          <NavLink to="/" currentPath={location.pathname} onClick={closeMenu}>Home</NavLink>
          <NavLink to="/about" currentPath={location.pathname} onClick={closeMenu}>About</NavLink>
          <NavLink to="/service" currentPath={location.pathname} onClick={closeMenu}>Service</NavLink>
          {isLoggedIn && (
            <>
              <NavLink to="/courses" currentPath={location.pathname} onClick={closeMenu}>Courses</NavLink>
              <NavLink to="/membership" currentPath={location.pathname} onClick={closeMenu}>Membership</NavLink>
              <NavLink to="/quiz" currentPath={location.pathname} onClick={closeMenu}>Quiz</NavLink>
              <NavLink to="/dashboard" currentPath={location.pathname} onClick={closeMenu}>Dashboard</NavLink>
            </>
          )}
          <NavLink to="/contact" currentPath={location.pathname} onClick={closeMenu}>Contact</NavLink>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/auth"
                onClick={closeMenu}
                className="text-black hover:text-red-600"
              >
                Login
              </Link>
              <Link
                to="/auth"
                onClick={closeMenu}
                className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// Reusable NavLink component
const NavLink = ({ to, children, onClick, currentPath }) => {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`transition duration-200 ${isActive ? 'text-red-600 font-bold' : 'text-black hover:text-red-500'}`}
    >
      {children}
    </Link>
  );
};

export default Navbar;

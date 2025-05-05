import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPopup, setShowPopup] = useState(false); // state to control popup visibility
  const [popupMessage, setPopupMessage] = useState(""); // message for the popup
  const navigate = useNavigate();

  // Utility to get token based on environment
  const getToken = () => {
    // Use sessionStorage for incognito mode and localStorage for normal browsing
    return window.sessionStorage.getItem('token') || window.localStorage.getItem('token');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:5000/login' : 'http://localhost:5000/register';

    try {
      const res = await axios.post(url, form);

      // If login is successful, save the token in sessionStorage or localStorage and redirect
      if (isLogin) {
        const token = res.data.token;
        // Store the token in sessionStorage (for incognito) or localStorage (for normal)
        window.sessionStorage.setItem('token', token);
        window.localStorage.setItem('token', token);
        navigate('/courses'); // redirect to courses page after login
        showSuccessPopup("Login successful!");
      } else {
        setPopupMessage('Registered! Now login');
        setIsLogin(true); // Switch to login after successful registration
        showSuccessPopup("Registration successful! Please login.");
      }
    } catch (err) {
      // Handle errors
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  const showSuccessPopup = (message) => {
    setPopupMessage(message); // Set message for the popup
    setShowPopup(true); // Show the popup
    setTimeout(() => {
      setShowPopup(false); // Hide the popup after 2 seconds
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto mt-35 border p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Show 'Name' input only if it's the registration form */}
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full mb-4 border px-3 py-2"
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 border px-3 py-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 border px-3 py-2"
          required
        />
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 w-full rounded hover:bg-red-600"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <p className="mt-4 text-center">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-red-600 underline"
        >
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>

      {/* Success popup */}
      {showPopup && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-20 p-4 bg-green-500 text-white rounded-lg shadow-lg animate-fadeIn">
          <p>{popupMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Auth;

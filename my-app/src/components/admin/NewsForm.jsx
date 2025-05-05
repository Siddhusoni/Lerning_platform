import React, { useState } from 'react';
import axios from 'axios';

const NewsForm = () => {
  const [form, setForm] = useState({
    title: '',
    date: '',
    category: '',
    image: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/news', form);
      if (response.status === 201 || response.status === 200) {
        setMessage('✅ News added successfully!');
        setForm({ title: '', date: '', category: '', image: '' });
      } else {
        setMessage('❌ Failed to add news. Try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ Error adding news. Check the console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-4 p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">📰 Add News</h2>

      {message && (
        <div className={`mb-6 text-center font-medium text-lg transition-all duration-300 ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="News Title"
          className="col-span-1 md:col-span-2 border border-gray-300 px-5 py-3 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none transition-all duration-200"
          required
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="border border-gray-300 px-5 py-3 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none transition-all duration-200"
          required
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="border border-gray-300 px-5 py-3 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none transition-all duration-200"
          required
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="col-span-1 md:col-span-2 border border-gray-300 px-5 py-3 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none transition-all duration-200"
          required
        />

        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add News'}
        </button>
      </form>
    </div>
  );
};

export default NewsForm;

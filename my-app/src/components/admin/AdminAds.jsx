import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminAds = () => {
  const [ads, setAds] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', image_url: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/ads');
      setAds(res.data);
    } catch (error) {
      toast.error('Failed to load ads');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.image_url) {
      toast.warning('Please fill in title and image URL');
      return;
    }

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/ads/${editId}`, form);
        toast.success('Ad updated successfully!');
        setEditId(null);
      } else {
        await axios.post('http://localhost:5000/api/ads', form);
        toast.success('Ad added successfully!');
      }

      setForm({ title: '', description: '', image_url: '' });
      fetchAds();
    } catch (err) {
      toast.error('Something went wrong.');
    }
  };

  const handleEdit = (ad) => {
    setForm({ title: ad.title, description: ad.description, image_url: ad.image_url });
    setEditId(ad.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/ads/${id}`);
      toast.success('Ad deleted!');
      fetchAds();
    } catch (err) {
      toast.error('Delete failed!');
    }
  };

  return (
    <div className="p-4 md:p-10">
      <ToastContainer />
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-700">📢 Manage Advertisements</h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto bg-white shadow-lg p-6 rounded-xl border">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Ad Title"
          className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-400"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Ad Description"
          className="w-full border p-3 rounded focus:ring-2 focus:ring-blue-400"
          rows="3"
        />

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow transition-all"
          >
            {editId ? 'Update Ad' : 'Add Ad'}
          </button>
          {editId && (
            <button
              type="button"
              className="text-red-600 hover:underline"
              onClick={() => {
                setEditId(null);
                setForm({ title: '', description: '', image_url: '' });
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {ads.map((ad) => (
          <div
            key={ad.id}
            className="bg-white border rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
          >
            <img
              src={ad.image_url}
              alt="Ad"
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-blue-700">{ad.title}</h3>
              <p className="text-gray-600 mt-2 line-clamp-3">{ad.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => handleEdit(ad)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ad.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAds;

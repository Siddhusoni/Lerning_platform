import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckCircle, Trash2, Pencil } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminMembership = () => {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({
    title: '',
    price: '',
    duration: '',
    features: '',
    badge: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const res = await axios.get('http://localhost:5000/api/membership');
    setPlans(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      features: form.features.split(',').map(f => f.trim())
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/membership/${editId}`, payload);
        toast.success('Plan updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/membership', payload);
        toast.success('Plan added successfully!');
      }

      setForm({ title: '', price: '', duration: '', features: '', badge: '' });
      setEditId(null);
      fetchPlans();
    } catch (error) {
      toast.error('Something went wrong.');
    }
  };

  const handleEdit = (plan) => {
    setForm({
      title: plan.title,
      price: plan.price,
      duration: plan.duration,
      features: JSON.parse(plan.features).join(', '),
      badge: plan.badge || ''
    });
    setEditId(plan.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this plan?')) {
      await axios.delete(`http://localhost:5000/api/membership/${id}`);
      toast.success('Plan deleted successfully!');
      fetchPlans();
    }
  };

  return (
    <div className="pt-24 pb-16 px-4 md:px-8 bg-gradient-to-r from-white to-gray-100 min-h-screen">
      <ToastContainer />
      <h2 className="text-4xl font-extrabold text-center text-red-600 mb-10">Manage Membership Plans</h2>

      {/* Admin Form */}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-5 border">
        <h3 className="text-2xl font-bold text-gray-700">{editId ? 'Edit Plan' : 'Add New Plan'}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Plan Title" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-300" required />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price (e.g., ₹499/month)" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-300" required />
          <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration (e.g., Monthly)" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-300" required />
          <input name="badge" value={form.badge} onChange={handleChange} placeholder="Badge (optional)" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-300" />
        </div>
        <textarea name="features" value={form.features} onChange={handleChange} placeholder="Features (comma separated)" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-300" rows="3" required />
        <button className="w-full md:w-auto bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 transition duration-300">
          {editId ? 'Update Plan' : 'Add Plan'}
        </button>
      </form>

      {/* Plans Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <div key={plan.id} className="relative p-6 rounded-2xl shadow-xl border bg-white border-gray-200 hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out">
            {plan.badge && (
              <span className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                {plan.badge}
              </span>
            )}
            <h3 className="text-2xl font-bold mb-2 text-black">{plan.title}</h3>
            <p className="text-4xl font-extrabold text-orange-500 mb-2">{plan.price}</p>
            <p className="text-sm text-gray-500 mb-4">{plan.duration}</p>

            <ul className="mb-6 space-y-2">
              {JSON.parse(plan.features).map((feature, idx) => (
                <li key={idx} className="text-gray-700 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex justify-between gap-3">
              <button onClick={() => handleEdit(plan)} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg flex justify-center items-center gap-1 transition duration-300">
                <Pencil size={16} /> Edit
              </button>
              <button onClick={() => handleDelete(plan.id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex justify-center items-center gap-1 transition duration-300">
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMembership;

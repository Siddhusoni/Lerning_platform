import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckCircle, Trash2, Pencil } from 'lucide-react';

const MembershipPlan = () => {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({
    title: '',
    price: '',
    duration: '',
    features: '',
    badge: ''
  });
  const [editId, setEditId] = useState(null);

  // Fetch all plans on load
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

    if (editId) {
      await axios.put(`http://localhost:5000/api/membership/${editId}`, payload);
    } else {
      await axios.post('http://localhost:5000/api/membership', payload);
    }

    setForm({ title: '', price: '', duration: '', features: '', badge: '' });
    setEditId(null);
    fetchPlans();
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
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this plan?')) {
      await axios.delete(`http://localhost:5000/api/membership/${id}`);
      fetchPlans();
    }
  };

  return (
    <div className="pt-24 pb-16 px-4 md:px-8 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Manage Membership Plans</h2>

      {/* Admin Form */}
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mb-12 bg-white p-6 rounded-xl shadow-md space-y-4">
        <h3 className="text-xl font-bold mb-2">{editId ? 'Edit Plan' : 'Add New Plan'}</h3>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Plan Title" className="w-full p-2 border rounded" required />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price (e.g., ₹499/month)" className="w-full p-2 border rounded" required />
        <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration (e.g., Monthly)" className="w-full p-2 border rounded" required />
        <input name="features" value={form.features} onChange={handleChange} placeholder="Features (comma separated)" className="w-full p-2 border rounded" required />
        <input name="badge" value={form.badge} onChange={handleChange} placeholder="Badge (optional)" className="w-full p-2 border rounded" />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">{editId ? 'Update' : 'Add Plan'}</button>
      </form>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="relative p-6 rounded-2xl shadow-xl border-2 bg-white border-gray-200 hover:scale-105 transition-transform duration-300"
          >
            {plan.badge && (
              <span className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                {plan.badge}
              </span>
            )}
            <h3 className="text-2xl font-bold mb-2 text-gray-800">{plan.title}</h3>
            <p className="text-4xl font-extrabold text-indigo-700 mb-2">{plan.price}</p>
            <p className="text-sm text-gray-500 mb-4">{plan.duration}</p>

            <ul className="mb-6 space-y-3">
              {JSON.parse(plan.features).map((feature, idx) => (
                <li key={idx} className="text-gray-700 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex justify-between gap-4">
              <button onClick={() => handleEdit(plan)} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-1 rounded-lg flex justify-center items-center gap-1">
                <Pencil size={16} /> Edit
              </button>
              <button onClick={() => handleDelete(plan.id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 rounded-lg flex justify-center items-center gap-1">
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipPlan;

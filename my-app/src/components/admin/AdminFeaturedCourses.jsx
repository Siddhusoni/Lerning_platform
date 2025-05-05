import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminFeaturedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: '', image: '', price: '' });
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/featured-courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error('Error fetching courses:', err));
  }, [refresh]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    axios.post('http://localhost:5000/api/featured-courses', form)
      .then(() => {
        setForm({ title: '', image: '', price: '' });
        setRefresh(!refresh);
      })
      .catch(err => console.error('Error adding course:', err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/featured-courses/${id}`)
      .then(() => setRefresh(!refresh))
      .catch(err => console.error('Error deleting course:', err));
  };

  return (
    <div className="p-6 mt-20">
      <h2 className="text-2xl font-bold mb-4">📚 Manage Featured Courses</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Course Title"
          className="border px-4 py-2 rounded" />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL"
          className="border px-4 py-2 rounded" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price"
          className="border px-4 py-2 rounded" />
        <button onClick={handleAdd} className="col-span-1 md:col-span-3 bg-red-500 text-white py-2 rounded hover:bg-red-600">
          ➕ Add Course
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {courses.map(course => (
          <div key={course.id} className="bg-white p-4 shadow rounded-lg">
            <img src={course.image} alt={course.title} className="w-full h-32 object-cover rounded" />
            <h3 className="font-bold mt-2">{course.title}</h3>
            <p className="text-sm text-gray-600">{course.price}</p>
            <button onClick={() => handleDelete(course.id)} className="mt-2 text-sm text-red-600 hover:underline">
              ❌ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFeaturedCourses;

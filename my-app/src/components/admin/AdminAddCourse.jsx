import { useState, useEffect } from "react";
import axios from "axios";

const AdminAddCourse = () => {
  const [course, setCourse] = useState({
    title: "",
    price: "",
    image: "",
    duration: "",
  });
  const [courses, setCourses] = useState([]);
  const [editId, setEditId] = useState(null);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const fetchCourses = () => {
    axios
      .get("http://localhost:5000/api/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => {
        console.error(err);
        showMessage("Failed to fetch courses.", "error");
      });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/courses/${editId}`, course);
        showMessage("Course updated successfully!");
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/api/courses", course);
        showMessage("Course added successfully!");
      }

      setCourse({ title: "", price: "", image: "", duration: "" });
      fetchCourses();
    } catch (error) {
      console.error("Error:", error);
      showMessage("Something went wrong.", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`);
      fetchCourses();
      showMessage("Course deleted successfully!");
    } catch (err) {
      console.error(err);
      showMessage("Failed to delete course.", "error");
    }
  };

  const handleEdit = (course) => {
    setEditId(course.id);
    setCourse({
      title: course.title,
      price: course.price,
      image: course.image,
      duration: course.duration,
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Message */}
      {message && (
        <div
          className={`text-center py-2 px-4 rounded mb-4 font-semibold transition duration-500 ${
            messageType === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {message}
        </div>
      )}

      <h2 className="text-3xl font-bold mb-6 text-center text-red-500">
        {editId ? "Update Course" : "Add New Course"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white shadow-md p-6 rounded-lg"
      >
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          onChange={handleChange}
          value={course.title}
          className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-300 outline-none transition"
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Course Price"
          onChange={handleChange}
          value={course.price}
          className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-300 outline-none transition"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
          value={course.image}
          className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-300 outline-none transition"
          required
        />
        <input
          type="text"
          name="duration"
          placeholder="Course Duration"
          onChange={handleChange}
          value={course.duration}
          className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-300 outline-none transition"
          required
        />

        <button
          type="submit"
          className="col-span-1 sm:col-span-2 bg-red-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition"
        >
          {editId ? "Update Course" : "Add Course"}
        </button>
      </form>

      {/* Course List */}
      <h3 className="text-2xl font-semibold mt-12 mb-6 text-center text-gray-800">
        Course List
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div
            key={c.id}
            className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition duration-300"
          >
            <img
              src={c.image}
              alt={c.title}
              className="w-full h-40 object-cover rounded"
            />
            <h4 className="text-xl font-bold mt-3 text-gray-800">{c.title}</h4>
            <p className="text-sm text-gray-600">Price: ₹{c.price}</p>
            <p className="text-sm text-gray-600">Duration: {c.duration}</p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(c)}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(c.id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAddCourse;

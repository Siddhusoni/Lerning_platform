import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Courses = () => {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courses") // must match backend route
      .then((res) => setCourseData(res.data))
      .catch((err) => console.log("Error:", err));
    }, []);
return (
    
    <div className="p-8 bg-gray-100 min-h-screen mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-500">Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseData.map((course) => (
          <div key={course.id} className="bg-white shadow rounded p-4">
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-4">{course.title}</h3>
            <p className="text-gray-500">Duration: {course.duration}</p>
            <p className="text-green-600 font-bold">₹{course.price}</p>
            <Link
              to={`/enroll/${course.id}`}
              state={{ course }}
              className="text-blue-500 hover:underline mt-2 block"
            >
              <button className="mt-3 bg-red-500 text-white py-1 px-3 rounded">Enroll Now</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};        
export default Courses;

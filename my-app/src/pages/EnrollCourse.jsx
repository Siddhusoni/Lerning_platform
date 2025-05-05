import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const EnrollCourse = () => {
    const { state } = useLocation();
    const { id } = useParams();
    const course = state?.course;

    const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ message: "", type: "" });

    if (!course) {
        return (
            <div className="text-center mt-20 text-red-600 font-semibold text-xl">
                ⚠️ Course not found or data not passed correctly!
            </div>
        );
    }

    const showToast = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast({ message: "", type: "" }), 2000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.mobile) {
            showToast("Please fill out all fields.", "error");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                ...formData,
                courseId: id,
                title: course.title,
                price: course.price,
            };

            const response = await axios.post("http://localhost:5000/api/enroll", payload);
            console.log(response.data);
            setSubmitted(true);
            showToast("Enrolled Successfully!", "success");
        } catch (error) {
            console.error("Error enrolling:", error);
            showToast("Something went wrong. Please try again.", "error");
        }
        setLoading(false);
    };

    return (
        <div className="max-w-6xl mx-auto pt-20 px-4 sm:px-6 lg:px-8 relative">

            {/* ✅ Smooth Toast Message */}
            {toast.message && (
                <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 w-[90%] max-w-xs sm:max-w-sm px-6 py-3 rounded-lg shadow-lg text-white transition-opacity duration-500 z-50
                    ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
                    {toast.message}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">

                {/* Left Side - Course Info */}
                <div className="p-6 flex flex-col justify-center items-center bg-gray-100">
                    <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-64 object-cover rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
                    />
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-6 text-red-600 text-center">{course.title}</h2>
                    <p className="mt-4 text-gray-700 text-lg"><strong>Duration:</strong> {course.duration}</p>
                    <p className="text-green-700 text-lg font-semibold"><strong>Price:</strong> ₹{course.price}</p>
                </div>

                {/* Right Side - Form */}
                <div className="p-6 sm:p-8 flex flex-col justify-center">
                    {submitted ? (
                        <div className="bg-green-100 border border-green-300 text-green-800 text-lg text-center px-4 py-5 rounded-lg shadow">
                            🎉 You’ve successfully enrolled in <strong>{course.title}</strong>!
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {["name", "email", "mobile"].map((field, idx) => (
                                <div key={idx} className="relative">
                                    <input
                                        type={field === "email" ? "email" : field === "mobile" ? "tel" : "text"}
                                        name={field}
                                        id={field}
                                        placeholder=" "
                                        value={formData[field]}
                                        onChange={handleChange}
                                        className="peer w-full px-4 pt-6 pb-2 text-base sm:text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    />
                                    <label
                                        htmlFor={field}
                                        className="absolute left-4 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all"
                                    >
                                        {field === "name"
                                            ? "Full Name"
                                            : field === "email"
                                                ? "Email Address"
                                                : "Mobile Number"}
                                    </label>
                                </div>
                            ))}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-3 text-lg rounded-lg hover:from-red-600 hover:to-red-800 transition-all duration-300"
                            >
                                {loading ? "Enrolling..." : "✅ Confirm Enrollment"}
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* Bottom Features */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                {[
                    ["📜 Certificate", "Get a recognized certificate after completion."],
                    ["♾ Lifetime Access", "Access the course content anytime, forever."],
                    ["📞 Live Support", "Get help via chat, call or email 24/7."],
                    ["💡 Expert Mentorship", "Learn from experienced industry professionals."]
                ].map(([title, desc], i) => (
                    <div key={i} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold text-red-600 mb-2">{title}</h3>
                        <p className="text-gray-600">{desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EnrollCourse;

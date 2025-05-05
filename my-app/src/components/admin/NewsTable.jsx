import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsTable = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/news');
      setNewsList(res.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNews = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this news?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/news/${id}`);
      alert("News deleted successfully!");
      fetchNews();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Error deleting news.");
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="mt-10 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-red-500">📋 News Management</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading news...</p>
      ) : (
        <table className="w-full border rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {newsList.length > 0 ? (
              newsList.map((news) => (
                <tr key={news.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3">{news.title}</td>
                  <td className="p-3">{news.date}</td>
                  <td className="p-3">{news.category}</td>
                  <td className="p-3">
                    <img
                      src={news.image}
                      alt="news"
                      className="w-24 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteNews(news.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-5">
                  No news found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NewsTable;

import React, { useEffect, useState } from "react";
import axios from "axios";

const LatestNews = () => {
  const [newsUpdates, setNewsUpdates] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/news")
      .then((res) => setNewsUpdates(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-red-500">📰 Latest News Updates</h2>
        <p className="text-gray-600 mt-2">Stay informed with recent achievements and educational innovations</p>
      </div>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-4">
        {newsUpdates.map((news, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md flex flex-col md:flex-row overflow-hidden">
            <img src={news.image} alt="news" className="w-full md:w-1/3 h-48 md:h-auto object-cover" />
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{news.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{new Date(news.date).toLocaleDateString()} · <span className="font-medium">{news.category}</span></p>
              </div>
              <button className="mt-4 self-start text-red-600 hover:underline font-medium">Learn More →</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestNews;

import React from 'react';
import Sidebar from './Sidebar';
import NewsForm from './NewsForm';
import NewsTable from './NewsTable';


const NewsManagement = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-16 p-8 w-full mt-4">
        <NewsForm />
        <NewsTable />

      </div>
    </div>
  );
};

export default NewsManagement;

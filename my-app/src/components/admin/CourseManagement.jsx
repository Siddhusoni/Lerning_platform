import React from 'react';
import Sidebar from './Sidebar';

import AdminAddCourse from './AdminAddCourse';


const CourseManagement = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-16 p-8 w-full mt-4">
      
        <AdminAddCourse/>
      </div>
    </div>
  );
};

export default CourseManagement;

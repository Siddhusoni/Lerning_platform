import React from 'react';
import Sidebar from './Sidebar';

import AdminAds from './AdminAds';


const AdminAdsManage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-16 p-8 w-full mt-4">
      
        <AdminAds/>
      </div>
    </div>
  );
};

export default AdminAdsManage;

import React from 'react';
import Sidebar from './Sidebar';

import AdminMembership from './AdminMembership';


const MemberShipMange = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-16 p-8 w-full mt-4">
      
      <AdminMembership/>
      </div>
    </div>
  );
};

export default MemberShipMange;

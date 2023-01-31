import React from 'react';
import AllNews from '../components/news/AllNews';
import SideBar from '../components/SideBar';

const LayoutDashboard = ( {children} ) => {
  return (
    <div>
      <SideBar>
        <AllNews />
        {children}
      </SideBar>
    </div>
  )
}

export default LayoutDashboard
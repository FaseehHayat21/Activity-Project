import React from 'react'
import { Outlet } from 'react-router-dom';
import CustomerSideBar from '../../Component/Laptop/CustomerSidebar/CustomerSideBar';
import "./CustomerDashboard.css"
export default function CustomerDashboard() {
  return (
    <div className="App">
       
          <div className="sidebar-s">
          <CustomerSideBar/>
          </div>
          <div className="content">
            <Outlet />
          </div>
       
      </div>
  )
}

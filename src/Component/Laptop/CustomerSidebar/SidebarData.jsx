import React from 'react';
import { FaUser, FaChartLine } from "react-icons/fa";
import { IoFitnessSharp  } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { FaStar } from "react-icons/fa"; // Add this

export const SidebarData = [
  {
    title: 'Profile',
    path: 'profile',
    icon: <FaUser />,
    cName: 'nav-text'
  },
  {
    title: 'Log',
    path: 'dailylog',
    icon: <IoFitnessSharp />,
    cName: 'nav-text'
  },
 {
    title: 'Progress',
    path: 'progress',
    icon: <FaChartLine />,
    cName: 'nav-text'
  },
  {
    title: 'Logout',
    path: '/login',
    icon: <CiLogout  />,
    cName: 'nav-text'
  }
];
// src/components/navBar.js
import React from 'react';
import { MdHome, MdArticle, MdQuestionAnswer, MdSearch, MdNotifications, MdPerson } from 'react-icons/md'; // Using Material Design Icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const NavBar = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const role = localStorage.getItem('role');
  const bgColor = role === 'user' ? '#3973EB' : '#30A45E';
  
  const navItems = [
    { name: 'Home', icon: <MdHome />, path: '/' }, // Add paths for navigation
    { name: 'Articles', icon: <MdArticle />, path: '/articles' },
    { name: 'Ask', icon: <MdQuestionAnswer />, path: '/ask' },
    { name: 'Notifications', icon: <MdNotifications />, path: '/notifications' },
    { name: 'Profile', icon: <MdPerson />, path: '/profile' }, // Profile path
  ];

  return (
    <div className="bg-[#3973EB] text-white px-8 py-4 flex justify-between items-center w-full" style={{ backgroundColor: bgColor }}>
      {/* Left-side - SPEROW */}
      <div className="font-semibold text-2xl cursor-pointer">
        SPEROW
      </div>

      {/* Right-side Nav Items with Search Bar */}
      <div className="flex items-center gap-8">
        {/* Navigation Items */}
        <ul className="flex gap-6 font-medium text-lg list-none items-center cursor-pointer">
          {navItems.slice(0, 3).map((item, index) => (
            <li key={index} className="nav-item flex items-center" onClick={() => navigate(item.path)}>
              <span className="nav-icon inline-block mr-2">
                {item.icon}
              </span>
              <span>{item.name}</span>
            </li>
          ))}
        </ul>

        {/* Centered Search Bar */}
        <div className="flex items-center border border-white rounded-md overflow-hidden bg-white text-black">
          <input
            type="text"
            placeholder="Search"
            className="py-2 px-3 border-none focus:outline-none bg-transparent"
          />
          <span className="text-gray-500 p-2">
            <MdSearch /> {/* Search icon */}
          </span>
        </div>

        {/* Right-side Items */}
        <ul className="flex gap-6 font-medium text-lg list-none items-center cursor-pointer">
          {navItems.slice(3).map((item, index) => (
            <li key={index} className="nav-item flex items-center" onClick={() => navigate(item.path)}>
              <span className="nav-icon inline-block mr-2">
                {item.icon}
              </span>
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;

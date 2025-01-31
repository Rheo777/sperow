import React from 'react';
import { FaUserFriends, FaQuestionCircle, FaSave, FaBell, FaCog, FaThumbsUp } from 'react-icons/fa';
import userAvatar from '../assets/doctors.jpg'; // Make sure the path is correct
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate(); // Initialize useNavigate here

  const sections = [
    { label: 'Following', value: 24, icon: <FaUserFriends /> },
    { label: 'Questions Asked', value: 24, icon: <FaQuestionCircle /> },
    { label: 'Saved', value: 24, icon: <FaSave /> },
    { label: 'Notifications', value: 24, icon: <FaBell /> },
    { label: 'Settings', value: 24, icon: <FaCog /> },
    { label: 'Liked', value: 24, icon: <FaThumbsUp /> },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-10 p-8 bg-blue-100">
      {/* User Profile Section */}
      <div className="flex flex-col items-center">
        <img
          className="w-32 h-32 rounded-full object-cover mb-4" // Reduced size for avatar
          src={userAvatar}
          alt="User Avatar"
        />
        <button className="flex items-center px-4 py-1.5 bg-[#3973eb] text-white rounded-full font-semibold text-lg shadow-lg hover:bg-[#2851a3] transition-all" onClick={() => navigate('/edit-profile')}>
          <i className="uil uil-edit mr-2" />
          Edit Profile
        </button>
      </div>

      {/* Content Rows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
        {sections.map((item, index) => (
          <div
            key={index}
            className="relative flex flex-col justify-center items-center bg-white p-4 w-80 h-24 rounded-md shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-xl hover:bg-blue-50 duration-300"
          >
            {/* Floating Icon */}
            <div className="absolute -top-6 left-4 bg-[#3973eb] text-white rounded-full p-2 shadow-lg">
              {item.icon}
            </div>

            {/* Content */}
            <div className="mt-8 text-center">
              <div className="text-[#3973eb] text-lg font-semibold mb-0.5">
                {item.label}
              </div>
              <div className="text-gray-600 text-md font-bold">
                {item.value}
              </div>
            </div>

            {/* Animated Border */}
            <div className="absolute top-0 left-0 w-full h-full rounded-md border-2 border-transparent hover:border-[#3973eb] hover:shadow-xl transition-all duration-300 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="mt-8">
        <button className="px-6 py-2 bg-[#3973eb] text-white rounded-full font-semibold text-lg shadow-lg hover:bg-[#2851a3] transition-all">
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;

import React from 'react';
import { FaArrowLeft } from 'react-icons/fa'; // Importing the left arrow icon

const SettingsPage = () => {
  return (
    <div className="w-full max-w-[26rem] h-auto flex flex-col justify-center items-start gap-3 mt-8 ml-4"> {/* Moved down (mt-8) and left (ml-4) */}
      {/* Settings Header */}
      <div className="w-full h-[4.875rem] px-5 py-2.5 bg-[#f4f4f4] rounded-[0.625rem] border border-[#f4f4f4] flex items-center transition duration-200 transform hover:scale-105"> {/* Added hover effect */}
        <FaArrowLeft className="text-[#6c6969] mr-2" /> {/* Left arrow icon */}
        <h1 className="text-[#6c6969] text-2xl font-semibold font-['Nunito'] text-center flex-1">Settings</h1> {/* Centered text */}
      </div>

      {/* Settings Options Container */}
      <div className="w-full h-auto bg-[#f4f4f4] rounded-[0.625rem] flex flex-col items-center gap-4 py-5">
        {/* User Profile Button */}
        <button className="w-[80%] h-[5.1875rem] p-4 bg-[#ebeced] rounded-[0.625rem] flex justify-center items-center transition duration-200 transform hover:scale-105">
          <span className="text-black text-xl font-medium font-['Nunito']">User Profile</span>
        </button>

        {/* Sign in & Security Button */}
        <button className="w-[80%] h-[5.1875rem] p-4 bg-[#ebeced] rounded-[0.625rem] flex justify-center items-center transition duration-200 transform hover:scale-105">
          <span className="text-[#6c6969] text-xl font-medium font-['Nunito']">Sign in & Security</span>
        </button>

        {/* Help Button */}
        <button className="w-[80%] h-[5.1875rem] p-4 bg-[#ebeced] rounded-[0.625rem] flex justify-center items-center transition duration-200 transform hover:scale-105">
          <span className="text-[#6c6969] text-xl font-medium font-['Nunito']">Help</span>
        </button>

        {/* Privacy Center Button */}
        <button className="w-[80%] h-[5.1875rem] p-4 bg-[#ebeced] rounded-[0.625rem] flex justify-center items-center transition duration-200 transform hover:scale-105">
          <span className="text-[#6c6969] text-xl font-medium font-['Nunito']">Privacy Center</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;

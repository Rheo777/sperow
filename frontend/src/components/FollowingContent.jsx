// DoctorProfileCard.jsx
import React from 'react';
import doctorImage from '../assets/doctors.jpg'; // Replace with your actual image path

const DoctorProfileCard = () => {
  
  return (
    <div className="w-full max-w-[60%] mx-auto my-4 p-6 bg-white rounded-lg border border-gray-200 shadow-lg flex flex-col transition-transform transform hover:scale-105 duration-300 ease-in-out">
      <div className="flex items-start">
        {/* Enlarged Doctor's Image */}
        <img
          className="w-[35%] h-[70%] max-w-[150px] max-h-[150px] rounded-full border-4 border-[#3973eb] shadow-lg object-cover"
          src={doctorImage}
          alt="Doctor"
        />
        <div className="ml-6 flex flex-col justify-between w-full">
          <div>
            {/* Doctor's Name */}
            <h2 className="text-[#2f2d2d] text-[1.75rem] font-bold font-['Nunito']">
              Dr. Dinesh Reddy
            </h2>
            {/* Specialty */}
            <p className="text-[#3973eb] text-lg font-semibold font-['Nunito']">Gynecologist</p>
            {/* Experience */}
            <p className="text-[#6d6d6d] text-[0.9rem] font-medium font-['Nunito']">10 Years Experience</p>
            {/* Hospital Name */}
            <p className="text-black text-[0.9rem] font-medium font-['Nunito']">Apollo Hospital</p>
            {/* Location */}
            <p className="text-[#6d6d6d] text-[0.9rem] font-medium font-['Nunito']">Dwaraka Nagar, Visakhapatnam</p>
            {/* Followers Count */}
            <p className="text-[#3973eb] text-[0.9rem] font-medium font-['Nunito']">24 Followers</p>
          </div>
          {/* Buttons Section */}
          <div className="flex justify-between mt-4">
            {/* View Profile Button */}
            <button className="px-4 py-2 bg-[#3973eb] text-white rounded-md shadow-md hover:bg-[#2851a3] transition-all duration-300 ease-in-out">
              View Profile
            </button>
            {/* Follow Button Styled Like Rectangle Component */}
            <button className="px-4 py-2 bg-[#f0f0f0] text-[#3973eb] rounded-md border border-[#3973eb] shadow-md hover:bg-[#3973eb] hover:text-white transition-all duration-300 ease-in-out">
              Follow
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 border-t border-gray-200 pt-4">
        <p className="text-gray-500 text-sm font-['Nunito'] text-center">
          Connect with Dr. Dinesh for expert consultation and care.
        </p>
      </div>
    </div>
  );
};

export default DoctorProfileCard;

import React, { useEffect, useState } from 'react';
import { FaUserPlus } from 'react-icons/fa'; // Importing an icon for the Follow button
import backgroundImage from '../assets/doctors.jpg'; // Replace with your actual image path
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RectangleComponentStylish = () => {
  const { doctorId } = useParams(); // Extracting doctorId from the URL
  const [doctor, setDoctor] = useState(null);

  // Function to fetch doctor details
  const fetchDocDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5003/api/doctors/${doctorId}`);
      console.log(response);
      setDoctor(response.data); // Store the fetched doctor details in state
    } catch (error) {
      console.error('Error fetching doctor details:', error);
    }
  };

  // Fetch doctor details when the component mounts
  useEffect(() => {
    if (doctorId) {
      fetchDocDetails();
    }
  }, [doctorId]);

  return (
    <div className="w-full max-w-[95%] mx-auto mt-5 relative p-2">
      {/* Container for the Split Section */}
      <div className="flex w-full h-[24rem] rounded-[1.25rem] overflow-hidden shadow-2xl relative">
        {/* Left Half - Image with Diagonal Overlay */}
        <div
          className="w-1/2 relative"
          style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          {/* Diagonal Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00000088] to-transparent clip-diagonal"></div>
        </div>

        {/* Right Half - Content Section */}
        <div className="w-1/2 bg-white p-6 flex flex-col justify-center items-start space-y-3">
          {/* Doctor's Name */}
          <div className="text-[#2f2d2d] text-[1.6rem] font-bold font-['Nunito'] leading-tight">
            {doctor?.username} {/* Use optional chaining to avoid errors */}
          </div>
          {/* Brief Description */}
          <p className="text-[#6d6d6d] text-[1rem] font-normal">
            Highly skilled Orthopedic Surgeon with expertise in knee replacement, spine surgeries, and trauma care, with over 18 years of experience.
          </p>
          {/* Follow Button */}
          <button className="mt-4 flex items-center gap-2 px-5 py-2 bg-[#3973eb] text-white rounded-full font-semibold shadow-lg hover:bg-[#2851a3] hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <FaUserPlus />
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default RectangleComponentStylish;

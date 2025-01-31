// DoctorProfileCard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import doctorImage from '../assets/doctors.jpg'; // Replace with your actual image path
import { FaUserPlus } from 'react-icons/fa'; // Import the FaUserPlus icon

const DoctorProfileCard = () => {
  const { doctorId } = useParams();
  const [doctorData, setDoctorData] = useState(null); // State to hold fetched doctor data
  const [loading, setLoading] = useState(true); // State to handle loading

  // Fetch data from the API when the component mounts
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5003/api/doctors/${doctorId}`);
      setDoctorData(response.data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching doctor info:', error);
    } finally {
      setLoading(false); // Set loading to false after the fetch is complete
    }
  };
  const fetchFollowerData = async ()=>{
    try {
      const response = await axios.get(`http://localhost:5003/api/doctors/${doctorData.following.id}`);
      setDoctorData(response.data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching doctor info:', error);
    } finally {
      setLoading(false); // Set loading to false after the fetch is complete
    }
  }
  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
  }, [doctorId]);

  // Display a loading message while data is being fetched
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  // Handle case when doctor data is not available
  if (!doctorData) {
    return <div className="text-center">No doctor information found.</div>;
  }
  return (
    <div className="w-full max-w-[80%] mx-auto my-4 p-6 bg-white rounded-lg border border-gray-200 shadow-lg flex flex-col transition-transform transform hover:scale-105 duration-300 ease-in-out">
      <div className="flex items-center">
        {/* Enlarged Doctor's Image with Full Circle Layout */}
        <img
          className="w-[20%] h-[20%] max-w-[80px] max-h-[80px] rounded-full border-4 border-[#3973eb] shadow-lg object-cover"
          src={doctorImage}
          alt="Doctor"
        />
        <div className="ml-4 flex flex-col justify-between w-full">
          <div>
            {/* Doctor's Name */}
            <h2 className="text-[#2f2d2d] text-[1.5rem] font-bold font-['Nunito']">
              {doctorData.username}
            </h2>
            {/* Specialty */}
            <p className="text-[#3973eb] text-lg font-semibold font-['Nunito']">{doctorData.specialization}</p>
            {/* Experience */}
            <p className="text-[#6d6d6d] text-[0.9rem] font-medium font-['Nunito']">{doctorData.experience} Experience</p>
            {/* Hospital Name */}
            <p className="text-black text-[0.9rem] font-medium font-['Nunito']">Apollo Hospital</p>
            {/* Location */}
            <p className="text-[#6d6d6d] text-[0.9rem] font-medium font-['Nunito']">Dwaraka Nagar, Visakhapatnam</p>
            {/* Followers Count */}
            <p className="text-[#3973eb] text-[0.9rem] font-medium font-['Nunito']">{doctorData.followers.length} Followers</p>
          </div>
          {/* Buttons Section */}
          <div className="flex justify-between mt-4">
            {/* View Profile Button */}
            <button className="mt-4 flex items-center gap-2 px-5 py-2 bg-[#3973eb] text-white rounded-full font-semibold shadow-lg hover:bg-[#2851a3] hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
              
              View Profile
            </button>
            {/* Updated Follow Button */}
            <button className="mt-4 flex items-center gap-2 px-5 py-2 bg-[#3973eb] text-white rounded-full font-semibold shadow-lg hover:bg-[#2851a3] hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
              <FaUserPlus />
              Follow
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 border-t border-gray-200 pt-4">
        <p className="text-gray-500 text-sm font-['Nunito'] text-center">
          Connect with Dr. Dinesh for expert recommendations to enhance your health.
        </p>
      </div>
    </div>
  );
};

export default DoctorProfileCard;

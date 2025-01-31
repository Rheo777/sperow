import React, { useState, useEffect } from 'react';  
import axios from 'axios';
import UserLogOut from './buttonContainer'; // Assuming the component is correctly imported
import profile from '../assets/profileImage.png';
import useStore from '../stores/store';
import { UilUserPlus, UilUserMinus } from '@iconscout/react-unicons';
import { useNavigate } from 'react-router-dom';
function MainPageRight() {
  const [doctors, setDoctors] = useState([]);
  const { followStatus, initializeFollowStatus, toggleFollow } = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    initializeFollowStatus(doctors); // Adjust to match your data structure
  }, [initializeFollowStatus, doctors]);
  const viewDocProfile = async (doctorId)=>{
    navigate(`/doctors/${doctorId}`)
  }
  useEffect(() => {
    // Fetch doctors when component mounts
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5003/api/doctors');
        
        // Check the structure of the response data
        console.log('Doctors data:', response); // Log the data
        
        // Set the state with the fetched data
        setDoctors(response.data); // Assuming response.data is an array of doctors
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="w-56 p-4 h-auto bg-white rounded-[10px] shadow-lg mx-auto">
      {/* Suggestions for You */}
      <div className="w-full h-auto p-3 bg-[#EBECED] rounded-[10px] flex justify-center items-center mb-4">
        <div className="text-black text-[12px] font-semibold font-['Nunito']">
          Suggestions for you
        </div>
      </div>

      {/* Render doctors dynamically */}
      <div className="space-y-3 py-2">
        {doctors.length > 0 ? (
          doctors.map((doctor) => {
            const isFollowing = followStatus[doctor._id]; // Check follow status for the doctor

            return (
              <button onClick={() => viewDocProfile(doctor._id)}>
              <UserLogOut
                key={doctor._id} // Unique key for each doctor
                profileImage={profile} // Fallback to default profile image if not available
                name={doctor.username}
                subhead={`${doctor.specialization} | ${doctor.experience}`} // Use the length of followers array
                iconSrc={isFollowing ? 'uil uil-user-minus' : 'uil uil-user-plus'} // Conditional icon
                
              />
              </button>
            );
          })
        ) : (
          <div>No doctors found.</div> // Message when no doctors are available
        )}
      </div>

      {/* View More Button */}
      <div className="flex justify-center mt-4">
        <button className="text-[#3973EB] font-semibold text-sm underline">
          View More
        </button>
      </div>
    </div>
  );
}

export default MainPageRight;

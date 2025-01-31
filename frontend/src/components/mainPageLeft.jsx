import React, { useState, useEffect } from 'react';
import ButtonContainer from './buttonContainer';
import CategoryContainer from './categoryContainer';
import profile from '../assets/profileImage.png';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import userLoginPic from '../assets/userLogin.gif';
import doctorLoginPic from '../assets/doctorLogin.gif';
import useAuthStore from "../stores/useAuthStore";
function MainPageLeft() {
  const [userName, setUserName] = useState('');
  const { setRole, role, getRole } = useAuthStore();
  const navigate = useNavigate();
  // Function to get and decode the JWT token
  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage (or use cookies)
    
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.username || decodedToken.name || 'Anonymous');
      } catch (error) {
        console.error('Error decoding token:', error);
        setUserName('Guest');
      }
    } else {
      setUserName('Guest');
    }
  }, []);

  return (
    <div className="w-56 p-4 h-auto bg-white rounded-[10px] shadow-lg mx-auto my-auto">
      <div className="mb-4">
        <ButtonContainer 
          profileImage={profile} 
          name={userName} // Use decoded username
          subhead="24 Followers" 
          iconSrc="uil uil-signout"
          signOut={()=>{
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          navigate('/');

          }}
        />
      </div>

      <div className="w-full h-auto bg-[#f4f4f4] rounded-[10px] p-4">
        <div className="w-full h-auto p-3 bg-[#EBECED] rounded-[10px] flex justify-center items-center mb-4">
          <div className="text-black text-[12px] font-semibold font-['Nunito']">Select Your Interests</div>
        </div>

        <div className="space-y-3 py-2">
          <CategoryContainer content="Cardiology" />
          <CategoryContainer content="Neurology" />
          <CategoryContainer content="Orthopedics" />
          <CategoryContainer content="Dermatology" />
          <CategoryContainer content="Pediatrics" />
        </div>
      </div>
    </div>
  );
}

export default MainPageLeft;

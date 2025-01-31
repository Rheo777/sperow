import React from "react";
import NavBar from "./navBar";
import Card from "./cards"; // Assuming Card component has already been converted to Tailwind CSS
import Footers from "./footer"; // Assuming this is your original footer code
import users from '../assets/users.jpg';
import doctors from '../assets/doctors.jpg';
import userLoginPic from '../assets/userLogin.gif';
import doctorLoginPic from '../assets/doctorLogin.gif'
import {useNavigate} from 'react-router-dom';
import useAuthStore from "../stores/useAuthStore";
const StartPage = () => {
  const navItems = [
    { name: 'Products' },
    { name: 'Contact' },
    { name: 'About Us' }
  ];
  const navigate = useNavigate();
  const { setRole } = useAuthStore();


  return (
    <>
      <NavBar list={navItems} />

      <div className="flex flex-col md:flex-row justify-center gap-8 my-10 px-4 md:px-16">
        <Card 
          className="bg-[linear-gradient(123deg,_rgba(247,_247,_247,_0.20)_5.68%,_rgba(18,_153,_162,_0.11)_43.27%,_rgba(20,_51,_217,_0.12)_104.51%)]"   
          heading="For Users" 
          iconSrc={users}   
          description="This is a sample description for users. It explains how users can benefit from our services and provides detailed information."
          onclick={()=>{
            navigate('/userLogin');
          }}
        />
        <Card 
          className="bg-[linear-gradient(123deg,_rgba(247,_247,_247,_0.20)_5.68%,_rgba(107,_178,_110,_0.11)_43.27%,_rgba(17,_205,_69,_0.20)_104.51%)]"  
          heading="For Doctors" 
          iconSrc={doctors}  
          description="This is a sample description for doctors. It highlights the advantages and features available for doctors."
          onclick={()=>{
            navigate('/docLogin')
          }}
        />
      </div>

<Footers/>
    </>
  );
}

export default StartPage;

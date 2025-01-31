import React from "react";
import LoginForm from "./docSignCard";
import NavBar from "./navBar";
import Footers from "./footer";
import doctorLoginPic from '../assets/doctorLogin.gif'
import { useLocation } from "react-router-dom";

const UserLogin = () => {
    const location = useLocation();
    const navItems = [
        { name: 'Products' },
        { name: 'Contact' },
        { name: 'About Us' }
    ];

    const inputs = [
        {name:'email', type: 'text', placeholder: 'Enter Username', required: true },
        {name:'password', type: 'password', placeholder: 'Enter Password', required: true }
    ];

    const buttons = {
        main: 'Login',
        google: 'Login With Google'
    };

    return (
        <>
            <NavBar list={navItems} />
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16  my-8 mx-20  md:mx-10">
            
                    <img 
                        src={doctorLoginPic} 
                        alt="User Login" 
                        className="w-full h-full md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full shadow-md mb-6 md:mb-0 mr-10" 
                        style={{ boxShadow: '0px 4px 12px rgb(0, 136, 255)' }}
                    />
            
                <LoginForm inputs={inputs} buttons={buttons} />
            </div>
            <Footers/>
        </>
    );
}

export default UserLogin;

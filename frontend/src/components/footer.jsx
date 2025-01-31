import React from "react";
import facebookIcon from '../assets/facebook_5968764.png';
import linkedinIcon from "../assets/linkedin.png"
import instagramIcon from "../assets/instagram.png"
import emailIcon from "../assets/email.png"


const Footers = () => {
  return (
    <div className="bg-white py-16">
      
      <div className="flex flex-col justify-between items-start px-4 md:px-16 lg:px-24">
        <div className="flex flex-wrap justify-between w-full text-left mb-8">
          <div className="flex flex-col text-black mb-4">
            <h5 className="text-lg font-semibold mb-2">Stay Connected with us</h5>
            <a href="/facebook" className="mb-2 text-black">
              <p className="flex items-center">
                <img src={facebookIcon} 
                alt="Facebook" 
                className="mr-2 w-5 h-5" />Facebook
              </p>
            </a>
            <a href="/linkedin" className="mb-2 text-black">
              <p className="flex items-center">
                <img src={linkedinIcon} 
                alt="LinkedIn" 
                className="mr-2 w-5 h-5" />LinkedIn
              </p>
            </a>
            <a href="/instagram" className="mb-2 text-black">
              <p className="flex items-center">
                <img src={instagramIcon} 
                alt="Instagram" 
                className="mr-2 w-5 h-5" />Instagram
              </p>
            </a>
          </div>
          <div className="flex flex-col text-black mb-4">
            <h5 className="text-lg font-semibold mb-2">Important Links</h5>
            <a href="/home" className="mb-2 text-black">
              <p>Home</p>
            </a>
            <a href="/AboutUs" className="mb-2 text-black">
              <p>About Us</p>
            </a>
            <a href="/privacy and policy" className="mb-2 text-black">
              <p>Privacy and Policy</p>
            </a>
            <a href="/t&c" className="mb-2 text-black">
              <p>Terms and Conditions</p>
            </a>
          </div>
          <div className="flex flex-col text-black mb-4">
            <h5 className="text-lg font-semibold mb-2">Contact Us</h5>
            <a href="/email" className="mb-2 text-black">
              <p className="flex items-center">
                <img src={emailIcon} 
                alt="Email" 
                className="mr-2 w-5 h-5" />sperow@gmail.com
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footers;

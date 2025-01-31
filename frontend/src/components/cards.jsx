import React from 'react';
import {useNavigate} from 'react-router-dom';
const Card = ({
  heading,
  iconSrc,
  description,
  className, // Add className to the props
  onclick,
}) => {
  const navigate = useNavigate();
  return (
    <div className={`flex flex-col items-center justify-center p-5 m-5 rounded-lg shadow-md ${className}`}>
      <h2 className="text-blue-600 text-xl mb-2">{heading}</h2>
      <img
        src={iconSrc}
        alt="icon"
        className="w-44 h-44 rounded-full mb-4" // 170px width and height
      />
      <p className="text-left w-[423px] h-[114px] font-medium text-lg mb-4 p-5">
        {description}
      </p>
      <button className="border-[2.2px] py-3 p-5 border-2 border-blue-600 rounded-lg text-blue-600 font-semibold mb-2"
      onClick={onclick}>
        Login
      </button>
      <p className="text-center text-xs">
        Don't Have An Account? 
        <span className="text-red-600 cursor-pointer" onClick={()=>{
          navigate('/UserSignUp');
        }}> Sign Up</span>
      </p>
    </div>
  );
}

export default Card;

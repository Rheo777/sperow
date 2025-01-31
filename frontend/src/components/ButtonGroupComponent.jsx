import React, { useState } from 'react';

const ButtonGroupComponent = ({ onSelectSection }) => {
  const buttons = ['Info', 'Posts', 'Articles', 'Answered', 'Following', 'Followers'];
  const [activeButton, setActiveButton] = useState(buttons[0]); // Set the default active button

  const handleButtonClick = (button) => {
    setActiveButton(button); // Update the active button state
    onSelectSection(button); // Call the parent function to handle section change
  };

  return (
    <div className="w-full max-w-[90%] mx-auto mt-6 p-4 bg-[#f9f9f9] rounded-[1rem] shadow-lg">
      <div className="flex justify-center items-start gap-[8rem]">
        {buttons.map((button, index) => (
          <button
            key={button}
            onClick={() => handleButtonClick(button)} // Use the new click handler
            className={`flex-grow flex-shrink basis-0 self-stretch p-2.5 rounded-[2rem] flex justify-center items-center gap-2.5 text-[1.1rem] font-semibold font-['Nunito'] transition duration-300 ease-in-out ${
              button === activeButton // Check if the button is active
                ? 'bg-[#3973eb] text-[#f4f4f4] hover:bg-[#2851a3]' // Active button styles
                : 'bg-[#f3f3f3] text-[#7c7c7c] hover:bg-gray-300' // Inactive button styles with gray shade
            }`}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonGroupComponent;

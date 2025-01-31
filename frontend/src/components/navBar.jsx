import React from 'react';
import { useTheme } from '../ThemeContext'; // Import the hook to use the theme

const NavBar = ({ list }) => {
  

  return (
    <>
      <div
        className="bg-[#3973eb] text-white px-8 py-4 flex justify-between items-center w-full md:flex-row sm:flex-col"
        // Apply theme
      >
        {/* Adjust the margin and padding for SPEROW */}
        <div className="font-semibold text-2xl cursor-pointer p-4 sm:ml-5 sm:text-xl mb-1">
          SPEROW
        </div>

        {/* Flex container for the nav items, aligned to the right */}
        <div className="flex flex-grow justify-end items-center gap-8 sm:gap-6 md:gap-12">
          <ul className="flex gap-[80px] md:gap-[100px] font-medium text-lg p-1 list-none items-center cursor-pointer sm:gap-8 sm:flex-wrap sm:text-base">
            {list.map((item, index) => (
              <li key={index} className="nav-item flex items-center sm:text-base">
                {item.icon && (
                  <img
                    src={item.icon}
                    alt={`${item.name} icon`}
                    className="nav-icon inline-block mr-9 md:mr-8 lg:mr-10 text-ali" // Margin for spacing between icon and text
                  />
                )}
                <span>{item.name}</span> {/* Text next to the icon */}
              </li>
            ))}
          </ul>

          {/* Adjust margin and padding for the Sign Up button */}
          <button className="border-white border-[1.2px] py-2 p-3 bg-transparent text-white rounded-md  text-base font-medium">
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;

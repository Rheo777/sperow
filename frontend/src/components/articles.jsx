// FeaturedArticles.js
import React from "react";
// Import the image
import backgroundImage from "../assets/image.png"; // Update the path to your image

const FeaturedArticles = () => {
  return (
    <div className="relative bg-gray-100 px-20 p-5">
      <div className="container mx-auto">
        {/* Increase height and width */}
        <div className="relative h-[500px] w-[1200px] mx-auto overflow-hidden rounded-lg shadow-lg "> {/* Width is set to 1200px */}

          {/* Background Image */}
          <img
            className="object-cover w-full h-full opacity-80" // Adjust opacity of the image
            src={backgroundImage}
            alt="Healthy food"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Dark overlay for better text contrast */}

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
            {/* Main Heading with thin underline and offset */}
            <h2 className="text-3xl md:text-4xl font-bold underline underline-offset-[20px] decoration-[1px]">
              Tips for Healthy Diet
            </h2>
            <p className="mt-20 text-base md:text-lg">
              Discover simple and practical tips for maintaining 
              a  </p> 
            <p className="mt-1 text-base md:text-lg">
             healthy diet
             and making nutritious food choices</p> .
           
            <button className="mt-4 px-4 md:px-5 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600">
              READ MORE
            </button>
          </div>

          {/* Featured Articles in the top-left corner */}
          <div className="absolute top-4 left-4 text-white">
            <h1 className="text-2xl md:text-3xl font-bold">Featured Articles</h1>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button className="p-2 ml-4 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75">
              ❮
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button className="p-2 mr-4 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75">
              ❯
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticles;

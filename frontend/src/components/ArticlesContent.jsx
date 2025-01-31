import React from 'react';
import image1 from '../assets/water.jpg';
import image2 from '../assets/sleeping.jpg';
import image3 from '../assets/stress.jpg';
import image4 from '../assets/skin.jpg';
import image5 from '../assets/joint.jpg'; // New image

const Articles = () => {
  return (
    <div className="w-[95%] mx-auto mt-10 p-4">
      <h2 className="text-black text-[2.5rem] font-semibold mb-6 text-center">Articles</h2>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-4">
        {/* Smaller Blog Card 1 */}
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform duration-300 hover:shadow-xl hover:scale-105 col-span-1 row-span-1">
          <img className="w-full h-56 object-cover" src={image2} alt="Mental Health Matters" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-4 text-white text-center">
            <h3 className="text-lg font-semibold mb-2 text-center">Mental Health Matters: How to Manage Stress Effectively</h3>
            <p className="text-sm mb-4 text-center">
              Learn techniques to manage stress, including mindfulness practices and maintaining social connections.
            </p>
            <div className="flex justify-between items-center text-xs">
              <span>By Dr. Maya</span>
              <span>10th Sep</span>
            </div>
            <div className="mt-2 w-full px-4 py-2 rounded-[1rem] border border-[#3973eb] flex justify-center items-center mx-auto transition-colors duration-300 hover:bg-[#3973eb] hover:text-white">
              <span className="text-white text-sm font-medium">READ MORE</span>
            </div>
          </div>
        </div>

        {/* Smaller Blog Card 2 */}
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform duration-300 hover:shadow-xl hover:scale-105 col-span-1 row-span-1">
          <img className="w-full h-56 object-cover" src={image3} alt="Healthy Eating Habits" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-4 text-white text-center">
            <h3 className="text-lg font-semibold mb-2 text-center">Healthy Eating Habits for a Better Life</h3>
            <p className="text-sm mb-4 text-center">
              Simple ways to incorporate healthy eating into your daily routine for improved well-being.
            </p>
            <div className="flex justify-between items-center text-xs">
              <span>By Dr. John</span>
              <span>8th Sep</span>
            </div>
            <div className="mt-2 w-full px-4 py-2 rounded-[1rem] border border-[#3973eb] flex justify-center items-center mx-auto transition-colors duration-300 hover:bg-[#3973eb] hover:text-white">
              <span className="text-white text-sm font-medium">READ MORE</span>
            </div>
          </div>
        </div>

        {/* Smaller Blog Card 3 */}
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform duration-300 hover:shadow-xl hover:scale-105 col-span-1 row-span-1">
          <img className="w-full h-56 object-cover" src={image4} alt="The Importance of Regular Exercise" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-4 text-white text-center">
            <h3 className="text-lg font-semibold mb-2 text-center">The Importance of Regular Exercise</h3>
            <p className="text-sm mb-4 text-center">
              Understand the benefits of physical activity for maintaining a healthy lifestyle.
            </p>
            <div className="flex justify-between items-center text-xs">
              <span>By Dr. Anna</span>
              <span>15th Sep</span>
            </div>
            <div className="mt-2 w-full px-4 py-2 rounded-[1rem] border border-[#3973eb] flex justify-center items-center mx-auto transition-colors duration-300 hover:bg-[#3973eb] hover:text-white">
              <span className="text-white text-sm font-medium">READ MORE</span>
            </div>
          </div>
        </div>

        {/* New Smaller Blog Card 4 (adjusted height) */}
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform duration-300 hover:shadow-xl hover:scale-105 col-span-1 row-span-1 h-96">
          <img className="w-full h-full object-cover" src={image5} alt="Mindfulness Techniques for Stress Relief" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-4 text-white text-center">
            <h3 className="text-lg font-semibold mb-2 text-center">Mindfulness Techniques for Stress Relief</h3>
            <p className="text-sm mb-4 text-center">
              Explore mindfulness strategies to help manage stress and improve mental clarity.
            </p>
            <div className="flex justify-between items-center text-xs">
              <span>By Dr. Smith</span>
              <span>14th Sep</span>
            </div>
            <div className="mt-2 w-full px-4 py-2 rounded-[1rem] border border-[#3973eb] flex justify-center items-center mx-auto transition-colors duration-300 hover:bg-[#3973eb] hover:text-white">
              <span className="text-white text-sm font-medium">READ MORE</span>
            </div>
          </div>
        </div>

        {/* Large Blog Card */}
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform duration-300 hover:shadow-xl hover:scale-105 col-span-1 lg:col-span-3 row-span-2">
          <img className="w-full h-[300px] object-cover" src={image1} alt="How to Improve Sleep and Recharge Your Body" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-4 text-white text-center">
            <h3 className="text-lg font-semibold mb-2 text-center">How to Improve Sleep and Recharge Your Body</h3>
            <p className="text-sm mb-4 text-center">
              Discover tips for enhancing sleep quality, creating a restful environment, and adopting habits that help you wake up refreshed.
            </p>
            <div className="flex justify-between items-center text-xs">
              <span>By Dr. Ramesh</span>
              <span>12th Sep</span>
            </div>
            <div className="mt-2 px-4 py-2 rounded-[1rem] border border-[#3973eb] flex justify-center items-center mx-auto transition-colors duration-300 hover:bg-[#3973eb] hover:text-white">
              <span className="text-white text-sm font-medium">READ MORE</span>
            </div>
          </div>
        </div>

        {/* New Smaller Blog Card 5 (adjusted height) */}
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform duration-300 hover:shadow-xl hover:scale-105 col-span-1 row-span-1 h-96">
          <img className="w-full h-full object-cover" src={image5} alt="Mindfulness Techniques for Stress Relief" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-4 text-white text-center">
            <h3 className="text-lg font-semibold mb-2 text-center">Mindfulness Techniques for Stress Relief</h3>
            <p className="text-sm mb-4 text-center">
              Explore mindfulness strategies to help manage stress and improve mental clarity.
            </p>
            <div className="flex justify-between items-center text-xs">
              <span>By Dr. Smith</span>
              <span>14th Sep</span>
            </div>
            <div className="mt-2 w-full px-4 py-2 rounded-[1rem] border border-[#3973eb] flex justify-center items-center mx-auto transition-colors duration-300 hover:bg-[#3973eb] hover:text-white">
              <span className="text-white text-sm font-medium">READ MORE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;

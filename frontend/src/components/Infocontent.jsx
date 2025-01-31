// InfoSectionComponentStylish.jsx
import React, { useEffect, useState } from 'react';
import { FaStethoscope, FaGraduationCap, FaBriefcase, FaUniversity, FaMedkit, FaHospital, FaLanguage } from 'react-icons/fa';
import axios from 'axios';
import ButtonGroupComponent from './ButtonGroupComponent';
import { useParams } from 'react-router-dom';

const InfoSectionComponentStylish = () => {
  const [sections, setSections] = useState([]);
  const {doctorId} = useParams();
  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5003/api/doctors/${doctorId}`);
        const data = response.data;
        console.log(data)
        // Map fetched data to sections with corresponding icons
        const mappedData = [
          { title: 'Specialty', content: data.specialization, icon: <FaStethoscope /> },
          { title: 'Qualification', content: data.qualification, icon: <FaGraduationCap /> },
          { title: 'Experience', content: `${data.experience} years`, icon: <FaBriefcase /> },
          { title: 'Education', content: data.education, icon: <FaUniversity /> },
          { title: 'Areas of Expertise', content: data.areas_of_expertise, icon: <FaMedkit /> },
          { title: 'Hospital Affiliations', content: data.hospital_affiliations, icon: <FaHospital /> },
          { title: 'Contact', content:data.contact, icon: <FaLanguage /> },
        ];

        setSections(mappedData);
      } catch (error) {
        console.error('Error fetching doctor info:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full max-w-[95%] mx-auto mt-6 p-4 relative">
      {/* Gradient Background for Content */}
      <div className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.length > 0 ? (
            sections.map((item, index) => (
              <div
                key={index}
                className="relative bg-white p-6 rounded-lg shadow-md transition-transform transform hover:-translate-y-2 hover:shadow-lg hover:bg-blue-50 duration-300"
              >
                {/* Floating Icon */}
                <div className="absolute -top-6 left-4 bg-[#3973eb] text-white rounded-full p-3 shadow-lg">
                  {item.icon}
                </div>

                {/* Content */}
                <div className="mt-8">
                  <div className="text-[#3973eb] text-[1.25rem] font-semibold font-['Nunito'] mb-1">
                    {item.title}
                  </div>
                  <div className="text-[#2f2d2d] text-[0.9rem] font-normal font-['Nunito'] leading-relaxed">
                    {item.content}
                  </div>
                </div>

                {/* Animated Label */}
                <div
                  className="absolute top-0 left-0 w-full h-full rounded-lg border-2 border-transparent hover:border-[#3973eb] hover:shadow-xl transition-all duration-300 pointer-events-none"
                />
              </div>
            ))
          ) : (
            <div>Loading doctor info...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoSectionComponentStylish;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({
  buttonText = 'Ask',
  placeholder = 'Got questions? Ask Away!',
  customStyles = {},
}) => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const bgColor = role === 'user' ? '#3973EB' : '#30A45E';
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value.trim() !== '') {
      fetchSearchResults(event.target.value);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSearchResults = async (query) => {
    try {
      const response = await axios.get(`http://localhost:5003/api/questions/search?q=${query}`);
      setSuggestions(response.data);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleButtonClick = async () => {
    if (searchTerm.trim() === '') {
      console.log('Please enter a question');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5003/api/questions/ask',
        { question: searchTerm },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Question posted successfully:', response.data);
      setSearchTerm('');
      setSuggestions([]);
      triggerPopup(); // Show popup after successful question submission
    } catch (error) {
      console.error('Error posting question:', error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.question);
    setShowSuggestions(false);
    navigate(`/${suggestion.slug}`, { state: { question: suggestion.question } });
  };

  const highlightSearchTerm = (suggestion, term) => {
    if (!term) return suggestion;
    const parts = suggestion.split(new RegExp(`(${term})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: bgColor }}>{part}</span>
      ) : (
        part
      )
    );
  };

  const triggerPopup = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false); // Hide popup after 10 seconds
    }, 10000); // 10 seconds
  };

  return (
    <div className={`relative w-full ${customStyles.container}`}>
      <div className={`flex items-center border rounded-lg overflow-hidden ${customStyles.inputContainer}`}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`flex-grow p-5 h-[65px] ${customStyles.input}`}
          style={{ backgroundColor: customStyles.inputBgColor || 'transparent' }}
        />
        <button
          onClick={handleButtonClick}
          className={`bg-[#3973eb] text-white text-[14px] px-3.5 py-1.5 font-semibold m-3 rounded-lg ${customStyles.button}`}
          style={{ backgroundColor: bgColor }}
        >
          {buttonText}
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute left-0 w-full bg-white border mt-1 max-h-60 overflow-y-auto z-10">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion._id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {highlightSearchTerm(suggestion.question, searchTerm)}
            </li>
          ))}
        </ul>
      )}

      {showPopup && (
        <div className="fixed bottom-10 right-10 p-4 bg-green-500 text-white rounded-lg shadow-lg border-4 border-solid border-green-700 animate-[borderAnimation_10s_linear]">
          <p>Thank you for asking! Your question can be valuable for many.</p>
          <div className="mt-2 text-sm">This popup will disappear in 10 seconds.</div>
        </div>
      )}

      {/* Border Animation using Tailwind */}
      <style>{`
        @keyframes borderAnimation {
          0% { border-color: green; }
          100% { border-color: transparent; }
        }
      `}</style>
    </div>
  );
};

export default SearchBar;

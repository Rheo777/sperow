// AnswerPopup.js
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's styles

const AnswerPopup = ({ question, onClose, onSubmit }) => {
  const [answer, setAnswer] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = () => {
    onSubmit(answer); // Call the submit function passed as a prop
    setAnswer(''); // Clear the answer input
    onClose(); // Close the popup
    triggerPopup(); // Show the popup
  };

  const triggerPopup = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false); // Hide popup after 10 seconds
    }, 10000); // 10 seconds
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/2 shadow-lg relative">
        {/* Close button with an icon */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-lg font-semibold mb-4">Answer the Question</h2>
        <p className="mb-4 font-semibold">{question}</p>
        <ReactQuill
          value={answer}
          onChange={setAnswer}
          placeholder="Write your answer here..."
          theme="snow"
        />
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-white rounded px-4 py-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed bottom-10 right-10 p-4 bg-green-500 text-white rounded-lg shadow-lg border-4 border-solid border-green-700 animate-[borderAnimation_10s_linear]">
          <p>Thank you for submitting your answer! Your contribution can help many.</p>
          <div className="mt-2 text-sm">This popup will disappear in 10 seconds.</div>
        </div>
      )}
    </div>
  );
};

export default AnswerPopup;

import React, { useState, useEffect } from 'react';
import SearchBar from './searchBar';
import axios from 'axios';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 

const QuestionContainer = () => {
  const [questions, setQuestions] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [page, setPage] = useState(1); // For pagination
  const [hasMore, setHasMore] = useState(true); // To track if more data is available

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`http://localhost:5003/api/questions?page=${page}`);
      const newQuestions = response.data;

      if (newQuestions.length === 0) {
        setHasMore(false);
        return;
      }

      // Shuffle questions randomly
      
      setQuestions(newQuestions);
      setPage(prevPage => prevPage + 1); // Increment page for the next fetch
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions(); 
  }, []);

  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token'); 
  const bgColor = role === 'user' ? '#3973EB' : '#30A45E';

  const handlePostSubmit = async () => {
    const formData = new FormData();
    formData.append('content', postContent);
    if (imageFile) {
      formData.append('media', imageFile);
    }
  
    try {
      await axios.post('http://localhost:5003/api/posts/create', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setPostContent('');
      setImageFile(null);
      setImagePreview(null);
      fetchQuestions(); // Refetch questions after posting
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleScroll = () => {
    const bottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
    if (bottom && hasMore) {
      fetchQuestions(); // Fetch more questions when scrolled to bottom
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore]);

  return (
    <div className="w-[900px] mx-auto p-4 bg-white gap-1 rounded-xl">
      <div className="flex gap-4 items-center">
        <SearchBar
          buttonText="ASK"
          placeholder="Got questions? Ask Away!"
          customStyles={{
            container: `bg-[#e2eeff] mb-4 w-full`,
            input: 'border-none focus:outline-none',
            button: 'hover:bg-blue-600',
          }}
        />
      </div>
      {/* React Quill Editor */}
{role === 'doctor' && (
  <div className="mt-1  border-gray-300 rounded-lg  p-4 flex flex-col">
    <ReactQuill
      theme="snow"
      value={postContent}
      onChange={setPostContent}
      placeholder="What's on your mind?"
      className=" mb-2 rounded-md h-24"
      modules={{
        toolbar: false, // Disable toolbar to make it look like Facebook's editor
      }}
      style={{
        minHeight: '100px', // Set minimum height for the editor
         // Light gray border
        borderRadius: '8px', // Rounded corners
      }}
    />
    
    {/* Image Upload and Post Button */}
    <div className="flex items-center mb-4">
      <label htmlFor="image-upload" className="flex items-center cursor-pointer mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h8M8 14h8m-4 4h4M8 6h4m0 0V2m0 4V2m0 0h-4m0 0V2m0 0h4" />
        </svg>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
        onClick={handlePostSubmit}
      >
        Post
      </button>
    </div>

    {imagePreview && (
      <div className="mb-4">
        <img src={imagePreview} alt="Preview" className="w-full h-auto rounded-lg" />
      </div>
    )}
  </div>
)}


      <h2 className="text-xl font-bold mb-4 text-[#3973eb] text-center" style={{ color: bgColor }}>
        Top Popular Questions
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {questions.map((item, index) => (
          <div key={index} className="rounded-lg p-4 bg-[#e2eeff]">
            <div className="font-bold">{item.question}</div>
            <div className="text-sm text-gray-600">{item.answer || 'No answer yet'}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionContainer;

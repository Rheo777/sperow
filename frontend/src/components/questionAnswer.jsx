import React, { useState, useEffect } from 'react';
import doctorImage from '../assets/doctors.jpg'; // Placeholder for doctor's profile image
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AnswerPopup from './answerPopUp'; // Import the new popup component
import PostCard from './PostCard';
import PostsContent from './PostsContent';
import { jwtDecode } from 'jwt-decode';
const QuestionAnswer = () => {
  const [questions, setQuestions] = useState([]); // State for questions
  const [posts, setPosts] = useState([]); // State for posts
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for managing answer popup visibility
  const [currentQuestion, setCurrentQuestion] = useState(null); // State for current question
  const [errorPopup, setErrorPopup] = useState(''); // State for managing error popup
  const [commentText, setCommentText] = useState(''); // State for comment input
  const navigate = useNavigate();
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);

  // Fetch all questions
  const getQuestions = async () => {
    setLoading(true);
    try {
      const questionsResponse = await axios.get('http://localhost:5003/api/questions');
      console.log('API Response:', questionsResponse.data); // Check the raw API response
      setQuestions(questionsResponse.data); // Update the state
      console.log('Questions after setting state:', questionsResponse); // Check what you're setting
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
    setLoading(false);
  };
  

  // Fetch all posts
  const getPosts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const postsResponse = await axios.get('http://localhost:5003/api/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(postsResponse.data); // Set posts without pagination
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getQuestions(); // Load questions initially
    getPosts(); // Load posts initially
  }, []);

  useEffect(() => {
    if (showThankYouPopup) {
      const timer = setTimeout(() => setShowThankYouPopup(false), 10000);
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [showThankYouPopup]);

  const navigateToAnswers = (question) => {
    navigate(`/${question.slug}`, { state: { question } });
  };

  const viewDocProfile = async (itemDocId) => {
    navigate(`/doctors/${itemDocId}`);
  };

  const handleLikePost = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5003/api/posts/likes/${postId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getPosts(); // Refresh posts
    } catch (error) {
      console.error('Error liking post:', error);
      if (error.response && error.response.status === 401) {
        alert('Unauthorized. Please log in again.');
      }
    }
  };

  const handleCommentSubmit = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5003/api/posts/comments/${postId}`, 
        { content: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCommentText(''); // Clear input field
      getPosts(); // Refresh posts
    } catch (error) {
      console.error('Error submitting comment:', error);
      if (error.response && error.response.status === 401) {
        alert('Unauthorized. Please log in again.');
      }
    }
  };

  const handleUpvoteQuestion = async (questionId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5003/api/questions/upvote/${questionId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getQuestions(); // Refresh questions after upvoting
    } catch (error) {
      console.error('Error upvoting question:', error);
      if (error.response && error.response.status === 401) {
        alert('Unauthorized. Please log in again.');
      }
    }
  };

  const handleAnswerClick = (question) => {
    const token = localStorage.getItem('token'); // Get doctor's specialization from local storage
    const doctorSpecialization = jwtDecode(token).specialization;
  
    if (doctorSpecialization !== question.category) {
      // If the specialization doesn't match, show the error popup
      setErrorPopup(`Your specialization (${doctorSpecialization}) doesn't match this question's required specialization (${question.category}).`);
      return;
    }
  
    // If specialization matches, set the question and open the answer popup
    setCurrentQuestion(question);
    setShowPopup(true);
  };
  

  const handleAnswerSubmit = async (postAnswer) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5003/api/questions/answer/${currentQuestion._id}`, { postAnswer }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getQuestions(); // Refresh questions after submitting answer
      setShowThankYouPopup(true); // Show thank you popup
      setTimeout(() => {
        setShowThankYouPopup(false); // Hide popup after 10 seconds
      }, 10000); // 10 seconds
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setErrorPopup(error.response.data.message);
      } else {
        console.error('Error submitting answer:', error);
      }
    }
  };

  const role = localStorage.getItem('role');
  const bgColor = role === 'user' ? '#3973EB' : '#30A45E';

  return (
    <div className="space-y-15">
      {/* Section for Questions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Questions</h2>
        {questions.map((question) => (
  <div key={`question-${question._id}`} className="p-4 border border-gray-300 rounded-lg shadow-md bg-white mb-6 mx-auto w-11/12">
    <div className="font-semibold mb-2 text-gray-800">
      {/* Render the 'question' field instead of the whole object */}
      {question.question}
    </div>
    <div className="flex justify-between items-center">
      <div className="flex space-x-4">
        <button className="text-gray-500" onClick={() => handleUpvoteQuestion(question._id)}>⬆️ {question.upvotes || 0}</button>
        <button className="text-gray-500">💬</button>
        <button className="text-gray-500">📤 34</button>
      </div>
      <button className="text-blue-500" style={{ color: bgColor }} onClick={() => navigateToAnswers(question)}>
        Show Answers
      </button>
      {role === 'doctor' && (
      <button
        className="text-blue-500"
        onClick={() => {
          handleAnswerClick(question);
          setCurrentQuestion(question);
          setShowPopup(true);
        }}
      >
        Answer
      </button>
    )}
    </div>
  </div>
))}

        {showPopup && (
        <AnswerPopup
          question={currentQuestion}
          onClose={() => setShowPopup(false)}
          onSubmit={handleAnswerSubmit}
        />
      )}
           {/* Error popup for specialization mismatch */}
{errorPopup && (
  <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-md">
    {errorPopup}
    <button className="ml-4 text-sm" onClick={() => setErrorPopup('')}>Close</button>
  </div>
)}
      </div>

      {/* Section for Posts */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Posts</h2>
        
        <PostsContent />
      </div>


 


      {/* Thank you popup */}
      {showThankYouPopup && (
        <div className="fixed top-4 left-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-md flex items-center justify-center">
          <div className="text-lg">Thank you for asking! Your question can be valuable for many.</div>
        </div>
      )}
    </div>
  );
};

export default QuestionAnswer;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AnswerMiddlePage() {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctorsInfo, setDoctorsInfo] = useState({});
  const [newCommentTexts, setNewCommentTexts] = useState({}); // State for new comment input by answer ID
  const { slug } = useParams();
  const fetchQuestionAndAnswers = async () => {
    try {
      const response = await axios.get(`http://localhost:5003/api/questions/answers/${slug}`);
      setQuestion(response.data);

      const doctorIds = response.data.answers.map(answer => answer.doctorId);
      const doctorResponses = await Promise.all(
        doctorIds.map(id => axios.get(`http://localhost:5003/api/doctors/${id}`))
      );

      const doctorData = {};
      doctorResponses.forEach(res => {
        doctorData[res.data._id] = {
          username: res.data.username,
          specialization: res.data.specialization,
          yearsOfExperience: res.data.yearsOfExperience,
        };
      });
      setDoctorsInfo(doctorData);
    } catch (err) {
      setError('Error fetching question and answers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionAndAnswers();
  }, [questionId]);

  const handleCommentChange = (answerId, value) => {
    setNewCommentTexts((prev) => ({
      ...prev,
      [answerId]: value, // Update the comment text for the specific answer
    }));
  };

  const handleCommentSubmit = async (answerId) => {
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
    const commentText = newCommentTexts[answerId] || ''; // Get the comment text for the specific answer
    const token = localStorage.getItem('token');
    try {
      await axios.post(`http://localhost:5003/api/questions/answers/comments/${slug}/${answerId}`, 
        { userId, comment: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      setNewCommentTexts((prev) => ({
        ...prev,
        [answerId]: '', // Clear the input for this specific answer after submission
      }));
      fetchQuestionAndAnswers(); // Refresh the answers to show new comment
    } catch (err) {
      console.error('Error submitting comment:', err);
    }
  };

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 mx-auto w-full max-w-7xl">
      {question ? (
        <>
          <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
            <h1 className="text-4xl font-bold mb-4">{question.question}</h1>
            <hr className="mb-4" />
            <div className="flex justify-between items-center">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Applaud</button>
              <span className="bg-blue-500 text-white px-4 py-2 rounded-lg">{question.answers.length} Answers</span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Share</button>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-3xl text-center font-semibold mb-6">Answers:</h2>
            {question.answers.length > 0 ? (
              question.answers.map((answer) => (
                <div key={answer._id} className="bg-white shadow-md rounded-lg p-6 mb-6">
                  <div className="flex items-center mb-4">
                    <img
                      src="/path-to-placeholder-image.jpg"  // Placeholder image for now
                      alt="Doctor profile"
                      className="h-12 w-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="text-xl font-bold">
                        {doctorsInfo[answer.doctorId]?.username || 'Doctor Name'}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {doctorsInfo[answer.doctorId]?.specialization || 'Specialization Not Available'} | 
                        {doctorsInfo[answer.doctorId]?.yearsOfExperience !== undefined ? 
                          ` ${doctorsInfo[answer.doctorId].yearsOfExperience} Yrs Experience` : 
                          ' Experience Not Available'}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg text-gray-800 mb-4">{answer.answer}</p>

                  {/* Comments Section */}
                  <div className="mt-4">
                    {answer.comments.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold">Comments:</h4>
                        {answer.comments.map((comment) => (
                          <div key={comment._id} className="text-gray-600 ml-4">
                            <p>{comment.comment}</p>
                            <p>{comment.userName}</p>
                          </div>
                          
                        ))}
                      </div>
                    )}
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={newCommentTexts[answer._id] || ''} // Use the specific comment text for this answer
                        onChange={(e) => handleCommentChange(answer._id, e.target.value)} // Update the specific comment text
                        className="flex-1 p-2 border border-gray-300 rounded"
                        placeholder="Add a comment..."
                      />
                      <button
                        onClick={() => handleCommentSubmit(answer._id)}
                        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
                      >
                        Submit
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button className="text-blue-500 font-medium hover:underline">Like</button>
                    <button className="text-blue-500 font-medium hover:underline">Comment</button>
                    <button className="text-blue-500 font-medium hover:underline">Share</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-lg text-gray-600">No answers available for this question.</p>
            )}
          </div>
        </>
      ) : (
        <p className="text-center text-lg text-gray-600">Question not found.</p>
      )}
    </div>
  );
}

export default AnswerMiddlePage;

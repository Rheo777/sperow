import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Answered = () => {
  const { doctorId } = useParams(); // Get doctorId from URL
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch questions with answers from this doctor
  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        // API call to get questions where this doctor has answered
        const response = await axios.get(`http://localhost:5003/api/questions/doctor/${doctorId}`);
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions and answers:', error);
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [doctorId]);

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Answered Questions</h2>

      {loading ? (
        <p>Loading answers...</p>
      ) : questions.length > 0 ? (
        <ul>
          {questions.map((question) => (
            <li key={question._id} className="mb-4 border-b pb-4">
              <h3 className="text-lg font-semibold">{question.question}</h3>
              <p className="text-gray-700 mt-2">Category: {question.category}</p>
              
              {/* Filter and show only the answers given by the doctor */}
              {question.answers
                .filter(answer => answer.doctorId === doctorId) // Show only answers from this doctor
                .map((answer, index) => (
                  <div key={answer._id} className="mt-4">
                    <h4 className="font-medium text-blue-600">Answer:</h4>
                    <p className="text-gray-800">{answer.answer}</p>
                    <p className="text-gray-500 text-sm mt-1">Answered on: {new Date(answer.createdAt).toLocaleDateString()}</p>
                  </div>
                ))}
            </li>
          ))}
        </ul>
      ) : (
        <p>No answers available for this doctor.</p>
      )}
    </div>
  );
};

export default Answered;

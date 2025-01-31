
const express = require('express');
const {
    askQuestion,
    answerQuestion,
    getQuestions,
    searchQuestions,
    fetchAnswers,
    upvoteQuestion,
    fetchComments,
    commentOnQuestion,
    getQuestionsBySlug,
    getQuestionByDoctorId
  } = require('../controllers/questionController');
  const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/ask', verifyToken, askQuestion);  
router.post('/answer/:questionId', verifyToken, answerQuestion);
router.get('/answers/:slug',fetchAnswers); 
router.get('/', getQuestions);
router.get('/search', searchQuestions);
router.post('/upvote/:questionId', verifyToken, upvoteQuestion); // Upvote route
router.get('/comments/:questionId', fetchComments); // Fetch comments route
router.post('/answers/comments/:slug/:answerId', verifyToken, commentOnQuestion);
router.get('/slug/:slug',verifyToken,getQuestionsBySlug);
router.get('/doctor/:doctorId',getQuestionByDoctorId);


module.exports = router;

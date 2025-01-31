const Question = require('../models/questionModel');
const Fuse = require('fuse.js')
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Doctor = require('../models/doctorModel');
const slugify = require('slugify');
const User = require('../models/userModel'); // Import User model

const getQuestionsBySlug = async (req,res)=>{
  try {
    const question = await Question.findOne({ slug: req.params.slug });
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}
// Function to categorize the question
const categorizeQuestion = async (content) => {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Categorize the following medical question under a specialization: "${content}" note that to only generate a single word like category`;
  try {
    const result = await model.generateContent(prompt);
    
    const category = result.response.text(); // Adjust based on response structure
    return category.trim(); // Returning the AI-generated category
  } catch (error) {
    console.error('Error categorizing question:', error);
    return 'Uncategorized'; // Fallback if AI fails
  }
};
const upvoteQuestion = async (req, res) => {
  const questionId = req.params.questionId;

  try {
    const question = await Question.findById(questionId);
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    question.upvotes += 1; // Increment upvote count
    await question.save();

    res.status(200).json({ message: 'Question upvoted successfully', upvotes: question.upvotes });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upvote question', error });
  }
};

// Function to fetch comments for a question
const fetchComments = async (req, res) => {
  const questionId = req.params.questionId;

  try {
    const question = await Question.findById(questionId).populate('comments.userId', 'name');
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json(question.comments); // Return only the comments
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
};

// Function to add a comment to a question
const commentOnQuestion = async (req, res) => {
  const { slug, answerId } = req.params;
  const { comment } = req.body;
  const userId = req.user.id;
  console.log(userId);
  try {
    const question = await Question.findOne({ slug });
    if (!question) return res.status(404).send('Question not found.');

    const answer = question.answers.id(answerId);
    if (!answer) return res.status(404).send('Answer not found.');

    // Determine if the user is a doctor or a regular user
    const doctor = await Doctor.findById(userId);
    let userName;

    if (doctor) {
      userName = doctor.username; // If user is a doctor
    } else {
      const user = await User.findById(userId);
      if (user) {
        userName = user.username; // If user is a regular user
      } else {
        return res.status(404).send('User not found.');
      }
    }

    console.log('Username:', userName); // Log the username for debugging

    // Push the comment to the answer's comments array
    answer.comments.push({ userId, comment, userName }); // Add userName to the comment
    await question.save();

    res.status(200).json(answer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};



const fetchAnswers = async (req, res) => {
  try {
    const question = await Question.findOne({ slug: req.params.slug });

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json(question); // Send back only the answers array
  } catch (error) {
    res.status(500).json({ message: 'Error fetching answers', error });
  }
};

const askQuestion = async (req, res) => {
  const { question } = req.body;
  const userId = req.user.id;

  try {
    // Categorize the question using OpenAI
    const category = await categorizeQuestion(question);

    const slug = slugify(`${question}`, { lower: true, strict: true });

    // Create and save the question with the slug
    const newQuestion = new Question({ userId, question, category, slug });
    await newQuestion.save();

    res.status(201).json({ message: 'Question asked successfully', question: newQuestion });
  } catch (error) {
    res.status(500).json({ message: 'Failed to ask question', error });
  }
};

const answerQuestion = async (req, res) => {
  const { answer } = req.body;
  const doctorId = req.user.id;

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const question = await Question.findById(req.params.questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Ensure doctor specialization matches question category
    if (doctor.specialization !== question.category) {
      return res.status(403).json({ message: `Access denied: Only doctors specialized in ${question.category} can answer this question` });
    }

    question.answers.push({ doctorId, answer });
    await question.save();

    res.status(200).json({ message: 'Answer added successfully', question });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add answer', error });
  }
};


const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate('userId', 'name').populate('answers.doctorId', 'name');
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch questions', error });
  }
};
const searchQuestions = async (req, res) => {
  const searchTerm = req.query.q;
  try {
    // Use a regex to find questions that contain the search term (case-insensitive)
    const questions = await Question.find({
      question: { $regex: searchTerm, $options: 'i' }, // 'i' for case-insensitive
    });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch search results' });
  }
};
const getQuestionByDoctorId = async (req,res) =>{
  const { doctorId } = req.params;
  
  try {
    // Find all questions where any answer in the 'answers' array matches the doctorId
    const questions = await Question.find({ 
      'answers.doctorId': doctorId
    });

    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching answers' });
  }
}
module.exports = {
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
};
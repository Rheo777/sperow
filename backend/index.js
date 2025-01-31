const express = require('express');
const connectDB = require('./config/dbConnection');
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const questionRoutes = require('./routes/questionRoutes'); 
const postRoutes = require('./routes/postRoutes'); // Importing post routes
const bodyParser = require('body-parser');
const cors = require('cors');
const Question = require('./models/questionModel');
const Post = require('./models/postModel');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/questions', questionRoutes); 
app.use('/api/posts', postRoutes); // Adding post routes

// Example of random question fetching in Express
app.get('/api/questions/random', async (req, res) => {
  try {
    const { page = 0 } = req.query;
    const limit = 5; // Number of items per page
    const skip = page * limit;
    const questions = await Question.find().skip(skip).limit(limit);
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Example of random post fetching
app.get('/api/posts/random', async (req, res) => {
  try {
    const { page = 0 } = req.query;
    const limit = 5; // Number of items per page
    const skip = page * limit;
    const posts = await Post.find().skip(skip).limit(limit);
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Server initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

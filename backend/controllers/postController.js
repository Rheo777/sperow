const Post = require('../models/postModel');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../config/awsConfig');
const Doctor = require('../models/doctorModel')
// Create a new post
const createPost = async (req, res) => {
  const { content } = req.body;
  const doctorId = req.user.id;
  if (req.user.role !== 'doctor') {
    return res.status(403).json({ message: 'Access denied: Only doctors can post' });
  }

  try {
    let mediaUrl = '';

    if (req.file) {
      const file = req.file;
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `posts/${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      const command = new PutObjectCommand(params);
      await s3Client.send(command);
      mediaUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/posts/${file.originalname}`;
    }

    const newPost = new Post({ doctorId, content, mediaUrl });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Failed to create post', error: error.message });
  }
};


// Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
  .populate('doctorId', 'username specialization experience')
  .sort({ createdAt: -1 });


    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
  }
};

// Add a comment to a post
// Add a comment to a post
const addComment = async (req, res) => {
  const { content } = req.body;
  const postId = req.params.postId;
  const userId = req.user.id; // Assuming the user is authenticated and user ID is in req.user

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Fetch the doctor's details (if applicable)
    const doctor = await Doctor.findById(userId);
    let commenterModel, doctorName, doctorExp, doctorSpecialization;

    if (doctor) {
      // If the user is a doctor, set the relevant fields
      commenterModel = 'Doctor';
      doctorName = doctor.username || 'User';
      doctorExp = doctor.experience || 'Not provided';
      doctorSpecialization = doctor.specialization || 'Not provided';
    } else {
      // If the user is not a doctor, set anonymous fields
      commenterModel = 'User';
      doctorName = 'User'; // Use 'User' for anonymous comments
      doctorExp = 'Not provided'; // No experience for user
      doctorSpecialization = 'Not provided'; // No specialization for user
    }

    // Create comment object with appropriate details
    const comment = {
      commenterId: userId,
      content,
      commenterModel,
      doctorName,
      doctorExp,
      doctorSpecialization
    };


    post.comments.push(comment);
    await post.save();

    res.status(201).json({ message: 'Comment added successfully', post });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Failed to add comment', error: error.message });
  }
};




// Add a like to a post
const addLike = async (req, res) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.likes += 1; // Increment the likes count
    await post.save();

    res.status(200).json({ message: 'Post liked successfully', post });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Failed to like post', error: error.message });
  }
};
const getPostByDoc = async (req,res) =>{
  const { doctorId } = req.params;
  try {
    const posts = await Post.find({ doctorId }); // Assuming you have a doctorId field in posts
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
}
module.exports = { createPost, getPosts, addComment, addLike,getPostByDoc };

const mongoose = require('mongoose');

// Define schema for comments on a post
const commentSchema = new mongoose.Schema({
  commenterId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'commenterModel',
      required: true,
  },
  commenterModel: {
      type: String,
      required: true,
      enum: ['User', 'Doctor'],
  },
  content: {
      type: String,
      required: true,
  },
  doctorExperience: {  // Ensure this matches the comment object construction
      type: String,
     
  },
  doctorName: {
      type: String,
      required: true,
  },
  doctorSpecialization: {
      type: String,
      required: true,
  },
  createdAt: {
      type: Date,
      default: Date.now,
  },
  likes: {
      type: Number,
      default: 0,
  },
});




// Define schema for posts
const postSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor', 
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  mediaUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0, // Default likes for a post
  },
  comments: [commentSchema], // Embed comments within the post
  
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

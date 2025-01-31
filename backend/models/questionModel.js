const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  question: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // Add slug field
  answers: [
    {
      doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
      answer: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      comments: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          userName: { type: String, required: true }, // Add this field to store the username
          comment: { type: String, required: true },
          createdAt: { type: Date, default: Date.now },
        },
      ],
    },
  ],
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
  upvotes: { type: Number, default: 0 },
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Question', QuestionSchema);

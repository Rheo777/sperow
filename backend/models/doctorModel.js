const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const doctorSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'doctor' },
  specialization: { type: String, required: true },
  qualification: { type: String },
  experience: { type: String },
  education: { type: String },
  areas_of_expertise: { type: String },
  hospital_affiliations: { type: String },
  contact: { type: String},

  // Followers can be both users and doctors
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References to User model
  }, {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor', // References to other doctors
  }],

  // Following field to track which doctors this doctor is following
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor', // References to other doctors
  }],
});

doctorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;

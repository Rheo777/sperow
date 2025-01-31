const Doctor = require('../models/doctorModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Fuse = require('fuse.js');

exports.fetchDoctorDetails = async (req, res) => {
  const { doctorId } = req.params;

  try {
      // Check if doctorId is valid
      if (!doctorId) {
          return res.status(400).json({ message: 'Doctor ID is required' });
      }

      // Find the doctor by ID
      const doctor = await Doctor.findById('670900cf6e5a474bb45be4e7');
      if (!doctor) {
          return res.status(404).json({ message: 'Doctor not found' });
      }

      // Return the doctor's username and other info
      res.status(200).json({
          _id: doctor._id,
          username: doctor.username,
          specialization: doctor.specialization,
          qualification:doctor.qualification,
          experience:doctor.experience,
          education:doctor.education,
          areas_of_expertise:doctor.areas_of_expertise,
          hospital_aff:doctor.affiliations,
          contact:doctor.contact,
          following:doctor.following,
          followers:doctor.followers
      });
  } catch (error) {
      console.error('Error fetching doctor details:', error);
      res.status(500).json({ message: 'Server error' });
  }
};

exports.fetchDoctors = async (req, res) => {
  try {
    
    const doctors = await Doctor.find();
      
    

    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctor details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};





// Register a new doctor
exports.registerDoctor = async (req, res) => {
  const { username, email, password, specialization } = req.body;
  try {
    const doctorExists = await Doctor.findOne({ email });
    if (doctorExists) {
      return res.status(400).json({ message: 'Doctor already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = new Doctor({ username, email, password: hashedPassword, specialization });
    await doctor.save();

    const token = jwt.sign(
      { id: doctor._id, name: doctor.username, specialization: doctor.specialization },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login doctor
exports.loginDoctor = async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: doctor._id, name: doctor.username,role:doctor.role,specialization: doctor.specialization }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update doctor profile
exports.updateDoctorProfile = async (req, res) => {
  const { username, email } = req.body;

  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.doctor.id,
      { username, email },
      { new: true }
    ).select('-password');

    res.json(doctor);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Search doctors
exports.searchDoctors = async (req, res) => {
  const query = req.query.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    const doctors = await Doctor.find(); // Fetch all doctors
    const options = {
      keys: ['username', 'specialization'], // Searchable fields
      threshold: 0.4, // Set lower threshold for partial matches
    };

    const fuse = new Fuse(doctors, options);
    const results = fuse.search(query);

    const paginatedResults = results.slice((page - 1) * limit, page * limit);

    res.status(200).json({
      currentPage: page,
      totalResults: results.length,
      totalPages: Math.ceil(results.length / limit),
      results: paginatedResults.map((result) => result.item),
    });
  } catch (error) {
    console.error('Search Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
exports.followDoc = async (req,res)=>{
  const { doctorId, followDoctorId } = req.params;

  try {
    const doctorToFollow = await Doctor.findById(followDoctorId);
    const doctorFollowing = await Doctor.findById(doctorId);

    if (!doctorToFollow || !doctorFollowing) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    if (doctorFollowing.following.includes(followDoctorId)) {
      return res.status(400).json({ message: 'You are already following this doctor' });
    }

    doctorFollowing.following.push(followDoctorId);
    doctorToFollow.followers.push(doctorId); // Add doctor to the followed doctor's followers

    await doctorFollowing.save();
    await doctorToFollow.save();

    res.json({ message: `Doctor ${doctorFollowing.username} is now following Doctor ${doctorToFollow.username}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error following doctor' });
  }
};

exports.unFollowDoc = async (req,res) =>{
  const { doctorId, followDoctorId } = req.params;

  try {
    const doctorToUnfollow = await Doctor.findById(followDoctorId);
    const doctorUnfollowing = await Doctor.findById(doctorId);

    if (!doctorToUnfollow || !doctorUnfollowing) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    if (!doctorUnfollowing.following.includes(followDoctorId)) {
      return res.status(400).json({ message: 'You are not following this doctor' });
    }

    doctorUnfollowing.following = doctorUnfollowing.following.filter(id => id.toString() !== followDoctorId);
    doctorToUnfollow.followers = doctorToUnfollow.followers.filter(id => id.toString() !== doctorId);

    await doctorUnfollowing.save();
    await doctorToUnfollow.save();

    res.json({ message: `Doctor ${doctorUnfollowing.username} has unfollowed Doctor ${doctorToUnfollow.username}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error unfollowing doctor' });
  }
}

exports.docFollowing = async (req,res) =>{
  const doctorId = req.params.doctorId;

  try {
    const doctor = await Doctor.findById(doctorId).populate('following');

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json(doctor.following);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching followed doctors' });
  }
};

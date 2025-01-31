const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctorModel')
exports.registerUser = async (req,res) => {
    const {username,email,password} =req.body;
    try{
        const userExits = await User.findOne({email});
        if(userExits){
            return res.status(400).json({message:'User Already exists'});
        }
        const user = new User({username,email,password});
        await user.save();
        const token = jwt.sign({id:user._id,role:user.role,name:user.username},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.status(201).json({token});
    }
    catch(error){
      console.error("Error during user registration:", error);
        res.status(500).json({message:'Server error'});
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({id:user._id,role:user.role,name:user.username},process.env.JWT_SECRET,{expiresIn:'1h'});
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.updateUserProfile = async (req, res) => {
    const { username, email } = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { username, email },
        { new: true }
      ).select('-password');
  
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  };
  exports.followDoc = async (req,res) =>{
    const { userId, doctorId } = req.params;

  try {
    const user = await User.findById(userId);
    const doctor = await Doctor.findById(doctorId);

    if (!user || !doctor) {
      return res.status(404).json({ message: 'User or doctor not found' });
    }

    if (user.following.includes(doctorId)) {
      return res.status(400).json({ message: 'You are already following this doctor' });
    }

    user.following.push(doctorId);
    doctor.followers.push(userId); // Add user to doctor's followers

    await user.save();
    await doctor.save();

    res.json({ message: `User ${user.username} is now following Doctor ${doctor.username}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error following doctor' ,details: err.message});
  }
  }
  exports.unFollowDoc = async (req,res) =>{
    const { userId, doctorId } = req.params;

  try {
    const user = await User.findById(userId);
    const doctor = await Doctor.findById(doctorId);

    if (!user || !doctor) {
      return res.status(404).json({ message: 'User or doctor not found' });
    }

    if (!user.following.includes(doctorId)) {
      return res.status(400).json({ message: 'You are not following this doctor' });
    }

    user.following = user.following.filter(id => id.toString() !== doctorId);
    doctor.followers = doctor.followers.filter(id => id.toString() !== userId);

    await user.save();
    await doctor.save();

    res.json({ message: `User ${user.username} has unfollowed Doctor ${doctor.username}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error unfollowing doctor' });
  }
  };

  exports.userFollowing = async(req,res) =>{
    const userId = req.params.userId;

  try {
    const user = await User.findById(userId).populate({
      path: 'following',
      select: 'username',
    });
    

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.following);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching followed doctors' });
  }
  }
const express = require('express');
const {
  registerDoctor,
  loginDoctor,
  updateDoctorProfile,
  searchDoctors, // Correct function name
  docFollowing,
  unFollowDoc,
  followDoc,
  fetchDoctors,
  fetchDoctorDetails
} = require('../controllers/doctorController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerDoctor);
router.post('/login', loginDoctor);
router.put('/update', verifyToken, updateDoctorProfile);
router.get('/search', verifyToken, searchDoctors); // Fixed route
router.get('/:doctorId',fetchDoctorDetails);
router.get('/', fetchDoctors);
router.post('/:doctorId/follow/:followDoctorId',verifyToken,followDoc);
router.delete('/:doctorId/unfollow/:followDoctorId',verifyToken,unFollowDoc);
router.get('/:doctorId/following',verifyToken,docFollowing);
module.exports = router;

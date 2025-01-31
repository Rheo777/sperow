const express = require('express');
const { registerUser, loginUser, updateUserProfile,userFollowing,unFollowDoc,followDoc } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware')
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update',verifyToken,updateUserProfile);
router.post('/:userId/follow/:doctorId',verifyToken,followDoc);
router.delete('/:userId/unfollow/:doctorId',verifyToken,unFollowDoc);
router.get('/:userId/following',verifyToken,userFollowing);

module.exports = router;

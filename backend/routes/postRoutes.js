const express = require('express');
const multer = require('multer');
const { createPost, getPosts, addComment, addLike,getPostByDoc } = require('../controllers/postController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer(); 


router.post('/create', verifyToken, upload.single('media'), createPost); 
router.get('/', getPosts); 
router.post('/comments/:postId', verifyToken, addComment); // Add a comment to a post
router.post('/likes/:postId', verifyToken, addLike); 
router.get('/doctor/:doctorId',getPostByDoc)
module.exports = router;

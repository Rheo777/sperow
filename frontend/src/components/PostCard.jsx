import React, { useState } from 'react';
import { FaThumbsUp, FaComment, FaShareAlt, FaBookmark, FaUserPlus, FaStar, FaTimes, FaCheck,FaChevronDown } from 'react-icons/fa'; // Import icons
import userCommentImage from '../assets/doctors.jpg'
const PostCard = ({ post, isFollowing, onFollowToggle, showFollowButton }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentBoxVisible, setCommentBoxVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [following, setFollowing] = useState(false); // State for follow button


  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments((prevComments) => [...prevComments, newComment]);
      setNewComment('');
      setCommentBoxVisible(false);
    }
  };

  const handleCommentDelete = (index) => {
    setComments((prevComments) => prevComments.filter((_, i) => i !== index));
  };


  const toggleContent = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-11/12 h-auto bg-white rounded-lg p-4 border border-[#b9b9b9]">
        {/* Profile Section */}
        <div className="flex justify-between items-center mb-2 p-2 rounded-lg border-b border-gray-300 relative">
          <div className="flex items-start">
            <img className="w-16 h-16 rounded-full object-cover" src={post?.doctorId?.profileImage} alt="User Profile" />
            <div className="ml-4">
              <h3 className="text-xl font-semibold">{post?.doctorId?.username}</h3>
              <p className="text-gray-500 text-sm">{post?.doctorId?.experience}</p>
              <p className="text-gray-500 text-xs">{post?.doctorId?.specialization}</p>
            </div>
          </div>

          {/* Follow/Unfollow Button */}
          <div className="relative">
            {showFollowButton && (
              <button
              onClick={onFollowToggle} // Use the passed function to toggle follow status
              className="flex items-center px-3 py-1 text-white rounded-full text-sm bg-[#3973eb] hover:bg-[#2955ab] transition duration-300"
            >
              {isFollowing ? 'UnFollow' : 'Follow'} {/* Display based on follow status */}
              <FaChevronDown className="ml-2" />
            </button>
            )}
            
          </div>
        </div>

        {/* Content Section */}
        <div className="mb-4 p-4 bg-white rounded-lg">
          <div className={`relative transition duration-300`}>
          <p className="text-gray-700 text-lg">
  {isExpanded ? (
    <span dangerouslySetInnerHTML={{ __html: post?.content }} />
  ) : (
    <span dangerouslySetInnerHTML={{ __html: post?.content.slice(0, 200) }} />
  )}
</p>

            <div className="flex items-center justify-center mt-4">
              <hr className="flex-grow border-t border-gray-300" />
              <button
                onClick={toggleContent}
                className="bg-[#3973eb] text-white text-xs font-semibold rounded-full px-3 py-1 mx-2 transition-transform duration-300 hover:translate-y-[-2px]"
              >
                {isExpanded ? 'See Less' : 'See More'}
              </button>
              <hr className="flex-grow border-t border-gray-300" />
            </div>
          </div>
          {post?.mediaUrl && (
  <img className="w-full h-full object-fill rounded-lg mt-4" src={post.mediaUrl} alt="Post Media" />
)}
{/* Like Section */}
<div className="flex justify-between p-4 bg-gray-100 rounded-lg">
          <div className="flex flex-col items-center">
            <button
              className={`flex items-center text-sm ${liked ? 'text-blue-500' : 'text-gray-400'}`}
              onClick={() => setLiked(!liked)}
            >
              <div className={`p-2 rounded-full ${liked ? 'bg-blue-5' : 'bg-gray-2'}`}>
                <FaStar className={`text-2xl`} />
              </div>
            </button>
            <span className="text-xs">{liked ? 'Liked' : 'Like'}</span>
          </div>
          <div className="flex flex-col items-center">
            <button
              className="flex items-center text-sm text-gray-400"
              onClick={() => setCommentBoxVisible(true)}
            >
              <div className="p-2 rounded-full bg-gray-2">
                <FaComment className="text-2xl" />
              </div>
            </button>
            <span className="text-xs">Comment</span>
          </div>
          <div className="flex flex-col items-center">
            <button
              className="flex items-center text-sm text-gray-400"
              onClick={() => alert('Shared')}
            >
              <div className="p-2 rounded-full bg-gray-2">
                <FaShareAlt className="text-2xl" />
              </div>
            </button>
            <span className="text-xs">Share</span>
          </div>
          <div className="flex flex-col items-center">
            <button
              className={`flex items-center text-sm ${saved ? 'text-blue-500' : 'text-gray-400'}`}
              onClick={() => setSaved(!saved)}
            >
              <div className={`p-2 rounded-full ${saved ? 'bg-blue-5' : 'bg-gray-2'}`}>
                <FaBookmark className={`text-2xl`} />
              </div>
            </button>
            <span className="text-xs">{saved ? 'Saved' : 'Save'}</span>
          </div>
        </div>

        {/* Comment Box */}
        {commentBoxVisible && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg relative">
            <textarea
              className="w-full border border-gray-300 p-2 rounded-lg resize-none"
              rows="3"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="flex justify-center mt-2">
              <button
                className="flex items-center bg-[#86120E] text-white rounded-full px-3 py-1 mx-2"
                onClick={() => setCommentBoxVisible(false)}
              >
                <FaTimes className="mr-1" /> Cancel
              </button>
              <button
                className="flex items-center bg-blue-500 text-white rounded-full px-3 py-1 mx-2"
                onClick={handleCommentSubmit}
              >
                <FaCheck className="mr-1" /> Send
              </button>
            </div>
          </div>
        )}

        {/* Display Comments */}
        {comments.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold">Comments:</h4>
            <ul className="list-disc list-inside">
              {comments.map((comment, index) => (
                <li key={index} className="flex items-center justify-between mb-2">
                  <div className="flex items-start">
                    <img src={userCommentImage} alt="User Comment" className="w-10 h-10 rounded-full mr-2" />
                    <span className="text-gray-700">{comment}</span>
                  </div>
                  <button
                    className="bg-red-500 text-white text-xs px-3 py-1 rounded-full ml-4"
                    onClick={() => handleCommentDelete(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        </div>
      </div>
    </div>
  );
};

export default PostCard;

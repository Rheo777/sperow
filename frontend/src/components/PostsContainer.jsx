import React, { useEffect } from 'react';
import PostCard from './PostCard'; // Assuming PostCard is in the same directory
import useStore from '../stores/store'; // Adjust the path accordingly
import { jwtDecode } from 'jwt-decode';
const PostsContainer = ({ posts }) => {
  const { followStatus, initializeFollowStatus, toggleFollow } = useStore();

  useEffect(() => {
    initializeFollowStatus(posts);
  }, [posts, initializeFollowStatus]);

  return (
    <div>
      {posts.map((post) => {
        const doctorId = post.doctorId._id;
        const isOwnPost = localStorage.getItem('token') && jwtDecode(localStorage.getItem('token')).id === doctorId;

        return (
          <PostCard
            key={post._id}
            post={post}
            isFollowing={followStatus[doctorId] || false}
            onFollowToggle={isOwnPost ? null : () => toggleFollow(doctorId)}
            showFollowButton={!isOwnPost} // Pass this prop to control button visibility
          />
        );
      })}
    </div>
  );
};

export default PostsContainer;

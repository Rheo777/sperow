import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PostsContainer from './PostsContainer';

const PostsContent = () => {
  const { doctorId } = useParams(); // Extract doctorId from the URL
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts based on doctorId
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Assuming you have an endpoint that fetches posts based on doctorId
        const response = await axios.get(`http://localhost:5003/api/posts`);
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [doctorId]); // Fetch posts when doctorId changes

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold">Posts Section</h1>
      
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length > 0 ? (
        <ul>
          <PostsContainer posts={posts}/>
        </ul>
      ) : (
        <p>No posts available for this doctor.</p>
      )}
    </div>
  );
};

export default PostsContent;

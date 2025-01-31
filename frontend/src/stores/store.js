// store.js
import {create} from 'zustand';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const useStore = create((set, get) => ({ // Add get as a second argument
  followStatus: {},
  initializeFollowStatus: async (posts) => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    const role = localStorage.getItem('role');
    const presUser = role === 'doctor' ? 'doctors' : 'users';

    const status = {};
    try {
      const followStatusResponses = await Promise.all(posts.map(post => {
        const doctorId = post?.doctorId?._id;
        return axios.get(`http://localhost:5003/api/${presUser}/${userId}/following`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }));

      followStatusResponses.forEach((response, index) => {
        const doctorId = posts[index]?.doctorId?._id;
        const isFollowing = response.data.some(followedDoctor => 
          followedDoctor._id === doctorId
        );
        status[doctorId] = isFollowing;
      });

      set({ followStatus: status });
    } catch (error) {
      console.error('Error fetching follow statuses:', error);
    }
  },
  toggleFollow: async (doctorId) => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    const role = localStorage.getItem('role');
    const presUser = role === 'doctor' ? 'doctors' : 'users';

    try {
      if (get().followStatus[doctorId]) {
        // Unfollow
        await axios.delete(`http://localhost:5003/api/${presUser}/${userId}/unfollow/${doctorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Follow
        await axios.post(
          `http://localhost:5003/api/${presUser}/${userId}/follow/${doctorId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      // Update the local follow status
      set((state) => ({
        followStatus: {
          ...state.followStatus,
          [doctorId]: !state.followStatus[doctorId],
        },
      }));
      
    } catch (error) {
      console.error('Error in follow/unfollow operation:', error);
    }
  }
}));

export default useStore;

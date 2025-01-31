import { create } from 'zustand';

const useAuthStore = create((set) => ({
  role: null,
  setRole: (role) => set(() => ({ role })), 
  getRole: () => set((state) => state.role),
}));

export default useAuthStore;

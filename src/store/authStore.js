
// import { create } from 'zustand';

// const useAuthStore = create((set) => ({
//   token: localStorage.getItem('token') || null,
//   user: null,
//   isAuthenticated: !!localStorage.getItem('token'),
//   setToken: (access_token) => {
//     localStorage.setItem('token', access_token);
//     set({ token: access_token, isAuthenticated: true });
//   },
//   setUser: (user) => set({ user }),
//   logout: () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('email');
//     set({ token: null, user: null, isAuthenticated: false });
//   },
// }));

// export default useAuthStore;

import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: localStorage.getItem('token') || null,
  user: null,
  isAuthenticated: !!localStorage.getItem('token'),

  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token, isAuthenticated: true });
  },

  setUser: (user) => set({ user }),

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;



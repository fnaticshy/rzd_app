import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    data: null
  }),

  actions: {
    login(payload) {
      this.data = payload;
    },

    logout() {
      this.data = null;
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.data
  },
});

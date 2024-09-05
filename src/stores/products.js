import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', {
  state: () => ({
    data: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchProducts() {
      if (this.data.length) {
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const response = await fetch('https://fakestoreapi.com/products');

        this.data = await response.json();
      } catch (err) {
        this.error = 'Ошибка при получении товаров';
        console.error(err);
      } finally {
        this.loading = false;
      }
    }
  }
});

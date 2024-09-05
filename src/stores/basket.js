import { defineStore } from 'pinia';

export const useBasketStore = defineStore('basket', {
  state: () => ({
    data: []
  }),

  actions: {
    addToBasket(payload) {
      this.data = [...this.data, { ...payload, quantity: 1 }];
    },

    deleteFromBasket(payload) {
      this.data = this.data.filter(el => el.id !== payload.id);
    },

    changeQuantityById([id, operator]) {
      this.data = this.data
        .map(el => {
          if (el.id === id) {
            return {
              ...el,
              quantity: operator === '+' ? el.quantity + 1 : el.quantity - 1
            };
          }

          return el;
        })
        .filter(el => el.quantity > 0);

    },

    checkout() {
      this.data = [];
    }
  },

  getters: {
    basketItemsIds: state => state.data.map(({ id }) => id)
  }
});

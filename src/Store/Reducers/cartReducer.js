import { createSlice } from "@reduxjs/toolkit";
const initialCartState = {
  isCartOpen: false,

  products: [
    {
      id: 1,
      title: "Product 1",
      price: 10.0,
      quantity: 1,
      description: "This is a test product",
    },
    {
      id: 2,
      title: "Product 2",
      price: 20.0,
      quantity: 2,
      description: "Another test product",
    },
  ],

  totalProducts: 3,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    addProduct: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.totalProducts++;
      return state
    },

    removeProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      if (index !== -1) {
        state.products.splice(index, 1);
      }
      if (state.products.length === 0) {
        state.isCartOpen = false;
      }
      state.totalProducts--;
      return state;
    },

    increaseQuantity: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload
      );
      if (product) {
        product.quantity++;
      }

      state.totalProducts++;

      return state;
    },
    decreaseQuantity: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload
      );
      if (product && product.quantity > 1) {
        product.quantity--;
      } else if (product && product.quantity === 1) {
        const index = state.products.indexOf(product);
        state.products.splice(index, 1);
        if (state.products.length === 0) {
          state.isCartOpen = false;
        }
      }

      state.totalProducts--;

      return state;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
const initialCartState = {
  isCartOpen: false,
  products: [],
  notification : null,
  isChanged : false
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,

  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    setCart: (state, action) => {
      state.products = action.payload;
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

      state.isChanged = true;
      return state;
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
      state.isChanged = true;
      return state;
    },

    increaseQuantity: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload
      );
      if (product) {
        product.quantity++;
      }

      state.isChanged = true;
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

      state.isChanged = true;
      return state;
    },

    showNotifications: (state, action) => {
      state.notification = action.payload;
    }
  },
});

export const sentCartData = (cart) => {
  return async function putCartToDB(dispatch) {
    dispatch(cartActions.showNotifications({
      status: 'Sending',
      message: 'Sending cart data!',
    }))

    try {
      const response = await fetch(import.meta.env.VITE_FIREBASE_PATH + '/cart.json', {
        method: "PUT",
        body: JSON.stringify(cart)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      dispatch(cartActions.showNotifications({
        status: 'Success',
        message: 'Sent cart data!',
      }))

    } catch (error) {
      console.error(error.message);
      dispatch(cartActions.showNotifications({
        status: 'Error',
        message: 'Failed to send cart data!',
      }))
    }
  }
}

export const fetchCartData = () => {
  return async function getCartFromDB(dispatch) {
    try {
      const response = await fetch(import.meta.env.VITE_FIREBASE_PATH + '/cart.json')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()

      if (data) {
        dispatch(cartActions.setCart(data))
      }
    } catch (error) {
      console.error(error.message);
    }
  }
}

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;

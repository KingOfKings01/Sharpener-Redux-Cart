import { createSlice } from "@reduxjs/toolkit"
const initialProductState = { products: [{
    id: 1,
    title: "Product 1",
    price: 10.00,
    quantity: 1,
    description: "This is a test product"
},
{
    id: 2,
    title: "Product 2",
    price: 20.00,
    quantity: 2,
    description: "Another test product"
}

] }

const productSlice = createSlice({
  name: "products",
  initialState: initialProductState,
  reducers: {
  
  }
})

export const productActions = productSlice.actions
export default productSlice.reducer
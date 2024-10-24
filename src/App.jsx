import { useSelector, useDispatch } from 'react-redux'
import './App.css'
import Cart from './Components/Cart/Cart'
import Navbar from './Components/Navbar/Navbar'
import Products from './Components/Products/Products'
import { useEffect, useState } from 'react'
import Notification from './Components/Notification/Notification'
import { fetchCartData, sentCartData } from './Store/Reducers/cartReducer'


let isInitial = true

function App() {
  const { isCartOpen, products, notification, isChanged } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  // const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false
      // setIsInitial(false);
      return
    }

    if (isChanged) {
      dispatch(sentCartData(products))
    }

  }, [products, dispatch]);

  return (
    <>
      <Navbar />
      {notification && <Notification />}
      {isCartOpen && <Cart />}
      <Products />
    </>
  )
}

export default App

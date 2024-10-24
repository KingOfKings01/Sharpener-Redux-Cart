import { useSelector, useDispatch } from 'react-redux'
import './App.css'
import Cart from './Components/Cart/Cart'
import Navbar from './Components/Navbar/Navbar'
import Products from './Components/Products/Products'
import { useEffect } from 'react'
import Notification from './Components/Notification/Notification'
import { cartActions } from './Store/Reducers/cartReducer'


function App() {
  const { isCartOpen, products, notification } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    
    async function putCartToDB() {
      dispatch(cartActions.showNotifications({
        status: 'Sending',
        message: 'Sending cart data!',
      }))
      try {
        const response = await fetch(import.meta.env.VITE_FIREBASE_PATH + '/cart.json', {
          method: "PUT",
          body: JSON.stringify(products)
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
    putCartToDB()

  }, [products, dispatch]);


  console.log(notification);

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

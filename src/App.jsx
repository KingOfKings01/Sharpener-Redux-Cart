import { useSelector } from 'react-redux'
import './App.css'
import Cart from './Components/Cart/Cart'
import Navbar from './Components/Navbar/Navbar'
import Products from './Components/Products/Products'

function App() {
  const isCartOpen = useSelector(state => state.cart.isCartOpen)
  return (
    <>
      <Navbar />
      {isCartOpen && <Cart />}
      <Products />
    </>
  )
}

export default App

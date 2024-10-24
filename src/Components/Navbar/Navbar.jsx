import { useDispatch, useSelector } from "react-redux"
import classes from "./navbar.module.css"
import { cartActions } from "../../Store/Reducers/cartReducer"
export default function Navbar() {

  const {products} = useSelector(state => state.cart)

  const dispatch = useDispatch()

  const toggleCart = () => {
    dispatch(cartActions.toggleCart())
  }

  const totalProducts = products.reduce((total, product) => total + product.quantity, 0)

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <h3>ReduxCart</h3>
        <button onClick={toggleCart}>My Cart <span>{totalProducts}</span></button>
      </nav>
    </header>
  )
}

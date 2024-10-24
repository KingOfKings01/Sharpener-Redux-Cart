import { useDispatch, useSelector } from "react-redux"
import classes from "./cart.module.css"
import { cartActions } from "../../Store/Reducers/cartReducer"

export default function Cart() {
    const { products } = useSelector(state => state.cart)
    
  const dispatch = useDispatch()

  const increaseQuantity = (id) => {
    dispatch(cartActions.increaseQuantity(id))
  }

  const decreaseQuantity = (id) => {
    dispatch(cartActions.decreaseQuantity(id))
  }

    return (
        <section className={classes.cartBox}>
            <h4 className={classes.title}>Your Shopping Cart</h4>
            <div className={classes.cartDetails}>

                {products.length > 0 ?
                    <>
                        {products.map(({id, title, quantity, price}) =>
                            <div key={id}>
                                <div className={`${classes.line1} ${classes.productBox}`}>
                                    <h3>{title}</h3>
                                    <h3>
                                        ${price * quantity}
                                        <span>(${price} / item)</span>
                                    </h3>
                                </div>

                                <div className={`${classes.line2} ${classes.productBox}`}>
                                    <h4>
                                        x{quantity}
                                    </h4>
                                    <div className={classes.btnGroup}>
                                        <button onClick={()=>decreaseQuantity(id)}>–</button>
                                        <button onClick={()=>increaseQuantity(id)}>+</button>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        )}
                    </>
                    :
                    <p>Cart is empty</p>
                }

            </div>
        </section>
    )
}

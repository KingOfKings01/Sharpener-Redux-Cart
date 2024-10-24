import { useDispatch, useSelector } from 'react-redux'
import classes from './product.module.css'
import { cartActions } from '../../Store/Reducers/cartReducer'

export default function Products() {
    const { products } = useSelector(state => state.products)
    const dispatch = useDispatch()

    const addToCart = (product) => {
        dispatch(cartActions.addProduct(product))
    }
    return (
        <section className={classes.productsSection}>
            <h3 className={classes.title}>BUY YOUR FAVORITE PRODUCTS</h3>

            <div className={classes.card}>
                {products.length > 0 ? products.map(product => <div key={product.id}>

                    <div>
                        <h4>{product.title}</h4>
                        <h4>${product.price}</h4>
                    </div>

                    <p>
                        {product.description}
                    </p>

                    <div className={classes.end}>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>

                    <hr />
                </div>) : <p>No product</p>}

            </div>
        </section>
    )
}

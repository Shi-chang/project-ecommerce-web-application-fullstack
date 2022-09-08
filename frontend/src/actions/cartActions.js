import axios from 'axios';
import { addToCart, removeFromCart } from '../reducers/cartSlice.js';
import PORT from '../components/route/routeConstants.js';

// Adds an item to the cart.
export const addItemToCart = (productId, quantity) => async (dispatch, getState) => {
    const url = `${PORT}/product/${productId}`;
    const { data } = await axios.get(url);

    dispatch(addToCart({
        productId: data.product._id,
        name: data.product.name,
        price: data.product.price,
        stock: data.product.stock,
        image: data.product.images[0].url,
        quantity
    }));

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

// Removes an item from the cart.
export const removeItemFromCart = (productId) => async (dispatch, getState) => {
    dispatch(removeFromCart(productId));

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

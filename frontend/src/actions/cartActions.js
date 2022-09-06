import axios from 'axios';
import { addToCart, removeFromCart, saveShippingInfo } from '../reducers/cartSlice.js';
import PORT from '../components/route/routeConstants.js';

// Adds an item to the cart.
export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    const url = `${PORT}/product/${id}`;
    const { data } = await axios.get(url);

    dispatch(addToCart({
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        stock: data.product.stock,
        image: data.product.images[0].url,
        quantity
    }));

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

// Removes an item from the cart.
export const removeItemFromCart = (id) => async (dispatch, getState) => {
    dispatch(removeFromCart(id));

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

// Saves an user's shipping information.
export const saveShippingInformation = (shippingData) => async (dispatch) => {
    dispatch(saveShippingInfo(shippingData));

    localStorage.setItem('shippingInfo', JSON.stringify(shippingData));
}

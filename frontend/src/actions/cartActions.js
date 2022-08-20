import {
    ADD_TO_CART,
    REMOVE_FROM_CART
} from '../reducers/cartSlice.js';
import axios from 'axios';

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    const url = `http://localhost:4000/api/v1/product/${id}`;
    const { data } = await axios.get(url);

    dispatch(ADD_TO_CART({
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        stock: data.product.stock,
        image: data.product.images[0].url,
        quantity
    }));

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const removeItemFromCart = (id) => async (dispatch, getState) => {
    dispatch(REMOVE_FROM_CART(id));

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

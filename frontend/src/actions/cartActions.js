import axios from 'axios';
import { addToCart, removeFromCart } from '../reducers/userInfoSlice.js';
import PORT from '../components/route/routeConstants.js';
import store from '../store.js';

// Adds an item to the cart.
export const addItemToCart = (productId, quantity) => async (dispatch, getState) => {
    const productUrl = `${PORT}/product/${productId}`;
    const { data } = await axios.get(productUrl);

    dispatch(addToCart({
        productId: data.product._id,
        name: data.product.name,
        price: data.product.price,
        stock: data.product.stock,
        image: data.product.images[0].url,
        quantity
    }));

    await handleCartChange();
}

// Removes an item from the cart.
export const removeItemFromCart = (productId) => async (dispatch, getState) => {
    dispatch(removeFromCart(productId));

    await handleCartChange();
}

// Handles the cart change.
const handleCartChange = async () => {
    const { userInfo } = store.getState();
    const cartItems = userInfo.user.cartItems;

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const updateCartUrl = `${PORT}/cart/update`;
        await axios.put(updateCartUrl, cartItems, config);
    } catch (error) {
        alert(error.response.data.message);
    }
}

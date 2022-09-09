import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducers/productsSlice';
import productDetailsReducer from './reducers/productDetailsSlice';
import userAuthenticationReducer from './reducers/userAuthenticationSlice';
import userUpdateReducer from './reducers/userUpdateSlice';
import userForgotPasswordSlice from './reducers/userForgotPasswordSlice';
import cartReducer from './reducers/cartSlice.js';
import userResetPasswordSlice from './reducers/userResetPasswordSlice';
import ordersSlice from './reducers/ordersSlice';
import orderDetailsSlice from './reducers/orderDetailsSlice';

// Create a central store that keeps track of the sates of products, details of
// the product that has been selected, the user, and the shopping cart.
export default configureStore({
    reducer: {
        products: productsReducer,
        productDetails: productDetailsReducer,
        user: userAuthenticationReducer,
        userUpdate: userUpdateReducer,
        forgotPassword: userForgotPasswordSlice,
        resetPassword: userResetPasswordSlice,
        cart: cartReducer,
        orders: ordersSlice,
        orderDetails: orderDetailsSlice
    },
})

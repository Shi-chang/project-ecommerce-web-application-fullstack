// import { applyMiddleware, createStore, combineReducers } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
// import { productsReducer, productDetailsReducer } from './reducers/productReducers.js';
// import { userReducer } from './reducers/userReducers.js';
// import { cartReducer } from './reducers/cartReducers.js';

// const reducer = combineReducers({
//     products: productsReducer,
//     productDetails: productDetailsReducer,
//     user: userReducer,
//     cart: cartReducer
// });

// let initialState = {
//     cart: {
//         cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
//     }
// };

// const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducers/productsSlice.js';
import productDetailsReducer from './reducers/productDetailSlice.js';
import userReducer from './reducers/userSlice.js';
import cartReducer from './reducers/cartSlice.js';

export default configureStore({
    reducer: {
        products: productsReducer,
        productDetails: productDetailsReducer,
        user: userReducer,
        cart: cartReducer
    },
})
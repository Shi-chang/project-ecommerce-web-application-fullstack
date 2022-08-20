import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: []
    },
    reducers: {
        ADD_TO_CART: (state, action) => {
            const item = action.payload;
            const itemExists = state.cartItems.find(e => e.product === item.product);
            if (itemExists) {
                state.cartItems = state.cartItems.map(i => i.product === itemExists.product ? item : i)
            } else {
                state.cartItems = [...state.cartItems, item];
            }
        },
        REMOVE_FROM_CART: (state, action) => {
            state.cartItems = state.cartItems.filter(i => i.product !== action.payload);
        }
    },
})

// Action creators are generated for each case reducer function
export const { ADD_TO_CART, REMOVE_FROM_CART } = cartSlice.actions

export default cartSlice.reducer;

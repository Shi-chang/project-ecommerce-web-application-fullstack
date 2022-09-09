import { createSlice } from '@reduxjs/toolkit';

// The order reducer that stores the state of the current user's orders.
export const ordersSlice = createSlice({
    name: 'all orders',
    initialState: {},
    reducers: {
        requestLoadOrders: (state) => {
            state.loading = true;
        },
        loadOrdersSuccess: (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        },
        loadOrdersFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearLoadOrderErrors: (state) => {
            state.loading = false;
            state.error = null;
        },
    },
})

export const { requestLoadOrders, loadOrdersSuccess, loadOrdersFail, clearLoadOrderErrors } = ordersSlice.actions;

export default ordersSlice.reducer;

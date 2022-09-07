import { createSlice } from '@reduxjs/toolkit';

// The order reducer that stores the state of the current user's orders.
export const orderSlice = createSlice({
    name: 'order',
    initialState: {},
    reducers: {
        requestCreateOrder: (state) => {
            state.loading = true;
        },
        createOrderSuccess: (state, action) => {
            state.loading = false;
            state.order = action.payload;
        },
        createOrderFail: (state, action) => {
            state.loading = false;
            error = action.payload;
        },
        clearOrderErrors: (state) => {
            state.loading = false;
            error = null;
        },
    },
})

export const { requestCreateOrder, createOrderSuccess, createOrderFail, clearOrderErrors } = orderSlice.actions;

export default orderSlice.reducer;

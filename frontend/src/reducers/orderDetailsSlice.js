import { createSlice } from '@reduxjs/toolkit';

// The order details reducer that stores the details state of the current user's order on display.
export const orderDetailsSlice = createSlice({
    name: 'order details',
    initialState: {},
    reducers: {
        requestOrderDetails: (state) => {
            state.loading = true;
        },
        requestOrderDetailsSuccess: (state, action) => {
            state.loading = false;
            state.orderDetails = action.payload;
        },
        requestOrderDetailsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearOrderDetailsErrors: (state) => {
            state.loading = false;
            state.error = null;
        },
    },
})

export const { requestOrderDetails, requestOrderDetailsSuccess, requestOrderDetailsFail, clearOrderDetailsErrors } = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;

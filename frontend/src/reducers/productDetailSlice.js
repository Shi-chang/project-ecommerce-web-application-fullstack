import { createSlice } from '@reduxjs/toolkit';

export const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState: {
        product: {}
    },
    reducers: {
        PRODUCT_DETAILS_REQUEST: (state) => {
            state.loading = true;
        },
        PRODUCT_DETAILS_SUCCESS: (state, action) => {
            state.loading = false;
            state.product = action.payload;
        },
        PRODUCT_DETAILS_FAIL: (state, action) => {
            state.error = action.payload;
        },
        CLEAR_ERRORS: (state) => {
            state.error = null;
        },
    },
})

// Action creators are generated for each case reducer function
export const { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, CLEAR_ERRORS } = productDetailsSlice.actions

export default productDetailsSlice.reducer;
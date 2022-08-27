import { createSlice } from '@reduxjs/toolkit';

// The product details reducer and its actions.
export const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState: {
        product: {}
    },
    reducers: {
        requestProductDetails: (state) => {
            state.loading = true;
        },
        requestProductDetailsSuccess: (state, action) => {
            state.loading = false;
            state.product = action.payload;
        },
        requestProductDetailsFail: (state, action) => {
            state.error = action.payload;
        },
        clearProductDetailsErrors: (state) => {
            state.error = null;
        },
    },
})

export const { requestProductDetails,
    requestProductDetailsSuccess,
    requestProductDetailsFail,
    clearProductDetailsErrors } = productDetailsSlice.actions;
    
export default productDetailsSlice.reducer;
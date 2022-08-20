import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: []
    },
    reducers: {
        PRODUCTS_REQUEST: (state) => {
            state.loading = true;
            state.products = []
        },
        PRODUCTS_SUCCESS: (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.productsCount = action.payload.productsCount;
            state.resPerPage = action.payload.resPerPage;
        },
        PRODUCTS_FAIL: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        PRODUCTS_CLEAR_ERRORS: (state) => {
            state.error = null;
        },
    },
})

// Action creators are generated for each case reducer function
export const { PRODUCTS_REQUEST, PRODUCTS_SUCCESS, PRODUCTS_FAIL, PRODUCTS_CLEAR_ERRORS } = productsSlice.actions

export default productsSlice.reducer
import { createSlice } from '@reduxjs/toolkit';

// The product reducer and its actions.
export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: []
    },
    reducers: {
        requestAllProducts: (state) => {
            state.loading = true;
            state.products = []
        },
        requestProductsSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.productsCount = action.payload.productsCount;
            state.filteredProductsCount = action.payload.filteredProductsCount;
            state.resPerPage = action.payload.resPerPage;
        },
        requestProductsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearProductsErrors: (state) => {
            state.error = null;
        },
    },
})

export const { requestAllProducts,
    requestProductsSuccess,
    requestProductsFail,
    clearProductsErrors } = productsSlice.actions;

export default productsSlice.reducer;
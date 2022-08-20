import {
    PRODUCTS_REQUEST,
    PRODUCTS_SUCCESS,
    PRODUCTS_FAIL,
    PRODUCTS_CLEAR_ERRORS,
} from '../reducers/productsSlice.js';
import {
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from '../reducers/productDetailSlice.js';

export const getProducts = (keyword = '', currentPage = 1, price) => async (dispatch) => {
    try {
        dispatch(PRODUCTS_REQUEST());
        const url = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            dispatch(PRODUCTS_SUCCESS(data));
        }
    } catch (error) {
        dispatch(PRODUCTS_FAIL(error.message));
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch(PRODUCTS_CLEAR_ERRORS());
};

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch(PRODUCT_DETAILS_REQUEST());
        const url = `http://localhost:4000/api/v1/product/${id}`;
        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            console.dir(data);
            dispatch(PRODUCT_DETAILS_SUCCESS(data.product));
        }
    } catch (error) {
        dispatch(PRODUCT_DETAILS_FAIL(error.message));
    }
};

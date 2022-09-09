import {
    requestProductDetails,
    requestProductDetailsSuccess,
    requestProductDetailsFail
} from '../reducers/productDetailsSlice';
import {
    requestAllProducts,
    requestProductsSuccess,
    requestProductsFail
} from '../reducers/productsSlice.js';
import PORT from '../components/route/routeConstants';

import {
    requestNewReview,
    newReviewSuccess,
    newReviewFail,
    resetNewReview,
    clearNewReviewErrors
} from '../reducers/newReviewSlice.js';
import axios from 'axios';

// Gets all products.
export const getProducts = (keyword = '', currentPage = 1, price, category, rating = 0) => async (dispatch) => {
    try {
        dispatch(requestAllProducts());

        // Sets the url with key and value pairs from the query string
        let url = `${PORT}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;
        if (category) {
            url = `${PORT}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${rating}`
        }

        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            dispatch(requestProductsSuccess(data));
        }
    } catch (error) {
        dispatch(requestProductsFail(error.message));
    }
};

// Gets the details of a product.
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch(requestProductDetails());
        const url = `${PORT}/product/${id}`;
        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            dispatch(requestProductDetailsSuccess(data.product));
        }
    } catch (error) {
        dispatch(requestProductDetailsFail(error.message));
    }
};

// Gets the details of a product.
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch(requestNewReview());
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const url = `${PORT}/order/review`;
        const { data } = await axios.put(url, reviewData, config);
        dispatch(newReviewSuccess(data.success));
    } catch (error) {
        dispatch(newReviewFail(error.response.data.message));
    }
};
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

// Gets all products.
export const getProducts = (keyword = '', currentPage = 1, price) => async (dispatch) => {
    try {
        dispatch(requestAllProducts());
        // Sets the url with query key and value pairs
        const url = `${PORT}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
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

import axios from 'axios';
import PORT from '../components/route/routeConstants.js';
import {
    requestLoadOrders,
    loadOrdersSuccess,
    loadOrdersFail
} from '../reducers/ordersSlice.js';
import {
    requestOrderDetails,
    requestOrderDetailsSuccess,
    requestOrderDetailsFail
} from '../reducers/orderDetailsSlice.js';

// Gets the login user's orders.
export const myOrders = () => async (dispatch) => {
    try {
        dispatch(requestLoadOrders());
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const url = `${PORT}/orders/me`;
        const { data } = await axios.get(url, config);
        dispatch(loadOrdersSuccess(data.orders));
    } catch (error) {
        dispatch(loadOrdersFail(error.response.data.message));
    }
}

// Gets the details of a specified order.
export const getOrderDetails = (orderId) => async (dispatch) => {
    try {
        dispatch(requestOrderDetails());
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const url = `${PORT}/order/${orderId}`;
        const { data } = await axios.get(url, config);
        dispatch(requestOrderDetailsSuccess(data.order));
    } catch (error) {
        dispatch(requestOrderDetailsFail(error.response.data.message));
    }
}

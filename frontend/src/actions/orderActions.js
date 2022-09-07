import axios from 'axios';
import PORT from '../components/route/routeConstants.js';

import {
    requestCreateOrder,
    createOrderSuccess,
    createOrderFail
} from '../reducers/orderSlice.js';

export const createOrder = (order) = async (dispatch, getState) => {
    try {
        dispatch(requestCreateOrder());
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        const url = `${PORT}/order/new`;
        const { data } = await axios.post(url, order, config);
        dispatch(createOrderSuccess(data));
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message));
    }
}

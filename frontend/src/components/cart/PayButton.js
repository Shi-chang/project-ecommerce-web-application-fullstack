import axios from 'axios';
import { useSelector } from 'react-redux';
import PORT from '../route/routeConstants';
import React from 'react';

const PayButton = ({ cartItems }) => {
    const user = useSelector(state => state.user);

    const handleCheckout = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
            const url = `${PORT}/stripe/create-checkout-session`;
            const response = await axios.post(url, {
                cartItems,
                userId: user.user._id
            }, config);

            if (response.data.url) {
                window.location.href = response.data.url;
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    return (
        <>
            <div className='d-flex justify-content-center'>
                <button id="primary-button" onClick={() => handleCheckout()}>Check Out</button>
            </div>
        </>
    )
}

export default PayButton;

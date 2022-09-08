import axios from 'axios';
import { useSelector } from 'react-redux';
import PORT from '../route/routeConstants';
import React from 'react';

/**
 * The payment component that handles the checkout process. It sends the create-checkout-session
 * request to the server and gets back a session url that will be used to collect the shipping
 * information and the payment information.
 * Along with the reuqest, only the user ID, product IDs, quantities, and image of the products 
 * in the shopping cart will be sent to the server. The price information for the products will come 
 * directly from the server to avoid malicious price manipulations.
 * 
 * @returns a clickable button that triggers the checkout process
 */
const Payment = () => {
    const { cartItems } = useSelector(state => state.cart);
    const user = useSelector(state => state.user);

    const cartInfo = cartItems.map(item => {
        return {
            productId: item.productId,
            quantity: item.quantity,
            image: item.image
        }
    });

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
                userId: user.user._id,
                cartInfo
            }, config);

            // If successfully gets back an url, redirects to the session url.
            if (response.data.url) {
                window.location.href = response.data.url;
            }
        } catch (error) {
            console.log(error);
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

export default Payment;

import React from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData.js';


const CheckoutSuccess = () => {
    return (
        <>
            <MetaData title="Order Succeeds" />

            <div className="row justify-content-center">
                <div className="col-6 mt-5 text-center">
                    <img className="my-5 img-fluid d-block mx-auto" src="/images/order-succeeds.png" alt="order succeeds" width="200" height="200" />

                    <h3>Order placed successfully! Thank you!</h3>

                    <Link to="/orders/me">Check my orders?</Link>
                </div>

            </div>
        </>
    )
}

export default CheckoutSuccess;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps.js';

const ConfirmOrder = () => {
    const { cartItems } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);
    const { shippingInfo } = useSelector(state => state.cart);

    const navigate = useNavigate();

    const itemsPrice = cartItems.reduce((prev, cur) => prev + cur.price * cur.quantity, 0);
    const shippingPrice = itemsPrice >= 300 ? 0 : 30;
    const taxPrice = itemsPrice * 0.10;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const handleProceedToPayment = () => {
        const priceData = {
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }

        sessionStorage.setItem('priceData', JSON.stringify(priceData));
        navigate('/payment');
    }

    return (
        <>
            <MetaData title="Confirm Order" />
            <CheckoutSteps shippingInfo orderConfirmation />

            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3">Shipping Information</h4>
                    <p><b>Name:</b> {user && user.name}</p>
                    <p><b>Phone number:</b> {shippingInfo.phoneNumber}</p>
                    <p className="mb-4"><b>Address:</b> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postCode}, ${shippingInfo.country}`}</p>

                    <hr />
                    <h4 className="mt-4">Your Cart Items:</h4>
                    <hr />
                    {cartItems.map(item => (
                        <div className="cart-item my-1" key={item.product}>
                            <div className="row">
                                <div className="col-4 col-lg-2">
                                    <img src={item.image} alt="Laptop" height="45" width="65" />
                                </div>

                                <div className="col-5 col-lg-6">
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </div>

                                <div className="col-4 col-lg-4 mt-4 mt-lg-0 mb-5">
                                    <p>{item.quantity} x ${item.price} = <b>${(item.quantity * item.price).toFixed(2)}</b></p>
                                </div>
                                <hr />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order-summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">${itemsPrice.toFixed(2)}</span></p>
                        <p>Shipping: <span className="order-summary-values">${shippingPrice.toFixed(2)}</span></p>
                        <p>Tax:  <span className="order-summary-values">${taxPrice.toFixed(2)}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">${totalPrice.toFixed(2)}</span></p>

                        <hr />
                        <div className='d-flex justify-content-center'>
                            <button id="primary-button" className="btn btn-primary btn-block" onClick={handleProceedToPayment} >Proceed to Payment</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ConfirmOrder;
import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ shippingInfo, orderConfirmation, payment }) => {
    return (
        <div className='checkout-progress d-flex justify-content-center mt-5'>
            {shippingInfo ? <Link to='/shipping' className='float-right'>
                <div className="triangle2-active"></div>
                <div className="step active-step">Shipping Info</div>
                <div className="triangle-active"></div>
            </Link> : <Link to='#!' disabled >
                <div className="triangle2-incomplete"></div>
                <div className="step incomplete">Shipping Info</div>
                <div className="triangle-incomplete"></div>
            </Link>}

            {orderConfirmation ? <Link to='order/confirm' className='float-right'>
                <div className="triangle2-active"></div>
                <div className="step active-step">Confirm Order</div>
                <div className="triangle-active"></div>
            </Link> : <Link to='#!' disabled >
                <div className="triangle2-incomplete"></div>
                <div className="step incomplete">Confirm Order</div>
                <div className="triangle-incomplete"></div>
            </Link>}

            {orderConfirmation ? <Link to='/payment' className='float-right'>
                <div className="triangle2-active"></div>
                <div className="step active-step">Payment</div>
                <div className="triangle-active"></div>
            </Link> : <Link to='#!' disabled >
                <div className="triangle2-incomplete"></div>
                <div className="step incomplete">Payment</div>
                <div className="triangle-incomplete"></div>
            </Link>}
        </div>
    )
}

export default CheckoutSteps;
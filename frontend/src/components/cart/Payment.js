import React, { useEffect } from 'react';
import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInformation } from '../../actions/cartActions';
import { useNavigate } from 'react-router';
import PORT from '../route/routeConstants';

import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement, PaymentElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const options = {
    style: {
        base: {
            fontSize: '14px'
        },
        invalid: {
            color: 'red'
        }
    }
}

const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const { cartItems, shippingInfo } = useSelector(state => state.cart);

    useEffect(() => {

    }, []);

    const priceData = JSON.parse(sessionStorage.getItem('priceData'));
    const paymentData = {
        amount: Math.round(priceData.totalPrice * 100),
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        document.querySelector('#pay-btn').disabled = true;

        let res;

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }

            const url = `${PORT}/payment/process`;

            const response = await axios.post(url, paymentData, config);

            const clientSecret = response.data.clicentSecret;

            if (!stripe || !elements) {
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            });

            if (result.error) {
                alert(result.error.message);
                document.querySelector('pay-but').disabled = false;
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    navigate('/success');
                } else {
                    alert("Something went wrong when processing the payment.");
                }
            }
        } catch (error) {
            document.querySelector('#pay-btn').disabled = false;
            alert(error.response.data.message);
        }
    }

    return (
        <>
            <MetaData title="Payment" />
            <CheckoutSteps shippingInfo orderConfirmation payment />

            <div className="row wrapper">
                <div className="user-info-div">
                    <form className="shadow-lg" onSubmit={handleSubmit}>
                        <h1 className="mb-4">Card Info</h1>
                        <div className="form-group">
                            <label htmlFor="card-number-field">Card Number</label>
                            <CardNumberElement
                                type="text"
                                id="card-number-field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card-expiry-field">Card Expiry</label>
                            <CardExpiryElement
                                type="text"
                                id="card-expiry-field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card-cvc-field">Card CVC</label>
                            <CardCvcElement
                                type="text"
                                id="card-cvc-field"
                                className="form-control"
                                options={options}
                            />
                        </div>
                        <div className='d-flex justify-content-center'>

                            <button
                                id="pay-btn"
                                type="submit"
                                className="btn btn-block"
                            >
                                Pay
                                {` - ${priceData && priceData.totalPrice}`}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Payment;


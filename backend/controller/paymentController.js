import React from 'react';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import stripe from 'stripe';

// Creates a stripe component.
const myStripe = stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Processes the payment request (/payment/processs).
 */
export const processPayment = catchAsyncErrors(async (req, res, next) => {
    // Creates a stripe payment intent.
    const paymentIntent = await myStripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',

        metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    });
})

/**
 * Sends stripe API key to the front end(/stripeapikey).
 */
export const sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
    console.log("here1");

    // Creates a stripe payment intent.
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_PUBLISHABLE_KEY
    });
})

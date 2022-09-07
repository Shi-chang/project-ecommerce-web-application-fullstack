import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import catchAsyncError from '../middlewares/catchAsyncErrors.js';

dotenv.config();
const router = express.Router();
const stripe = Stripe(`${process.env.STRIPE_SECRET_KEY}`);

/**
 * Creates a tax rate, which is to be used for all the products in this project.
 */
const taxRate = await stripe.taxRates.create({
    display_name: 'Sales Tax',
    inclusive: false,
    percentage: 7.25
});

/**
 * The router that handles the checkout process.
 * 
 * The following code is constructed with reference to the official documentation of Stripe.The 
 * citation information is as follows:
 * Title: <Stripe>
 * Author: <Stripe>
 * Date: <N.A.>
 * Code version: <"stripe": "^10.7.0">
 * Availability: <https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=checkout>
 */
router.post('/create-checkout-session', async (req, res) => {
    // Retrive the user ID and cart info from the request.
    const userId = req.body.userId;
    const cartInfo = req.body.cartItems.map(item => {
        return {
            productId: item.product,
            price: item.price,
            quantity: item.quantity
        }
    });

    // Stores the user ID and cart information as the metadata in the customer object.
    const customer = await stripe.customers.create({
        metadata: {
            userId,
            cartInfo: JSON.stringify(cartInfo)
        }
    });

    const line_items = req.body.cartItems.map(item => {
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.image],
                    metadata: {
                        id: item.id
                    }
                },
                unit_amount: item.price * 100,
                tax_behavior: "exclusive",
            },
            quantity: item.quantity
        }
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: {
            allowed_countries: ['US', 'CA'],
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 0,
                        currency: 'usd',
                    },
                    display_name: 'Free shipping',
                    // Delivers between 5-7 business days.
                    delivery_estimate: {
                        minimum: {
                            unit: 'business_day',
                            value: 5,
                        },
                        maximum: {
                            unit: 'business_day',
                            value: 7,
                        },
                    },
                    tax_behavior: "exclusive"
                }
            },
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 1500,
                        currency: 'usd',
                    },
                    display_name: 'Next day air',
                    // Delivers in exactly 1 business day.
                    delivery_estimate: {
                        minimum: {
                            unit: 'business_day',
                            value: 1,
                        },
                        maximum: {
                            unit: 'business_day',
                            value: 1,
                        },
                    },
                    tax_behavior: "exclusive"
                }
            },
        ],
        customer_update: {
            shipping: "auto"
        },
        phone_number_collection: {
            enabled: true
        },
        customer: customer.id,
        line_items,
        automatic_tax: {
            enabled: true
        },
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.send({ url: session.url });
});

// Stripe CLI webhook secret for testing the endpoint locally.
const endpointSecret = `${process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET}`;

/**
 * Stripe webhook. Since the verification process expects the raw request, it is necessary to
 * ensure that the request is not subject to express.json() or bodyParser before the signature
 * check. This is accomplished in "backend/app.js".
 * 
 * The following code is constructed with reference to the official documentation of Stripe.The 
 * citation information is as follows:
 * Title: <Stripe>
 * Author: <Stripe>
 * Date: <N.A.>
 * Code version: <"stripe": "^10.7.0">
 * Availability: <https://stripe.com/docs/webhooks#webhook-endpoint-code>
 */
router.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
    // Verifies that the event comes from Stripe.
    const sig = request.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Gets the information from the event.
    const data = event.data.object;
    const eventType = event.type;

    // Handles the event.
    switch (event.type) {
        // This happens when a checkout session is complete.
        case 'checkout.session.completed':
        // This happens when a payment intent using a delayed payment method succeeds.
        case 'checkout.session.async_payment_succeeded':
            stripe.customers.retrieve(data.customer).
                then(customer => {
                    console.log("customer", customer);
                    console.log("data: ", data);
                }).catch(error => console.log(error.message));
    }
    response.send().end();
});

export default router;

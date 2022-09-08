import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import catchAsyncError from '../middlewares/catchAsyncError.js';
import { createOrder } from '../controller/orderController.js';
import Product from '../models/product.js';

dotenv.config();
const router = express.Router();
const stripe = Stripe(`${process.env.STRIPE_SECRET_KEY}`);

/**
 * The router that handles the checkout process. Only accepts the user ID, product IDs, quantities, 
 * and image of the products in the shopping cart from the front end request. The price information
 * for the products comes directly from the server to avoid malicious price manipulations.
 */
router.post('/create-checkout-session', catchAsyncError(async (req, res, next) => {
    // Retrives the user ID and cart info from the request.
    const userId = req.body.userId;
    const cartInfo = req.body.cartInfo;
    // const line_items = [];

    const line_items = await Promise.all(cartInfo.map(async item => {
        const product = await Product.findById(item.productId);
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product.name,
                    images: [item.image],
                    metadata: {
                        productId: item.productId
                    }
                },
                unit_amount: product.price * 100,
                tax_behavior: "exclusive",
            },
            quantity: item.quantity
        }
    }));

    // for (const element of cartInfo) {
    //     const product = await Product.findById(element.productId);
    //     line_items.push({
    //         price_data: {
    //             currency: 'usd',
    //             product_data: {
    //                 name: product.name,
    //                 images: [element.image],
    //                 metadata: {
    //                     productId: element.productId
    //                 }
    //             },
    //             unit_amount: product.price * 100,
    //             tax_behavior: "exclusive",
    //         },
    //         quantity: element.quantity
    //     });
    // }

    // Stores the user ID int the metadata of the customer object created for the stripe session.
    const customer = await stripe.customers.create({
        metadata: {
            userId
        }
    });

    // Creates a checkout session for the front end.
    const session = await stripe.checkout.sessions.create({
        line_items,
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
        automatic_tax: {
            enabled: true
        },
        phone_number_collection: {
            enabled: true
        },
        customer: customer.id,
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
    // Sends a session url to the frontend.
    res.send({ url: session.url });
}));

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
router.post('/webhook', express.raw({ type: 'application/json' }), catchAsyncError(async (req, res) => {
    // Verifies that the event comes from Stripe.
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Gets the data from the event.
    const eventData = event.data.object;

    // If the payment succeeds, retrieves the checkout session from Stripe, and creates
    // a new order based on the data from the retrieved checkout session.
    switch (event.type) {
        // This happens when a checkout session is complete.
        case 'checkout.session.completed':
        // This happens when a payment intent using a delayed payment method succeeds.
        case 'checkout.session.async_payment_succeeded':
            const session = await stripe.checkout.sessions.retrieve(eventData.id, {
                // The line items purchased by the customer is not included by default.
                // Expand the line_items field to include it in the response.
                expand: ['line_items', 'customer']
            });
            const orderData = await retrieveData(session);
            createOrder(orderData);
    }
    // res.send().end();
    res.json({ received: true });
}));

// Gets the data necessary for the new order.
const retrieveData = async (session) => {
    const userId = session.customer.metadata.userId;

    const orderItems = await Promise.all(session.line_items.data.map(async item => {
        // Retrieves the product object from Stripe and gets its productId(ID in the local 
        // database) and image.
        let product = await stripe.products.retrieve(item.price.product);
        const productId = product.metadata.productId;
        const image = product.images[0];

        return {
            productId,
            image,
            name: item.description,
            quantity: item.quantity,
            price: item.price.unit_amount
        };
    }));

    const subtotalPrice = session.amount_subtotal;
    const taxPrice = session.total_details.amount_tax;
    const shippingPrice = session.total_details.amount_shipping;
    const totalPrice = session.amount_total;

    const email = session.customer_details.email;
    const name = session.customer_details.name;
    const country = session.customer_details.address.country;
    const city = session.customer_details.address.city;
    const address = session.customer_details.address.line2 ?
        session.customer_details.address.line1 + session.customer_details.address.line2
        : session.customer_details.address.line1;
    const postCode = session.customer_details.address.postal_code;
    const phoneNumber = session.customer_details.phone;

    const shippingInfo = {
        email, name, country, city, address, postCode, phoneNumber
    }

    const id = session.id;
    const status = session.payment_status;
    const paymentInfo = {
        id, status
    }

    return {
        userId, orderItems, subtotalPrice, taxPrice, shippingPrice, totalPrice, shippingInfo, paymentInfo
    }
}

export default router;

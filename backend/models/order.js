import mongoose from "mongoose";

// The order schema includes user, shipping information, order items, payment information,
// payment time, item price, tax price, shipping price, total price, order status, delivery time
// and order created time.
const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    orderItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product"
            },
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    subtotalPrice: {
        type: Number,
        required: true
    },
    taxPrice: {
        type: Number,
        required: true
    },
    shippingPrice: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    shippingInfo: {
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        postCode: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        }
    },
    paymentInfo: {
        id: {
            type: String
        },
        status: {
            type: String
        }
    },
    paidAt: {
        type: Date,
        default: Date.now
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing"
    },
    deliveredAt: {
        type: Date
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;

import Order from '../models/order.js';
import Product from '../models/product.js';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';

// Create a new order =>  /api/v1/order/create
export const createOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(200).json({
        success: true,
        order
    });
});

// Get a single order => /api/v1/order/:id
export const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler("Cannot find order with this id", 404));
    }

    res.status(200).json({
        success: true,
        order
    });
});

// Get orders from a logged in user => /api/v1/orders/me
export const getMyOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id });

    if (!orders) {
        return next(new ErrorHandler("This user has no any order.", 404));
    }

    res.status(200).json({
        success: true,
        orders
    });
});

// Get all orders from all users by the admin => /api/v1/admin/orders
export const getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order => totalAmount += order.totalPrice);

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});

// Update and process order => /api/v1/admin/order/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler("This order has already been delivered.", 400));
    }

    order.orderItems.forEach(async item => await updateStock(item.product, item.quantity));
    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    });
});

// Update the stock
const updateStock = async (id, quantity) => {
    const product = await Product.findById(id);
    product.stock -= quantity;

    await product.save({ validateBeforeSave: false });
};

// Delete order => /api/v1/admin/order/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler('Order not found.', 400));
    }

    await order.remove();

    res.status(200).json({
        success: true,
        order
    });
});

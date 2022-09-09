import Order from '../models/order.js';
import Product from '../models/product.js';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncError from '../middlewares/catchAsyncError.js';


// This order controller constroles the CRUD operations of orders.

// Creates a new order when the payment is successful.
export const createOrder = async (orderData) => {
    const order = await Order.create(orderData);
}

// Gets a single order based on order ID (/order/:id).
export const getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("Cannot find order with this id", 404));
    }

    res.status(200).json({
        success: true,
        order
    });
});

// Gets orders of a logged in user (/orders/me).
export const getMyOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id });
    if (!orders) {
        return next(new ErrorHandler("This user has no any order.", 404));
    }

    res.status(200).json({
        success: true,
        orders
    });
});

// Gets all orders from all users by the admin (/admin/orders).
export const getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach(order => totalAmount += order.totalPrice);
    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});

// Updates and processes order (/admin/order/:id).
export const updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    // If the order is already delivered, then the order cannot be updated.
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

// Updates the stock of a product by the admin (/admin/order/:id).
const updateStock = async (id, quantity) => {
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
};

// Deletes an order by the admin (/admin/order/:id).
export const deleteOrder = catchAsyncError(async (req, res, next) => {
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

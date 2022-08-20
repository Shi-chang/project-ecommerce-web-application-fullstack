import express from 'express';
import { isAuthenticatedUser, authorizedRoles } from '../middlewares/auth.js';
import {
    createOrder,
    getSingleOrder,
    getMyOrders,
    getAllOrders,
    updateOrder,
    deleteOrder
} from '../controller/orderController.js';

const router = express.Router();

router.route('/order/create').post(isAuthenticatedUser, createOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, getMyOrders);
router.route('/admin/orders').get(isAuthenticatedUser, authorizedRoles('admin'), getAllOrders);
router.route('/admin/order/:id')
    .put(isAuthenticatedUser, authorizedRoles('admin'), updateOrder)
    .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteOrder);

export default router;
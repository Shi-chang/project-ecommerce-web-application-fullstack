import express from "express";
import {
    getProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createReview,
    getReviews,
    deleteReview
} from "../controller/productController.js";
import { isAuthenticatedUser, authorizedRoles } from "../middlewares/authentication.js";

// Different routes for product related operations.
const router = express.Router();
router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/admin/product/create').post(isAuthenticatedUser, authorizedRoles('admin'), createProduct);
router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizedRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteProduct);
router.route('/review')
    .put(isAuthenticatedUser, createReview)
    .delete(isAuthenticatedUser, deleteReview);
router.route('/reviews').get(getReviews);

export default router;

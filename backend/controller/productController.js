import Product from '../models/product.js';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import APIFeatures from '../utils/apiFeatures.js';

// get all products => /api/v1/products
export const getProducts = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage);

    const products = await apiFeatures.query;

    setTimeout(() => (
        res.status(200).json({
            success: true,
            productsCount,
            resPerPage,
            products
        })), 500);
})

// get a single product => /api/v1/product/:id
export const getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found.", 404));
    }

    res.status(200).json({
        success: true,
        product: product
    });
})

// create a new product => /api/v1/admin/product/create
export const createProduct = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        data: product
    });
})

// update a product => /api/v1/admin/product/:id
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findByIdAndUpdate(req.params.id);

    if (!product) {
        // return res.status(404).json({
        //     success: false,
        //     message: "Product not found."
        // });
        return next(new ErrorHandler("Product not found.", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true
    });

    res.status(200).json({
        success: true,
        data: product
    });
});

// Delete a product => /api/v1/admin/product/:id
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findByIdAndUpdate(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found.", 404));
    }

    await Product.findByIdAndRemove(req.params.id);

    res.status(200).json({
        success: true,
        message: "Product deleted.",
    });
});

// Create or update a product review => /api/v1/review
export const createReview = catchAsyncErrors(async (req, res, next) => {
    const { productId, rating, comment } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment: comment
    }

    const product = await Product.findById(productId);

    // Check if the user has already reviewed the product before.
    // If so, update the review; otherwise, add the review
    const previousReview = product.reviews.find(review => review.user.toString() === req.user._id.toString());

    if (previousReview) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        });
    } else {
        product.reviews.push(review);
        product.numberOfReviews += 1;
    }

    product.ratings = product.reviews.reduce((accumulator, currentReview) => currentReview.rating + accumulator, 0) / product.numberOfReviews;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    });
});

// Get all reviews of a product => /api/v1/reviews
export const getReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});

// Delete a product review => /api/v1/review
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.reviewId.toString());

    product.reviews = reviews;

    product.numberOfReviews -= 1;
    if (reviews.length === 0) {
        product.ratings = 0;
    } else {
        product.ratings = product.reviews.reduce((accumulator, currentReview) => currentReview.rating + accumulator, 0) / product.numberOfReviews;
    }

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Product review deleted successfully."
    });
});

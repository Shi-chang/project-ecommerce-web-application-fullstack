import Product from '../models/product.js';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import APIFeatures from '../utils/apiFeatures.js';

// This product controller controles the CRUD operations of products.

// Gets all products (/products).
export const getProducts = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 8;
    const productsCount = await Product.countDocuments();
    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()

    const products = await apiFeatures.query;
    const filteredProductsCount = products.length;
    apiFeatures.pagination(resPerPage);
    products = await apiFeatures.query.clone();

    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        products
    });
})

// Gets a single product (/product/:id).
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

// Creates a new product (/admin/product/create).
export const createProduct = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        data: product
    });
})

// Updates a product (/admin/product/:id).
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findByIdAndUpdate(req.params.id);
    if (!product) {
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

// Deletes a product (/admin/product/:id).
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

// Creates or updates a product review (/review)
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
    // If so, update the review; otherwise, add the review.
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

// Gets all reviews of a product => (/reviews)
export const getReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});

// Deletes a product review (/review)
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    // Deletes the review.
    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.reviewId.toString());
    product.reviews = reviews;

    // Update ratings of the product accordingly.
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

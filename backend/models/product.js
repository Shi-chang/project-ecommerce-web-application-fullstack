import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required."],
        maxLength: [200, "Max length for product name is 200 characters."],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Price is required."],
        maxLength: [5, "Max price is 99,999."],
        default: 0.0
    },
    description: {
        type: String,
        maxLength: [1000, "Description for product description is 1000 characters."],
        required: [true, "Description is required."],
    },
    category: {
        type: String,
        required: [true, "Category is required."],
        enum: {
            values: [
                'Books',
                'Video Games',
                'Electronics & Computers',
                'Movies, TV Shows & Music',
                'Clothing & Shoes',
                'Sports & Outdoors',
                'Food & Drinks',
                'Toys & Kids'
            ],
            message: "Please select a correct category for your product."
        }
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    seller: {
        type: String,
        required: [true, "Seller information is required."],
    },
    stock: {
        type: Number,
        required: [true, "Product stock is required."],
        default: 0,
        maxLength: [5, "Max stock number is 99,999."]
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    ratings: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
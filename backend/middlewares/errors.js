import ErrorHandler from "../utils/ErrorHandler.js";

const errorMiddleWare = (err, req, res, next) => {
    // console.dir(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    // set up error response when in development mode
    if (process.env.NODE_ENV === "DEVELOPMENT") {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        });
    }

    // set up error response when in production mode
    if (process.env.NODE_ENV === "PRODUCTION") {
        let error = { ...err };
        error.message = err.message;

        // Handle invalid mongoose object id errors
        if (err.name === 'CastError') {
            const message = `Product not found. Invalid ${err.path}`;
            error = new ErrorHandler(message, 400);
        }

        // Handle mongoose validation errors
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400);
        }

        // Handle mongoose duplicate key error
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)}.`;
            error = new ErrorHandler(message, 400);
        }

        // Handle invalid JWT error
        if (err.name === 'JsonWebTokenError') {
            const message = "Invalid JWT."
            error = new ErrorHandler(message, 400);
        }

        // Handle expired JWT error
        if (err.name === 'TokenExpiredError') {
            const message = "JWT expired."
            error = new ErrorHandler(message, 400);
        }

        res.status(err.statusCode).json({
            success: false,
            message: error.message
        });
    }
}

export default errorMiddleWare;

import ErrorHandler from "../utils/errorHandler.js";

// This function component is an error-handling middleware that handles server response 
// to errors. It sends useful information concerning the error to the front end, based 
// on which mode the current process is running on.
const errorMiddleWare = (err, req, res, next) => {
    // Sets generic error status code and message
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Sets error responses when in development mode.
    if (process.env.NODE_ENV === "DEVELOPMENT") {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        });
        console.log(err.stack);
        console.log("\n");
    }

    // Sets up error response when in production mode.
    if (process.env.NODE_ENV === "PRODUCTION") {
        // Handles invalid mongoose object id errors
        if (err.name === 'CastError') {
            const message = `Product not found. Invalid ${err.path}`;
            err.message = new ErrorHandler(message, 400);
        }

        // Handles mongoose validation errors.
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            err.message = new ErrorHandler(message, 400);
        }

        // Handles mongoose duplicate key error.
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)}.`;
            err.message = new ErrorHandler(message, 400);
        }

        // Handles invalid JWT error.
        if (err.name === 'JsonWebTokenError') {
            const message = "Invalid JWT."
            err.message = new ErrorHandler(message, 400);
        }

        // Handles expired JWT error.
        if (err.name === 'TokenExpiredError') {
            const message = "JWT expired."
            err.message = new ErrorHandler(message, 400);
        }
        res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }
}

export default errorMiddleWare;

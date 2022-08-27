// This class takes in an error message and status code as parameters and has the .stack 
// property to keep track of the error.

class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler;
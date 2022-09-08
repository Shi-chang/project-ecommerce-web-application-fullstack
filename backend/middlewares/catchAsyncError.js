// This function component is a middleware that catches async errors. The catched error, 
// if any, will be passed to the next() function and will be passed to express eventually.
const catchAsyncError = (func) => (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch(next);
}

export default catchAsyncError;
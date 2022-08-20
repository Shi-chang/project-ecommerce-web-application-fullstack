export default func => (req, res, next) => {
    Promise.resolve(func(req, res, next))
        .catch(next);
}

// const catchAsyncErrors = (func) => (req, res, next) => {
//     Promise.resolve(func(req, res, next))
//         .catch(next);
// }

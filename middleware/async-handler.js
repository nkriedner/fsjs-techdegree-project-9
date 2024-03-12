// Hanlder function to wrap each route
exports.asyncHandler = (cb) => {
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (err) {
            // Forward error to the globacl error handler
            next(err);
        }
    };
};

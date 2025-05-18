const CustomError = require('../errors/customError');

const tryCatchWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            console.error(error);
            next(new CustomError(error?.message));
        }
    };
};

module.exports = {
    tryCatchWrapper
}
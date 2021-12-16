const CustomError = require('./customError');

class UnauthenticatedRequestError extends CustomError {
    constructor(message) {
        super(message || 'Unauthenticated');
        this.statusCode = 403;
    }
}

module.exports = UnauthenticatedRequestError;
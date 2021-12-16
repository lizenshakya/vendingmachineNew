const CustomError = require('./customError');

class UnauthorizedRequestError extends CustomError {
    constructor(message) {
        super(message || 'Unauthorized');
        this.statusCode = 500;
    }
}

module.exports = UnauthorizedRequestError;
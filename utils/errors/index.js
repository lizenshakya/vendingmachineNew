const CustomError = require('./customError');
const BadRequestError = require('./badRequest');
const NotFoundError = require('./notFound');
const UnauthenticatedRequestError = require('./unAuthenticated');
const UnauthorizedRequestError = require('./unAuthorized');

module.exports = {
    CustomError,
    BadRequestError,
    NotFoundError,
    UnauthenticatedRequestError,
    UnauthorizedRequestError
}
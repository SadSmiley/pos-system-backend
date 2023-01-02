"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = exports.AppError = void 0;
// centralized error object that derives from Node’s Error
class AppError extends Error {
    name;
    httpCode;
    isOperational;
    constructor(httpCode, description, isOperational) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
        // create hashmap of error names use http code as key
        const errorNames = {
            400: 'BadRequest',
            401: 'Unauthorized',
            403: 'Forbidden',
            404: 'NotFound',
            500: 'InternalServerError',
        };
        this.httpCode = httpCode;
        this.name = errorNames[httpCode];
        this.isOperational = isOperational;
    }
}
exports.AppError = AppError;
class ErrorHandler {
    static async handleError(error, responseStream) {
        // TODO: log error
    }
    ;
}
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=classes.js.map
import { HttpErrorCode } from './enums';

// centralized error object that derives from Node’s Error
export class AppError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpErrorCode;
    public readonly isOperational: boolean;

    constructor(httpCode: HttpErrorCode, description: string, isOperational: boolean) {
        super(description);

        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

        // create hashmap of error names use http code as key
        const errorNames: { [key: number]: string } = {
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

export class ErrorHandler {
    public static async handleError(error: Error, responseStream: Response): Promise<void> {
        // TODO: log error
    };
}
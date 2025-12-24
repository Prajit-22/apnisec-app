import { BaseError } from './BaseError';

export class AuthenticationError extends BaseError {
    constructor(message: string = 'Authentication failed') {
        super(message, 401);
    }
}

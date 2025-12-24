import { BaseError } from './BaseError';

export class ValidationError extends BaseError {
    constructor(message: string = 'Validation failed') {
        super(message, 400);
    }
}

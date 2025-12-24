import { BaseError } from './BaseError';

export class RateLimitError extends BaseError {
    constructor(message: string = 'Too many requests') {
        super(message, 429);
    }
}

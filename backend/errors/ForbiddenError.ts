import { BaseError } from './BaseError';

export class ForbiddenError extends BaseError {
    constructor(message: string = 'Access forbidden') {
        super(message, 403);
    }
}

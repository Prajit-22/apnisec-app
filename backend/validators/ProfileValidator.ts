import { ValidationError } from '../errors';

export class ProfileValidator {
    /**
     * Validate profile update data
     */
    public validateUpdate(data: any): void {
        if (data.name !== undefined) {
            if (typeof data.name !== 'string') {
                throw new ValidationError('Name must be a string');
            }

            if (data.name.trim().length < 2) {
                throw new ValidationError('Name must be at least 2 characters long');
            }
        }

        if (data.email !== undefined) {
            if (typeof data.email !== 'string') {
                throw new ValidationError('Email must be a string');
            }

            if (!this.isValidEmail(data.email)) {
                throw new ValidationError('Invalid email format');
            }
        }
    }

    /**
     * Check if email format is valid
     */
    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

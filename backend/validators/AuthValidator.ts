import { ValidationError } from '../errors';

export class AuthValidator {
    /**
     * Validate registration data
     */
    public validateRegister(data: any): void {
        if (!data.email || typeof data.email !== 'string') {
            throw new ValidationError('Valid email is required');
        }

        if (!this.isValidEmail(data.email)) {
            throw new ValidationError('Invalid email format');
        }

        if (!data.password || typeof data.password !== 'string') {
            throw new ValidationError('Password is required');
        }

        if (data.password.length < 8) {
            throw new ValidationError('Password must be at least 8 characters long');
        }

        if (!this.isStrongPassword(data.password)) {
            throw new ValidationError(
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            );
        }

        if (!data.name || typeof data.name !== 'string') {
            throw new ValidationError('Name is required');
        }

        if (data.name.trim().length < 2) {
            throw new ValidationError('Name must be at least 2 characters long');
        }
    }

    /**
     * Validate login data
     */
    public validateLogin(data: any): void {
        if (!data.email || typeof data.email !== 'string') {
            throw new ValidationError('Email is required');
        }

        if (!this.isValidEmail(data.email)) {
            throw new ValidationError('Invalid email format');
        }

        if (!data.password || typeof data.password !== 'string') {
            throw new ValidationError('Password is required');
        }
    }

    /**
     * Check if email format is valid
     */
    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Check if password is strong
     */
    private isStrongPassword(password: string): boolean {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    }
}

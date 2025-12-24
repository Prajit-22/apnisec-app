import { ValidationError } from '../errors';
import { IssueType, IssueStatus } from '../types/enums';

export class IssueValidator {
    /**
     * Validate issue creation data
     */
    public validateCreate(data: any): void {
        if (!data.title || typeof data.title !== 'string') {
            throw new ValidationError('Title is required');
        }

        if (data.title.trim().length < 3) {
            throw new ValidationError('Title must be at least 3 characters long');
        }

        if (data.title.length > 200) {
            throw new ValidationError('Title must not exceed 200 characters');
        }

        if (!data.description || typeof data.description !== 'string') {
            throw new ValidationError('Description is required');
        }

        if (data.description.trim().length < 10) {
            throw new ValidationError('Description must be at least 10 characters long');
        }

        if (!data.type || typeof data.type !== 'string') {
            throw new ValidationError('Issue type is required');
        }

        if (!this.isValidIssueType(data.type)) {
            throw new ValidationError(
                `Invalid issue type. Must be one of: ${Object.values(IssueType).join(', ')}`
            );
        }
    }

    /**
     * Validate issue update data
     */
    public validateUpdate(data: any): void {
        if (data.title !== undefined) {
            if (typeof data.title !== 'string') {
                throw new ValidationError('Title must be a string');
            }

            if (data.title.trim().length < 3) {
                throw new ValidationError('Title must be at least 3 characters long');
            }

            if (data.title.length > 200) {
                throw new ValidationError('Title must not exceed 200 characters');
            }
        }

        if (data.description !== undefined) {
            if (typeof data.description !== 'string') {
                throw new ValidationError('Description must be a string');
            }

            if (data.description.trim().length < 10) {
                throw new ValidationError('Description must be at least 10 characters long');
            }
        }

        if (data.type !== undefined && !this.isValidIssueType(data.type)) {
            throw new ValidationError(
                `Invalid issue type. Must be one of: ${Object.values(IssueType).join(', ')}`
            );
        }

        if (data.status !== undefined && !this.isValidIssueStatus(data.status)) {
            throw new ValidationError(
                `Invalid issue status. Must be one of: ${Object.values(IssueStatus).join(', ')}`
            );
        }
    }

    /**
     * Check if issue type is valid
     */
    private isValidIssueType(type: string): boolean {
        return Object.values(IssueType).includes(type as IssueType);
    }

    /**
     * Check if issue status is valid
     */
    private isValidIssueStatus(status: string): boolean {
        return Object.values(IssueStatus).includes(status as IssueStatus);
    }
}

import { NextRequest, NextResponse } from 'next/server';
import { BaseHandler } from './base/BaseHandler';
import { ProfileService } from '../services/ProfileService';
import { ProfileValidator } from '../validators/ProfileValidator';

export class ProfileHandler extends BaseHandler {
    private readonly profileService: ProfileService;
    private readonly validator: ProfileValidator;

    constructor(profileService: ProfileService, validator: ProfileValidator) {
        super();
        this.profileService = profileService;
        this.validator = validator;
    }

    /**
     * Handle get profile
     */
    public async handleGetProfile(userId: string): Promise<NextResponse> {
        try {
            const profile = await this.profileService.getProfile(userId);
            return this.sendSuccess(profile);
        } catch (error) {
            return this.handleError(error);
        }
    }

    /**
     * Handle update profile
     */
    public async handleUpdateProfile(userId: string, request: NextRequest): Promise<NextResponse> {
        try {
            const body = await this.getRequestBody(request);

            // Validate input
            this.validator.validateUpdate(body);

            // Update profile
            const profile = await this.profileService.updateProfile(userId, body);
            return this.sendSuccess(profile);
        } catch (error) {
            return this.handleError(error);
        }
    }
}

import { NextRequest } from 'next/server';
import { ProfileHandler } from '@/backend/handlers/ProfileHandler';
import { ProfileService } from '@/backend/services/ProfileService';
import { UserRepository } from '@/backend/repositories/UserRepository';
import { ProfileValidator } from '@/backend/validators/ProfileValidator';
import { AuthMiddleware } from '@/backend/middleware/AuthMiddleware';
import { JWTUtil } from '@/backend/utils/JWTUtil';
import { prisma } from '@/lib/prisma';

// Initialize dependencies
const userRepository = new UserRepository(prisma);
const profileService = new ProfileService(userRepository);
const profileValidator = new ProfileValidator();
const profileHandler = new ProfileHandler(profileService, profileValidator);
const jwtUtil = new JWTUtil();
const authMiddleware = new AuthMiddleware(jwtUtil);

export async function GET(request: NextRequest) {
    try {
        // Authenticate user
        const userId = authMiddleware.authenticate(request);

        // Get profile
        return profileHandler.handleGetProfile(userId);
    } catch (error: any) {
        return new Response(
            JSON.stringify({
                success: false,
                error: {
                    message: error.message || 'Request failed',
                    statusCode: error.statusCode || 500,
                },
            }),
            {
                status: error.statusCode || 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        // Authenticate user
        const userId = authMiddleware.authenticate(request);

        // Update profile
        return profileHandler.handleUpdateProfile(userId, request);
    } catch (error: any) {
        return new Response(
            JSON.stringify({
                success: false,
                error: {
                    message: error.message || 'Request failed',
                    statusCode: error.statusCode || 500,
                },
            }),
            {
                status: error.statusCode || 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}

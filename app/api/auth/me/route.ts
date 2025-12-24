import { NextRequest } from 'next/server';
import { AuthHandler } from '@/backend/handlers/AuthHandler';
import { AuthService } from '@/backend/services/AuthService';
import { UserRepository } from '@/backend/repositories/UserRepository';
import { EmailService } from '@/backend/services/EmailService';
import { AuthValidator } from '@/backend/validators/AuthValidator';
import { AuthMiddleware } from '@/backend/middleware/AuthMiddleware';
import { HashUtil } from '@/backend/utils/HashUtil';
import { JWTUtil } from '@/backend/utils/JWTUtil';
import { prisma } from '@/lib/prisma';

// Initialize dependencies
const userRepository = new UserRepository(prisma);
const hashUtil = new HashUtil();
const jwtUtil = new JWTUtil();
const emailService = new EmailService();
const authService = new AuthService(userRepository, hashUtil, jwtUtil, emailService);
const authValidator = new AuthValidator();
const authHandler = new AuthHandler(authService, authValidator);
const authMiddleware = new AuthMiddleware(jwtUtil);

export async function GET(request: NextRequest) {
    try {
        // Authenticate user
        const userId = authMiddleware.authenticate(request);

        // Get current user
        return authHandler.handleGetCurrentUser(userId);
    } catch (error: any) {
        return new Response(
            JSON.stringify({
                success: false,
                error: {
                    message: error.message || 'Authentication failed',
                    statusCode: error.statusCode || 401,
                },
            }),
            {
                status: error.statusCode || 401,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}

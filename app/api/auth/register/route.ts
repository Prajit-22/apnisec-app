import { NextRequest } from 'next/server';
import { AuthHandler } from '@/backend/handlers/AuthHandler';
import { AuthService } from '@/backend/services/AuthService';
import { UserRepository } from '@/backend/repositories/UserRepository';
import { EmailService } from '@/backend/services/EmailService';
import { AuthValidator } from '@/backend/validators/AuthValidator';
import { HashUtil } from '@/backend/utils/HashUtil';
import { JWTUtil } from '@/backend/utils/JWTUtil';
import { RateLimiter } from '@/backend/utils/RateLimiter';
import { prisma } from '@/lib/prisma';

// Initialize dependencies
const userRepository = new UserRepository(prisma);
const hashUtil = new HashUtil();
const jwtUtil = new JWTUtil();
const emailService = new EmailService();
const authService = new AuthService(userRepository, hashUtil, jwtUtil, emailService);
const authValidator = new AuthValidator();
const authHandler = new AuthHandler(authService, authValidator);
const rateLimiter = new RateLimiter(prisma);

export async function POST(request: NextRequest) {
    // Apply rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rateLimitResult = await rateLimiter.checkLimit(`register:${ip}`);

    if (!rateLimitResult.allowed) {
        return new Response(
            JSON.stringify({
                success: false,
                error: {
                    message: 'Too many requests. Please try again later.',
                    statusCode: 429,
                },
            }),
            {
                status: 429,
                headers: {
                    'Content-Type': 'application/json',
                    ...rateLimiter.getRateLimitHeaders(rateLimitResult),
                },
            }
        );
    }

    const response = await authHandler.handleRegister(request);

    // Add rate limit headers
    const headers = rateLimiter.getRateLimitHeaders(rateLimitResult);
    Object.entries(headers).forEach(([key, value]) => {
        response.headers.set(key, value);
    });

    return response;
}

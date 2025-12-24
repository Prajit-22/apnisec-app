import { NextRequest } from 'next/server';
import { IssueHandler } from '@/backend/handlers/IssueHandler';
import { IssueService } from '@/backend/services/IssueService';
import { IssueRepository } from '@/backend/repositories/IssueRepository';
import { UserRepository } from '@/backend/repositories/UserRepository';
import { EmailService } from '@/backend/services/EmailService';
import { IssueValidator } from '@/backend/validators/IssueValidator';
import { AuthMiddleware } from '@/backend/middleware/AuthMiddleware';
import { JWTUtil } from '@/backend/utils/JWTUtil';
import { RateLimiter } from '@/backend/utils/RateLimiter';
import { prisma } from '@/lib/prisma';

// Initialize dependencies
const issueRepository = new IssueRepository(prisma);
const userRepository = new UserRepository(prisma);
const emailService = new EmailService();
const issueService = new IssueService(issueRepository, userRepository, emailService);
const issueValidator = new IssueValidator();
const issueHandler = new IssueHandler(issueService, issueValidator);
const jwtUtil = new JWTUtil();
const authMiddleware = new AuthMiddleware(jwtUtil);
const rateLimiter = new RateLimiter(prisma);

async function applyRateLimit(request: NextRequest, userId: string) {
    const rateLimitResult = await rateLimiter.checkLimit(`issues:${userId}`);

    if (!rateLimitResult.allowed) {
        return {
            allowed: false,
            response: new Response(
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
            ),
        };
    }

    return { allowed: true, headers: rateLimiter.getRateLimitHeaders(rateLimitResult) };
}

export async function GET(request: NextRequest) {
    try {
        // Authenticate user
        const userId = authMiddleware.authenticate(request);

        // Apply rate limiting
        const rateLimit = await applyRateLimit(request, userId);
        if (!rateLimit.allowed) return rateLimit.response;

        // Get issues
        const response = await issueHandler.handleGetIssues(request, userId);

        // Add rate limit headers
        Object.entries(rateLimit.headers!).forEach(([key, value]) => {
            response.headers.set(key, value);
        });

        return response;
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

export async function POST(request: NextRequest) {
    try {
        // Authenticate user
        const userId = authMiddleware.authenticate(request);

        // Apply rate limiting
        const rateLimit = await applyRateLimit(request, userId);
        if (!rateLimit.allowed) return rateLimit.response;

        // Create issue
        const response = await issueHandler.handleCreateIssue(request, userId);

        // Add rate limit headers
        Object.entries(rateLimit.headers!).forEach(([key, value]) => {
            response.headers.set(key, value);
        });

        return response;
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

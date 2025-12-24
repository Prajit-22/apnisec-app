import { NextRequest } from 'next/server';
import { IssueHandler } from '@/backend/handlers/IssueHandler';
import { IssueService } from '@/backend/services/IssueService';
import { IssueRepository } from '@/backend/repositories/IssueRepository';
import { UserRepository } from '@/backend/repositories/UserRepository';
import { EmailService } from '@/backend/services/EmailService';
import { IssueValidator } from '@/backend/validators/IssueValidator';
import { AuthMiddleware } from '@/backend/middleware/AuthMiddleware';
import { JWTUtil } from '@/backend/utils/JWTUtil';
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

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Authenticate user
        const userId = authMiddleware.authenticate(request);

        // Await params
        const { id } = await params;

        // Get issue
        return issueHandler.handleGetIssue(id, userId);
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

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Authenticate user
        const userId = authMiddleware.authenticate(request);

        // Await params
        const { id } = await params;

        // Update issue
        return issueHandler.handleUpdateIssue(id, request, userId);
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

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Authenticate user
        const userId = authMiddleware.authenticate(request);

        // Await params
        const { id } = await params;

        // Delete issue
        return issueHandler.handleDeleteIssue(id, userId);
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

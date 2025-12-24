import { NextRequest } from 'next/server';
import { AuthHandler } from '@/backend/handlers/AuthHandler';
import { AuthService } from '@/backend/services/AuthService';
import { UserRepository } from '@/backend/repositories/UserRepository';
import { EmailService } from '@/backend/services/EmailService';
import { AuthValidator } from '@/backend/validators/AuthValidator';
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

export async function POST(request: NextRequest) {
    return authHandler.handleLogout(request);
}

import { NextRequest, NextResponse } from 'next/server';
import { BaseHandler } from './base/BaseHandler';
import { IAuthService } from '../services/interfaces/IAuthService';
import { AuthValidator } from '../validators/AuthValidator';

export class AuthHandler extends BaseHandler {
    private readonly authService: IAuthService;
    private readonly validator: AuthValidator;

    constructor(authService: IAuthService, validator: AuthValidator) {
        super();
        this.authService = authService;
        this.validator = validator;
    }

    /**
     * Handle user registration
     */
    public async handleRegister(request: NextRequest): Promise<NextResponse> {
        try {
            const body = await this.getRequestBody(request);

            // Validate input
            this.validator.validateRegister(body);

            // Register user
            const result = await this.authService.register(body.email, body.password, body.name);

            // Set HTTP-only cookie
            const response = this.sendSuccess(result, 201);
            response.cookies.set('token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: '/',
            });

            return response;
        } catch (error) {
            return this.handleError(error);
        }
    }

    /**
     * Handle user login
     */
    public async handleLogin(request: NextRequest): Promise<NextResponse> {
        try {
            const body = await this.getRequestBody(request);

            // Validate input
            this.validator.validateLogin(body);

            // Login user
            const result = await this.authService.login(body.email, body.password);

            // Set HTTP-only cookie
            const response = this.sendSuccess(result);
            response.cookies.set('token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: '/',
            });

            return response;
        } catch (error) {
            return this.handleError(error);
        }
    }

    /**
     * Handle user logout
     */
    public async handleLogout(request: NextRequest): Promise<NextResponse> {
        try {
            const response = this.sendSuccess({ message: 'Logged out successfully' });
            response.cookies.delete('token');
            return response;
        } catch (error) {
            return this.handleError(error);
        }
    }

    /**
     * Handle get current user
     */
    public async handleGetCurrentUser(userId: string): Promise<NextResponse> {
        try {
            const user = await this.authService.getCurrentUser(userId);
            return this.sendSuccess(user);
        } catch (error) {
            return this.handleError(error);
        }
    }
}

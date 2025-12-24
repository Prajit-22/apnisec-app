import { NextRequest } from 'next/server';
import { JWTUtil } from '../utils/JWTUtil';
import { AuthenticationError } from '../errors';

export class AuthMiddleware {
    private readonly jwtUtil: JWTUtil;

    constructor(jwtUtil: JWTUtil) {
        this.jwtUtil = jwtUtil;
    }

    /**
     * Authenticate request and extract user ID
     */
    public authenticate(request: NextRequest): string {
        // Try to get token from cookie first
        let token = request.cookies.get('token')?.value;

        // If not in cookie, try Authorization header
        if (!token) {
            const authHeader = request.headers.get('authorization');
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }

        if (!token) {
            throw new AuthenticationError('No authentication token provided');
        }

        // Verify token
        const payload = this.jwtUtil.verify(token);
        return payload.userId;
    }
}

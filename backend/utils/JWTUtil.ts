import jwt from 'jsonwebtoken';
import { AuthenticationError } from '../errors';

export interface JWTPayload {
    userId: string;
    email: string;
    iat?: number;
    exp?: number;
}

export class JWTUtil {
    private readonly secret: string;
    private readonly expiresIn: string;

    constructor() {
        this.secret = process.env.JWT_SECRET || 'default-secret-change-in-production';
        this.expiresIn = process.env.JWT_EXPIRES_IN || '7d';
    }

    /**
     * Sign a JWT token with the given payload
     */
    public sign(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
        return jwt.sign(payload, this.secret, {
            expiresIn: this.expiresIn,
        });
    }

    /**
     * Verify and decode a JWT token
     */
    public verify(token: string): JWTPayload {
        try {
            const decoded = jwt.verify(token, this.secret) as JWTPayload;
            return decoded;
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new AuthenticationError('Token has expired');
            }
            if (error instanceof jwt.JsonWebTokenError) {
                throw new AuthenticationError('Invalid token');
            }
            throw new AuthenticationError('Token verification failed');
        }
    }

    /**
     * Decode a JWT token without verification (use with caution)
     */
    public decode(token: string): JWTPayload | null {
        try {
            return jwt.decode(token) as JWTPayload;
        } catch {
            return null;
        }
    }
}

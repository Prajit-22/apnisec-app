import { NextResponse } from 'next/server';
import { BaseError } from '../../errors';

export abstract class BaseHandler {
    /**
     * Handle errors and return appropriate response
     */
    protected handleError(error: unknown): NextResponse {
        console.error('Handler error:', error);

        if (error instanceof BaseError) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        message: error.message,
                        statusCode: error.statusCode,
                    },
                },
                { status: error.statusCode }
            );
        }

        // Unknown error
        return NextResponse.json(
            {
                success: false,
                error: {
                    message: 'Internal server error',
                    statusCode: 500,
                },
            },
            { status: 500 }
        );
    }

    /**
     * Send success response
     */
    protected sendSuccess<T>(data: T, status: number = 200, headers?: Record<string, string>): NextResponse {
        return NextResponse.json(
            {
                success: true,
                data,
            },
            {
                status,
                headers,
            }
        );
    }

    /**
     * Extract JSON body from request
     */
    protected async getRequestBody(request: Request): Promise<any> {
        try {
            return await request.json();
        } catch {
            return {};
        }
    }
}

import { PrismaClient } from '@prisma/client';
import { RateLimitError } from '../errors';

export interface RateLimitResult {
    allowed: boolean;
    limit: number;
    remaining: number;
    reset: Date;
}

export class RateLimiter {
    private readonly prisma: PrismaClient;
    private readonly limit: number;
    private readonly windowMs: number;

    constructor(prisma: PrismaClient, limit: number = 100, windowMs: number = 15 * 60 * 1000) {
        this.prisma = prisma;
        this.limit = limit;
        this.windowMs = windowMs;
    }

    /**
     * Check if the request is within rate limit
     */
    public async checkLimit(identifier: string): Promise<RateLimitResult> {
        const now = new Date();
        const resetAt = new Date(now.getTime() + this.windowMs);

        // Clean up old records
        await this.cleanupOldRecords();

        // Find existing rate limit record
        const existingRecord = await this.prisma.rateLimit.findFirst({
            where: {
                identifier,
                resetAt: {
                    gte: now,
                },
            },
            orderBy: {
                resetAt: 'desc',
            },
        });

        if (existingRecord) {
            if (existingRecord.count >= this.limit) {
                return {
                    allowed: false,
                    limit: this.limit,
                    remaining: 0,
                    reset: existingRecord.resetAt,
                };
            }

            // Increment count
            const updated = await this.prisma.rateLimit.update({
                where: { id: existingRecord.id },
                data: { count: { increment: 1 } },
            });

            return {
                allowed: true,
                limit: this.limit,
                remaining: this.limit - updated.count,
                reset: updated.resetAt,
            };
        }

        // Create new record
        const newRecord = await this.prisma.rateLimit.create({
            data: {
                identifier,
                count: 1,
                resetAt,
            },
        });

        return {
            allowed: true,
            limit: this.limit,
            remaining: this.limit - 1,
            reset: newRecord.resetAt,
        };
    }

    /**
     * Clean up old rate limit records
     */
    private async cleanupOldRecords(): Promise<void> {
        const now = new Date();
        await this.prisma.rateLimit.deleteMany({
            where: {
                resetAt: {
                    lt: now,
                },
            },
        });
    }

    /**
     * Get rate limit headers
     */
    public getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
        return {
            'X-RateLimit-Limit': String(result.limit),
            'X-RateLimit-Remaining': String(result.remaining),
            'X-RateLimit-Reset': String(Math.floor(result.reset.getTime() / 1000)),
        };
    }
}

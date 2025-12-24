import { PrismaClient, Issue } from '@prisma/client';
import { IIssueRepository, CreateIssueData, UpdateIssueData, IssueFilters } from './interfaces/IIssueRepository';

export class IssueRepository implements IIssueRepository {
    private readonly prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async create(data: CreateIssueData): Promise<Issue> {
        return this.prisma.issue.create({
            data: {
                title: data.title,
                description: data.description,
                type: data.type,
                status: data.status || 'OPEN',
                userId: data.userId,
            },
        });
    }

    public async findAll(filters?: IssueFilters): Promise<Issue[]> {
        return this.prisma.issue.findMany({
            where: {
                ...(filters?.type && { type: filters.type }),
                ...(filters?.status && { status: filters.status }),
                ...(filters?.userId && { userId: filters.userId }),
            },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }

    public async findById(id: string): Promise<Issue | null> {
        return this.prisma.issue.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }

    public async findByUserId(userId: string): Promise<Issue[]> {
        return this.prisma.issue.findMany({
            where: { userId },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    public async update(id: string, data: UpdateIssueData): Promise<Issue> {
        return this.prisma.issue.update({
            where: { id },
            data,
        });
    }

    public async delete(id: string): Promise<void> {
        await this.prisma.issue.delete({
            where: { id },
        });
    }
}

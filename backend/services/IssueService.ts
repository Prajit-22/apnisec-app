import { IIssueService } from './interfaces/IIssueService';
import { IIssueRepository } from '../repositories/interfaces/IIssueRepository';
import { IEmailService } from './interfaces/IEmailService';
import { IUserRepository } from '../repositories/interfaces/IUserRepository';
import { IssueDTO, CreateIssueDTO, UpdateIssueDTO, IssueFilterDTO } from '../types/dtos';
import { NotFoundError, ForbiddenError } from '../errors';

export class IssueService implements IIssueService {
    private readonly issueRepository: IIssueRepository;
    private readonly userRepository: IUserRepository;
    private readonly emailService: IEmailService;

    constructor(
        issueRepository: IIssueRepository,
        userRepository: IUserRepository,
        emailService: IEmailService
    ) {
        this.issueRepository = issueRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    /**
     * Create a new issue
     */
    public async createIssue(data: CreateIssueDTO, userId: string): Promise<IssueDTO> {
        const issue = await this.issueRepository.create({
            ...data,
            userId,
        });

        // Get user for email
        const user = await this.userRepository.findById(userId);

        // Send email notification (async, don't wait)
        if (user) {
            const issueDTO: IssueDTO = {
                id: issue.id,
                title: issue.title,
                description: issue.description,
                type: issue.type as any,
                status: issue.status as any,
                userId: issue.userId,
                createdAt: issue.createdAt,
                updatedAt: issue.updatedAt,
            };

            this.emailService.sendIssueCreatedEmail(user.email, issueDTO).catch((error) => {
                console.error('Failed to send issue created email:', error);
            });
        }

        return {
            id: issue.id,
            title: issue.title,
            description: issue.description,
            type: issue.type as any,
            status: issue.status as any,
            userId: issue.userId,
            createdAt: issue.createdAt,
            updatedAt: issue.updatedAt,
        };
    }

    /**
     * Get all issues for a user with optional filters
     */
    public async getIssues(userId: string, filters?: IssueFilterDTO): Promise<IssueDTO[]> {
        const issues = await this.issueRepository.findAll({
            ...filters,
            userId,
        });

        return issues.map((issue) => ({
            id: issue.id,
            title: issue.title,
            description: issue.description,
            type: issue.type as any,
            status: issue.status as any,
            userId: issue.userId,
            createdAt: issue.createdAt,
            updatedAt: issue.updatedAt,
        }));
    }

    /**
     * Get a single issue by ID
     */
    public async getIssueById(id: string, userId: string): Promise<IssueDTO> {
        const issue = await this.issueRepository.findById(id);

        if (!issue) {
            throw new NotFoundError('Issue not found');
        }

        // Check if user owns the issue
        if (issue.userId !== userId) {
            throw new ForbiddenError('You do not have permission to view this issue');
        }

        return {
            id: issue.id,
            title: issue.title,
            description: issue.description,
            type: issue.type as any,
            status: issue.status as any,
            userId: issue.userId,
            createdAt: issue.createdAt,
            updatedAt: issue.updatedAt,
        };
    }

    /**
     * Update an issue
     */
    public async updateIssue(id: string, data: UpdateIssueDTO, userId: string): Promise<IssueDTO> {
        const existingIssue = await this.issueRepository.findById(id);

        if (!existingIssue) {
            throw new NotFoundError('Issue not found');
        }

        // Check if user owns the issue
        if (existingIssue.userId !== userId) {
            throw new ForbiddenError('You do not have permission to update this issue');
        }

        const updatedIssue = await this.issueRepository.update(id, data);

        return {
            id: updatedIssue.id,
            title: updatedIssue.title,
            description: updatedIssue.description,
            type: updatedIssue.type as any,
            status: updatedIssue.status as any,
            userId: updatedIssue.userId,
            createdAt: updatedIssue.createdAt,
            updatedAt: updatedIssue.updatedAt,
        };
    }

    /**
     * Delete an issue
     */
    public async deleteIssue(id: string, userId: string): Promise<void> {
        const existingIssue = await this.issueRepository.findById(id);

        if (!existingIssue) {
            throw new NotFoundError('Issue not found');
        }

        // Check if user owns the issue
        if (existingIssue.userId !== userId) {
            throw new ForbiddenError('You do not have permission to delete this issue');
        }

        await this.issueRepository.delete(id);
    }
}

import { NextRequest, NextResponse } from 'next/server';
import { BaseHandler } from './base/BaseHandler';
import { IIssueService } from '../services/interfaces/IIssueService';
import { IssueValidator } from '../validators/IssueValidator';
import { IssueType, IssueStatus } from '../types/enums';

export class IssueHandler extends BaseHandler {
    private readonly issueService: IIssueService;
    private readonly validator: IssueValidator;

    constructor(issueService: IIssueService, validator: IssueValidator) {
        super();
        this.issueService = issueService;
        this.validator = validator;
    }

    /**
     * Handle get all issues
     */
    public async handleGetIssues(request: NextRequest, userId: string): Promise<NextResponse> {
        try {
            const { searchParams } = new URL(request.url);
            const type = searchParams.get('type') as IssueType | null;
            const status = searchParams.get('status') as IssueStatus | null;

            const filters: any = {};
            if (type) filters.type = type;
            if (status) filters.status = status;

            const issues = await this.issueService.getIssues(userId, filters);
            return this.sendSuccess(issues);
        } catch (error) {
            return this.handleError(error);
        }
    }

    /**
     * Handle create issue
     */
    public async handleCreateIssue(request: NextRequest, userId: string): Promise<NextResponse> {
        try {
            const body = await this.getRequestBody(request);

            // Validate input
            this.validator.validateCreate(body);

            // Create issue
            const issue = await this.issueService.createIssue(
                {
                    title: body.title,
                    description: body.description,
                    type: body.type,
                },
                userId
            );

            return this.sendSuccess(issue, 201);
        } catch (error) {
            return this.handleError(error);
        }
    }

    /**
     * Handle get single issue
     */
    public async handleGetIssue(id: string, userId: string): Promise<NextResponse> {
        try {
            const issue = await this.issueService.getIssueById(id, userId);
            return this.sendSuccess(issue);
        } catch (error) {
            return this.handleError(error);
        }
    }

    /**
     * Handle update issue
     */
    public async handleUpdateIssue(id: string, request: NextRequest, userId: string): Promise<NextResponse> {
        try {
            const body = await this.getRequestBody(request);

            // Validate input
            this.validator.validateUpdate(body);

            // Update issue
            const issue = await this.issueService.updateIssue(id, body, userId);
            return this.sendSuccess(issue);
        } catch (error) {
            return this.handleError(error);
        }
    }

    /**
     * Handle delete issue
     */
    public async handleDeleteIssue(id: string, userId: string): Promise<NextResponse> {
        try {
            await this.issueService.deleteIssue(id, userId);
            return this.sendSuccess({ message: 'Issue deleted successfully' });
        } catch (error) {
            return this.handleError(error);
        }
    }
}

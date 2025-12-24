import { Issue } from '@prisma/client';
import { IssueType, IssueStatus } from '../../types/enums';

export interface CreateIssueData {
    title: string;
    description: string;
    type: IssueType;
    userId: string;
    status?: IssueStatus;
}

export interface UpdateIssueData {
    title?: string;
    description?: string;
    type?: IssueType;
    status?: IssueStatus;
}

export interface IssueFilters {
    type?: IssueType;
    status?: IssueStatus;
    userId?: string;
}

export interface IIssueRepository {
    create(data: CreateIssueData): Promise<Issue>;
    findAll(filters?: IssueFilters): Promise<Issue[]>;
    findById(id: string): Promise<Issue | null>;
    findByUserId(userId: string): Promise<Issue[]>;
    update(id: string, data: UpdateIssueData): Promise<Issue>;
    delete(id: string): Promise<void>;
}

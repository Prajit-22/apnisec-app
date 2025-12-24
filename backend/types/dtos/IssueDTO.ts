import { IssueType, IssueStatus } from '../enums';

export interface CreateIssueDTO {
    title: string;
    description: string;
    type: IssueType;
}

export interface UpdateIssueDTO {
    title?: string;
    description?: string;
    type?: IssueType;
    status?: IssueStatus;
}

export interface IssueDTO {
    id: string;
    title: string;
    description: string;
    type: IssueType;
    status: IssueStatus;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IssueFilterDTO {
    type?: IssueType;
    status?: IssueStatus;
    userId?: string;
}

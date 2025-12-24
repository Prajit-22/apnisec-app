import { IssueDTO, CreateIssueDTO, UpdateIssueDTO, IssueFilterDTO } from '../../types/dtos';

export interface IIssueService {
    createIssue(data: CreateIssueDTO, userId: string): Promise<IssueDTO>;
    getIssues(userId: string, filters?: IssueFilterDTO): Promise<IssueDTO[]>;
    getIssueById(id: string, userId: string): Promise<IssueDTO>;
    updateIssue(id: string, data: UpdateIssueDTO, userId: string): Promise<IssueDTO>;
    deleteIssue(id: string, userId: string): Promise<void>;
}

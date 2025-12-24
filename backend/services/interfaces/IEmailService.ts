import { IssueDTO } from '../../types/dtos';

export interface IEmailService {
    sendWelcomeEmail(to: string, name: string): Promise<void>;
    sendIssueCreatedEmail(to: string, issue: IssueDTO): Promise<void>;
}

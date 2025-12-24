import { Resend } from 'resend';
import { IEmailService } from './interfaces/IEmailService';
import { IssueDTO } from '../types/dtos';

export class EmailService implements IEmailService {
  private readonly resend: Resend | null;
  private readonly fromEmail: string = 'ApniSec <onboarding@resend.dev>';

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('RESEND_API_KEY not found. Email functionality will be disabled.');
      this.resend = null;
    } else {
      this.resend = new Resend(apiKey);
    }
  }

  /**
   * Send welcome email to new user
   */
  public async sendWelcomeEmail(to: string, name: string): Promise<void> {
    if (!this.resend) {
      console.log('Email service disabled - skipping welcome email');
      return;
    }

    try {
      await this.resend.emails.send({
        from: this.fromEmail,
        to,
        subject: 'Welcome to ApniSec - Your Cybersecurity Partner',
        html: this.getWelcomeEmailTemplate(name),
      });
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      // Don't throw error - email failure shouldn't block registration
    }
  }

  /**
   * Send issue created notification email
   */
  public async sendIssueCreatedEmail(to: string, issue: IssueDTO): Promise<void> {
    if (!this.resend) {
      console.log('Email service disabled - skipping issue created email');
      return;
    }

    try {
      await this.resend.emails.send({
        from: this.fromEmail,
        to,
        subject: `New Issue Created: ${issue.title}`,
        html: this.getIssueCreatedEmailTemplate(issue),
      });
    } catch (error) {
      console.error('Failed to send issue created email:', error);
      // Don't throw error - email failure shouldn't block issue creation
    }
  }

  /**
   * Get welcome email HTML template
   */
  private getWelcomeEmailTemplate(name: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .button {
              display: inline-block;
              background: #667eea;
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Welcome to ApniSec!</h1>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <p>Thank you for joining ApniSec, your trusted cybersecurity partner.</p>
            <p>We're excited to have you on board. Our platform provides comprehensive security solutions including:</p>
            <ul>
              <li><strong>Cloud Security</strong> - Protect your cloud infrastructure</li>
              <li><strong>Red Team Assessment</strong> - Identify vulnerabilities before attackers do</li>
              <li><strong>VAPT</strong> - Comprehensive vulnerability assessment and penetration testing</li>
            </ul>
            <p>Get started by logging into your dashboard and creating your first security issue.</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">Go to Dashboard</a>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ApniSec. All rights reserved.</p>
          </div>
        </body>
      </html>
    `;
  }

  /**
   * Get issue created email HTML template
   */
  private getIssueCreatedEmailTemplate(issue: IssueDTO): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .issue-details {
              background: white;
              padding: 20px;
              border-left: 4px solid #667eea;
              margin: 20px 0;
            }
            .badge {
              display: inline-block;
              padding: 5px 10px;
              border-radius: 3px;
              font-size: 12px;
              font-weight: bold;
              margin-right: 10px;
            }
            .badge-type {
              background: #e0f2fe;
              color: #0369a1;
            }
            .badge-status {
              background: #dcfce7;
              color: #166534;
            }
            .button {
              display: inline-block;
              background: #667eea;
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>New Issue Created</h1>
          </div>
          <div class="content">
            <p>A new security issue has been created in your ApniSec account.</p>
            <div class="issue-details">
              <h3>${issue.title}</h3>
              <p>
                <span class="badge badge-type">${issue.type.replace(/_/g, ' ')}</span>
                <span class="badge badge-status">${issue.status}</span>
              </p>
              <p><strong>Description:</strong></p>
              <p>${issue.description}</p>
              <p><strong>Created:</strong> ${new Date(issue.createdAt).toLocaleString()}</p>
            </div>
            <p>Our team will review your issue and get back to you shortly.</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">View Issue</a>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ApniSec. All rights reserved.</p>
          </div>
        </body>
      </html>
    `;
  }
}

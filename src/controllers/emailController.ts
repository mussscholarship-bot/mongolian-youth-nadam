import { EmailService } from '../services/emailService';

export class EmailController {
    private emailService: EmailService;

    constructor() {
        this.emailService = new EmailService();
    }

    public async sendConfirmationEmail(participantEmail: string, participantName: string): Promise<void> {
        try {
            await this.emailService.sendConfirmationEmail(participantEmail, participantName);
            console.log(`Confirmation email sent to ${participantEmail}`);
        } catch (error) {
            console.error(`Failed to send email to ${participantEmail}:`, error);
        }
    }
}

import { Request, Response } from 'express';
import { RegistrationService } from '../services/registrationService';
import { EmailService } from '../services/emailService';

const registrationService = new RegistrationService();
const emailService = new EmailService();

export class RegistrationController {
    async showForm(req: Request, res: Response): Promise<void> {
        res.render('registration/form', { error: null });
    }

    async registerParticipant(req: Request, res: Response): Promise<void> {
        try {
            const data = {
                ...req.body,
                privacy_agreement: !!req.body.privacy_agreement,
                event_time_confirmation: !!req.body.event_time_confirmation,
            };

            const participant = await registrationService.registerParticipant(data);

            // Send confirmation email (non-blocking)
            emailService.sendConfirmationEmail(participant.email, participant.name)
                .then(() => registrationService.updateParticipantEmailStatus(String(participant._id), true))
                .catch((err: Error) => console.error('Email error:', err));

            res.render('registration/success', { name: participant.name });
        } catch (error: any) {
            const message = error.code === 11000
                ? 'このメールアドレスはすでに登録されています。'
                : error.message || '登録中にエラーが発生しました。';
            res.render('registration/form', { error: message, body: req.body });
        }
    }
}

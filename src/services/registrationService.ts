import { Participant, IParticipant } from '../models/participant';
import { validateRegistrationData } from '../utils/validation';

export class RegistrationService {
    async registerParticipant(data: any): Promise<IParticipant> {
        const errors = validateRegistrationData(data);
        if (errors.length > 0) {
            throw new Error(`Validation failed: ${errors.join(', ')}`);
        }

        // Normalize interests field
        if (typeof data.interests === 'string') {
            data.interests = data.interests.split(',').map((s: string) => s.trim()).filter(Boolean);
        }

        const participant = new Participant(data);
        await participant.save();
        return participant;
    }

    async getAllParticipants(): Promise<IParticipant[]> {
        return await Participant.find().sort({ created_at: -1 });
    }

    async findParticipantById(id: string): Promise<IParticipant | null> {
        return await Participant.findById(id);
    }

    async updateParticipantEmailStatus(id: string, sent: boolean): Promise<void> {
        await Participant.findByIdAndUpdate(id, { email_sent_status: sent });
    }

    async updatePaymentStatus(id: string, paid: boolean): Promise<void> {
        await Participant.findByIdAndUpdate(id, { payment_status: paid });
    }

    async deleteParticipant(id: string): Promise<void> {
        await Participant.findByIdAndDelete(id);
    }
}

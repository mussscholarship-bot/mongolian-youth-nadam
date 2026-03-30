import mongoose, { Document, Schema } from 'mongoose';

export interface IParticipant extends Document {
  name: string;
  email: string;
  gender: string;
  occupation: string;
  relationship_status: string;
  phone: string;
  hometown: string;
  current_address: string;
  interests: string[];
  other_interest?: string;
  privacy_agreement: boolean;
  event_time_confirmation: boolean;
  email_sent_status: boolean;
  payment_status: boolean;
  created_at: Date;
  updated_at: Date;
}

const ParticipantSchema = new Schema<IParticipant>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    occupation: { type: String, required: true },
    relationship_status: { type: String, required: true },
    phone: { type: String, required: true },
    hometown: { type: String, required: true },
    current_address: { type: String, required: true },
    interests: { type: [String], default: [] },
    other_interest: { type: String },
    privacy_agreement: { type: Boolean, required: true, default: false },
    event_time_confirmation: { type: Boolean, required: true, default: false },
    email_sent_status: { type: Boolean, default: false },
    payment_status: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const Participant = mongoose.model<IParticipant>('Participant', ParticipantSchema);

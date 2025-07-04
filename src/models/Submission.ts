import { Schema, model, Document } from 'mongoose';

export interface ISubmission extends Document {
  fullName: string;
  phoneNumber: string;
  email: string;
  dob: Date;
  address: string;
  aadhaar: string;
  photograph: string;
  signature: string;
  submissionId: string;
  timestamp: Date;
  status: 'pending' | 'approved' | 'rejected';
}

const submissionSchema = new Schema<ISubmission>({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  aadhaar: { type: String, required: true },
  photograph: { type: String, required: true },
  signature: { type: String, required: true },
  submissionId: { type: String, required: true, unique: true },
  timestamp: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
});

export default model<ISubmission>('Submission', submissionSchema); 
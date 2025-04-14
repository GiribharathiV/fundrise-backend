import mongoose, { Document, Schema } from 'mongoose';

export interface IDonation extends Document {
  campaignId: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
  name: string;
  amount: number;
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}

const donationSchema = new Schema<IDonation>(
  {
    campaignId: {
      type: Schema.Types.ObjectId,
      ref: 'Campaign',
      required: [true, 'Campaign ID is required'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Donor name is required'],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Donation amount is required'],
      min: [1, 'Donation amount must be at least 1'],
    },
    message: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IDonation>('Donation', donationSchema); 
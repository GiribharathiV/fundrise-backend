import mongoose, { Document, Schema } from 'mongoose';

export interface ICampaign extends Document {
  title: string;
  description: string;
  creatorId: mongoose.Types.ObjectId;
  creatorName: string;
  goalAmount: number;
  amountRaised: number;
  deadline: Date;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const campaignSchema = new Schema<ICampaign>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Creator ID is required'],
    },
    creatorName: {
      type: String,
      required: [true, 'Creator name is required'],
      trim: true,
    },
    goalAmount: {
      type: Number,
      required: [true, 'Goal amount is required'],
      min: [1, 'Goal amount must be at least 1'],
    },
    amountRaised: {
      type: Number,
      default: 0,
      min: 0,
    },
    deadline: {
      type: Date,
      required: [true, 'Deadline is required'],
    },
    imageUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICampaign>('Campaign', campaignSchema); 
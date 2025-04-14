import { Request, Response } from 'express';
import Donation from '../models/donation.model';
import Campaign from '../models/campaign.model';
import { logger } from '../utils/logger';
import mongoose from 'mongoose';

// @desc    Create a new donation
// @route   POST /api/campaigns/:campaignId/donations
// @access  Public (can be made by logged in or anonymous users)
export const createDonation = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { campaignId } = req.params;
    const { name, amount, message } = req.body;

    // Validate campaign exists
    const campaign = await Campaign.findById(campaignId).session(session);
    if (!campaign) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Create donation
    const donationData: any = {
      campaignId,
      name,
      amount: Number(amount),
      message,
    };

    // If user is logged in, associate donation with user
    if (req.user) {
      donationData.userId = req.user._id;
    }

    const donation = await Donation.create([donationData], { session });

    // Update campaign's amount raised
    campaign.amountRaised += Number(amount);
    await campaign.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(donation[0]);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    
    logger.error(`Create donation error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    res.status(500).json({ message: 'Failed to create donation' });
  }
};

// @desc    Get donations for a campaign
// @route   GET /api/campaigns/:campaignId/donations
// @access  Public
export const getCampaignDonations = async (req: Request, res: Response) => {
  try {
    const { campaignId } = req.params;

    // Validate campaign exists
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    const donations = await Donation.find({ campaignId })
      .sort({ createdAt: -1 });
    
    res.json(donations);
  } catch (error) {
    logger.error(`Get donations error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    res.status(500).json({ message: 'Failed to fetch donations' });
  }
};

// @desc    Get donations made by the logged-in user
// @route   GET /api/donations/mydonations
// @access  Private
export const getMyDonations = async (req: Request, res: Response) => {
  try {
    const donations = await Donation.find({ userId: req.user._id })
      .populate('campaignId', 'title')
      .sort({ createdAt: -1 });
    
    res.json(donations);
  } catch (error) {
    logger.error(`Get my donations error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    res.status(500).json({ message: 'Failed to fetch your donations' });
  }
}; 
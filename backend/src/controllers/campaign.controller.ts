import { Request, Response } from 'express';
import Campaign from '../models/campaign.model';
import Donation from '../models/donation.model';
import { logger } from '../utils/logger';

// @desc    Create a new campaign
// @route   POST /api/campaigns
// @access  Private
export const createCampaign = async (req: Request, res: Response) => {
  try {
    const { title, description, goalAmount, deadline, imageUrl } = req.body;

    const campaign = await Campaign.create({
      title,
      description,
      creatorId: req.user._id,
      creatorName: req.user.name,
      goalAmount,
      deadline,
      imageUrl: imageUrl || undefined,
    });

    res.status(201).json(campaign);
  } catch (error) {
    logger.error(`Create campaign error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    res.status(500).json({ message: 'Failed to create campaign' });
  }
};

// @desc    Get all campaigns
// @route   GET /api/campaigns
// @access  Public
export const getCampaigns = async (req: Request, res: Response) => {
  try {
    const campaigns = await Campaign.find({}).sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (error) {
    logger.error(`Get campaigns error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    res.status(500).json({ message: 'Failed to fetch campaigns' });
  }
};

// @desc    Get campaign by ID
// @route   GET /api/campaigns/:id
// @access  Public
export const getCampaignById = async (req: Request, res: Response) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (campaign) {
      res.json(campaign);
    } else {
      res.status(404).json({ message: 'Campaign not found' });
    }
  } catch (error) {
    logger.error(`Get campaign by ID error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    res.status(500).json({ message: 'Failed to fetch campaign' });
  }
};

// @desc    Update campaign
// @route   PUT /api/campaigns/:id
// @access  Private
export const updateCampaign = async (req: Request, res: Response) => {
  try {
    const { title, description, goalAmount, deadline, imageUrl } = req.body;

    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      res.status(404).json({ message: 'Campaign not found' });
      return;
    }

    // Check if user is the campaign creator
    if (campaign.creatorId.toString() !== req.user._id.toString()) {
      res.status(403).json({ message: 'Not authorized to update this campaign' });
      return;
    }

    campaign.title = title || campaign.title;
    campaign.description = description || campaign.description;
    campaign.goalAmount = goalAmount || campaign.goalAmount;
    campaign.deadline = deadline ? new Date(deadline) : campaign.deadline;
    campaign.imageUrl = imageUrl || campaign.imageUrl;

    const updatedCampaign = await campaign.save();
    res.json(updatedCampaign);
  } catch (error) {
    logger.error(`Update campaign error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    res.status(500).json({ message: 'Failed to update campaign' });
  }
};

// @desc    Get campaigns created by the logged-in user
// @route   GET /api/campaigns/mycampaigns
// @access  Private
export const getMyCampaigns = async (req: Request, res: Response) => {
  try {
    const campaigns = await Campaign.find({ creatorId: req.user._id }).sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (error) {
    logger.error(`Get my campaigns error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    res.status(500).json({ message: 'Failed to fetch your campaigns' });
  }
};

// @desc    Delete a campaign
// @route   DELETE /api/campaigns/:id
// @access  Private
export const deleteCampaign = async (req: Request, res: Response) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      res.status(404).json({ message: 'Campaign not found' });
      return;
    }

    // Check if user is the campaign creator
    if (campaign.creatorId.toString() !== req.user._id.toString()) {
      res.status(403).json({ message: 'Not authorized to delete this campaign' });
      return;
    }

    await campaign.deleteOne();
    res.json({ message: 'Campaign removed' });
  } catch (error) {
    logger.error(`Delete campaign error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    res.status(500).json({ message: 'Failed to delete campaign' });
  }
}; 
import express, { Router } from 'express';
import {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  getMyCampaigns
} from '../controllers/campaign.controller';
import { getCampaignDonations, createDonation } from '../controllers/donation.controller';
import { protect } from '../middleware/auth.middleware';

const router: Router = express.Router();

// Private routes - specific routes first to avoid conflicts
router.get('/user/mycampaigns', protect, getMyCampaigns);

// Public routes
router.get('/', getCampaigns);

// Campaign by ID operations
router.get('/:id', getCampaignById);
router.put('/:id', protect, updateCampaign);
router.delete('/:id', protect, deleteCampaign);

// Create campaign route
router.post('/', protect, createCampaign);

// Donation routes - must be after the ID routes to avoid conflicts
router.get('/:campaignId/donations', getCampaignDonations as any);
router.post('/:campaignId/donations', createDonation as any);

export default router; 
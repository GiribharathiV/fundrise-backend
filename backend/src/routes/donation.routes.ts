import express from 'express';
import { getMyDonations } from '../controllers/donation.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

// Get user's donations (protected route)
router.get('/mydonations', protect, getMyDonations);

export default router; 
import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/user.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

// Register a new user
router.post('/', registerUser);

// Login user
router.post('/login', loginUser);

// Get user profile (protected route)
router.get('/profile', protect, getUserProfile);

export default router; 
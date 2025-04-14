import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { logger } from './utils/logger';
import userRoutes from './routes/user.routes';
import campaignRoutes from './routes/campaign.routes';
import donationRoutes from './routes/donation.routes';
import { notFound, errorHandler } from './middleware/error.middleware';

// Environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fundrise';
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Only use morgan in development
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/users', userRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/donations', donationRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Crowdfunding API is running...' });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    logger.info(`MongoDB Connected: ${MONGODB_URI}`);
    
    // Start server after DB connection
    app.listen(PORT, () => {
      logger.info(`Server running in ${NODE_ENV} mode on port ${PORT}`);
    });
  })
  .catch(err => {
    logger.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  process.exit(1);
}); 
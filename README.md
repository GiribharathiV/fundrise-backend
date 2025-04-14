# FundMyProject - Crowdfunding Platform

A full-stack crowdfunding application built with React, Node.js, Express, and MongoDB.

## Features

- User authentication (signup, login) with JWT
- Create, browse, and manage crowdfunding campaigns  
- Make donations to campaigns
- Responsive design

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- Shadcn UI components
- Axios for API integration
- React Query for data fetching
- Context API for state management

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

## Project Structure

```
fundrise/
├── src/                   # Frontend code
│   ├── components/        # UI components
│   ├── context/           # Context providers
│   ├── pages/             # Page components
│   └── services/          # API services
│
└── backend/               # Backend code
    ├── src/
    │   ├── config/        # Configuration files
    │   ├── controllers/   # Route controllers
    │   ├── middleware/    # Custom middleware
    │   ├── models/        # Database models
    │   ├── routes/        # API routes
    │   └── utils/         # Utility functions
    └── .env               # Environment variables
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- MongoDB (local or Atlas connection)

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/fundrise
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   PORT=5000
   NODE_ENV=development
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the root directory and install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/users` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)

### Campaigns
- `GET /api/campaigns` - Get all campaigns
- `GET /api/campaigns/:id` - Get a single campaign by ID
- `POST /api/campaigns` - Create a new campaign (protected)
- `PUT /api/campaigns/:id` - Update a campaign (protected)
- `DELETE /api/campaigns/:id` - Delete a campaign (protected)
- `GET /api/campaigns/user/mycampaigns` - Get campaigns created by the logged-in user (protected)

### Donations
- `POST /api/campaigns/:campaignId/donations` - Create a donation for a campaign
- `GET /api/campaigns/:campaignId/donations` - Get all donations for a campaign
- `GET /api/donations/mydonations` - Get donations made by the logged-in user (protected)

## License
MIT
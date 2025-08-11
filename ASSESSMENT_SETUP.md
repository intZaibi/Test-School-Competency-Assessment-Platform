# Assessment Setup Guide

This guide will help you set up and run the assessment functionality with the backend.

## Prerequisites

1. Make sure you have MongoDB installed and running
2. Node.js and npm installed
3. Both frontend and backend dependencies installed

## Setup Steps

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/assessment-platform
   JWT_SECRET=your-secret-key
   FRONTEND_URL=http://localhost:5173
   ```

4. Seed the database with assessment questions:
   ```bash
   npm run seed
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/school-assessment
   ```

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## How the Assessment Works

### Data Structure

The assessment is organized into 3 steps with 2 levels each:

- **Step 1**: A1 (Basic) and A2 (Basic) levels
- **Step 2**: B1 (Independent) and B2 (Independent) levels  
- **Step 3**: C1 (Proficient) and C2 (Proficient) levels

### Assessment Flow

1. User starts the assessment
2. Questions are loaded from the backend database
3. User answers questions for each level
4. Score is calculated and submitted to backend
5. User progresses through all levels
6. Final results are displayed

### API Endpoints

- `GET /api/assessments/` - Get all assessment questions
- `POST /api/assessments/submit` - Submit assessment results
- `GET /api/assessments/user-data` - Get user assessment data
- `POST /api/assessments/certificate` - Generate certificate
- `GET /api/assessments/certificate/:certificateId` - Download certificate
- `POST /api/assessments/seed` - Seed database with questions

## Troubleshooting

### Common Issues

1. **Database connection error**: Make sure MongoDB is running and the connection string is correct
2. **CORS errors**: Ensure the frontend URL in the backend `.env` file matches your frontend URL
3. **Questions not loading**: Run the seeding script to populate the database
4. **Authentication errors**: Make sure you're logged in before accessing the assessment

### Resetting Data

To reset the assessment data:

1. Stop the backend server
2. Clear the assessment collection in MongoDB
3. Run the seeding script again: `npm run seed`
4. Restart the backend server

## Features

- ✅ Multi-step assessment with different difficulty levels
- ✅ Real-time progress tracking
- ✅ Timer functionality
- ✅ Score calculation and submission
- ✅ Backend integration with MongoDB
- ✅ User authentication required
- ✅ Results storage in user profile
- ✅ Certificate generation with unique IDs
- ✅ Certificate download functionality
- ✅ Achievement level calculation
- ✅ Detailed step-by-step results
- ✅ Error handling and loading states

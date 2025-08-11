import mongoose from 'mongoose';
import dotenv from 'dotenv';
import data from './src/data.js';
import AssessmentQuestion from './src/models/QuestionAssessmentSchema.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/assessment-platform');
    console.log('Connected to MongoDB');

    // Check if data already exists
    const existingData = await AssessmentQuestion.findOne();
    if (existingData) {
      console.log('Assessment data already exists, skipping seeding');
      process.exit(0);
    }

    // Create new assessment data
    const assessmentData = new AssessmentQuestion(data);
    await assessmentData.save();
    
    console.log('Assessment data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

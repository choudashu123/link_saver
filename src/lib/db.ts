import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI!;
if (!MONGO_URI) throw new Error("Missing MongoDB connection string");

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGO_URI);
  try {
    await mongoose.connect(process.env.MONGO_URI || '');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Database connection failed');
  }
};

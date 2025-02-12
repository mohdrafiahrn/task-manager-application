import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI; // MongoDB URI from environment variable

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return; // If already connected, no need to reconnect
  }

  try {
    // Updated mongoose connection logic without deprecated options
    await mongoose.connect(MONGODB_URI); // Use MONGODB_URI directly
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to the database');
  }
};

export default connectDB;

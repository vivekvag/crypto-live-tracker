import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI: any = process.env.MONGODB_URI;

export async function connectDataBase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('connected to database');
  } catch (error) {
    console.log('Error connectig to mongoDb:', error);
  }
}

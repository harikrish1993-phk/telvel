import mongoose from 'mongoose';
import { log } from '../utils/logger.js';

export async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/telvel_db';
  try {
    await mongoose.connect(uri);
    log.info(`MongoDB connected → ${mongoose.connection.name}`);
  } catch (err) {
    log.error('MongoDB connection failed', err.message);
    process.exit(1);
  }
  mongoose.connection.on('error', (e) => log.error('MongoDB error', e.message));
}

export async function closeDB() {
  await mongoose.connection.close();
  log.info('MongoDB closed');
}

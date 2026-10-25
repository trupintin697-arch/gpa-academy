import mongoose from 'mongoose';
import dotenv from 'dotenv';

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = fs.existsSync(path.resolve(__dirname, '../../.env'))
  ? path.resolve(__dirname, '../../.env')
  : path.resolve(__dirname, '../../../.env');
dotenv.config({ path: envPath });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gpa';

export async function connectMongoDB() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    throw err;
  }
}

export default connectMongoDB;

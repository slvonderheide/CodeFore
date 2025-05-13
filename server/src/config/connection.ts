import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tech-thoughts';

const db = async (): Promise<typeof mongoose.connection> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Database connected.');
    return mongoose.connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Database connection failed.');
  }
};

export default db;


// import dotenv from 'dotenv';
// dotenv.config();

// import mongoose from 'mongoose';

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tech-thoughts');

// const db = mongoose.connection;

// export default db;

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

// Enable CORS
app.use(cors());

// Enable body parser middleware for JSON data
app.use(express.json());

// Enable extended URL encoding
app.use(express.urlencoded({ extended: true }));

// Hello, World! route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Connect to MongoDB using Mongoose
const connectToDatabase = async () => {
  try {
    const mongodbUri = process.env.MONGODB_URI;
    if (!mongodbUri) {
      throw new Error(
        'MongoDB URI is not defined in the environment variables.'
      );
    }

    await mongoose.connect(mongodbUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

connectToDatabase();

export default app;

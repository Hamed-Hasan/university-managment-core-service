import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes';
import logger from './logger';
import CustomError from './errors/CustomError';
dotenv.config();
import notFoundHandler from './middleware/notFoundHandler';
import { UserRouter } from './models/user/user.route';
import { academicSemesterRoutes } from './models/academicSemister/academicSemester.route';





const app = express();

// Middleware
app.use(express.json());

// Routes

app.use('/api/v1', UserRouter);
app.use('/api/v1', academicSemesterRoutes);
app.use(notFoundHandler); // Register the `notFoundHandler` middleware at the end

// Global error handler middleware
app.use(CustomError.errorHandler);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error);
  });

export default app;

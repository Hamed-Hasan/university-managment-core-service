import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import { findLastFacultyId, generateFacultyId } from './app/modules/academicFaculty/academicFaculty.utils';
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/api/v1/users/', UserRoutes);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);
app.use('/api/v1', routes);

//Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing Error logger')
// })

//global error handler
app.use(globalErrorHandler);




const main = async () => {
  try {
    // Retrieve the last faculty ID
    const lastFacultyId = await findLastFacultyId();
    console.log('Last Faculty ID:', lastFacultyId);

    // Generate faculty ID and display it in the console
    const facultyId = await generateFacultyId();
    console.log('Generated Faculty ID:', facultyId);

    // Rest of your application code...
  } catch (error) {
    console.error('Error:', error);
  }
};

// Call the main function to start the ID generation process
// main();





//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;

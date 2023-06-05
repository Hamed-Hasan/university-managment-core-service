import express, { Application,  } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/users.route'
import globalErrorHandler from './middlewares/globalErrors'

import academicSemesterRouter from './app/modules/academicSemester/academicSemester.route';



const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))






// Application routes
app.use('/api/v1/academic-semesters', academicSemesterRouter);

app.use('/api/v1/users/', usersRouter)

// //Testing
// app.get('/', (req: Request, res: Response) => {
//   // res.send('Working Successfully')
//   throw new Error()
// })

// Error handling middleware
app.use(globalErrorHandler)

export default app

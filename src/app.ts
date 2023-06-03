import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/users.route'
import { globalErrors } from './middlewares/globalErrors'



const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))






// Application routes

app.use('/api/v1/users/', usersRouter)

//Testing
app.get('/', (req: Request, res: Response) => {
  // res.send('Working Successfully')
  throw new Error()
})

// Error handling middleware
app.use(globalErrors);

export default app

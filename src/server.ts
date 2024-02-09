import express from 'express' //
import router from './router' //
import morgan from 'morgan' // it is a logger middleware
import cors from 'cors' // it is a middleware that allows or denies requests based on the origin of the request, cors means cross origin resource sharing, it is a security feature of the browser
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user'
import { body, validationResult } from 'express-validator'

const app = express() // what does this line do? creates an instance of the express server

app.use(cors()) // it allows all requests to come in, if we want to restrict it, we can pass an object with the origin property set to the url we want to allow
app.use(morgan('dev')) // fit logs the request to the console
app.use(express.json()) // it parses the request body and makes it available in req.body, now the browser and we can exchange json data
app.use(express.urlencoded({ extended: true })) // it parses the request body and makes it available in req.body, now the browser and we can exchange json data

app.use((req, res, next) => {
   req.shhhhhhh_secret = 'shhhhhhh'
   next()
}) // any single request that comes in, we are going to add a property to the request object called shhhhhhh_secret

app.get('/', (req, res) => {
   console.log('GET request received')
   res.json({ message: 'hello' })
})

app.use('/api', protect, router)

app.post('/user', createNewUser)
app.post('/signin', signin)

app.use((err, req, res, next) => {
   if (err.type === 'auth') {
      return res
         .status(401)
         .json({ message: err.message, code: 'unauthorized' })
   } else if (err.type === 'validation') {
      return res.status(400).json({ message: err.message })
   } else if (err.type === 'entity') {
      return res.status(404).json({ message: err.message })
   } else if (err.type === 'prisma') {
      return res.status(500).json({ message: 'something went wrong' })
   } else if (err.type === 'input') {
      return res.status(400).json({ message: err.message })
   }
   res.status(500).json({ message: 'something went wrong' })
})

export default app

// how to open a new cmd window in the current directory
// in the terminal, type cmd and press enter

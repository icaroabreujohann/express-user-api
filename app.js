const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

const { testConnectionDb } = require('./src/config/db')
const authenticateToken = require('./src/middlewares/authenticateToken')

//Middlewares
app.use(express.json())
app.use(cors())
const publicRoutes = ['/auth/login', '/auth/register']

app.use((req, res, next) => {
   if(publicRoutes.includes(req.path)){
   return next()
   }
   //For routes what need token
   authenticateToken(req, res, next)
})


//Requires
require('./src/controllers/userController')(app)
require('./src/controllers/checkAuthRoute')(app)


const startApi = async () => {
   try {
      await testConnectionDb()
      app.listen(port, () => {
         console.log(`API running on port ${port}`)
      })
   } catch (error) {
      console.error('Failed to start api', error)
      process.exit(1)
   }
} 

startApi()
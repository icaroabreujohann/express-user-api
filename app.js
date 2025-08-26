const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

const { testConnectionDb } = require('./src/config/db')

//Middlewares
app.use(express.json())
app.use(cors())

//Requires
require('./src/controllers/userController')(app)

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
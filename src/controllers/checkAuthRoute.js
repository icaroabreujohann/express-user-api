require('dotenv').config()
const authenticateToken = require('../middlewares/authenticateToken.js')

module.exports = (app) => {
  
  // GET
  app.get('/authtoken', authenticateToken, async (req, res) => {
    try {
      const response = req.user
      if (response.length === 0) {
        return res.status(200).json({
          data: response,
          success: true,
          message: 'Token not found'
        })
      }
      res.status(200).json({
        data: response,
        success: true,
        message: 'Token found'
      })
    } catch (error) {
      console.error('Error to found Token:', error)
      res.status(500).json({
        data: error.message || error,
        success: false,
        message: 'There was a problem. Please try again later.'
      })
    }
  })

}
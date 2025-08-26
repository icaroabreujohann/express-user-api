require('dotenv').config()
const {UserMethods} = require('../models/userModel')
const userModel = new UserMethods()

const { validateUserData } = require('../utils/validations')
const { createSuccess } = require('../utils/createMessages')
const SUCCESS_CODES = require('../utils/successCodes')
const ERROR_CODES = require('../utils/errorCodes')

module.exports = (app) => {
   app.post('/users/register', async (req, res) => {
      const data = req.body

      try {
         validateUserData(data)
         const response = await userModel.postUser(data)

         res.status(201).json(
            createSuccess(
               SUCCESS_CODES.USER_CREATED.message,
               response,
               SUCCESS_CODES.USER_CREATED.code,
               SUCCESS_CODES.USER_CREATED.key
            )
         )
      } catch (error) {
         res.status(400).json({
            success: false,
            message: error.message,
            data: error.data || null,
            code: error.code || ERROR_CODES.INTERNAL_ERROR.code,
            key: error.key || ERROR_CODES.INTERNAL_ERROR.key,
         })
      }
   })
}
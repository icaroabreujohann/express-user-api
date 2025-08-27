require('dotenv').config()
const {UserMethods} = require('../models/userModel')
const userModel = new UserMethods()
const jwt = require('jsonwebtoken')

const { validateRegisterData, validateLoginData } = require('../utils/validations')
const { createSuccess } = require('../utils/createMessages')
const SUCCESS_CODES = require('../utils/successCodes')
const ERROR_CODES = require('../utils/errorCodes')
const SECRET = process.env.JWT_SECRET

module.exports = (app) => {
   app.post('/auth/register', async (req, res) => {
      const data = req.body
      try {
         validateRegisterData(data)
         const response = await userModel.registerUser(data)

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

   app.post('/auth/login', async (req, res) => {
      const data = req.body
      try {
         validateLoginData(data)
         const user = await userModel.authenticateUser(data)
         const token = jwt.sign({
               user_id: user.id, 
               first_name: user.first_name, 
               last_name: user.last_name, 
               email: user.email,
               created_at: user.created_at,
               updated_at: user.updated_at
            }, SECRET, {expiresIn: '12h'}
         )
         res.status(200).json(
            createSuccess(
               SUCCESS_CODES.USER_AUTHORIZED.message,
               {token: token, user: user},
               SUCCESS_CODES.USER_AUTHORIZED.code,
               SUCCESS_CODES.USER_AUTHORIZED.key
            )
         )
      } catch (error) {
         res.status(401).json({
            success: false,
            message: error.message,
            data: error.data || null,
            code: error.code || ERROR_CODES.INTERNAL_ERROR.code,
            key: error.key || ERROR_CODES.INTERNAL_ERROR.key,
         })
      }
   })

   app.get('/auth/me', async (req, res) => {
      try {
         res.status(201).json(
            createSuccess(
               SUCCESS_CODES.USER_AUTHORIZED.message,
               {user: req.user},
               SUCCESS_CODES.USER_AUTHORIZED.code,
               SUCCESS_CODES.USER_AUTHORIZED.key
            )
         )
      } catch (error) {
            res.status(401).json({
            success: false,
            message: error.message,
            data: error.data || null,
            code: error.code || ERROR_CODES.INTERNAL_ERROR.code,
            key: error.key || ERROR_CODES.INTERNAL_ERROR.key,
         })
      }
   })
}
require('dotenv').config()
const jwt = require('jsonwebtoken');
const { createError } = require('../utils/createMessages');
const ERROR_CODES = require('../utils/errorCodes');

const SECRET = process.env.JWT_SECRET

function authenticateToken (req, res, next) {
   const authHeader = req.headers['authorization'];//Get token from axios.get(''{headers: Authorization: `Bearer ${this.token}`]})
   const token = authHeader?.startsWith('Bearer ') && authHeader.split(' ')[1];
   if(!token){
      return res.status(401).json(
      createError(
         ERROR_CODES.TOKEN_NOT_PROVIDED.message, 
         { field: 'token'},
         ERROR_CODES.TOKEN_NOT_PROVIDED.code,
         ERROR_CODES.TOKEN_NOT_PROVIDED.key
      ))
   }

   try {
      const user = jwt.verify(token, SECRET)
      req.user = user
      next()

   } catch (error) {
      return res.status(403).json(
         createError(
            ERROR_CODES.TOKEN_NOT_VALID.message,
            {field: 'token'},
            ERROR_CODES.TOKEN_NOT_VALID.code,
            ERROR_CODES.TOKEN_NOT_VALID.key
         ))
   }
}

module.exports = authenticateToken
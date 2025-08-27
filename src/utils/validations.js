const {sql} = require('../config/db')
const ERROR_CODES = require('./errorCodes')
const {createError} = require('./createMessages')

async function checkUserExists(username, email){
   const userExists = await sql`
      SELECT username, email from users
      WHERE username = ${username} OR email = ${email}
   `

   if(userExists.length > 0){
      const conflicts = []
      if(userExists[0].username === username)conflicts.push('username')
      if(userExists[0].email === email)conflicts.push('email')

      throw createError(
         `${conflicts.join(' and ')} is already used`,
         conflicts,
         ERROR_CODES.USER_EXISTS.code,
         ERROR_CODES.USER_EXISTS.key
      )
   }
}
function validateLoginData(data) {
   return validateUserData(data, ['email', 'password'])
}

function validateRegisterData(data) {
   return validateUserData(data, ['username', 'first_name', 'last_name', 'email', 'password'])
}

function validateUserData(data, requiredFields) {
   const missingFields = requiredFields.filter(field => !data[field])

   if (missingFields.length > 0) {
      throw createError(
         `Missing required fields: ${missingFields.join(', ')}`,
         missingFields,
         ERROR_CODES.MISSING_FIELDS.code,
         ERROR_CODES.MISSING_FIELDS.key
      )
  }
}

module.exports = {checkUserExists, validateUserData, validateLoginData, validateRegisterData}
const {sql} = require('../config/db')
const bcrypt = require('bcrypt')

const {checkUserExists, validateLoginData, validateRegisterData } = require('../utils/validations')
const { createError } = require('../utils/createMessages')
const ERROR_CODES = require('../utils/errorCodes')

class UserMethods {
   async getAllUsers() {
      try {
         const users = await sql`SELECT id, username, first_name, last_name, email, created_at, updated_at FROM users`
         return users
      } catch (error) {
         console.error('Error listing users', error)
         throw error
      }
   }

   async authenticateUser(data) {
      const {email, password} = data
      try {
         const [user] = await sql`
            SELECT * FROM users
            WHERE email = ${email}
         `
         if(!user) {
            throw createError(
               ERROR_CODES.USER_NOT_FOUND.message,
               {field: "email"},
               ERROR_CODES.USER_NOT_FOUND.code,
               ERROR_CODES.USER_NOT_FOUND.key
            )
         }

         const isValid = await bcrypt.compare(password, user.password)
         if(!isValid) {
            throw createError(
               ERROR_CODES.INVALID_CREDENTIALS.message,
               {field: "password"},
               ERROR_CODES.INVALID_CREDENTIALS.code,
               ERROR_CODES.INVALID_CREDENTIALS.key
            )
         }

         const { password: _,...userWithoutPassword } = user
         return userWithoutPassword

      } catch (error) {
         console.error('Error listing users', error)
         throw error
      }
   }

   async getUserById(user_id) {
      try {
         const user = await sql`
            SELECT * FROM users
            WHERE id = ${user_id}
         `
         return user
      } catch (error) {
         console.error('Error listing users', error)
         throw error
      }
   }

   async registerUser(data) {
      const { username, first_name, last_name, email, password } = data
      try {
         validateRegisterData(data)

         const hashedPassword = await bcrypt.hash(password, 10)

         await checkUserExists(username, email)

         const [user] = await sql`
            INSERT INTO users (username, first_name, last_name, email, password)
            VALUES(
               ${username},
               ${first_name},
               ${last_name},
               ${email},
               ${hashedPassword}
            )
            RETURNING *
         `
         const { password: _,...userWithoutPassword } = user
         return userWithoutPassword
      } catch (error) {
         console.error('Error to create user', error)
         throw error
      }
   }
}

module.exports = {UserMethods}
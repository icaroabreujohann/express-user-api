const {sql} = require('../config/db')
const bcrypt = require('bcrypt')

const {checkUserExists, validateUserData } = require('../utils/validations')

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

   async postUser(data) {
      const { username, first_name, last_name, email, password } = data
      try {
         validateUserData(data)

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
         return user
      } catch (error) {
         console.error('Error to create user', error)
         throw error
      }
   }
}

module.exports = UserMethods
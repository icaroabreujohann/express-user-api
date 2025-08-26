const {sql} = require('../config/db')
const bcrypt = require('bcrypt')

class UserMethods {
   async getAllUsers() {
      try {
         const users = await sql`SELECT * FROM users`
         return users
      } catch (error) {
         console.error('Error listing users', error)
         throw error
      }
   }

   async getUserById(user_id) {
      try {
         const users = await sql`
            SELECT * FROM users
            WHERE id = ${user_id}
         `
         return users
      } catch (error) {
         console.error('Error listing users', error)
         throw error
      }
   }

   async postUser(data) {

      const { username, first_name, last_name, email, password } = data
      
      if (!username || !first_name || !last_name || !email || !password) {
      throw new Error('username, first_name, last_name, email and password are required')
      }

      try {
         const hashedPassword = await bcrypt.hash(password, 10)

         const userExists = await sql`
            SELECT username, email
            FROM users
            WHERE username = ${username} OR email = ${email}
         `

         if(userExists.length > 0) {
            const conflicts = []
            if(userExists[0].username === username) conflicts.push('username')
            if(userExists[0].email === email) conflicts.push('email')
            throw new Error(`${conflicts.join(' and ')} is already used`)
         }

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
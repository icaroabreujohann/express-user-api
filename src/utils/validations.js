const {sql} = require('../config/db')

async function checkUserExists(username, email){
   try {
      const userExists = await sql`
         SELECT id from users
         WHERE username = ${username} OR email = ${email}
         `
      if(userExists.length > 0){
         const conflicts = []
         if(userExists[0].username === username)conflicts.push('username')
         if(userExists[0].email === email)conflicts.push('email')
         throw new Error(`${conflicts.join(' and ')} is already used`)
      }
   } catch (error) {
      console.error('Error in validate user', error)
      throw new Error('Error in validate user', error)
   }
}

function validateUserData(data) {
   const { username, first_name, last_name, email, password } = data
   const missingFields = []
   if (!username) missingFields.push('username')
   if (!first_name) missingFields.push('first_name')
   if (!last_name) missingFields.push('last_name')
   if (!email) missingFields.push('email')
   if (!password) missingFields.push('password')
   if (missingFields.length > 0) {
      
   throw new Error(`Missing required fields: ${missingFields.join(', ')}`)
  }
}

module.exports = {checkUserExists, validateUserData}
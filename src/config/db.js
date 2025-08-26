require('dotenv').config()
const postgres = require('postgres')

const sql = postgres(process.env.DATABASE_URL)

const testConnectionDb = async () => {
   try {
      const response = await sql`select now()`
      console.log(`Connect to database was successful:`, response)
   } catch (error) {
      console.log('Connect to database failed', error)
   }
}

module.exports = {sql, testConnectionDb}
const { sql } = require('../config/db')

async function createUserTable() {
   try {
      await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
      await sql`
         CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            username VARCHAR(50) NOT NULL UNIQUE,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            email VARCHAR(150) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT now(),
            updated_at TIMESTAMP DEFAULT now()
         )
      `
      console.log('Table users created')
   } catch (error) {
      console.log('Failed to create table users', error)
   }
}


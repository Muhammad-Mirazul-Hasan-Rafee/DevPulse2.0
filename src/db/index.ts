import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString: config.connectionString,
});

export const initDB = async () => {
  try {
    await pool.query(`

            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50),
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(20) DEFAULT 'Contributor' NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            
        )
            `);


    await pool.query(`
      CREATE TABLE IF NOT EXISTS issues(
      id SERIAL PRIMARY KEY,
      reporter_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      description TEXT,
      type VARCHAR(10),
      status VARCHAR(10),
       created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
      `);
    console.log("Database connected successfully!!");
  } catch (error) {
    console.log(error);
  }
};
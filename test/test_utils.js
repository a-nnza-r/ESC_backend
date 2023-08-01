import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

// Test database credentials
const testCredentials = {
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  password: process.env.TESTPASSWORD,
  database: process.env.TESTDATABASE,
};

export const test_db_pool = new Pool(testCredentials);

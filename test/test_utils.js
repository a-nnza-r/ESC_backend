import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

// Test database credentials
const testCredentials = {
  host: "database-3.cpb6hjfazsgd.ap-southeast-1.rds.amazonaws.com",
  user: "postgres",
  port: "5432",
  password: "12345678",
  database: "esc_db_test",
};

export const test_db_pool = new Pool(testCredentials);

// db_utils.js

import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";
dotenv.config();

const credentials = {
  host: "database-3.cpb6hjfazsgd.ap-southeast-1.rds.amazonaws.com",
  user: "postgres",
  port: "5432",
  password: "12345678",
  database: "esc_test_db",
};

export const createPool = () => new Pool(credentials);

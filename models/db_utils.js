import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";
dotenv.config();

const credentials = {
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

export const db_pool = new Pool(credentials);

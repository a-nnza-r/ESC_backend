import pg from "pg";
const { Pool } = pg;
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

// Create pool function
function createPool() {
  return new Pool(testCredentials);
}

async function deleteFromTables(pool) {
  try {
    await pool.query("TRUNCATE TABLE epfs CASCADE;");
  } catch (e) {
    console.error("Error on epfs truncate:", e.stack);
    throw e;
  }

  try {
    await pool.query("TRUNCATE TABLE EXCO CASCADE;");
  } catch (e) {
    console.error("Error on EXCO truncate:", e.stack);
    throw e;
  }
}

module.exports = {
  createPool,
  deleteFromTables,
};

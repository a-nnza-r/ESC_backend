import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";
dotenv.config();

// Test database credentials
const testCredentials = {
  host: "database-3.cpb6hjfazsgd.ap-southeast-1.rds.amazonaws.com",
  user: "postgres",
  port: "5432",
  password: "12345678",
  database: "esc_test_db",
};

// Create pool function
async function createPool() {
  const pool = new Pool(testCredentials);
  return pool;
}

async function deleteFromTables(pool) {
  const client = await pool.connect();
  try {
    await client.query("TRUNCATE TABLE epfs CASCADE;");
    await client.query("TRUNCATE TABLE users CASCADE;");
  } catch (e) {
    console.error("Error on truncating tables:", e.stack);
    throw e;
  } finally {
    client.release();
  }
}

// Updated expectUserToMatch
function expectUserToMatch(user, expectedProperties) {
  Object.entries(expectedProperties).forEach(([key, value]) => {
    expect(user[key]).toEqual(value);
  });
}

module.exports = {
  createPool,
  deleteFromTables,
  expectUserToMatch,
};

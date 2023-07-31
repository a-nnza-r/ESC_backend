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
async function createPool() {
  const pool = new Pool(testCredentials);
  return pool;
}

async function deleteFromTables(pool) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");
    await client.query("TRUNCATE TABLE epfs CASCADE;");
    await client.query("TRUNCATE TABLE users CASCADE;");
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
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

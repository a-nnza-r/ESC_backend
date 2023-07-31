import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";
dotenv.config();

// Test database credentials
const testCredentials = {
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  password: process.env.PASSWORD,
  database: process.env.TESTDATABASE,
};

// Create pool function
function createPool() {
  return new Pool(testCredentials);
}

async function deleteFromUsers(pool) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");
    await client.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE;");
    await client.query("COMMIT");
  } catch (e) {
    console.error("Error on users truncate:", e.stack);
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

async function deleteFromEPFs(pool) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");
    await client.query("TRUNCATE TABLE epfs RESTART IDENTITY CASCADE;");
    await client.query("COMMIT");
  } catch (e) {
    console.error("Error on epfs truncate:", e.stack);
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

module.exports = {
  createPool,
  deleteFromUsers,
  deleteFromEPFs,
};

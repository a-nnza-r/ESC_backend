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
    await pool.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE;");
  } catch (e) {
    console.error("Error on users truncate:", e.stack);
    throw e;
  } finally {
    client.release();
  }
}

async function deleteFromEPFs(pool) {
  const client = await pool.connect();
  try {
    await pool.query("TRUNCATE TABLE epfs RESTART IDENTITY CASCADE;");
  } catch (e) {
    console.error("Error on epfs truncate:", e.stack);
    throw e;
  } finally {
    client.release();
  }
}

async function deleteFromFiles(pool) {
  const client = await pool.connect();  
  try {
      await pool.query("TRUNCATE TABLE files RESTART IDENTITY CASCADE;");
    } catch (e) {
      console.error("Error on files truncate:", e.stack);
      throw e;
    } finally {
      client.release();
    }
  }

module.exports = {
  createPool,
  deleteFromUsers,
  deleteFromEPFs,
  deleteFromFiles
};
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

async function deleteFromEXCOs(pool) {
  try {
    await pool.query("TRUNCATE TABLE EXCO RESTART IDENTITY CASCADE;");
  } catch (e) {
    console.error("Error on EXCO truncate:", e.stack);
    throw e;
  }
}

async function deleteFromOSLs(pool) {
  try {
    await pool.query("TRUNCATE TABLE OSL RESTART IDENTITY CASCADE;");
  } catch (e) {
    console.error("Error on OSL truncate:", e.stack);
    throw e;
  }
}

async function deleteFromROOTs(pool) {
  try {
    await pool.query("TRUNCATE TABLE ROOT RESTART IDENTITY CASCADE;");
  } catch (e) {
    console.error("Error on ROOT truncate:", e.stack);
    throw e;
  }
}

async function deleteFromEPFs(pool) {
  try {
    await pool.query("TRUNCATE TABLE epfs RESTART IDENTITY CASCADE;");
  } catch (e) {
    console.error("Error on epfs truncate:", e.stack);
    throw e;
  }
}

module.exports = {
  createPool,
  deleteFromEXCOs,
  deleteFromOSLs,
  deleteFromROOTs,
  deleteFromEPFs
};

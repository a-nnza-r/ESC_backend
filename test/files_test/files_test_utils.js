import { test_db_pool } from "./../test_utils";

export const test_pool = test_db_pool;

export async function deleteFromUsers(pool) {
  let client;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    await client.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");
    await client.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE;");
    await client.query("COMMIT");
  } catch (err) {
    if (client) {
      await client.query("ROLLBACK");
      throw err;
    } else new Error("couldnt acquire client");
  } finally {
    if (client) {
      client.release();
    }
  }
}

export async function deleteFromEPFs(pool) {
  let client;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    await client.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");
    await client.query("TRUNCATE TABLE epfs RESTART IDENTITY CASCADE;");
    await client.query("COMMIT");
  } catch (err) {
    if (client) {
      await client.query("ROLLBACK");
      throw err;
    } else new Error("couldnt acquire client");
  } finally {
    if (client) {
      client.release();
    }
  }
}

export async function deleteFromFiles(pool) {
  let client;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    await client.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");
    await pool.query("TRUNCATE TABLE files RESTART IDENTITY CASCADE;");
    await client.query("COMMIT");
  } catch (err) {
    if (client) {
      await client.query("ROLLBACK");
      throw err;
    } else new Error("couldnt acquire client");
  } finally {
    if (client) {
      client.release();
    }
  }
}

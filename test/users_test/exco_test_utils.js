import { test_db_pool } from "../test_utils";

export async function deleteFromTables(pool) {
  let client;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    await client.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");
    await client.query("TRUNCATE TABLE epfs CASCADE;");
    await client.query("TRUNCATE TABLE users CASCADE;");
    await client.query("COMMIT");
  } catch (err) {
    if (client) {
      await client.query("ROLLBACK");
      throw err;
    } else new Error("couldnt acquire client");
    throw err;
  } finally {
    if (client) {
      client.release();
    }
  }
}

export function expectUserToMatch(user, expectedProperties) {
  Object.entries(expectedProperties).forEach(([key, value]) => {
    expect(user[key]).toEqual(value);
  });
}

export const test_pool = test_db_pool;

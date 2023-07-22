/*
Logic for Users DB
*/
import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";
dotenv.config();

import {createPool} from "./db_utils.js"
const defaultPool = createPool();

export async function createROOT(name, email, pool = defaultPool) {
  const [username, domain] = email.split("@");
  // Name validation
  if (!name) {
    throw new Error("Name must be provided");
  }
  // Email format validation
  const isValidUsername = /^[^\s@]+$/;
  const isValidDomain = /^[^\s@]+\.[^\s@]+$/;

  if (
    !email.includes("@") ||
    !isValidUsername.test(username) ||
    !isValidDomain.test(domain)
  ) {
    throw new Error("Invalid email format");
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const duplicateCheckQuery =
      "SELECT * FROM ROOT WHERE name = $1 AND email = $2";
    const duplicateResult = await client.query(duplicateCheckQuery, [
      name,
      email,
    ]);
    if (duplicateResult.rows.length > 0) throw new Error("Duplicate entry");

    const query = "INSERT INTO ROOT (name, email) VALUES ($1, $2) RETURNING *";
    const result = await client.query(query, [name, email]);

    await client.query("COMMIT");

    return result.rows[0];
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

export async function getROOTs(pool = defaultPool) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM ROOT WHERE is_deleted = false;"
    );
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getROOT(user_id, pool = defaultPool) {
  if (!user_id) {
    throw new Error("User ID must be provided");
  }
  const client = await pool.connect();
  try {
    const query = "SELECT * FROM ROOT WHERE user_id=$1 AND is_deleted = false";
    const result = await client.query(query, [user_id]);
    return result["rows"];
  } finally {
    client.release();
  }
}

export async function updateROOT(user_id, name, email, pool = defaultPool) {
  // Check if necessary parameters are provided
  if (!user_id || !name || !email) {
    throw new Error(
      "Missing parameters: user_id, name, and email are required."
    );
  }
  // Check if user_id is a number
  if (typeof user_id !== "number") {
    throw new Error("Invalid user_id: must be a number.");
  }
  // Check if email format is valid
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format.");
  }
  const query =
    "UPDATE ROOT " +
    "SET name=$1, email=$2 " +
    "WHERE user_id=$3 AND is_deleted = false " +
    "RETURNING *"; // This line is updated

  const client = await pool.connect();
  try {
    const response = await client.query(query, [name, email, user_id]);
    // Check if any row was affected
    if (response.rowCount == 0) {
      throw new Error("No ROOT record found with the given user_id.");
    }
    return response.rows[0]; // Return the updated record
  } finally {
    client.release();
  }
}

export async function deleteROOT(user_id, pool = defaultPool) {
  if (!user_id) {
    throw new Error("User ID must be provided");
  }

  // Check if user_id is a positive integer
  if (!Number.isInteger(user_id) || user_id <= 0) {
    throw new Error("User ID must be a positive integer");
  }

  // Use try/catch/finally to ensure client is released even in case of error.
  const client = await pool.connect();
  try {
    const query =
      "UPDATE ROOT SET is_deleted = true WHERE user_id = $1 AND is_deleted = false RETURNING *;";
    const res = await client.query(query, [user_id]);

    if (res.rowCount === 0) {
      const query =
        "SELECT * FROM ROOT WHERE user_id = $1 AND is_deleted = true ;";
      const resCheck = await client.query(query, [user_id]);

      if (resCheck.rowCount > 0) {
        throw new Error("ROOT user has already been delete");
      } else {
        throw new Error("ROOT user does not exist");
      }
    }

    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}

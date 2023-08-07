import { db_pool } from "./db_utils.js";

export async function createUser(user_id, name, email, type, pool = db_pool) {
  const [username, domain] = email.split("@");

  // User ID validation
  if (!user_id) {
    throw new Error("User ID must be provided");
  }

  // Name validation
  if (!name) {
    throw new Error("Name must be provided");
  }

  // Type validation
  if (!type || !(type === "ROOT" || type === "OSL" || type === "FRE")) {
    throw new Error("Invalid user type. Must be 'ROOT', 'OSL', or 'FRE'");
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

  const MAX_RETRIES = 5;
  let client;
  let result = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      client = await pool.connect();
      await client.query("BEGIN");
      await client.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");

      const duplicateCheckQuery =
        "SELECT * FROM users WHERE name = $1 AND email = $2 AND user_type = $3 FOR UPDATE";
      const duplicateResult = await client.query(duplicateCheckQuery, [
        name,
        email,
        type,
      ]);

      if (duplicateResult.rows.length > 0) {
        throw new Error("Duplicate entry");
      }

      const query =
        "INSERT INTO users (user_id, name, email, user_type) VALUES ($1, $2, $3, $4) RETURNING *";
      result = await client.query(query, [user_id, name, email, type]);

      await client.query("COMMIT");
      break;
    } catch (err) {
      if (client) {
        if (
          !(
            err.message.includes("could not serialize access") ||
            err.message.includes("deadlock detected")
          )
        ) {
          throw err;
        }
      }
      if (attempt === MAX_RETRIES - 1) {
        throw new Error("Max retrieval attempts exceeded");
      }
      await client.query("ROLLBACK");
    } finally {
      if (client) {
        client.release();
      }
    }
  }
  return result.rows[0];
}

export async function getUser(user_id, pool = db_pool) {
  if (!user_id) {
    throw new Error("User ID must be provided");
  }

  let client;
  let result = null;

  try {
    client = await pool.connect();
    await client.query("BEGIN");
    await client.query("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");

    const query =
      "SELECT * FROM users WHERE user_id = $1 AND is_deleted = false FOR SHARE";
    result = await client.query(query, [user_id]);

    await client.query("COMMIT");
  } catch (err) {
    if (client) {
      await client.query("ROLLBACK");
    }
    throw err;
  } finally {
    if (client) {
      client.release();
    }
  }

  return result.rows;
}

export async function getUsers(pool = db_pool) {
  let client;
  let result = null;

  try {
    client = await pool.connect();
    await client.query("BEGIN");
    await client.query("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");

    result = await client.query(
      "SELECT * FROM users WHERE is_deleted = false FOR SHARE;"
    );

    await client.query("COMMIT");
  } catch (err) {
    if (client) {
      await client.query("ROLLBACK");
    }
    throw err;
  } finally {
    if (client) {
      client.release();
    }
  }

  return result.rows;
}

export async function getEXCOEPFs(user_id, pool = db_pool) {
  let client;
  let result = null;

  try {
    client = await pool.connect();
    await client.query("BEGIN");
    await client.query("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");

    const query =
      "SELECT * FROM epfs WHERE exco_user_id=$1 AND is_deleted=false FOR SHARE";
    result = await client.query(query, [user_id]);

    await client.query("COMMIT");
  } catch (err) {
    if (client) {
      await client.query("ROLLBACK");
    }
    throw err;
  } finally {
    if (client) {
      client.release();
    }
  }

  return result["rows"];
}

export async function updateUser(user_id, name, email, type, pool = db_pool) {
  // Check if necessary parameters are provided
  if (!user_id || !name || !email || !type) {
    throw new Error(
      "Missing parameters: user_id, name, email, and type are required."
    );
  }

  // Check if email format is valid
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format.");
  }

  const MAX_RETRIES = 5;
  let client;
  let result = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      client = await pool.connect();
      await client.query("BEGIN");
      await client.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");

      // Select the row for update
      const selectQuery =
        "SELECT * FROM users WHERE user_id = $1 AND is_deleted = false FOR UPDATE";
      const selectResponse = await client.query(selectQuery, [user_id]);

      // If no row selected, throw error
      if (selectResponse.rowCount == 0) {
        throw new Error("No record found with the given user_id.");
      }

      const query =
        "UPDATE users " +
        "SET name=$1, email=$2, user_type=$3 " +
        "WHERE user_id=$4 AND is_deleted=false " +
        "RETURNING *";
      result = await client.query(query, [name, email, type, user_id]);

      await client.query("COMMIT");
      break; // Break the retry loop upon successful transaction
    } catch (err) {
      if (client) {
        await client.query("ROLLBACK");
      }
      if (
        !err.message.includes("could not serialize access") &&
        !err.message.includes("deadlock detected")
      ) {
        throw err;
      }
      if (attempt === MAX_RETRIES - 1) {
        throw new Error("Max update attempts exceeded");
      }
    } finally {
      if (client) {
        client.release();
      }
    }
  }
  return result.rows[0]; // Return the updated record
}

export async function deleteUser(user_id, pool = db_pool) {
  if (!user_id) {
    throw new Error("User ID must be provided");
  }

  const MAX_RETRIES = 5;
  let client;
  let result = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      client = await pool.connect();
      await client.query("BEGIN");
      await client.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");

      // Select the row for update
      const selectQuery =
        "SELECT * FROM users WHERE user_id = $1 AND is_deleted = false FOR UPDATE";
      const selectResponse = await client.query(selectQuery, [user_id]);

      // If no row selected, throw error
      if (selectResponse.rowCount == 0) {
        throw new Error("User does not exist or has already been deleted.");
      }

      const query =
        "UPDATE users SET is_deleted = true WHERE user_id = $1 AND is_deleted = false RETURNING *;";
      result = await client.query(query, [user_id]);

      await client.query("COMMIT");
      break; // Break the retry loop upon successful transaction
    } catch (err) {
      if (client) {
        await client.query("ROLLBACK");
      }
      if (
        !err.message.includes("could not serialize access") &&
        !err.message.includes("deadlock detected")
      ) {
        throw err;
      }
      if (attempt === MAX_RETRIES - 1) {
        throw new Error("Max deletion attempts exceeded");
      }
    } finally {
      if (client) {
        client.release();
      }
    }
  }
  return result.rows[0];
}

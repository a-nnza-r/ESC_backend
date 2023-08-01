import { db_pool } from "./db_utils.js";

export async function createUser(
  user_id,
  name,
  email,
  type,
  pool = defaultPool
) {
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
  if (!type || !(type === "root" || type === "osl" || type === "exco")) {
    throw new Error("Invalid user type. Must be 'root', 'osl', or 'exco'");
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
  let client;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    await client.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");
    const duplicateCheckQuery =
      "SELECT * FROM users WHERE user_id = $1 AND name = $2 AND email = $3 AND user_type = $4";
    const duplicateResult = await client.query(duplicateCheckQuery, [
      user_id,
      name,
      email,
      type,
    ]);
    if (duplicateResult.rows.length > 0) throw new Error("Duplicate entry");
    const query =
      "INSERT INTO users (user_id, name, email, user_type) VALUES ($1, $2, $3, $4) RETURNING *";
    const result = await client.query(query, [user_id, name, email, type]);

    await client.query("COMMIT");

    return result.rows[0];
  } catch (err) {
    if (err.message === "Duplicate entry") {
      await client.query("COMMIT");
      throw err;
    } else {
      if (client) {
        await client.query("ROLLBACK");
        throw err;
      } else new Error("couldnt acquire client");
    }
  } finally {
    if (client) {
      client.release();
    }
  }
}

export async function getUser(user_id, pool = db_pool) {
  if (!user_id) {
    throw new Error("User ID must be provided");
  }
  let client;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    await client.query("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
    const query =
      "SELECT * FROM users WHERE user_id = $1 AND is_deleted = false";
    const result = await client.query(query, [user_id]);
    await client.query("COMMIT");
    return result.rows;
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

export async function getUsers(pool = db_pool) {
  let client;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    await client.query("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
    const result = await client.query(
      "SELECT * FROM users WHERE is_deleted = false;"
    );
    await client.query("COMMIT");
    return result.rows;
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

export async function getEXCOEPFs(user_id, pool = db_pool) {
  let client;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    await client.query("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
    const query =
      "SELECT * FROM epfs WHERE exco_user_id=$1 AND is_deleted=false";
    const result = await client.query(query, [user_id]);
    await client.query("COMMIT");
    return result["rows"];
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
  const query =
    "UPDATE users " +
    "SET name=$1, email=$2, user_type=$3 " +
    "WHERE user_id=$4 AND is_deleted=false " +
    "RETURNING *";

  let client;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    await client.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");
    const response = await client.query(query, [name, email, type, user_id]);
    // Check if any row was affected
    if (response.rowCount == 0) {
      throw new Error("No record found with the given user_id.");
    }
    await client.query("COMMIT");
    return response.rows[0]; // Return the updated record
  } catch (err) {
    if (err.message === "No record found with the given user_id.") {
      await client.query("COMMIT");
      throw err;
    } else {
      if (client) {
        await client.query("ROLLBACK");
        throw err;
      } else new Error("couldnt acquire client");
    }
  } finally {
    if (client) {
      client.release();
    }
  }
}

export async function deleteUser(user_id, pool = db_pool) {
  if (!user_id) {
    throw new Error("User ID must be provided");
  }

  let client;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    await client.query("SET TRANSACTION ISOLATION LEVEL SERIALIZABLE");
    const query =
      "UPDATE users SET is_deleted = true WHERE user_id = $1 AND is_deleted = false RETURNING *;";
    const res = await client.query(query, [user_id]);

    if (res.rowCount === 0) {
      const query =
        "SELECT * FROM users WHERE user_id = $1 AND is_deleted = true ;";
      const resCheck = await client.query(query, [user_id]);

      if (resCheck.rowCount > 0) {
        throw new Error("User has already been deleted");
      } else {
        throw new Error("User does not exist");
      }
    }
    await client.query("COMMIT");
    return res.rows[0];
  } catch (err) {
    if (
      err.message === "User has already been deleted" ||
      err.message === "User does not exist"
    ) {
      await client.query("COMMIT");
      throw err;
    } else {
      if (client) {
        await client.query("ROLLBACK");
        throw err;
      } else new Error("couldnt acquire client");
    }
  } finally {
    if (client) {
      client.release();
    }
  }
}

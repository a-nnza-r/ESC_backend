import { createPool } from "./db_utils.js";
const defaultPool = createPool();

export async function createUser(user_id, name, email, type, pool = defaultPool) {
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
      "SELECT * FROM users WHERE user_id = $1 AND name = $2 AND email = $3 AND user_type = $4";
    const duplicateResult = await client.query(duplicateCheckQuery, [
      user_id,
      name,
      email,
      type
    ]);
    if (duplicateResult.rows.length > 0) throw new Error("Duplicate entry");

    const query = "INSERT INTO users (user_id, name, email, user_type) VALUES ($1, $2, $3, $4) RETURNING *";
    const result = await client.query(query, [user_id, name, email, type]);

    await client.query("COMMIT");

    return result.rows[0];
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

export async function getUser(user_id, pool = defaultPool) {
  if (!user_id) {
    throw new Error("User ID must be provided");
  }
  const client = await pool.connect();
  try {
    const query = "SELECT * FROM users WHERE user_id = $1 AND is_deleted = false";
    const result = await client.query(query, [user_id]);
    return result["rows"];
  } finally {
    client.release();
  }
}

export async function getUsers(pool = defaultPool) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM users WHERE is_deleted = false;"
    );
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getEXCOEPFs(user_id, pool = defaultPool) {
  const client = await pool.connect();
  try {
    const query =
      "SELECT * FROM EPFS WHERE exco_user_id = $1 AND is_deleted = false";
    const result = await client.query(query, [user_id]);
    return result["rows"];
  } finally {
    client.release();
  }
}

export async function updateUser(user_id, name, email, type, pool = defaultPool) {
  // Check if necessary parameters are provided
  if (!user_id || !name || !email) {
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
    "RETURNING *"; // This line is updated

  const client = await pool.connect();
  try {
    const response = await client.query(query, [name, email, type, user_id]);
    // Check if any row was affected
    if (response.rowCount == 0) {
      throw new Error("No record found with the given user_id.");
    }
    return response.rows[0]; // Return the updated record
  } finally {
    client.release();
  }
}

export async function deleteUser(user_id, pool = defaultPool) {
  if (!user_id) {
    throw new Error("User ID must be provided");
  }

  // Use try/catch/finally to ensure client is released even in case of error.
  const client = await pool.connect();
  try {
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

    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}

export async function getUsersByAttribute(attributes, pool = defaultPool) {
  if (
    !attributes ||
    typeof attributes !== "object" ||
    Object.keys(attributes).length === 0
  ) {
    throw new Error("Attributes parameter is empty or not an object.");
  }

  if (!("is_deleted" in attributes)) {
    attributes["is_deleted"] = { value: false, operator: "=" };
  }
  const keys = Object.keys(attributes).filter((key) => key !== "sort");

  // Attribute types
  const attributeTypes = {
    user_id: "numeric",
    name: "text",
    email: "text",
    outstanding_epf: "numeric",
    is_deleted: "boolean",
  };

  // Compatible operators for the attribute types
  const validOperators = {
    numeric: ["=", "!=", ">", "<", ">=", "<="],
    text: ["=", "!="],
    boolean: ["=", "!="],
  };

  // Compatible directions for sorting
  const validDirections = ["ASC", "DESC"];

  // Check for required properties in attribute objects and valid operators
  for (const key of keys) {
    if (
      !attributes[key].hasOwnProperty("value") ||
      !attributes[key].hasOwnProperty("operator")
    ) {
      throw new Error(
        `Attribute "${key}" must have "value" and "operator" properties`
      );
    }

    const attributeType = attributeTypes[key];
    if (!validOperators[attributeType].includes(attributes[key].operator)) {
      throw new Error(
        `Invalid operator "${
          attributes[key].operator
        }" for attribute "${key}" of type "${attributeType}". Allowed operators are ${validOperators[
          attributeType
        ].join(", ")}`
      );
    }
  }

  const conditions = keys.map(
    (key, index) => `${key}${attributes[key].operator}$${index + 1}`
  );

  const values = keys.map((key) => attributes[key].value);
  let query = `SELECT * FROM users WHERE ${conditions.join(" AND ")}`;
  if (attributes.sort) {
    // Additional check for required properties in "sort" attribute
    if (
      !attributes.sort.hasOwnProperty("column") ||
      !attributes.sort.hasOwnProperty("direction") ||
      !validDirections.includes(attributes.sort.direction.toUpperCase())
    ) {
      throw new Error(
        `Sort property must have "column" and "direction" properties and direction must be one of ${validDirections.join(
          ", "
        )}`
      );
    }
    query += ` ORDER BY ${attributes.sort.column} ${attributes.sort.direction}`;
  }
  const client = await pool.connect();
  try {
    const result = await client.query(query, values);
    return result.rows;
  } finally {
    client.release();
  }
}

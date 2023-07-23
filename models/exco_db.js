import { createPool } from "./db_utils.js";
const defaultPool = createPool();

export async function createEXCO(name, email, pool = defaultPool) {
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
      "SELECT * FROM EXCO WHERE name = $1 AND email = $2";
    const duplicateResult = await client.query(duplicateCheckQuery, [
      name,
      email,
    ]);
    if (duplicateResult.rows.length > 0) throw new Error("Duplicate entry");

    const query = "INSERT INTO EXCO (name, email) VALUES ($1, $2) RETURNING *";
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

export async function getEXCO(user_id, pool = defaultPool) {
  if (!user_id) {
    throw new Error("User ID must be provided");
  }
  const client = await pool.connect();
  try {
    const query = "SELECT * FROM EXCO WHERE user_id=$1 AND is_deleted = false";
    const result = await client.query(query, [user_id]);
    return result["rows"];
  } finally {
    client.release();
  }
}

export async function getEXCOs(pool = defaultPool) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM EXCO WHERE is_deleted = false;"
    );
    return result.rows;
  } finally {
    client.release();
  }
}

export async function getEXCOEPFs(exco_user_id, pool = defaultPool) {
  const client = await pool.connect();
  try {
    const query =
      "SELECT * FROM EPFS WHERE exco_user_id=$1 AND is_deleted = false";
    const result = await client.query(query, [exco_user_id]);
    return result["rows"];
  } finally {
    client.release();
  }
}

export async function updateEXCO(user_id, name, email, pool = defaultPool) {
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
    "UPDATE EXCO " +
    "SET name=$1, email=$2 " +
    "WHERE user_id=$3 AND is_deleted = false " +
    "RETURNING *"; // This line is updated

  const client = await pool.connect();
  try {
    const response = await client.query(query, [name, email, user_id]);
    // Check if any row was affected
    if (response.rowCount == 0) {
      throw new Error("No EXCO record found with the given user_id.");
    }
    return response.rows[0]; // Return the updated record
  } finally {
    client.release();
  }
}

export async function deleteEXCO(user_id, pool = defaultPool) {
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
      "UPDATE EXCO SET is_deleted = true WHERE user_id = $1 AND is_deleted = false RETURNING *;";
    const res = await client.query(query, [user_id]);

    if (res.rowCount === 0) {
      const query =
        "SELECT * FROM EXCO WHERE user_id = $1 AND is_deleted = true ;";
      const resCheck = await client.query(query, [user_id]);

      if (resCheck.rowCount > 0) {
        throw new Error("EXCO user has already been delete");
      } else {
        throw new Error("EXCO user does not exist");
      }
    }

    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}

export async function getEXCOsByAttribute(attributes, pool = defaultPool) {
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
  let query = `SELECT * FROM EXCO WHERE ${conditions.join(" AND ")}`;
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

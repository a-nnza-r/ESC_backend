/*
Logic for Users DB
*/
import pg from "pg";
const { Pool } = pg;

const credentials = {
  host: "127.0.0.1",
  user: "postgres",
  port: 5432,
  password: "123",
  database: "esc_db",
};

export async function createEXCO(name, email) {
  const pool = new Pool(credentials);
  const query = "INSERT INTO EXCO (name, email) VALUES ($1, $2)";
  await pool.query(query, [name, email]);
  await pool.end();
}

export async function getEXCOs() {
  const pool = new Pool(credentials);
  const result = await pool.query(`SELECT * FROM EXCO;`);
  await pool.end();
  return result["rows"];
}

export async function getEXCO(user_id) {
  const pool = new Pool(credentials);
  const query = "SELECT * FROM EXCO WHERE user_id=$1";
  const result = await pool.query(query, [user_id]);
  await pool.end();
  return result["rows"];
}

export async function getEXCOEPFs(exco_user_id) {
  const pool = new Pool(credentials);
  const query = "SELECT * FROM EPFS WHERE exco_user_id=$1";
  const result = await pool.query(query, [exco_user_id]);
  await pool.end();
  return result["rows"];
}

export async function updateEXCO(user_id, name, email, password) {
  const pool = new Pool(credentials);
  const query = "UPDATE EXCO SET name=$1, email=$2 WHERE user_id=$3";
  await pool.query(query, [name, email, user_id]);
  await pool.end();
}

export async function deleteEXCO(user_id) {
  const pool = new Pool(credentials);
  const query = "DELETE FROM EXCO WHERE user_id=$1";
  const res = await pool.query(query, [user_id]);
  await pool.end();
  return res; // Returns the result object from the database query execution
}

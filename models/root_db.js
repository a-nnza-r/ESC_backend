/*
Logic for ROOT DB
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

export async function createROOT(name, email) {
  const pool = new Pool(credentials);
  const query = "INSERT INTO ROOT (name, email) VALUES ($1, $2)";
  await pool.query(query, [name, email]);
  await pool.end();
}

export async function getROOTs() {
  const pool = new Pool(credentials);
  const result = await pool.query(`SELECT * FROM ROOT;`);
  await pool.end();
  return result["rows"];
}

export async function getROOT(user_id) {
  const pool = new Pool(credentials);
  const query = "SELECT * FROM ROOT WHERE user_id=$1";
  const result = await pool.query(query, [user_id]);
  await pool.end();
  return result["rows"];
}

export async function updateROOT(user_id, name, email) {
  const pool = new Pool(credentials);
  const query = "UPDATE ROOT SET name=$1, email=$2 WHERE user_id=$3";
  await pool.query(query, [name, email, user_id]);
  await pool.end();
}

export async function deleteROOT(user_id) {
  const pool = new Pool(credentials);
  const query = "DELETE FROM ROOT WHERE user_id=$1";
  const res = await pool.query(query, [user_id]);
  await pool.end();
  return res; // Returns the result object from the database query execution
}